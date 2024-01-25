import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcWatchface} from './watchface';
import './watchface';

const meta: Meta<typeof ObcWatchface> = {
  title: 'Building blocks/Watchface',
  tags: ['autodocs'],
  component: 'obc-watchface',
  args: {},
} satisfies Meta<ObcWatchface>;

export default meta;
type Story = StoryObj<ObcWatchface>;

export const AzimuthMedium: Story = {
  args: {
    topline: true,
  },
};
