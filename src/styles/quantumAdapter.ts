export class QuantumCSSAdapter {
  private isDetected: boolean = false;
  private quantumInstance: any = null;

  constructor() {
    this.detect();
  }

  private async detect() {
    try {
      const quantum = await import('vite-plugin-quantum-css');
      if (quantum) {
        this.isDetected = true;
        this.quantumInstance = quantum;
      }
    } catch (e) {
      this.isDetected = false;
    }
  }

  hasQuantum(): boolean {
    return this.isDetected;
  }

  applyQuantumStyle(element: HTMLElement, rule: string) {
    if (this.isDetected && this.quantumInstance?.apply) {
      this.quantumInstance.apply(element, rule);
    } else {
      element.style.cssText += rule;
    }
  }
}