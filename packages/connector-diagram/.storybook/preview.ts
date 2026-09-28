import type {Preview} from '@storybook/html-vite'

const preview: Preview = {
  tags: ['autodocs', 'snapshot'],

  parameters: {
    backgrounds: {
      options: {
        dark: {name: 'dark', value: '#1a1a2e'},
        light: {name: 'light', value: '#f5f5f5'}
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'dark'
    }
  }
}

export default preview
