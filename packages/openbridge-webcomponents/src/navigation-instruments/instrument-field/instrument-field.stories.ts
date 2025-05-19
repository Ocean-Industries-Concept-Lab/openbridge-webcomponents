import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcInstrumentField, InstrumentFieldSize} from './instrument-field.js';
import './instrument-field.js';

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

export const LabelOnly: Story = {
  args: {
    labelOnly: true,
    horizontal: true,
    size: InstrumentFieldSize.enhanced,
    tag: 'Speed',
    unit: 'KN',
  },
};

export const Off: Story = {
  args: {
    off: true,
    size: InstrumentFieldSize.enhanced,
  },
};
