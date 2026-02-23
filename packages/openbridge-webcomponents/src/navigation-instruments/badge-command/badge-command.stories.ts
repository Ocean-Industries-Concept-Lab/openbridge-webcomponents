import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {CommandStatus, ObcBadgeCommand} from './badge-command.js';
import './badge-command.js';

const meta: Meta<typeof ObcBadgeCommand> = {
  title: 'Instruments/Badge Command',
  tags: ['autodocs', '6.0'],
  component: 'obc-badge-command',
  argTypes: {
    large: {
      control: {
        type: 'boolean',
      },
    },
    status: {
      options: Object.values(CommandStatus),
      control: {
        type: 'radio',
      },
    },
  },
} satisfies Meta<ObcBadgeCommand>;

export default meta;
type Story = StoryObj<ObcBadgeCommand>;

export const InCommandLarge: Story = {
  args: {
    large: true,
    status: CommandStatus.InCommand,
  },
};
