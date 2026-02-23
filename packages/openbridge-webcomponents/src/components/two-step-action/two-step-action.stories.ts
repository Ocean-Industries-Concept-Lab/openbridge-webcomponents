import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTwoStepAction, ObcTwoStepActionState} from './two-step-action.js';
import './two-step-action.js';

const meta: Meta<typeof ObcTwoStepAction> = {
  title: 'UI Components/Buttons/Two Step Action',
  tags: ['6.0'],
  component: 'obc-two-step-action',
  args: {
    disabled: false,
    label: 'Action',
  },
  argTypes: {
    disabled: {
      control: {type: 'boolean'},
    },
    label: {
      control: {type: 'text'},
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: ['change'],
    },
  },
  render: (args) => html`
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh;"
    >
      <obc-two-step-action
        .state=${ObcTwoStepActionState.enabled}
        .disabled=${args.disabled}
      >
        ${args.label}
      </obc-two-step-action>
    </div>
  `,
} satisfies Meta<ObcTwoStepAction>;

export default meta;
type Story = StoryObj<ObcTwoStepAction>;

export const Enabled: Story = {
  args: {},
};
