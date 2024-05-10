import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcLineCross} from './line-cross';
import './line-cross';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcLineCross> = {
  title: 'Line/Cross',
  tags: ['autodocs'],
  component: 'obc-line-cross',
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
  },
} satisfies Meta<ObcLineCross>;

export default meta;
type Story = StoryObj<ObcLineCross>;

export const Primary: Story = {
  args: {},
};
