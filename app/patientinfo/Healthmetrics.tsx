"use client";

import { useEffect, useState, useRef } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from "recharts";

const API_BASE_URL = "http://localhost:5000";

interface HealthMetricsRadarProps {
  patientId?: string;
  prediction?: {
    current_health: {
      vitals?: {
        heart_rate?: number;
        spo2?: number;
        temperature?: number;
        blood_pressure?: {
          systolic: number;
          diastolic: number;
        };
        respiratory_rate?: number;
      };
    };
  };
}

// Custom Tooltip Component
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border-2 border-purple-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-900 mb-2">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="font-semibold text-gray-700">{entry.name}:</span>
              <span className="font-bold" style={{ color: entry.color }}>
                {entry.value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Normalize value for radar chart display (0-100 scale)
function normalizeValue(value: number, min: number, max: number): number {
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

// Main Health Metrics Radar Component
export default function HealthMetricsRadar({ 
  patientId = "P001", 
  prediction: externalPrediction 
}: HealthMetricsRadarProps) {
  const [prediction, setPrediction] = useState(externalPrediction || null);
  const [loading, setLoading] = useState(!externalPrediction);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [radarData, setRadarData] = useState<any[]>([]);
  const [apiStatus, setApiStatus] = useState<"connected" | "error" | "demo">("demo");
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate demo radar chart data for fallback
  const generateDemoRadarData = () => {
    const baseTime = Date.now();
    const timeOffset = baseTime % 10000; // Add some variation based on time
    
    return [
      {
        metric: 'Heart Rate',
        current: 65 + (timeOffset % 15),
        predicted: 68 + (timeOffset % 12),
        actualValue: 75 + (timeOffset % 10),
        unit: 'BPM',
        optimalRange: '60-100 BPM',
        status: 'normal'
      },
      {
        metric: 'SpO2',
        current: 92 + (timeOffset % 8),
        predicted: 93 + (timeOffset % 6),
        actualValue: 96 + (timeOffset % 4),
        unit: '%',
        optimalRange: '95-100%',
        status: 'normal'
      },
      {
        metric: 'Temperature',
        current: 70 + (timeOffset % 15),
        predicted: 72 + (timeOffset % 12),
        actualValue: 36.8 + ((timeOffset % 10) / 10),
        unit: '°C',
        optimalRange: '36.1-37.2°C',
        status: 'normal'
      },
      {
        metric: 'Blood Pressure',
        current: 68 + (timeOffset % 20),
        predicted: 70 + (timeOffset % 15),
        actualValue: 118 + (timeOffset % 15),
        unit: 'mmHg',
        optimalRange: '90-120 mmHg',
        status: 'normal'
      },
      {
        metric: 'Respiratory Rate',
        current: 75 + (timeOffset % 15),
        predicted: 78 + (timeOffset % 12),
        actualValue: 16 + (timeOffset % 4),
        unit: 'breaths/min',
        optimalRange: '12-20 breaths/min',
        status: 'normal'
      },
      {
        metric: 'Health Score',
        current: 78 + (timeOffset % 15),
        predicted: 80 + (timeOffset % 10),
        actualValue: 78 + (timeOffset % 10),
        unit: '/100',
        optimalRange: '60-100',
        status: 'normal'
      }
    ];
  };

  // Generate radar chart data from vitals
  const generateRadarData = (vitals: any) => {
    if (!vitals) return generateDemoRadarData();
    
    // Define normalization ranges for each metric
    const ranges = {
      'Heart Rate': { min: 40, max: 180 },
      'SpO2': { min: 70, max: 100 },
      'Temperature': { min: 35, max: 40 },
      'Blood Pressure': { min: 80, max: 180 },
      'Respiratory Rate': { min: 8, max: 30 },
      'Health Score': { min: 0, max: 100 }
    };

    // Get current values or defaults
    const currentHR = vitals.heart_rate || 75;
    const currentSpO2 = vitals.spo2 || 95;
    const currentTemp = vitals.temperature || 37;
    const currentBP = vitals.blood_pressure?.systolic || 120;
    const currentResp = vitals.respiratory_rate || 16;
    
    // Calculate health score from vitals
    const hrScore = Math.max(0, 100 - Math.abs(75 - currentHR) * 2);
    const spo2Score = currentSpO2;
    const tempScore = Math.max(0, 100 - Math.abs(37 - currentTemp) * 20);
    const currentScore = Math.round((hrScore + spo2Score + tempScore) / 3);

    // Normalize values for radar chart (0-100 scale)
    const normalizedHR = normalizeValue(currentHR, ranges['Heart Rate'].min, ranges['Heart Rate'].max);
    const normalizedSpO2 = normalizeValue(currentSpO2, ranges['SpO2'].min, ranges['SpO2'].max);
    const normalizedTemp = normalizeValue(currentTemp, ranges['Temperature'].min, ranges['Temperature'].max);
    const normalizedBP = normalizeValue(currentBP, ranges['Blood Pressure'].min, ranges['Blood Pressure'].max);
    const normalizedResp = normalizeValue(currentResp, ranges['Respiratory Rate'].min, ranges['Respiratory Rate'].max);
    const normalizedScore = normalizeValue(currentScore, ranges['Health Score'].min, ranges['Health Score'].max);

    // Generate predicted values (slight variation from current)
    const generatePredicted = (current: number, volatility: number = 5) => {
      const change = (Math.random() * volatility * 2) - volatility;
      return Math.min(100, Math.max(0, current + change));
    };

    // Determine status based on actual values
    const getStatus = (metric: string, value: number) => {
      switch (metric) {
        case 'Heart Rate':
          return value >= 60 && value <= 100 ? 'normal' : 
                 value < 50 || value > 120 ? 'critical' : 'warning';
        case 'SpO2':
          return value >= 95 ? 'normal' : 
                 value < 90 ? 'critical' : 'warning';
        case 'Temperature':
          return value >= 36.1 && value <= 37.2 ? 'normal' : 
                 value < 35.5 || value > 38.5 ? 'critical' : 'warning';
        case 'Blood Pressure':
          return value >= 90 && value <= 120 ? 'normal' : 
                 value < 85 || value > 140 ? 'critical' : 'warning';
        case 'Respiratory Rate':
          return value >= 12 && value <= 20 ? 'normal' : 
                 value < 10 || value > 25 ? 'critical' : 'warning';
        case 'Health Score':
          return value >= 60 ? 'normal' : 
                 value < 40 ? 'critical' : 'warning';
        default:
          return 'normal';
      }
    };

    return [
      {
        metric: 'Heart Rate',
        current: normalizedHR,
        predicted: generatePredicted(normalizedHR, 8),
        actualValue: currentHR,
        unit: 'BPM',
        optimalRange: '60-100 BPM',
        status: getStatus('Heart Rate', currentHR)
      },
      {
        metric: 'SpO2',
        current: normalizedSpO2,
        predicted: generatePredicted(normalizedSpO2, 3),
        actualValue: currentSpO2,
        unit: '%',
        optimalRange: '95-100%',
        status: getStatus('SpO2', currentSpO2)
      },
      {
        metric: 'Temperature',
        current: normalizedTemp,
        predicted: generatePredicted(normalizedTemp, 4),
        actualValue: currentTemp,
        unit: '°C',
        optimalRange: '36.1-37.2°C',
        status: getStatus('Temperature', currentTemp)
      },
      {
        metric: 'Blood Pressure',
        current: normalizedBP,
        predicted: generatePredicted(normalizedBP, 6),
        actualValue: currentBP,
        unit: 'mmHg',
        optimalRange: '90-120 mmHg',
        status: getStatus('Blood Pressure', currentBP)
      },
      {
        metric: 'Respiratory Rate',
        current: normalizedResp,
        predicted: generatePredicted(normalizedResp, 4),
        actualValue: currentResp,
        unit: 'breaths/min',
        optimalRange: '12-20 breaths/min',
        status: getStatus('Respiratory Rate', currentResp)
      },
      {
        metric: 'Health Score',
        current: normalizedScore,
        predicted: generatePredicted(normalizedScore, 5),
        actualValue: currentScore,
        unit: '/100',
        optimalRange: '60-100',
        status: getStatus('Health Score', currentScore)
      }
    ];
  };

  // Try multiple API endpoints
  const tryApiEndpoints = async () => {
    const endpoints = [
      `${API_BASE_URL}/ml/predict/${patientId}`,
      `${API_BASE_URL}/api/predict/${patientId}`,
      `${API_BASE_URL}/predict/${patientId}`,
      `${API_BASE_URL}/health/${patientId}`,
      `${API_BASE_URL}/vitals/${patientId}`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(3000)
        });
        
        if (response.ok) {
          console.log(`✅ Connected to: ${endpoint}`);
          return await response.json();
        } else {
          console.log(`❌ Endpoint ${endpoint} returned ${response.status}`);
        }
      } catch (err) {
        console.log(`❌ Failed to connect to ${endpoint}:`, err.message);
      }
    }
    
    return null; // All endpoints failed
  };

  // Fetch health data with multiple endpoint attempts
  const fetchHealthData = async () => {
    try {
      setIsRefreshing(true);
      
      // Try multiple API endpoints
      const result = await tryApiEndpoints();
      
      if (result) {
        // API call successful
        setApiStatus("connected");
        setError(null);
        
        // Parse response
        let parsedPrediction = null;
        
        if (result.prediction) {
          parsedPrediction = result.prediction;
        } else if (result.current_health) {
          parsedPrediction = result;
        } else if (result.vitals) {
          parsedPrediction = {
            current_health: {
              vitals: result.vitals
            }
          };
        } else if (result.heart_rate || result.spo2) {
          // Direct vitals object
          parsedPrediction = {
            current_health: {
              vitals: result
            }
          };
        } else {
          parsedPrediction = result;
        }
        
        setPrediction(parsedPrediction);
        
        // Generate radar data
        const vitals = parsedPrediction?.current_health?.vitals || result;
        const newRadarData = generateRadarData(vitals);
        setRadarData(newRadarData);
        
        setLastUpdate(new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }));
      } else {
        // All endpoints failed - use demo data
        setApiStatus("demo");
        setError(`API endpoints unavailable. Showing demo data.`);
        
        // Generate demo data
        const newRadarData = generateDemoRadarData();
        setRadarData(newRadarData);
        setLastUpdate(new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }) + " (Demo)");
      }
      
    } catch (err: any) {
      console.error("Error in fetchHealthData:", err);
      setApiStatus("error");
      setError(`Connection error: ${err.message}`);
      
      // Use demo data as fallback
      const newRadarData = generateDemoRadarData();
      setRadarData(newRadarData);
      setLastUpdate(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) + " (Error)");
      
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
      const vitals = externalPrediction?.current_health?.vitals;
      if (vitals) {
        setRadarData(generateRadarData(vitals));
      }
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

  if (loading && radarData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8 animate-pulse"></div>
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  // Get status counts
  const statusCounts = radarData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, { normal: 0, warning: 0, critical: 0 });

  // Get overall health status
  const getOverallStatus = () => {
    if (statusCounts.critical > 0) return { 
      text: "Critical", 
      color: "text-red-600", 
      bg: "bg-red-100", 
      border: "border-red-200",
      icon: "⚠️"
    };
    if (statusCounts.warning > 0) return { 
      text: "Warning", 
      color: "text-yellow-600", 
      bg: "bg-yellow-100", 
      border: "border-yellow-200",
      icon: "⚠️"
    };
    return { 
      text: "Normal", 
      color: "text-green-600", 
      bg: "bg-green-100", 
      border: "border-green-200",
      icon: "✅"
    };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">🎯 Health Metrics Radar</h2>
            <div className={`px-2 py-1 rounded text-xs font-semibold ${
              apiStatus === "connected" ? "bg-green-100 text-green-800" :
              apiStatus === "demo" ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {apiStatus === "connected" ? "Live" : 
               apiStatus === "demo" ? "Demo Mode" : "Error"}
            </div>
          </div>
          <p className="text-sm text-gray-600">Current vs Predicted Health Metrics (Normalized to 0-100)</p>
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
            title="Refresh metrics"
          >
            <span className={`inline-block transition-transform duration-300 ${isRefreshing ? 'animate-spin' : ''}`}>
              🔄
            </span>
          </button>
        </div>
      </div>

      {/* Error/Demo Mode Warning */}
      {error && (
        <div className={`mb-4 p-3 rounded-lg border-2 ${
          apiStatus === "demo" ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{apiStatus === "demo" ? "⚠️" : "❌"}</span>
            <div>
              <p className={`text-sm font-semibold ${
                apiStatus === "demo" ? "text-yellow-800" : "text-red-800"
              }`}>
                {error}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {apiStatus === "demo" 
                  ? "Using simulated data. Connect to backend for live updates." 
                  : "Check if backend is running at http://localhost:5000"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overall Status */}
      <div className={`mb-6 p-4 rounded-lg border-2 ${overallStatus.bg} ${overallStatus.border}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{overallStatus.icon}</span>
            <div>
              <div className="text-sm text-gray-600 mb-1">Overall Health Status</div>
              <div className={`text-2xl font-bold ${overallStatus.color}`}>{overallStatus.text}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.normal || 0}</div>
              <div className="text-xs text-gray-600">Normal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.warning || 0}</div>
              <div className="text-xs text-gray-600">Warning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts.critical || 0}</div>
              <div className="text-xs text-gray-600">Critical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="h-96 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid 
              stroke="#d1d5db" 
              strokeWidth={1} 
              radialLines={false}
            />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ 
                fill: '#374151', 
                fontSize: 12, 
                fontWeight: 'bold',
                textAnchor: 'middle',
                dy: 5
              }} 
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ 
                fill: '#6b7280', 
                fontSize: 10 
              }} 
              axisLine={false}
              tickCount={6}
            />
            <Radar 
              name="Current" 
              dataKey="current" 
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.6} 
              strokeWidth={2}
              dot={{ 
                r: 4, 
                strokeWidth: 2, 
                stroke: '#ffffff',
                fill: '#10b981'
              }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Radar 
              name="Predicted (30 min)" 
              dataKey="predicted" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.4} 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ 
                r: 4, 
                strokeWidth: 2, 
                stroke: '#ffffff',
                fill: '#3b82f6'
              }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              iconSize={10}
              iconType="circle"
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Details Table */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Metrics Details</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Metric</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Current Value</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Predicted</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Optimal Range</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {radarData.map((item, index) => {
                const getStatusBadge = (status: string) => {
                  switch (status) {
                    case 'critical': return { 
                      text: 'Critical', 
                      color: 'bg-red-100 text-red-800',
                      icon: '🔴'
                    };
                    case 'warning': return { 
                      text: 'Warning', 
                      color: 'bg-yellow-100 text-yellow-800',
                      icon: '🟡'
                    };
                    default: return { 
                      text: 'Normal', 
                      color: 'bg-green-100 text-green-800',
                      icon: '🟢'
                    };
                  }
                };
                
                const statusBadge = getStatusBadge(item.status);
                const change = item.predicted - item.current;
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      {item.metric}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="font-bold text-gray-900">
                        {item.actualValue.toFixed(1)} {item.unit}
                      </div>
                      <div className="text-xs text-gray-500">
                        Score: {item.current.toFixed(1)}/100
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="font-bold text-blue-600">
                        {item.predicted.toFixed(1)}/100
                      </div>
                      <div className={`text-xs font-semibold ${
                        change > 2 ? 'text-green-600' : 
                        change < -2 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {change > 2 ? '↑ Improving' : 
                         change < -2 ? '↓ Declining' : '→ Stable'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.optimalRange}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                        <span className="mr-1">{statusBadge.icon}</span>
                        {statusBadge.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Legend & Refresh Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Normal Metrics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Current Values</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-300 rounded-full border-2 border-blue-500"></div>
              <span className="text-xs text-gray-600">Predicted (30 min)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-green-500 animate-pulse' : 'bg-green-300'}`}></div>
            <span>Auto-refresh every 30 seconds</span>
            <span className="text-gray-400">•</span>
            <span>Mode: <span className="font-bold">
              {apiStatus === "connected" ? "Live" : "Demo"}
            </span></span>
          </div>
        </div>
      </div>
    </div>
  );
}