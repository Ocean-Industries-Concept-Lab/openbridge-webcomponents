import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcLineOverlap} from './line-overlap';
import './line-overlap';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcLineOverlap> = {
  title: 'Line/Overlap',
  tags: ['autodocs'],
  component: 'obc-line-overlap',
  args: {},
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
} satisfies Meta<ObcLineOverlap>;

export default meta;
type Story = StoryObj<ObcLineOverlap>;

export const Primary: Story = {
  args: {},
};
