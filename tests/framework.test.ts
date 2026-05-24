import { describe, it, expect } from 'vitest';
import { createSignal, createEffect } from '../src/reactive/signals.js';
import { RemuruRuntime } from '../src/core/runtime.js';
import { AIOptimizer } from '../src/ai/optimizer.js';

describe('RemuruJS Reactive Engine', () => {
  it('should track and execute side-effects via signals', () => {
    const count = createSignal(0);
    let observed = 0;
    
    createEffect(() => {
      observed = count.value;
    });
    
    expect(observed).toBe(0);
    count.value = 42;
    expect(observed).toBe(42);
  });
});

describe('RemuruJS Core Runtime', () => {
  it('should convert instructions to real DOM nodes', () => {
    const runtime = new RemuruRuntime();
    const root = document.createElement('div');
    
    runtime.execute([
      { type: 'CREATE', target: 'el', value: 'span' },
      { type: 'TEXT', target: 'txt', value: 'Remuru Active' },
      { type: 'APPEND', target: 'txt', name: 'el' },
      { type: 'APPEND', target: 'el', name: 'root' }
    ], root);
    
    expect(root.innerHTML).toContain('<span>Remuru Active</span>');
  });
});

describe('RemuruJS AI Optimization Engine', () => {
  it('should analyze runtime complexity metric topologies', () => {
    const optimizer = new AIOptimizer();
    const shortCode = 'const x = 1;';
    const complexCode = 'for(let i=0; i<10; i++) { [1,2,3].map(x => x*2); }';
    
    const simpleReport = optimizer.analyze(shortCode);
    const complexReport = optimizer.analyze(complexCode);
    
    expect(simpleReport.complexity).toBe('Low');
    expect(complexReport.recommendsMemo).toBe(true);
  });
});