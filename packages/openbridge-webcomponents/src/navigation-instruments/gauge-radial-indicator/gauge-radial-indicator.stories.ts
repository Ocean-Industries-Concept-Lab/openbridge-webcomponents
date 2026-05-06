import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import {
  gaugeRadialIndicatorSectors,
  GaugeRadialIndicatorStyle,
  ObcGaugeRadialIndicator,
} from './gauge-radial-indicator.js';
import './gauge-radial-indicator.js';

function indicatorDecorator(story: () => unknown): HTMLTemplateResult {
  return html`<div
    style="display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%; min-height: 280px; padding: 24px"
  >
    ${story()}
  </div>`;
}

const meta: Meta<ObcGaugeRadialIndicator> = {
  title: 'Indicators/Gauge Radial Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-radial-indicator',
  decorators: [indicatorDecorator],
  args: {
    value: 33,
    minValue: 0,
    maxValue: 100,
    sector: 270,
    styleType: GaugeRadialIndicatorStyle.Regular,
    icon: 'placeholder',
    hasIcon: true,
  },
  argTypes: {
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      table: {category: 'Attributes'},
    },
    minValue: {
      control: {type: 'number'},
      table: {category: 'Attributes'},
    },
    maxValue: {
      control: {type: 'number'},
      table: {category: 'Attributes'},
    },
    sector: {
      control: {type: 'select'},
      options: [...gaugeRadialIndicatorSectors],
      table: {category: 'Attributes'},
    },
    styleType: {
      control: {type: 'select'},
      options: Object.values(GaugeRadialIndicatorStyle),
      table: {category: 'Attributes'},
    },
    icon: {
      control: {type: 'text'},
      table: {category: 'Attributes'},
    },
    hasIcon: {
      control: 'boolean',
      table: {category: 'Attributes'},
    },
  },
} satisfies Meta<ObcGaugeRadialIndicator>;

export default meta;
type Story = StoryObj<ObcGaugeRadialIndicator>;

export const Sector270Regular: Story = {
  args: {
    sector: 270,
    styleType: GaugeRadialIndicatorStyle.Regular,
    value: 33,
  },
};

export const Sector180Regular: Story = {
  args: {
    sector: 180,
    styleType: GaugeRadialIndicatorStyle.Regular,
    value: 25,
  },
};

export const Sector270Flat: Story = {
  args: {
    sector: 270,
    styleType: GaugeRadialIndicatorStyle.Flat,
    value: 33,
  },
};

export const Sector180Flat: Story = {
  args: {
    sector: 180,
    styleType: GaugeRadialIndicatorStyle.Flat,
    value: 25,
  },
};

export const MinValue: Story = {
  name: 'Value Min',
  args: {
    value: 0,
    minValue: 0,
    maxValue: 100,
    sector: 270,
    styleType: GaugeRadialIndicatorStyle.Regular,
  },
};

export const MiddleValue: Story = {
  name: 'Value Middle',
  args: {
    value: 50,
    minValue: 0,
    maxValue: 100,
    sector: 270,
    styleType: GaugeRadialIndicatorStyle.Regular,
  },
};

export const MaxValue: Story = {
  name: 'Value Max',
  args: {
    value: 100,
    minValue: 0,
    maxValue: 100,
    sector: 270,
    styleType: GaugeRadialIndicatorStyle.Regular,
  },
};
