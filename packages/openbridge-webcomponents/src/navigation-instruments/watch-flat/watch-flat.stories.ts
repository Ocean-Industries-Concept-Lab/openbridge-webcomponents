import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcWatchFlat} from './watch-flat';
import './watch-flat';

const meta: Meta<typeof ObcWatchFlat> = {
  title: 'Building blocks/Watch flat',
  tags: ['autodocs'],
  component: 'obc-watch-flat',
  args: {},
} satisfies Meta<ObcWatchFlat>;

export default meta;
type Story = StoryObj<ObcWatchFlat>;

export const Primary: Story = {
  args: {},
};
