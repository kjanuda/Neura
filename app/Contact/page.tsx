"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-slate-800 leading-tight mb-8">
                Let's Build<br />
                The Future<br />
                Together
              </h1>
            </div>

            {/* Contacts Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
                Contacts
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tel:</p>
                    <a href="tel:+94112345678" className="text-base md:text-lg text-slate-700 hover:text-blue-600 transition-colors">
                      +94 (77) 300-7426
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email:</p>
                    <a href="mailto:contact@neurainnovation.com" className="text-base md:text-lg text-slate-700 hover:text-blue-600 transition-colors">
                     janudakodi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location:</p>
                    <p className="text-base md:text-lg text-slate-700">
                      Colombo, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Where to buy button */}
            <div>
              <button className="group inline-flex items-center gap-4 text-slate-800 hover:text-blue-600 transition-colors">
                <div className="bg-blue-600 rounded-full p-4 group-hover:bg-blue-700 transition-colors">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg md:text-xl font-medium">Learn More About Our Research</span>
              </button>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-slate-700 text-base font-medium mb-3">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-slate-700 text-base font-medium mb-3">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-slate-700 text-base font-medium mb-3">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Work Email */}
              <div>
                <label htmlFor="email" className="block text-slate-700 text-base font-medium mb-3">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-slate-700 text-base font-medium mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your interest in our research..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-base hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Additional Info Section */}
        <div className="mt-20 md:mt-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-slate-800 text-xl font-semibold mb-4">Research Partnerships</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Interested in collaborating on healthcare AI research? We welcome academic and clinical partnerships.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-slate-800 text-xl font-semibold mb-4">Clinical Trials</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Hospitals interested in participating in multi-center validation studies can reach out to discuss opportunities.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-slate-800 text-xl font-semibold mb-4">Media Inquiries</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Press and media requests about our research breakthrough and 95% accuracy achievements are welcome.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}