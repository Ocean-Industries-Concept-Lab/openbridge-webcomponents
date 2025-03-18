import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcElevatedCardRadioGroup} from './elevated-card-radio-group.js';
import './elevated-card-radio-group';

const meta: Meta<typeof ObcElevatedCardRadioGroup> = {
  title: 'Button/Elevated card radio button group',
  tags: ['autodocs', '6.0'],
  component: 'obc-elevated-card-radio-group',
  args: {},
} satisfies Meta<ObcElevatedCardRadioGroup>;

export default meta;
type Story = StoryObj<ObcElevatedCardRadioGroup>;

export const NoneSelected: Story = {
  args: {
    options: [
      {label: 'Value 1', value: '1'},
      {label: 'Value 2', value: '2'},
      {label: 'Value 3', value: '3'},
    ],
    name: 'test',
  },
};

export const PreSelected: Story = {
  args: {
    options: [
      {label: 'Value 1', value: '1'},
      {label: 'Value 2', value: '2'},
      {label: 'Value 3', value: '3'},
    ],
    value: '2',
    name: 'test',
  },
};
