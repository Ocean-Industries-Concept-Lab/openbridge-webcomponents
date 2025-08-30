import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcKeyboardNumeric} from './keyboard-numeric.js';
import './keyboard-numeric.js';

const meta: Meta<typeof ObcKeyboardNumeric> = {
  title: 'Application Components/Input/Keyboard numeric',
  tags: ['6.0'],
  component: 'obc-keyboard-numeric',
  argTypes: {
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
    placeholder: {
      control: 'text',
      description: 'Placeholder text when value is empty',
    },
  },
  args: {
    parameterName: 'Parameter name',
    showTopBar: true,
    value: '',
    placeholder: '1234',
  },
} satisfies Meta<ObcKeyboardNumeric>;

export default meta;
type Story = StoryObj<ObcKeyboardNumeric>;

export const Primary: Story = {
  args: {
    parameterName: 'Parameter name',
    showTopBar: true,
    value: '',
    placeholder: '1234',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .placeholder=${args.placeholder}
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
    showTopBar: false,
    value: '',
    placeholder: 'Enter value',
  },
  render: (args) => html`
    <div style="width: 320px; height: 360px;">
      <obc-keyboard-numeric
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .placeholder=${args.placeholder}
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
    parameterName: 'Amount',
    showTopBar: true,
    value: '123.45',
    placeholder: '',
  },
  render: (args) => html`
    <div style="width: 320px; height: 400px;">
      <obc-keyboard-numeric
        .parameterName=${args.parameterName}
        .showTopBar=${args.showTopBar}
        .value=${args.value}
        .placeholder=${args.placeholder}
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
    parameterName: 'Enter Amount',
    showTopBar: true,
    value: '',
    placeholder: '0.00',
  },
  render: (args) => {
    return html`
      <div style="width: 320px; height: 400px;">
        <obc-keyboard-numeric
          .parameterName=${args.parameterName}
          .showTopBar=${args.showTopBar}
          .value=${args.value}
          .placeholder=${args.placeholder}
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
