import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  CompassDirection,
  HeadingPriorityElement,
  ObcHeading,
} from './heading.js';
import './heading.js';
import {html} from 'lit';
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcHeading> = {
  title: 'Instruments/Heading',
  tags: ['6.0'],
  component: 'obc-heading',
  args: {
    width: 512,
    heading: 311,
    courseOverGround: 338,
    showLabels: true,
    headingAdvices: [
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        hinted: false,
      },
    ],
    headingSetpoint: 311,
    direction: CompassDirection.NorthUp,
    touching: false,
    priorityElements: [HeadingPriorityElement.hdg],
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
      description:
        'Pins the outer-ring diameter in px (fixed intrinsic size, equal circumference across instruments). Clear to return to fill-the-container sizing.',
    },
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    headingSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
    direction: {
      control: {type: 'select'},
      options: Object.values(CompassDirection),
    },
    touching: {control: 'boolean'},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(HeadingPriorityElement),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcHeading>;

export default meta;
type Story = StoryObj<ObcHeading>;

export const Primary: Story = {
  args: {
    headingSetpoint: undefined,
  },
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
    headingSetpoint: 311,
  },
};

type SizingPlaygroundArgs = Partial<ObcHeading> & {
  lockFaceDiameter?: boolean;
};

/**
 * Interactive sizing playground: drag the dashed box's bottom-right corner to
 * resize it. The first instrument is pinned to a fixed intrinsic size by the
 * `faceDiameter` control, while the second adapts to the remaining flex
 * space, reserving room for the NSWE labels and north arrow adaptively
 * (issue #1021). Enable `lockFaceDiameter` to pin both to the same
 * circumference. Related: *Sizing Playground* stories under Building
 * Blocks/Watch, Building Blocks/Instrument Radial and Instruments/Gauge
 * Radial.
 */
export const SizingPlayground: StoryObj<SizingPlaygroundArgs> = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 240,
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
      {label: 'heading A', heading: 311},
      {label: 'heading B', heading: 45},
    ];
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Drag the bottom-right corner of the dashed box to resize it. The first instrument is pinned by the faceDiameter control; the second adapts to the remaining flex space. Enable lockFaceDiameter to pin both to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${instances.map((g, index) =>
            playgroundColumn(
              caption(index, g.label),
              html`
                <obc-heading
                  .heading=${g.heading}
                  .courseOverGround=${g.heading + 27}
                  .showLabels=${true}
                  .faceDiameter=${fd(index)}
                ></obc-heading>
              `,
              {pinned: fd(index) !== undefined}
            )
          )}
        `,
        {width: 680, height: 400}
      )}
    `;
  },
};
