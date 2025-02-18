import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcElevatedCardRadio } from './elevated-card-radio';
import './elevated-card-radio';

const meta: Meta<typeof ObcElevatedCardRadio> = {
  title: 'Button/Elevated card radio button',
  tags: ['autodocs', '6.0'],
  component: "obc-elevated-card-radio",
  args: {
  },
} satisfies Meta<ObcElevatedCardRadio>;

export default meta;
type Story = StoryObj<ObcElevatedCardRadio>;

export const Unchecked: Story = {
  args: {
    label: 'Value 1'
  }
}

export const Checked: Story = {
  args: {
    label: 'Value 1',
    checked: true
  }
}