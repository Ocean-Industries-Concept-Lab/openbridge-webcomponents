import type {StorybookConfig} from '@storybook/html-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-vitest'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
}

export default config
