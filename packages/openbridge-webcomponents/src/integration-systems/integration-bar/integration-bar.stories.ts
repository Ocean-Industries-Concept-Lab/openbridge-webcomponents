import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationBar} from './integration-bar.js';
import './integration-bar.js';
import {html, nothing} from 'lit';
import '../../components/dropdown-button/dropdown-button.js';
import '../../components/clock/clock.js';
import '../integration-vessel-menu/integration-vessel-menu.js';
import {
  IntegrationButtonType,
  IntegrationButtonVariant,
} from '../integration-button/integration-button.js';

function makeStringShorter(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength);
}

function getIntegrationnButtonType(hug: boolean, rich: boolean) {
  if (hug) {
    return IntegrationButtonType.hug;
  } else if (rich) {
    return IntegrationButtonType.rich;
  } else {
    return IntegrationButtonType.regular;
  }
}

function getColorForButton(color: string): string {
  return `--integration-on-selected-active-color: var(--base-${color}-600); --integration-on-selected-neutral-color: var(--base-${color}-500); --integration-selected-enabled-background-color: var(--base-${color}-100); --integration-selected-enabled-border-color: var(--base-${color}-100); --integration-selected-hover-background-color: var(--base-${color}-100); --integration-selected-hover-border-color: var(--base-${color}-100);`;
}

