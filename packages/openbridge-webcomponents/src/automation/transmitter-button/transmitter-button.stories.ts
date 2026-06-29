import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTransmitterButton} from './transmitter-button.js';
import './transmitter-button.js';
import {
  TransmitterButtonSize,
  TransmitterButtonVariant,
} from './transmitter-button.js';
import '../../icons/icon-temperature-air.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcTransmitterButton> = {
  title: 'Automation/Transmitter/Transmitter Button',
  tags: ['autodocs'],
  component: 'obc-transmitter-button',
  args: {
    variant: TransmitterButtonVariant.value,
    size: TransmitterButtonSize.regular,
    value: 12.3,
    unit: '°C',
    fractionDigits: 1,
    hasIcon: false,
    hasAdvice: false,
    label: 'TT',
  },
  argTypes: {
    variant: {
      options: [TransmitterButtonVariant.value, TransmitterButtonVariant.tag],
      control: {type: 'radio'},
    },
    size: {
      options: [
        TransmitterButtonSize.small,
        TransmitterButtonSize.regular,
        TransmitterButtonSize.medium,
        TransmitterButtonSize.large,
      ],
      control: {type: 'radio'},
    },
    value: {control: {type: 'range', min: -99, max: 999, step: 0.1}},
  },
} satisfies Meta<ObcTransmitterButton>;

export default meta;
type Story = StoryObj<ObcTransmitterButton>;

function renderComponent(args: ObcTransmitterButton) {
  return html`
    <obc-transmitter-button
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      .unit=${args.unit}
      .fractionDigits=${args.fractionDigits}
      .hasIcon=${args.hasIcon}
      .hasAdvice=${args.hasAdvice}
      .label=${args.label}
    >
      ${args.hasIcon
        ? html`<obi-temperature-air slot="icon"></obi-temperature-air>`
        : ''}
      ${args.hasAdvice
        ? html`<obi-placeholder slot="advice"></obi-placeholder>`
        : ''}
    </obc-transmitter-button>
  `;
}

export const Default: Story = {
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const WithIcon: Story = {
  args: {hasIcon: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const WithAdvice: Story = {
  args: {hasIcon: true, hasAdvice: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const Small: Story = {
  args: {size: TransmitterButtonSize.small, hasIcon: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const Regular: Story = {
  args: {size: TransmitterButtonSize.regular, hasIcon: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const Medium: Story = {
  args: {size: TransmitterButtonSize.medium, hasIcon: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const Large: Story = {
  args: {size: TransmitterButtonSize.large, hasIcon: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const Tag: Story = {
  args: {variant: TransmitterButtonVariant.tag, label: 'TT'},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};
