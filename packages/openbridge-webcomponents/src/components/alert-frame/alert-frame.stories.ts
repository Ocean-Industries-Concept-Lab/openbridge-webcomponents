import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertFrame} from './alert-frame';
import './alert-frame';
import {html} from 'lit';

const meta: Meta<typeof ObcAlertFrame> = {
  title: 'Alert/Frame',
  tags: ['autodocs'],
  component: 'obc-alert-frame',
  args: {},
  render() {
    return html`<obc-alert-frame>
      <div style="width: 100px; height: 50px; background-color: #999"></div>
    </obc-alert-frame>`;
  },
} satisfies Meta<ObcAlertFrame>;

export default meta;
type Story = StoryObj<ObcAlertFrame>;

export const Primary: Story = {
  args: {},
};
