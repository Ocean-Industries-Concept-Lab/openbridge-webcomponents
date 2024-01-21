import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcBrillianceMenu} from './brilliance-menu';
import './brilliance-menu';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcBrillianceMenu> = {
  title: 'Application/Brilliance Menu',
  tags: ['autodocs'],
  component: 'obc-brilliance-menu',
  argTypes: {},
} satisfies Meta<ObcBrillianceMenu>;

export default meta;
type Story = StoryObj<ObcBrillianceMenu>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};
