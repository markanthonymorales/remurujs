import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'RemuruJS',
      fileName: (format) => `remuru.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vite-plugin-quantum-css'],
      output: {
        globals: {
          'vite-plugin-quantum-css': 'VitePluginQuantumCSS'
        }
      }
    }
  },
  plugins: [
    dts({ insertTypesEntry: true }),
  ]
});