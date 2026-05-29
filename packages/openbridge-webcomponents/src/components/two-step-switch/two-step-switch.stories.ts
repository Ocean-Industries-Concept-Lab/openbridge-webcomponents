import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './two-step-switch.js';
import {
  ObcTwoStepSwitchVariant,
  ObcTwoStepSwitchWidth,
} from './two-step-switch.js';

type TwoStepSwitchStoryArgs = {
  activeStateLabel: string;
  ariaLabel: string;
  cancelAriaLabel: string;
  confirmLabel: string;
  disabled: boolean;
  idleActionLabel: string;
  idleStateLabel: string;
  activeActionLabel: string;
  processingLabel: string;
  useSlots: boolean;
  variant: ObcTwoStepSwitchVariant;
  width: ObcTwoStepSwitchWidth;
};

function renderTwoStepSwitch(args: TwoStepSwitchStoryArgs, shell?: unknown) {
  const component = html`
    <obc-two-step-switch
      ?disabled=${args.disabled}
      .ariaLabel=${args.ariaLabel}
      .cancelAriaLabel=${args.cancelAriaLabel}
      .confirmLabel=${args.useSlots ? '' : args.confirmLabel}
      .idleActionLabel=${args.useSlots ? '' : args.idleActionLabel}
      .idleStateLabel=${args.useSlots ? '' : args.idleStateLabel}
      .activeActionLabel=${args.useSlots ? '' : args.activeActionLabel}
      .activeStateLabel=${args.useSlots ? '' : args.activeStateLabel}
      .processingLabel=${args.useSlots ? '' : args.processingLabel}
      .variant=${args.variant}
      .width=${args.width}
    >
      ${args.useSlots
        ? html`
            <span slot="idle-action">${args.idleActionLabel}</span>
            <span slot="active-action">${args.activeActionLabel}</span>
            <span slot="idle-state">${args.idleStateLabel}</span>
            <span slot="active-state">${args.activeStateLabel}</span>
            <span slot="confirm">${args.confirmLabel}</span>
            <span slot="processing">${args.processingLabel}</span>
          `
        : nothing}
    </obc-two-step-switch>
  `;
  const centeredComponent =
    args.width === ObcTwoStepSwitchWidth.fluid
      ? html`
          <div
            style="width: min(100%, 20rem); max-width: 100%; padding: 0 var(--ui-components-button-padding-horizontal, 8px);"
          >
            ${component}
          </div>
        `
      : component;

  return html`
    <div
      style="display: grid; place-items: center; width: 100%; min-height: 100vh;"
    >
      ${shell ?? centeredComponent}
    </div>
  `;
}

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Two Step Switch',
  tags: ['autodocs', '6.0'],
  component: 'obc-two-step-switch',
  args: {
    activeStateLabel: 'IN CMD',
    ariaLabel: 'Command switch',
    cancelAriaLabel: '',
    confirmLabel: 'Confirm',
    disabled: false,
    idleActionLabel: 'Take',
    idleStateLabel: 'NO CMD',
    activeActionLabel: 'Release',
    processingLabel: 'Starting...',
    useSlots: false,
    variant: ObcTwoStepSwitchVariant.standard,
    width: ObcTwoStepSwitchWidth.fluid,
  },
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: [
        ObcTwoStepSwitchVariant.standard,
        ObcTwoStepSwitchVariant.cancellable,
      ],
    },
    width: {
      control: {type: 'select'},
      options: [ObcTwoStepSwitchWidth.fluid, ObcTwoStepSwitchWidth.hug],
    },
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
    processingLabel: {
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
    cancelAriaLabel: {
      control: {type: 'text'},
      table: {category: 'Accessibility'},
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
        'confirm-click',
        'cancel-click',
      ],
    },
    docs: {
      description: {
        story:
          'Interact to see confirm and committed transitions. `flow-direction` is reflected on the host after commits.',
      },
    },
  },
  render: (args) => renderTwoStepSwitch(args),
} satisfies Meta<TwoStepSwitchStoryArgs>;

export default meta;
type Story = StoryObj<TwoStepSwitchStoryArgs>;

export const Default: Story = {
  args: {},
};

export const Fluid: Story = {
  args: {
    width: ObcTwoStepSwitchWidth.fluid,
  },
};

export const Hug: Story = {
  args: {
    width: ObcTwoStepSwitchWidth.hug,
  },
};

export const Cancellable: Story = {
  args: {
    variant: ObcTwoStepSwitchVariant.cancellable,
  },
};
