import type {Meta, StoryObj} from '@storybook/web-components';
import {
  CompassIndicatorArrow,
  ObcCompassIndicator,
} from './compass-indicator.js';
import './compass-indicator.js';

const meta: Meta<typeof ObcCompassIndicator> = {
  title: 'Navigation Instruments/Compass Indicator',
  tags: ['6.0'],
  component: 'obc-compass-indicator',
  args: {
    angle: 45,
  },
  argTypes: {
    angle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
  },
} satisfies Meta<ObcCompassIndicator>;

export default meta;
type Story = StoryObj<ObcCompassIndicator>;

export const Heading: Story = {
  args: {
    arrow: CompassIndicatorArrow.Heading,
  },
};

export const HeadingNorthUp: Story = {
  args: {
    arrow: CompassIndicatorArrow.Heading,
    northUp: true,
  },
};

export const Course: Story = {
  args: {
    arrow: CompassIndicatorArrow.Course,
  },
};

export const CourseNorthUp: Story = {
  args: {
    arrow: CompassIndicatorArrow.Course,
    northUp: true,
  },
};
