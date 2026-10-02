import './icons/icon-placeholder.js';
import './icons/icon-search.js';
import './icons/icon-radar-iec.js';
import './icons/icon-palette-day.js';
import './icons/icon-display-brilliance-low.js';
import './icons/icon-display-brilliance-proposal.js';
import './icons/icon-close-google.js';
import './icons/icon-ship.js';
import {HTMLTemplateResult, TemplateResult, html} from 'lit';
import {spread} from '@open-wc/lit-helpers';
import {AlertCondition, AlertSetAside} from './alert-system/alert-system.js';
import {alertSystem} from './alert-system/alert-systems.js';
import {
  MaritimeAlertCriticality,
  MaritimeAlertState,
} from './alert-system/maritime-alert-system.js';
import {
  AutomationAlertCriticality,
  AutomationAlertState,
} from './alert-system/automation-alert-system.js';
import {presentAlert} from './alert-system/present-alert.js';
import {getDefaultAlertStandard} from './alert-system/alert-standard.js';
import {alertFilterState} from './alert-filter.js';
import './components/alert-menu-item/alert-menu-item.js';
import {
  ObcAlertMenuItemStatus,
  type ObcAlertMenuItem,
} from './components/alert-menu-item/alert-menu-item.js';
import './components/alert-icon-experimental/alert-icon-experimental.js';
import {alertMenuItemStatus} from './building-blocks/alert-list-experimental/alert-menu-item-state.js';
import type {
  StandardAlert,
  StandardAlertFields,
} from './alert-system/standard-alert.js';

export const iconIds = [
  'placeholder',
  'search',
  'display-brilliance-low',
  'display-brilliance-proposal',
  'radar-iec',
  'palette-day',
  'ship',
  'close-google',
].sort();

export function iconIdToIconHtml(
  id: string,
  attributes: Record<string, string> = {}
): TemplateResult {
  switch (id) {
    case 'placeholder':
      return html`<obi-placeholder ${spread(attributes)}></obi-placeholder>`;
    case 'search':
      return html`<obi-search ${spread(attributes)}></obi-search>`;
    case 'palette-day':
      return html`<obi-palette-day ${spread(attributes)}></obi-palette-day>`;
    case 'display-brilliance-low':
      return html`<obi-display-brilliance-low
        ${spread(attributes)}
      ></obi-display-brilliance-low>`;
    case 'display-brilliance-proposal':
      return html`<obi-display-brilliance-proposal
        ${spread(attributes)}
      ></obi-display-brilliance-proposal>`;
    case 'radar-iec':
      return html`<obi-radar-iec ${spread(attributes)}></obi-radar-iec>`;
    case 'ship':
      return html`<obi-ship ${spread(attributes)}></obi-ship>`;
    case 'close-google':
      return html`<obi-close-google ${spread(attributes)}></obi-close-google>`;
    default:
      throw new Error(`Unknown icon id: ${id}`);
  }
}

export function crossDecorator(
  story: () => unknown,
  context: {globals?: {cross?: boolean} | Record<string, unknown>}
): HTMLTemplateResult {
  const cross = (context.globals as {cross?: boolean})?.cross ?? false;
  return html` <style>
      .wrapper {
        width: 100%;
        height: 100vh;
        position: relative;
      }

      .wrapper > * {
        position: absolute;
        top: 50%;
        left: 50%;
      }

      .wrapper.cross::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        left: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
      }

      .wrapper.cross::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        top: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
        z-index: -100;
      }
    </style>
    <div class="wrapper ${cross ? 'cross' : ''}">${story()}</div>`;
}

