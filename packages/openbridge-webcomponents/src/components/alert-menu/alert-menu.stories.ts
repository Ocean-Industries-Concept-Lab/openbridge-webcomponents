import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertMenu} from './alert-menu';
import './alert-menu';
import '../alert-menu-item/alert-menu-item';
import '../../icons/icon-14-alarm-unack';
import '../../icons/icon-14-warning-unacknowledged';
import '../../icons/icon-14-caution-color';
import {html} from 'lit';

const meta: Meta<typeof ObcAlertMenu> = {
  title: 'Application/Alert menu',
  tags: ['autodocs'],
  component: 'obc-alert-menu',
  args: {
    narrow: false,
  },
  argTypes: {
    narrow: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <style>
        obc-alert-menu {
          width: ${args.narrow ? '500px' : '800px'};
          height: 500px;
          display: block;
        }
      </style>
      <obc-alert-menu .narrow=${args.narrow}>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          ?narrow=${args.narrow}
        >
          <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          ?narrow=${args.narrow}
        >
          <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          ?narrow=${args.narrow}
        >
          <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          ?narrow=${args.narrow}
        >
          <obi-14-warning-unacknowledged
            slot="icon"
            use-css-color
          ></obi-14-warning-unacknowledged>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          ?narrow=${args.narrow}
        >
          <obi-14-warning-unacknowledged
            slot="icon"
            use-css-color
          ></obi-14-warning-unacknowledged>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          ?narrow=${args.narrow}
        >
          <obi-14-caution-color
            slot="icon"
            use-css-color
          ></obi-14-caution-color>
        </obc-alert-menu-item>
      </obc-alert-menu>`,
} satisfies Meta<ObcAlertMenu>;

export default meta;
type Story = StoryObj<ObcAlertMenu>;

export const Regular: Story = {
  args: {},
};

export const Narrow: Story = {
  args: {
    narrow: true,
  },
};

export const Empty: Story = {
  args: {},
  render: (args) => html`
  <style>
        obc-alert-menu {
          width: ${args.narrow ? '500px' : '800px'};
          height: 500px;
          display: block;
        }
      </style>
  <obc-alert-menu empty></obc-alert-menu>`,
};
