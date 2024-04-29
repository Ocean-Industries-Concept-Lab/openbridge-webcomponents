import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcValveAnalogThreeWayIcon} from './valve-analog-three-way-icon';
import './valve-analog-three-way-icon';

const meta: Meta<typeof ObcValveAnalogThreeWayIcon> = {
  title: 'Automation/Icon/Valve analog three way',
  tags: ['autodocs'],
  component: 'obc-valve-analog-three-way-icon',
  args: {
    horisontal: false,
  },
  argTypes: {
    horisontal: {
      control: {type: 'boolean'},
    },
  }
} satisfies Meta<ObcValveAnalogThreeWayIcon>;

export default meta;
type Story = StoryObj<ObcValveAnalogThreeWayIcon>;

export const Open: Story = {
  args: {
    value: 100,
    value2: 0,
    closed: false,
  },
};

export const Closed: Story = {
  args: {
    value: 0,
    value2: 0,
    closed: true,
  },
};

export const HalfOpen: Story = {
  args: {
    value: 50,
    value2: 50,
    closed: false,
  },
};

export const OnePartOpen: Story = {
  args: {
    value: 50,
    value2: 0,
    closed: false,
  },
};

export const OnePartOpenHorizontal: Story = {
  args: {
    value: 50,
    value2: 0,
    closed: false,
    horisontal: true,
  },
};

export const NearClosed: Story = {
  args: {
    value: 0,
    value2: 100,
    closed: false,
  },
};
