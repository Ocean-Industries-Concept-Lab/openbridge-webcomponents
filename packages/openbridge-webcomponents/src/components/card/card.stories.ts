import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCard} from './card.js';
import './card.js';
import {html} from 'lit';

const meta: Meta<typeof ObcCard> = {
  title: 'UI Components/Sections/Card',
  tags: ['6.0'],
  component: 'obc-card',
  args: {},
} satisfies Meta<ObcCard>;

export default meta;
type Story = StoryObj<ObcCard>;

export const Regular: Story = {
  render: () => {
    return html`<obc-card>
      <div slot="title">Title</div>
      <div
        style="height: 100px; width: 100%; background-color: var(--base-red-200); display: flex; align-items: center; justify-content: center;"
      >
        Content
      </div>
    </obc-card>`;
  },
};

export const WithDialog: Story = {
  render: () => {
    return html`<obc-card hasDialog style="width: 200px;">
      <div slot="title">Title</div>
      <div
        style="height: 100px; width: 100%; background-color: var(--base-red-200); display: flex; align-items: center; justify-content: center;"
      >
        Content
      </div>
      <div slot="dialog-title">Dialog Title</div>
      <div
        slot="dialog-content"
        style="height: 100px; width: 200px; background-color: var(--base-blue-200); display: flex; align-items: center; justify-content: center;"
      >
        Dialog Content
      </div>
    </obc-card>`;
  },
};
