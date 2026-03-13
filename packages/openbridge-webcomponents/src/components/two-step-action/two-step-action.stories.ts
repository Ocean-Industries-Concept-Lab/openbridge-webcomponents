import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTwoStepActionState} from './two-step-action.js';
import './two-step-action.js';

type TwoStepActionStoryArgs = {
  disabled: boolean;
  label: string;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action',
  tags: ['6.0'],
  component: 'obc-two-step-action',
  args: {
    disabled: false,
    label: 'Action',
  },
  argTypes: {
    disabled: {
      table: {
        disable: true,
      },
    },
    state: {
      table: {
        disable: true,
      },
    },
    label: {
      control: {type: 'text'},
    },
    armedResetDelay: {
      table: {
        disable: true,
      },
    },
    change: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: ['change'],
    },
  },
  render: (args) => {
    return html`
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
    `;
  },
} satisfies Meta<TwoStepActionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {},
};
