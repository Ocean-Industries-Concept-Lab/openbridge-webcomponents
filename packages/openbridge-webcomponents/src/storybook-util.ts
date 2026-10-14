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
import {FlashingSpeed} from './types.js';
import {
  defineAlertStandard,
  type AlertStandard,
} from './alert-system/alert-standard.js';
import {
  getAlertStandard,
  setAlertStandard,
} from './alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from './alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from './alert-system/isa-18-2-alert-standard.js';
import './components/alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {
  ObcAlertMenuItemExperimental,
  ObcAlertMenuItemExperimentalActionClickEvent,
} from './components/alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {StandardAlertWithColumnFields} from './components/alert-list-details-experimental/alert-list-details-experimental.js';
import type {AlertCriticalityAndStateOf} from './alert-system/standard-alert.js';

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

const healthAlarmGlyphFrame = (
  colourToken: string,
  filled: boolean
): TemplateResult =>
  html`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      fill=${filled ? `var(${colourToken})` : 'none'}
      stroke="var(${colourToken})"
      stroke-width="2"
    />
    <path
      d="M12 7v10M7 12h10"
      stroke=${filled ? 'var(--container-background-color)' : `var(${colourToken})`}
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </svg>`;

const flashingHealthAlarmGlyph = (colourToken: string) => ({
  frame: healthAlarmGlyphFrame(colourToken, true),
  flashFrame: healthAlarmGlyphFrame(colourToken, false),
});

const steadyHealthAlarmGlyph = (colourToken: string, filled: boolean) => ({
  frame: healthAlarmGlyphFrame(colourToken, filled),
});

/**
 * IEC 60601-1-8, the alarms of medical equipment, as a standard from outside
 * the library: its own priorities, states, glyphs and filter. An alarm keeps
 * flashing after its sound is silenced, and a latched alarm stays until it
 * is reset. The standard asks 1.4 to 2.8 Hz for a high priority; `fast`, at
 * 1.25 Hz, is the quickest tempo the library has.
 */
export const iec6060118StoryAlertStandard = defineAlertStandard({
  filters: {
    present: {
      label: () => 'Present',
      titleWhenNoAlertIsIncluded: () => 'No alarm condition present',
      iconWhenNoAlertIsIncluded: html`<obi-placeholder></obi-placeholder>`,
    },
    latched: {
      label: () => 'Latched',
      titleWhenNoAlertIsIncluded: () => 'No latched alarms',
      iconWhenNoAlertIsIncluded: html`<obi-placeholder></obi-placeholder>`,
    },
  },
  actions: {
    'silence-audio': {label: () => 'Silence'},
    reset: {label: () => 'Reset', canBeAppliedToSeveralAlertsAtOnce: true},
  },
  criticalities: {
    high: {
      states: {
        present: {
          glyph: flashingHealthAlarmGlyph('--alert-alarm-color'),
          sortingRank: 15,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: ['present'],
          offeredActions: ['silence-audio'],
        },
        'present-audio-silenced': {
          glyph: flashingHealthAlarmGlyph('--alert-alarm-color'),
          sortingRank: 16,
          flashingSpeed: FlashingSpeed.Fast,
          includedInFilters: ['present'],
        },
        latched: {
          glyph: steadyHealthAlarmGlyph('--alert-alarm-color', false),
          sortingRank: 150,
          includedInFilters: ['latched'],
          offeredActions: ['reset'],
        },
      },
    },
    medium: {
      states: {
        present: {
          glyph: flashingHealthAlarmGlyph('--alert-warning-color'),
          sortingRank: 35,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: ['present'],
          offeredActions: ['silence-audio'],
        },
        'present-audio-silenced': {
          glyph: flashingHealthAlarmGlyph('--alert-warning-color'),
          sortingRank: 36,
          flashingSpeed: FlashingSpeed.Slow,
          includedInFilters: ['present'],
        },
        latched: {
          glyph: steadyHealthAlarmGlyph('--alert-warning-color', false),
          sortingRank: 151,
          includedInFilters: ['latched'],
          offeredActions: ['reset'],
        },
      },
    },
    low: {
      states: {
        present: {
          glyph: steadyHealthAlarmGlyph('--alert-caution-color', true),
          sortingRank: 105,
          includedInFilters: ['present'],
        },
      },
    },
  },
});

export const STORY_ALERT_STANDARDS = {
  'iec-62923': iec62923AlertStandard,
  'isa-18.2': isa182AlertStandard,
  'iec-60601-1-8': iec6060118StoryAlertStandard,
} satisfies Record<string, AlertStandard>;

