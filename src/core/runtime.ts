export interface CompiledInstruction {
  type: 'CREATE' | 'TEXT' | 'ATTR' | 'PROP' | 'APPEND' | 'LISTEN';
  target: string;
  name?: string;
  value?: any;
}

export class RemuruRuntime {
  private elementCache = new Map<string, HTMLElement | Text>();

  execute(instructions: CompiledInstruction[], root: HTMLElement) {
    for (const inst of instructions) {
      switch (inst.type) {
        case 'CREATE': {
          const el = document.createElement(inst.value);
          this.elementCache.set(inst.target, el);
          break;
        }
        case 'TEXT': {
          const node = document.createTextNode(inst.value);
          this.elementCache.set(inst.target, node);
          break;
        }
        case 'ATTR': {
          const el = this.elementCache.get(inst.target) as HTMLElement;
          if (el && inst.name) el.setAttribute(inst.name, inst.value);
          break;
        }
        case 'PROP': {
          const el = this.elementCache.get(inst.target) as any;
          if (el && inst.name) el[inst.name] = inst.value;
          break;
        }
        case 'APPEND': {
          const parent = inst.name === 'root' ? root : (this.elementCache.get(inst.name!) as HTMLElement);
          const child = this.elementCache.get(inst.target);
          if (parent && child) parent.appendChild(child);
          break;
        }
        case 'LISTEN': {
          const el = this.elementCache.get(inst.target) as HTMLElement;
          if (el && inst.name) el.addEventListener(inst.name, inst.value);
          break;
        }
      }
    }
  }

  clear() {
    this.elementCache.clear();
  }
}