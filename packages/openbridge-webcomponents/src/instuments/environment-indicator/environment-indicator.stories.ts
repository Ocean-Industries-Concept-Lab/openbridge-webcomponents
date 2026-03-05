import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  EnvironmentIndicatorArrow,
  ObcEnvironmentIndicator,
} from './environment-indicator.js';
import './environment-indicator.js';

const meta: Meta<typeof ObcEnvironmentIndicator> = {
  title: 'Indicators/Environment Indicator',
  tags: ['6.0'],
  component: 'obc-environment-indicator',
  args: {
    angle: 45,
  },
  argTypes: {
    angle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
  },
} satisfies Meta<ObcEnvironmentIndicator>;

export default meta;
type Story = StoryObj<ObcEnvironmentIndicator>;

export const Heading: Story = {
  args: {
    arrow: EnvironmentIndicatorArrow.Heading,
  },
};

export const HeadingNorthUp: Story = {
  args: {
    arrow: EnvironmentIndicatorArrow.Heading,
    northUp: true,
  },
};

export const Course: Story = {
  args: {
    arrow: EnvironmentIndicatorArrow.Course,
  },
};

export const CourseNorthUp: Story = {
  args: {
    arrow: EnvironmentIndicatorArrow.Course,
    northUp: true,
  },
};
