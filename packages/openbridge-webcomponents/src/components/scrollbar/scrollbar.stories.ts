import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcScrollbar} from './scrollbar';
import './scrollbar';
import {html} from 'lit';

const meta: Meta<typeof ObcScrollbar> = {
  title: 'application/Scrollbar',
  tags: ['autodocs'],
  component: 'obc-scrollbar',
  args: {},
  argTypes: {},
  render: () => {
    return html`
      <obc-scrollbar style="height: 300px">
        <div
          style="height: 500px; width: 100%; background: linear-gradient(blue, red);"
        ></div>
      </obc-scrollbar>
    `;
  },
} satisfies Meta<ObcScrollbar>;

export default meta;
type Story = StoryObj<ObcScrollbar>;

export const Primary: Story = {
  args: {},
};
