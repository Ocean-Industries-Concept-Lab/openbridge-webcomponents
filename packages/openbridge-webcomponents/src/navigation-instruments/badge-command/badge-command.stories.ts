import type {Meta, StoryObj} from '@storybook/web-components';
import {CommandStatus, ObcBadgeCommand} from './badge-command';
import './badge-command';

const meta: Meta<typeof ObcBadgeCommand> = {
  title: 'Navigation instruments/Badge command',
  tags: ['autodocs'],
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
