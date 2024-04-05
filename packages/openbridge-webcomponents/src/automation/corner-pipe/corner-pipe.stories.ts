import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcCornerPipe } from './corner-pipe';
import './corner-pipe';
import { html } from 'lit';

const meta: Meta<typeof ObcCornerPipe> = {
  title: 'Pipe/Corner pipe',
  tags: ['autodocs'],
  component: "obc-corner-pipe",
  args: {
  },
  argTypes: {
    direction: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'radio' }
    },
    medium: {
      options: ['normal', 'empty', 'water'],
      control: { type: 'radio' }
    }
  }
} satisfies Meta<ObcCornerPipe>;

export default meta;
type Story = StoryObj<ObcCornerPipe>;

export const Primary: Story = {
  args: {
  },
}