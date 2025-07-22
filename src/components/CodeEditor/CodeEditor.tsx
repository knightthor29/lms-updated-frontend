import React, { useState, useRef, useEffect } from 'react';
import { Play, Copy, Download, RotateCcw, Maximize2, Settings } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, onRun, isRunning }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <div 
      className={`code-editor-container fade-in ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}
      style={{ 
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Editor Header */}
      <div className="code-editor-header">
        <div className="code-editor-tabs">
          <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
            <div style={{ width: '12px', height: '12px', background: '#ff5f57', borderRadius: '50%' }}></div>
            <div style={{ width: '12px', height: '12px', background: '#ffbd2e', borderRadius: '50%' }}></div>
            <div style={{ width: '12px', height: '12px', background: '#28ca42', borderRadius: '50%' }}></div>
          </div>
          <div className="code-editor-tab active">
            <span style={{ fontSize: '13px', fontWeight: '600' }}>main.kang</span>
          </div>
        </div>
        
        <div className="code-editor-actions">
          <button
            onClick={copyCode}
            className="action-btn"
            title="Copy Code"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={downloadCode}
            className="action-btn"
            title="Download Code"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="action-btn"
            title="Toggle Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={clearCode}
            className="action-btn"
            title="Clear Code"
          >
            <RotateCcw size={16} />
          </button>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)', margin: '0 8px' }}></div>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="run-btn"
            style={{
              opacity: isRunning ? 0.7 : 1,
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            <Play size={16} />
            <span>{isRunning ? 'Running...' : 'Execute'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div style={{ display: 'flex', height: isFullscreen ? 'calc(100vh - 200px)' : '400px' }}>
        {/* Line Numbers */}
        <div 
          className="scrollbar-custom"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '14px',
            fontFamily: 'JetBrains Mono, monospace',
            padding: '20px 16px',
            userSelect: 'none',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: '60px',
            textAlign: 'right',
            lineHeight: '24px'
          }}
        >
          {lineNumbers.map(num => (
            <div key={num} style={{ height: '24px' }}>
              {num}
            </div>
          ))}
        </div>

        {/* Code Input */}
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="scrollbar-custom"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              color: '#ffffff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '14px',
              padding: '20px',
              resize: 'none',
              outline: 'none',
              border: 'none',
              lineHeight: '24px',
              letterSpacing: '0.5px'
            }}
            placeholder="// Welcome to KANG! Start coding here...
vibe message = &quot;Hello, World!&quot;
shout message"
            spellCheck={false}
          />
          
          {/* Syntax Hints */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '8px 12px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <kbd style={{ 
              padding: '2px 6px', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '4px',
              fontSize: '11px'
            }}>Ctrl</kbd>
            <span>+</span>
            <kbd style={{ 
              padding: '2px 6px', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '4px',
              fontSize: '11px'
            }}>Enter</kbd>
            <span>to run</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;