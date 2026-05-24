# RemuruJS OOP Integration Sandbox 🧪

An interactive, dark-themed developer dashboard built to test deep integration between the [RemuruJS](https://github.com/markanthonymorales/remurujs) reactive runtime core and the [Vite Plugin Quantum CSS](https://github.com/markanthonymorales/vite-plugin-quantum-css/tree/main) macro compilation engine.

This sandbox demonstrates how to abstract raw instruction arrays into an elegant, scaleable **Object-Oriented Programming (OOP)** component architecture without breaking static AST style parsers.

---

## 🚀 Key Implementation Features

* **OOP Component Abstraction:** Completely wraps raw framework layout objects (`{ type: 'CREATE', ... }`) into clean, chainable JavaScript class instances.
* **Static/Reactive Boundary Splitting:** Passes structural layouts via compiled `qClass` properties while isolating dynamic states inside standard `class` attributes to avoid compiler regex crashes.
* **Polymorphic Tab Routing:** Leverages Remuru's fine-grained atomic reactivity engine (`useAdaptiveState` and `createEffect`) to flush and rewrite the DOM instantly without using a Virtual DOM.
* **Macro Layout Expansion:** Integrates seamlessly with your local build utilities like `btn-quantum` and nested variant groups (e.g., `hover(...)`).

---

## 📂 Project Architecture

```text
remuru-test-app/
├── src/
│   ├── Component.js     # OOP Component Factory wrapper 🧩
│   ├── app.js           # Application Controller & App Views 💻
│   └── index.css        # Tailwind Core Directives 🎨
├── index.html           # System Shell Mount Target
├── tailwind.config.js   # Style Extraction Layer
└── vite.config.js       # Macro Engine and Debug Port mapping

```

---

## 🛠️ The Core OOP Layer (`./Component.js`)

This lightweight utility orchestrates chainable, flat instruction array footprints directly out of Object-Oriented layouts:

```javascript
export class Component {
  constructor() {
    this.instructions = [];
  }

  /**
   * Chainable element factory
   * @param {string} target - Internal reference node mapping identifier
   * @param {string} tag - HTML element node signature
   * @param {string} qClass - Static compiler utility strings
   * @param {string} standardClass - Dynamic framework runtime variable parameters
   */
  createElement(target, tag, qClass = '', standardClass = '') {
    this.instructions.push({ type: 'CREATE', target, value: tag });
    if (qClass) {
      this.instructions.push({ type: 'ATTR', target, name: 'qClass', value: qClass });
    }
    if (standardClass) {
      this.instructions.push({ type: 'ATTR', target, name: 'class', value: standardClass });
    }
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

---

## ⚡ Development Workflow

### 1. Initialize Local Environments

Ensure your framework symlinks or local dependencies are running cleanly inside your sandbox layout:

```bash
npm install

```

### 2. Launch the Development Server

Boot up the Vite pipeline with an explicitly cleared dependency cache state:

```bash
npx vite --force

```

---

## ⚙️ Critical Compiler Configuration Rules

### Tailwind File Extraction Strategy (`tailwind.config.js`)

Because components compile in memory at runtime inside the browser client, Tailwind must watch your JavaScript application engine files to catch utility string tokens before they deploy:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/app.js",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```