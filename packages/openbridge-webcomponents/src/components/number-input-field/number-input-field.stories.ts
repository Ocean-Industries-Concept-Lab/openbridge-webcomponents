import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldTextAlign,
} from './number-input-field.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<typeof ObcNumberInputField> = {
  title: 'UI Components/Input controls/Input/Number Input Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-number-input-field',
  args: {},
  argTypes: {
    value: {
      control: {type: 'text'},
      description: 'The current numerical value displayed in the input',
    },
    unit: {
      control: {type: 'text'},
      description: 'The unit text (e.g., "kg", "%", "ms")',
    },
    hasUnit: {
      control: {type: 'boolean'},
      description: 'Whether to display the unit text',
    },
    textAlign: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldTextAlign),
      description: 'Content alignment / unit placement',
    },
    isDisabled: {
      control: {type: 'boolean'},
      description: 'Disables the input field',
    },
    hasError: {
      control: {type: 'boolean'},
      description: 'Displays error styling and sets aria-invalid',
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show a leading icon slot',
    },
    hasHelperText: {
      control: {type: 'boolean'},
      description: 'Whether to render the helper-text slot container',
    },
    helperText: {
      control: {type: 'text'},
    },
    ariaLabel: {
      control: {type: 'text'},
      name: 'aria-label',
      description: 'Accessible name when not using an external label',
    },
    labelledby: {
      control: {type: 'text'},
      description:
        'Space-separated element IDs that label the input (aria-labelledby)',
    },
    describedby: {
      control: {type: 'text'},
      description: 'Space-separated element IDs to include in aria-describedby',
    },
    hasHelperText: {
      control: {type: 'boolean'},
    },
  },
  parameters: {
    actions: {
      handles: ['input', 'change', 'focusin', 'blur'],
    },
  },
  render: (args) => {
    return html`
      <div style="width: 260px;">
        <obc-number-input-field
          .value=${args.value ?? ''}
          .unit=${args.unit ?? 'Unit'}
          ?hasUnit=${args.hasUnit !== false}
          .textAlign=${args.textAlign ?? ObcNumberInputFieldTextAlign.Right}
          ?isDisabled=${args.isDisabled}
          ?hasError=${args.hasError}
          ?hasLeadingIcon=${args.hasLeadingIcon}
          ?hasHelperText=${args.hasHelperText}
          aria-label=${args.ariaLabel ?? nothing}
          .labelledby=${args.labelledby ?? null}
          .describedby=${args.describedby ?? null}
          @input=${console.log}
          @change=${console.log}
        >
          ${args.hasLeadingIcon
            ? html`<obi-ship slot="leading-icon"></obi-ship>`
            : ''}
          ${args.hasHelperText
            ? html`<div slot="helper-text">
                ${args.helperText ?? 'Helper text'}
              </div>`
            : ''}
        </obc-number-input-field>
      </div>
    `;
  },
} satisfies Meta<ObcNumberInputField>;

export default meta;
type Story = StoryObj<ObcNumberInputField>;

export const CenterAligned: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const RightAligned: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const RightUnitOutside: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.RightUnitOutside,
  },
};

export const WithoutUnit: Story = {
  args: {
    value: '123',
    hasUnit: false,
  },
};

export const WithHelperText: Story = {
  args: {
    value: '123',
    unit: 'cm',
    hasUnit: true,
    hasHelperText: true,
    helperText: 'Enter your height in centimeters',
  },
};

export const Error: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasUnit: true,
    hasError: true,
    hasHelperText: true,
    helperText: 'Invalid value',
  },
};

export const Disabled: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasUnit: true,
    isDisabled: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    value: '123',
    unit: 'Unit',
    hasUnit: true,
    hasLeadingIcon: true,
    leadingIcon: 'placeholder',
  },
};

export const LongValue: Story = {
  args: {
    value: '1234567',
    unit: 'bytes',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const AriaLabelled: Story = {
  args: {
    value: '75',
    unit: '%',
    hasUnit: true,
    ariaLabel: 'Target percentage',
  },
};
