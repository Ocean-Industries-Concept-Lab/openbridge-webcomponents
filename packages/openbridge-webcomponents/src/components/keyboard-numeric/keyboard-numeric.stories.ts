import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcKeyboardNumeric,
  ObcKeyboardNumericType,
} from './keyboard-numeric.js';
import './keyboard-numeric.js';

const meta: Meta<typeof ObcKeyboardNumeric> = {
  title: 'Application Components/Input/Keyboard numeric',
  tags: ['6.0'],
  component: 'obc-keyboard-numeric',
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcKeyboardNumericType),
      description: 'Visual type of the keyboard (floating or flat)',
    },
    parameterName: {
      control: 'text',
      description: 'Title displayed in the top bar',
    },
    showTopBar: {
      control: 'boolean',
      description: 'Whether to show the top bar with title and close button',
    },
    value: {
      control: 'text',
      description: 'Current input value',
    },
    hasHelperText: {
      control: 'boolean',
      description: 'Whether to show helper text below the input field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text content displayed below the input',
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Whether to show a leading icon in the input field',
    },
    hasUnit: {
      control: 'boolean',
      description: 'Whether to show a unit suffix in the input field',
    },
    unit: {
      control: 'text',
      description: 'Unit text to display (e.g., %, kg, °C)',
    },
    inputFieldTextAlign: {
      control: 'select',
      options: ['right', 'center', 'right-unit-outside'],
      description:
        'Text alignment and unit placement in the input field (right, center, right-unit-outside)',
    },
  },
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Parameter name',
    showTopBar: true,
    value: '',
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

export const Primary: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Parameter name',
    showTopBar: true,
    value: '',
    hasHelperText: false,
    helperText: '',
    hasLeadingIcon: false,
    hasUnit: false,
    unit: '',
    inputFieldTextAlign: 'right',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .hasHelperText=${args.hasHelperText}
        .helperText=${args.helperText}
        .hasLeadingIcon=${args.hasLeadingIcon}
        .hasUnit=${args.hasUnit}
        .unit=${args.unit}
        .inputFieldTextAlign=${args.inputFieldTextAlign}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
        @symbols-click=${() => console.log('Symbols clicked')}
      >
        ${args.hasLeadingIcon
          ? html`<obi-01-basic-atom-icon-color
              slot="leading-icon"
              icon="placeholder"
            ></obi-01-basic-atom-icon-color>`
          : ''}
        ${args.hasHelperText
          ? html`<span slot="helper-text">${args.helperText}</span>`
          : ''}
      </obc-keyboard-numeric>
    </div>
  `,
};

export const WithUnit: Story = {
  args: {
    ...Primary.args,
    hasUnit: true,
    unit: '°C',
    value: '23.5',
    inputFieldTextAlign: 'center',
  },
};

export const WithUnitOutside: Story = {
  args: {
    ...Primary.args,
    hasUnit: true,
    unit: 'kg',
    value: '150',
    inputFieldTextAlign: 'right-unit-outside',
  },
};

export const WithHelperText: Story = {
  args: {
    ...Primary.args,
    hasHelperText: true,
    helperText: 'Enter a value between 0 and 100',
    hasUnit: true,
    unit: '%',
    value: '75',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    ...Primary.args,
    hasLeadingIcon: true,
    hasUnit: true,
    unit: 'bar',
    value: '3.5',
  },
};