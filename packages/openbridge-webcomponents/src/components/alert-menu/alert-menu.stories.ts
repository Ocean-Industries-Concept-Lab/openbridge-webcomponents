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
    breakpoint: 0,
    maxWidth: 800,
  },
  argTypes: {
    breakpoint: {
      control: {type: 'range', min: 0, max: 2000, step: 1},
    },
  },
  render: (args) => {
    return html` <style>
        obc-alert-menu {
          max-width: ${args.maxWidth}px;
          height: 500px;
          display: block;
        }
      </style>
      <obc-alert-menu>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrow-breakpoint-px=${args.breakpoint}
        >
          <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrow-breakpoint-px=${args.breakpoint}
        >
          <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrow-breakpoint-px=${args.breakpoint}
        >
          <obi-14-alarm-unack slot="icon" use-css-color></obi-14-alarm-unack>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          time-since="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrow-breakpoint-px=${args.breakpoint}
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
          narrow-breakpoint-px=${args.breakpoint}
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
          narrow-breakpoint-px=${args.breakpoint}
        >
          <obi-14-caution-color
            slot="icon"
            use-css-color
          ></obi-14-caution-color>
        </obc-alert-menu-item>
      </obc-alert-menu>`},
} satisfies Meta<ObcAlertMenu>;

export default meta;
type Story = StoryObj<ObcAlertMenu>;

export const Regular: Story = {
  args: {},
};

export const Narrow: Story = {
  args: {
    breakpoint: 1_000_000,
    maxWidth: 500,
  },
};

export const Responsive: Story = {
  args: {
    breakpoint: 600,
    maxWidth: 800,
  },
};

export const Empty: Story = {
  args: {},
  render: (args) =>
    html` <style>
        obc-alert-menu {
          width: ${args.narrow ? '500px' : '800px'};
          height: 500px;
          display: block;
        }
      </style>
      <obc-alert-menu empty></obc-alert-menu>`,
};
