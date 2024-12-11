import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DigimonDawnDuskData',
      fileName: 'digimon-dawn-dusk-data',
    },
  },
  plugins: [dts({
    exclude: ['src/validation'],
  })],
  test: {
    globals: true,
    environment: 'node',
  },
});
