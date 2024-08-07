import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcInstrumentField} from './instrument-field';
import './instrument-field';

const meta: Meta<typeof ObcInstrumentField> = {
  title: 'Instrument/Field',
  tags: ['autodocs'],
  component: 'obc-instrument-field',
  args: {},
} satisfies Meta<ObcInstrumentField>;

export default meta;
type Story = StoryObj<ObcInstrumentField>;

export const Primary: Story = {
  args: {
    setpoint: 0,
    hasSetpoint: true,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: true,
  },
};

export const NoSource: Story = {
  args: {
    hasSetpoint: true,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: false,
  },
};

export const NoSetpoint: Story = {
  args: {
    hasSetpoint: false,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    setpoint: 0,
    hasSetpoint: true,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: true,
  },
};

export const WithDecimals: Story = {
  args: {
    hasSetpoint: false,
    value: 1.3,
    fractionDigits: 2,
    degree: false,
    tag: 'Offset',
    unit: 'm',
    hasSource: false,
  },
};

export const Enhanced: Story = {
  args: {
    size: 'enhanced',
    setpoint: 0,
    hasSetpoint: true,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: true,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    setpoint: 0,
    hasSetpoint: true,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: true,
  },
};

export const LargeEnhanced = {
  args: {
    size: 'large-enhanced',
    setpoint: 0,
    hasSetpoint: true,
    value: 10,
    degree: true,
    tag: 'HDG',
    unit: '/min',
    source: 'SRC',
    hasSource: true,
  },
};
