import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcInstrumentField, InstrumentFieldSize} from './instrument-field.js';
import './instrument-field.js';
import { html } from 'lit';
import "../../components/navigation-item/navigation-item";

const meta: Meta<typeof ObcInstrumentField> = {
  title: 'Instrument/Field',
  tags: ['autodocs'],
  component: 'obc-instrument-field',
  args: {},
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(InstrumentFieldSize),
    },
  },
} satisfies Meta<ObcInstrumentField>;

export default meta;
type Story = StoryObj<ObcInstrumentField>;

export const Primary: Story = {
  args: {
    setpoint: 123,
    hasSetpoint: true,
    value: 123,
    tag: 'HDG',
    unit: 'DEG',
  },
};

export const Enhanced: Story = {
  args: {
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    value: 10,
    tag: 'HDG',
    unit: '/min',
  },
};

export const EnhancedWithSrc: Story = {
  args: {
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    value: 10,
    tag: 'HDG',
    unit: '/min',
    hasSrc: true,
    src: 'GPS',
    maxDigits: 3,
  },
};

export const EnhancedZeroPadding: Story = {
  args: {
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    value: 10,
    tag: 'HDG',
    unit: '/min',
    hasSrc: true,
    src: 'GPS',
    showZeroPadding: true,
    maxDigits: 3,
  },
};

export const NoSetpoint: Story = {
  args: {
    hasSetpoint: false,
    value: 10,
    tag: 'HDG',
    unit: '/min',
  },
};
export const WithDecimals: Story = {
  args: {
    hasSetpoint: false,
    value: 1.3,
    fractionDigits: 2,
    tag: 'Offset',
    unit: 'm',
  },
};

export const NeutralColor: Story = {
  args: {
    neutralColor: true,
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: false,
    value: 63,
    tag: 'Speed',
    unit: 'KN',
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    setpoint: 123,
    value: 63,
    tag: 'Speed',
    unit: 'KN',
  },
};

export const HorizontalWithSrc: Story = {
  args: {
    horizontal: true,
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    hasSrc: true,
    setpoint: 123,
    value: 63,
    tag: 'Speed',
    unit: 'KN',
    src: 'GPS',
  },
};

export const HorizontalWithSrcPicker: Story = {
  args: {
    horizontal: true,
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    hasSrc: true,
    setpoint: 123,
    value: 63,
    tag: 'Speed',
    unit: 'KN',
    src: 'GPS',
    hasSrcPicker: true,
  },
  render: (args) => {
    return html`
    <obc-instrument-field
      .size=${args.size}
      .hasSetpoint=${args.hasSetpoint}
      .hasSrc=${args.hasSrc}
      .setpoint=${args.setpoint}
      .value=${args.value}
      .tag=${args.tag}
      .unit=${args.unit}
      .src=${args.src}
      .hasSrcPicker=${args.hasSrcPicker}
      .horizontal=${args.horizontal}
    >
      <div slot="src-picker-content">
        <obc-navigation-item label="GPS"></obc-navigation-item>
        <obc-navigation-item label="GLONASS"></obc-navigation-item>
        <obc-navigation-item label="BEIDOU"></obc-navigation-item>
        <obc-navigation-item label="GALILEO"></obc-navigation-item>
      </div>
    </obc-instrument-field>
    `;
  }
};

export const HorizontalRegular: Story = {
  args: {
    horizontal: true,
    size: InstrumentFieldSize.regular,
    hasSetpoint: true,
    hasSrc: true,
    setpoint: 123,
    value: 63,
    tag: 'Speed',
    unit: 'KN',
    src: 'GPS',
  },
};

export const LabelOnly: Story = {
  args: {
    labelOnly: true,
    horizontal: true,
    size: InstrumentFieldSize.enhanced,
    tag: 'Speed',
    unit: 'KN',
  },
};

export const AutoHideSetpoint: Story = {
  args: {
    autoHideSetpoint: true,
    autoHideDeadband: 1,
    size: InstrumentFieldSize.enhanced,
    hasSetpoint: true,
    value: 10,
    setpoint: 10,
    tag: 'HDG',
    unit: '/min',
    hasSrc: true,
    src: 'GPS',
  },
};

export const Off: Story = {
  args: {
    off: true,
    size: InstrumentFieldSize.enhanced,
  },
};
