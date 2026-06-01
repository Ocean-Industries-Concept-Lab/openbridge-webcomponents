import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcWatchFlat} from './watch-flat.js';
import './watch-flat.js';

const meta: Meta<typeof ObcWatchFlat> = {
  title: 'Building Blocks/Watch Flat',
  tags: ['autodocs'],
  component: 'obc-watch-flat',
  args: {},
} satisfies Meta<ObcWatchFlat>;

export default meta;
type Story = StoryObj<ObcWatchFlat>;

export const Primary: Story = {
  args: {},
};

export const WithBottomBar: Story = {
  args: {
    bottomBar: true,
  },
};
