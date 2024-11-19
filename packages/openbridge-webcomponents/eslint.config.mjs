import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
    },

    rules: {
        "no-prototype-builtins": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-non-null-assertion": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],
    },
}, {
    files: ["**/rollup.config.js", "**/web-test-runner.config.js"],

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
}, {
    files: [
        "**/*_test.ts",
        "**/custom_typings/*.ts",
        "packages/labs/ssr/src/test/integration/tests/**",
        "packages/labs/ssr/src/lib/util/parse5-utils.ts",
    ],

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
    },
}];