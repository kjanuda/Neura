"use client";

import { useState } from "react";

export default function PatientRegister() {
  const [form, setForm] = useState({
    patient_id: "",
    name: "",
    age: "",
    weight: "",
    gender: "male",
    diabetes: false,
    asthma: false,
    heart_disease: false,
    smoker: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5000/patients/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "Patient registered successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Patient Registration
        </h2>

        <input
          name="patient_id"
          placeholder="Patient ID (P001)"
          onChange={handleChange}
          className="input"
          required
        />

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="input"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <select
          name="gender"
          onChange={handleChange}
          className="input"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <div className="space-y-2 mt-4">
          <label><input type="checkbox" name="diabetes" onChange={handleChange} /> Diabetes</label><br />
          <label><input type="checkbox" name="asthma" onChange={handleChange} /> Asthma</label><br />
          <label><input type="checkbox" name="heart_disease" onChange={handleChange} /> Heart Disease</label><br />
          <label><input type="checkbox" name="smoker" onChange={handleChange} /> Smoker</label>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Register Patient
        </button>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
}
