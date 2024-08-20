import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcCompass } from './compass';
import './compass';

const meta: Meta<typeof ObcCompass> = {
  title: 'Navigation Instruments/Compass',
  tags: ['autodocs'],
  component: "obc-compass",
  args: {
  },
} satisfies Meta<ObcCompass>;

export default meta;
type Story = StoryObj<ObcCompass>;

export const Primary: Story = {
  args: {
  },
}