import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcSelect} from './select';
import './select';

const meta: Meta<typeof ObcSelect> = {
  title: 'Input/Select',
  tags: ['autodocs'],
  component: 'obc-select',
  args: {
    options: [
      {
        value: 'volvo',
        label: 'Volvo',
      },
      {
        value: 'xc90',
        label: 'XC 90',
        level: 2,
      },
      {
        value: 'mercedes',
        label: 'Mercedes',
      },
      {
        value: 'audi',
        label: 'Audi',
      },
    ],
    value: 'volvo',
  },
} satisfies Meta<ObcSelect>;

export default meta;
type Story = StoryObj<ObcSelect>;

export const Primary: Story = {};
export const fullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
