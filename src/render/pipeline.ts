import { AdaptiveComponent } from '../components/adaptive.js';

export type RenderMode = 'SSR' | 'CSR' | 'SSG' | 'Edge';

export class UniversalPipeline {
  constructor(private mode: RenderMode) {}

  setMode(mode: RenderMode) {
    this.mode = mode;
  }

  getMode(): RenderMode {
    return this.mode;
  }

  process(component: AdaptiveComponent): string | any[] {
    switch (this.mode) {
      case 'SSR':
      case 'SSG':
      case 'Edge':
        return `<div data-remuru-ssr="true">SSR Content Out</div>`;
      case 'CSR':
      default:
        return component.absorbAndCompile();
    }
  }
}