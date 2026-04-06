import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTwoStepActionVariant} from './two-step-action.js';
import './two-step-action.js';

const storySwitchLabels = {
  switchThumbLabel: 'Take',
  switchIdleLabel: 'NO CMD',
  switchArmedLabel: 'Confirm',
  switchSecondaryLabel: 'Release',
} as const;

type TwoStepActionStoryArgs = {
  label: string;
  variant: ObcTwoStepActionVariant;
  disabled: boolean;
  switchThumbLabel: string;
  switchIdleLabel: string;
  switchArmedLabel: string;
  switchSecondaryLabel: string;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action',
  tags: ['6.0'],
  component: 'obc-two-step-action',
  args: {
    label: 'Action',
    variant: ObcTwoStepActionVariant.twoStepAction,
    disabled: false,
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
    switchIdleLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    switchArmedLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    switchSecondaryLabel: {
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
          ?disabled=${args.disabled}
          .label=${args.label}
          .switchThumbLabel=${args.switchThumbLabel}
          .switchIdleLabel=${args.switchIdleLabel}
          .switchArmedLabel=${args.switchArmedLabel}
          .switchSecondaryLabel=${args.switchSecondaryLabel}
        ></obc-two-step-action>
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
    label: 'IN CMD',
  },
};
