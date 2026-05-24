import { createSignal, Signal } from '../reactive/signals.js';
import { RenderMode, UniversalPipeline } from '../render/pipeline.js';
import { AIOptimizer, OptimizationReport } from '../ai/optimizer.js';

export function useAdaptiveState<T>(initialValue: T): [Signal<T>, (v: T) => void] {
  const signal = createSignal(initialValue);
  const setter = (newValue: T) => {
    signal.value = newValue;
  };
  return [signal, setter];
}

export function useRenderMode(pipeline: UniversalPipeline): { mode: RenderMode; transform: (m: RenderMode) => void } {
  return {
    mode: pipeline.getMode(),
    transform: (m: RenderMode) => pipeline.setMode(m)
  };
}

export function useAIOptimize(source: string): OptimizationReport {
  const optimizer = new AIOptimizer();
  return optimizer.analyze(source);
}