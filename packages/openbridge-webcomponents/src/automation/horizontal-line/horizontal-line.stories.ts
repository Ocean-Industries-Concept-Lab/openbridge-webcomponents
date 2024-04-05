import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcHorizontalLine } from './horizontal-line';
import './horizontal-line';

const meta: Meta<typeof ObcHorizontalLine> = {
  title: 'Line/Horizontal line',
  tags: ['autodocs'],
  component: "obc-horizontal-line",
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: { type: 'radio' }
    },
    lineType: {
      options: ['fluid', 'electric', 'air', 'connector'],
      control: { type: 'radio' }
    }
  }
} satisfies Meta<ObcHorizontalLine>;

export default meta;
type Story = StoryObj<ObcHorizontalLine>;

export const Primary: Story = {
  args: {
    length: 3
  },
}