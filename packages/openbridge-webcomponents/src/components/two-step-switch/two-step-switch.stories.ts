import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './two-step-switch.js';

type TwoStepSwitchStoryArgs = {
  activeStateLabel: string;
  ariaLabel: string;
  confirmLabel: string;
  disabled: boolean;
  idleActionLabel: string;
  idleStateLabel: string;
  activeActionLabel: string;
  useSlots: boolean;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Two Step Switch',
  tags: ['autodocs', '6.0'],
  component: 'obc-two-step-switch',
  args: {
    activeStateLabel: 'IN CMD',
    ariaLabel: 'Command switch',
    confirmLabel: 'Confirm',
    disabled: false,
    idleActionLabel: 'Take',
    idleStateLabel: 'NO CMD',
    activeActionLabel: 'Release',
    useSlots: false,
  },
  argTypes: {
    disabled: {control: {type: 'boolean'}},
    useSlots: {
      control: {type: 'boolean'},
      table: {category: 'Content'},
    },
    ariaLabel: {
      control: {type: 'text'},
      table: {category: 'Accessibility'},
    },
    confirmLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    activeStateLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    idleActionLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    idleStateLabel: {control: {type: 'text'}, table: {category: 'Switch copy'}},
    activeActionLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: [
        'state-change',
        'confirm-open',
        'confirm-close',
        'confirm-timeout',
      ],
    },
    docs: {
      description: {
        story:
          'Interact to see confirm and committed transitions. `flow-direction` is reflected on the host after commits.',
      },
    },
  },
  render: (args) => html`
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh;"
    >
      <obc-two-step-switch
        ?disabled=${args.disabled}
        .ariaLabel=${args.ariaLabel}
        .confirmLabel=${args.useSlots ? '' : args.confirmLabel}
        .idleActionLabel=${args.useSlots ? '' : args.idleActionLabel}
        .idleStateLabel=${args.useSlots ? '' : args.idleStateLabel}
        .activeActionLabel=${args.useSlots ? '' : args.activeActionLabel}
        .activeStateLabel=${args.useSlots ? '' : args.activeStateLabel}
      >
        ${args.useSlots
          ? html`
              <span slot="idle-action">${args.idleActionLabel}</span>
              <span slot="active-action">${args.activeActionLabel}</span>
              <span slot="idle-state">${args.idleStateLabel}</span>
              <span slot="active-state">${args.activeStateLabel}</span>
              <span slot="confirm">${args.confirmLabel}</span>
            `
          : nothing}
      </obc-two-step-switch>
    </div>
  `,
} satisfies Meta<TwoStepSwitchStoryArgs>;

export default meta;
type Story = StoryObj<TwoStepSwitchStoryArgs>;

export const Default: Story = {
  args: {},
};

export const WithSlots: Story = {
  args: {
    useSlots: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const EmptyLabels: Story = {
  args: {
    ariaLabel: 'Command switch',
    confirmLabel: '',
    idleActionLabel: '',
    idleStateLabel: '',
    activeActionLabel: '',
    activeStateLabel: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates empty copy; set `aria-label` and action labels for usable confirm naming.',
      },
    },
  },
};
