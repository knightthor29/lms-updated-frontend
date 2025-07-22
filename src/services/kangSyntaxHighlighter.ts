import { KangToken } from '../types/kang';

export class KangSyntaxHighlighter {
  private keywords = [
    'vibe', 'shout', 'grind', 'add', 'sub', 'mult', 'div', 
    'fr', 'same', 'keep', 'vibing', 'high'
  ];

  private operators = ['=', '+', '-', '*', '/', '==', '!=', '<', '>', '<=', '>='];

  public tokenize(code: string): KangToken[] {
    const tokens: KangToken[] = [];
    const lines = code.split('\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      let column = 0;

      while (column < line.length) {
        const char = line[column];

        // Skip whitespace
        if (/\s/.test(char)) {
          const start = column;
          while (column < line.length && /\s/.test(line[column])) {
            column++;
          }
          tokens.push({
            type: 'whitespace',
            value: line.slice(start, column),
            line: lineIndex + 1,
            column: start + 1
          });
          continue;
        }

        // Comments
        if (char === '/' && line[column + 1] === '/') {
          tokens.push({
            type: 'comment',
            value: line.slice(column),
            line: lineIndex + 1,
            column: column + 1
          });
          break;
        }

        // String literals
        if (char === '"') {
          const start = column;
          column++; // Skip opening quote
          while (column < line.length && line[column] !== '"') {
            column++;
          }
          if (column < line.length) column++; // Skip closing quote
          
          tokens.push({
            type: 'string',
            value: line.slice(start, column),
            line: lineIndex + 1,
            column: start + 1
          });
          continue;
        }

        // Numbers
        if (/\d/.test(char)) {
          const start = column;
          while (column < line.length && /[\d.]/.test(line[column])) {
            column++;
          }
          tokens.push({
            type: 'number',
            value: line.slice(start, column),
            line: lineIndex + 1,
            column: start + 1
          });
          continue;
        }

        // Operators
        let foundOperator = false;
        for (const op of this.operators) {
          if (line.slice(column, column + op.length) === op) {
            tokens.push({
              type: 'operator',
              value: op,
              line: lineIndex + 1,
              column: column + 1
            });
            column += op.length;
            foundOperator = true;
            break;
          }
        }
        if (foundOperator) continue;

        // Identifiers and keywords
        if (/[a-zA-Z_]/.test(char)) {
          const start = column;
          while (column < line.length && /[a-zA-Z0-9_]/.test(line[column])) {
            column++;
          }
          const value = line.slice(start, column);
          
          tokens.push({
            type: this.keywords.includes(value) ? 'keyword' : 'identifier',
            value,
            line: lineIndex + 1,
            column: start + 1
          });
          continue;
        }

        // Single character (operators, punctuation)
        tokens.push({
          type: 'operator',
          value: char,
          line: lineIndex + 1,
          column: column + 1
        });
        column++;
      }
    }

    return tokens;
  }

  public highlight(code: string): string {
    const tokens = this.tokenize(code);
    let result = '';

    for (const token of tokens) {
      const className = this.getTokenClassName(token.type);
      if (className) {
        result += `<span class="${className}">${this.escapeHtml(token.value)}</span>`;
      } else {
        result += this.escapeHtml(token.value);
      }
    }

    return result;
  }

  private getTokenClassName(type: string): string {
    switch (type) {
      case 'keyword': return 'text-purple-400 font-semibold';
      case 'string': return 'text-green-400';
      case 'number': return 'text-blue-400';
      case 'comment': return 'text-gray-500 italic';
      case 'operator': return 'text-yellow-400';
      case 'identifier': return 'text-cyan-300';
      default: return '';
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}