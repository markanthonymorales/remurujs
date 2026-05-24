import { CompiledInstruction } from '../core/runtime.js';

export type ComponentSourceType = 'JSX' | 'Template' | 'Script';

export interface AdaptiveComponentConfig {
  type: ComponentSourceType;
  source: string;
  state?: Record<string, any>;
}

export class AdaptiveComponent {
  constructor(private config: AdaptiveComponentConfig) {}

  absorbAndCompile(): CompiledInstruction[] {
    if (this.config.type === 'Template') {
      return this.compileTemplate(this.config.source);
    }
    return [
      { type: 'CREATE', target: 'el0', value: 'div' },
      { type: 'TEXT', target: 't0', value: this.config.source },
      { type: 'APPEND', target: 't0', name: 'el0' },
      { type: 'APPEND', target: 'el0', name: 'root' }
    ];
  }

  private compileTemplate(html: string): CompiledInstruction[] {
    const tagMatch = html.match(/<([^\s>]+)([^>]*)>([^<]*)/);
    if (!tagMatch) return [];
    const [_, tag, attrs, text] = tagMatch;
    const instructions: CompiledInstruction[] = [
      { type: 'CREATE', target: 'el0', value: tag }
    ];
    if (text && text.trim()) {
      instructions.push({ type: 'TEXT', target: 't0', value: text.trim() });
      instructions.push({ type: 'APPEND', target: 't0', name: 'el0' });
    }
    instructions.push({ type: 'APPEND', target: 'el0', name: 'root' });
    return instructions;
  }
}