"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

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

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "1081185265333-ali1h3hmm57nva2rig2epth3tb91qirj.apps.googleusercontent.com",
          callback: handleGoogleLogin,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          {
            theme: "outline",
            size: "large",
            width: 340,
            text: "continue_with",
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

  const handleGoogleLogin = async (response: { credential: string }) => {
    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const googleUser = JSON.parse(jsonPayload);
      
      const res = await fetch("http://localhost:9090/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        
        const userData = {
          name: googleUser.name || data.user?.name || data.name,
          email: googleUser.email || data.user?.email || data.email,
          profilePicture: googleUser.picture || data.user?.profilePicture || data.picture,
          loginType: 'google'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        setMsg({ text: "✅ Login successful! Redirecting...", type: "success" });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setMsg({ text: data.message || "Google login failed", type: "error" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setMsg({ text: "Server connection error. Check if backend is running on port 9090.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setMsg({ text: "Please fill in all fields", type: "error" });
      return;
    }

    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        
        const userName = data.user?.name || data.name || form.email.split('@')[0];
        const userData = {
          name: userName,
          email: data.user?.email || form.email,
          profilePicture: null,
          loginType: 'manual'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        setMsg({ text: "Login successful! Redirecting...", type: "success" });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setMsg({ text: data.message || "Login failed", type: "error" });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col lg:flex-row">
      {/* Left Side - Video Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/scotty-ai-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-8 sm:p-12 lg:p-16 w-full h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fadeInDown">
            <img src={LOGO_PATH} alt="Neura Logo" className="w-16 h-16 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight"></span>
          </div>

          <div className="space-y-6 animate-fadeInUp max-w-lg"></div>

          <div className="text-gray-300 text-sm flex items-center justify-between">
            <span>© 2025 Neura </span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              New to Neura?{" "}
              <a href="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2">
                Create an account
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
                placeholder="Enter your password"
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

            {/* Sign In Button */}
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
                  <span>Signing in...</span>
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="absolute bg-white px-4 text-sm text-gray-500 font-medium">or continue with</span>
            </div>

            {/* Google Sign In */}
            <div className="flex justify-center">
              <div id="googleSignInButton" className="w-full flex justify-center"></div>
            </div>

            {/* Forgot Password */}
            <div className="text-center pt-4">
              <a href="/forgot-password" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors underline decoration-2 underline-offset-2 font-medium">
                Forgot your password?
              </a>
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
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out both;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}