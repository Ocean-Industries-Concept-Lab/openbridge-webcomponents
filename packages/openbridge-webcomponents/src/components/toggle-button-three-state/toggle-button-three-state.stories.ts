import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcToggleButtonThreeState,
  ObcToggleButtonThreeStateValue,
} from './toggle-button-three-state.js';
import './toggle-button-three-state.js';

type ObcToggleButtonThreeStateArgs = {
  state: ObcToggleButtonThreeStateValue;
  disabled: boolean;
};

const meta: Meta<ObcToggleButtonThreeStateArgs> = {
  title:
    'UI Components/Selection controls and switches/Toggle button - Three state',
  tags: ['6.0'],
  component: 'obc-toggle-button-three-state',
  args: {
    state: ObcToggleButtonThreeStateValue.noInput,
    disabled: false,
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change'],
    },
  },
  argTypes: {
    state: {
      options: Object.values(ObcToggleButtonThreeStateValue),
      control: {type: 'select'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html`<div
      style="display:flex; justify-content:center; align-items:center; width:100%;"
    >
      <obc-toggle-button-three-state
        .state=${args.state}
        ?disabled=${args.disabled}
      ></obc-toggle-button-three-state>
    </div>`,
} satisfies Meta<ObcToggleButtonThreeStateArgs>;

export default meta;
type Story = StoryObj<ObcToggleButtonThreeStateArgs>;

export const NoInput: Story = {
  args: {
    state: ObcToggleButtonThreeStateValue.noInput,
  },
};

export const Success: Story = {
  args: {
    state: ObcToggleButtonThreeStateValue.success,
  },
};

export const Error: Story = {
  args: {
    state: ObcToggleButtonThreeStateValue.error,
  },
};
