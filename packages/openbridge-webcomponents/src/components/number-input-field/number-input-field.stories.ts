import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldTextAlign,
  ObcNumberInputFieldSize,
  ObcNumberInputFieldPlacement,
} from './number-input-field.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-ship.js';

const meta: Meta<typeof ObcNumberInputField> = {
  title: 'UI Components/Input controls/Number Input Field',
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
      description:
        'The unit text (e.g., "kg", "%", "ms"). When set, the unit is displayed.',
    },
    placeholder: {
      control: {type: 'text'},
      description: 'Placeholder text shown when the input is empty',
    },
    textAlign: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldTextAlign),
      description: 'Content alignment / unit placement',
    },
    disabled: {
      control: {type: 'boolean'},
      description: 'Disables the input field',
    },
    error: {
      control: {type: 'boolean'},
      description: 'Displays error styling and sets aria-invalid',
    },
    errorText: {
      control: {type: 'text'},
      description:
        'Error message text displayed below the field when error is true',
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldSize),
      description: 'Size variant - Regular (32px) or Large (48px)',
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show a leading icon slot',
    },
    helperText: {
      control: {type: 'text'},
      description:
        'Helper text displayed below the field. When set, the helper text is shown.',
    },
    hasHelperIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show an icon before the helper/error text',
    },
    helperPlacement: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldPlacement),
      description: 'Placement of the helper/error text - Left or Center',
    },
    label: {
      control: {type: 'text'},
      description:
        'The label text displayed above the input field. When set, the label is shown.',
    },
    required: {
      control: {type: 'boolean'},
      description:
        'Shows a required indicator next to the label and sets aria-required',
    },
    hasLabelIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show an icon before the label text',
    },
    labelPlacement: {
      control: {type: 'select'},
      options: Object.values(ObcNumberInputFieldPlacement),
      description: 'Placement of the label text - Left, Center, or Right',
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
          .unit=${args.unit ?? ''}
          .placeholder=${args.placeholder ?? ''}
          .textAlign=${args.textAlign ?? ObcNumberInputFieldTextAlign.Right}
          .size=${args.size ?? ObcNumberInputFieldSize.Regular}
          ?disabled=${args.disabled}
          ?error=${args.error}
          .errorText=${args.errorText ?? ''}
          ?hasLeadingIcon=${args.hasLeadingIcon}
          .helperText=${args.helperText ?? ''}
          ?hasHelperIcon=${args.hasHelperIcon}
          .helperPlacement=${args.helperPlacement ??
          ObcNumberInputFieldPlacement.Left}
          .label=${args.label ?? ''}
          ?required=${args.required}
          ?hasLabelIcon=${args.hasLabelIcon}
          .labelPlacement=${args.labelPlacement ??
          ObcNumberInputFieldPlacement.Left}
          @input=${console.log}
          @change=${console.log}
        >
          ${args.hasLeadingIcon
            ? html`<obi-ship slot="leading-icon"></obi-ship>`
            : ''}
          ${args.hasLabelIcon
            ? html`<obi-placeholder slot="label-icon"></obi-placeholder>`
            : ''}
          ${args.hasHelperIcon
            ? html`<obi-placeholder slot="helper-icon"></obi-placeholder>`
            : ''}
        </obc-number-input-field>
      </div>
    `;
  },
} satisfies Meta<ObcNumberInputField>;

export default meta;
type Story = StoryObj<ObcNumberInputField>;

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    value: '123.45',
    unit: 'bar',
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    unit: 'kg',
    placeholder: '0.0',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    value: '18.5',
    unit: 'knots',
    hasLeadingIcon: true,
  },
};

// =============================================================================
// ALIGNMENT
// =============================================================================

export const AlignRight: Story = {
  args: {
    value: '456.78',
    unit: 'bar',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const AlignCenter: Story = {
  args: {
    value: '22.5',
    unit: '°C',
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const AlignRightUnitOutside: Story = {
  args: {
    value: '1500',
    unit: 'RPM',
    textAlign: ObcNumberInputFieldTextAlign.RightUnitOutside,
  },
};

// =============================================================================
// SIZE
// =============================================================================

export const SizeRegular: Story = {
  args: {
    value: '123.45',
    unit: 'bar',
    size: ObcNumberInputFieldSize.Regular,
  },
};

export const SizeLarge: Story = {
  args: {
    value: '123.45',
    unit: 'bar',
    size: ObcNumberInputFieldSize.Large,
  },
};

// =============================================================================
// LABEL
// =============================================================================

export const WithLabel: Story = {
  args: {
    value: '75',
    unit: '%',
    label: 'Engine Load',
  },
};

export const WithLabelRequired: Story = {
  args: {
    value: '',
    unit: 'bar',
    label: 'Oil Pressure',
    required: true,
  },
};

export const WithLabelIcon: Story = {
  args: {
    value: '25.5',
    unit: '°C',
    label: 'Temperature',
    hasLabelIcon: true,
  },
};

export const LabelPlacementLeft: Story = {
  args: {
    value: '42',
    unit: 'kg',
    label: 'Weight',
    labelPlacement: ObcNumberInputFieldPlacement.Left,
  },
};

export const LabelPlacementCenter: Story = {
  args: {
    value: '50',
    unit: '%',
    label: 'Progress',
    labelPlacement: ObcNumberInputFieldPlacement.Center,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const LabelPlacementRight: Story = {
  args: {
    value: '42',
    unit: 'kg',
    label: 'Weight',
    labelPlacement: ObcNumberInputFieldPlacement.Right,
  },
};

// =============================================================================
// HELPER TEXT
// =============================================================================

export const WithHelperText: Story = {
  args: {
    value: '3.5',
    unit: 'bar',
    helperText: 'Normal range: 3.0 - 4.5 bar',
  },
};

export const WithHelperTextIcon: Story = {
  args: {
    value: '25',
    unit: '°C',
    helperText: 'Optimal temperature',
    hasHelperIcon: true,
  },
};

export const HelperPlacementLeft: Story = {
  args: {
    value: '180',
    unit: 'cm',
    helperText: 'Height measurement',
    helperPlacement: ObcNumberInputFieldPlacement.Left,
  },
};

export const HelperPlacementCenter: Story = {
  args: {
    value: '100',
    unit: '%',
    helperText: 'Progress complete',
    helperPlacement: ObcNumberInputFieldPlacement.Center,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const HelperPlacementRight: Story = {
  args: {
    value: '180',
    unit: 'cm',
    helperText: 'Height measurement',
    helperPlacement: ObcNumberInputFieldPlacement.Right,
  },
};

// =============================================================================
// STATES
// =============================================================================

export const Disabled: Story = {
  args: {
    value: '50',
    unit: '%',
    label: 'Throttle Position',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    value: '999',
    unit: 'kPa',
    error: true,
    errorText: 'Value exceeds maximum limit',
  },
};

export const ErrorWithLabel: Story = {
  args: {
    value: '',
    unit: 'kg',
    label: 'Weight',
    required: true,
    error: true,
    errorText: 'This field is required',
  },
};

export const ErrorWithIcon: Story = {
  args: {
    value: '999',
    unit: 'kPa',
    error: true,
    errorText: 'Value exceeds maximum limit',
    hasHelperIcon: true,
  },
};

// =============================================================================
// COMPLETE EXAMPLES
// =============================================================================

export const Complete: Story = {
  args: {
    value: '85.5',
    unit: 'kW',
    label: 'Power Output',
    required: true,
    hasLeadingIcon: true,
    helperText: 'Maximum continuous rating: 100 kW',
  },
};

export const CompleteCenter: Story = {
  args: {
    value: '42',
    unit: 'Hz',
    label: 'Frequency',
    required: true,
    hasLeadingIcon: true,
    helperText: 'Standard: 50/60 Hz',
    labelPlacement: ObcNumberInputFieldPlacement.Center,
    helperPlacement: ObcNumberInputFieldPlacement.Center,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const CompleteDisabled: Story = {
  args: {
    value: '100',
    unit: '%',
    label: 'System Load',
    hasLeadingIcon: true,
    helperText: 'System at maximum capacity',
    disabled: true,
  },
};

export const CompleteError: Story = {
  args: {
    value: '150',
    unit: 'bar',
    label: 'Pressure Alert',
    required: true,
    hasLeadingIcon: true,
    error: true,
    errorText: 'Critical: Pressure too high!',
  },
};
