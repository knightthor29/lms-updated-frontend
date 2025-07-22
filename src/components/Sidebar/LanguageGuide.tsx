import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, BookOpen, Zap } from 'lucide-react';
import { languageFeatures, kangExamples } from '../../data/kangExamples';

interface LanguageGuideProps {
  onExampleSelect: (code: string) => void;
}

const LanguageGuide: React.FC<LanguageGuideProps> = ({ onExampleSelect }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['variables', 'print']));
  const [activeTab, setActiveTab] = useState<'features' | 'examples'>('features');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const groupedExamples = kangExamples.reduce((acc, example) => {
    if (!acc[example.category]) {
      acc[example.category] = [];
    }
    acc[example.category].push(example);
    return acc;
  }, {} as Record<string, typeof kangExamples>);

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
          <Code size={20} className="text-purple-600" />
          <span>KANG Language</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">Syntax guide and examples</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('features')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'features'
              ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BookOpen size={16} className="inline mr-2" />
          Features
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'examples'
              ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Zap size={16} className="inline mr-2" />
          Examples
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'features' ? (
          <div className="space-y-3">
            {languageFeatures.map((feature) => {
              const isExpanded = expandedSections.has(feature.id);
              return (
                <div key={feature.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSection(feature.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Syntax:</h4>
                        <code className="block bg-gray-100 p-2 rounded text-sm font-mono text-purple-600">
                          {feature.syntax}
                        </code>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
                        <div className="space-y-1">
                          {feature.examples.map((example, index) => (
                            <button
                              key={index}
                              onClick={() => onExampleSelect(example)}
                              className="block w-full text-left bg-gray-50 hover:bg-gray-100 p-2 rounded text-sm font-mono text-gray-700 transition-colors duration-200"
                            >
                              {example}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedExamples).map(([category, examples]) => (
              <div key={category} className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 capitalize">{category}</h3>
                </div>
                <div className="p-4 space-y-3">
                  {examples.map((example, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{example.title}</h4>
                        <button
                          onClick={() => onExampleSelect(example.code)}
                          className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors duration-200"
                        >
                          Load
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                      <pre className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-700 overflow-x-auto">
                        {example.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageGuide;