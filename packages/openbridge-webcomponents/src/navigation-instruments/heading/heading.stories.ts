import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  CompassDirection,
  HeadingPriorityElement,
  ObcHeading,
} from './heading.js';
import './heading.js';
import {html} from 'lit';
import {resizableStoryBox, widthDecorator} from '../../storybook-util.js';
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

/**
 * Interactive sizing playground: drag the container's bottom-right corner and
 * tweak the `faceDiameter` control. With `faceDiameter` set the instrument
 * keeps a fixed intrinsic size (equal circumference with any other radial
 * instrument sharing the value); clear it and it fills the container while
 * reserving room for the NSWE labels and north arrow adaptively
 * (issue #1021). Related: *Sizing Playground* stories under Building
 * Blocks/Watch, Building Blocks/Instrument Radial and Instruments/Gauge
 * Radial.
 */
export const SizingPlayground: Story = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 260,
  },
  render: (args) =>
    resizableStoryBox(
      html`
        <div style="flex: 1; min-width: 0; height: 100%;">
          <obc-heading
            .heading=${311}
            .courseOverGround=${338}
            .showLabels=${true}
            .faceDiameter=${args.faceDiameter}
          ></obc-heading>
        </div>
      `,
      {width: 480, height: 400}
    ),
};
