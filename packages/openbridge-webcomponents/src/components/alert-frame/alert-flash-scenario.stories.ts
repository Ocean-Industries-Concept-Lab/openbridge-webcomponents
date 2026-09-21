import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {LitElement, html, nothing, type TemplateResult} from 'lit';
import {property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {
  ObcAlertFrameFlashEffect,
  ObcAlertFrameMode,
  ObcAlertFrameType,
} from './alert-frame.js';
import './alert-frame.js';
import '../alert-button/alert-button.js';
import '../alert-icon/alert-icon.js';
import '../alert-menu/alert-menu.js';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';
import '../alert-menu-item/alert-menu-item.js';
import {ButtonVariant} from '../button/button.js';
import '../button/button.js';
import '../card/card.js';
import '../clock/clock.js';
import '../top-bar/top-bar.js';
import {ObcTopbarMessageItemType} from '../topbar-message-item/topbar-message-item.js';
import '../topbar-message-item/topbar-message-item.js';
import '../../navigation-instruments/readout-list-item/readout-list-item.js';
import {requiresAcknowledgement} from '../../alert-severity.js';
import {ALERT_SEVERITY_PRIORITY, AlertType} from '../../types.js';

interface ScenarioReadout {
  label: string;
  unit: string;
  /** Value while the alert condition is present. */
  alerting: number;
  normal: number;
}

interface AlertState {
  present: boolean;
  active: boolean;
  acknowledged: boolean;
  /** Timeline second the alert was raised; negative when raised before the start. */
  raisedAt: number;
}

interface ScenarioPanel {
  id: string;
  title: string;
  alertType: AlertType;
  alertTitle: string;
  alertDescription: string;
  frameType: ObcAlertFrameType;
  readouts: ScenarioReadout[];
  initial: AlertState;
}

enum ScenarioChange {
  Raise = 'raise',
  Rectify = 'rectify',
  Clear = 'clear',
}

interface TimelineStep {
  at: number;
  panel: string;
  change: ScenarioChange;
}

const raised = (raisedAt: number): AlertState => ({
  present: true,
  active: true,
  acknowledged: false,
  raisedAt,
});

const rectified = (raisedAt: number): AlertState => ({
  present: true,
  active: false,
  acknowledged: false,
  raisedAt,
});

const acknowledged = (raisedAt: number): AlertState => ({
  present: true,
  active: true,
  acknowledged: true,
  raisedAt,
});

const QUIET: AlertState = {
  present: false,
  active: false,
  acknowledged: false,
  raisedAt: 0,
};

/**
 * At the start every design level (critical, alarm, warning, caution) shows
 * one solid and one dashed frame, and one alarm is acknowledged.
 */
const PANELS: ScenarioPanel[] = [
  {
    id: 'fire',
    title: 'Fire detection',
    alertType: AlertType.LevelCritical,
    alertTitle: 'Fire in engine room',
    alertDescription: 'Smoke and heat detectors triggered in zone 3',
    frameType: ObcAlertFrameType.BottomFlip,
    readouts: [
      {label: 'Zone 3 temperature', unit: '°C', alerting: 86, normal: 31},
      {label: 'Smoke density', unit: '%', alerting: 42, normal: 0},
    ],
    initial: raised(-95),
  },
  {
    id: 'switchboard',
    title: 'Main switchboard',
    alertType: AlertType.LevelCritical,
    alertTitle: 'Blackout on bus B',
    alertDescription: 'Bus B supplied from the emergency generator',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Bus A', unit: 'V', alerting: 440, normal: 440},
      {label: 'Bus B', unit: 'V', alerting: 0, normal: 438},
    ],
    initial: rectified(-240),
  },
  {
    id: 'generator',
    title: 'Generator 2',
    alertType: AlertType.Alarm,
    alertTitle: 'Generator 2 overload',
    alertDescription: 'Load above 95 % of rated power',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Load', unit: '%', alerting: 97, normal: 78},
      {label: 'Output', unit: 'kW', alerting: 1940, normal: 1560},
    ],
    initial: raised(-60),
  },
  {
    id: 'tank',
    title: 'Service tank',
    alertType: AlertType.Alarm,
    alertTitle: 'Service tank level low',
    alertDescription: 'Fuel level below 30 %',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Level', unit: '%', alerting: 27, normal: 34},
      {label: 'Consumption', unit: 'L/h', alerting: 210, normal: 210},
    ],
    initial: rectified(-420),
  },
  {
    id: 'ballast',
    title: 'Ballast pump 1',
    alertType: AlertType.Alarm,
    alertTitle: 'Ballast pump 1 tripped',
    alertDescription: 'Motor overcurrent protection released',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Motor current', unit: 'A', alerting: 0, normal: 42},
      {label: 'Flow', unit: 'm³/h', alerting: 0, normal: 180},
    ],
    initial: acknowledged(-300),
  },
  {
    id: 'cooling',
    title: 'Main engine',
    alertType: AlertType.Warning,
    alertTitle: 'Cooling water temperature high',
    alertDescription: 'Jacket water outlet above 90 °C',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Cooling water', unit: '°C', alerting: 92, normal: 84},
      {label: 'Speed', unit: 'rpm', alerting: 84, normal: 84},
    ],
    initial: raised(-150),
  },
  {
    id: 'bilge',
    title: 'Bilge',
    alertType: AlertType.Warning,
    alertTitle: 'Bilge level high',
    alertDescription: 'Engine room bilge well 2',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Well 2 level', unit: '%', alerting: 71, normal: 12},
      {label: 'Well 3 level', unit: '%', alerting: 9, normal: 9},
    ],
    initial: rectified(-380),
  },
  {
    id: 'steering',
    title: 'Steering gear',
    alertType: AlertType.Warning,
    alertTitle: 'Steering pump 2 oil level low',
    alertDescription: 'Hydraulic oil below the refill mark',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Pump 2 oil level', unit: '%', alerting: 18, normal: 64},
      {label: 'Rudder', unit: '°', alerting: 3, normal: 3},
    ],
    initial: QUIET,
  },
  {
    id: 'gnss',
    title: 'GNSS',
    alertType: AlertType.Caution,
    alertTitle: 'GNSS 2 signal degraded',
    alertDescription: 'Position accuracy reduced',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Satellites', unit: 'sats', alerting: 6, normal: 14},
      {label: 'Accuracy', unit: 'm', alerting: 12, normal: 2},
    ],
    initial: raised(-40),
  },
  {
    id: 'freshwater',
    title: 'Fresh water',
    alertType: AlertType.Caution,
    alertTitle: 'Fresh water pressure low',
    alertDescription: 'Hydrophore pressure below 300 kPa',
    frameType: ObcAlertFrameType.SmallSideFlip,
    readouts: [
      {label: 'Pressure', unit: 'kPa', alerting: 280, normal: 390},
      {label: 'Tank level', unit: '%', alerting: 72, normal: 72},
    ],
    initial: rectified(-200),
  },
];

