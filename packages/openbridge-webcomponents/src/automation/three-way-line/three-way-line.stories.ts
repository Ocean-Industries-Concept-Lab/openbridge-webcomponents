import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcThreeWayLine} from './three-way-line';
import './three-way-line';

const meta: Meta<typeof ObcThreeWayLine> = {
  title: 'Line/Three way line',
  tags: ['autodocs'],
  component: 'obc-three-way-line',
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
} satisfies Meta<ObcThreeWayLine>;

export default meta;
type Story = StoryObj<ObcThreeWayLine>;

export const Primary: Story = {
  args: {},
};
