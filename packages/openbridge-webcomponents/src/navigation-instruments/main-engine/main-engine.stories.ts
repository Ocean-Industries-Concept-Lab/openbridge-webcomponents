import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcMainEngine } from './main-engine';
import './main-engine';
import { beta6Decorator, widthDecorator } from '../../storybook-util';

const meta: Meta<typeof ObcMainEngine> = {
  title: 'Navigation instruments/Main Engine',
  tags: ['autodocs'],
  component: "obc-main-engine",
  args: {
    width: 352,
  },
  decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcMainEngine>;

export default meta;
type Story = StoryObj<ObcMainEngine>;

export const Primary: Story = {
  args: {
  },
}