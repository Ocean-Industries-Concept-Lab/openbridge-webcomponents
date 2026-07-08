import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRudder, ObcRudderVariant} from './rudder.js';
import './rudder.js';
import {html} from 'lit';
import {resizableStoryBox, widthDecorator} from '../../storybook-util.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {InstrumentState, Priority} from '../types.js';
const meta: Meta<typeof ObcRudder> = {
  title: 'Instruments/Rudder',
  tags: ['autodocs', '6.0'],
  component: 'obc-rudder',
  args: {
    width: 512,
    angle: 30,
    setpoint: 45,
    maxAngle: 90,
    touching: false,
    priority: Priority.enhanced,
    tickmarkStyle: TickmarkStyle.regular,
    zoomToFitArc: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
      description:
        'Pins the outer-ring diameter in px (fixed intrinsic size, equal circumference across instruments). Clear to return to fill-the-container sizing.',
    },
    angle: {control: {type: 'range', min: -90, max: 90, step: 1}},
    maxAngle: {control: {type: 'range', min: 2, max: 90, step: 1}},
    setpoint: {control: {type: 'range', min: -90, max: 90, step: 1}},
    state: {control: {type: 'select'}, options: Object.values(InstrumentState)},
    touching: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    zoomToFitArc: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRudder>;

export default meta;
type Story = StoryObj<ObcRudder>;

export const Primary: Story = {
  args: {},
};

export const Needle: Story = {
  args: {
    variant: ObcRudderVariant.Needle,
  },
};

export const ZoomedIn: Story = {
  args: {
    maxAngle: 45,
    zoomToFitArc: true,
  },
};

export const ZoomedInNeedle: Story = {
  args: {
    maxAngle: 45,
    variant: ObcRudderVariant.Needle,
    zoomToFitArc: true,
  },
};

export const ZoomedInNarrow: Story = {
  args: {
    maxAngle: 20,
    zoomToFitArc: true,
    showLabels: true,
  },
};

/**
 * Interactive sizing playground: drag the container's bottom-right corner and
 * tweak the `faceDiameter` control. With `faceDiameter` set the half-circle
 * gauge keeps a fixed intrinsic size — its box is wider than tall, matching
 * the 40% top clip — and shares ring circumference with any other radial
 * instrument using the same value; clear it and it fills the container,
 * reserving room for the angle labels adaptively (issue #1021). Related:
 * *Sizing Playground* stories under Building Blocks/Watch, Building
 * Blocks/Instrument Radial and Instruments/Gauge Radial.
 */
export const SizingPlayground: Story = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 300,
  },
  render: (args) =>
    resizableStoryBox(
      html`
        <div style="flex: 1; min-width: 0; height: 100%;">
          <obc-rudder
            .angle=${15}
            .setpoint=${30}
            .maxAngle=${45}
            .showLabels=${true}
            .faceDiameter=${args.faceDiameter}
          ></obc-rudder>
        </div>
      `,
      {width: 560, height: 280}
    ),
};
