import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcEndPointLine} from './end-point-line';
import './end-point-line';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcEndPointLine> = {
  title: 'Line/End point line',
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
