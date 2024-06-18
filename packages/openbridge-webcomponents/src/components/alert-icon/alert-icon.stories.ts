import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertIcon, AlertIconNames} from './alert-icon';
import './alert-icon';
import {html} from 'lit';

const meta: Meta<typeof ObcAlertIcon> = {
  title: 'Alert/Icon',
  tags: ['autodocs'],
  component: 'obc-alert-icon',
  args: {
    name: 'alarm-unack',
    blinkValue: true,
  },
  argTypes: {
    name: {
      options: AlertIconNames,
      control: {type: 'radio'},
    },
    blinkValue: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <div style="width:64px;height:64px">
      <obc-alert-icon
        ?blinkvalue=${args.blinkValue}
        name=${args.name}
      ></obc-alert-icon>
    </div>`,
} satisfies Meta<ObcAlertIcon>;

export default meta;
type Story = StoryObj<ObcAlertIcon>;

export const Primary: Story = {};