const PANEL_BY_ID = new Map(PANELS.map((panel) => [panel.id, panel]));

const TIMELINE: TimelineStep[] = [
  {at: 5, panel: 'steering', change: ScenarioChange.Raise},
  {at: 10, panel: 'generator', change: ScenarioChange.Rectify},
  {at: 15, panel: 'gnss', change: ScenarioChange.Rectify},
  {at: 20, panel: 'cooling', change: ScenarioChange.Rectify},
  {at: 25, panel: 'freshwater', change: ScenarioChange.Clear},
  {at: 30, panel: 'gnss', change: ScenarioChange.Clear},
  {at: 35, panel: 'ballast', change: ScenarioChange.Rectify},
];

const TIMELINE_LENGTH_S = 40;

const CHANGE_LABEL: Record<ScenarioChange, string> = {
  [ScenarioChange.Raise]: 'raises an alert',
  [ScenarioChange.Rectify]: 'rectifies',
  [ScenarioChange.Clear]: 'clears',
};

const START_UTC_MS = Date.UTC(2026, 8, 14, 9, 41, 0);

function clockDate(second: number): string {
  return new Date(START_UTC_MS + second * 1000).toISOString();
}

function clockTime(second: number): string {
  return clockDate(second).slice(11, 19);
}

function elapsedTime(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}

