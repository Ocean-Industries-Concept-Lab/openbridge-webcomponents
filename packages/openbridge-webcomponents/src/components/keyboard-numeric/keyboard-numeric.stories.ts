import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcKeyboardNumeric,
  ObcKeyboardNumericType,
} from './keyboard-numeric.js';
import './keyboard-numeric.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcKeyboardNumeric> = {
  title: 'Application Components/Input/Keyboard numeric',
  tags: ['6.0'],
  component: 'obc-keyboard-numeric',
  parameters: {
    docs: {
      description: {
        component: `
## Dynamic Keyboard Component

A flexible numeric keyboard that adapts based on allowed characters. The keyboard automatically adjusts its layout based on the number of symbols you allow.

### Key Features:
- **Dynamic Layout**: 0-2 symbols appear on main keyboard, 3+ symbols add a toggle button
- **Input Validation**: Use \`allowedSymbols\` to restrict characters and \`validationPattern\` for regex validation
- **Flexible Styling**: Supports floating/flat styles and various text alignments

### How Symbol Layout Works:
- **No symbols** (\`allowedSymbols=""\`): Only shows 0-9
- **1-2 symbols** (\`allowedSymbols=".-"\`): Shows symbols next to 0 button
- **3+ symbols** (\`allowedSymbols=".-+*/"\`): Shows first 2 symbols on main keyboard, rest on secondary keyboard with toggle button

### Validation Options:
1. **Character Whitelist** (\`allowedSymbols\`): Only these characters can be typed
2. **Regex Pattern** (\`validationPattern\`): Enforces specific formats
3. **Both**: Characters must be in whitelist AND match pattern
        `
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcKeyboardNumericType),
      description: 'Visual style of the keyboard',
      table: {
        defaultValue: { summary: 'floating' }
      }
    },
    parameterName: {
      control: 'text',
      description: 'Title displayed in the top bar',
      table: {
        defaultValue: { summary: 'Parameter name' }
      }
    },
    showTopBar: {
      control: 'boolean',
      description: 'Shows/hides the top bar with title and close button',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    value: {
      control: 'text',
      description: 'Current input value (can be used for two-way binding)',
      table: {
        defaultValue: { summary: '""' }
      }
    },
    allowedSymbols: {
      control: 'text',
      description: 'String of allowed special characters. Empty = only 0-9. Examples: ".-" for decimals, "+-*/" for math',
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' }
      }
    },
    validationPattern: {
      control: 'text',
      description: 'Optional regex pattern for format validation. Example: "^\\d*\\.?\\d*$" for decimal numbers',
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' }
      }
    },
    hasHelperText: {
      control: 'boolean',
      description: 'Enables helper text below the input field',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text content (when hasHelperText is true)',
      table: {
        defaultValue: { summary: '""' }
      }
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Shows a leading icon slot in the input field',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    hasUnit: {
      control: 'boolean',
      description: 'Enables unit display',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    unit: {
      control: 'text',
      description: 'Unit text (%, kg, °C, etc.)',
      table: {
        defaultValue: { summary: '""' }
      }
    },
    inputFieldTextAlign: {
      control: 'select',
      options: ['right', 'center', 'right-unit-outside'],
      description: 'Text alignment and unit placement style',
      table: {
        defaultValue: { summary: 'right' }
      }
    },
  },
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Parameter name',
    showTopBar: true,
    value: '',
    allowedSymbols: '',
    validationPattern: '',
    hasHelperText: false,
    helperText: '',
    hasLeadingIcon: false,
    hasUnit: false,
    unit: '',
    inputFieldTextAlign: 'right',
  },
} satisfies Meta<ObcKeyboardNumeric>;

export default meta;
type Story = StoryObj<ObcKeyboardNumeric>;

