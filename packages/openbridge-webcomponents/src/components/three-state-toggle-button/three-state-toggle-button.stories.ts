import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcThreeStateToggleButton,
  ThreeStateValue,
} from './three-state-toggle-button.js';
import './three-state-toggle-button.js';
import {html} from 'lit';

const meta: Meta<ObcThreeStateToggleButton> = {
  title:
    'UI Components/Selection controls and switches/Three state toggle button',
  tags: ['autodocs', '6.0'],
  component: 'obc-three-state-toggle-button',
  args: {
    value: ThreeStateValue.neutral,
  },
  argTypes: {
    value: {
      options: Object.values(ThreeStateValue),
      control: {type: 'select'},
    },
  },
  parameters: {
    actions: {
      handles: ['value'],
    },
  },
};

export default meta;
type Story = StoryObj<ObcThreeStateToggleButton>;

export const Primary: Story = {
  args: {
    value: ThreeStateValue.neutral,
  },
};

export const Approve: Story = {
  args: {
    value: ThreeStateValue.approve,
  },
};

export const Reject: Story = {
  args: {
    value: ThreeStateValue.reject,
  },
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="width: 100px;">Approve:</span>
        <obc-three-state-toggle-button
          value="approve"
        ></obc-three-state-toggle-button>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="width: 100px;">Neutral:</span>
        <obc-three-state-toggle-button
          value="neutral"
        ></obc-three-state-toggle-button>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="width: 100px;">Reject:</span>
        <obc-three-state-toggle-button
          value="reject"
        ></obc-three-state-toggle-button>
      </div>
    </div>
  `,
};