export function widthDecorator(
  story: () => unknown,
  context: {args: {width?: number; height?: number}}
): HTMLTemplateResult {
  // Stories that manage their own container (e.g. user-resizable sizing
  // playgrounds) opt out with `parameters: {widthDecorator: false}` — the
  // fixed-size overflow:auto wrapper would fence in their resize handle.
  // (Read via a cast so the signature stays assignable to Storybook's
  // DecoratorFunction for every Meta typing in the repo.)
  const parameters = (context as {parameters?: {widthDecorator?: boolean}})
    .parameters;
  if (parameters?.widthDecorator === false) {
    return html`${story()}`;
  }
  const width = context.args.width ?? 300;
  const height = context.args.height ?? width;
  return html` <div
    class="wrapper"
    style="width: ${width}px; height: ${height}px; overflow: auto;"
  >
    ${story()}
  </div>`;
}

/**
 * User-resizable container for sizing-playground stories: drag the
 * bottom-right corner and watch the content adapt. CSS `resize` only works
 * with a non-visible `overflow`, hence `overflow: auto` on the box itself.
 */
export function resizableStoryBox(
  content: unknown,
  {width = 560, height = 320}: {width?: number; height?: number} = {}
): HTMLTemplateResult {
  return html`<div
    style="resize: both; overflow: auto; border: 1px dashed var(--instrument-frame-tertiary-color, gray); width: ${width}px; height: ${height}px; display: flex; gap: 8px; align-items: stretch;"
  >
    ${content}
  </div>`;
}

/**
 * One captioned column inside a sizing-playground flex row. A `pinned`
 * instrument sets its own intrinsic size (faceDiameter), so its column
 * shrink-wraps; an adaptive one gets an equal share of the remaining space.
 */
export function playgroundColumn(
  caption: string,
  content: unknown,
  {pinned = false}: {pinned?: boolean} = {}
): HTMLTemplateResult {
  return html`<div
    style="flex: ${
      pinned ? '0 0 auto' : '1 1 0'
    }; min-width: 0; display: flex; flex-direction: column; gap: 2px;"
  >
    <span
      style="flex: 0 0 auto; font-family: var(--font-family-main, sans-serif); font-size: 11px; color: var(--instrument-frame-secondary-color, gray); white-space: nowrap;"
    >
      ${caption}
    </span>
    <div style="flex: 1 1 0; min-height: 0;">${content}</div>
  </div>`;
}

/** Short explanatory line rendered above a sizing-playground box. */
export function storyHint(text: string): HTMLTemplateResult {
  return html`<p
    style="max-width: 70ch; margin: 0 0 8px; font-family: var(--font-family-main, sans-serif); font-size: 12px; color: var(--instrument-frame-secondary-color, gray);"
  >
    ${text}
  </p>`;
}

/**
 * Assert that a fixed-size circular chart's canvas matches the layout the
 * component computed for itself (its `--chart-width`/`--chart-height` CSS
 * variables). Guards against Chart.js re-sizing the canvas behind the
 * component's back, e.g. the legend-inflated responsive resizing of
 * issue #1061.
 *
 * @param canvasElement - The story's root element (from the play context)
 * @param tagName - Tag name of the chart component, e.g. 'obc-donut-chart'
 * @returns The canvas bounding rect, for further stability assertions
 */
export function expectChartCanvasToMatchComputedLayout(
  canvasElement: HTMLElement,
  tagName: string
): DOMRect {
  const chartHost = canvasElement.querySelector(tagName);
  const canvas = chartHost?.shadowRoot?.querySelector('canvas');
  if (!chartHost || !(chartHost instanceof HTMLElement) || !canvas) {
    throw new Error(`${tagName} canvas not found`);
  }
  const cssWidth = parseFloat(
    chartHost.style.getPropertyValue('--chart-width')
  );
  const cssHeight = parseFloat(
    chartHost.style.getPropertyValue('--chart-height')
  );
  // NaN would make both comparisons below false and silently pass the guard
  if (Number.isNaN(cssWidth) || Number.isNaN(cssHeight)) {
    throw new Error(`${tagName} --chart-width/--chart-height not set`);
  }
  const rect = canvas.getBoundingClientRect();
  if (
    Math.abs(rect.width - cssWidth) > 1 ||
    Math.abs(rect.height - cssHeight) > 1
  ) {
    throw new Error(
      `${tagName} canvas is ${rect.width}x${rect.height} but computed layout is ${cssWidth}x${cssHeight}`
    );
  }
  return rect;
}

