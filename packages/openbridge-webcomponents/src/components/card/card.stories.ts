import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCard} from './card';
import './card';
import {html} from 'lit';

const meta: Meta<typeof ObcCard> = {
  title: 'Layout/Card',
  tags: ['6.0'],
  component: 'obc-card',
  args: {},
} satisfies Meta<ObcCard>;

export default meta;
type Story = StoryObj<ObcCard>;

export const Regular: Story = {
  render: (args) => {
    return html`<obc-card>
      <div slot="title">Title</div>
      <div>Content</div>
    </obc-card>`;
  },
};