export type StoryAlertStandardName = keyof typeof STORY_ALERT_STANDARDS;

export const STORY_ALERT_STANDARD_NAMES = Object.keys(
  STORY_ALERT_STANDARDS
) as StoryAlertStandardName[];

/** For a story's `beforeEach`: draws the story with the named standard, or none, and none after it. */
export function drawStoryWithAlertStandard(
  name: StoryAlertStandardName | undefined
) {
  return () => {
    setAlertStandard(
      name === undefined ? undefined : STORY_ALERT_STANDARDS[name]
    );
    return () => setAlertStandard(undefined);
  };
}

/** An alert with every field the stories' columns and menu items show. */
export type StoryAlert = StandardAlertWithColumnFields;

type CriticalityAndStateOfAnyStoryAlertStandard = {
  [Name in StoryAlertStandardName]: AlertCriticalityAndStateOf<
    (typeof STORY_ALERT_STANDARDS)[Name]
  >;
}[StoryAlertStandardName];

/** An alert raised on 15 January 2024 at `timeOfDay`, such as `'14:32:15'` (UTC). */
export function storyAlert(
  criticalityAndState: CriticalityAndStateOfAnyStoryAlertStandard,
  id: string,
  text: string,
  timeOfDay: string,
  otherFields: Partial<StoryAlert> = {}
): StoryAlert {
  return {
    ...criticalityAndState,
    id,
    tagId: id.toUpperCase(),
    source: criticalityAndState.criticality,
    text,
    time: new Date(`2024-01-15T${timeOfDay}Z`),
    ...otherFields,
  };
}

/**
 * One alert in each kind of state a built-in standard has, for the
 * experimental alert list, menu and page stories. Each call returns new
 * objects, because the stories change the alerts they are given.
 */
export function alertsInEveryKindOfState(
  standard: 'iec-62923' | 'isa-18.2'
): StoryAlert[] {
  if (standard === 'isa-18.2') {
    return [
      storyAlert(
        {criticality: 'high', state: 'unacknowledged'},
        'unacknowledged',
        'Unacknowledged',
        '14:39:00'
      ),
      storyAlert(
        {criticality: 'high', state: 'acknowledged'},
        'acknowledged',
        'Acknowledged',
        '14:38:00',
        {acknowledgedBy: 'John Doe'}
      ),
      storyAlert(
        {criticality: 'high', state: 'returned-to-normal-unacknowledged'},
        'returned-to-normal',
        'Returned to normal, unacknowledged',
        '14:37:00'
      ),
      storyAlert(
        {criticality: 'high', state: 'normal'},
        'normal',
        'Normal',
        '14:36:00'
      ),
      storyAlert(
        {criticality: 'diagnostic', state: 'active'},
        'diagnostic',
        'Diagnostic, takes no ACK',
        '14:35:00'
      ),
      storyAlert(
        {criticality: 'medium', state: 'shelved'},
        'shelved',
        'Shelved',
        '14:34:00'
      ),
      storyAlert(
        {criticality: 'critical', state: 'suppressed-by-design'},
        'suppressed',
        'Suppressed by design',
        '14:33:00'
      ),
      storyAlert(
        {criticality: 'low', state: 'out-of-service'},
        'out-of-service',
        'Out of service',
        '14:32:00'
      ),
    ];
  }
  return [
    storyAlert(
      {criticality: 'alarm', state: 'active-unacknowledged'},
      'unacknowledged',
      'Active, unacknowledged',
      '14:39:00'
    ),
    storyAlert(
      {criticality: 'alarm', state: 'active-acknowledged'},
      'acknowledged',
      'Active, acknowledged',
      '14:38:00',
      {acknowledgedBy: 'John Doe'}
    ),
    storyAlert(
      {criticality: 'alarm', state: 'rectified-unacknowledged'},
      'rectified',
      'Rectified, unacknowledged',
      '14:37:00'
    ),
    storyAlert(
      {criticality: 'alarm', state: 'normal'},
      'normal',
      'Normal',
      '14:36:00'
    ),
    storyAlert(
      {criticality: 'caution', state: 'active'},
      'caution',
      'Caution, takes no ACK',
      '14:35:00'
    ),
    storyAlert(
      {
        criticality: 'warning',
        state: 'active-unacknowledged-acknowledge-not-allowed',
      },
      'acknowledge-not-allowed',
      'Acknowledged elsewhere',
      '14:34:00'
    ),
    storyAlert(
      {criticality: 'warning', state: 'active-responsibility-transferred'},
      'transferred',
      'Responsibility transferred',
      '14:33:00'
    ),
  ];
}

