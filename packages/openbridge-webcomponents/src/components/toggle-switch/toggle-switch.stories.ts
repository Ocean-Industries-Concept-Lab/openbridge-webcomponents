import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcToggleSwitch} from './toggle-switch';
import './toggle-switch';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcToggleSwitch> = {
  title: 'Control/Toggle Switch',
  tags: ['autodocs'],
  component: 'obc-toggle-switch',
  argTypes: {
    label: {
      control: {type: 'text'},
    },
  },
} satisfies Meta<ObcToggleSwitch>;

export default meta;
type Story = StoryObj<ObcToggleSwitch>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Label',
  },
};
