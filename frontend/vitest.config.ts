import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      '@core': path.resolve(dirname, './src/core'),
      '@features': path.resolve(dirname, './src/features'),
      '@components': path.resolve(dirname, './src/components'),
      '@lib': path.resolve(dirname, './src/lib'),
      '@common': path.resolve(dirname, './src/common'),
      '@types': path.resolve(dirname, './src/front-types-domain'),
      '@hooks': path.resolve(dirname, './src/hooks'),
      '@stores': path.resolve(dirname, './src/stores'),
      '@services': path.resolve(dirname, './src/services'),
      '@utils': path.resolve(dirname, './src/utils'),
      '@mocks': path.resolve(dirname, './src/mocks'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.storybook/',
        '**/*.stories.ts',
        '**/*.stories.tsx',
      ],
    },
  },
});
