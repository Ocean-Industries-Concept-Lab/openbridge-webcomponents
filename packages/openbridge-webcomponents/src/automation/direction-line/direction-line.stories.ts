import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcDirectionLine} from './direction-line';
import './direction-line';
import { crossDecorator } from '../../storybook-util';

const meta: Meta<typeof ObcDirectionLine> = {
  title: 'Line/Direction',
  tags: ['autodocs'],
  component: 'obc-direction-line',
  decorators: [crossDecorator],
  args: {},
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
} satisfies Meta<ObcDirectionLine>;

export default meta;
type Story = StoryObj<ObcDirectionLine>;

export const Primary: Story = {
  args: {},
};
