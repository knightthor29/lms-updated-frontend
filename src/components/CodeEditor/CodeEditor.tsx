import React, { useState, useRef, useEffect } from 'react';
import { Play, Copy, Download, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, onRun, isRunning }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);

  useEffect(() => {
    const lines = value.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(value);
  };

  const downloadCode = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kang-code.kang';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearCode = () => {
    onChange('');
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-medium ml-4">main.kang</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
            title="Copy Code"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={downloadCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
            title="Download Code"
          >
            <Download size={16} />
          </button>
          <button
            onClick={clearCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
            title="Clear Code"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center space-x-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
              isRunning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
            }`}
          >
            <Play size={16} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <div className="flex">
          {/* Line Numbers */}
          <div className="bg-gray-800 text-gray-500 text-sm font-mono py-4 px-3 select-none border-r border-gray-700">
            {lineNumbers.map(num => (
              <div key={num} className="leading-6 text-right">
                {num}
              </div>
            ))}
          </div>

          {/* Code Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-96 bg-transparent text-gray-100 font-mono text-sm p-4 resize-none outline-none leading-6"
              placeholder="Write your KANG code here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Syntax Hints */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          <kbd className="px-1 py-0.5 bg-gray-700 rounded">Ctrl</kbd> + 
          <kbd className="px-1 py-0.5 bg-gray-700 rounded ml-1">Enter</kbd> to run
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;