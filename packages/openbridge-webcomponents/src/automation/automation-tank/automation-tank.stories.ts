import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAutomationTank, TankTrend} from './automation-tank';
import './automation-tank';

const meta: Meta<typeof ObcAutomationTank> = {
  title: 'Automation/Tank',
  tags: ['autodocs'],
  component: 'obc-automation-tank',
  args: {
    value: 9_000,
    max: 10_000,
    trend: TankTrend.fastFalling,
  },
  argTypes: {
    trend: {
      options: Object.values(TankTrend),
      control: {type: 'radio'},
    },
    value: {
      control: {type: 'range', min: 0, max: 10_000},
    },
  },
} satisfies Meta<ObcAutomationTank>;

export default meta;
type Story = StoryObj<ObcAutomationTank>;

export const Primary: Story = {
  args: {},
};
