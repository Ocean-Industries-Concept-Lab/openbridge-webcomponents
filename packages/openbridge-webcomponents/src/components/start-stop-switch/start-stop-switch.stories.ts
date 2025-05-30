import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcStartStopSwitch} from './start-stop-switch.js';
import './start-stop-switch.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-command-in.js';
import {html} from 'lit';

const meta: Meta<typeof ObcStartStopSwitch> = {
  title: 'Input/Start stop switch',
  tags: ['6.0'],
  component: 'obc-start-stop-switch',
  args: {},
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      .hasUncheckedStateIcon=${args.hasUncheckedStateIcon}
      .hasCheckedStateIcon=${args.hasCheckedStateIcon}
    >
      <div slot="checked-state-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="unchecked-state-icon">
        <obi-placeholder></obi-placeholder>
      </div>
      <div slot="checked-state-label">Checked State</div>
      <div slot="unchecked-state-label">Unchecked State</div>
      <div slot="to-checked-action-label">Action</div>
      <div slot="to-unchecked-action-label">Action</div>
    </obc-start-stop-switch>`;
  },
} satisfies Meta<ObcStartStopSwitch>;

export default meta;
type Story = StoryObj<ObcStartStopSwitch>;

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const CmdExample: Story = {
  args: {
    checked: true,
  },
  render: (args) => {
    return html`<obc-start-stop-switch
      .checked=${args.checked}
      hasCheckedStateIcon
    >
      <div slot="checked-state-icon">
        <obi-command-in></obi-command-in>
      </div>
      <div slot="checked-state-label">In CMD</div>
      <div slot="unchecked-state-label">DP Aft Bridge</div>
      <div slot="to-checked-action-label">Request</div>
      <div slot="to-unchecked-action-label">Release</div>
    </obc-start-stop-switch>`;
  },
};
