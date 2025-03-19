import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertIcon, AlertIconName} from './alert-icon.js';
import './alert-icon.js';
import {html} from 'lit';

const meta: Meta<typeof ObcAlertIcon> = {
  title: 'Alert/Icon',
  tags: ['autodocs'],
  component: 'obc-alert-icon',
  args: {
    name: AlertIconName.AlarmUnack,
  },
  argTypes: {
    name: {
      options: Object.values(AlertIconName),
      control: {type: 'radio'},
    },
  },
  render: (args) =>
    html` <div style="width:64px;height:64px">
      <obc-alert-icon .name=${args.name}></obc-alert-icon>
    </div>`,
} satisfies Meta<ObcAlertIcon>;

export default meta;
type Story = StoryObj<ObcAlertIcon>;

export const Primary: Story = {};
