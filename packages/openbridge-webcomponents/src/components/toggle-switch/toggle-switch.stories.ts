import type { Meta, StoryObj } from '@storybook/web-components';
import { ToggleSwitch } from './toggle-switch';
import './toggle-switch';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ToggleSwitch> = {
  title: 'Control/Toggle Switch',
  tags: ['autodocs'],
  component: "obc-toggle-switch",
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<ToggleSwitch>;

export default meta;
type Story = StoryObj<ToggleSwitch>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Label'
  },
};