/**
 * One alert in each state the alert filter modes tell apart, in the terms of
 * `standard`, for the experimental alert list and menu stories. Each call
 * returns new objects, because the stories acknowledge alerts in place.
 */
export function alertsInEveryState(
  standard: 'iec-62923' | 'isa-18.2' = 'iec-62923'
): StandardAlert[] {
  const time = (minute: number) =>
    new Date(`2024-01-15T14:${String(minute).padStart(2, '0')}:00Z`);
  const acknowledged = {acknowledgedBy: 'John Doe', acknowledgedAt: time(40)};
  const iec = standard === 'iec-62923';
  const alarm = iec
    ? MaritimeAlertCriticality.Alarm
    : AutomationAlertCriticality.High;
  const warning = iec
    ? MaritimeAlertCriticality.Warning
    : AutomationAlertCriticality.Medium;
  const unacked = iec
    ? MaritimeAlertState.ActiveUnacknowledged
    : AutomationAlertState.Unacknowledged;
  const alert = (
    id: string,
    text: string,
    criticality: string,
    state: string,
    fields: Partial<StandardAlertFields> = {}
  ) =>
    ({
      standard,
      criticality,
      state,
      id,
      tagId: id.toUpperCase(),
      source: alertSystem(standard).label(criticality),
      text,
      time: time(30),
      ...fields,
    }) as StandardAlert;
  return [
    alert('unacked-active', 'Active, unacked', alarm, unacked, {
      time: time(39),
    }),
    alert(
      'acked-active',
      'Active, acked',
      alarm,
      iec
        ? MaritimeAlertState.ActiveAcknowledged
        : AutomationAlertState.Acknowledged,
      {...acknowledged, time: time(38)}
    ),
    alert(
      'unacked-rectified',
      iec ? 'Rectified, unacked' : 'Returned to normal, unacked',
      alarm,
      iec
        ? MaritimeAlertState.RectifiedUnacknowledged
        : AutomationAlertState.ReturnedToNormalUnacknowledged,
      {time: time(37)}
    ),
    alert(
      'normal',
      iec ? 'Rectified, acked' : 'Normal',
      alarm,
      iec ? MaritimeAlertState.Normal : AutomationAlertState.Normal,
      {...acknowledged, time: time(36)}
    ),
    alert(
      'caution',
      'Takes no ACK',
      iec
        ? MaritimeAlertCriticality.Caution
        : AutomationAlertCriticality.Diagnostic,
      iec ? MaritimeAlertState.Active : AutomationAlertState.Active,
      {time: time(35)}
    ),
    alert('no-ack', 'ACK elsewhere', warning, unacked, {
      noAck: true,
      time: time(34),
    }),
    alert('shelved', 'Shelved', warning, unacked, {
      setAside: AlertSetAside.Shelved,
      time: time(33),
    }),
    alert('blocked', iec ? 'Blocked' : 'Suppressed', alarm, unacked, {
      setAside: iec ? AlertSetAside.Blocked : AlertSetAside.Suppressed,
      time: time(32),
    }),
  ];
}

/**
 * Every criticality of a standard in every state it takes: one column per
 * criticality, most severe first, and one row per state, with the cell left
 * empty where the criticality does not take the state. The per-standard
 * stories of the experimental alert components draw their cells through it.
 */
export function alertSystemMatrix(
  standard: string,
  cell: (criticality: string, state: string) => TemplateResult
): TemplateResult {
  const system = alertSystem(standard);
  return html`<div
    style="display: grid; grid-template-columns: auto repeat(${
      system.criticalities.length
    }, minmax(64px, auto)); gap: 8px 16px; align-items: center; justify-items: center; font: var(--font-ui-body, 14px sans-serif);"
  >
    <div></div>
    ${system.criticalities.map(
      (criticality) => html`<div>${system.label(criticality)}</div>`
    )}
    ${system.states.map(
      (state) =>
        html`<div style="justify-self: end">${state}</div>
          ${system.criticalities.map((criticality) =>
            system.statesOf(criticality).includes(state)
              ? cell(criticality, state)
              : html`<div></div>`
          )}`
    )}
  </div>`;
}

