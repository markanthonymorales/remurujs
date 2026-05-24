export interface MicroConfig {
  name: string;
  entry: string;
}

export class RemuruOrchestrator {
  private modules = new Map<string, MicroConfig>();

  register(config: MicroConfig) {
    this.modules.set(config.name, config);
  }

  async mount(name: string, container: HTMLElement): Promise<void> {
    const mod = this.modules.get(name);
    if (!mod) throw new Error(`Micro-frontend ${name} not found.`);
    
    container.innerHTML = `<div data-mfe="${name}">Loading module from ${mod.entry}...</div>`;
  }
}