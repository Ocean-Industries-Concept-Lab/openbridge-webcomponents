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
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
        @symbols-click=${() => console.log('Symbols clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const FlatType: Story = {
  args: {
    type: ObcKeyboardNumericType.flat,
    parameterName: 'Enter Value',
    showTopBar: true,
    value: '',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const WithUnit: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Temperature',
    showTopBar: true,
    value: '25.5',
    hasUnit: true,
    unit: '°C',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .hasUnit=${args.hasUnit}
        .unit=${args.unit}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const WithHelperText: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Dosage',
    showTopBar: true,
    value: '',
    hasHelperText: true,
    helperText: 'Enter value between 0.1 and 10.0',
    hasUnit: true,
    unit: 'mg',
  },
  render: (args) => html`
    <div style="width: 320px; height: 420px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .hasHelperText=${args.hasHelperText}
        .helperText=${args.helperText}
        .hasUnit=${args.hasUnit}
        .unit=${args.unit}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const WithLeadingIcon: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Price',
    showTopBar: true,
    value: '99.99',
    hasLeadingIcon: true,
    hasUnit: true,
    unit: 'USD',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .hasLeadingIcon=${args.hasLeadingIcon}
        .hasUnit=${args.hasUnit}
        .unit=${args.unit}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const FullyConfigured: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Flow Rate',
    showTopBar: true,
    value: '1.5',
    hasHelperText: true,
    helperText: 'Recommended range: 0.5 - 5.0',
    hasLeadingIcon: true,
    hasUnit: true,
    unit: 'L/min',
  },
  render: (args) => html`
    <div style="width: 320px; height: 420px;">
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
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
        @symbols-click=${() => console.log('Symbols clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const WithoutTopBar: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    showTopBar: false,
    value: '',
    hasUnit: true,
    unit: '%',
  },
  render: (args) => html`
    <div style="width: 320px; height: 360px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .hasUnit=${args.hasUnit}
        .unit=${args.unit}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const WithPrefilledValue: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Amount',
    showTopBar: true,
    value: '123.45',
    hasUnit: true,
    unit: 'kg',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .type=${args.type}
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .hasUnit=${args.hasUnit}
        .unit=${args.unit}
        @value-change=${(e: CustomEvent) =>
          console.log('Value changed:', e.detail.value)}
        @done-click=${(e: CustomEvent) =>
          console.log('Done clicked:', e.detail.value)}
        @close-click=${() => console.log('Close clicked')}
      ></obc-keyboard-numeric>
    </div>
  `,
};

export const Interactive: Story = {
  args: {
    type: ObcKeyboardNumericType.floating,
    parameterName: 'Enter Amount',
    showTopBar: true,
    value: '',
    hasHelperText: false,
    helperText: 'Min: 0, Max: 100',
    hasLeadingIcon: false,
    hasUnit: true,
    unit: '%',
  },
  render: (args) => {
    return html`
      <div style="width: 320px; height: 420px;">
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
          @value-change=${(e: CustomEvent) => {
            console.log('Value changed:', e.detail.value);
            // Update the component's value in real-time
            const target = e.target as ObcKeyboardNumeric;
            target.value = e.detail.value;
          }}
          @done-click=${(e: CustomEvent) => {
            console.log('Done clicked with value:', e.detail.value);
            alert(`Value submitted: ${e.detail.value}`);
          }}
          @close-click=${() => {
            console.log('Close clicked');
            alert('Keyboard closed');
          }}
          @symbols-click=${() => {
            console.log('Symbols clicked');
            alert('Symbols mode (not implemented in this demo)');
          }}
        ></obc-keyboard-numeric>
      </div>
    `;
  },
};
