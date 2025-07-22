import React from 'react';

interface FeatureButtonsProps {
  onFeatureClick: (feature: string) => void;
}

const FeatureButtons: React.FC<FeatureButtonsProps> = ({ onFeatureClick }) => {
  const features = [
    { id: 'variables', label: 'VARIABLES', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'print', label: 'PRINT STATEMENT', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'conditionals', label: 'CONDITIONAL STATEMENT', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'loops', label: 'LOOPS', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'arithmetic', label: 'ARITHMETIC OPERATORS', color: 'bg-red-500 hover:bg-red-600' },
    { id: 'custom', label: 'CUSTOM KEYWORDS', color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'operators', label: 'OPERATORS', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { id: 'examples', label: 'EXAMPLES', color: 'bg-teal-500 hover:bg-teal-600' }
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => onFeatureClick(feature.id)}
          className={`${feature.color} text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          {feature.label}
        </button>
      ))}
    </div>
  );
};

export default FeatureButtons;