"use client";

import { useEffect, useState, useRef } from "react";

const API_BASE_URL = "http://localhost:5000";

interface HealthScoreProps {
  patientId?: string;
  prediction?: {
    current_health: {
      score: number;
      status: string;
    };
    predicted_health?: {
      score: number;
      status: string;
    };
  };
}

// Animated Number Component for smooth transitions
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === prevValueRef.current) return;
    
    const start = prevValueRef.current;
    const end = value;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentValue = start + (end - start) * easeOutQuad(progress);
      
      setDisplayValue(Math.round(currentValue));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    prevValueRef.current = value;
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return <>{displayValue}</>;
}

// Circular Progress Component with smooth updates
function CircularProgress({ 
  value, 
  max = 100, 
  size = 200, 
  strokeWidth = 20, 
  label, 
  color = "#8b5cf6" 
}: { 
  value: number; 
  max?: number; 
  size?: number; 
  strokeWidth?: number; 
  label?: string; 
  color?: string; 
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === prevValueRef.current) return;

    const start = prevValueRef.current;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();

    const animateCircle = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentValue = start + (end - start) * easeOutCubic(progress);
      
      setDisplayValue(Math.round(currentValue));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateCircle);
      }
    };

    animationRef.current = requestAnimationFrame(animateCircle);
    prevValueRef.current = value;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayValue / max) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-bold" style={{ color }}>
          <AnimatedNumber value={displayValue} duration={800} />
        </div>
        {label && <div className="text-sm text-gray-600 font-semibold mt-1">{label}</div>}
      </div>
    </div>
  );
}