/** `alertsInEveryKindOfState()` of the standard the story is drawn with. */
export function alertsInEveryKindOfStateOfTheConfiguredStandard(): StoryAlert[] {
  return alertsInEveryKindOfState(
    getAlertStandard() === isa182AlertStandard ? 'isa-18.2' : 'iec-62923'
  );
}

function criticalityAsColumnHeading(criticality: string): string {
  const words = criticality.replaceAll('-', ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Every criticality of a standard in every state it defines: one column per
 * criticality and one row per state name, with the cell left empty where
 * the criticality does not define the state. Rows follow
 * `stateNamesInRowOrder`, then any state it leaves out.
 */
export function alertStandardMatrix(
  standard: AlertStandard,
  stateNamesInRowOrder: string[],
  cell: (criticality: string, state: string) => TemplateResult
): TemplateResult {
  const criticalities = standard.criticalities;
  const criticalityNames = Object.keys(criticalities);
  const stateNames = [
    ...new Set([
      ...stateNamesInRowOrder,
      ...criticalityNames.flatMap((criticality) =>
        Object.keys(criticalities[criticality].states)
      ),
    ]),
  ];
  return html`<div
    style="display: grid; grid-template-columns: auto repeat(${
      criticalityNames.length
    }, minmax(64px, auto)); gap: 8px 16px; align-items: center; justify-items: center; font: var(--font-ui-body, 14px sans-serif);"
  >
    <div></div>
    ${criticalityNames.map(
      (criticality) =>
        html`<div>${criticalityAsColumnHeading(criticality)}</div>`
    )}
    ${stateNames.map(
      (state) =>
        html`<div style="justify-self: end">${state}</div>
          ${criticalityNames.map((criticality) =>
            state in criticalities[criticality].states
              ? cell(criticality, state)
              : html`<div></div>`
          )}`
    )}
  </div>`;
}

/**
 * The state an action moves an alert to, per standard and action. Stands in
 * for the application's alert system, which owns the transitions.
 */
const STATE_AFTER_ACTION = new Map<
  AlertStandard,
  Record<string, Record<string, string>>
>([
  [
    iec62923AlertStandard,
    {
      acknowledge: {
        'active-unacknowledged': 'active-acknowledged',
        'active-silenced': 'active-acknowledged',
        'rectified-unacknowledged': 'normal',
      },
    },
  ],
  [
    isa182AlertStandard,
    {
      acknowledge: {
        unacknowledged: 'acknowledged',
        'returned-to-normal-unacknowledged': 'normal',
      },
      shelve: {
        unacknowledged: 'shelved',
        acknowledged: 'shelved',
      },
      unshelve: {
        shelved: 'unacknowledged',
      },
    },
  ],
]);

function stateAfterAction(actionId: string, state: string): string | undefined {
  const configuredAlertStandard = getAlertStandard();
  if (configuredAlertStandard === undefined) {
    return undefined;
  }
  return STATE_AFTER_ACTION.get(configuredAlertStandard)?.[actionId]?.[state];
}

/** The alerts after `actionId` was applied to the ones named by `ids`. */
export function applyActionToAlerts<Alert extends StoryAlert>(
  alerts: Alert[],
  ids: ReadonlySet<string>,
  actionId: string
): Alert[] {
  return alerts.map((alert) => {
    const nextState = ids.has(alert.id)
      ? stateAfterAction(actionId, alert.state)
      : undefined;
    if (nextState === undefined) {
      return alert;
    }
    return {...alert, state: nextState, acknowledgedBy: 'John Doe'};
  });
}

/** Moves a menu item to the state `actionId` gives its alert. */
export function applyActionToMenuItem(
  item: ObcAlertMenuItemExperimental,
  actionId: string
): void {
  const nextState = stateAfterAction(actionId, item.state);
  if (nextState !== undefined) {
    item.state = nextState;
  }
}

/** An `obc-alert-menu-item-experimental` that applies the action a click asks for. */
export function alertMenuItem(alert: StoryAlert): TemplateResult {
  return html`<obc-alert-menu-item-experimental
    id=${alert.id}
    .criticality=${alert.criticality}
    .state=${alert.state}
    title=${alert.source ?? ''}
    description=${alert.text}
    time=${alert.time.toISOString().slice(11, 19)}
    @action-click=${(event: ObcAlertMenuItemExperimentalActionClickEvent) =>
      applyActionToMenuItem(
        event.currentTarget as ObcAlertMenuItemExperimental,
        event.detail.actionId
      )}
  ></obc-alert-menu-item-experimental>`;
}
