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

function App() {
  const [code, setCode] = useState(`// Welcome to KANG Programming Language!
// Try this example:

vibe count = 0

grind 5
    shout "Looping..."
    add count count 1

fr count same 5
    shout "Count reached 5!"

keep vibing count high 0`);

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
    }, 500);
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
    setCode('// New KANG file\n\n');
    setOutput(null);
  };

  const handleFeatureClick = (feature: string) => {
    const featureExamples = {
      variables: 'vibe name = "KANG"\nvibe version = 1.0\nshout name\nshout version',
      print: 'shout "Hello, World!"\nvibe message = "Welcome to KANG"\nshout message',
      conditionals: 'vibe score = 85\nfr score same 85\n    shout "Perfect score!"',
      loops: 'vibe count = 0\ngrind 5\n    shout "Looping..."\n    add count count 1',
      arithmetic: 'vibe x = 10\nvibe y = 5\nadd result x y\nshout result\nsub difference x y\nshout difference',
      custom: 'vibe energy = 50\nkeep vibing energy high 100\nshout energy',
      operators: 'vibe a = 10\nvibe b = 3\nadd sum a b\nsub diff a b\nmult prod a b\ndiv quot a b',
      examples: kangExamples[0].code
    };

    if (featureExamples[feature as keyof typeof featureExamples]) {
      setCode(featureExamples[feature as keyof typeof featureExamples]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Buttons */}
        <FeatureButtons onFeatureClick={handleFeatureClick} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          {showGuide && (
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <QuickActions
                  onNewFile={newFile}
                  onLoadExample={loadRandomExample}
                  onRunCode={runCode}
                  onShowDocs={() => setShowGuide(!showGuide)}
                />
                <LanguageGuide onExampleSelect={loadExample} />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`${showGuide ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="space-y-6">
              {/* Toggle Guide Button */}
              {!showGuide && (
                <div className="flex justify-start">
                  <button
                    onClick={() => setShowGuide(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Show Language Guide
                  </button>
                </div>
              )}

              {/* Code Editor */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Code Editor</h2>
                  {showGuide && (
                    <button
                      onClick={() => setShowGuide(false)}
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
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
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Output</h2>
                <OutputPanel result={output} onClear={clearOutput} />
              </div>

              {/* Code Block Example */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Code Block Example</h3>
                <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-500">
                  <pre className="text-gray-100 font-mono text-sm overflow-x-auto">
                    <code>
{`vibe count = 0

grind 5
    shout "Looping..."
    add count count 1

fr count same 5
    shout "Count reached 5!"

keep vibing count high 0`}
                    </code>
                  </pre>
                </div>
                <button
                  onClick={() => loadExample(`vibe count = 0

grind 5
    shout "Looping..."
    add count count 1

fr count same 5
    shout "Count reached 5!"

keep vibing count high 0`)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
                >
                  Load This Example
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">KANG Programming Language</h3>
            <p className="text-gray-400 text-sm">
              A modern, expressive programming language with intuitive syntax
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <a href="#docs" className="text-gray-400 hover:text-white transition-colors duration-200">
                Documentation
              </a>
              <a href="#community" className="text-gray-400 hover:text-white transition-colors duration-200">
                Community
              </a>
              <a href="#github" className="text-gray-400 hover:text-white transition-colors duration-200">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;