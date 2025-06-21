import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcAlertListPageSmall } from './alert-list-page-small.js';
import './alert-list-page-small.js';

const meta: Meta<typeof ObcAlertListPageSmall> = {
  title: 'Pages/Alert list small',
  tags: ['6.0'],
  component: "obc-alert-list-page-small",
  args: {
  },
} satisfies Meta<ObcAlertListPageSmall>;

export default meta;
type Story = StoryObj<ObcAlertListPageSmall>;

export const Primary: Story = {
  args: {
  },
}