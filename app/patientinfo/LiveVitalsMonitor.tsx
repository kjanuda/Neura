"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000";

interface VitalMetrics {
  heart_rate?: number;
  spo2?: number;
  temperature?: number;
  blood_pressure?: {
    systolic: number;
    diastolic: number;
  };
  respiratory_rate?: number;
  timestamp?: string;
}

interface HealthPrediction {
  current_health?: {
    score?: number;
    status?: string;
    vitals?: VitalMetrics;
  };
  predicted_health?: {
    score?: number;
    status?: string;
  };
}

interface LiveVitalsProps {
  patientId?: string;
  prediction?: HealthPrediction;
}

// Circular Progress Component
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
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const safeValue = isNaN(value) ? 0 : Math.min(max, Math.max(0, value));
    let start = 0;
    const end = safeValue;
    const duration = 1500;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(Math.round(end));
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, max]);
  
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
        <div className="text-4xl font-bold" style={{ color }}>{displayValue}</div>
        {label && <div className="text-sm text-gray-600 font-semibold mt-1">{label}</div>}
      </div>
    </div>
  );
}

// Vital Status Indicator
function VitalStatusIndicator({ 
  value, 
  unit, 
  label, 
  normalRange, 
  status = "normal" 
}: { 
  value: number; 
  unit: string; 
  label: string; 
  normalRange: string; 
  status: "normal" | "warning" | "critical"; 
}) {
  const getStatusColor = () => {
    switch (status) {
      case "critical": return "bg-red-100 border-red-300 text-red-800";
      case "warning": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      default: return "bg-green-100 border-green-300 text-green-800";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "critical": return "🔴";
      case "warning": return "🟡";
      default: return "🟢";
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-gray-800">{label}</div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
          {getStatusIcon()} {status.toUpperCase()}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {value} <span className="text-lg text-gray-600">{unit}</span>
      </div>
      <div className="text-xs text-gray-500">Normal: {normalRange}</div>
    </div>
  );
}

// Main Live Vitals Monitor Component
export default function LiveVitalsMonitor({ 
  patientId = "P001", 
  prediction: externalPrediction 
}: LiveVitalsProps) {
  const [prediction, setPrediction] = useState<HealthPrediction | null>(externalPrediction || null);
  const [loading, setLoading] = useState(!externalPrediction);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Mock data for fallback
  const mockVitals: HealthPrediction = {
    current_health: {
      score: 78,
      status: "Stable",
      vitals: {
        heart_rate: 82,
        spo2: 96,
        temperature: 36.8,
        blood_pressure: {
          systolic: 118,
          diastolic: 76
        },
        respiratory_rate: 16,
        timestamp: new Date().toISOString()
      }
    },
    predicted_health: {
      score: 75,
      status: "Stable"
    }
  };

  // Analyze vital ranges
  const analyzeVitalStatus = (vital: string, value: number): "normal" | "warning" | "critical" => {
    const ranges: Record<string, { min: number; max: number; warningMin: number; warningMax: number }> = {
      heart_rate: { min: 60, max: 100, warningMin: 50, warningMax: 120 },
      spo2: { min: 95, max: 100, warningMin: 90, warningMax: 100 },
      temperature: { min: 36.1, max: 37.2, warningMin: 35.5, warningMax: 38.5 },
      blood_pressure_systolic: { min: 90, max: 120, warningMin: 85, warningMax: 140 },
      blood_pressure_diastolic: { min: 60, max: 80, warningMin: 55, warningMax: 90 },
      respiratory_rate: { min: 12, max: 20, warningMin: 10, warningMax: 25 }
    };

    const range = ranges[vital];
    if (!range) return "normal";

    if (value < range.min || value > range.max) {
      if (value < range.warningMin || value > range.warningMax) {
        return "critical";
      }
      return "warning";
    }
    return "normal";
  };

  const fetchVitals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try multiple endpoint patterns since we don't know the exact API structure
      const endpoints = [
        `${API_BASE_URL}/ml/predict/${patientId}`,
        `${API_BASE_URL}/api/predict/${patientId}`,
        `${API_BASE_URL}/predict/${patientId}`,
        `${API_BASE_URL}/vitals/${patientId}`,
      ];
      
      let response = null;
      let lastError = null;
      
      // Try each endpoint
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            // Add timeout
            signal: AbortSignal.timeout(5000)
          });
          
          if (response.ok) {
            break; // Found working endpoint
          }
        } catch (err) {
          lastError = err;
          continue; // Try next endpoint
        }
      }
      
      if (!response || !response.ok) {
        // If all endpoints fail, use mock data
        console.warn('All API endpoints failed, using mock data:', lastError);
        setPrediction(mockVitals);
        setError('API unavailable. Showing demo data.');
      } else {
        const result = await response.json();
        console.log('API Response:', result);
        
        // Handle different API response structures
        if (result.prediction) {
          setPrediction(result.prediction);
        } else if (result.vitals) {
          setPrediction({
            current_health: {
              score: result.score || 75,
              status: result.status || "Unknown",
              vitals: result.vitals
            }
          });
        } else if (result.heart_rate || result.spo2) {
          // Direct vitals object
          setPrediction({
            current_health: {
              score: 75,
              status: "Stable",
              vitals: result
            }
          });
        } else {
          // Unknown structure, use as is
          setPrediction(result);
        }
      }
      
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (err: any) {
      console.error("Error fetching vitals:", err);
      
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setError(`Connection attempt ${retryCount + 1}/3 failed. Retrying...`);
        // Auto-retry after delay
        setTimeout(fetchVitals, 2000);
      } else {
        setError("Cannot connect to server. Showing demo data.");
        setPrediction(mockVitals);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (externalPrediction) {
      setPrediction(externalPrediction);
      return;
    }

    fetchVitals();
    
    // Real-time updates every 15 seconds
    const interval = setInterval(fetchVitals, 15000);
    
    return () => clearInterval(interval);
  }, [patientId, externalPrediction]);

  const handleRetry = () => {
    setRetryCount(0);
    fetchVitals();
  };

  if (loading && !prediction) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-64 w-64 bg-gray-200 rounded-full animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const vitals = prediction?.current_health?.vitals || mockVitals.current_health?.vitals;
  const currentScore = prediction?.current_health?.score || 75;
  const predictedScore = prediction?.predicted_health?.score || currentScore - 3;

  // Ensure we have values (use mock as fallback)
  const heartRate = vitals?.heart_rate || 82;
  const spo2 = vitals?.spo2 || 96;
  const temperature = vitals?.temperature || 36.8;
  const respiratoryRate = vitals?.respiratory_rate || 16;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💓 Live Vitals Monitor</h2>
          <p className="text-sm text-gray-600">Real-time patient monitoring system</p>
        </div>
        
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">LIVE</span>
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500">
                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
          
          {error && (
            <div className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>

      {/* Circular Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-12">
        {/* Heart Rate */}
        <div className="text-center">
          <CircularProgress 
            value={heartRate} 
            max={200} 
            label="Heart Rate"
            color="#ef4444"
          />
          <div className="mt-4 w-full max-w-xs">
            <VitalStatusIndicator 
              value={heartRate}
              unit="BPM"
              label="Heart Rate"
              normalRange="60-100 BPM"
              status={analyzeVitalStatus("heart_rate", heartRate)}
            />
          </div>
        </div>
        
        {/* SpO2 */}
        <div className="text-center">
          <CircularProgress 
            value={spo2} 
            max={100} 
            label="SpO2"
            color="#3b82f6"
          />
          <div className="mt-4 w-full max-w-xs">
            <VitalStatusIndicator 
              value={spo2}
              unit="%"
              label="Oxygen Saturation"
              normalRange="95-100%"
              status={analyzeVitalStatus("spo2", spo2)}
            />
          </div>
        </div>
        
        {/* Temperature */}
        <div className="text-center">
          <CircularProgress 
            value={Math.round(temperature * 10)} 
            max={420} 
            label={`${temperature.toFixed(1)}°C`}
            color="#f59e0b"
          />
          <div className="mt-4 w-full max-w-xs">
            <VitalStatusIndicator 
              value={temperature}
              unit="°C"
              label="Temperature"
              normalRange="36.1-37.2°C"
              status={analyzeVitalStatus("temperature", temperature)}
            />
          </div>
        </div>
      </div>

      {/* Additional Metrics Grid */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Additional Metrics</h3>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition-colors"
          >
            🔄 Refresh Data
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Respiratory Rate */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Respiratory Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              {respiratoryRate}
              <span className="text-lg text-gray-600 ml-2">breaths/min</span>
            </div>
            <div className={`mt-2 inline-block px-2 py-1 rounded text-xs font-semibold ${
              analyzeVitalStatus("respiratory_rate", respiratoryRate) === "normal" 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
            }`}>
              {analyzeVitalStatus("respiratory_rate", respiratoryRate).toUpperCase()}
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Blood Pressure</div>
            {vitals?.blood_pressure ? (
              <>
                <div className="text-2xl font-bold text-gray-900">
                  {vitals.blood_pressure.systolic} / {vitals.blood_pressure.diastolic}
                  <span className="text-lg text-gray-600 ml-2">mmHg</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    analyzeVitalStatus("blood_pressure_systolic", vitals.blood_pressure.systolic) === "normal" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                    SYS
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    analyzeVitalStatus("blood_pressure_diastolic", vitals.blood_pressure.diastolic) === "normal" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                    DIA
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-400 italic">No BP data available</div>
            )}
          </div>

          {/* Health Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-gray-600 mb-2">AI Health Score</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-gray-900">{currentScore}</div>
              <div className="text-lg text-gray-600">/100</div>
              <div className={`ml-2 text-sm font-semibold ${
                predictedScore < currentScore ? 'text-red-600' : 'text-green-600'
              }`}>
                {predictedScore < currentScore ? '▼' : '▲'} 
                {Math.abs(predictedScore - currentScore)}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Predicted (30min): <span className="font-bold">{predictedScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Critical</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Patient ID: <span className="font-bold">{patientId}</span>
          {prediction === mockVitals && (
            <span className="ml-2 text-yellow-600">(Demo Mode)</span>
          )}
        </div>
      </div>
    </div>
  );
}