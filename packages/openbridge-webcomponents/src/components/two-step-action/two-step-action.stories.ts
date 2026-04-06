import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTwoStepActionVariant} from './two-step-action.js';
import './two-step-action.js';

const storySwitchLabels = {
  switchThumbLabel: 'Take',
  switchIdleStateLabel: 'NO CMD',
  switchArmedPreviewLabel: 'Confirm',
  switchActivePrimaryLabel: 'IN CMD',
  switchActiveSecondaryLabel: 'Release',
} as const;

type TwoStepActionStoryArgs = {
  label: string;
  variant: ObcTwoStepActionVariant;
  switchThumbLabel: string;
  switchIdleStateLabel: string;
  switchArmedPreviewLabel: string;
  switchActivePrimaryLabel: string;
  switchActiveSecondaryLabel: string;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action',
  tags: ['6.0'],
  component: 'obc-two-step-action',
  args: {
    label: 'Action',
    variant: ObcTwoStepActionVariant.twoStepAction,
    ...storySwitchLabels,
  },
  argTypes: {
    label: {
      control: {type: 'text'},
    },
    variant: {
      control: 'select',
      options: [
        ObcTwoStepActionVariant.twoStepAction,
        ObcTwoStepActionVariant.twoStepSwitch,
      ],
    },
    change: {
      table: {
        disable: true,
      },
    },
    switchThumbLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    switchIdleStateLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    switchArmedPreviewLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    switchActivePrimaryLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    switchActiveSecondaryLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
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
          .variant=${args.variant}
          .switchThumbLabel=${args.switchThumbLabel}
          .switchIdleStateLabel=${args.switchIdleStateLabel}
          .switchArmedPreviewLabel=${args.switchArmedPreviewLabel}
          .switchActivePrimaryLabel=${args.switchActivePrimaryLabel}
          .switchActiveSecondaryLabel=${args.switchActiveSecondaryLabel}
        >
          ${args.label}
        </obc-two-step-action>
      </div>
    `;
  },
} satisfies Meta<TwoStepActionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoStepAction: Story = {
  name: 'Two Step Action',
  args: {},
};

export const TwoStepSwitch: Story = {
  args: {
    variant: ObcTwoStepActionVariant.twoStepSwitch,
  },
};
