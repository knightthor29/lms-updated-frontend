import { KangVariable, KangExecutionContext, KangToken } from '../types/kang';

export class KangInterpreter {
  private context: KangExecutionContext;

  constructor() {
    this.context = {
      variables: new Map(),
      output: [],
      error: undefined
    };
  }

  public execute(code: string): KangExecutionContext {
    this.context = {
      variables: new Map(),
      output: [],
      error: undefined
    };

    try {
      const lines = code.split('\n').filter(line => line.trim() !== '');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '' || line.startsWith('//')) continue;
        
        this.executeLine(line, i + 1);
      }
    } catch (error) {
      this.context.error = `Runtime Error: ${error.message}`;
    }

    return this.context;
  }

  private executeLine(line: string, lineNumber: number): void {
    // Variable declaration: vibe name = value
    if (line.startsWith('vibe ')) {
      this.executeVariableDeclaration(line);
      return;
    }

    // Print statement: shout "message"
    if (line.startsWith('shout ')) {
      this.executePrintStatement(line);
      return;
    }

    // Assignment: add var var value
    if (line.startsWith('add ')) {
      this.executeAddition(line);
      return;
    }

    // Subtraction: sub var var value
    if (line.startsWith('sub ')) {
      this.executeSubtraction(line);
      return;
    }

    // Multiplication: mult var var value
    if (line.startsWith('mult ')) {
      this.executeMultiplication(line);
      return;
    }

    // Division: div var var value
    if (line.startsWith('div ')) {
      this.executeDivision(line);
      return;
    }

    // Loop: grind count
    if (line.startsWith('grind ')) {
      this.executeLoop(line, lineNumber);
      return;
    }

    // Conditional: fr condition same value
    if (line.startsWith('fr ')) {
      this.executeConditional(line);
      return;
    }

    // Keep statement: keep vibing var high value
    if (line.startsWith('keep vibing ')) {
      this.executeKeepStatement(line);
      return;
    }

    throw new Error(`Unknown statement at line ${lineNumber}: ${line}`);
  }

  private executeVariableDeclaration(line: string): void {
    const match = line.match(/^vibe\s+(\w+)\s*=\s*(.+)$/);
    if (!match) {
      throw new Error('Invalid variable declaration syntax');
    }

    const [, name, valueStr] = match;
    const value = this.parseValue(valueStr.trim());
    
    this.context.variables.set(name, {
      name,
      value,
      type: typeof value as 'number' | 'string' | 'boolean'
    });
  }

  private executePrintStatement(line: string): void {
    const match = line.match(/^shout\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid print statement syntax');
    }

    const valueStr = match[1].trim();
    let output: string;

    if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
      // String literal
      output = valueStr.slice(1, -1);
    } else {
      // Variable reference
      const variable = this.context.variables.get(valueStr);
      if (!variable) {
        throw new Error(`Variable '${valueStr}' not found`);
      }
      output = String(variable.value);
    }

    this.context.output.push(output);
  }

  private executeAddition(line: string): void {
    const match = line.match(/^add\s+(\w+)\s+(\w+)\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid addition syntax');
    }

    const [, target, source, valueStr] = match;
    const sourceVar = this.context.variables.get(source);
    if (!sourceVar) {
      throw new Error(`Variable '${source}' not found`);
    }

    const value = this.parseValue(valueStr.trim());
    const result = sourceVar.value + value;

    this.context.variables.set(target, {
      name: target,
      value: result,
      type: typeof result as 'number' | 'string' | 'boolean'
    });
  }

  private executeSubtraction(line: string): void {
    const match = line.match(/^sub\s+(\w+)\s+(\w+)\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid subtraction syntax');
    }

    const [, target, source, valueStr] = match;
    const sourceVar = this.context.variables.get(source);
    if (!sourceVar) {
      throw new Error(`Variable '${source}' not found`);
    }

    const value = this.parseValue(valueStr.trim());
    const result = sourceVar.value - value;

    this.context.variables.set(target, {
      name: target,
      value: result,
      type: typeof result as 'number' | 'string' | 'boolean'
    });
  }

  private executeMultiplication(line: string): void {
    const match = line.match(/^mult\s+(\w+)\s+(\w+)\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid multiplication syntax');
    }

    const [, target, source, valueStr] = match;
    const sourceVar = this.context.variables.get(source);
    if (!sourceVar) {
      throw new Error(`Variable '${source}' not found`);
    }

    const value = this.parseValue(valueStr.trim());
    const result = sourceVar.value * value;

    this.context.variables.set(target, {
      name: target,
      value: result,
      type: typeof result as 'number' | 'string' | 'boolean'
    });
  }

  private executeDivision(line: string): void {
    const match = line.match(/^div\s+(\w+)\s+(\w+)\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid division syntax');
    }

    const [, target, source, valueStr] = match;
    const sourceVar = this.context.variables.get(source);
    if (!sourceVar) {
      throw new Error(`Variable '${source}' not found`);
    }

    const value = this.parseValue(valueStr.trim());
    if (value === 0) {
      throw new Error('Division by zero');
    }

    const result = sourceVar.value / value;

    this.context.variables.set(target, {
      name: target,
      value: result,
      type: typeof result as 'number' | 'string' | 'boolean'
    });
  }

  private executeLoop(line: string, lineNumber: number): void {
    const match = line.match(/^grind\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid loop syntax');
    }

    const countStr = match[1].trim();
    const count = this.parseValue(countStr);
    
    if (typeof count !== 'number' || count < 0) {
      throw new Error('Loop count must be a positive number');
    }

    // For simplicity, we'll just output the loop execution
    for (let i = 0; i < count; i++) {
      this.context.output.push(`Loop iteration ${i + 1}`);
    }
  }

  private executeConditional(line: string): void {
    const match = line.match(/^fr\s+(\w+)\s+same\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid conditional syntax');
    }

    const [, varName, valueStr] = match;
    const variable = this.context.variables.get(varName);
    if (!variable) {
      throw new Error(`Variable '${varName}' not found`);
    }

    const compareValue = this.parseValue(valueStr.trim());
    
    if (variable.value === compareValue) {
      this.context.output.push(`Condition true: ${varName} equals ${compareValue}`);
    } else {
      this.context.output.push(`Condition false: ${varName} (${variable.value}) does not equal ${compareValue}`);
    }
  }

  private executeKeepStatement(line: string): void {
    const match = line.match(/^keep vibing\s+(\w+)\s+high\s+(.+)$/);
    if (!match) {
      throw new Error('Invalid keep statement syntax');
    }

    const [, varName, valueStr] = match;
    const value = this.parseValue(valueStr.trim());
    
    this.context.variables.set(varName, {
      name: varName,
      value,
      type: typeof value as 'number' | 'string' | 'boolean'
    });

    this.context.output.push(`Keeping ${varName} vibing high at ${value}`);
  }

  private parseValue(valueStr: string): any {
    // String literal
    if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
      return valueStr.slice(1, -1);
    }

    // Number
    if (!isNaN(Number(valueStr))) {
      return Number(valueStr);
    }

    // Boolean
    if (valueStr === 'true' || valueStr === 'false') {
      return valueStr === 'true';
    }

    // Variable reference
    const variable = this.context.variables.get(valueStr);
    if (variable) {
      return variable.value;
    }

    throw new Error(`Unknown value: ${valueStr}`);
  }

  public getVariables(): KangVariable[] {
    return Array.from(this.context.variables.values());
  }
}