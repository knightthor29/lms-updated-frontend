import React from 'react';
import { Play, FileText, Lightbulb, Zap, Code, BookOpen } from 'lucide-react';

interface QuickActionsProps {
  onNewFile: () => void;
  onLoadExample: () => void;
  onRunCode: () => void;
  onShowDocs: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onNewFile, 
  onLoadExample, 
  onRunCode, 
  onShowDocs 
}) => {
  const actions = [
    {
      icon: FileText,
      label: 'New File',
      description: 'Start with a blank canvas',
      onClick: onNewFile,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Lightbulb,
      label: 'Load Example',
      description: 'Try a sample program',
      onClick: onLoadExample,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      icon: Play,
      label: 'Run Code',
      description: 'Execute your program',
      onClick: onRunCode,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: BookOpen,
      label: 'Documentation',
      description: 'Learn KANG syntax',
      onClick: onShowDocs,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap size={20} className="text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon size={24} />
                <div>
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;