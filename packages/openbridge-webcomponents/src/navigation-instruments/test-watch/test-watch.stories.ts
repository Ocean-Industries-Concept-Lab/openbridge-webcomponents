import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcTestWatch } from './test-watch';
import './test-watch';
import { html } from 'lit';

const meta: Meta<typeof ObcTestWatch> = {
  title: 'Test/Watch',
  tags: ['autodocs'],
  component: "obc-test-watch",
  argTypes: { width: { control: { type: 'range', min: 100, max: 800, step: 10 } }},
  args: {
    width: 400,
  },
  render: (args) => {
    return html`<div style="width: ${args.width}px; height: ${args.width}px">
      <obc-test-watch></obc-test-watch>
    </div>`;
  }
} satisfies Meta<ObcTestWatch>;

export default meta;
type Story = StoryObj<ObcTestWatch>;

export const Primary: Story = {
  args: {
  },
}