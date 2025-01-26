import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAnalogValve} from './analog-valve';
import './analog-valve';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcAnalogValve> = {
  title: 'Automation/Analog Valve',
  tags: ['autodocs'],
  component: 'obc-analog-valve',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
  },
  argTypes: {
    value: {control: {type: 'range', min: 0, max: 100, step: 1}},
  },
} satisfies Meta<ObcAnalogValve>;

export default meta;
type Story = StoryObj<ObcAnalogValve>;

export const Open: Story = {
  args: {
    open: true,
    value: 20,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    value: 0,
  },
};
