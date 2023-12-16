import type {Meta, StoryObj} from '@storybook/web-components';
import {BrillianceMenu} from './brilliance-menu';
import './brilliance-menu';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof BrillianceMenu> = {
  title: 'Application/Brilliance Menu',
  tags: ['autodocs'],
  component: 'obc-brilliance-menu',
  argTypes: {},
} satisfies Meta<BrillianceMenu>;

export default meta;
type Story = StoryObj<BrillianceMenu>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};
