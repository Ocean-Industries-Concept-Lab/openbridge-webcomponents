import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTransmitterButton} from './transmitter-button.js';
import './transmitter-button.js';
import {
  TransmitterButtonSize,
  TransmitterButtonVariant,
} from './transmitter-button.js';
import '../../icons/icon-temperature-air.js';

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
    maxDigits: 0,
    hintedZeros: false,
    hasIcon: false,
    hasAdvice: false,
    adviceValue: 123,
    hasSetPoint: false,
    setpointValue: 123,
    label: 'TT',
  },
  argTypes: {
    variant: {
      options: [TransmitterButtonVariant.value, TransmitterButtonVariant.tag],
      control: {type: 'radio'},
    },
    size: {
      options: [
        TransmitterButtonSize.regular,
        TransmitterButtonSize.medium,
        TransmitterButtonSize.large,
      ],
      control: {type: 'radio'},
    },
    value: {
      options: [
        'NaN',
        'undefined',
        'null',
        '-12.34',
        '0.0',
        '1.0000',
        '12.3400',
        '123.4567',
      ],
      mapping: {
        NaN: NaN,
        undefined: undefined,
        null: null,
        '0.0': 0.0,
        '-12.34': -12.34,
        '1.0000': 1.0,
        '12.3400': 12.34,
        '123.4567': 123.4567,
      },
      control: {type: 'select'},
    },
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
      .maxDigits=${args.maxDigits}
      .hintedZeros=${args.hintedZeros}
      .hasIcon=${args.hasIcon}
      .hasAdvice=${args.hasAdvice}
      .adviceValue=${args.adviceValue}
      .hasSetPoint=${args.hasSetPoint}
      .setpointValue=${args.setpointValue}
      .label=${args.label}
    >
      ${args.hasIcon
        ? html`<obi-temperature-air slot="icon"></obi-temperature-air>`
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

export const WithSetpoint: Story = {
  args: {hasIcon: true, hasSetPoint: true},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const WithAdviceAndSetpoint: Story = {
  args: {hasIcon: true, hasAdvice: true, hasSetPoint: true},
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

export const MissingValue: Story = {
  args: {hasIcon: true, value: NaN},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const MissingAdviceValue: Story = {
  args: {hasIcon: true, hasAdvice: true, adviceValue: null},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const MissingSetpointValue: Story = {
  args: {hasIcon: true, hasSetPoint: true, setpointValue: undefined},
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const ZeroPadded: Story = {
  args: {
    value: 12.3,
    fractionDigits: 1,
    maxDigits: 4,
    hintedZeros: true,
    hasIcon: true,
  },
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const ZeroPaddedNegativeValue: Story = {
  args: {
    value: -12.3,
    fractionDigits: 1,
    maxDigits: 4,
    hintedZeros: true,
    hasIcon: true,
  },
  render: (args) => renderComponent(args as ObcTransmitterButton),
};

export const ZeroPaddedMissingValue: Story = {
  args: {
    value: NaN,
    fractionDigits: 1,
    maxDigits: 4,
    hintedZeros: true,
    hasIcon: true,
  },
  render: (args) => renderComponent(args as ObcTransmitterButton),
};
