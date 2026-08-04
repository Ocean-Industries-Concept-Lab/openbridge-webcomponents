import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcGaugeValve,
  GaugeValveType,
  GaugeValvePriority,
  GaugeValveStyle,
} from './gauge-valve.js';
import './gauge-valve.js';
import '../../icons/icon-twoway-acuator-general-75.js';
import '../../icons/icon-twoway-acuator-general-closed.js';
import '../../icons/icon-threeway-acuator-generic-inleft-left-75.js';
import {widthDecorator} from '../../storybook-util.js';

type GaugeValveStoryArgs = Partial<ObcGaugeValve> & {
  width?: number;
  height?: number;
};

const meta = {
  title: 'Automation/Instruments/Gauge Valve',
  component: 'obc-gauge-valve',
  tags: ['autodocs', '6.0'],
  decorators: [widthDecorator],
  args: {
    width: 240,
    height: 320,
    type: GaugeValveType.twoWay,
    priority: GaugeValvePriority.regular,
    barStyle: GaugeValveStyle.tint,
    value: 75,
    bottomValue: 0,
    large: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(GaugeValveType),
    },
    priority: {
      control: 'select',
      options: Object.values(GaugeValvePriority),
    },
    barStyle: {
      control: 'select',
      options: Object.values(GaugeValveStyle),
    },
    value: {control: {type: 'range', min: 0, max: 100}},
    bottomValue: {control: {type: 'range', min: 0, max: 100}},
  },
  render: (args) => html`
    <obc-gauge-valve
      .type=${args.type}
      .priority=${args.priority ?? GaugeValvePriority.regular}
      .barStyle=${args.barStyle ?? GaugeValveStyle.tint}
      .value=${args.value}
      .bottomValue=${args.bottomValue}
      .large=${args.large}
      .label=${args.label}
      .unit=${args.unit}
      .tag=${args.tag ?? ''}
      .setpoint=${args.setpoint}
    >
      <obi-twoway-acuator-general-75
        slot="icon"
        usecsscolor
      ></obi-twoway-acuator-general-75>
    </obc-gauge-valve>
  `,
} satisfies Meta<GaugeValveStoryArgs>;

export default meta;
type Story = StoryObj<GaugeValveStoryArgs>;

export const Default: Story = {
  args: {
    tag: '#0001',
  },
};

export const ThreeWay: Story = {
  args: {
    type: GaugeValveType.threeWay,
    value: 75,
    bottomValue: 25,
    setpoint: 80,
    tag: '#0001',
    height: 360,
  },
  render: (args) => html`
    <obc-gauge-valve
      .type=${args.type}
      .priority=${args.priority ?? GaugeValvePriority.regular}
      .barStyle=${args.barStyle ?? GaugeValveStyle.tint}
      .value=${args.value}
      .bottomValue=${args.bottomValue}
      .large=${args.large}
      .label=${args.label}
      .unit=${args.unit}
      .tag=${args.tag ?? ''}
      .setpoint=${args.setpoint}
    >
      <obi-threeway-acuator-generic-inleft-left-75
        slot="icon"
        usecsscolor
      ></obi-threeway-acuator-generic-inleft-left-75>
    </obc-gauge-valve>
  `,
};

export const TwoWayLarge: Story = {
  args: {width: 400, height: 400, large: true, label: 'Label', unit: 'Unit'},
};

export const ThreeWayLarge: Story = {
  ...ThreeWay,
  args: {
    ...ThreeWay.args,
    width: 400,
    height: 400,
    large: true,
    label: 'Label',
    unit: 'Unit',
    setpoint: undefined,
    tag: '',
  },
};

export const WithSetpoint: Story = {
  args: {
    width: 400,
    height: 400,
    large: true,
    label: 'Label',
    unit: 'Unit',
    setpoint: 80,
  },
};

export const Closed: Story = {
  args: {value: 0},
};

export const Enhanced: Story = {
  args: {
    width: 400,
    height: 400,
    large: true,
    label: 'Label',
    unit: 'Unit',
    priority: GaugeValvePriority.enhanced,
    barStyle: GaugeValveStyle.fill,
  },
};

export const Medium: Story = {
  ...ThreeWay,
  args: {
    ...ThreeWay.args,
    width: 400,
    height: 400,
    large: true,
    label: 'Label',
    unit: 'Unit',
    setpoint: undefined,
    tag: '',
    priority: GaugeValvePriority.medium,
    barStyle: GaugeValveStyle.fill,
  },
};

export const OffState: Story = {
  args: {
    width: 400,
    height: 400,
    large: true,
    label: 'Label',
    unit: 'Unit',
    priority: GaugeValvePriority.off,
    setpoint: 50,
  },
  render: (args) => html`
    <obc-gauge-valve
      .type=${args.type}
      .priority=${args.priority ?? GaugeValvePriority.regular}
      .barStyle=${args.barStyle ?? GaugeValveStyle.tint}
      .value=${args.value}
      .bottomValue=${args.bottomValue}
      .large=${args.large}
      .label=${args.label}
      .unit=${args.unit}
      .tag=${args.tag ?? ''}
      .setpoint=${args.setpoint}
    >
      <obi-twoway-acuator-general-closed
        slot="icon"
        usecsscolor
      ></obi-twoway-acuator-general-closed>
    </obc-gauge-valve>
  `,
};

export const TintVsFill: Story = {
  args: {
    barStyle: GaugeValveStyle.fill,
    tag: '#0001',
  },
};
