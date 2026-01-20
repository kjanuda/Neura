interface HistoryData {
  timestamp: string;
  heart_rate: number;
  spo2: number;
  temperature: number;
}

interface LiveChartProps {
  data: HistoryData[];
}

export default function LiveChart({ data }: LiveChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Trends</h2>
      
      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No historical data available</p>
          <p className="text-sm mt-2">Data will appear as sensor readings are recorded</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Simple data display - you can replace with a charting library */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Heart Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">SpO2</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Temperature</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(-10).reverse().map((record, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(record.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 font-medium text-red-600">
                      {record.heart_rate} bpm
                    </td>
                    <td className="py-3 px-4 font-medium text-blue-600">
                      {record.spo2}%
                    </td>
                    <td className="py-3 px-4 font-medium text-orange-600">
                      {record.temperature}°C
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center text-sm text-gray-500">
            Showing last {Math.min(10, data.length)} of {data.length} records
          </div>
        </div>
      )}
    </div>
  );
}