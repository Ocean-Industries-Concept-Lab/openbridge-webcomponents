import {availableWhenPlugin} from './script/cem-plugins/available-when.mjs';
import {moduleDocsPlugin} from './script/cem-plugins/module-docs.mjs';
import {lifecyclePlugin} from './script/cem-plugins/lifecycle.mjs';

export default {
  litelement: true,
  globs: ['src/**/*.ts'],
  exclude: ['src/**/*.stories.ts', 'src/**/*.spec.ts'],
  plugins: [availableWhenPlugin(), moduleDocsPlugin(), lifecyclePlugin()],
};
