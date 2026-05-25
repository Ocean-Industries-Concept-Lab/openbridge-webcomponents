import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './two-step-action.js';

type TwoStepActionStoryArgs = {
  ariaLabel: string;
  label: string;
  disabled: boolean;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Two Step Action',
  tags: ['autodocs', '6.0'],
  component: 'obc-two-step-action',
  args: {
    ariaLabel: '',
    label: 'Action',
    disabled: false,
  },
  argTypes: {
    ariaLabel: {
      control: {type: 'text'},
      table: {category: 'Accessibility'},
    },
    label: {
      control: {type: 'text'},
      table: {category: 'Label'},
    },
    disabled: {control: {type: 'boolean'}},
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
          ?disabled=${args.disabled}
          .ariaLabel=${args.ariaLabel}
          .label=${args.label}
        ></obc-two-step-action>
      </div>
    `;
  },
} satisfies Meta<TwoStepActionStoryArgs>;

export default meta;
type Story = StoryObj<TwoStepActionStoryArgs>;

export const Default: Story = {
  args: {},
};

export const EmptyLabels: Story = {
  args: {
    ariaLabel: 'Guarded action',
    label: '',
  },
};
