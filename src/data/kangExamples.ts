import { SyntaxExample, LanguageFeature } from '../types/kang';

export const kangExamples: SyntaxExample[] = [
  {
    title: "Hello World",
    description: "Basic output statement",
    code: `shout "Hello, World!"`,
    category: "basics"
  },
  {
    title: "Variables",
    description: "Declaring and using variables",
    code: `vibe name = "KANG"
vibe version = 1.0
shout name
shout version`,
    category: "variables"
  },
  {
    title: "Arithmetic Operations",
    description: "Basic math operations",
    code: `vibe x = 10
vibe y = 5
add result x y
shout result
sub difference x y
shout difference`,
    category: "arithmetic"
  },
  {
    title: "Loops",
    description: "Repeating operations",
    code: `vibe count = 0
grind 5
    shout "Looping..."
    add count count 1`,
    category: "loops"
  },
  {
    title: "Conditionals",
    description: "Making decisions",
    code: `vibe score = 85
fr score same 85
    shout "Perfect score!"`,
    category: "conditionals"
  },
  {
    title: "Complex Example",
    description: "Combining multiple features",
    code: `vibe count = 0
grind 5
    shout "Looping..."
    add count count 1

fr count same 5
    shout "Count reached 5!"

keep vibing count high 0`,
    category: "advanced"
  }
];

export const languageFeatures: LanguageFeature[] = [
  {
    id: "variables",
    title: "Variables",
    description: "Store and manipulate data using the 'vibe' keyword",
    syntax: "vibe variable_name = value",
    examples: [
      'vibe name = "John"',
      'vibe age = 25',
      'vibe isActive = true'
    ]
  },
  {
    id: "print",
    title: "Print Statement",
    description: "Output text or variable values using 'shout'",
    syntax: "shout value_or_variable",
    examples: [
      'shout "Hello World"',
      'shout variable_name',
      'shout 42'
    ]
  },
  {
    id: "arithmetic",
    title: "Arithmetic Operations",
    description: "Perform mathematical operations",
    syntax: "operation target source value",
    examples: [
      'add result x 5',
      'sub difference y 3',
      'mult product a b',
      'div quotient num 2'
    ]
  },
  {
    id: "loops",
    title: "Loops",
    description: "Repeat operations using 'grind'",
    syntax: "grind count",
    examples: [
      'grind 5',
      'grind variable_name'
    ]
  },
  {
    id: "conditionals",
    title: "Conditional Statements",
    description: "Make decisions using 'fr' and 'same'",
    syntax: "fr variable same value",
    examples: [
      'fr x same 10',
      'fr name same "John"',
      'fr isReady same true'
    ]
  },
  {
    id: "custom",
    title: "Custom Keywords",
    description: "Special KANG expressions",
    syntax: "keep vibing variable high value",
    examples: [
      'keep vibing energy high 100',
      'keep vibing mood high "happy"'
    ]
  }
];