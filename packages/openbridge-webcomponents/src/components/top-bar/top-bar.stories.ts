import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {useArgs} from 'storybook/preview-api';
import {ObcTopBar, ObcTopBarMenuButtonIcon} from './top-bar.js';
import './top-bar.js';
import '../topbar-message-item/topbar-message-item.js';
import '../alert-button/alert-button.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-ship.js';
import '../alert-icon/alert-icon.js';
import '../command-button/command-button.js';
import '../dropdown-button/dropdown-button.js';
import '../diagnostic-button/diagnostic-button.js';
import '../diagnostic-menu/diagnostic-menu.js';
import '../message-menu-item/message-menu-item.js';
import type {ObcDropdownButtonChangeEvent} from '../dropdown-button/dropdown-button.js';
import {html, nothing} from 'lit';
import {
  ObcTopbarMessageItemSize,
  ObcTopbarMessageItemType,
} from '../topbar-message-item/topbar-message-item.js';
import {ObcAlertButtonType} from '../alert-button/alert-button.js';

/** An entry of the story's asset list, in the shape an app would hold it. */
type TopBarStoryAsset = {label: string; key: string};

const meta: Meta<typeof ObcTopBar> = {
  title: 'Application Components/Top Elements/TopBar',
  tags: ['autodocs', '6.0'],
  component: 'obc-top-bar',
  parameters: {
    layout: 'fullscreen',
    chromatic: {pauseAnimationAtEnd: false},
  },
  args: {
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
    showUserButton: true,
    showAppIcon: true,
    wideMenuButton: false,
    appTitleBreakpointPx: 0,
    dimmingButtonBreakpointPx: 0,
    appButtonBreakpointPx: 0,
    clockMinimizeBreakpointPx: 0,
    alertBreakpoint: 0,
    flatMaxBreakpointPx: 0,
    silenceButtonMinBreakpointPx: 0,
    appIconBreakpointPx: 0,
    menuButtonIcon: ObcTopBarMenuButtonIcon.Menu,
    date: '2024-12-12T11:11:12.111Z',
    assets: [],
    selectedAssetKey: '',
    showDiagnosticButton: false,
    nDiagnostics: 3,
    diagnosticMenuOpen: false,
  },
  argTypes: {
    showDate: {
      control: {type: 'boolean'},
    },
    menuButtonIcon: {
      control: {type: 'select'},
      options: Object.values(ObcTopBarMenuButtonIcon),
    },
  },
  render: (args) => {
    // The app owns the picked asset: the story writes the pick back into its
    // arg the way an app writes it to its state, so a re-render keeps it.
    const [, updateArgs] = useArgs();
    return html`
      <style>
        .alert-notifications {
          display: none;
        }

        @media (min-width: ${args.alertBreakpoint + 'px'}) {
          .alert-notifications {
            display: revert !important;
          }
        }
      </style>
      <obc-top-bar
        ?showappsbutton=${args.showAppsButton}
        ?showdimmingbutton=${args.showDimmingButton}
        ?showclock=${args.showClock}
        ?widemenubutton=${args.wideMenuButton}
        ?inactive=${args.inactive}
        ?settings=${args.settings}
        ?showappicon=${args.showAppIcon}
        ?showdate=${args.showDate}
        ?showuserbutton=${args.showUserButton}
        ?userbuttondisabled=${args.userButtonDisabled}
        ?menuButtonActivated=${args.menuButtonActivated}
        ?tall=${args.tall}
        .appButtonBreakpointPx=${args.appButtonBreakpointPx}
        .appTitleBreakpointPx=${args.appTitleBreakpointPx}
        .dimmingButtonBreakpointPx=${args.dimmingButtonBreakpointPx}
        .userButtonBreakpointPx=${args.userButtonBreakpointPx}
        .appIconBreakpointPx=${args.appIconBreakpointPx}
        .breadcrumbItems=${args.breadcrumbItems}
        .menuButtonIcon=${args.menuButtonIcon}
      >
        <obi-ship slot="app-icon"></obi-ship>
        ${
          args.assets.length
            ? html`<obc-dropdown-button
                slot="asset-picker"
                .options=${args.assets.map(
                  ({key, label}: TopBarStoryAsset) => ({
                    value: key,
                    label,
                  })
                )}
                .value=${args.selectedAssetKey}
                @dropdown-change=${(event: ObcDropdownButtonChangeEvent) =>
                  updateArgs({selectedAssetKey: event.detail.value})}
              ></obc-dropdown-button>`
            : nothing
        }
        <obc-command-button slot="command-button"></obc-command-button>
        <obc-topbar-message-item
          .type=${ObcTopbarMessageItemType.WithButton}
          .size=${
            args.tall
              ? ObcTopbarMessageItemSize.Tall
              : ObcTopbarMessageItemSize.Regular
          }
          slot="alerts"
          class="alert-notifications"
        >
          <obc-alert-icon
            slot="primary-icon"
            type="alarm"
            active
          ></obc-alert-icon>
          <obi-placeholder slot="secondary-icon"></obi-placeholder>
          <div slot="title">Alert title</div>
          <div slot="description">
            Description here. This alert has been triggered due to a detected
          </div>
          <div slot="time">09:12:46</div>
          <div slot="action-text">ACK</div>
        </obc-topbar-message-item>
        <obc-alert-button
          class="alert-button ${args.inactive ? 'inactive' : ''}"
          nAlerts="1"
          alertType="alarm"
          counter
          blinking
          showSilenceButton
          silenceButtonDisabled
          .type=${
            args.inactive ? ObcAlertButtonType.Flat : ObcAlertButtonType.Normal
          }
          ?large=${args.tall}
          .flatMaxBreakpointPx=${args.flatMaxBreakpointPx}
          .silenceButtonMinBreakpointPx=${args.silenceButtonMinBreakpointPx}
          slot="alerts"
        >
        </obc-alert-button>
        ${
          args.showDiagnosticButton
            ? html`<obc-diagnostic-button
                slot="diagnostics"
                .nAlerts=${args.nDiagnostics}
                ?activated=${args.diagnosticMenuOpen}
                aria-expanded=${args.diagnosticMenuOpen ? 'true' : 'false'}
              ></obc-diagnostic-button>`
            : nothing
        }
        <obc-clock
          slot="clock"
          .date=${args.date}
          .blinkOnlyBreakpointPx=${args.clockMinimizeBreakpointPx}
        ></obc-clock>
      </obc-top-bar>
      ${
        args.diagnosticMenuOpen
          ? html`<obc-diagnostic-menu
              canAckAll
              style="position: fixed; right: 4px; top: calc(var(--app-components-topbar-touch-target-size) + 4px);"
              >${diagnosticRows()}</obc-diagnostic-menu
            >`
          : nothing
      }
    `;
  },
} satisfies Meta<ObcTopBar>;

