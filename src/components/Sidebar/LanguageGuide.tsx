import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, BookOpen, Zap, Sparkles, Play } from 'lucide-react';
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
    <div className="glass-card slide-in-left" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '10px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Code size={20} color="white" />
          </div>
          <div>
            <h2 className="gradient-text" style={{ 
              fontSize: '20px', 
              fontWeight: '700',
              marginBottom: '2px'
            }}>
              KANG Guide
            </h2>
            <p style={{ 
              fontSize: '13px', 
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500'
            }}>
              Syntax & Examples
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <button
          onClick={() => setActiveTab('features')}
          style={{
            flex: 1,
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '600',
            background: activeTab === 'features' ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'transparent',
            color: activeTab === 'features' ? 'white' : 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderBottom: activeTab === 'features' ? '2px solid #667eea' : '2px solid transparent'
          }}
        >
          <BookOpen size={16} />
          <span>Features</span>
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          style={{
            flex: 1,
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '600',
            background: activeTab === 'examples' ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)' : 'transparent',
            color: activeTab === 'examples' ? 'white' : 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderBottom: activeTab === 'examples' ? '2px solid #667eea' : '2px solid transparent'
          }}
        >
          <Zap size={16} />
          <span>Examples</span>
        </button>
      </div>

      {/* Content */}
      <div className="scrollbar-custom" style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '20px'
      }}>
        {activeTab === 'features' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {languageFeatures.map((feature) => {
              const isExpanded = expandedSections.has(feature.id);
              return (
                <div 
                  key={feature.id} 
                  className="hover-lift"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => toggleSection(feature.id)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div>
                      <h3 style={{ 
                        fontWeight: '600', 
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}>
                        {feature.title}
                      </h3>
                      <p style={{ 
                        fontSize: '13px', 
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.4'
                      }}>
                        {feature.description}
                      </p>
                    </div>
                    <div style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}>
                      {isExpanded ? (
                        <ChevronDown size={16} color="rgba(255, 255, 255, 0.7)" />
                      ) : (
                        <ChevronRight size={16} color="rgba(255, 255, 255, 0.7)" />
                      )}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div style={{ 
                      padding: '0 20px 20px 20px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(0, 0, 0, 0.2)'
                    }}>
                      <div style={{ marginTop: '16px' }}>
                        <h4 style={{ 
                          fontSize: '13px', 
                          fontWeight: '600', 
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Syntax:
                        </h4>
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.4)',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '13px',
                          color: '#667eea',
                          fontWeight: '500'
                        }}>
                          {feature.syntax}
                        </div>
                      </div>
                      
                      <div style={{ marginTop: '16px' }}>
                        <h4 style={{ 
                          fontSize: '13px', 
                          fontWeight: '600', 
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginBottom: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Examples:
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {feature.examples.map((example, index) => (
                            <button
                              key={index}
                              onClick={() => onExampleSelect(example)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '12px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              }}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {Object.entries(groupedExamples).map(([category, examples]) => (
              <div 
                key={category}
                className="hover-lift"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h3 style={{ 
                    fontWeight: '700', 
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Sparkles size={16} />
                    {category}
                  </h3>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {examples.map((example, index) => (
                    <div 
                      key={index} 
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        marginBottom: '12px' 
                      }}>
                        <h4 style={{ 
                          fontWeight: '600', 
                          fontSize: '15px',
                          color: 'white'
                        }}>
                          {example.title}
                        </h4>
                        <button
                          onClick={() => onExampleSelect(example.code)}
                          className="btn-primary"
                          style={{
                            fontSize: '12px',
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Play size={12} />
                          Load
                        </button>
                      </div>
                      <p style={{ 
                        fontSize: '13px', 
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '12px',
                        lineHeight: '1.5'
                      }}>
                        {example.description}
                      </p>
                      <pre style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'rgba(255, 255, 255, 0.9)',
                        overflowX: 'auto',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        lineHeight: '1.6'
                      }}>
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