// Score Card Component with smooth updates
function ScoreCard({ 
  title, 
  score, 
  maxScore = 100, 
  color = "#3b82f6",
  icon,
  description 
}: { 
  title: string; 
  score: number; 
  maxScore?: number;
  color: string; 
  icon: string;
  description?: string;
}) {
  const [displayScore, setDisplayScore] = useState(score);
  const [displayDescription, setDisplayDescription] = useState(description);
  const prevScoreRef = useRef(score);
  const prevDescRef = useRef(description);

  useEffect(() => {
    if (score !== prevScoreRef.current) {
      const start = prevScoreRef.current;
      const end = score;
      const duration = 800;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = (t: number) => t * (2 - t);
        const currentValue = start + (end - start) * easeOutQuad(progress);
        
        setDisplayScore(Math.round(currentValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      prevScoreRef.current = score;
    }
  }, [score]);

  useEffect(() => {
    if (description !== prevDescRef.current) {
      setDisplayDescription(description);
      prevDescRef.current = description;
    }
  }, [description]);

  const percentage = (displayScore / maxScore) * 100;
  
  const getStatusText = () => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Fair";
    return "Critical";
  };
  
  const getStatusColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
          {displayDescription && (
            <p className="text-sm text-gray-600 transition-opacity duration-500">
              {displayDescription}
            </p>
          )}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()} bg-opacity-10 transition-all duration-500`}
             style={{ backgroundColor: `${color}15` }}>
          {getStatusText()}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <div className="text-4xl font-bold text-gray-900">
          <AnimatedNumber value={displayScore} duration={800} />
        </div>
        <div className="text-lg text-gray-500">/ {maxScore}</div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="h-2 rounded-full transition-all duration-1000 ease-out" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color 
          }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>{maxScore}</span>
      </div>
    </div>
  );
}

// Trend Indicator Component with smooth updates
function TrendIndicator({ 
  current, 
  predicted,
  timeframe = "30 minutes" 
}: { 
  current: number; 
  predicted: number;
  timeframe?: string;
}) {
  const [displayChange, setDisplayChange] = useState(predicted - current);
  const prevCurrentRef = useRef(current);
  const prevPredictedRef = useRef(predicted);

  useEffect(() => {
    const newChange = predicted - current;
    if (newChange === displayChange) return;

    const start = displayChange;
    const end = newChange;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentValue = start + (end - start) * easeOutQuad(progress);
      
      setDisplayChange(Math.round(currentValue * 10) / 10);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    prevCurrentRef.current = current;
    prevPredictedRef.current = predicted;
  }, [current, predicted, displayChange]);

  const change = displayChange;
  const percentageChange = current > 0 ? ((change / current) * 100).toFixed(1) : "0.0";
  
  const getTrendColor = () => {
    if (change > 5) return "text-green-600 bg-green-100 border-green-200";
    if (change > 0) return "text-green-600 bg-green-50 border-green-100";
    if (change < -5) return "text-red-600 bg-red-100 border-red-200";
    if (change < 0) return "text-red-600 bg-red-50 border-red-100";
    return "text-gray-600 bg-gray-100 border-gray-200";
  };

  const getTrendIcon = () => {
    if (change > 5) return "🚀";
    if (change > 0) return "📈";
    if (change < -5) return "⚠️";
    if (change < 0) return "📉";
    return "➡️";
  };

  const getTrendText = () => {
    if (change > 5) return "Rapidly Improving";
    if (change > 0) return "Improving";
    if (change < -5) return "Rapidly Declining";
    if (change < 0) return "Declining";
    return "Stable";
  };

  return (
    <div className={`rounded-xl p-4 border-2 ${getTrendColor()} transition-all duration-500`}>
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-gray-900">Trend Prediction</div>
        <div className="text-2xl transition-transform duration-500 hover:scale-110">
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="text-sm text-gray-600">Next {timeframe}</div>
        <div className="text-2xl font-bold text-gray-900 transition-all duration-500">
          {getTrendText()}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500">Change</div>
          <div className={`text-xl font-bold transition-all duration-500 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}<AnimatedNumber value={change} duration={800} /> pts
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Percentage</div>
          <div className={`text-xl font-bold transition-all duration-500 ${parseFloat(percentageChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentageChange}%
          </div>
        </div>
      </div>
    </div>
  );
}

// History Data Point Interface
interface HistoryDataPoint {
  timestamp: string;
  heart_rate?: number;
  spo2?: number;
  temperature?: number;
  score?: number;
  vitals?: {
    heart_rate?: number;
    spo2?: number;
    temperature?: number;
  };
}

// Main Health Score Prediction Component
export default function CircularHealthScores({ 
  patientId = "P001", 
  prediction: externalPrediction 
}: HealthScoreProps) {
  const [prediction, setPrediction] = useState<HealthScoreProps['prediction'] | null>(externalPrediction || null);
  const [loading, setLoading] = useState(!externalPrediction);
  const [error, setError] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<HistoryDataPoint[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate health score from vitals
  const calculateHealthScore = (data: HistoryDataPoint): number => {
    if (data?.score !== undefined) return data.score;
    
    const vitals = data?.vitals || data;
    const hr = vitals?.heart_rate || 75;
    const spo2 = vitals?.spo2 || 95;
    const temp = vitals?.temperature || 37;
    
    const hrScore = Math.max(0, 100 - Math.abs(75 - hr) * 2);
    const spo2Score = spo2;
    const tempScore = Math.max(0, 100 - Math.abs(37 - temp) * 20);
    
    return Math.round((hrScore + spo2Score + tempScore) / 3);
  };

  // Calculate past average from last 6 hours
  const calculatePastAverage = (data: HistoryDataPoint[]): number => {
    if (data.length === 0) return 0;
    
    const now = new Date();
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    
    const recentData = data.filter(item => {
      const itemTime = new Date(item.timestamp);
      return itemTime >= sixHoursAgo;
    });
    
    if (recentData.length === 0) return 0;
    
    const scores = recentData.map(calculateHealthScore);
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
  };

  // OPTIMIZED REFRESH FUNCTION - Only updates data, not the whole page
  const fetchHealthData = async () => {
    try {
      setIsRefreshing(true);
      
      // Fetch current prediction
      const predictionResponse = await fetch(`${API_BASE_URL}/ml/predict/${patientId}`, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      if (!predictionResponse.ok) {
        throw new Error(`API Error: ${predictionResponse.status}`);
      }
      
      const result = await predictionResponse.json();
      
      // Parse response
      let parsedPrediction = null;
      
      if (result.prediction) {
        parsedPrediction = result.prediction;
      } else if (result.current_health) {
        parsedPrediction = result;
      } else if (result.score !== undefined) {
        parsedPrediction = {
          current_health: {
            score: result.score,
            status: result.status || "Unknown"
          },
          predicted_health: result.predicted_score !== undefined ? {
            score: result.predicted_score,
            status: result.predicted_status || "Unknown"
          } : undefined
        };
      } else {
        parsedPrediction = result;
      }
      
      // Only update state - doesn't reload page
      setPrediction(parsedPrediction);
      
      // Fetch historical data
      try {
        const historyResponse = await fetch(`${API_BASE_URL}/ml/history/${patientId}?hours=6`);
        if (historyResponse.ok) {
          const historyResult = await historyResponse.json();
          
          let rawData: HistoryDataPoint[] = [];
          
          if (historyResult.history && Array.isArray(historyResult.history)) {
            rawData = historyResult.history.filter((item: any) => 
              item && item.timestamp && (
                item.score !== undefined || 
                item.vitals !== undefined || 
                item.heart_rate !== undefined ||
                item.spo2 !== undefined
              )
            );
          } else if (Array.isArray(historyResult)) {
            rawData = historyResult.filter((item: any) => 
              item && item.timestamp && (
                item.score !== undefined || 
                item.vitals !== undefined || 
                item.heart_rate !== undefined ||
                item.spo2 !== undefined
              )
            );
          }
          
          // Sort by timestamp (newest first)
          rawData.sort((a: HistoryDataPoint, b: HistoryDataPoint) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          // Only update state - doesn't reload page
          setHistoryData(rawData);
        }
      } catch (historyErr) {
        console.warn('Could not fetch history:', historyErr);
      }
      
      setError(null);
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
    } catch (err: any) {
      console.error("Error fetching health data:", err);
      if (!prediction) {
        setError(`Failed to load health predictions: ${err.message}`);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleManualRefresh = async () => {
    await fetchHealthData();
  };

  useEffect(() => {
    if (externalPrediction) {
      setPrediction(externalPrediction);
      return;
    }

    // Initial fetch
    fetchHealthData();
    
    // Set up auto-refresh every 30 seconds
    refreshIntervalRef.current = setInterval(fetchHealthData, 30000);
    
    // Cleanup
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [patientId, externalPrediction]);

  if (loading && !prediction) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-64 w-64 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !prediction) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-900 mb-2">Health Score Unavailable</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <button 
            onClick={handleManualRefresh}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
          >
            🔄 Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Use actual API data or fallback to 0
  const currentScore = prediction?.current_health?.score || 0;
  const currentStatus = prediction?.current_health?.status || "No Status";
  const predictedScore = prediction?.predicted_health?.score || currentScore;
  const predictedStatus = prediction?.predicted_health?.status || currentStatus;
  const pastAverage = calculatePastAverage(historyData);
  const change = predictedScore - currentScore;
  const pastToCurrentChange = currentScore - pastAverage;

  // Format time for display
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      {/* Header with refresh indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🔮 Health Score Prediction</h2>
          <p className="text-sm text-gray-600">AI-powered health monitoring with 30-minute predictions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">
            {lastUpdate && (
              <>
                Updated: <span className="font-bold">{lastUpdate}</span>
              </>
            )}
          </div>
          <button 
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
              isRefreshing 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Refresh data"
          >
            <span className={`inline-block transition-transform duration-300 ${isRefreshing ? 'animate-spin' : ''}`}>
              🔄
            </span>
          </button>
        </div>
      </div>

      {/* Circular Graphs - Only numbers and animations update */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-12">
        {/* Past Average */}
        <div className="text-center">
          <div className="mb-4">
            <div className="text-lg font-bold text-gray-600 mb-2">Past Average (6h)</div>
            <div className="text-sm text-gray-500 transition-opacity duration-500">
              {historyData.length > 0 ? (
                <>
                  {historyData.length} readings
                </>
              ) : (
                "No historical data"
              )}
            </div>
          </div>
          <CircularProgress 
            value={pastAverage} 
            max={100} 
            label="Average"
            color="#94a3b8"
            size={180}
          />
          <div className="mt-4">
            <ScoreCard
              title="6-Hour Baseline"
              score={pastAverage}
              color="#94a3b8"
              icon="📊"
              description={historyData.length > 0 ? 
                `Average of ${historyData.length} readings` : 
                "No historical data available"
              }
            />
          </div>
        </div>
        
        {/* Current Score */}
        <div className="text-center">
          <div className="mb-4">
            <div className="text-lg font-bold text-blue-600 mb-2">Current Score</div>
            <div className="text-sm text-gray-500">Live health assessment</div>
          </div>
          <CircularProgress 
            value={currentScore} 
            max={100} 
            label="Now"
            color="#3b82f6"
            size={220}
          />
          <div className="mt-4">
            <ScoreCard
              title="Current Health"
              score={currentScore}
              color="#3b82f6"
              icon="🎯"
              description={currentStatus}
            />
          </div>
        </div>
        
        {/* Predicted Score */}
        <div className="text-center">
          <div className="mb-4">
            <div className="text-lg font-bold text-purple-600 mb-2">Predicted (30 min)</div>
            <div className="text-sm text-gray-500">AI forecast</div>
          </div>
          <CircularProgress 
            value={predictedScore} 
            max={100} 
            label="Future"
            color="#8b5cf6"
            size={180}
          />
          <div className="mt-4">
            <ScoreCard
              title="Future Prediction"
              score={predictedScore}
              color="#8b5cf6"
              icon="🔮"
              description={predictedStatus}
            />
          </div>
        </div>
      </div>

      {/* Trend Analysis - Updates smoothly */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Trend Analysis & Prediction</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trend Indicator */}
          <div className="md:col-span-1">
            <TrendIndicator 
              current={currentScore}
              predicted={predictedScore}
              timeframe="30 minutes"
            />
          </div>
          
          {/* Score Comparison */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-sm font-bold text-gray-600 mb-3">Score Comparison (Last 6 Hours)</div>
              <div className="space-y-4">
                {/* 6-Hour Average → Current */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>6-Hour Average → Current</span>
                    <span className={`font-bold transition-colors duration-500 ${pastToCurrentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {pastToCurrentChange >= 0 ? '↑ Improved' : '↓ Declined'} by {Math.abs(pastToCurrentChange)} pts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gray-400 transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(100, pastAverage)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <AnimatedNumber value={pastAverage} /> → <AnimatedNumber value={currentScore} />
                    </div>
                  </div>
                </div>
                
                {/* Current → Predicted */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Current → Predicted</span>
                    <span className={`font-bold transition-colors duration-500 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {change >= 0 ? '↑ Will improve' : '↓ Will decline'} by {Math.abs(change)} pts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500 transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(100, currentScore)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <AnimatedNumber value={currentScore} /> → <AnimatedNumber value={predictedScore} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Readings Table */}
      {historyData.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">📈 Recent Readings</h3>
            <div className="text-xs text-gray-500">
              Showing {Math.min(5, historyData.length)} of {historyData.length} readings
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Time</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Heart Rate</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">SpO2</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Temp (°C)</th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Score</th>
                </tr>
              </thead>
              <tbody>
                {historyData.slice(0, 5).map((item, index) => {
                  const score = calculateHealthScore(item);
                  const vitals = item.vitals || item;
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {formatTime(item.timestamp)}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-900">
                        {vitals.heart_rate || '--'} BPM
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-900">
                        {vitals.spo2 || '--'}%
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-900">
                        {vitals.temperature ? vitals.temperature.toFixed(1) : '--'}°C
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <span className={`font-bold ${
                          score >= 80 ? 'text-green-600' :
                          score >= 60 ? 'text-blue-600' :
                          score >= 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {score}/100
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Change Display - Updates smoothly */}
      <div className="text-center mb-6">
        <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="text-sm font-semibold text-gray-600">Predicted Change in Next 30 Minutes</div>
          <div className="flex items-center gap-6">
            <div className={`text-5xl font-bold transition-colors duration-500 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}
              <AnimatedNumber value={change} duration={800} />
            </div>
            <div className="text-2xl text-gray-600">points</div>
            <div className={`text-4xl transition-transform duration-500 hover:scale-110 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '📈' : '📉'}
            </div>
          </div>
          <div className="text-sm text-gray-500 transition-opacity duration-500">
            {change > 5 ? "Significant improvement expected" :
             change > 0 ? "Slight improvement expected" :
             change < -5 ? "Significant decline expected" :
             change < 0 ? "Slight decline expected" :
             "No significant change expected"}
          </div>
        </div>
      </div>

      {/* Auto-refresh indicator */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-green-500 animate-pulse' : 'bg-green-300'}`}></div>
            <span>Auto-refresh every 30 seconds</span>
            <span className="text-gray-400">•</span>
            <span>Patient ID: {patientId}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            Data source: <span className="font-bold">{API_BASE_URL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}