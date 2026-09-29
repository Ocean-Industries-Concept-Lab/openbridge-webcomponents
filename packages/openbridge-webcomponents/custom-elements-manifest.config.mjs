import {availableWhenPlugin} from './script/cem-plugins/available-when.mjs';
import {moduleDocsPlugin} from './script/cem-plugins/module-docs.mjs';

export default {
  litelement: true,
  globs: ['src/**/*.ts'],
  exclude: ['src/**/*.stories.ts', 'src/**/*.spec.ts'],
  plugins: [availableWhenPlugin(), moduleDocsPlugin()],
};
