export default function HealthApplications() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      

      {/* Vital Monitors Section */}
      
 

      {/* What We Do Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-8">
            What We Do
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            We design and develop next-generation solutions at the intersection of:
          </p>
          
          <ul className="space-y-3 mb-8 ml-6">
            <li className="text-lg text-slate-700 list-disc">Internet of Things (IoT)</li>
            <li className="text-lg text-slate-700 list-disc">Edge AI & Machine Learning</li>
            <li className="text-lg text-slate-700 list-disc">Low-power embedded systems</li>
            <li className="text-lg text-slate-700 list-disc">Smart environments & automation</li>
          </ul>

          <p className="text-lg text-slate-600 leading-relaxed">
            Our platforms enable devices to collect data, analyze it locally, and act intelligently—even in resource-constrained environments.
          </p>
        </div>
      </div>
    </div>
  );
}