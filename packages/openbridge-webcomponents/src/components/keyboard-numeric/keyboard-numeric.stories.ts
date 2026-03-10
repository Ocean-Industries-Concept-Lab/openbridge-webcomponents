import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcKeyboardNumericType} from './keyboard-numeric.js';
import {ObcNumberInputFieldTextAlign} from '../number-input-field/number-input-field.js';
import './keyboard-numeric.js';
import '../../icons/icon-placeholder.js';

type ObcKeyboardNumericArgs = {
  type: ObcKeyboardNumericType;
  label: string;
  hasTitleBar: boolean;
  hasCalculation: boolean;
  has2Symbols: boolean;
  value: string;
  validationPattern: string;
  helperText: string;
  hasLeadingIcon: boolean;
  unit: string;
  inputFieldTextAlign: ObcNumberInputFieldTextAlign;
};

const meta: Meta<ObcKeyboardNumericArgs> = {
  title: 'Application Components/Input/Keyboard Numeric',
  tags: ['6.0'],
  component: 'obc-keyboard-numeric',
  parameters: {
    docs: {
      description: {
        component: `
## Numeric Keyboard Component

A numeric keyboard for input fields with calculation capabilities.

### Key Features:
- **Type**: Floating (with shadow) or Flat (embedded) styles
- **Calculation Row**: Optional row with +, -, ×, ÷, = buttons using amplified styling
- **Symbol Toggle**: Switch between numbers (1-9) and symbols (!@#$%&()/) keyboards
- **Title Bar**: Optional top bar with label and close button (floating type only)

### Properties:
- \`type\`: "floating" | "flat" - Visual style
- \`hasTitleBar\`: Shows/hides top bar (only for floating type)
- \`hasCalculation\`: Shows/hides the calculation row (+, -, ×, ÷, =)
- \`has2Symbols\`: Shows/hides the #+= toggle button
- \`label\`: Parameter name displayed in top bar
- \`unit\`: Unit text displayed after the value
- \`helperText\`: Helper text displayed below the input
- \`validationPattern\`: Regex pattern for input validation (applies to keyboard and direct input)
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcKeyboardNumericType),
      description: 'Visual style of the keyboard',
      table: {
        defaultValue: {summary: 'floating'},
      },
    },
    label: {
      control: 'text',
      description: 'Label displayed in the top bar',
      table: {
        defaultValue: {summary: 'Parameter name'},
      },
    },
    hasTitleBar: {
      control: 'boolean',
      description:
        'Shows/hides the top bar with label and close button (floating type only)',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    hasCalculation: {
      control: 'boolean',
      description: 'Shows/hides the calculation row (+, -, ×, ÷, =)',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    has2Symbols: {
      control: 'boolean',
      description: 'Shows/hides the #+= / 123 toggle button',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    value: {
      control: 'text',
      description: 'Current input value',
      table: {
        defaultValue: {summary: '""'},
      },
    },
    validationPattern: {
      control: 'text',
      description:
        'Optional regex pattern for validation (applies to keyboard and direct input)',
      table: {
        defaultValue: {summary: '""'},
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input field',
      table: {
        defaultValue: {summary: '""'},
      },
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Shows a leading icon slot in the input field',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    unit: {
      control: 'text',
      description: 'Unit text (%, kg, °C, etc.)',
      table: {
        defaultValue: {summary: '""'},
      },
    },
    inputFieldTextAlign: {
      control: 'select',
      options: Object.values(ObcNumberInputFieldTextAlign),
      description: 'Text alignment in the input field',
      table: {
        defaultValue: {summary: 'Right'},
      },
    },
  },
  args: {
    type: ObcKeyboardNumericType.Floating,
    label: 'Parameter name',
    hasTitleBar: true,
    hasCalculation: true,
    has2Symbols: true,
    value: '',
    validationPattern: '',
    helperText: '',
    hasLeadingIcon: false,
    unit: '',
    inputFieldTextAlign: ObcNumberInputFieldTextAlign.Right,
  },
} satisfies Meta<ObcKeyboardNumericArgs>;

export default meta;
type Story = StoryObj<ObcKeyboardNumericArgs>;

const renderKeyboard = (args: ObcKeyboardNumericArgs) => html`
  <obc-keyboard-numeric
    .type=${args.type}
    .label=${args.label}
    .hasTitleBar=${args.hasTitleBar}
    .hasCalculation=${args.hasCalculation}
    .has2Symbols=${args.has2Symbols}
    .value=${args.value}
    .validationPattern=${args.validationPattern}
    .helperText=${args.helperText}
    .hasLeadingIcon=${args.hasLeadingIcon}
    .unit=${args.unit}
    .inputFieldTextAlign=${args.inputFieldTextAlign}
    @value-change=${(e: CustomEvent) =>
      console.log('value-change:', e.detail.value)}
    @done-click=${(e: CustomEvent) => {
      console.log('done-click:', e.detail.value);
      const keyboard = e.target as HTMLElement & {value: string};
      keyboard.value = e.detail.value;
    }}
    @close-click=${() => console.log('close-click')}
  >
    ${args.hasLeadingIcon
      ? html`<obi-placeholder slot="leading-icon"></obi-placeholder>`
      : ''}
  </obc-keyboard-numeric>
`;

export const Default: Story = {
  args: {},
  render: renderKeyboard,
};

export const FloatingWithAllFeatures: Story = {
  args: {
    type: ObcKeyboardNumericType.Floating,
    label: 'Temperature',
    hasTitleBar: true,
    hasCalculation: true,
    has2Symbols: true,
    unit: '°C',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Floating keyboard with all features enabled: title bar, calculation row, and symbol toggle.',
      },
    },
  },
  render: renderKeyboard,
};

export const FlatStyle: Story = {
  args: {
    type: ObcKeyboardNumericType.Flat,
    hasCalculation: true,
    has2Symbols: true,
    unit: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Flat visual style for embedded layouts. Note: hasTitleBar has no effect in flat mode.',
      },
    },
  },
  render: renderKeyboard,
};

export const NoCalculationRow: Story = {
  args: {
    label: 'Simple Input',
    hasCalculation: false,
    has2Symbols: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard without the calculation row (+, -, ×, ÷, =).',
      },
    },
  },
  render: renderKeyboard,
};

export const NoSymbolToggle: Story = {
  args: {
    label: 'Numbers Only',
    hasCalculation: true,
    has2Symbols: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard without the #+= toggle button - only numbers are available.',
      },
    },
  },
  render: renderKeyboard,
};

export const MinimalKeyboard: Story = {
  args: {
    type: ObcKeyboardNumericType.Flat,
    hasTitleBar: false,
    hasCalculation: false,
    has2Symbols: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal keyboard - flat style, no calculation row, no symbol toggle.',
      },
    },
  },
  render: renderKeyboard,
};

export const WithHelperText: Story = {
  args: {
    label: 'Percentage',
    helperText: 'Enter a value between 0 and 100',
    unit: '%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard with helper text for user guidance.',
      },
    },
  },
  render: renderKeyboard,
};

export const WithLeadingIcon: Story = {
  args: {
    label: 'Pressure',
    hasLeadingIcon: true,
    unit: 'bar',
    helperText: 'Operating pressure',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field with leading icon slot for visual context.',
      },
    },
  },
  render: renderKeyboard,
};

export const WithInitialValue: Story = {
  args: {
    label: 'Engine Temperature',
    value: '85.5',
    unit: '°C',
    hasCalculation: true,
    has2Symbols: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard initialized with a value.',
      },
    },
  },
  render: renderKeyboard,
};

export const Playground: Story = {
  args: {
    type: ObcKeyboardNumericType.Floating,
    label: 'Playground',
    hasTitleBar: true,
    hasCalculation: true,
    has2Symbols: true,
    value: '',
    validationPattern: '',
    helperText: 'Experiment with different settings',
    hasLeadingIcon: false,
    unit: 'units',
    inputFieldTextAlign: ObcNumberInputFieldTextAlign.Right,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - try different combinations of props in the Controls panel below.',
      },
    },
  },
  render: renderKeyboard,
};
