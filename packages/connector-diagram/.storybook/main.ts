import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type {StorybookConfig} from '@storybook/html-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [getAbsolutePath("@storybook/addon-vitest")],
  framework: {
    name: getAbsolutePath("@storybook/html-vite"),
    options: {},
  },
}

export default config

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
