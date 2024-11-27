import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";
import js from "@eslint/js";

import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");


export default [
  
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  skipFormattingConfig,
  {rules: {
    "vue/no-deprecated-slot-attribute": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "vue/no-v-html": "off",
  }},
]