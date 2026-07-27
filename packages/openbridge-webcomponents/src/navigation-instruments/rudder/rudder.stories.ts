import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRudder, ObcRudderVariant} from './rudder.js';
import './rudder.js';
import {html} from 'lit';
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';
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

type SizingPlaygroundArgs = Partial<ObcRudder> & {
  lockFaceDiameter?: boolean;
};

/**
 * Interactive sizing playground: drag the dashed box's bottom-right corner to
 * resize it. The first rudder is pinned to a fixed intrinsic size by the
 * `faceDiameter` control (its box is wider than tall, matching the 40% top
 * clip), the second adapts to the remaining flex space, and the third is a
 * zoomed narrow arc (`zoomToFitArc`) showing that the reserve composes with
 * zoom (issue #1021). Enable `lockFaceDiameter` to pin all three to the same
 * circumference. Related: *Sizing Playground* stories under Building
 * Blocks/Watch, Building Blocks/Instrument Radial and Instruments/Gauge
 * Radial.
 */
export const SizingPlayground: StoryObj<SizingPlaygroundArgs> = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 260,
    lockFaceDiameter: false,
  },
  argTypes: {
    lockFaceDiameter: {
      control: 'boolean',
      description:
        'Apply faceDiameter to every instance (equal circumference) instead of only the first.',
    },
  },
  render: (args) => {
    const instances = [
      {label: 'half circle', maxAngle: 45, zoom: false},
      {label: 'half circle', maxAngle: 45, zoom: false},
      {label: 'zoomed ±20°', maxAngle: 20, zoom: true},
    ];
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Drag the bottom-right corner of the dashed box to resize it. The first rudder is pinned by the faceDiameter control; the second and the zoomed narrow arc adapt to the remaining flex space. Enable lockFaceDiameter to pin all three to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${instances.map((g, index) =>
            playgroundColumn(
              caption(index, g.label),
              html`
                <obc-rudder
                  .angle=${15}
                  .setpoint=${30}
                  .maxAngle=${g.maxAngle}
                  .zoomToFitArc=${g.zoom}
                  .showLabels=${true}
                  .faceDiameter=${fd(index)}
                ></obc-rudder>
              `,
              {pinned: fd(index) !== undefined}
            )
          )}
        `,
        {width: 760, height: 280}
      )}
    `;
  },
};
