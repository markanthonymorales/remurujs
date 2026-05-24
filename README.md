# RemuruJS

> **Absorb • Adapt • Accelerate**

RemuruJS is a high-velocity, ultra-lightweight frontend framework designed to collapse architectural overhead. Built around a core instruction-compiled runtime, it absorbs diverse component paradigms (JSX, Templates, raw Scripts), adapts automatically to multiple infrastructure topologies (CSR, SSR, SSG, Edge), and accelerates rendering loops via atomic, unified signals and autonomous AI-driven profile auto-tuning.

---

## 🚀 Core Philosophy

* **Absorb:** Ingest components written in standard HTML templates, functional JSX, or bare layout scripts without forcing a single style constraint on the author.
* **Adapt:** Run anywhere natively. Switch pipelines dynamically from a browser client to V8 edge workers with zero structural adjustments to code logic.
* **Accelerate:** Eradicate the Virtual DOM diffing overhead. Components are compiled down to highly optimized, sequential browser layout instructions executed over an explicit caching runtime.

---

## 🛠️ Key Architectural Pillars

1. **Instruction-Based Core Runtime (`src/core`)** Bypasses heavy tree-reconciliation cycles by converting layouts into a predictable array of targeted execution payloads (`CREATE`, `TEXT`, `ATTR`, `APPEND`, `LISTEN`).
2. **Unified Reactive State Engine (`src/reactive`)** An atomic reactivity paradigm driving fine-grained DOM tracking via highly responsive primitive `Signals` and isolated dependency contexts.
3. **Universal Rendering Pipeline (`src/render`)** A polymorphic layout pipeline serving Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), and Edge computing layers uniformly.
4. **AI Auto-Tuning Layer (`src/ai`)** A real-time structural analysis engine that tracks performance bottlenecks, quantifies execution loop complexities, and drops tuning hooks straight into hot codepaths.
5. **Micro-Frontend Orchestrator (`src/orchestrator`)** An integrated registry and loading layer built specifically to support seamless code splitting, multi-app coordination, and isolated module scaling.
6. **Quantum-CSS Adapter Module (`src/styles`)** An advanced styling layout adapter that looks for `quantum-css` as an optional peer dependency. It switches to native accelerated style layers automatically if found, failing over gracefully to standard DOM style injection if absent.

---

## 📦 Installation

Initialize your project and install the dependencies:

```bash
npm install

```

### Peer Dependencies

To unlock hyper-optimized styling capabilities, install `quantum-css` (optional):

```bash
npm install quantum-css --save-peer

```

---

## 📖 Developer API Usage Guide

### `useAdaptiveState`

A reactivity primitive driving fine-grained mutation mechanics. Returns a read-only responsive proxy along with a direct updater callback.

```typescript
import { RemuruRuntime, useAdaptiveState, createEffect } from 'remuru-js';

const runtime = new RemuruRuntime();
const [count, setCount] = useAdaptiveState(0);

createEffect(() => {
  runtime.clear();
  runtime.execute([
    { type: 'CREATE', target: 'counter', value: 'div' },
    { type: 'TEXT', target: 'label', value: `Iterations: ${count.value}` },
    { type: 'APPEND', target: 'label', name: 'counter' },
    { type: 'APPEND', target: 'counter', name: 'root' }
  ], document.getElementById('app')!);
});

// Triggers direct atomic layout instruction updating
setCount(count.value + 1);

```

### `useRenderMode`

Enables execution pipelines to shift environments mid-lifecycle, restructuring how layouts resolve data trees.

```typescript
import { UniversalPipeline, useRenderMode } from 'remuru-js';

const pipeline = new UniversalPipeline('CSR');
const { mode, transform } = useRenderMode(pipeline);

console.log(mode); // 'CSR'
transform('Edge'); // Pipeline re-configures internal output channels for Edge execution

```

### `useAIOptimize`

Dynamically profiles code blocks at runtime to diagnose complexity metrics and auto-tune operational performance profiles.

```typescript
import { useAIOptimize } from 'remuru-js';

const heavyScript = `
  const items = Array(500).fill(0);
  items.map(i => i * 2);
`;

const report = useAIOptimize(heavyScript);
console.log(report.complexity);     // 'High' or 'Medium'
console.log(report.recommendsMemo); // true

```

---

## 🧪 Development Workflow

### Build Targets

Compile and package production-ready artifacts into `dist/` containing dual ESM (`.js`) and CommonJS (`.cjs`) distributions complete with full TypeScript type definitions:

```bash
npm run build

```

### Local Playground

To explore real-time reactivity rendering sandboxes locally using Vite:

```bash
npm run dev

```

### Running Tests

Validate reactive engine side-effects, compiler operations, and AI topological tracking blocks through the Vitest testing suite:

```bash
npm run test

```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
