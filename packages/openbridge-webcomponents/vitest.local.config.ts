import {mergeConfig} from 'vitest/config';
import base from './vitest.config.js';

export default mergeConfig(base, {
  server: {fs: {strict: false}},
  cacheDir: '/tmp/claude-1000/-workspaces-ob/728d7bea-e9da-4edc-ae83-ecb5da5a206d/scratchpad/vite-cache-1010',
});
