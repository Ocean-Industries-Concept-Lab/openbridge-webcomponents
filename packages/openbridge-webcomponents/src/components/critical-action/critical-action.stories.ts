import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './critical-action.js';

type CriticalActionStoryArgs = {
  ariaLabel: string;
  cancelLabel: string;
  criticalAutoCollapseDelay: number;
  label: string;
  disabled: boolean;
  criticalDescription: string;
  useCancelSlot: boolean;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Critical Action',
  tags: ['autodocs', '6.0'],
  component: 'obc-critical-action',
  args: {
    ariaLabel: '',
    cancelLabel: 'cancel',
    criticalAutoCollapseDelay: 2700,
    label: 'MOB',
    disabled: false,
    criticalDescription:
      'Action description about what is about to happen when you click.',
    useCancelSlot: false,
  },
  argTypes: {
    disabled: {control: {type: 'boolean'}},
    useCancelSlot: {
      control: {type: 'boolean'},
      table: {category: 'Content'},
    },
    ariaLabel: {
      control: {type: 'text'},
      table: {category: 'Accessibility'},
    },
    cancelLabel: {
      control: {type: 'text'},
      table: {category: 'Label'},
    },
    label: {control: {type: 'text'}, table: {category: 'Label'}},
    criticalDescription: {
      control: {type: 'text'},
      table: {category: 'Label'},
    },
    criticalAutoCollapseDelay: {
      control: {type: 'number'},
      table: {category: 'Behavior'},
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: {handles: ['confirm-click']},
  },
  render: (args) => html`
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh;"
    >
      <obc-critical-action
        ?disabled=${args.disabled}
        .ariaLabel=${args.ariaLabel}
        .cancelLabel=${args.useCancelSlot ? '' : args.cancelLabel}
        .criticalAutoCollapseDelay=${args.criticalAutoCollapseDelay}
        .label=${args.label}
        .criticalDescription=${args.criticalDescription}
      >
        ${args.useCancelSlot
          ? html`<span slot="cancel">${args.cancelLabel}</span>`
          : nothing}
      </obc-critical-action>
    </div>
  `,
} satisfies Meta<CriticalActionStoryArgs>;

export default meta;
type Story = StoryObj<CriticalActionStoryArgs>;

export const Default: Story = {
  args: {},
};

export const WithCancelSlot: Story = {
  args: {
    useCancelSlot: true,
  },
};

export const EmptyLabels: Story = {
  args: {
    ariaLabel: 'Critical action',
    label: '',
    cancelLabel: '',
  },
};
