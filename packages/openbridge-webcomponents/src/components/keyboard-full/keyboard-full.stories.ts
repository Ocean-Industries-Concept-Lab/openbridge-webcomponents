import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcKeyboardFull, ObcKeyboardFullType} from './keyboard-full.js';
import {ObcTextInputFieldSize} from '../text-input-field/text-input-field.js';
import './keyboard-full.js';

const meta: Meta<typeof ObcKeyboardFull> = {
  title: 'Application Components/Input/Keyboard Full',
  tags: ['6.0'],
  component: 'obc-keyboard-full',
  parameters: {
    docs: {
      description: {
        component: `
## Full Alphanumeric Keyboard Component

A comprehensive keyboard component supporting alphabetic, numeric, and symbol input with QWERTY layout.

### Key Features:
- **Multiple Modes**: ABC (QWERTY), Numbers, and Symbols layouts
- **CAPS Lock**: Toggle between uppercase and lowercase
- **Navigation**: Arrow buttons to switch between number/symbol layouts
- **Flexible Styling**: Supports floating/flat visual styles
- **Input Field**: Integrated text input with real-time value updates

### Keyboard Modes:
- **ABC Mode**: QWERTY layout with CAPS lock functionality
- **123 Mode**: Numbers and common symbols
- **Symbols Mode**: Extended symbol set

### Usage:
Ideal for touch-screen interfaces where a custom keyboard is needed for text entry, especially in maritime or industrial applications.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcKeyboardFullType),
      description: 'Visual style of the keyboard',
      table: {
        defaultValue: {summary: 'floating'},
      },
    },
    parameterName: {
      control: 'text',
      description: 'Title displayed in the top bar',
      table: {
        defaultValue: {summary: 'Parameter name'},
      },
    },
    showTopBar: {
      control: 'boolean',
      description: 'Shows/hides the top bar with title and close button',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    value: {
      control: 'text',
      description: 'Current input value (can be used for two-way binding)',
      table: {
        defaultValue: {summary: '""'},
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
      table: {
        defaultValue: {summary: 'Placeholder'},
      },
    },
    showNumberRow: {
      control: 'boolean',
      description:
        'Shows number row (1-9, 0) above QWERTY layout with cursor navigation arrows on the side',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    inputSize: {
      control: 'select',
      options: Object.values(ObcTextInputFieldSize),
      description: 'Size of the input field (regular or large)',
      table: {
        defaultValue: {summary: 'large'},
      },
    },
  },
  args: {
    type: ObcKeyboardFullType.Floating,
    parameterName: 'Parameter name',
    showTopBar: true,
    value: '',
    placeholder: 'Placeholder',
    showNumberRow: false,
    inputSize: ObcTextInputFieldSize.Large,
  },
} satisfies Meta<ObcKeyboardFull>;

export default meta;
type Story = StoryObj<ObcKeyboardFull>;

const renderKeyboard = (args: ObcKeyboardFull) => html`
  <obc-keyboard-full
    .type=${args.type}
    .parameterName=${args.parameterName}
    .showTopBar=${args.showTopBar}
    .value=${args.value}
    .placeholder=${args.placeholder}
    .showNumberRow=${args.showNumberRow}
    .inputSize=${args.inputSize}
    @value-change=${(e: CustomEvent) =>
      console.log('value-change:', e.detail.value)}
    @done-click=${(e: CustomEvent) =>
      console.log('done-click:', e.detail.value)}
    @close-click=${() => console.log('close-click')}
  >
  </obc-keyboard-full>
`;

export const Default: Story = {
  args: {},
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story: 'Default keyboard in floating style with ABC (QWERTY) layout.',
      },
    },
  },
};

export const FlatStyle: Story = {
  args: {
    type: ObcKeyboardFullType.Flat,
    parameterName: 'Enter text',
    placeholder: 'Type here...',
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Flat keyboard without shadow, suitable for embedded layouts at the bottom of the screen.',
      },
    },
  },
};

export const WithNumberRow: Story = {
  args: {
    type: ObcKeyboardFullType.Floating,
    parameterName: 'Password',
    placeholder: 'Enter password...',
    value: '',
    showNumberRow: true,
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard with number row (1-9, 0) and symbols layout. Ideal for password or mixed alphanumeric input. Cursor navigation arrows appear in the action buttons area.',
      },
    },
  },
};

export const WithoutTopBar: Story = {
  args: {
    type: ObcKeyboardFullType.Floating,
    showTopBar: false,
    placeholder: 'Type here...',
    value: '',
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the `showTopBar` property set to `false`. The keyboard renders without the parameter name header and close button.',
      },
    },
  },
};

export const WithInitialValue: Story = {
  args: {
    type: ObcKeyboardFullType.Floating,
    parameterName: 'Edit Text',
    value: 'Hello World',
    placeholder: 'Type here...',
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the `value` property with pre-filled text. Shows cursor positioning and editing capabilities - click in the input to position cursor, use arrow buttons to navigate.',
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  args: {
    type: ObcKeyboardFullType.Floating,
    parameterName: 'Input Field',
    placeholder: 'Custom placeholder text goes here...',
    value: '',
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the `placeholder` property. The placeholder text is shown when the input is empty.',
      },
    },
  },
};

export const CustomParameterName: Story = {
  args: {
    type: ObcKeyboardFullType.Floating,
    parameterName: 'Custom Header Title',
    placeholder: 'Type here...',
    value: '',
    showTopBar: true,
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the `parameterName` property. This text appears in the top bar header.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    type: ObcKeyboardFullType.Floating,
    parameterName: 'Playground',
    showTopBar: true,
    value: '',
    placeholder: 'Experiment with settings...',
  },
  render: renderKeyboard,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - try different combinations of props in the Controls panel below.',
      },
    },
  },
};
