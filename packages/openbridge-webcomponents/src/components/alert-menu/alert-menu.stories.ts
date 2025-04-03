import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertMenu} from './alert-menu.js';
import './alert-menu.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-caution-color-iec.js';
import {html} from 'lit';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';

const meta: Meta<typeof ObcAlertMenu> = {
  title: 'Application/Alert menu',
  tags: ['autodocs'],
  component: 'obc-alert-menu',
  args: {
    breakpoint: 0,
    maxWidth: 800,
    canAckAll: true,
    canSilence: true,
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
      <obc-alert-menu
        ?canAckAll=${args.canAckAll}
        ?canSilence=${args.canSilence}
      >
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.Unacknowledged}
          hasTime
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">Engine Temperature High</span>
          <span slot="description"
            >Port main engine temperature exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.NoAckAlarm}
          hasTime
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">GPS Position Error</span>
          <span slot="description"
            >GPS position error exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.NoAckWarning}
          hasTime
        >
          <obc-alert-icon
            slot="alert-icon"
            name="warning-unack"
          ></obc-alert-icon>
          <span slot="title">GPS Position Error</span>
          <span slot="description"
            >GPS position error exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.Unacknowledged}
          hasTime
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">Engine Temperature High</span>
          <span slot="description"
            >Port main engine temperature exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.NoAckAlarm}
          hasTime
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">GPS Position Error</span>
          <span slot="description"
            >GPS position error exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.NoAckWarning}
          hasTime
        >
          <obc-alert-icon
            slot="alert-icon"
            name="warning-unack"
          ></obc-alert-icon>
          <span slot="title">GPS Position Error</span>
          <span slot="description"
            >GPS position error exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.Unacknowledged}
          hasTime
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">Engine Temperature High</span>
          <span slot="description"
            >Port main engine temperature exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.NoAckAlarm}
          hasTime
        >
          <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
          <span slot="title">GPS Position Error</span>
          <span slot="description"
            >GPS position error exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.NoAckWarning}
          hasTime
        >
          <obc-alert-icon
            slot="alert-icon"
            name="warning-unack"
          ></obc-alert-icon>
          <span slot="title">GPS Position Error</span>
          <span slot="description"
            >GPS position error exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.Unacknowledged}
          hasTime
        >
          <obc-alert-icon
            slot="alert-icon"
            name="warning-unack"
          ></obc-alert-icon>
          <span slot="title">Engine Temperature High</span>
          <span slot="description"
            >Port main engine temperature exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          slot="unacked"
          status=${ObcAlertMenuItemStatus.Warning}
          hasTime
        >
          <obi-caution-color-iec
            useCssColor
            slot="alert-icon"
          ></obi-caution-color-iec>
          <span slot="title">Engine Temperature High</span>
          <span slot="description"
            >Port main engine temperature exceeds normal operating range</span
          >
          <span slot="time">09:12:34</span>
        </obc-alert-menu-item>
      </obc-alert-menu>`;
  },
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

export const OneItem: Story = {
  render: (args) => {
    return html` <style>
        obc-alert-menu {
          max-width: ${args.maxWidth}px;
          height: 500px;
          display: block;
        }
      </style>
      <obc-alert-menu
        ?canAckAll=${args.canAckAll}
        ?canSilence=${args.canSilence}
      >
        <obc-alert-menu-item
          slot="unacked"
          acknowledgeble
          message="Alert message with more than one line of text"
          timesince="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrowBreakpointPx=${args.breakpoint}
        >
          <obi-alarm-unacknowledged-iec
            slot="icon"
            usecsscolor
          ></obi-alarm-unacknowledged-iec>
        </obc-alert-menu-item>
      </obc-alert-menu>`;
  },
};
