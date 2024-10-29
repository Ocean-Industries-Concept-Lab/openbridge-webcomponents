import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcPoiTarget } from './poi-target';
import './poi-target';

const meta: Meta<typeof ObcPoiTarget> = {
  title: 'Navigation Instruments/POI Target',
  tags: ['autodocs'],
  component: "obc-poi-target",
  args: {
  },
} satisfies Meta<ObcPoiTarget>;

export default meta;
type Story = StoryObj<ObcPoiTarget>;

export const Primary: Story = {
  args: {
  },
}