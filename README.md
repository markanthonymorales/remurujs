# RemuruJS 🧬

RemuruJS is a high-velocity, ultra-lightweight frontend framework designed to collapse architectural overhead. By replacing heavy Virtual DOM reconciliation algorithms with a fine-grained, instruction-driven side-effect runtime, RemuruJS updates the native document layout with surgical precision.

---

## 🚀 Core Pillars

* **Zero Virtual DOM Overhead:** State mutations translate directly into atomic instruction packets (`CREATE`, `ATTR`, `LISTEN`, `APPEND`), modifying the layout instantly.
* **Granular Reactive Primitives:** Leverages predictable state cells (`useAdaptiveState`) and automatic dependency trackers (`createEffect`) to isolate re-renders.
* **Compiler-Friendly Footprint:** Explicitly designed to pair with AST-based optimization engines like [Vite Plugin Quantum CSS](https://github.com/markanthonymorales/vite-plugin-quantum-css/tree/main) to process advanced design layouts without runtime parsing bottlenecks.

---

## 📦 Installation

To link or import RemuruJS directly into your application workspace:

```bash
npm install remuru-js

```

---

## 🧩 Architectural Approaches

RemuruJS adapts smoothly to your preferred code style, offering both a low-level structural array matrix and an advanced, chainable Object-Oriented Component API.

### Approach 1: Low-Level Instruction Engine (Procedural)

The core rendering engine processes an array of atomic command descriptors. This offers absolute control over memory management and layout generation:

```javascript
import { RemuruRuntime, useAdaptiveState, createEffect } from 'remuru-js';

const runtime = new RemuruRuntime();
const [count, setCount] = useAdaptiveState(0);

createEffect(() => {
  runtime.clear();
  
  runtime.execute([
    { type: 'CREATE', target: 'card', value: 'div' },
    { type: 'ATTR', target: 'card', name: 'class', value: 'p-6 bg-gray-900 rounded-xl' },

    { type: 'CREATE', target: 'counter', value: 'p' },
    { type: 'TEXT', target: 'counterTxt', value: `Dispatched: ${count.value}` },
    { type: 'APPEND', target: 'counterTxt', name: 'counter' },
    { type: 'APPEND', target: 'counter', name: 'card' },

    { type: 'CREATE', target: 'btn', value: 'button' },
    { type: 'LISTEN', target: 'btn', name: 'click', value: () => setCount(count.value + 1) },
    { type: 'TEXT', target: 'btnTxt', value: 'Pulse' },
    { type: 'APPEND', target: 'btnTxt', name: 'btn' },
    { type: 'APPEND', target: 'btn', name: 'card' },

    { type: 'APPEND', target: 'card', name: 'root' }
  ], document.getElementById('app'));
});

```

### Approach 2: Reusable Object-Oriented Component Model (Recommended)

For production-scale codebases, you can encapsulate instruction pipelines into clean, chainable class factories. This cleanly isolates static compiler parameters (like `class`) from framework reactive parameters to prevent string-parser collisions:

```javascript
// src/Component.js
export class Component {
  constructor() {
    this.instructions = [];
  }

  createElement(target, tag, class = '') {
    this.instructions.push({ type: 'CREATE', target, value: tag });
    this.instructions.push({ type: 'ATTR', target, name: 'class', value: class });
    return this;
  }

  addText(target, text, parent) {
    this.instructions.push({ type: 'TEXT', target, value: text });
    this.instructions.push({ type: 'APPEND', target, name: parent });
    return this;
  }

  appendNode(target, parent) {
    this.instructions.push({ type: 'APPEND', target, name: parent });
    return this;
  }

  addEventListener(target, event, callback) {
    this.instructions.push({ type: 'LISTEN', target, name: event, value: callback });
    return this;
  }

  render() {
    return this.instructions;
  }
}

```

#### OOP Implementation:

```javascript
import { RemuruRuntime, useAdaptiveState, createEffect } from 'remuru-js';
import { Component } from './src/Component';

const runtime = new RemuruRuntime();
const [active, setActive] = useAdaptiveState(false);

createEffect(() => {
  runtime.clear();
  const ui = new Component();

  ui.createElement('panel', 'div', 'p-6 rounded-2xl border')
    // Isolate highly reactive changing utilities to the standardClass parameter
    .createElement('toggle', 'button', 'px-4 py-2 font-mono text-xs font-bold', active.value ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400')
    .addEventListener('toggle', 'click', () => setActive(!active.value))
    .addText('toggleTxt', active.value ? 'SYSTEM ON' : 'SYSTEM OFF', 'toggle')
    .appendNode('toggle', 'panel')
    .appendNode('panel', 'root');

  runtime.execute(ui.render(), document.getElementById('app'));
});

```

---

## 🛠️ API Matrix Reference

### Reactive Tokens

* **`useAdaptiveState(initialValue)`**
Initializes an atomic state cell capsule containing an observable reactive surface. Returns `[stateGetter, stateSetter]`. Read values using `.value`.
* **`createEffect(callback)`**
Registers an immediate subscription loop tracking any dynamic state cell accessed during invocation. Automatically schedules localized structural repairs when targeted cells change.

### Runtime Command Packets

| Instruction Type | Target Node Keyword | Property Modifier Path | Operational Role |
| --- | --- | --- | --- |
| `CREATE` | Unique ID string | HTML tag notation | Generates a detached DOM instance. |
| `ATTR` | Unique ID string | Target attribute key | Mutates explicit node properties. |
| `TEXT` | Unique ID string | Text content string | Mounts safe literal character values. |
| `LISTEN` | Unique ID string | Listener trigger type | Binds native event triggers. |
| `APPEND` | Unique ID string | Parent recipient key | Links nodes into the layout tree. |

---

## 📄 License

MIT License. Open source and free to extend!
