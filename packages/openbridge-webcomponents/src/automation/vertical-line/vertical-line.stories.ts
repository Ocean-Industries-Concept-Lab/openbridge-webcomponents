import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcVerticalLine} from './vertical-line';
import './vertical-line';
import '../horizontal-line/horizontal-line';
import { crossDecorator } from '../../storybook-util'
import {html} from 'lit';

const meta: Meta<typeof ObcVerticalLine> = {
  title: 'Line/Vertical line',
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
