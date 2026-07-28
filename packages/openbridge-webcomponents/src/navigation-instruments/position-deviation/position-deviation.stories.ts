import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcPositionDeviation,
  PositionDeviationOrientation,
  PositionDeviationPriority,
} from './position-deviation.js';
import './position-deviation.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcPositionDeviation> = {
  title: 'Instruments/Position Deviation',
  tags: ['autodocs', 'wip'],
  component: 'obc-position-deviation',
  args: {
    width: 400,
    orientation: PositionDeviationOrientation.northUp,
    priority: PositionDeviationPriority.enhanced,
    heading: 20,
    deviation: 11.3,
    setpointBearing: 45,
    cautionLimit: 15.5,
    alarmLimit: 20,
    hasAlarmLimit: true,
    showLabels: true,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    orientation: {
      control: 'select',
      options: Object.values(PositionDeviationOrientation),
    },
    priority: {
      control: 'select',
      options: Object.values(PositionDeviationPriority),
    },
    heading: {control: {type: 'range', min: 0, max: 360, step: 0.1}},
    deviation: {control: {type: 'range', min: 0, max: 30, step: 0.1}},
    setpointBearing: {control: {type: 'range', min: 0, max: 360, step: 0.1}},
    cautionLimit: {control: {type: 'range', min: 0, max: 30, step: 0.5}},
    alarmLimit: {control: {type: 'range', min: 0, max: 30, step: 0.5}},
    hasAlarmLimit: {control: 'boolean'},
    showLabels: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPositionDeviation>;

export default meta;
type Story = StoryObj<ObcPositionDeviation>;

export const NorthUpEnhanced: Story = {
  args: {},
};

export const NorthUpRegular: Story = {
  args: {
    priority: PositionDeviationPriority.regular,
  },
};

export const NorthUpCaution: Story = {
  args: {
    priority: PositionDeviationPriority.caution,
    deviation: 16.8,
  },
};

export const NorthUpAlarm: Story = {
  args: {
    priority: PositionDeviationPriority.alarm,
    deviation: 21.5,
  },
};

export const HeadingUpEnhanced: Story = {
  args: {
    orientation: PositionDeviationOrientation.headingUp,
    heading: 30,
  },
};

export const HeadingUpRegular: Story = {
  args: {
    ...HeadingUpEnhanced.args,
    priority: PositionDeviationPriority.regular,
  },
};

export const HeadingUpCaution: Story = {
  args: {
    ...HeadingUpEnhanced.args,
    priority: PositionDeviationPriority.caution,
    deviation: 16.8,
  },
};

export const HeadingUpAlarm: Story = {
  args: {
    ...HeadingUpEnhanced.args,
    priority: PositionDeviationPriority.alarm,
    deviation: 21.5,
  },
};

export const WithoutAlarmLimit: Story = {
  args: {
    hasAlarmLimit: false,
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
  },
};
