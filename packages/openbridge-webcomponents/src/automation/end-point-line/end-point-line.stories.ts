import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcEndPointLine} from './end-point-line.js';
import './end-point-line.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcEndPointLine> = {
  title: 'Automation/Line/End point line',
  tags: ['autodocs'],
  component: 'obc-end-point-line',
  decorators: [crossDecorator],
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: {type: 'radio'},
    },
    lineType: {
      options: ['fluid', 'electric', 'air', 'connector'],
      control: {type: 'radio'},
    },
    direction: {
      options: ['top', 'right', 'bottom', 'left'],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcEndPointLine>;

export default meta;
type Story = StoryObj<ObcEndPointLine>;

export const Primary: Story = {
  args: {},
};
