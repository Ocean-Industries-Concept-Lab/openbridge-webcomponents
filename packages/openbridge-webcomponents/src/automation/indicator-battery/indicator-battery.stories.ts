import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcIndicatorBattery,
  IndicatorBatteryVariant,
  IndicatorBatteryValue,
} from './indicator-battery.js';
import './indicator-battery.js';
import {IndicatorDirection} from '../indicator-shared/linear-indicator.js';

const meta = {
  title: 'Automation/Indicators/Indicator Battery',
  component: 'obc-indicator-battery',
  tags: ['autodocs', '6.0'],
  args: {
    direction: IndicatorDirection.vertical,
    variant: IndicatorBatteryVariant.bar,
    value: IndicatorBatteryValue.regular,
    level: 40,
    data: [60, 52, 58, 45, 50, 42, 44, 40],
    hasIcon: false,
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: Object.values(IndicatorDirection),
    },
    variant: {
      control: 'radio',
      options: Object.values(IndicatorBatteryVariant),
    },
    value: {
      control: 'radio',
      options: Object.values(IndicatorBatteryValue),
    },
    level: {control: {type: 'range', min: 0, max: 100}},
  },
  render: (args) => html`
    <obc-indicator-battery
      .direction=${args.direction}
      .variant=${args.variant}
      .value=${args.value}
      .level=${args.level}
      .data=${args.data}
      .hasIcon=${args.hasIcon}
    ></obc-indicator-battery>
  `,
} satisfies Meta<Partial<ObcIndicatorBattery>>;

export default meta;
type Story = StoryObj<Partial<ObcIndicatorBattery>>;

export const Default: Story = {};

export const BarHorizontal: Story = {
  args: {direction: IndicatorDirection.horizontal},
};

export const TrendVertical: Story = {
  args: {variant: IndicatorBatteryVariant.trend},
};

export const TrendHorizontal: Story = {
  args: {
    variant: IndicatorBatteryVariant.trend,
    direction: IndicatorDirection.horizontal,
  },
};

export const Enhanced: Story = {
  args: {value: IndicatorBatteryValue.enhanced},
};

export const Categorical: Story = {
  args: {value: IndicatorBatteryValue.categorical},
};

export const TrendEnhanced: Story = {
  args: {
    variant: IndicatorBatteryVariant.trend,
    value: IndicatorBatteryValue.enhanced,
  },
};

export const TrendCategorical: Story = {
  args: {
    variant: IndicatorBatteryVariant.trend,
    value: IndicatorBatteryValue.categorical,
  },
};

export const WithIcon: Story = {
  args: {hasIcon: true},
};
