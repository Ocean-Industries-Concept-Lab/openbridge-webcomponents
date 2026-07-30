import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcIndicatorGenerator,
  IndicatorGeneratorVariant,
  IndicatorGeneratorValue,
} from './indicator-generator.js';
import './indicator-generator.js';

const meta = {
  title: 'Automation/Indicators/Indicator Generator',
  component: 'obc-indicator-generator',
  tags: ['autodocs', '6.0'],
  args: {
    variant: IndicatorGeneratorVariant.button,
    value: IndicatorGeneratorValue.off,
    level: 65,
    secondaryLevel: 75,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(IndicatorGeneratorVariant),
    },
    value: {
      control: 'radio',
      options: Object.values(IndicatorGeneratorValue),
    },
    level: {control: {type: 'range', min: 0, max: 100}},
    secondaryLevel: {control: {type: 'range', min: 0, max: 100}},
  },
  render: (args) => html`
    <obc-indicator-generator
      .variant=${args.variant}
      .value=${args.value}
      .level=${args.level}
      .secondaryLevel=${args.secondaryLevel}
    ></obc-indicator-generator>
  `,
} satisfies Meta<Partial<ObcIndicatorGenerator>>;

export default meta;
type Story = StoryObj<Partial<ObcIndicatorGenerator>>;

export const Default: Story = {};

export const ButtonRegular: Story = {
  args: {value: IndicatorGeneratorValue.regular},
};

export const ButtonEnhanced: Story = {
  args: {value: IndicatorGeneratorValue.enhanced},
};

export const ButtonCategorical: Story = {
  args: {value: IndicatorGeneratorValue.categorical},
};

export const BarRegular: Story = {
  args: {
    variant: IndicatorGeneratorVariant.bar,
    value: IndicatorGeneratorValue.regular,
  },
};

export const BarEnhanced: Story = {
  args: {
    variant: IndicatorGeneratorVariant.bar,
    value: IndicatorGeneratorValue.enhanced,
  },
};

export const BarCategorical: Story = {
  args: {
    variant: IndicatorGeneratorVariant.bar,
    value: IndicatorGeneratorValue.categorical,
  },
};

export const DoubleBar: Story = {
  args: {
    variant: IndicatorGeneratorVariant.doubleBar,
    value: IndicatorGeneratorValue.regular,
  },
};
