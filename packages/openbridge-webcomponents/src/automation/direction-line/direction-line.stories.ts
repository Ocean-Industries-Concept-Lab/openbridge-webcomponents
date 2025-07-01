import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDirectionLine} from './direction-line.js';
import './direction-line.js';
import {crossDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcDirectionLine> = {
  title: 'Automation/Line/Direction',
  tags: ['autodocs'],
  component: 'obc-direction-line',
  decorators: [crossDecorator],
  args: {},
  argTypes: {
    medium: {
      options: ['normal', 'empty', 'water'],
      control: {type: 'radio'},
    },
    lineType: {
      options: ['fluid', 'electric', 'air', 'connector'],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcDirectionLine>;

export default meta;
type Story = StoryObj<ObcDirectionLine>;

export const Primary: Story = {
  args: {},
};
