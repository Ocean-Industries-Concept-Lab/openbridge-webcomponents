import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  GaugeMotorsAndPumpsType,
  ObcGaugeMotorsAndPumps,
} from './gauge-motors-and-pumps.js';
import './gauge-motors-and-pumps.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import {widthDecorator} from '../../storybook-util.js';

type GaugeMotorsAndPumpsStoryArgs = Partial<ObcGaugeMotorsAndPumps> & {
  width?: number;
  height?: number;
};

const meta = {
  title: 'Automation/Gauge Motors and Pumps',
  tags: ['autodocs', 'wip', 'skip-test'],
  component: 'obc-gauge-motors-and-pumps',
  decorators: [widthDecorator],
  args: {
    width: 400,
    large: true,
    value: 65,
    setpoint: 65,
    showLabels: true,
    label: 'Speed',
    unit: '%',
    name: 'Pump 1',
    tag: '#0001',
    advices: [
      {minValue: 90, maxValue: 100, type: AdviceType.caution, hinted: false},
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    height: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {
      control: 'select',
      options: Object.values(GaugeMotorsAndPumpsType),
    },
    value: {control: 'number'},
    secondaryValue: {control: 'number'},
    minValue: {control: 'number'},
    maxValue: {control: 'number'},
    setpoint: {control: 'number'},
    showLabels: {control: 'boolean'},
    large: {control: 'boolean'},
    hasLabelStack: {control: 'boolean'},
    hasReadout: {control: 'boolean'},
    label: {control: 'text'},
    unit: {control: 'text'},
    secondaryLabel: {control: 'text'},
    secondaryUnit: {control: 'text'},
    name: {control: 'text'},
    tag: {control: 'text'},
    advices: {control: 'object'},
  },
  render: (args: GaugeMotorsAndPumpsStoryArgs) => html`
    <obc-gauge-motors-and-pumps
      .type=${args.type ?? GaugeMotorsAndPumpsType.regular}
      .value=${args.value ?? 0}
      .minValue=${args.minValue ?? 0}
      .maxValue=${args.maxValue ?? 100}
      .secondaryValue=${args.secondaryValue}
      .setpoint=${args.setpoint}
      .showLabels=${args.showLabels ?? false}
      .hasReadout=${args.hasReadout ?? true}
      .label=${args.label ?? ''}
      .unit=${args.unit ?? ''}
      .secondaryLabel=${args.secondaryLabel ?? ''}
      .secondaryUnit=${args.secondaryUnit ?? ''}
      .name=${args.name ?? ''}
      .advices=${args.advices ?? []}
      .large=${args.large ?? false}
      .hasLabelStack=${args.hasLabelStack ?? true}
      .tag=${args.tag ?? ''}
    ></obc-gauge-motors-and-pumps>
  `,
} satisfies Meta<GaugeMotorsAndPumpsStoryArgs>;

export default meta;
type Story = StoryObj<GaugeMotorsAndPumpsStoryArgs>;

export const Default: Story = {};

export const Negative: Story = {
  args: {
    type: GaugeMotorsAndPumpsType.negative,
    minValue: -100,
    maxValue: 100,
    value: 30,
    setpoint: 30,
    advices: [],
  },
};

export const Double: Story = {
  args: {
    type: GaugeMotorsAndPumpsType.double,
    secondaryValue: 45,
    secondaryLabel: 'Load',
    secondaryUnit: '%',
  },
};

export const Compact: Story = {
  args: {
    width: 240,
    height: 320,
    large: false,
  },
};

export const CompactDouble: Story = {
  args: {
    width: 240,
    height: 320,
    large: false,
    type: GaugeMotorsAndPumpsType.double,
    secondaryValue: 45,
    secondaryUnit: '%',
  },
};
