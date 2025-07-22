import React from 'react';
import { 
  Variable, 
  MessageSquare, 
  GitBranch, 
  RotateCcw, 
  Calculator, 
  Sparkles, 
  Settings, 
  Code 
} from 'lucide-react';

interface FeatureButtonsProps {
  onFeatureClick: (feature: string) => void;
}

const FeatureButtons: React.FC<FeatureButtonsProps> = ({ onFeatureClick }) => {
  const features = [
    { 
      id: 'variables', 
      label: 'Variables', 
      icon: Variable,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Store data with vibe'
    },
    { 
      id: 'print', 
      label: 'Print Statement', 
      icon: MessageSquare,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Output with shout'
    },
    { 
      id: 'conditionals', 
      label: 'Conditionals', 
      icon: GitBranch,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Logic with fr...same'
    },
    { 
      id: 'loops', 
      label: 'Loops', 
      icon: RotateCcw,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Repeat with grind'
    },
    { 
      id: 'arithmetic', 
      label: 'Arithmetic', 
      icon: Calculator,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Math operations'
    },
    { 
      id: 'custom', 
      label: 'Custom Keywords', 
      icon: Sparkles,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      description: 'Special expressions'
    },
    { 
      id: 'operators', 
      label: 'Operators', 
      icon: Settings,
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      description: 'Comparison ops'
    },
    { 
      id: 'examples', 
      label: 'Examples', 
      icon: Code,
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      description: 'Sample programs'
    }
  ];

  return (
    <div className="fade-in" style={{ marginBottom: '32px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onFeatureClick(feature.id)}
              className="hover-lift transform-gpu"
              style={{
                background: feature.gradient,
                border: 'none',
                borderRadius: '16px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              ></div>
              
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
                  <Icon size={24} color="white" />
                </div>
                <div>
                  <div style={{
                    fontWeight: '700',
                    fontSize: '16px',
                    color: 'white',
                    marginBottom: '4px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}>
                    {feature.label}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '500',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>
                    {feature.description}
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

export default FeatureButtons;