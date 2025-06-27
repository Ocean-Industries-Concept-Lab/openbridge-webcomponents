import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCommandButton} from './command-button.js';
import './command-button.js';

const meta: Meta<typeof ObcCommandButton> = {
  title: 'Button/Command button',
  tags: ['6.0'],
  component: 'obc-command-button',
  args: {},
} satisfies Meta<ObcCommandButton>;

export default meta;
type Story = StoryObj<ObcCommandButton>;

export const InCommand: Story = {
  args: {
    inCommand: true,
  },
};

export const NoCommand: Story = {
  args: {
    inCommand: false,
  },
};
