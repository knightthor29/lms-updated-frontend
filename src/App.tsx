import React, { useState } from 'react';
import Header from './components/Header/Header';
import CodeEditor from './components/CodeEditor/CodeEditor';
import OutputPanel from './components/Output/OutputPanel';
import LanguageGuide from './components/Sidebar/LanguageGuide';
import QuickActions from './components/QuickActions/QuickActions';
import FeatureButtons from './components/FeatureButtons/FeatureButtons';
import { KangInterpreter } from './services/kangInterpreter';
import { KangExecutionContext } from './types/kang';
import { kangExamples } from './data/kangExamples';
import './styles/globals.css';

function App() {
  const [code, setCode] = useState(`// Welcome to KANG Programming Language!
// Experience the future of coding

vibe greeting = "Hello, KANG World!"
shout greeting

vibe count = 0
grind 3
    shout "Iteration in progress..."
    add count count 1

fr count same 3
    shout "Loop completed successfully!"

keep vibing energy high 100
shout energy`);

  const [output, setOutput] = useState<KangExecutionContext | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const interpreter = new KangInterpreter();

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate execution delay for better UX
    setTimeout(() => {
      try {
        const result = interpreter.execute(code);
        setOutput(result);
      } catch (error) {
        setOutput({
          variables: new Map(),
          output: [],
          error: `Execution failed: ${error.message}`
        });
      } finally {
        setIsRunning(false);
      }
    }, 800);
  };

  const clearOutput = () => {
    setOutput(null);
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
  };

  const loadRandomExample = () => {
    const randomExample = kangExamples[Math.floor(Math.random() * kangExamples.length)];
    setCode(randomExample.code);
  };

  const newFile = () => {
    setCode('// New KANG file\n// Start coding your ideas here...\n\n');
    setOutput(null);
  };

  const handleFeatureClick = (feature: string) => {
    const featureExamples = {
      variables: `// Variables in KANG
vibe name = "Developer"
vibe age = 25
vibe isActive = true

shout name
shout age
shout isActive`,
      print: `// Print statements
shout "Hello, World!"
vibe message = "Welcome to KANG"
shout message

vibe number = 42
shout number`,
      conditionals: `// Conditional statements
vibe score = 95
fr score same 95
    shout "Perfect score achieved!"

vibe status = "active"
fr status same "active"
    shout "System is running"`,
      loops: `// Loop operations
vibe counter = 0
grind 5
    shout "Processing iteration..."
    add counter counter 1

shout "Loop completed"
shout counter`,
      arithmetic: `// Arithmetic operations
vibe x = 15
vibe y = 7

add sum x y
sub difference x y
mult product x y
div quotient x y

shout sum
shout difference
shout product
shout quotient`,
      custom: `// Custom KANG expressions
vibe energy = 50
keep vibing energy high 100
shout energy

vibe mood = "happy"
keep vibing mood high "excellent"
shout mood`,
      operators: `// Comparison operators
vibe a = 10
vibe b = 10

fr a same b
    shout "Values are equal"

vibe c = 5
fr c same 10
    shout "This won't print"`,
      examples: kangExamples[0].code
    };

    if (featureExamples[feature as keyof typeof featureExamples]) {
      setCode(featureExamples[feature as keyof typeof featureExamples]);
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <main style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 20px 40px 20px' 
      }}>
        {/* Feature Buttons */}
        <FeatureButtons onFeatureClick={handleFeatureClick} />

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: showGuide ? '320px 1fr' : '1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Sidebar */}
          {showGuide && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <QuickActions
                onNewFile={newFile}
                onLoadExample={loadRandomExample}
                onRunCode={runCode}
                onShowDocs={() => setShowGuide(!showGuide)}
              />
              <LanguageGuide onExampleSelect={loadExample} />
            </div>
          )}

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Toggle Guide Button */}
            {!showGuide && (
              <div className="fade-in">
                <button
                  onClick={() => setShowGuide(true)}
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <BookOpen size={16} />
                  Show Language Guide
                </button>
              </div>
            )}

            {/* Code Editor */}
            <div className="slide-in-right">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '16px' 
              }}>
                <div>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '4px'
                  }}>
                    Code Editor
                  </h2>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    Write and execute your KANG programs
                  </p>
                </div>
                {showGuide && (
                  <button
                    onClick={() => setShowGuide(false)}
                    className="btn-secondary"
                    style={{ fontSize: '14px' }}
                  >
                    Hide Guide
                  </button>
                )}
              </div>
              <CodeEditor
                value={code}
                onChange={setCode}
                onRun={runCode}
                isRunning={isRunning}
              />
            </div>

            {/* Output Panel */}
            <div className="slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '4px'
                }}>
                  Execution Output
                </h2>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  See your program results and variable states
                </p>
              </div>
              <OutputPanel result={output} onClear={clearOutput} />
            </div>

            {/* Featured Example */}
            <div className="glass-card fade-in" style={{ 
              padding: '32px',
              animationDelay: '0.4s'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '20px' 
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  padding: '10px',
                  borderRadius: '12px'
                }}>
                  <Code size={20} color="white" />
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '2px'
                  }}>
                    Featured Example
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    Complete KANG program demonstration
                  </p>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(67, 233, 123, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                }}></div>
                
                <pre style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: '24px',
                  margin: 0,
                  overflowX: 'auto'
                }}>
{`vibe count = 0

grind 5
    shout "Processing iteration..."
    add count count 1

fr count same 5
    shout "All iterations completed!"

keep vibing energy high 100
shout energy`}
                </pre>
              </div>
              
              <button
                onClick={() => loadExample(`vibe count = 0

grind 5
    shout "Processing iteration..."
    add count count 1

fr count same 5
    shout "All iterations completed!"

keep vibing energy high 100
shout energy`)}
                className="btn-primary"
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Play size={16} />
                Load This Example
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '40px 20px',
        marginTop: '60px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 className="gradient-text" style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              KANG Programming Language
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Modern, expressive, and intuitive programming for everyone
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '32px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            <a 
              href="#docs" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              Documentation
            </a>
            <a 
              href="#community" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              Community
            </a>
            <a 
              href="#github" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;