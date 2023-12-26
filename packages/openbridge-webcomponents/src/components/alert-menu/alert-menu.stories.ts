import type {Meta, StoryObj} from '@storybook/web-components';
import {AlertMenu} from './alert-menu';
import './alert-menu';
import '../alert-menu-item/alert-menu-item';
import '../../icons/icon-14-alarm-unack';
import '../../icons/icon-14-warning-unacknowledged';
import '../../icons/icon-14-caution-color';
import {html} from 'lit';

const meta: Meta<typeof AlertMenu> = {
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
    html`<obc-alert-menu .narrow=${args.narrow}>
      <obc-alert-menu-item
        acknowledgeble
        message="Alert message with more than one line of text"
        type="alarm"
        time-since="12m 12s"
        time="2020-11-19T13:56:00.414000Z"
        ?narrow=${args.narrow}
      >
        <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        acknowledgeble
        message="Alert message with more than one line of text"
        type="alarm"
        time-since="12m 12s"
        time="2020-11-19T13:56:00.414000Z"
        ?narrow=${args.narrow}
      >
        <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        acknowledgeble
        message="Alert message with more than one line of text"
        type="alarm"
        time-since="12m 12s"
        time="2020-11-19T13:56:00.414000Z"
        ?narrow=${args.narrow}
      >
        <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
      </obc-alert-menu-item>
      <obc-alert-menu-item
        acknowledgeble
        message="Alert message with more than one line of text"
        type="warning"
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
        type="warning"
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
        type="caution"
        time-since="12m 12s"
        time="2020-11-19T13:56:00.414000Z"
        ?narrow=${args.narrow}
      >
        <obi-14-caution-color slot="icon" use-css-color></obi-14-caution-color>
      </obc-alert-menu-item>
    </obc-alert-menu>`,
} satisfies Meta<AlertMenu>;

export default meta;
type Story = StoryObj<AlertMenu>;

export const Regular: Story = {
  args: {},
};

export const Narrow: Story = {
  args: {
    narrow: true,
  },
};
