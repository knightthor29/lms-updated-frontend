import React from 'react';
import { Play, FileText, Lightbulb, BookOpen, Zap, Sparkles } from 'lucide-react';

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
      description: 'Start fresh',
      onClick: onNewFile,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: Lightbulb,
      label: 'Load Example',
      description: 'Try samples',
      onClick: onLoadExample,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: Play,
      label: 'Execute',
      description: 'Run code',
      onClick: onRunCode,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: BookOpen,
      label: 'Guide',
      description: 'Learn syntax',
      onClick: onShowDocs,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  return (
    <div className="glass-card slide-in-left" style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '20px' 
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '10px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Zap size={20} color="white" />
        </div>
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '700',
            color: 'white',
            marginBottom: '2px'
          }}>
            Quick Actions
          </h3>
          <p style={{ 
            fontSize: '13px', 
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Get started quickly
          </p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '12px' 
      }}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="hover-lift transform-gpu"
              style={{
                background: action.gradient,
                border: 'none',
                borderRadius: '16px',
                padding: '20px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}></div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Icon size={20} color="white" />
                </div>
                <div>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '14px',
                    color: 'white',
                    marginBottom: '2px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}>
                    {action.label}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>
                    {action.description}
                  </div>
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