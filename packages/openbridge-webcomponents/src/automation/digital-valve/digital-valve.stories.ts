import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcDigitalValve} from './digital-valve';
import './digital-valve';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcDigitalValve> = {
  title: 'Automation/Digital Valve',
  tags: ['autodocs'],
  component: 'obc-digital-valve',
  decorators: [crossDecorator],
  args: {
    tag: '0012',
  },
} satisfies Meta<ObcDigitalValve>;

export default meta;
type Story = StoryObj<ObcDigitalValve>;

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};
