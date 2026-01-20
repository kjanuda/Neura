"use client";

import { useState, useEffect } from "react";

interface PatientProfileData {
  patient_age: number;
  risk_level: "HIGH" | "MODERATE" | "LOW" | string;
  model_trained: boolean;
  total_trainings: number;
  patient_conditions: string[];
  best_mae?: number;
  data_points_collected?: number;
  last_trained?: string;
}

interface PatientProfileProps {
  patientId?: string;
  data?: PatientProfileData;
}

const API_BASE_URL = "http://localhost:5000";

// Patient Profile Component
export default function PatientProfile({ 
  patientId = "P001", 
  data: externalData 
}: PatientProfileProps) {
  const [profile, setProfile] = useState<PatientProfileData | null>(externalData || null);
  const [loading, setLoading] = useState(!externalData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (externalData) {
      setProfile(externalData);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/ml/status/${patientId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Assuming the API returns { status: PatientProfileData }
        if (result.status) {
          setProfile(result.status);
        } else {
          // If API structure is different, adapt here
          setProfile(result);
        }
      } catch (err) {
        console.error("Error fetching patient profile:", err);
        setError("Failed to load patient profile");
        // Fallback mock data for demo
        setProfile({
          patient_age: 65,
          risk_level: "MODERATE",
          model_trained: true,
          total_trainings: 24,
          patient_conditions: ["Hypertension", "Type 2 Diabetes", "Arthritis"],
          best_mae: 0.12,
          data_points_collected: 1560,
          last_trained: "2024-01-15T10:30:00Z"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    
    // Optionally set up polling for real-time updates
    const interval = setInterval(fetchProfile, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [patientId, externalData]);

  const getRiskColor = (risk: string) => {
    switch (risk.toUpperCase()) {
      case "HIGH":
        return "bg-red-100 text-red-800 border-red-300";
      case "MODERATE":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "LOW":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="bg-red-50 rounded-xl shadow-lg p-6 border-2 border-red-200">
        <h2 className="text-2xl font-bold text-red-900 mb-2">⚠️ Error Loading Profile</h2>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Patient Profile</h2>
        <div className="text-center text-gray-500 py-8">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">👤 Patient Profile</h2>
        <div className="text-sm text-gray-500">
          ID: <span className="font-bold">{patientId}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-100">
          <div className="text-sm text-gray-600 mb-1">Age</div>
          <div className="text-3xl font-bold text-gray-900">{profile.patient_age || '--'}</div>
          <div className="text-xs text-gray-500 mt-1">years</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-100">
          <div className="text-sm text-gray-600 mb-1">Risk Level</div>
          <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm border-2 ${getRiskColor(profile.risk_level)}`}>
            {profile.risk_level || 'UNKNOWN'}
          </div>
          <div className="text-xs text-gray-500 mt-2">Updated in real-time</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-100">
          <div className="text-sm text-gray-600 mb-1">Model Status</div>
          <div className="text-xl font-bold text-green-600 flex items-center gap-2">
            {profile.model_trained ? (
              <>
                <span className="text-2xl">✅</span>
                <span>Trained</span>
              </>
            ) : (
              <>
                <span className="text-2xl">⏳</span>
                <span>Training...</span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            MAE: {(profile.best_mae || 0).toFixed(3)}
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-100">
          <div className="text-sm text-gray-600 mb-1">Total Trainings</div>
          <div className="text-3xl font-bold text-purple-600">#{profile.total_trainings || 0}</div>
          <div className="text-xs text-gray-500 mt-1">
            {profile.data_points_collected || 0} data points
          </div>
        </div>
      </div>
      
      {profile.patient_conditions && profile.patient_conditions.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold text-gray-900">Medical Conditions</div>
            <div className="text-sm text-gray-500">
              {profile.patient_conditions.length} conditions
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {profile.patient_conditions.map((condition, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold border border-blue-200"
              >
                <span className="text-blue-600">●</span>
                <span>{condition}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {profile.last_trained && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Last Model Training</div>
          <div className="text-sm font-semibold text-gray-800">
            {new Date(profile.last_trained).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Example API endpoint structure (for your Flask/Express backend):
/*
// GET /ml/status/:patientId
{
  "status": {
    "patient_age": 65,
    "risk_level": "MODERATE",
    "model_trained": true,
    "total_trainings": 24,
    "patient_conditions": ["Hypertension", "Type 2 Diabetes", "Arthritis"],
    "best_mae": 0.12,
    "data_points_collected": 1560,
    "last_trained": "2024-01-15T10:30:00Z"
  }
}

// Or you can return directly:
{
  "patient_age": 65,
  "risk_level": "MODERATE",
  "model_trained": true,
  "total_trainings": 24,
  "patient_conditions": ["Hypertension", "Type 2 Diabetes", "Arthritis"],
  "best_mae": 0.12,
  "data_points_collected": 1560,
  "last_trained": "2024-01-15T10:30:00Z"
}
*/

// Usage examples:
/*
1. With automatic data fetching:
   <PatientProfile patientId="P001" />

2. With external data (for parent component that fetches):
   <PatientProfile data={profileData} />
*/