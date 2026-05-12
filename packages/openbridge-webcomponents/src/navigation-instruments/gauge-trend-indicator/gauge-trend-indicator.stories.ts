import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import {
  ObcGaugeTrendIndicator,
  ObcGaugeTrendIndicatorType,
} from './gauge-trend-indicator.js';
import './gauge-trend-indicator.js';

const GAUGE_TREND_INDICATOR_LAYOUT_PX = 48;

function gaugeTrendIndicatorDecorator(
  story: () => unknown
): HTMLTemplateResult {
  return html`<div
    style="width: ${GAUGE_TREND_INDICATOR_LAYOUT_PX}px; height: ${GAUGE_TREND_INDICATOR_LAYOUT_PX}px; box-sizing: border-box;"
  >
    ${story()}
  </div>`;
}

const SAMPLE_DATA = [
  45, 52, 48, 55, 62, 58, 52, 40, 32, 37, 55, 68, 52, 48, 42, 38, 35, 32, 28,
  30, 35, 40, 45, 50, 48, 48, 38, 35, 40, 45, 50,
];

const meta = {
  title: 'Indicators/Gauge Trend Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-trend-indicator',
  parameters: {
    layout: 'centered',
  },
  decorators: [gaugeTrendIndicatorDecorator],
  args: {
    type: ObcGaugeTrendIndicatorType.Fill,
    data: SAMPLE_DATA,
    minValue: 0,
    maxValue: 100,
    value: 50,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcGaugeTrendIndicatorType),
    },
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
  },
  render: (args) => html`
    <obc-gauge-trend-indicator
      .type=${args.type}
      .data=${args.data}
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .chartMinValue=${args.chartMinValue}
      .chartMaxValue=${args.chartMaxValue}
      .value=${args.value}
    ></obc-gauge-trend-indicator>
  `,
} satisfies Meta<ObcGaugeTrendIndicator>;

export default meta;
type Story = StoryObj<ObcGaugeTrendIndicator>;

export const Fill: Story = {
  args: {
    type: ObcGaugeTrendIndicatorType.Fill,
  },
};

export const Point: Story = {
  args: {
    type: ObcGaugeTrendIndicatorType.Point,
  },
};
