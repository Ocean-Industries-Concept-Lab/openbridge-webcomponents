import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcElevatedCardRadio} from './elevated-card-radio.js';
import './elevated-card-radio.js';

const meta: Meta<typeof ObcElevatedCardRadio> = {
  title: 'Button/Elevated card radio button',
  tags: ['autodocs', '6.0'],
  component: 'obc-elevated-card-radio',
  args: {},
} satisfies Meta<ObcElevatedCardRadio>;

export default meta;
type Story = StoryObj<ObcElevatedCardRadio>;

export const Unchecked: Story = {
  args: {
    label: 'Value 1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Value 1',
    checked: true,
  },
};