function initialAlerts(): Record<string, AlertState> {
  return Object.fromEntries(
    PANELS.map((panel) => [panel.id, {...panel.initial}])
  );
}

/** Acknowledged and rectified alerts are gone, so they have no frame. */
function frameMode(alert: AlertState): ObcAlertFrameMode | undefined {
  if (!alert.present) {
    return undefined;
  }
  if (!alert.active) {
    return ObcAlertFrameMode.unackedRectified;
  }
  return alert.acknowledged
    ? ObcAlertFrameMode.ackedActive
    : ObcAlertFrameMode.unackedActive;
}

function needsAcknowledgement(
  panel: ScenarioPanel,
  alert: AlertState
): boolean {
  return (
    alert.present &&
    !alert.acknowledged &&
    requiresAcknowledgement(panel.alertType)
  );
}

function menuStatus(
  panel: ScenarioPanel,
  alert: AlertState
): ObcAlertMenuItemStatus {
  if (!requiresAcknowledgement(panel.alertType)) {
    return ObcAlertMenuItemStatus.Caution;
  }
  return alert.acknowledged
    ? ObcAlertMenuItemStatus.Acknowledged
    : ObcAlertMenuItemStatus.Unacknowledged;
}

/**
 * `<alert-flash-scenario-story>` – Live alert scenario for judging the flash
 * tempos and frame effects together.
 *
 * Ten panels in alert frames, the top bar message and alert button, and the
 * alert menu read one alert state. A 40-second timeline raises, rectifies and
 * clears alerts, then restarts; ACK in the top bar or the menu acknowledges.
 *
 * @property flashEffect - Flash effect of every frame in the scenario.
 * @property runTimeline - Advances the timeline once a second; off holds the
 *   current state.
 * @property showAlertMenu - Shows the alert menu beside the panels; the alert
 *   button toggles it.
 */
class AlertFlashScenarioStory extends LitElement {
  @property({type: String}) flashEffect = ObcAlertFrameFlashEffect.Outline;
  @property({type: Boolean, attribute: false}) runTimeline = true;
  @property({type: Boolean, attribute: false}) showAlertMenu = true;

  @state() private second = 0;
  @state() private alerts = initialAlerts();