const DIAGNOSTIC_DESCRIPTION =
  'A long notification message of more than one line of text and meaningful content. Sometimes it might be quite long and that is ok.';

const diagnosticRow = (title: string, open = false) =>
  html`<obc-message-menu-item
    title=${title}
    description=${DIAGNOSTIC_DESCRIPTION}
    day="Yesterday"
    time="09:12:34"
    primaryActionLabel="Action"
    hasPrimaryIcon
    ?open=${open}
    ><obi-placeholder slot="primary-icon"></obi-placeholder
  ></obc-message-menu-item>`;

/** The five rows of the design, the third expanded. */
const diagnosticRows = () =>
  html`${diagnosticRow('Simulate')} ${diagnosticRow('Title')}
  ${diagnosticRow('Title', true)} ${diagnosticRow('Title')}
  ${diagnosticRow('Title')}`;

export default meta;
type Story = StoryObj<ObcTopBar>;

export const Regular: Story = {};
export const Tall: Story = {
  args: {
    tall: true,
  },
};

export const WideRailRegular: Story = {
  args: {
    wideMenuButton: true,
    showAppIcon: true,
  },
};

export const Inactive: Story = {
  args: {
    inactive: true,
  },
};

export const Settings: Story = {
  args: {
    settings: true,
    breadcrumbItems: [
      {label: 'Settings 1'},
      {label: 'Page 1'},
      {label: 'Page 1.2'},
    ],
  },
};

export const Small: Story = {
  args: {
    appButtonBreakpointPx: 1_000_000,
    appTitleBreakpointPx: 1_000_000,
    dimmingButtonBreakpointPx: 1_000_000,
    clockMinimizeBreakpointPx: 1_000_000,
    userButtonBreakpointPx: 1_000_000,
    alertBreakpoint: 1_000_000,
    appIconBreakpointPx: 1_000_000,
    flatMaxBreakpointPx: 1_000_000,
    silenceButtonMinBreakpointPx: 1_000_000,
  },
};

export const Reponsive: Story = {
  args: {
    clockMinimizeBreakpointPx: 300,
    appTitleBreakpointPx: 400,
    appButtonBreakpointPx: 500,
    dimmingButtonBreakpointPx: 500,
    userButtonBreakpointPx: 500,
    alertBreakpoint: 1120,
    appIconBreakpointPx: 560,
    flatMaxBreakpointPx: 340,
    silenceButtonMinBreakpointPx: 340,
  },
};

/** For cases where a home screen is used instead of a menu screen
 * the menu button icon is set to home
 */
export const HomeButtonIcon: Story = {
  args: {
    menuButtonIcon: ObcTopBarMenuButtonIcon.Home,
  },
};

/**
 * The `asset-picker` slot takes the control that switches the asset the page
 * shows. An `obc-dropdown-button` fits: its label is the selected asset, a
 * click opens the list, and its `dropdown-change` carries the key of the pick.
 * The app owns the list and the selection: it binds them in and writes the pick
 * back, as the story does with its args `assets` and `selectedAssetKey`.
 *
 * TODO(designer): Figma OpenBridge-ALPHA 703-29119 draws the picker as a plain
 * button without a chevron; the dropdown-button rows of the same exploration
 * (699-90973) draw one, and so does `obc-dropdown-button`.
 */
export const AssetPicker: Story = {
  args: {
    alertBreakpoint: 1_000_000, // the long message item would squeeze the texts out at 1280 px
    assets: [
      {label: 'Merd A', key: 'merd-a'},
      {label: 'Merd B', key: 'merd-b'},
      {label: 'Merd C', key: 'merd-c'},
    ],
    selectedAssetKey: 'merd-b',
  },
};

/**
 * The diagnostic button after the alert area, with its menu showing, as the
 * design places them (Figma scratch file `Qit0iy9CQO8bvNqbcUgzXc`, 213-31927).
 */
export const Diagnostics: Story = {
  args: {
    showDiagnosticButton: true,
    diagnosticMenuOpen: true,
    alertBreakpoint: 1_000_000, // the long message item would squeeze the texts out at 1280 px
  },
};
