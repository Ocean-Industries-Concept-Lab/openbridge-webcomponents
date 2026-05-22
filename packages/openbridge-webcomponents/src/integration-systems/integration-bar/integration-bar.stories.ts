import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBar} from './integration-bar.js';
import './integration-bar.js';
import {html} from 'lit';
import '../../components/dropdown-button/dropdown-button.js';
import '../../components/clock/clock.js';
import '../integration-vessel-menu/integration-vessel-menu.js';
import {IntegrationButtonVariant} from '../integration-button/integration-button.js';

function makeStringShorter(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength);
}

type IntegrationBarStoryArgs = ObcIntegrationBar & {
  date: string;
  showDate: boolean;
  showTimezone: boolean;
  timeZoneOffsetHours: number;
  clockMinimizeBreakpointPx: number;
  showVesselIntegrationMenu: boolean;
  hug: boolean;
  makeLabelNamesShort: boolean;
  containerWidthPx: number;
};

function renderIntegrationButtons({
  onIntegrationButtonClick,
  shortNames,
  hug,
  shouldShowDividerRight,
}: {
  onIntegrationButtonClick: (event: Event, buttonIndex: number) => void;
  shortNames: boolean;
  hug: boolean;
  shouldShowDividerRight: (buttonIndex: number) => boolean;
}) {
  const slotName = hug ? 'hug-buttons' : 'integration-buttons';

  return html`
    <obc-integration-button
      hasLeadingIcon
      .variant=${IntegrationButtonVariant.flat}
      ?selected=${false}
      ?activated=${false}
      ?dividerRight=${shouldShowDividerRight(0)}
      @click=${(e: Event) => onIntegrationButtonClick(e, 0)}
      slot=${slotName}
    >
      <obi-ship slot="leading-icon"></obi-ship>
      <span slot="label"
        >${shortNames ? makeStringShorter('Boat', 2) : 'Boat'}</span
      >
    </obc-integration-button>
    <obc-integration-button
      hasLeadingIcon
      .variant=${IntegrationButtonVariant.flat}
      ?selected=${false}
      ?activated=${false}
      ?dividerRight=${shouldShowDividerRight(1)}
      @click=${(e: Event) => onIntegrationButtonClick(e, 1)}
      slot=${slotName}
    >
      <obi-ship slot="leading-icon"></obi-ship>
      <span slot="label"
        >${shortNames ? makeStringShorter('Space Ship', 2) : 'Space Ship'}</span
      >
    </obc-integration-button>
    <obc-integration-button
      hasLeadingIcon
      .variant=${IntegrationButtonVariant.flat}
      ?selected=${false}
      ?activated=${true}
      ?dividerRight=${shouldShowDividerRight(2)}
      @click=${(e: Event) => onIntegrationButtonClick(e, 2)}
      slot=${slotName}
    >
      <obi-ship slot="leading-icon"></obi-ship>
      <span slot="label"
        >${shortNames ? makeStringShorter('Vessel', 2) : 'Vessel'}</span
      >
    </obc-integration-button>
    <obc-integration-button
      hasLeadingIcon
      .variant=${IntegrationButtonVariant.flat}
      ?selected=${true}
      ?activated=${false}
      ?dividerRight=${shouldShowDividerRight(3)}
      @click=${(e: Event) => onIntegrationButtonClick(e, 3)}
      slot=${slotName}
    >
      <obi-ship slot="leading-icon"></obi-ship>
      <span slot="label"
        >${shortNames ? makeStringShorter('Last', 2) : 'Last'}</span
      >
    </obc-integration-button>
  `;
}

