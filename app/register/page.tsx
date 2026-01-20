"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Shield, Zap, Globe } from "lucide-react";

const LOGO_PATH = "/ne1.png";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (element: HTMLElement | null, options: {
            theme: string;
            size: string;
            width: number;
            text: string;
            shape: string;
          }) => void;
        };
      };
    };
  }
}

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "1081185265333-ali1h3hmm57nva2rig2epth3tb91qirj.apps.googleusercontent.com",
          callback: handleGoogleRegister,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignUpButton"),
          {
            theme: "outline",
            size: "large",
            width: 340,
            text: "signup_with",
            shape: "rectangular",
          }
        );
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogleAuth;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleRegister = async (response: { credential: string }) => {
    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await fetch("http://localhost:9090/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setMsg({ text: "✅ Registration successful! Redirecting...", type: "success" });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setMsg({ text: data.message || "Google registration failed", type: "error" });
      }
    } catch (err) {
      setMsg({ text: "Server connection error. Check if backend is running on port 9090.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setMsg({ text: "Please fill in all fields", type: "error" });
      return;
    }

    if (form.password.length < 6) {
      setMsg({ text: "Password must be at least 6 characters", type: "error" });
      return;
    }

    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setMsg({ text: "Registration successful! Redirecting...", type: "success" });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setMsg({ text: data.message || "Registration failed", type: "error" });
      }
    } catch (err) {
      setMsg({ text: "Server connection error. Check if backend is running on port 9090.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col lg:flex-row-reverse">
      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #818cf8 1px, transparent 1px), radial-gradient(circle at 80% 80%, #a78bfa 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-8 left-40 w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 flex flex-col justify-between p-8 sm:p-12 lg:p-16 w-full h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fadeInDown">
            <img src={LOGO_PATH} alt="Neura Logo" className="w-16 h-16 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight"></span>
          </div>

          {/* Main Illustration - Moved Higher */}
          <div className="flex items-center justify-center animate-fadeInUp relative px-4 -mt-12">
            <div className="relative max-w-lg w-full">
              {/* Glow effect behind robot */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-300/40 to-transparent blur-3xl transform scale-150"></div>
              
              {/* Robot Base */}
              <div className="relative z-20">
                <img 
                  src="/robot.png" 
                  alt="AI Robot Assistant" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Spinning Globe - positioned on robot's arm and lifted higher */}
              <div className="absolute top-[10%] left-[8%] w-[35%] spinning-globe z-30">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-400/40 rounded-full blur-xl"></div>
                  <img 
                    src="/ball.png" 
                    alt="Global Network" 
                    className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fadeInUp max-w-lg">
            {/* Feature Badges can be added here */}
          </div>

          {/* Footer */}
          <div className="text-gray-500 text-sm flex items-center justify-between">
            <span>© 2025 Neura </span>
            <span className="text-gray-400"></span>
          </div>
        </div>
      </div>

      {/* Left Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-auto bg-white">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center justify-center animate-fadeInDown">
            <div className="flex items-center gap-3">
              <img src={LOGO_PATH} alt="Neura Logo" className="w-16 h-16 object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">Neura</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2">
                Sign in
              </a>
            </p>
          </div>

          {/* Alert Message */}
          {msg.text && (
            <div
              className={`mb-6 p-4 rounded-2xl flex items-start gap-3 animate-slideDown shadow-lg ${
                msg.type === "success"
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-200"
                  : "bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-2 border-red-200"
              }`}
            >
              {msg.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5 animate-fadeInUp">
            {/* Name Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white text-sm sm:text-base hover:border-gray-300 hover:shadow-md"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white text-sm sm:text-base hover:border-gray-300 hover:shadow-md"
                placeholder="john@example.com"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition-all text-gray-900 placeholder-gray-400 bg-white text-sm sm:text-base hover:border-gray-300 hover:shadow-md pr-12"
                placeholder="Create a password (min. 6 characters)"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[44px] text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-6 text-sm sm:text-base shadow-xl hover:shadow-2xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Creating account...</span>
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="absolute bg-white px-4 text-sm text-gray-500 font-medium">or sign up with</span>
            </div>

            {/* Google Sign Up */}
            <div className="flex justify-center">
              <div id="googleSignUpButton" className="w-full flex justify-center"></div>
            </div>

            {/* Terms */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-700 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-700 underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spinGlobe {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out both;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        .spinning-globe {
          animation: spinGlobe 20s linear infinite;
          transform-origin: center center;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Mobile Responsive Improvements */
        @media (max-width: 640px) {
          .animate-fadeInUp,
          .animate-fadeInDown {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </div>
  );
}