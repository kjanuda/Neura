"use client";

import { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";

const API_BASE_URL = "http://localhost:5000";

interface TimelineDataPoint {
  time: string;
  score: number;
  status: string;
  type: 'past' | 'current' | 'predicted';
  timestamp: number;
  fullDate: string;
}

// Animated Number Component
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = value || 0;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentValue = start + (end - start) * easeOutQuad(progress);
      
      setDisplayValue(Math.round(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    prevValueRef.current = end;
  }, [value, duration]);

  return <>{displayValue}</>;
}

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border-2 border-purple-300 rounded-lg shadow-xl">
        <p className="font-bold text-gray-900 text-sm mb-1">{data.fullDate}</p>
        <p className="text-purple-700 font-bold text-lg">
          Score: {payload[0].value}/100
        </p>
        <p className="text-xs text-gray-600 mt-1 capitalize">
          {data.type === 'past' ? '📊 Historical Data' : 
           data.type === 'current' ? '🔴 Live Reading' : 
           '🔮 AI Prediction'}
        </p>
        {data.status && (
          <p className="text-xs text-gray-500 mt-1">Status: {data.status}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function HealthScoreTimeline({ patientId = "P001" }) {
  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [predictedScore, setPredictedScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate health score from vitals
  const calculateHealthScore = (data: any): number => {
    if (!data) return 75;
    if (data.score !== undefined) return Math.round(data.score);
    
    const vitals = data.vitals || data;
    const hr = vitals.heart_rate || 75;
    const spo2 = vitals.spo2 || 95;
    const temp = vitals.temperature || 37;
    
    const hrScore = Math.max(0, 100 - Math.abs(75 - hr) * 2);
    const spo2Score = spo2;
    const tempScore = Math.max(0, 100 - Math.abs(37 - temp) * 20);
    
    return Math.round((hrScore + spo2Score + tempScore) / 3);
  };

  // Generate timeline with real timestamps
  const generateTimeline = (prediction: any, history: any[]): TimelineDataPoint[] => {
    const now = new Date();
    const data: TimelineDataPoint[] = [];
    
    // PAST 2 HOURS - Generate 12 data points (every 10 minutes)
    for (let i = 12; i > 0; i--) {
      const pastTime = new Date(now.getTime() - i * 10 * 60 * 1000);
      
      // Find closest historical data
      let score = 75;
      let status = "Estimated";
      
      if (history && history.length > 0) {
        const closest = history.reduce((prev, curr) => {
          const prevDiff = Math.abs(new Date(prev.timestamp).getTime() - pastTime.getTime());
          const currDiff = Math.abs(new Date(curr.timestamp).getTime() - pastTime.getTime());
          return currDiff < prevDiff ? curr : prev;
        });
        
        const timeDiff = Math.abs(new Date(closest.timestamp).getTime() - pastTime.getTime());
        if (timeDiff <= 15 * 60 * 1000) { // Within 15 minutes
          score = calculateHealthScore(closest);
          status = "Historical";
        } else {
          // Calculate average from available history
          const scores = history.map(h => calculateHealthScore(h));
          score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        }
      }
      
      data.push({
        time: pastTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        score,
        status,
        type: 'past',
        timestamp: pastTime.getTime(),
        fullDate: pastTime.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    }
    
    // CURRENT TIME
    const currentData = prediction?.current_health;
    const currentHealthScore = currentData?.score || calculateHealthScore(currentData) || 75;
    
    data.push({
      time: 'NOW',
      score: currentHealthScore,
      status: currentData?.status || "Current",
      type: 'current',
      timestamp: now.getTime(),
      fullDate: now.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }) + ' (Current)'
    });
    
    // PREDICTED (30 minutes from now)
    const futureTime = new Date(now.getTime() + 30 * 60 * 1000);
    const predictedData = prediction?.predicted_health;
    const predictedHealthScore = predictedData?.score || 
                                 (currentHealthScore > 0 ? Math.max(40, currentHealthScore - Math.floor(Math.random() * 10)) : 70);
    
    data.push({
      time: '+30min',
      score: predictedHealthScore,
      status: predictedData?.status || "Predicted",
      type: 'predicted',
      timestamp: futureTime.getTime(),
      fullDate: futureTime.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }) + ' (Predicted)'
    });
    
    return data;
  };

  // Fetch data from API
  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      
      // Fetch prediction
      const predictionRes = await fetch(`${API_BASE_URL}/ml/predict/${patientId}`, {
        signal: AbortSignal.timeout(5000)
      });
      
      if (!predictionRes.ok) throw new Error(`API returned ${predictionRes.status}`);
      
      const predictionData = await predictionRes.json();
      const prediction = predictionData.prediction || predictionData;
      
      // Fetch history
      let history = [];
      try {
        const historyRes = await fetch(`${API_BASE_URL}/ml/history/${patientId}?hours=2&limit=20`);
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          history = historyData.history || [];
        }
      } catch (histErr) {
        console.warn('History fetch failed:', histErr);
      }
      
      // Generate timeline
      const timeline = generateTimeline(prediction, history);
      setTimelineData(timeline);
      
      // Set scores
      const current = timeline.find(d => d.type === 'current');
      const predicted = timeline.find(d => d.type === 'predicted');
      setCurrentScore(current?.score || 0);
      setPredictedScore(predicted?.score || 0);
      
      setLastUpdate(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
      
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
      
      // Use fallback data on error
      if (timelineData.length === 0) {
        const fallbackTimeline = generateTimeline(null, []);
        setTimelineData(fallbackTimeline);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [patientId]);

  if (loading && timelineData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-96 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  const scoreChange = predictedScore - currentScore;

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 border-2 border-purple-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">📈 Health Score Timeline</h2>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Past 2 Hours</span> → 
            <span className="font-semibold text-blue-600 mx-1">Current</span> → 
            <span className="font-semibold text-purple-600">Predicted (30 min)</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">
            {lastUpdate && (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-green-500 animate-pulse' : 'bg-green-400'}`}></div>
                <span>Updated: <span className="font-bold">{lastUpdate}</span></span>
              </div>
            )}
          </div>
          <button 
            onClick={fetchData}
            disabled={isRefreshing}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isRefreshing 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <span className={isRefreshing ? 'animate-spin inline-block' : ''}>
              🔄
            </span>
            <span className="ml-2">{isRefreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">⚠️ {error} - Showing available data</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-300 text-center">
          <div className="text-xs text-blue-600 font-semibold mb-1">CURRENT SCORE</div>
          <div className="text-4xl font-bold text-blue-700">
            <AnimatedNumber value={currentScore} />
          </div>
          <div className="text-xs text-blue-600 mt-1">/ 100</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-300 text-center">
          <div className="text-xs text-purple-600 font-semibold mb-1">PREDICTED (30MIN)</div>
          <div className="text-4xl font-bold text-purple-700">
            <AnimatedNumber value={predictedScore} />
          </div>
          <div className="text-xs text-purple-600 mt-1">/ 100</div>
        </div>
        
        <div className={`rounded-xl p-4 border-2 text-center ${
          scoreChange >= 0 
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
            : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
        }`}>
          <div className={`text-xs font-semibold mb-1 ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            CHANGE
          </div>
          <div className={`text-4xl font-bold ${scoreChange >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {scoreChange >= 0 ? '+' : ''}<AnimatedNumber value={scoreChange} />
          </div>
          <div className={`text-xs mt-1 ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {scoreChange >= 0 ? '📈 Improving' : '📉 Declining'}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-300 text-center">
          <div className="text-xs text-gray-600 font-semibold mb-1">DATA POINTS</div>
          <div className="text-4xl font-bold text-gray-700">
            {timelineData.length}
          </div>
          <div className="text-xs text-gray-600 mt-1">In timeline</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              tick={{ fontSize: 11, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
            />
            <YAxis 
              stroke="#6b7280" 
              domain={[0, 100]} 
              tick={{ fontSize: 11, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
              label={{ 
                value: 'Health Score', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: 13, fontWeight: 700, fill: '#374151' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference line at NOW */}
            <ReferenceLine 
              x="NOW" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              strokeDasharray="8 4"
              label={{ 
                value: '🔴 LIVE', 
                position: 'top', 
                fill: '#3b82f6',
                fontWeight: 700,
                fontSize: 11
              }}
            />
            
            {/* Area fill */}
            <Area
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#scoreGradient)"
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            
            {/* Line with dots */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={4}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.type === 'current') {
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={10}
                      fill="#3b82f6"
                      stroke="#ffffff"
                      strokeWidth={3}
                      className="animate-pulse"
                    />
                  );
                }
                if (payload.type === 'predicted') {
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={10}
                      fill="#8b5cf6"
                      stroke="#ffffff"
                      strokeWidth={3}
                    />
                  );
                }
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill="#8b5cf6"
                    stroke="#ffffff"
                    strokeWidth={1}
                  />
                );
              }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
          <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
          <div>
            <div className="text-sm font-bold text-gray-900">Past 2 Hours</div>
            <div className="text-xs text-gray-600">Historical readings (10min intervals)</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-300">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          <div>
            <div className="text-sm font-bold text-gray-900">Current (NOW)</div>
            <div className="text-xs text-gray-600">Live reading at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-300">
          <div className="w-4 h-4 bg-purple-700 rounded-full"></div>
          <div>
            <div className="text-sm font-bold text-gray-900">Predicted (+30min)</div>
            <div className="text-xs text-gray-600">AI forecast for {new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t-2 border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-green-500 animate-pulse' : 'bg-green-400'}`}></span>
            <span>Auto-refresh every 30 seconds</span>
            <span>•</span>
            <span>Patient ID: <span className="font-bold">{patientId}</span></span>
          </div>
          <div>
            {timelineData.filter(d => d.type === 'past').length} historical • 
            {timelineData.filter(d => d.type === 'current').length} live • 
            {timelineData.filter(d => d.type === 'predicted').length} prediction
          </div>
        </div>
      </div>
    </div>
  );
}