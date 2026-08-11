import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcIndicatorEngine, IndicatorEngineValue} from './indicator-engine.js';
import './indicator-engine.js';
import {IndicatorDirection} from '../indicator-shared/linear-indicator.js';

const meta = {
  title: 'Automation/Indicators/Indicator Engine',
  component: 'obc-indicator-engine',
  tags: ['autodocs', '6.0'],
  args: {
    value: IndicatorEngineValue.static,
    direction: IndicatorDirection.vertical,
  },
  argTypes: {
    value: {
      control: 'radio',
      options: Object.values(IndicatorEngineValue),
    },
    direction: {
      control: 'radio',
      options: Object.values(IndicatorDirection),
    },
  },
  render: (args) => html`
    <obc-indicator-engine
      .value=${args.value}
      .direction=${args.direction}
    ></obc-indicator-engine>
  `,
} satisfies Meta<Partial<ObcIndicatorEngine>>;

export default meta;
type Story = StoryObj<Partial<ObcIndicatorEngine>>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {direction: IndicatorDirection.horizontal},
};

export const Regular: Story = {
  args: {value: IndicatorEngineValue.regular},
};

export const Enhanced: Story = {
  args: {value: IndicatorEngineValue.enhanced},
};
