import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcHeatPump} from './heat-pump.js';
import './heat-pump.js';
import {html} from 'lit';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';

type StoryArgs = ObcHeatPump;

const meta: Meta<StoryArgs> = {
  title: 'Automation/Tanks/Heat Pump',
  tags: ['autodocs', '6.1'],
  component: 'obc-heat-pump',
  args: {
    medium: false,
    showMediumIcons: true,
    showTag: true,
    tag: '#0000',
    badgeControl: AutomationButtonBadgeControl.None,
    badgeInterlock: AutomationButtonBadgeInterlock.None,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.None,
    badgeAlert: AutomationButtonBadgeAlert.None,
    alert: false,
    alertFrameType: ObcAlertFrameType.SmallSideFlip,
    alertFrameThickness: ObcAlertFrameThickness.Small,
    alertFrameStatus: ObcAlertFrameStatus.Alarm,
    showAlertCategoryIcon: true,
    showAlertIcon: false,
  },
  argTypes: {
    badgeControl: {
      options: Object.values(AutomationButtonBadgeControl),
      control: {type: 'select'},
    },
    badgeInterlock: {
      options: Object.values(AutomationButtonBadgeInterlock),
      control: {type: 'select'},
    },
    badgeCommandLocked: {
      options: Object.values(AutomationButtonBadgeCommandLocked),
      control: {type: 'select'},
    },
    badgeAlert: {
      options: Object.values(AutomationButtonBadgeAlert),
      control: {type: 'select'},
    },
    alertFrameType: {
      options: Object.values(ObcAlertFrameType),
      control: {type: 'select'},
    },
    alertFrameThickness: {
      options: Object.values(ObcAlertFrameThickness),
      control: {type: 'select'},
    },
    alertFrameStatus: {
      options: Object.values(ObcAlertFrameStatus),
      control: {type: 'select'},
    },
  },
  render: (args) => html`
    <obc-heat-pump
      ?medium=${args.medium}
      .showMediumIcons=${args.showMediumIcons}
      .showTag=${args.showTag}
      .tag=${args.tag}
      .badgeControl=${args.badgeControl}
      .badgeInterlock=${args.badgeInterlock}
      .badgeCommandLocked=${args.badgeCommandLocked}
      .badgeAlert=${args.badgeAlert}
      ?alert=${args.alert}
      .alertFrameType=${args.alertFrameType}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameStatus=${args.alertFrameStatus}
      .showAlertCategoryIcon=${args.showAlertCategoryIcon}
      .showAlertIcon=${args.showAlertIcon}
    ></obc-heat-pump>
  `,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const WithMedium: Story = {
  args: {medium: true},
};

export const WithBadges: Story = {
  args: {
    medium: true,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
    badgeAlert: AutomationButtonBadgeAlert.Silence,
  },
};

export const WithAlert: Story = {
  args: {medium: true, alert: true},
};
