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
