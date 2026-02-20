import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAutomationBadge,
  ObcAutomationBadgeMode,
  ObcAutomationBadgeType,
} from './automation-badge.js';
import './automation-badge.js';
import {html} from 'lit';
import '../../icons/icon-command-locked-f.js';

const meta: Meta<typeof ObcAutomationBadge> = {
  title: 'Automation/Automation Configurations/Automation Badge',
  tags: ['autodocs', '6.0'],
  component: 'obc-automation-badge',
  args: {
    mode: ObcAutomationBadgeMode.Flat,
    type: ObcAutomationBadgeType.CommandLocked,
  },
  argTypes: {
    mode: {
      options: Object.values(ObcAutomationBadgeMode),
      control: {
        type: 'select',
      },
    },
    type: {
      options: Object.values(ObcAutomationBadgeType),
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<ObcAutomationBadge>;

export default meta;
type Story = StoryObj<ObcAutomationBadge>;

export const Flat: Story = {
  args: {
    mode: ObcAutomationBadgeMode.Flat,
  },
};

export const Regular: Story = {
  args: {
    mode: ObcAutomationBadgeMode.Regular,
  },
};

export const Enhanced: Story = {
  args: {
    mode: ObcAutomationBadgeMode.Enhanced,
  },
};

export const Auto: Story = {
  args: {
    type: ObcAutomationBadgeType.Auto,
  },
};

export const CommandLocked: Story = {
  args: {
    type: ObcAutomationBadgeType.CommandLocked,
  },
};

export const Duty: Story = {
  args: {
    type: ObcAutomationBadgeType.Duty,
  },
};

export const AlertOff: Story = {
  args: {
    type: ObcAutomationBadgeType.AlertOff,
  },
};

export const SlottedIcon: Story = {
  render(args) {
    return html`<obc-automation-badge .mode=${args.mode}>
      <obi-command-locked-f></obi-command-locked-f>
      <obi-command-locked-f slot="icon-siluette"></obi-command-locked-f>
    </obc-automation-badge>`;
  },
};
