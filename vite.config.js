import { cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const staticDirs = ['data', 'images', 'js'];

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const outDir = resolve('dist');
      mkdirSync(outDir, { recursive: true });

      for (const dir of staticDirs) {
        cpSync(resolve(dir), resolve(outDir, dir), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  base: '/cmr-dashboard/',
  plugins: [react(), copyStaticAssets()],
});
