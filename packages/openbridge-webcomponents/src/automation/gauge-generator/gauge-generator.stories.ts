import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {GaugeGeneratorType, ObcGaugeGenerator} from './gauge-generator.js';
import './gauge-generator.js';
import {widthDecorator} from '../../storybook-util.js';

type GaugeGeneratorStoryArgs = Partial<ObcGaugeGenerator> & {
  width?: number;
  height?: number;
};

const meta = {
  title: 'Automation/Gauge Generator',
  tags: ['autodocs', 'alpha', 'skip-test'],
  component: 'obc-gauge-generator',
  decorators: [widthDecorator],
  args: {
    width: 240,
    height: 320,
    large: false,
    value: 65,
    setpoint: 65,
    label: 'Load',
    unit: '%',
    name: 'DG 1',
    tag: '#0001',
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    height: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    type: {
      control: 'select',
      options: Object.values(GaugeGeneratorType),
    },
    value: {control: 'number'},
    secondaryValue: {control: 'number'},
    setpoint: {control: 'number'},
    large: {control: 'boolean'},
    hasLabelStack: {control: 'boolean'},
    hasReadout: {control: 'boolean'},
    label: {control: 'text'},
    unit: {control: 'text'},
    secondaryLabel: {control: 'text'},
    secondaryUnit: {control: 'text'},
    name: {control: 'text'},
    tag: {control: 'text'},
  },
  render: (args: GaugeGeneratorStoryArgs) => html`
    <obc-gauge-generator
      .type=${args.type ?? GaugeGeneratorType.regular}
      .value=${args.value ?? 0}
      .secondaryValue=${args.secondaryValue}
      .setpoint=${args.setpoint}
      .hasReadout=${args.hasReadout ?? true}
      .label=${args.label ?? ''}
      .unit=${args.unit ?? ''}
      .secondaryLabel=${args.secondaryLabel ?? ''}
      .secondaryUnit=${args.secondaryUnit ?? ''}
      .name=${args.name ?? ''}
      .large=${args.large ?? false}
      .hasLabelStack=${args.hasLabelStack ?? true}
      .tag=${args.tag ?? ''}
    ></obc-gauge-generator>
  `,
} satisfies Meta<GaugeGeneratorStoryArgs>;

export default meta;
type Story = StoryObj<GaugeGeneratorStoryArgs>;

export const Default: Story = {};

export const Double: Story = {
  args: {
    type: GaugeGeneratorType.double,
    secondaryValue: 45,
    secondaryUnit: '%',
  },
};

export const LargeRegular: Story = {
  args: {
    width: 400,
    height: 400,
    large: true,
  },
};

export const LargeDouble: Story = {
  args: {
    width: 400,
    height: 400,
    large: true,
    type: GaugeGeneratorType.double,
    secondaryValue: 45,
    secondaryLabel: 'Charge',
    secondaryUnit: '%',
  },
};