const meta: Meta<IntegrationBarStoryArgs> = {
  title: 'Integration Systems/Integration Bar',
  tags: ['6.0', 'WIP'],
  component: 'obc-integration-bar',
  globals: {
    // 👇 Set viewport for all component stories
    viewport: {value: 'desktop'},
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    containerWidthPx: 1200,
    showClock: true,
    date: '2021-01-01T11:11:11.111Z',
    clockMinimizeBreakpointPx: 600,
    showDate: false,
    showTimezone: false,
    timeZoneOffsetHours: 1,
    hideHomeButton: false,
    hug: false,
    showLinkButton: false,
    linkButtonActivated: false,
    showUserButton: true,
    userButtonActivated: false,
    showDimmingButton: true,
    dimmingButtonActivated: false,
    showSystemButton: true,
    systemButtonActivated: false,
    showScreenButton: true,
    screenButtonActivated: false,
    showNotificationButton: true,
    notificationButtonActivated: false,
    showAlertButton: true,
    alertButtonActivated: false,
    showVesselIntegrationMenu: false,

    fleetButtonSelected: false,
    fleetButtonActivated: false,
    fleetButtonLabel: 'Fleet',
    makeLabelNamesShort: false,
  },
  argTypes: {
    containerWidthPx: {
      control: {type: 'number'},
    },
    showDate: {
      control: {type: 'boolean'},
    },
    showVesselIntegrationMenu: {
      control: {type: 'boolean'},
    },
    hug: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => {
    type IntegrationButtonElement = HTMLElement & {
      activated: boolean;
      selected: boolean;
      dividerRight: boolean;
    };

    const integrationButtonCount = 4;
    // Track click phase for each button (0: both false, 1: activated true, 2: selected true)
    const buttonStates: Map<number, number> = new Map([
      [0, 0], // button 1
      [1, 0], // button 2
      [2, 1], // button 3 (currently activated=true)
      [3, 2], // button 4 (currently selected=true)
    ]);

    const isActivatedOrSelected = (phase: number): boolean => {
      return phase === 1 || phase === 2;
    };

    const shouldShowDividerRight = (buttonIndex: number): boolean => {
      if (buttonIndex >= integrationButtonCount - 1) {
        return false;
      }
      const currentPhase = buttonStates.get(buttonIndex) ?? 0;
      const rightPhase = buttonStates.get(buttonIndex + 1) ?? 0;

      return (
        !isActivatedOrSelected(currentPhase) &&
        !isActivatedOrSelected(rightPhase)
      );
    };

    const updateIntegrationButtonDividers = (
      button: IntegrationButtonElement
    ) => {
      const integrationBar = button.closest('obc-integration-bar');
      if (!integrationBar) {
        return;
      }

      const integrationButtons = Array.from(
        integrationBar.querySelectorAll<IntegrationButtonElement>(
          'obc-integration-button[slot="integration-buttons"], obc-integration-button[slot="hug-buttons"]'
        )
      );

      integrationButtons.forEach((integrationButton, index) => {
        integrationButton.dividerRight = shouldShowDividerRight(index);
      });
    };

    const onIntegrationButtonClick = (event: Event, buttonIndex: number) => {
      const button = event.currentTarget as IntegrationButtonElement;
      let phase = buttonStates.get(buttonIndex) ?? 0;

      // Cycle: 0 → 1 → 2 → 0
      phase = (phase + 1) % 3;
      buttonStates.set(buttonIndex, phase);

      // Apply state based on phase
      const isActivated = phase === 1;
      const isSelected = phase === 2;

      button.activated = isActivated;
      button.selected = isSelected;
      updateIntegrationButtonDividers(button);
    };

    const onFleetButtonClick = (event: Event) => {
      const integrationBar = event.currentTarget as ObcIntegrationBar;
      integrationBar.fleetButtonActivated = true;
    };

    return html`<div style="width: 100%; overflow-x: auto;">
      <div style=${`width: ${args.containerWidthPx}px;`}>
        <obc-integration-bar
          style="width: 100%;"
          @fleet-button-click=${onFleetButtonClick}
          .hideHomeButton=${args.hideHomeButton}
          .showLinkButton=${args.showLinkButton}
          .linkButtonActivated=${args.linkButtonActivated}
          .showClock=${args.showClock}
          .showUserButton=${args.showUserButton}
          .userButtonActivated=${args.userButtonActivated}
          .showDimmingButton=${args.showDimmingButton}
          .dimmingButtonActivated=${args.dimmingButtonActivated}
          .showSystemButton=${args.showSystemButton}
          .systemButtonActivated=${args.systemButtonActivated}
          .showAlertButton=${args.showAlertButton}
          .alertButtonActivated=${args.alertButtonActivated}
          .showScreenButton=${args.showScreenButton}
          .screenButtonActivated=${args.screenButtonActivated}
          .showNotificationButton=${args.showNotificationButton}
          .notificationButtonActivated=${args.notificationButtonActivated}
          .fleetButtonSelected=${args.fleetButtonSelected}
          .fleetButtonActivated=${args.fleetButtonActivated}
          .fleetButtonLabel=${args.fleetButtonLabel}
        >
          <obc-clock
            integrationBarMode
            .date=${args.date}
            .showDate=${args.showDate}
            slot="clock"
            .showTimezone=${args.showTimezone}
            .timeZoneOffsetHours=${args.timeZoneOffsetHours}
            .blinkOnlyBreakpointPx=${args.clockMinimizeBreakpointPx}
          ></obc-clock>
          <!-- TODO: Re-enable vessel integration menu story variant with proper handlers. -->

          ${renderIntegrationButtons({
            onIntegrationButtonClick,
            shortNames: args.makeLabelNamesShort,
            hug: args.hug,
            shouldShowDividerRight,
          })}
        </obc-integration-bar>
      </div>
    </div>`;
  },
} satisfies Meta<IntegrationBarStoryArgs>;

export default meta;
type Story = StoryObj<IntegrationBarStoryArgs>;

export const Primary: Story = {
  args: {},
};

export const Hug: Story = {
  args: {
    hug: true,
    makeLabelNamesShort: true,
  },
};

export const WideSpace: Story = {
  args: {
    containerWidthPx: 1800,
  },
};

export const TightSpace: Story = {
  args: {
    containerWidthPx: 520,
  },
};
