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
      description: 'Content for the helper text slot',
    },
    hasTitle: {
      control: {type: 'boolean'},
      description: 'Whether to display a title label above the input',
    },
    title: {
      control: {type: 'text'},
      description: 'The title/label text displayed above the input field',
    },
    isRequired: {
      control: {type: 'boolean'},
      description: 'Shows a required indicator next to the title',
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
          ?hasTitle=${args.hasTitle}
          .title=${args.title ?? ''}
          ?isRequired=${args.isRequired}
          aria-label=${args.ariaLabel ?? nothing}
          .labelledby=${args.labelledby ?? null}
          .describedby=${args.describedby ?? null}
          @input=${console.log}
          @change=${console.log}
          helperText=${args.hasHelperText}
        >
          ${args.hasLeadingIcon
            ? html`<obi-ship slot="leading-icon"></obi-ship>`
            : ''}
        </obc-number-input-field>
      </div>
    `;
  },
} satisfies Meta<ObcNumberInputField>;

export default meta;
type Story = StoryObj<ObcNumberInputField>;

// Basic configurations
export const Default: Story = {
  args: {
    value: '123',
    hasUnit: false,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const Empty: Story = {
  args: {
    value: '',
    hasUnit: false,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

// Alignment variations (visually different)
export const AlignRight: Story = {
  args: {
    value: '456.78',
    unit: 'bar',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const AlignCenter: Story = {
  args: {
    value: '22.5',
    unit: '°C',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const AlignRightUnitOutside: Story = {
  args: {
    value: '1500',
    unit: 'RPM',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.RightUnitOutside,
  },
};

// Layout variations (each adds visual elements)
export const WithTitle: Story = {
  args: {
    value: '75',
    unit: '%',
    hasUnit: true,
    hasTitle: true,
    title: 'Engine Load',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const WithTitleRequired: Story = {
  args: {
    value: '',
    unit: 'bar',
    hasUnit: true,
    hasTitle: true,
    title: 'Oil Pressure',
    isRequired: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const WithHelperText: Story = {
  args: {
    value: '3.5',
    unit: 'bar',
    hasUnit: true,
    hasHelperText: true,
    helperText: 'Normal range: 3.0 - 4.5 bar',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    value: '18.5',
    unit: 'knots',
    hasUnit: true,
    hasLeadingIcon: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

// State variations (visually distinct)
export const Disabled: Story = {
  args: {
    value: '50',
    unit: '%',
    hasUnit: true,
    isDisabled: true,
    hasTitle: true,
    title: 'Throttle Position (Locked)',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const Error: Story = {
  args: {
    value: '999',
    unit: 'kPa',
    hasUnit: true,
    hasError: true,
    hasHelperText: true,
    helperText: 'Value exceeds maximum limit',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const ErrorRequired: Story = {
  args: {
    value: '',
    unit: 'kg',
    hasUnit: true,
    hasError: true,
    hasTitle: true,
    title: 'Weight',
    isRequired: true,
    hasHelperText: true,
    helperText: 'This field is required',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

// Complex combinations (showing all features work together)
export const Complete: Story = {
  args: {
    value: '85.5',
    unit: 'kW',
    hasUnit: true,
    hasTitle: true,
    title: 'Power Output',
    isRequired: true,
    hasLeadingIcon: true,
    hasHelperText: true,
    helperText: 'Maximum continuous rating: 100 kW',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const CompleteCenter: Story = {
  args: {
    value: '42',
    unit: 'Hz',
    hasUnit: true,
    hasTitle: true,
    title: 'Frequency',
    isRequired: true,
    hasLeadingIcon: true,
    hasHelperText: true,
    helperText: 'Standard: 50/60 Hz',
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const CompleteUnitOutside: Story = {
  args: {
    value: '380',
    unit: 'VAC',
    hasUnit: true,
    hasTitle: true,
    title: 'Voltage',
    hasLeadingIcon: true,
    hasHelperText: true,
    helperText: 'Three-phase supply',
    textAlign: ObcNumberInputFieldTextAlign.RightUnitOutside,
  },
};

export const CompleteDisabled: Story = {
  args: {
    value: '100',
    unit: '%',
    hasUnit: true,
    hasTitle: true,
    title: 'System Load',
    hasLeadingIcon: true,
    hasHelperText: true,
    helperText: 'System at maximum capacity',
    isDisabled: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const CompleteError: Story = {
  args: {
    value: '150',
    unit: 'bar',
    hasUnit: true,
    hasTitle: true,
    title: 'Pressure Alert',
    isRequired: true,
    hasLeadingIcon: true,
    hasHelperText: true,
    helperText: 'Critical: Pressure too high!',
    hasError: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

// Edge cases
export const LongValue: Story = {
  args: {
    value: '123456789.12345',
    unit: 'MW',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};

export const LongValueCenter: Story = {
  args: {
    value: '987654321.54321',
    unit: 'bytes',
    hasUnit: true,
    textAlign: ObcNumberInputFieldTextAlign.Center,
  },
};

export const NoUnit: Story = {
  args: {
    value: '42',
    hasUnit: false,
    hasTitle: true,
    title: 'Dimensionless Value',
    hasHelperText: true,
    helperText: 'Pure number with no unit',
    textAlign: ObcNumberInputFieldTextAlign.Right,
  },
};