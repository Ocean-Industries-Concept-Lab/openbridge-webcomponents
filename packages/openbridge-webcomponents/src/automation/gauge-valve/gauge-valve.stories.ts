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
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';

type GaugeValveStoryArgs = Partial<ObcGaugeValve> & {
  width?: number;
  height?: number;
  lockFaceDiameter?: boolean;
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
    hasLabelStack: true,
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
      .faceDiameter=${args.faceDiameter}
      .hasLabelStack=${args.hasLabelStack ?? true}
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
      .faceDiameter=${args.faceDiameter}
      .hasLabelStack=${args.hasLabelStack ?? true}
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
      .faceDiameter=${args.faceDiameter}
      .hasLabelStack=${args.hasLabelStack ?? true}
    >
      <obi-twoway-acuator-general-closed
        slot="icon"
        usecsscolor
      ></obi-twoway-acuator-general-closed>
    </obc-gauge-valve>
  `,
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
      .faceDiameter=${args.faceDiameter}
      .hasLabelStack=${args.hasLabelStack ?? true}
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

/**
 * Interactive sizing playground: size the dashed box with the width/height
 * sliders or drag its bottom-right corner. The first valve is pinned to a
 * fixed intrinsic size by the `faceDiameter` control while the large valves
 * adapt to the remaining flex space. Enable `lockFaceDiameter` to pin all
 * three to the same ring circumference — the same behavior as every other
 * radial instrument (see the *Sizing Playground* stories under
 * Instruments/Gauge Radial etc.).
 */
export const SizingPlayground: Story = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    width: 760,
    height: 320,
    faceDiameter: 180,
    lockFaceDiameter: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 240, max: 1200, step: 10}},
    height: {control: {type: 'range', min: 160, max: 800, step: 10}},
    faceDiameter: {control: {type: 'range', min: 60, max: 400, step: 10}},
    lockFaceDiameter: {
      control: 'boolean',
      description:
        'Apply faceDiameter to every instance (equal circumference) instead of only the first.',
    },
  },
  render: (args) => {
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Size the dashed box with the width/height sliders (or drag its corner). The first valve is pinned by the faceDiameter control; the large valves adapt to the remaining flex space. Enable lockFaceDiameter to pin all three to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${playgroundColumn(
            caption(0, 'compact two-way'),
            html`
              <obc-gauge-valve
                .value=${75}
                .tag=${'#0001'}
                .faceDiameter=${fd(0)}
              >
                <obi-twoway-acuator-general-75
                  slot="icon"
                  usecsscolor
                ></obi-twoway-acuator-general-75>
              </obc-gauge-valve>
            `,
            {pinned: fd(0) !== undefined}
          )}
          ${playgroundColumn(
            caption(1, 'large two-way'),
            html`
              <obc-gauge-valve
                .value=${75}
                .large=${true}
                .label=${'Label'}
                .unit=${'Unit'}
                .faceDiameter=${fd(1)}
              >
                <obi-twoway-acuator-general-75
                  slot="icon"
                  usecsscolor
                ></obi-twoway-acuator-general-75>
              </obc-gauge-valve>
            `,
            {pinned: fd(1) !== undefined}
          )}
          ${playgroundColumn(
            caption(2, 'large three-way'),
            html`
              <obc-gauge-valve
                .type=${GaugeValveType.threeWay}
                .value=${75}
                .bottomValue=${25}
                .large=${true}
                .label=${'Label'}
                .unit=${'Unit'}
                .faceDiameter=${fd(2)}
              >
                <obi-threeway-acuator-generic-inleft-left-75
                  slot="icon"
                  usecsscolor
                ></obi-threeway-acuator-generic-inleft-left-75>
              </obc-gauge-valve>
            `,
            {pinned: fd(2) !== undefined}
          )}
        `,
        {width: args.width, height: args.height}
      )}
    `;
  },
};
