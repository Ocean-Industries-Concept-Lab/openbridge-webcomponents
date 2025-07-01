import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcVerticalLine} from './vertical-line.js';
import './vertical-line.js';
import '../horizontal-line/horizontal-line.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcVerticalLine> = {
  title: 'Automation/Line/Vertical line',
  tags: ['autodocs'],
  component: 'obc-vertical-line',
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: {type: 'radio'},
    },
  },
  decorators: [crossDecorator],
} satisfies Meta<ObcVerticalLine>;

export default meta;
type Story = StoryObj<ObcVerticalLine>;

export const Primary: Story = {
  args: {
    length: 3,
  },
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: {type: 'radio'},
    },
    lineType: {
      options: ['fluid', 'electric', 'air', 'connector'],
      control: {type: 'radio'},
    },
  },
};
