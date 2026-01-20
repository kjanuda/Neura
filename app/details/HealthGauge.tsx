interface HealthGaugeProps {
  score: number;
  status: string;
  trend: string;
}

export default function HealthGauge({ score, status, trend }: HealthGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 60) return 'bg-yellow-100 border-yellow-300';
    if (score >= 40) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "IMPROVING": return "📈";
      case "DETERIORATING": return "📉";
      case "STABLE": return "➡️";
      default: return "❓";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🧠 AI Health Assessment</h2>
      
      <div className="flex items-center justify-center gap-8">
        {/* Score Display */}
        <div className={`w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center ${getScoreBg(score)}`}>
          <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <div className="text-sm text-gray-600 font-medium mt-2">/ 100</div>
        </div>

        {/* Status Info */}
        <div className="flex-1">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Health Status</p>
              <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{status}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Trend</p>
              <p className="text-2xl font-semibold text-gray-700">
                {getTrendIcon(trend)} {trend}
              </p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Excellent (80-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Good (60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">Fair (40-59)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Poor (0-39)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}