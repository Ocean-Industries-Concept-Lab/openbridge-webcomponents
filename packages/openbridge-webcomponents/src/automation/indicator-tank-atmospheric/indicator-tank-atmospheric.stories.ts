import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcIndicatorTankAtmospheric,
  IndicatorTankAtmosphericVariant,
  IndicatorTankAtmosphericValue,
} from './indicator-tank-atmospheric.js';
import './indicator-tank-atmospheric.js';
import {IndicatorDirection} from '../indicator-shared/linear-indicator.js';

const meta = {
  title: 'Automation/Indicators/Indicator Tank Atmospheric',
  component: 'obc-indicator-tank-atmospheric',
  tags: ['autodocs', '6.0'],
  args: {
    direction: IndicatorDirection.vertical,
    variant: IndicatorTankAtmosphericVariant.bar,
    value: IndicatorTankAtmosphericValue.regular,
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
      options: Object.values(IndicatorTankAtmosphericVariant),
    },
    value: {
      control: 'radio',
      options: Object.values(IndicatorTankAtmosphericValue),
    },
    level: {control: {type: 'range', min: 0, max: 100}},
  },
  render: (args) => html`
    <obc-indicator-tank-atmospheric
      .direction=${args.direction}
      .variant=${args.variant}
      .value=${args.value}
      .level=${args.level}
      .data=${args.data}
      .hasIcon=${args.hasIcon}
    ></obc-indicator-tank-atmospheric>
  `,
} satisfies Meta<Partial<ObcIndicatorTankAtmospheric>>;

export default meta;
type Story = StoryObj<Partial<ObcIndicatorTankAtmospheric>>;

export const Default: Story = {};

export const BarHorizontal: Story = {
  args: {direction: IndicatorDirection.horizontal},
};

export const TrendVertical: Story = {
  args: {variant: IndicatorTankAtmosphericVariant.trend},
};

export const TrendHorizontal: Story = {
  args: {
    variant: IndicatorTankAtmosphericVariant.trend,
    direction: IndicatorDirection.horizontal,
  },
};

export const Enhanced: Story = {
  args: {value: IndicatorTankAtmosphericValue.enhanced},
};

export const Medium: Story = {
  args: {value: IndicatorTankAtmosphericValue.medium},
};

export const TrendEnhanced: Story = {
  args: {
    variant: IndicatorTankAtmosphericVariant.trend,
    value: IndicatorTankAtmosphericValue.enhanced,
  },
};

export const TrendMedium: Story = {
  args: {
    variant: IndicatorTankAtmosphericVariant.trend,
    value: IndicatorTankAtmosphericValue.medium,
  },
};

export const WithIcon: Story = {
  args: {hasIcon: true},
};
