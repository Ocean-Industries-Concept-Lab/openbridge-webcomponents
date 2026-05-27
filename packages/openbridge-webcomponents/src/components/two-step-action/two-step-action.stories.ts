import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './two-step-action.js';
import {
  ObcTwoStepAction,
  ObcTwoStepActionVariant,
  ObcTwoStepActionWidth,
} from './two-step-action.js';

const DEMO_LOADING_DURATION_MS = 4000;
const demoLoadingTimeouts = new WeakMap<ObcTwoStepAction, number>();

function clearDemoLoadingTimeout(target: ObcTwoStepAction) {
  const timeoutId = demoLoadingTimeouts.get(target);
  if (timeoutId !== undefined) {
    window.clearTimeout(timeoutId);
    demoLoadingTimeouts.delete(target);
  }
}

function handleDemoConfirm(event: Event) {
  const target = event.currentTarget;
  if (!(target instanceof ObcTwoStepAction)) return;
  clearDemoLoadingTimeout(target);
  target.loading = true;
  const timeoutId = window.setTimeout(() => {
    target.loading = false;
    demoLoadingTimeouts.delete(target);
  }, DEMO_LOADING_DURATION_MS);
  demoLoadingTimeouts.set(target, timeoutId);
}

function handleDemoCancel(event: Event) {
  const target = event.currentTarget;
  if (!(target instanceof ObcTwoStepAction)) return;
  clearDemoLoadingTimeout(target);
  target.loading = false;
}

type TwoStepActionStoryArgs = {
  ariaLabel: string;
  label: string;
  processingLabel: string;
  successLabel: string;
  variant: ObcTwoStepActionVariant;
  width: ObcTwoStepActionWidth;
  cancelAriaLabel: string;
  confirmTimeout: number;
  loading: boolean;
  disabled: boolean;
};

function renderTwoStepAction(args: TwoStepActionStoryArgs, shell?: unknown) {
  const component = html`
    <obc-two-step-action
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      .ariaLabel=${args.ariaLabel}
      .label=${args.label}
      .processingLabel=${args.processingLabel}
      .successLabel=${args.successLabel}
      .variant=${args.variant}
      .width=${args.width}
      .cancelAriaLabel=${args.cancelAriaLabel}
      .confirmTimeout=${args.confirmTimeout}
      @confirm-click=${handleDemoConfirm}
      @cancel-click=${handleDemoCancel}
    ></obc-two-step-action>
  `;

  const inner =
    shell ??
    (args.width === ObcTwoStepActionWidth.fluid
      ? html`
          <div
            style="width: min(100%, 20rem); max-width: 100%; padding: 0 var(--ui-components-button-padding-horizontal, 8px);"
          >
            ${component}
          </div>
        `
      : component);

  return html`
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh;"
    >
      ${inner}
    </div>
  `;
}

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Two Step Action',
  tags: ['autodocs', '6.0'],
  component: 'obc-two-step-action',
  args: {
    ariaLabel: '',
    label: 'Action',
    processingLabel: '',
    successLabel: '',
    variant: ObcTwoStepActionVariant.standard,
    width: ObcTwoStepActionWidth.fluid,
    cancelAriaLabel: '',
    confirmTimeout: 7000,
    loading: false,
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
    processingLabel: {
      control: {type: 'text'},
      table: {category: 'Label'},
    },
    successLabel: {
      control: {type: 'text'},
      table: {category: 'Label'},
    },
    variant: {
      control: {type: 'select'},
      options: [
        ObcTwoStepActionVariant.standard,
        ObcTwoStepActionVariant.cancellable,
      ],
    },
    width: {
      control: {type: 'select'},
      options: [ObcTwoStepActionWidth.fluid, ObcTwoStepActionWidth.hug],
    },
    cancelAriaLabel: {
      control: {type: 'text'},
      table: {category: 'Accessibility'},
    },
    confirmTimeout: {
      control: {type: 'number', min: 0, step: 100},
      table: {category: 'Timing'},
    },
    loading: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
  },
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: ['change', 'confirm-click', 'cancel-click'],
    },
  },
  render: (args) => renderTwoStepAction(args),
} satisfies Meta<TwoStepActionStoryArgs>;

export default meta;
type Story = StoryObj<TwoStepActionStoryArgs>;

export const Default: Story = {
  args: {},
};

const demoLabels = {
  label: 'Start',
  processingLabel: 'Starting…',
  successLabel: 'Started',
};

export const StandardHug: Story = {
  args: {
    ...demoLabels,
    variant: ObcTwoStepActionVariant.standard,
    width: ObcTwoStepActionWidth.hug,
  },
};

export const StandardFluid: Story = {
  args: {
    ...demoLabels,
    variant: ObcTwoStepActionVariant.standard,
    width: ObcTwoStepActionWidth.fluid,
  },
};

export const CancellableHug: Story = {
  args: {
    ...demoLabels,
    variant: ObcTwoStepActionVariant.cancellable,
    width: ObcTwoStepActionWidth.hug,
  },
};

export const CancellableFluid: Story = {
  args: {
    ...demoLabels,
    variant: ObcTwoStepActionVariant.cancellable,
    width: ObcTwoStepActionWidth.fluid,
  },
};
