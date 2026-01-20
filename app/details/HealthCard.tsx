interface HealthCardProps {
  title: string;
  value: number | undefined;
  unit: string;
  color?: 'red' | 'blue' | 'orange' | 'cyan' | 'green';
  normal?: string;
}

export default function HealthCard({ title, value, unit, color = 'blue', normal }: HealthCardProps) {
  const colorClasses = {
    red: 'border-red-200 bg-red-50',
    blue: 'border-blue-200 bg-blue-50',
    orange: 'border-orange-200 bg-orange-50',
    cyan: 'border-cyan-200 bg-cyan-50',
    green: 'border-green-200 bg-green-50'
  };

  const textColorClasses = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    cyan: 'text-cyan-600',
    green: 'text-green-600'
  };

  return (
    <div className={`p-6 rounded-xl border-2 shadow-sm ${colorClasses[color]} transition-all hover:shadow-md`}>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
        {title}
      </h3>
      <div className="flex items-baseline mb-2">
        <p className={`text-3xl font-bold ${textColorClasses[color]}`}>
          {value !== undefined ? value : '--'}
        </p>
        <span className="ml-2 text-lg text-gray-500 font-medium">{unit}</span>
      </div>
      {normal && (
        <p className="text-xs text-gray-500">
          Normal: {normal}
        </p>
      )}
    </div>
  );
}