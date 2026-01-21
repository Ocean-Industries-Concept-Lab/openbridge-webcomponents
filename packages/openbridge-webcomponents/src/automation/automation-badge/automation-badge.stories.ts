import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAutomationBadge,
  ObcAutomationBadgeMode,
} from './automation-badge.js';
import './automation-badge.js';
import {html} from 'lit';
import '../../icons/icon-command-locked-f.js';

const meta: Meta<typeof ObcAutomationBadge> = {
  title: 'Automation/Automation-configurations/Automation-badge',
  tags: ['autodocs', '6.0'],
  component: 'obc-automation-badge',
  args: {
    mode: ObcAutomationBadgeMode.Flat,
  },
  argTypes: {
    mode: {
      options: Object.values(ObcAutomationBadgeMode),
      control: {
        type: 'select',
      },
    },
  },
  render(args) {
    return html`<obc-automation-badge .mode=${args.mode}>
      <obi-command-locked-f></obi-command-locked-f>
      <obi-command-locked-f slot="icon-siluette"></obi-command-locked-f>
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
