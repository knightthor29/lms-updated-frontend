import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Trash2, Activity } from 'lucide-react';
import { KangExecutionContext } from '../../types/kang';

interface OutputPanelProps {
  result: KangExecutionContext | null;
  onClear: () => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ result, onClear }) => {
  if (!result) {
    return (
      <div 
        className="glass-card fade-in"
        style={{ 
          padding: '32px',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          borderRadius: '20px',
          marginBottom: '20px',
          opacity: 0.7
        }}>
          <Terminal size={32} color="white" />
        </div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          Ready to Execute
        </h3>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '14px'
        }}>
          Run your KANG code to see the magic happen
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card fade-in" style={{ overflow: 'hidden' }}>
      {/* Output Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: result.error ? 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)' : 'linear-gradient(135deg, #00ff88 0%, #00e676 100%)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {result.error ? <AlertCircle size={16} color="white" /> : <CheckCircle size={16} color="white" />}
          </div>
          <div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: 'white',
              marginBottom: '2px'
            }}>
              Execution Output
            </h3>
            <p style={{ 
              fontSize: '12px',
              color: result.error ? '#ff4757' : '#00ff88',
              fontWeight: '500'
            }}>
              {result.error ? 'Error Occurred' : 'Executed Successfully'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onClear}
          className="action-btn"
          title="Clear Output"
          style={{ padding: '8px' }}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Output Content */}
      <div 
        className="scrollbar-custom"
        style={{ 
          padding: '20px',
          height: '280px',
          overflowY: 'auto',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          lineHeight: '22px'
        }}
      >
        {result.error ? (
          <div style={{
            background: 'rgba(255, 71, 87, 0.1)',
            border: '1px solid rgba(255, 71, 87, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '12px',
              color: '#ff4757',
              fontWeight: '600'
            }}>
              <AlertCircle size={16} />
              <span>Runtime Error</span>
            </div>
            <pre style={{ 
              whiteSpace: 'pre-wrap',
              color: '#ff6b7a',
              fontSize: '13px',
              lineHeight: '20px'
            }}>
              {result.error}
            </pre>
          </div>
        ) : (
          <div>
            {result.output.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                fontStyle: 'italic',
                padding: '40px 20px'
              }}>
                <Activity size={24} style={{ opacity: 0.5, marginBottom: '12px' }} />
                <p>No output generated</p>
              </div>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px'
                }}>
                  Console Output
                </h4>
                {result.output.map((line, index) => (
                  <div 
                    key={index} 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '8px',
                      padding: '8px 12px',
                      background: 'rgba(0, 255, 136, 0.05)',
                      borderLeft: '3px solid #00ff88',
                      borderRadius: '0 8px 8px 0'
                    }}
                  >
                    <span style={{ color: '#00ff88', fontSize: '12px', marginTop: '2px' }}>▶</span>
                    <span style={{ color: '#ffffff', flex: 1 }}>{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Variables Display */}
        {result.variables.size > 0 && (
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '20px'
          }}>
            <h4 style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#667eea',
                borderRadius: '50%'
              }}></div>
              Variables
            </h4>
            <div style={{ display: 'grid', gap: '12px' }}>
              {Array.from(result.variables.values()).map((variable, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span style={{ 
                    color: '#4facfe',
                    fontWeight: '600'
                  }}>
                    {variable.name}
                  </span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 12px' }}>:</span>
                  <span style={{
                    color: variable.type === 'string' ? '#00ff88' :
                           variable.type === 'number' ? '#4facfe' :
                           '#f093fb',
                    fontWeight: '500'
                  }}>
                    {variable.type === 'string' ? `"${variable.value}"` : String(variable.value)}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.4)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    marginLeft: '12px'
                  }}>
                    {variable.type}
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