  private timer?: ReturnType<typeof setInterval>;

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.syncTimer();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.syncTimer();
  }

  override updated() {
    this.syncTimer();
  }

  tick() {
    const next = this.second + 1;
    if (next >= TIMELINE_LENGTH_S) {
      this.restart();
      return;
    }
    this.second = next;
    for (const step of TIMELINE.filter((s) => s.at === next)) {
      this.apply(step);
    }
  }

  restart() {
    this.second = 0;
    this.alerts = initialAlerts();
  }

  acknowledge(id: string) {
    const alert = this.alerts[id];
    this.alerts = {
      ...this.alerts,
      [id]: alert.active
        ? {...alert, acknowledged: true}
        : {...alert, present: false},
    };
  }

  private apply({panel, change}: TimelineStep) {
    const alert = this.alerts[panel];
    let next: AlertState;
    switch (change) {
      case ScenarioChange.Raise:
        next = raised(this.second);
        break;
      case ScenarioChange.Rectify:
        next = alert.acknowledged
          ? {...alert, present: false}
          : {...alert, active: false};
        break;
      case ScenarioChange.Clear:
        next = {...alert, present: false};
        break;
    }
    this.alerts = {...this.alerts, [panel]: next};
  }

  private syncTimer() {
    const wanted = this.runTimeline && this.isConnected;
    if (wanted && !this.timer) {
      this.timer = setInterval(() => this.tick(), 1000);
    } else if (!wanted && this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  /** Pending acknowledgements first, then by severity, newest first. */
  private visiblePanels(): ScenarioPanel[] {
    const rank = (panel: ScenarioPanel) =>
      ALERT_SEVERITY_PRIORITY.indexOf(panel.alertType);
    const pending = (panel: ScenarioPanel) =>
      needsAcknowledgement(panel, this.alerts[panel.id]);
    return PANELS.filter((panel) => this.alerts[panel.id].present).sort(
      (a, b) =>
        Number(pending(b)) - Number(pending(a)) ||
        rank(a) - rank(b) ||
        this.alerts[b.id].raisedAt - this.alerts[a.id].raisedAt
    );
  }

  private renderIcon(panel: ScenarioPanel, slot: string): TemplateResult {
    const alert = this.alerts[panel.id];
    return html`<obc-alert-icon
      slot=${slot}
      .alertType=${panel.alertType}
      .active=${alert.active}
      .acknowledged=${alert.acknowledged}
    ></obc-alert-icon>`;
  }

  private renderMessage(top: ScenarioPanel | undefined): TemplateResult {
    if (!top) {
      return html`<obc-topbar-message-item
        slot="alerts"
        .type=${ObcTopbarMessageItemType.Inactive}
      ></obc-topbar-message-item>`;
    }
    const alert = this.alerts[top.id];
    return html`<obc-topbar-message-item
      slot="alerts"
      .type=${
        needsAcknowledgement(top, alert)
          ? ObcTopbarMessageItemType.WithButton
          : ObcTopbarMessageItemType.Simple
      }
      @action-click=${() => this.acknowledge(top.id)}
    >
      ${this.renderIcon(top, 'primary-icon')}
      <div slot="title">${top.alertTitle}</div>
      <div slot="description">${top.alertDescription}</div>
      <div slot="time">${clockTime(alert.raisedAt)}</div>
      <div slot="action-text">ACK</div>
    </obc-topbar-message-item>`;
  }

  private renderTopBar(visible: ScenarioPanel[]): TemplateResult {
    const top = visible[0];
    return html`<obc-top-bar
      .appTitle=${'Machinery'}
      .pageName=${'Alert flash scenario'}
      .showClock=${true}
    >
      ${this.renderMessage(top)}
      <obc-alert-button
        slot="alerts"
        .nAlerts=${visible.length}
        .alertType=${top?.alertType}
        .counter=${true}
        .blinking=${visible.some((panel) =>
          needsAcknowledgement(panel, this.alerts[panel.id])
        )}
        @click-alert=${() => (this.showAlertMenu = !this.showAlertMenu)}
      ></obc-alert-button>
      <obc-clock slot="clock" .date=${clockDate(this.second)}></obc-clock>
    </obc-top-bar>`;
  }

  private renderPanel(panel: ScenarioPanel): TemplateResult {
    const alert = this.alerts[panel.id];
    const mode = frameMode(alert);
    const alerting = alert.present && alert.active;
    const card = html`<obc-card>
      <span slot="title">${panel.title}</span>
      ${panel.readouts.map(
        (readout) =>
          html`<obc-readout-list-item
            .label=${readout.label}
            .unit=${readout.unit}
            .value=${alerting ? readout.alerting : readout.normal}
          ></obc-readout-list-item>`
      )}
    </obc-card>`;
    if (!mode) {
      return html`<div>${card}</div>`;
    }
    return html`<obc-alert-frame
      .type=${panel.frameType}
      .status=${panel.alertType}
      .mode=${mode}
      .flashEffect=${this.flashEffect}
      .wrapContent=${true}
      .fullWidth=${true}
    >
      ${card}
      ${
        panel.frameType === ObcAlertFrameType.BottomFlip
          ? html`<div slot="label">${panel.alertTitle}</div>
              <div slot="timer">
                ${elapsedTime(this.second - alert.raisedAt)}
              </div>`
          : nothing
      }
    </obc-alert-frame>`;
  }

  private renderMenu(visible: ScenarioPanel[]): TemplateResult {
    const pending = visible.filter((panel) =>
      needsAcknowledgement(panel, this.alerts[panel.id])
    );
    return html`<obc-alert-menu
      .hasShelved=${false}
      .showSilenceButton=${false}
      .showAlertListButton=${false}
      .canAckAll=${pending.length > 0}
      @ack-all-visible-click=${() =>
        pending.forEach((panel) => this.acknowledge(panel.id))}
    >
      ${repeat(
        visible,
        (panel) => panel.id,
        (panel) =>
          html`<obc-alert-menu-item
            .status=${menuStatus(panel, this.alerts[panel.id])}
            .title=${panel.alertTitle}
            .description=${panel.alertDescription}
            .time=${clockTime(this.alerts[panel.id].raisedAt)}
            @ack-click=${() => this.acknowledge(panel.id)}
          >
            ${this.renderIcon(panel, 'alert-icon')}
          </obc-alert-menu-item>`
      )}
    </obc-alert-menu>`;
  }

  private renderStatus(): TemplateResult {
    const next = TIMELINE.find((step) => step.at > this.second);
    const upcoming = next
      ? `${PANEL_BY_ID.get(next.panel)?.title} ${CHANGE_LABEL[next.change]} at ${next.at} s`
      : `restarts at ${TIMELINE_LENGTH_S} s`;
    return html`<div class="afs-status">
      <span>
        ${this.runTimeline ? 'Timeline' : 'Timeline paused at'} ${this.second} s
        of ${TIMELINE_LENGTH_S} s · next: ${upcoming}
      </span>
      <obc-button .variant=${ButtonVariant.flat} @click=${() => this.restart()}
        >Restart</obc-button
      >
    </div>`;
  }

  override render() {
    const visible = this.visiblePanels();
    return html`
      <style>
        .afs {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--container-background-color);
          font-family: var(--global-typography-font-family);
        }
        .afs-body {
          display: flex;
          flex: 1;
          gap: 16px;
          /* lets the grid scroll inside the viewport instead of growing the page */
          min-height: 0;
          padding: 16px;
        }
        .afs-main {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .afs-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-size: var(--global-typography-ui-label-font-size);
          line-height: var(--global-typography-ui-label-line-height);
          color: var(--element-neutral-color);
        }
        .afs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          /* the side and bottom flaps sit outside their frames */
          gap: 48px 40px;
          align-content: start;
          overflow: auto;
          padding: 8px 32px 40px 8px;
        }
      </style>
      <div class="afs">
        ${this.renderTopBar(visible)}
        <div class="afs-body">
          <div class="afs-main">
            ${this.renderStatus()}
            <div class="afs-grid">
              ${PANELS.map((panel) => this.renderPanel(panel))}
            </div>
          </div>
          ${this.showAlertMenu ? this.renderMenu(visible) : nothing}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('alert-flash-scenario-story')) {
  customElements.define('alert-flash-scenario-story', AlertFlashScenarioStory);
}

interface ScenarioArgs {
  flashEffect: ObcAlertFrameFlashEffect;
  runTimeline: boolean;
  showAlertMenu: boolean;
}

const meta: Meta<ScenarioArgs> = {
  title: 'UI Components/Message and Alerts/Alert Flash Scenario',
  tags: ['skip-test'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A live scenario for comparing the frame flash effects in context. ' +
          'At the start every alert level shows a solid (active) and a dashed ' +
          '(rectified) frame; a 40-second timeline then raises, rectifies and ' +
          'clears alerts and restarts. ACK in the top bar message or the alert ' +
          'menu acknowledges. `flashEffect` switches every frame between the ' +
          'instant step and the eased growth; the icons and the alert button ' +
          'flash on the same tempo table either way.',
      },
    },
  },
  args: {
    flashEffect: ObcAlertFrameFlashEffect.Outline,
    runTimeline: true,
    showAlertMenu: true,
  },
  argTypes: {
    flashEffect: {
      options: Object.values(ObcAlertFrameFlashEffect),
      control: {type: 'radio'},
    },
    runTimeline: {control: {type: 'boolean'}},
    showAlertMenu: {control: {type: 'boolean'}},
  },
  render: (args) =>
    html`<alert-flash-scenario-story
      .flashEffect=${args.flashEffect}
      .runTimeline=${args.runTimeline}
      .showAlertMenu=${args.showAlertMenu}
    ></alert-flash-scenario-story>`,
};

export default meta;
type Story = StoryObj<ScenarioArgs>;

export const Scenario: Story = {};