const readouts = [
  {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
  {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
];

type IntegrationBarStoryArgs = ObcIntegrationBar & {
  date: string;
  showDate: boolean;
  showTimezone: boolean;
  timeZoneOffsetHours: number;
  clockMinimizeBreakpointPx: number;
  showVesselIntegrationMenu: boolean;
  hug: boolean;
  rich: boolean;
  makeLabelNamesShort: boolean;
  containerWidthPx: number;
  showStatus: boolean;
  showIntegrationMenu: boolean;
  customSelectedColors: boolean;
};

function renderIntegrationButtons({
  onIntegrationButtonClick,
  shortNames,
  hug,
  rich,
  shouldShowDividerRight,
  showStatus,
  showIntegrationMenu,
  customSelectedColors,
}: {
  onIntegrationButtonClick: (event: Event, buttonIndex: number) => void;
  shortNames: boolean;
  hug: boolean;
  rich: boolean;
  shouldShowDividerRight: (buttonIndex: number) => boolean;
  showStatus: boolean;
  showIntegrationMenu: boolean;
  customSelectedColors: boolean;
}) {
  const slotName = hug ? 'hug-buttons' : 'integration-buttons';
  const buttonType = getIntegrationnButtonType(hug, rich);
  const button1styling = customSelectedColors ? getColorForButton('cyan') : '';
  const button2styling = customSelectedColors
    ? getColorForButton('indigo')
    : '';
  const button3styling = customSelectedColors ? getColorForButton('teal') : '';
  const button4styling = customSelectedColors
    ? getColorForButton('purple')
    : '';

  return html`
    <obc-integration-button
      hasLeadingIcon
      style=${button1styling}
      .variant=${IntegrationButtonVariant.flat}
      .type=${buttonType}
      .readouts=${readouts}
      .hasStatus=${showStatus}
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
      <div slot="info-label">Info Label</div>
      <div slot="info-status">Info Status</div>
      <div slot="status">Status</div>
      ${showIntegrationMenu
        ? html`<obc-integration-vessel-menu
            slot="integration-vessel-menu"
            numberOfButtons="2"
            @button1-click=${() => console.log('Boat Button 1 clicked')}
            @button2-click=${() => console.log('Boat Button 2 clicked')}
            ><span slot="title">Boat</span
            ><obi-placeholder slot="button-1-leading-icon"></obi-placeholder>
            <div slot="button-1-label">Select</div>
            <obi-placeholder slot="button-2-leading-icon"></obi-placeholder>
            <div slot="button-2-label">Dismiss</div>
            <div slot="content" style="padding: 24px;">
              <p>Boat is working just fine.</p>
            </div></obc-integration-vessel-menu
          >`
        : nothing}
    </obc-integration-button>
    <obc-integration-button
      hasLeadingIcon
      style=${button2styling}
      .variant=${IntegrationButtonVariant.flat}
      .type=${buttonType}
      .readouts=${readouts}
      .hasStatus=${showStatus}
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
      <div slot="info-label">Info Label</div>
      <div slot="info-status">Info Status</div>
      <div slot="status">Status</div>
      ${showIntegrationMenu
        ? html`<obc-integration-vessel-menu
            slot="integration-vessel-menu"
            numberOfButtons="2"
            @button1-click=${() => console.log('Space Ship Button 1 clicked')}
            @button2-click=${() => console.log('Space Ship Button 2 clicked')}
            ><span slot="title">Space Ship</span
            ><obi-placeholder slot="button-1-leading-icon"></obi-placeholder>
            <div slot="button-1-label">Select</div>
            <obi-placeholder slot="button-2-leading-icon"></obi-placeholder>
            <div slot="button-2-label">Dismiss</div>
            <div slot="content" style="padding: 24px;">
              <p>Space Ship is working just fine.</p>
            </div></obc-integration-vessel-menu
          >`
        : nothing}
    </obc-integration-button>
    <obc-integration-button
      hasLeadingIcon
      style=${button3styling}
      .variant=${IntegrationButtonVariant.flat}
      .type=${buttonType}
      .readouts=${readouts}
      .hasStatus=${showStatus}
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
      <div slot="info-label">Info Label</div>
      <div slot="info-status">Info Status</div>
      <div slot="status">Status</div>
      ${showIntegrationMenu
        ? html`<obc-integration-vessel-menu
            slot="integration-vessel-menu"
            numberOfButtons="2"
            @button1-click=${() => console.log('Vessel Button 1 clicked')}
            @button2-click=${() => console.log('Vessel Button 2 clicked')}
            ><span slot="title">Vessel</span
            ><obi-placeholder slot="button-1-leading-icon"></obi-placeholder>
            <div slot="button-1-label">Select</div>
            <obi-placeholder slot="button-2-leading-icon"></obi-placeholder>
            <div slot="button-2-label">Dismiss</div>
            <div slot="content" style="padding: 24px;">
              <p>Vessel is working just fine.</p>
            </div></obc-integration-vessel-menu
          >`
        : nothing}
    </obc-integration-button>
    <obc-integration-button
      hasLeadingIcon
      style=${button4styling}
      .variant=${IntegrationButtonVariant.flat}
      .type=${buttonType}
      .readouts=${readouts}
      .hasStatus=${showStatus}
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
      <div slot="info-label">Info Label</div>
      <div slot="info-status">Info Status</div>
      <div slot="status">Status</div>
      ${showIntegrationMenu
        ? html`<obc-integration-vessel-menu
            slot="integration-vessel-menu"
            numberOfButtons="2"
            @button1-click=${() => console.log('Last Button 1 clicked')}
            @button2-click=${() => console.log('Last Button 2 clicked')}
            ><span slot="title">Last</span
            ><obi-placeholder slot="button-1-leading-icon"></obi-placeholder>
            <div slot="button-1-label">Select</div>
            <obi-placeholder slot="button-2-leading-icon"></obi-placeholder>
            <div slot="button-2-label">Dismiss</div>
            <div slot="content" style="padding: 24px;">
              <p>Last is working just fine.</p>
            </div></obc-integration-vessel-menu
          >`
        : nothing}
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
    rich: false,
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
    showStatus: false,
    fleetButtonSelected: false,
    fleetButtonActivated: false,
    fleetButtonLabel: 'Fleet',
    makeLabelNamesShort: false,
    showIntegrationMenu: false,
    customSelectedColors: false,
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
    rich: {
      control: {type: 'boolean'},
    },
    showIntegrationMenu: {
      control: {type: 'boolean'},
    },
    customSelectedColors: {
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
      if (integrationBar.fleetButtonActivated == true) {
        integrationBar.fleetButtonActivated = false;
        integrationBar.fleetButtonSelected = true;
      } else if (integrationBar.fleetButtonSelected == true) {
        integrationBar.fleetButtonSelected = false;
        integrationBar.fleetButtonActivated = false;
      } else {
        integrationBar.fleetButtonActivated = true;
      }
    };

    const wrapperStyle = args.showIntegrationMenu
      ? 'width: 100%; min-height: 400px; overflow-x: auto; overflow-y: visible;'
      : 'width: 100%; overflow-x: auto;';

    return html` <div style=${wrapperStyle}>
      <div style=${`width: ${args.containerWidthPx}px;`}>
        <obc-integration-bar
          showFleetButton=${true}
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

          ${renderIntegrationButtons({
            onIntegrationButtonClick,
            shortNames: args.makeLabelNamesShort,
            hug: args.hug,
            rich: args.rich,
            shouldShowDividerRight,
            showStatus: args.showStatus,
            showIntegrationMenu: args.showIntegrationMenu,
            customSelectedColors: args.customSelectedColors,
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

export const WithStatus: Story = {
  args: {
    showStatus: true,
  },
};

export const Hug: Story = {
  args: {
    hug: true,
    makeLabelNamesShort: true,
  },
};

export const Rich: Story = {
  args: {
    makeLabelNamesShort: false,
    rich: true,
    containerWidthPx: 1920,
  },
};

export const WithIntegrationMenu: Story = {
  args: {
    showIntegrationMenu: true,
  },
};

export const CustomSelectedColors: Story = {
  args: {
    customSelectedColors: true,
  },
};
