"use client";
import { useState, useEffect } from "react";
import { User, Mail, Calendar, Weight, Heart, Activity, Cigarette, Wind, CheckCircle, AlertCircle } from "lucide-react";

export default function PatientRegister() {
  const [form, setForm] = useState({
    patient_id: "",
    name: "",
    email: "",
    age: "",
    weight: "",
    gender: "male",
    diabetes: false,
    asthma: false,
    heart_disease: false,
    smoker: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setForm(prev => ({
          ...prev,
          name: user.name || "",
          email: user.email || ""
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("http://127.0.0.1:5000/patients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ text: data.message || "Patient registered successfully!", type: "success" });
        setForm(prev => ({
          patient_id: "",
          name: prev.name,
          email: prev.email,
          age: "",
          weight: "",
          gender: "male",
          diabetes: false,
          asthma: false,
          heart_disease: false,
          smoker: false,
        }));
      } else {
        setMessage({ text: data.message || "Registration failed", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Server connection error. Please check if backend is running.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Image Section */}
            <div className="bg-white p-0 lg:p-12 flex flex-col items-center justify-start relative overflow-hidden">
              
              <div className="relative z-10 text-center">
                
                
               
                
                

                {/* Robot Image */}
                <div className="relative max-w-md mx-auto">
                  <img 
                    src="/orbt.png" 
                    alt="Healthcare Robot" 
                    className="w-full h-auto object-contain drop-shadow-4xl transform hover:scale-105 transition-transform duration-800"
                  />
                </div>

                {/* Feature badges */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Secure Data</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Fast Process</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">24/7 Access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="p-8 lg:p-12 bg-white">
              <div className="max-w-xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Register New Patient
                  </h2>
                  <p className="text-gray-600">
                    Please fill in the patient information below
                  </p>
                </div>

                {/* Alert Message */}
                {message.text && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                      message.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {message.type === "success" ? (
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                )}

                {/* Patient ID */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Patient ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="patient_id"
                      placeholder="e.g., P001"
                      value={form.patient_id}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Age, Weight, Gender */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="age"
                        type="number"
                        placeholder="25"
                        value={form.age}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Weight <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="weight"
                        type="number"
                        placeholder="70"
                        value={form.weight}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Medical History */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Medical History
                  </label>
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          name="diabetes"
                          checked={form.diabetes}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">Diabetes</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          name="asthma"
                          checked={form.asthma}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <Wind className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">Asthma</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          name="heart_disease"
                          checked={form.heart_disease}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <Heart className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">Heart Disease</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          name="smoker"
                          checked={form.smoker}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <Cigarette className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">Smoker</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-base hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Registering Patient...</span>
                    </span>
                  ) : (
                    "Register Patient"
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Required fields
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}