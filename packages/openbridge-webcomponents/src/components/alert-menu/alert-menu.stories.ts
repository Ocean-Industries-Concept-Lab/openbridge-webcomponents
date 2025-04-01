import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAlertMenu} from './alert-menu.js';
import './alert-menu.js';
import '../alert-menu-item/alert-menu-item.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-caution-color-iec.js';
import {html} from 'lit';

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
        <obc-alert-menu-item
          slot="unacked"
          acknowledgeble
          message="Alert message with more than one line of text"
          timesince="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrowBreakpointPx=${args.breakpoint}
        >
          <obi-warning-unacknowledged-iec
            slot="icon"
            usecsscolor
          ></obi-warning-unacknowledged-iec>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          acknowledgeble
          message="Alert message with more than one line of text"
          timesince="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrowBreakpointPx=${args.breakpoint}
        >
          <obi-warning-unacknowledged-iec
            slot="icon"
            usecsscolor
          ></obi-warning-unacknowledged-iec>
        </obc-alert-menu-item>
        <obc-alert-menu-item
          message="Alert message with more than one line of text"
          timesince="12m 12s"
          time="2020-11-19T13:56:00.414000Z"
          narrowBreakpointPx=${args.breakpoint}
        >
          <obi-caution-color-iec
            slot="icon"
            usecsscolor
          ></obi-caution-color-iec>
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
