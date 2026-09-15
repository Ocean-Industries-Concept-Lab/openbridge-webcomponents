import type {Preview} from '@storybook/html'

const preview: Preview = {
  tags: ['autodocs', 'snapshot'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {name: 'dark', value: '#1a1a2e'},
        {name: 'light', value: '#f5f5f5'},
      ],
    },
  },
}

export default preview
