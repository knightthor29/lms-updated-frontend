export interface KangVariable {
  name: string;
  value: any;
  type: 'number' | 'string' | 'boolean';
}

export interface KangExecutionContext {
  variables: Map<string, KangVariable>;
  output: string[];
  error?: string;
}

export interface KangToken {
  type: 'keyword' | 'identifier' | 'number' | 'string' | 'operator' | 'whitespace' | 'comment';
  value: string;
  line: number;
  column: number;
}

export interface SyntaxExample {
  title: string;
  description: string;
  code: string;
  category: string;
}

export interface LanguageFeature {
  id: string;
  title: string;
  description: string;
  syntax: string;
  examples: string[];
}