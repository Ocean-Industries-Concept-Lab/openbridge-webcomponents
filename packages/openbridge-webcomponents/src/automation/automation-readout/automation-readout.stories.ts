import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcAutomationReadout } from './automation-readout';
import './automation-readout';

const meta: Meta<typeof ObcAutomationReadout> = {
  title: 'Automation/Readout',
  tags: ['autodocs'],
  component: "obc-automation-readout",
  args: {
  },
} satisfies Meta<ObcAutomationReadout>;

export default meta;
type Story = StoryObj<ObcAutomationReadout>;

export const Temperature: Story = {
  args: {
    value: 25,
    unit: '°C',
    numberOfDigits: 3,
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: -100,
        max: 100,
      },
    },
  }
}