/** The state each standard moves an alert to when it is acknowledged here. */
const ACKNOWLEDGED_STATE: Record<string, Record<string, string>> = {
  'iec-62923': {
    [MaritimeAlertState.ActiveUnacknowledged]:
      MaritimeAlertState.ActiveAcknowledged,
    [MaritimeAlertState.ActiveSilenced]: MaritimeAlertState.ActiveAcknowledged,
    [MaritimeAlertState.RectifiedUnacknowledged]: MaritimeAlertState.Normal,
  },
  'isa-18.2': {
    [AutomationAlertState.Unacknowledged]: AutomationAlertState.Acknowledged,
    [AutomationAlertState.ReturnedToNormalUnacknowledged]:
      AutomationAlertState.Normal,
    [AutomationAlertState.LatchedUnacknowledged]:
      AutomationAlertState.LatchedAcknowledged,
  },
};

/** The state an alert in `state` moves to when it is acknowledged here, if any. */
export function acknowledgedState(
  standard: string,
  state: string
): string | undefined {
  return ACKNOWLEDGED_STATE[standard]?.[state];
}

/**
 * Stands in for the application acknowledging alerts: the acknowledged ones
 * move to the state their standard gives them, and those that are then
 * normal leave the list.
 */
export function acknowledgeAlerts(
  alerts: StandardAlert[],
  ids: ReadonlySet<string>
): StandardAlert[] {
  return alerts.flatMap((alert) => {
    const next = ids.has(alert.id)
      ? acknowledgedState(alert.standard, alert.state)
      : undefined;
    if (!next) {
      return [alert];
    }
    const acked = {
      ...alert,
      state: next,
      acknowledgedBy: 'John Doe',
      acknowledgedAt: new Date('2024-01-15T14:44:00Z'),
    } as StandardAlert;
    return presentAlert(acked).condition === AlertCondition.Normal
      ? []
      : [acked];
  });
}

/** An `obc-alert-menu-item` for an alert, with its icon drawn by its standard. */
export function alertMenuItem(
  alert: StandardAlert,
  onAck: (item: ObcAlertMenuItem) => void
): TemplateResult {
  const {shelved, blocked} = alertFilterState(alert);
  return html`<obc-alert-menu-item
    .status=${alertMenuItemStatus(alert)}
    .shelved=${shelved}
    .blocked=${blocked}
    title=${alert.source}
    description=${alert.text}
    time=${alert.time.toISOString().slice(11, 19)}
    @ack-click=${(e: Event) => onAck(e.currentTarget as ObcAlertMenuItem)}
  >
    <obc-alert-icon-experimental
      slot="alert-icon"
      .standard=${alert.standard}
      .criticality=${alert.criticality}
      .state=${alert.state}
      .setAside=${alert.setAside}
    ></obc-alert-icon-experimental>
  </obc-alert-menu-item>`;
}

/**
 * Stands in for the application acknowledging the alert of a menu item in
 * place: the item's status and its icon's state move on.
 */
export function acknowledgeMenuItem(item: ObcAlertMenuItem): void {
  const icon = item.querySelector('obc-alert-icon-experimental');
  const next =
    icon &&
    acknowledgedState(icon.standard ?? getDefaultAlertStandard(), icon.state);
  if (!icon || !next) {
    return;
  }
  icon.state = next;
  item.status =
    item.status === ObcAlertMenuItemStatus.RectifiedUnacknowledged
      ? ObcAlertMenuItemStatus.Rectified
      : ObcAlertMenuItemStatus.Acknowledged;
}
