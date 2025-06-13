import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcCheckbox } from './checkbox.js';
import './checkbox.js';

const meta: Meta<typeof ObcCheckbox> = {
  title: 'Input/Checkbox',
  tags: ['6.0'],
  component: "obc-checkbox",
  args: {
  },
} satisfies Meta<ObcCheckbox>;

export default meta;
type Story = StoryObj<ObcCheckbox>;

export const Primary: Story = {
  args: {
  },
}