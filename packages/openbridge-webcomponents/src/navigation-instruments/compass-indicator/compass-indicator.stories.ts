import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  CompassIndicatorDirection,
  CompassIndicatorType,
  ObcCompassIndicator,
} from './compass-indicator.js';
import './compass-indicator.js';

const meta: Meta<ObcCompassIndicator> = {
  title: 'Indicators/Compass Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass-indicator',
  parameters: {
    layout: 'centered',
  },
  render: (args) => html`
    <obc-compass-indicator
      .angle=${args.angle}
      .type=${args.type}
      .direction=${args.direction}
      .northUp=${args.northUp}
    ></obc-compass-indicator>
  `,
  args: {
    angle: 315,
    type: CompassIndicatorType.Regular,
    direction: CompassIndicatorDirection.Heading,
    northUp: true,
  },
  argTypes: {
    angle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    type: {
      control: 'select',
      options: Object.values(CompassIndicatorType),
    },
    direction: {
      control: 'select',
      options: Object.values(CompassIndicatorDirection),
    },
    northUp: {
      control: 'boolean',
      description:
        'When true the compass face stays north-up and the arrow rotates; when false the arrow stays vertical and the face rotates (heading-up / course-up).',
    },
  },
} satisfies Meta<ObcCompassIndicator>;

export default meta;
type Story = StoryObj<ObcCompassIndicator>;

export const Default: Story = {
  args: {},
};

export const RegularHeading: Story = {
  args: {
    type: CompassIndicatorType.Regular,
    direction: CompassIndicatorDirection.Heading,
    angle: 45,
  },
};

export const RegularCourse: Story = {
  args: {
    type: CompassIndicatorType.Regular,
    direction: CompassIndicatorDirection.Course,
    angle: 45,
  },
};

export const RegularNorth: Story = {
  args: {
    type: CompassIndicatorType.Regular,
    direction: CompassIndicatorDirection.North,
    angle: 315,
  },
};

export const LabeledHeading: Story = {
  args: {
    type: CompassIndicatorType.Labeled,
    direction: CompassIndicatorDirection.Heading,
    angle: 0,
  },
};

export const LabeledCourse: Story = {
  args: {
    type: CompassIndicatorType.Labeled,
    direction: CompassIndicatorDirection.Course,
    angle: 0,
  },
};

export const LabeledNorth: Story = {
  args: {
    type: CompassIndicatorType.Labeled,
    direction: CompassIndicatorDirection.North,
    angle: 315,
  },
};

export const RegularHeadingHeadingUp: Story = {
  args: {
    type: CompassIndicatorType.Regular,
    direction: CompassIndicatorDirection.Heading,
    angle: 45,
    northUp: false,
  },
};

export const RegularCourseCourseUp: Story = {
  args: {
    type: CompassIndicatorType.Regular,
    direction: CompassIndicatorDirection.Course,
    angle: 45,
    northUp: false,
  },
};
