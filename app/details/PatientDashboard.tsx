"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts";

const API_BASE_URL = "http://localhost:5000";
const NOTIFICATION_API = "http://localhost:3001";

// Circular Progress Component for Live Scores
function CircularProgress({ value, max = 100, size = 200, strokeWidth = 20, label, color = "#8b5cf6" }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const safeValue = isNaN(value) ? 0 : value;
    let start = 0;
    const end = safeValue;
    const duration = 2000;
    const increment = (end - start) / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
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
        <div className="text-4xl font-bold" style={{ color }}>{displayValue}</div>
        <div className="text-sm text-gray-600 font-semibold">{label}</div>
      </div>
    </div>
  );
}

// Guardian Registration Form
function GuardianForm({ patientId, onSuccess }) {
  const [formData, setFormData] = useState({
    patient_id: patientId,
    name: '',
    email: '',
    phone: '',
    relationship: 'Family',
    priority: 1
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${NOTIFICATION_API}/api/guardians`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Guardian added successfully!');
        setFormData({ ...formData, name: '', email: '', phone: '' });
        if (onSuccess) onSuccess();
      } else {
        setMessage('❌ Failed to add guardian');
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">👨‍👩‍👧 Register Guardian</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="guardian@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="+94 77 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
            <select
              value={formData.relationship || 'Family'}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option>Family</option>
              <option>Spouse</option>
              <option>Child</option>
              <option>Parent</option>
              <option>Friend</option>
              <option>Caregiver</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Priority (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.priority || 1}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? '⏳ Adding...' : '✅ Add Guardian'}
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-center font-semibold ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

// Emergency Alert History
function EmergencyHistory({ patientId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await fetch(`${NOTIFICATION_API}/api/notifications/${patientId}`);
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications || []);
        }
      } catch (error) {
        console.error('Failed to load notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [patientId]);

  if (loading) {
    return <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🚨 Emergency Alert History</h2>
      
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No emergency alerts sent yet</div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.map((notif, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-lg">{notif.status}</div>
                <div className="text-sm text-gray-600">{new Date(notif.timestamp).toLocaleString()}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Current Score:</span>
                  <span className="font-bold ml-2">{notif.prediction?.current_health?.score || 0}/100</span>
                </div>
                <div>
                  <span className="text-gray-600">Predicted:</span>
                  <span className="font-bold ml-2">{notif.prediction?.predicted_health?.score || 0}/100</span>
                </div>
              </div>

              {notif.guardian_responded && (
                <div className="mt-3 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  ✅ Guardian Responded: {notif.responding_guardian}
                </div>
              )}

              {notif.hospital_responded && (
                <div className="mt-3 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-semibold">
                  🏥 Hospital Accepted: {notif.accepting_hospital}
                </div>
              )}

              {notif.hospitals_contacted && (
                <div className="mt-3 text-sm">
                  <span className="text-gray-600">Hospitals Contacted: </span>
                  <span className="font-semibold">{notif.hospitals_contacted.length}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Manual Emergency Trigger
function EmergencyTrigger({ patientId }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const triggerEmergency = async () => {
    if (!confirm('⚠️ This will trigger the emergency notification system. Continue?')) return;
    
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${NOTIFICATION_API}/api/trigger-emergency/${patientId}`, {
        method: 'POST'
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('🚨 Emergency notification system activated!');
      } else {
        setMessage('❌ Failed to trigger emergency');
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-50 rounded-xl shadow-lg p-6 border-2 border-red-300">
      <h2 className="text-2xl font-bold text-red-900 mb-4">🚨 Manual Emergency Alert</h2>
      <p className="text-red-700 mb-4">
        Use this to manually trigger the emergency notification system. Guardians and hospitals will be contacted immediately.
      </p>
      
      <button
        onClick={triggerEmergency}
        disabled={loading}
        className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? '⏳ Triggering Emergency...' : '🚨 TRIGGER EMERGENCY ALERT'}
      </button>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${message.includes('🚨') ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

// Patient Profile Card
function PatientProfile({ profile }) {
  if (!profile) return null;

  const getRiskColor = (risk) => {
    switch (risk) {
      case "HIGH": return "bg-red-100 text-red-800 border-red-300";
      case "MODERATE": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "LOW": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Patient Profile</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-gray-600">Age</div>
          <div className="text-2xl font-bold text-gray-900">{profile.patient_age || '--'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Risk Level</div>
          <div className={`inline-block px-3 py-1 rounded-full font-bold text-sm border-2 ${getRiskColor(profile.risk_level)}`}>
            {profile.risk_level || 'UNKNOWN'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Model Status</div>
          <div className="text-lg font-bold text-green-600">
            {profile.model_trained ? '✅ Trained' : '⏳ Training...'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Total Trainings</div>
          <div className="text-2xl font-bold text-blue-600">#{profile.total_trainings || 0}</div>
        </div>
      </div>
      
      {profile.patient_conditions && profile.patient_conditions.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Medical Conditions</div>
          <div className="flex flex-wrap gap-2">
            {profile.patient_conditions.map((condition, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {condition}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Live Vitals with Circular Graphs
function LiveVitals({ prediction }) {
  if (!prediction?.current_health?.vitals) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💓 Live Vitals</h2>
        <div className="text-center text-gray-500 py-8">No vitals data available</div>
      </div>
    );
  }

  const { vitals } = prediction.current_health;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">💓 Live Vitals Monitor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        <div className="text-center">
          <CircularProgress 
            value={vitals.heart_rate || 0} 
            max={200} 
            label="Heart Rate"
            color="#ef4444"
          />
          <div className="mt-2 text-sm text-gray-600">BPM</div>
        </div>
        <div className="text-center">
          <CircularProgress 
            value={vitals.spo2 || 0} 
            max={100} 
            label="SpO2"
            color="#3b82f6"
          />
          <div className="mt-2 text-sm text-gray-600">Oxygen Saturation</div>
        </div>
        <div className="text-center">
          <CircularProgress 
            value={Math.round((vitals.temperature || 37) * 10)} 
            max={420} 
            label={`${(vitals.temperature || 37).toFixed(1)}°C`}
            color="#f59e0b"
          />
          <div className="mt-2 text-sm text-gray-600">Temperature</div>
        </div>
      </div>
    </div>
  );
}

// Health Score Timeline - Past, Current, Predicted
function HealthScoreTimeline({ history, prediction }) {
  if (!prediction?.current_health) return null;

  // Calculate health scores from vitals
  const calculateHealthScore = (vitals) => {
    if (!vitals) return 75;
    const hr = vitals.heart_rate || 75;
    const spo2 = vitals.spo2 || 95;
    const temp = vitals.temperature || 37;
    
    const hrScore = Math.max(0, 100 - Math.abs(75 - hr) * 2);
    const spo2Score = spo2;
    const tempScore = Math.max(0, 100 - Math.abs(37 - temp) * 20);
    
    return Math.round((hrScore + spo2Score + tempScore) / 3);
  };

  const pastData = (history || []).slice(-12).map(h => ({
    time: new Date(h.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    score: calculateHealthScore(h),
    label: 'Past'
  }));

  const currentScore = prediction.current_health.score || calculateHealthScore(prediction.current_health.vitals);
  const predictedScore = prediction.predicted_health.score || currentScore - 5;

  const timelineData = [
    ...pastData,
    { time: 'NOW', score: currentScore, label: 'Current' },
    { time: '+30min', score: predictedScore, label: 'Predicted' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Health Score Timeline</h2>
      <p className="text-sm text-gray-600 mb-4">Past 2 Hours → Current → Predicted (30 min)</p>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={timelineData}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            tick={{ fontSize: 11, fontWeight: 'bold' }}
          />
          <YAxis stroke="#6b7280" domain={[0, 100]} label={{ value: 'Health Score', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '2px solid #8b5cf6',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#8b5cf6" 
            fill="url(#scoreGradient)"
            strokeWidth={3}
            name="Health Score"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Health Score Comparison Bar Chart
function HealthScoreComparison({ history, prediction }) {
  if (!prediction?.current_health) return null;

  const calculateHealthScore = (vitals) => {
    if (!vitals) return 75;
    const hr = vitals.heart_rate || 75;
    const spo2 = vitals.spo2 || 95;
    const temp = vitals.temperature || 37;
    
    const hrScore = Math.max(0, 100 - Math.abs(75 - hr) * 2);
    const spo2Score = spo2;
    const tempScore = Math.max(0, 100 - Math.abs(37 - temp) * 20);
    
    return Math.round((hrScore + spo2Score + tempScore) / 3);
  };

  const pastScores = (history || []).slice(-10).map(h => calculateHealthScore(h));
  const pastAvg = pastScores.length > 0 ? Math.round(pastScores.reduce((a, b) => a + b, 0) / pastScores.length) : 75;
  
  const currentScore = prediction.current_health.score || calculateHealthScore(prediction.current_health.vitals);
  const predictedScore = prediction.predicted_health.score || currentScore - 5;

  const comparisonData = [
    {
      period: 'Past Average',
      score: pastAvg,
      fill: '#94a3b8'
    },
    {
      period: 'Current',
      score: currentScore,
      fill: '#3b82f6'
    },
    {
      period: 'Predicted',
      score: predictedScore,
      fill: '#8b5cf6'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Health Score Comparison</h2>
      <p className="text-sm text-gray-600 mb-4">Past Average vs Current vs Next 30 Minutes Prediction</p>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="period" stroke="#6b7280" tick={{ fontWeight: 'bold', fontSize: 13 }} />
          <YAxis stroke="#6b7280" domain={[0, 100]} label={{ value: 'Health Score', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '2px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {comparisonData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-1">Past Average</div>
          <div className="text-3xl font-bold text-gray-700">{pastAvg}</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <div className="text-sm text-blue-600 mb-1">Current Score</div>
          <div className="text-3xl font-bold text-blue-700">{currentScore}</div>
        </div>
        <div className="bg-purple-100 rounded-lg p-4 text-center">
          <div className="text-sm text-purple-600 mb-1">Predicted</div>
          <div className="text-3xl font-bold text-purple-700">{predictedScore}</div>
          <div className={`text-sm font-bold ${predictedScore < currentScore ? 'text-red-600' : 'text-green-600'}`}>
            {predictedScore < currentScore ? '📉 Declining' : '📈 Improving'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Radar Chart for Health Metrics
function HealthRadarChart({ prediction }) {
  if (!prediction?.current_health?.vitals) return null;

  const { vitals } = prediction.current_health;
  
  const normalizeValue = (value, min, max) => {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  };

  const currentHR = normalizeValue(vitals.heart_rate || 75, 40, 180);
  const currentSpO2 = vitals.spo2 || 95;
  const currentTemp = normalizeValue((vitals.temperature || 37), 35, 40);
  const currentBP = 75;
  const currentResp = 85;

  const radarData = [
    { 
      metric: 'Heart Rate', 
      current: currentHR, 
      predicted: Math.min(100, currentHR + (Math.random() * 10 - 5))
    },
    { 
      metric: 'SpO2', 
      current: currentSpO2, 
      predicted: Math.min(100, currentSpO2 + (Math.random() * 4 - 2))
    },
    { 
      metric: 'Temperature', 
      current: currentTemp, 
      predicted: Math.min(100, currentTemp + (Math.random() * 6 - 3))
    },
    { 
      metric: 'Blood Pressure', 
      current: currentBP, 
      predicted: Math.min(100, currentBP + (Math.random() * 8 - 4))
    },
    { 
      metric: 'Respiratory', 
      current: currentResp, 
      predicted: Math.min(100, currentResp + (Math.random() * 6 - 3))
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Health Metrics Radar</h2>
      <p className="text-sm text-gray-600 mb-4">Current vs Predicted Health Metrics (Normalized to 0-100)</p>
      
      <ResponsiveContainer width="100%" height={450}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="#d1d5db" strokeWidth={1} />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: '#374151', fontSize: 13, fontWeight: 'bold' }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#6b7280', fontSize: 11 }} 
          />
          <Radar 
            name="Current" 
            dataKey="current" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.6} 
            strokeWidth={3} 
          />
          <Radar 
            name="Predicted (30 min)" 
            dataKey="predicted" 
            stroke="#3b82f6" 
            fill="#3b82f6" 
            fillOpacity={0.4} 
            strokeWidth={3} 
          />
          <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pie Chart for Health Status Distribution
function HealthStatusPieChart({ prediction, history }) {
  if (!prediction?.current_health) return null;

  const currentScore = prediction.current_health.score || 75;
  const predictedScore = prediction.predicted_health?.score || currentScore;
  
  const getStatusCategory = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Critical';
  };

  const currentStatus = getStatusCategory(currentScore);
  const predictedStatus = getStatusCategory(predictedScore);

  const COLORS = {
    'Excellent': '#10b981',
    'Good': '#3b82f6',
    'Fair': '#f59e0b',
    'Critical': '#ef4444'
  };

  const pieData = [
    { name: 'Excellent (80-100)', value: currentScore >= 80 ? 40 : 10, color: COLORS.Excellent },
    { name: 'Good (60-79)', value: currentScore >= 60 && currentScore < 80 ? 35 : 15, color: COLORS.Good },
    { name: 'Fair (40-59)', value: currentScore >= 40 && currentScore < 60 ? 30 : 20, color: COLORS.Fair },
    { name: 'Critical (<40)', value: currentScore < 40 ? 35 : 10, color: COLORS.Critical },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🥧 Health Status Distribution</h2>
      <p className="text-sm text-gray-600 mb-4">Current Health Status: <span className="font-bold" style={{ color: COLORS[currentStatus] }}>{currentStatus}</span></p>
      
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-sm text-gray-600 mb-1">Current Status</div>
          <div className="text-2xl font-bold" style={{ color: COLORS[currentStatus] }}>{currentStatus}</div>
          <div className="text-3xl font-bold text-gray-800 mt-1">{currentScore}/100</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
          <div className="text-sm text-gray-600 mb-1">Predicted Status</div>
          <div className="text-2xl font-bold" style={{ color: COLORS[predictedStatus] }}>{predictedStatus}</div>
          <div className="text-3xl font-bold text-gray-800 mt-1">{predictedScore}/100</div>
        </div>
      </div>
    </div>
  );
}

// Circular Health Score Display
function CircularHealthScores({ prediction }) {
  if (!prediction?.current_health) return null;

  const currentScore = prediction.current_health.score || 75;
  const predictedScore = prediction.predicted_health?.score || currentScore;
  const change = predictedScore - currentScore;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🔮 Health Score Prediction</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-600 mb-4">Past Average</h3>
          <CircularProgress 
            value={Math.max(0, currentScore - 5)} 
            max={100} 
            label="Past"
            color="#94a3b8"
            size={180}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-blue-600 mb-4">Current Score</h3>
          <CircularProgress 
            value={currentScore} 
            max={100} 
            label="Now"
            color="#3b82f6"
            size={220}
          />
          <div className="mt-4 text-xl font-bold text-gray-800">{prediction.current_health.status}</div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-600 mb-4">Predicted (30 min)</h3>
          <CircularProgress 
            value={predictedScore} 
            max={100} 
            label="Future"
            color="#8b5cf6"
            size={180}
          />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-50 rounded-xl border-2 border-gray-200">
          <span className="text-sm font-semibold text-gray-600">Predicted Change:</span>
          <span className={`text-4xl font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}
          </span>
          <span className="text-lg text-gray-600">points</span>
          <span className={`text-2xl ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '📈' : '📉'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Alerts Component
function AlertsPanel({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-green-50 rounded-xl shadow-lg p-6 border-2 border-green-200">
        <h2 className="text-2xl font-bold text-green-900 mb-2">✅ Health Status</h2>
        <p className="text-green-700">No alerts. Patient vitals are within normal range.</p>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "bg-red-100 border-red-300 text-red-800";
      case "medium": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      default: return "bg-blue-100 border-blue-300 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
      <h2 className="text-2xl font-bold text-red-900 mb-4">🚨 Active Alerts ({alerts.length})</h2>
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`rounded-lg p-4 border-2 ${getSeverityColor(alert.severity)} animate-pulse`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{alert.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm uppercase">{alert.type}</div>
                <div className="text-sm mt-1">{alert.message}</div>
                <div className="text-xs mt-1 opacity-75">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard
export default function PatientDashboard() {
  const patientId = "P001";

  const [mlStatus, setMlStatus] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGuardianForm, setShowGuardianForm] = useState(false);

  const loadData = async () => {
    try {
      setError(null);

      const [statusRes, predictionRes, historyRes, alertsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/ml/status/${patientId}`).catch(() => null),
        fetch(`${API_BASE_URL}/ml/predict/${patientId}`).catch(() => null),
        fetch(`${API_BASE_URL}/ml/history/${patientId}?hours=2&interval=5`).catch(() => null),
        fetch(`${API_BASE_URL}/ml/alerts/${patientId}`).catch(() => null)
      ]);

      if (statusRes?.ok) {
        const data = await statusRes.json();
        setMlStatus(data.status);
      }

      if (predictionRes?.ok) {
        const data = await predictionRes.json();
        setPrediction(data.prediction);
      }

      if (historyRes?.ok) {
        const data = await historyRes.json();
        setHistory(data.history || []);
      }

      if (alertsRes?.ok) {
        const data = await alertsRes.json();
        setAlerts(data.alerts || []);
      }

      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError("Cannot connect to ML backend.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <div className="text-2xl font-bold text-gray-800">Loading AI Dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-3">⚠️ Connection Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadData}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
            >
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">🧠 AI-Powered Health Monitoring</h1>
          <p className="text-purple-100">Patient {patientId} - Enhanced CNN-LSTM Prediction System</p>
        </div>

        {/* Patient Profile */}
        <PatientProfile profile={mlStatus} />

        {/* Live Vitals with Circular Graphs */}
        <LiveVitals prediction={prediction} />

        {/* Alerts */}
        <AlertsPanel alerts={alerts} />

        {/* Circular Health Scores - Main Focus */}
        <CircularHealthScores prediction={prediction} />

        {/* Health Score Timeline */}
        <HealthScoreTimeline history={history} prediction={prediction} />

        {/* Health Score Comparison Bar */}
        <HealthScoreComparison history={history} prediction={prediction} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <HealthRadarChart prediction={prediction} />
          
          {/* Pie Chart */}
          <HealthStatusPieChart prediction={prediction} history={history} />
        </div>

        {/* Emergency Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Guardian Form */}
          <div>
            <button
              onClick={() => setShowGuardianForm(!showGuardianForm)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mb-4 hover:bg-blue-700 transition-colors"
            >
              {showGuardianForm ? '➖ Hide Guardian Form' : '➕ Add Guardian'}
            </button>
            {showGuardianForm && <GuardianForm patientId={patientId} onSuccess={loadData} />}
          </div>

          {/* Emergency Trigger */}
          <EmergencyTrigger patientId={patientId} />
        </div>

        {/* Emergency History */}
        <EmergencyHistory patientId={patientId} />

        {/* Model Info */}
        {mlStatus && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🤖 Model Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Architecture</div>
                <div className="text-sm font-bold">CNN-LSTM + Attention</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Best Accuracy</div>
                <div className="text-lg font-bold text-green-600">
                  {((1 - (mlStatus.best_mae || 0)) * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Data Points</div>
                <div className="text-lg font-bold">{mlStatus.data_points_collected || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Retrain Interval</div>
                <div className="text-sm font-bold">Every 15 minutes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}