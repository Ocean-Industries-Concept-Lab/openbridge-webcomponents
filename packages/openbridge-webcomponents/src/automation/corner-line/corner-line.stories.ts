import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCornerLine} from './corner-line';
import './corner-line';

const meta: Meta<typeof ObcCornerLine> = {
  title: 'Line/Corner line',
  tags: ['autodocs'],
  component: 'obc-corner-line',
  args: {},
  argTypes: {
    direction: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: {type: 'radio'},
    },
    medium: {
      options: ['normal', 'empty', 'water'],
      control: {type: 'radio'},
    },
    lineType: {
      options: ['fluid', 'electric', 'air', 'connector'],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcCornerLine>;

export default meta;
type Story = StoryObj<ObcCornerLine>;

export const Primary: Story = {
  args: {},
};