const renderKeyboard = (args: any) => html`
    <obc-keyboard-numeric
      .type=${args.type}
      .parameterName=${args.parameterName}
      .showTopBar=${args.showTopBar}
      .value=${args.value}
      .allowedSymbols=${args.allowedSymbols}
      .validationPattern=${args.validationPattern}
      .hasHelperText=${args.hasHelperText}
      .helperText=${args.helperText}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasUnit=${args.hasUnit}
      .unit=${args.unit}
      .inputFieldTextAlign=${args.inputFieldTextAlign}
      @value-change=${(e: CustomEvent) =>
        console.log('value-change:', e.detail.value)}
      @done-click=${(e: CustomEvent) =>
        console.log('done-click:', e.detail.value)}
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

export const IntegersOnly: Story = {
  args: {
    parameterName: 'Quantity',
    allowedSymbols: '',
    hasHelperText: true,
    helperText: 'Only whole numbers (0-9) allowed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic keyboard with no symbols - only numbers 0-9 can be entered.'
      }
    }
  },
  render: renderKeyboard,
};

export const TwoSymbols: Story = {
  args: {
    parameterName: 'Temperature',
    allowedSymbols: '.-',
    hasUnit: true,
    unit: '°C',
    hasHelperText: true,
    helperText: 'Decimal and negative values allowed',
  },
  parameters: {
    docs: {
      description: {
        story: 'With 2 symbols (. and -), they appear directly on the main keyboard next to 0. No toggle button needed.'
      }
    }
  },
  render: renderKeyboard,
};

export const ManySymbols: Story = {
  args: {
    parameterName: 'Expression',
    allowedSymbols: '.-+*/()[]%',
    hasHelperText: true,
    helperText: 'Press #+= to access additional symbols',
  },
  parameters: {
    docs: {
      description: {
        story: 'With 3+ symbols, first 2 appear on main keyboard, rest on secondary keyboard accessed via #+= toggle button.'
      }
    }
  },
  render: renderKeyboard,
};

export const WithValidationPattern: Story = {
  args: {
    parameterName: 'Percentage',
    allowedSymbols: '.',
    validationPattern: '^\\d{0,3}(\\.\\d{0,2})?$',
    hasUnit: true,
    unit: '%',
    hasHelperText: true,
    helperText: 'Max 3 digits, 2 decimal places',
  },
  parameters: {
    docs: {
      description: {
        story: 'Uses regex validation to enforce specific format. Here: max 3 digits before decimal, max 2 after.'
      }
    }
  },
  render: renderKeyboard,
};

export const FlatStyle: Story = {
  args: {
    type: ObcKeyboardNumericType.flat,
    parameterName: 'Amount',
    allowedSymbols: '.',
    hasUnit: true,
    unit: 'USD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Flat visual style variant for embedded layouts.'
      }
    }
  },
  render: renderKeyboard,
};

export const NoTopBar: Story = {
  args: {
    showTopBar: false,
    allowedSymbols: '.-',
    hasUnit: true,
    unit: 'kg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard without top bar - useful when title/close handled externally.'
      }
    }
  },
  render: renderKeyboard,
};

export const CenterAlignedText: Story = {
  args: {
    parameterName: 'Value',
    allowedSymbols: '.',
    inputFieldTextAlign: 'center',
    hasUnit: true,
    unit: 'm',
    value: '125.5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Center-aligned text with dynamic width adjustment.'
      }
    }
  },
  render: renderKeyboard,
};

export const UnitOutside: Story = {
  args: {
    parameterName: 'Weight',
    allowedSymbols: '.',
    inputFieldTextAlign: 'right-unit-outside',
    hasUnit: true,
    unit: 'kg',
    value: '75.5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Unit displayed outside the input field for better readability.'
      }
    }
  },
  render: renderKeyboard,
};

export const WithLeadingIcon: Story = {
  args: {
    parameterName: 'Pressure',
    allowedSymbols: '.',
    hasLeadingIcon: true,
    hasUnit: true,
    unit: 'bar',
    hasHelperText: true,
    helperText: 'Operating pressure',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field with leading icon slot for visual context.'
      }
    }
  },
  render: renderKeyboard,
};

export const CompleteExample: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Engine Temperature',
    showTopBar: true,
    allowedSymbols: '.-',
    validationPattern: '^-?\\d{0,3}(\\.\\d)?$',
    hasLeadingIcon: true,
    hasUnit: true,
    unit: '°C',
    inputFieldTextAlign: 'right',
    hasHelperText: true,
    helperText: 'Range: -50.0 to 150.0',
    value: '85.5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-featured example showing all major props working together.'
      }
    }
  },
  render: renderKeyboard,
};

export const Playground: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Playground',
    showTopBar: true,
    value: '',
    allowedSymbols: '.-+',
    validationPattern: '',
    hasHelperText: true,
    helperText: 'Experiment with different settings',
    hasLeadingIcon: false,
    hasUnit: true,
    unit: 'units',
    inputFieldTextAlign: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - try different combinations of props in the Controls panel below.'
      }
    }
  },
  render: renderKeyboard,
};