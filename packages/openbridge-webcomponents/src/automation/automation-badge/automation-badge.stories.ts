import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAutomationBadge, ObcAutomationBadgeMode} from './automation-badge';
import './automation-badge';
import {html} from 'lit';
import '../../icons/icon-command-locked.js';

const meta: Meta<typeof ObcAutomationBadge> = {
  title: 'Automation/Badge',
  tags: ['autodocs', '6.0'],
  component: 'obc-automation-badge',
  args: {
    mode: ObcAutomationBadgeMode.Flat,
    deviceOn: false,
  },
  argTypes: {
    deviceOn: {
      control: {
        type: 'boolean',
      },
    },
    mode: {
      options: Object.values(ObcAutomationBadgeMode),
      control: {
        type: 'select',
      },
    },
  },
  render(args) {
    return html`<obc-automation-badge
      .deviceOn=${args.deviceOn}
      .mode=${args.mode}
    >
      <obi-command-locked></obi-command-locked>
    </obc-automation-badge>`;
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

export const FlatOn: Story = {
  args: {
    deviceOn: true,
  },
};

export const RegularOn: Story = {
  args: {
    mode: ObcAutomationBadgeMode.Regular,
    deviceOn: true,
  },
};

export const EnhancedOn: Story = {
  args: {
    mode: ObcAutomationBadgeMode.Enhanced,
    deviceOn: true,
  },
};
