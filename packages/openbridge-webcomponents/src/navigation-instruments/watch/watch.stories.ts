import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcWatch} from './watch';
import './watch';
import {html} from 'lit';

const meta: Meta<typeof ObcWatch> = {
  title: 'Building blocks/Watch',
  tags: ['autodocs'],
  component: 'obc-watch',
  argTypes: {width: {control: {type: 'range', min: 32, max: 800, step: 10}}},
  args: {
    width: 400,
  },
  render: (args) => {
    return html`<div style="width: ${args.width}px; height: ${args.width}px">
      <obc-watch ?hideAllTickmarks=${args.hideAllTickmarks}></obc-watch>
    </div>`;
  },
} satisfies Meta<ObcWatch>;

export default meta;
type Story = StoryObj<ObcWatch>;

export const Primary: Story = {
  args: {},
};
