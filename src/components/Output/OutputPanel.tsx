import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { KangExecutionContext } from '../../types/kang';

interface OutputPanelProps {
  result: KangExecutionContext | null;
  onClear: () => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ result, onClear }) => {
  if (!result) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Terminal size={48} className="mx-auto mb-4 opacity-50" />
          <p>Run your code to see output here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Output Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-gray-300 text-sm font-medium">Output</span>
          {result.error ? (
            <div className="flex items-center space-x-1 text-red-400">
              <AlertCircle size={14} />
              <span className="text-xs">Error</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-green-400">
              <CheckCircle size={14} />
              <span className="text-xs">Success</span>
            </div>
          )}
        </div>
        
        <button
          onClick={onClear}
          className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
          title="Clear Output"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Output Content */}
      <div className="p-4 h-64 overflow-y-auto font-mono text-sm">
        {result.error ? (
          <div className="text-red-400 bg-red-900/20 p-3 rounded border border-red-800">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle size={16} />
              <span className="font-semibold">Execution Error</span>
            </div>
            <pre className="whitespace-pre-wrap">{result.error}</pre>
          </div>
        ) : (
          <div className="space-y-2">
            {result.output.length === 0 ? (
              <div className="text-gray-500 italic">No output generated</div>
            ) : (
              result.output.map((line, index) => (
                <div key={index} className="text-green-400">
                  <span className="text-gray-600 mr-2">{'>'}</span>
                  {line}
                </div>
              ))
            )}
          </div>
        )}

        {/* Variables Display */}
        {result.variables.size > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h4 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Variables</h4>
            <div className="space-y-2">
              {Array.from(result.variables.values()).map((variable, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-cyan-300">{variable.name}</span>
                  <span className="text-gray-400">=</span>
                  <span className={`${
                    variable.type === 'string' ? 'text-green-400' :
                    variable.type === 'number' ? 'text-blue-400' :
                    'text-purple-400'
                  }`}>
                    {variable.type === 'string' ? `"${variable.value}"` : String(variable.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;