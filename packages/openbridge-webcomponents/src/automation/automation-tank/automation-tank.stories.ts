import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAutomationTank,
  TankChartMode,
  TankOrientation,
  TankPositioning,
  TankTrend,
  TankType,
} from './automation-tank.js';
import './automation-tank.js';
import '../../navigation-instruments/readout-list/readout-list.js';
import '../../navigation-instruments/readout-list-item/readout-list-item.js';
import {html, nothing} from 'lit';
import {ref} from 'lit/directives/ref.js';
import {crossDecorator} from '../../storybook-util.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import type {LinearAdvice} from '../../building-blocks/instrument-linear/advice.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {Priority} from '../../navigation-instruments/types.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';

type StoryArgs = ObcAutomationTank;

// Sample time-series for the graph chart modes — values on the same scale
// as the default `max` (10_000), oscillating around the current value.
const SAMPLE_DATA = [
  {label: '00', value: 5200},
  {label: '01', value: 5600},
  {label: '02', value: 6100},
  {label: '03', value: 6800},
  {label: '04', value: 7400},
  {label: '05', value: 7900},
  {label: '06', value: 8200},
  {label: '07', value: 8600},
  {label: '08', value: 8400},
  {label: '09', value: 8100},
  {label: '10', value: 8500},
  {label: '11', value: 8900},
  {label: '12', value: 9200},
  {label: '13', value: 9000},
  {label: '14', value: 8700},
  {label: '15', value: 9000},
];

// Sample advice overlays for the graph chart modes — values use the same
// scale as the tank's `max` (10_000). Defines a low-range caution band and a
// high-range advice band so consumers can see both types at once.
const SAMPLE_ADVICE: LinearAdvice[] = [
  {min: 2500, max: 4500, type: AdviceType.caution, hinted: true},
  {min: 7500, max: 9000, type: AdviceType.advice, hinted: false},
];

// Canonical rich-detail content for the tank: an `<obc-readout-list>` of
// `<obc-readout-list-item>` rows slotted into `slot="rich"`. The list owns the
// cross-row column alignment and cap-height typography, replacing the tank's
// former hand-rolled `.rich` grid.
const renderRichReadout = () => html`
  <obc-readout-list slot="rich">
    <obc-readout-list-item
      .label=${'Temperature'}
      .value=${45}
      .hasDegree=${true}
      .unit=${'C'}
    ></obc-readout-list-item>
    <obc-readout-list-item
      .label=${'Pressure'}
      .value=${45}
      .unit=${'Pa'}
    ></obc-readout-list-item>
    <obc-readout-list-item
      .label=${'Flow speed'}
      .value=${45}
      .unit=${'m/s'}
    ></obc-readout-list-item>
  </obc-readout-list>
`;

// `richReadout` is slotted into `slot="rich"`; defaults to `nothing` so most
// stories render no detail rows. Kept as a separate helper (not the meta
// `render`) because Storybook calls `render(args, context)` with a second
// argument — `renderTank` below wraps it so that extra arg can't leak in as
// slotted content.
const renderTankEl = (args: StoryArgs, richReadout: unknown = nothing) => html`
  <obc-automation-tank
    .value=${args.value}
    .max=${args.max}
    .trend=${args.trend}
    .tag=${args.tag}
    .type=${args.type}
    .orientation=${args.orientation}
    .compact=${args.compact}
    .static=${args.static}
    ?activated=${args.activated}
    .positioning=${args.positioning}
    .chartMode=${args.chartMode}
    .chartData=${args.chartData}
    .advice=${args.advice}
    .hasAdvice=${args.hasAdvice}
    .hasGraphIcon=${args.hasGraphIcon}
    .showTrendSymbol=${args.showTrendSymbol}
    .percentFractionDigits=${args.percentFractionDigits}
    ?alert=${args.alert}
    .alertFrameType=${args.alertFrameType}
    .alertFrameThickness=${args.alertFrameThickness}
    .alertFrameStatus=${args.alertFrameStatus}
    .showAlertCategoryIcon=${args.showAlertCategoryIcon}
    .showAlertIcon=${args.showAlertIcon}
    .badgeControl=${args.badgeControl}
    .badgeAlert=${args.badgeAlert}
    .badgeInterlock=${args.badgeInterlock}
    .badgeCommandLocked=${args.badgeCommandLocked}
    .setpoint=${args.setpoint}
    .newSetpoint=${args.newSetpoint}
    .touching=${args.touching}
    .priority=${args.priority}
  >
    ${richReadout}
  </obc-automation-tank>
`;

const renderTank = (args: StoryArgs) => renderTankEl(args);

const meta: Meta<StoryArgs> = {
  title: 'Automation/Tanks/Tank',
  tags: ['autodocs', '6.0'],
  component: 'obc-automation-tank',
  args: {
    value: 9_000,
    max: 10_000,
    trend: TankTrend.fastFalling,
    tag: '#0000',
    type: TankType.generic,
    orientation: TankOrientation.vertical,
    compact: false,
    static: false,
    activated: false,
    positioning: TankPositioning.point,
    chartMode: TankChartMode.bar,
    chartData: SAMPLE_DATA,
    advice: [],
    hasAdvice: false,
    hasGraphIcon: false,
    showTrendSymbol: true,
    percentFractionDigits: 0,
    alert: false,
    alertFrameType: ObcAlertFrameType.SmallSideFlip,
    alertFrameThickness: ObcAlertFrameThickness.Small,
    alertFrameStatus: ObcAlertFrameStatus.Alarm,
    showAlertCategoryIcon: true,
    showAlertIcon: false,
    badgeControl: AutomationButtonBadgeControl.None,
    badgeAlert: AutomationButtonBadgeAlert.None,
    badgeInterlock: AutomationButtonBadgeInterlock.None,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.None,
    setpoint: undefined,
    newSetpoint: undefined,
    touching: false,
    priority: Priority.regular,
  },
  argTypes: {
    trend: {
      options: Object.values(TankTrend),
      control: {type: 'radio'},
    },
    type: {
      options: Object.values(TankType),
      control: {type: 'radio'},
    },
    orientation: {
      options: Object.values(TankOrientation),
      control: {type: 'radio'},
    },
    chartMode: {
      options: Object.values(TankChartMode),
      control: {type: 'radio'},
    },
    positioning: {
      options: Object.values(TankPositioning),
      control: {type: 'radio'},
      description:
        'Host positioning model. `point` (default) gives the host fixed default dimensions and a P&ID top-center anchor. `button` makes the host fill its parent container (100% × 100%) with no anchor offset — use this when embedding the tank inside a sized layout slot.',
    },
    value: {
      control: {type: 'range', min: 0, max: 10_000},
    },
    compact: {
      control: {type: 'boolean'},
    },
    static: {
      control: {type: 'boolean'},
    },
    activated: {
      control: {type: 'boolean'},
      description:
        'Enables the activated background color, used to indicate that the tank is activated/selected.',
    },
    hasAdvice: {
      control: {type: 'boolean'},
    },
    hasGraphIcon: {
      control: {type: 'boolean'},
      description:
        'Overlay a 32×32 decorative `<obi-tank>` centered on the chart cell. Scales with the ambient `obc-component-size-*` class (32 → 40 → 48 → 56). Works in all `chartMode` variants and both orientations.',
    },
    showTrendSymbol: {
      control: {type: 'boolean'},
      description:
        'Show the trend chevron / off icon next to the percent readout. Default `true`. Set to `false` to hide the trend indicator in both compact/static and non-compact layouts.',
    },
    percentFractionDigits: {
      control: {type: 'number', min: 0, max: 4, step: 1},
      description:
        'Number of fraction digits used to format the percent readout in the non-compact layout. Default `0` (integer percent). The compact / static layout always renders integer percent. Volume readouts (`value` / `max`) are formatted by the consumer through the `current-value` / `max-value` slots (see the `WithFractionDigits` story).',
    },
    advice: {
      control: {type: 'object'},
      description:
        'Advice overlay bands. `min`/`max` are in the same units as `max`. Toggle visibility with `hasAdvice`. Works in all three `chartMode` variants — `bar` overlays advice pills on the static bar, `graph` and `graph-and-bar` forward them to the embedded `obc-gauge-trend`.',
    },
    badgeControl: {
      options: Object.values(AutomationButtonBadgeControl),
      control: {type: 'select'},
    },
    badgeAlert: {
      options: Object.values(AutomationButtonBadgeAlert),
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
    setpoint: {
      control: {type: 'number', min: 0, max: 10_000},
      description:
        'Target setpoint on the `value` / `max` scale. Renders a setpoint marker on the bar (`bar` mode) or on the side bar of the embedded `obc-gauge-trend` (`graph-and-bar` mode). `undefined` hides the marker.',
    },
    newSetpoint: {
      control: {type: 'number', min: 0, max: 10_000},
      description:
        'Adjustment preview for the 2-step setpoint interface. When defined, the original marker dims and a focus-state preview marker is shown.',
    },
    touching: {
      control: {type: 'boolean'},
      description:
        'User is physically interacting with the setpoint control — renders the marker in focus state and suppresses at-setpoint detection.',
    },
    priority: {
      options: Object.values(Priority),
      control: {type: 'select'},
    },
    alert: {control: {type: 'boolean'}},
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
    showAlertCategoryIcon: {control: {type: 'boolean'}},
    showAlertIcon: {control: {type: 'boolean'}},
  },
  decorators: [crossDecorator],
  render: renderTank,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Generic: Story = {
  args: {type: TankType.generic},
};

export const AtmosphericWithBadges: Story = {
  args: {
    type: TankType.atmospheric,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeAlert: AutomationButtonBadgeAlert.Silence,
    badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
  },
};

export const Pressurized: Story = {
  args: {type: TankType.pressurized},
};

export const Battery: Story = {
  args: {type: TankType.battery},
};

/**
 * Activated tank — the `activated` background color is painted on the halo
 * surround to indicate the tank is activated/selected. Mirrors the
 * `activated` state of `obc-automation-button`.
 */
export const Activated: Story = {
  args: {
    type: TankType.atmospheric,
    activated: true,
  },
};

/**
 * Compact activated tank — the activated background color also applies in the
 * compact layout, where the halo wraps the badges, tank-frame, readout and
 * tag cells.
 */
export const CompactActivated: Story = {
  args: {
    compact: true,
    type: TankType.atmospheric,
    activated: true,
  },
};

export const CompactAtmospheric: Story = {
  args: {compact: true, type: TankType.atmospheric},
};

export const HorizontalCompactAtmospheric: Story = {
  args: {
    compact: true,
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
  },
};

export const StaticAtmosphericWithBadges: Story = {
  args: {
    static: true,
    type: TankType.atmospheric,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeAlert: AutomationButtonBadgeAlert.Silence,
    badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
  },
};

export const StaticBattery: Story = {
  args: {static: true, type: TankType.battery},
};

export const HorizontalStaticAtmospheric: Story = {
  args: {
    static: true,
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
  },
};

export const HorizontalAtmospheric: Story = {
  args: {
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
  },
};

export const Graph: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graph,
  },
};

export const GraphAndBar: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
  },
};

export const HorizontalGraphAndBar: Story = {
  args: {
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
  },
};

export const GraphWithAdvice: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graph,
    hasAdvice: true,
    advice: SAMPLE_ADVICE,
  },
};

export const BarWithAdvice: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.bar,
    hasAdvice: true,
    advice: SAMPLE_ADVICE,
  },
};

/**
 * Setpoint marker on the compact tank bar — the marker renders on the SVG bar
 * via the shared setpoint system. Values share the tank's `value` / `max`
 * scale. Matches the Figma "Tank Generic" small variant, which includes a
 * setpoint indicator on the tank bar.
 */
export const CompactWithSetpoint: Story = {
  args: {
    compact: true,
    type: TankType.atmospheric,
    trend: TankTrend.stable,
    setpoint: 7_500,
  },
};

/**
 * Setpoint marker in `graph-and-bar` mode — forwarded to the embedded
 * `obc-gauge-trend`, which renders it on its side bar.
 */
export const GraphAndBarWithSetpoint: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
    setpoint: 7_500,
  },
};

export const BarWithGraphIcon: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.bar,
    hasGraphIcon: true,
  },
};

export const HorizontalGraphAndBarWithGraphIcon: Story = {
  args: {
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
    hasAdvice: true,
    advice: SAMPLE_ADVICE,
    hasGraphIcon: true,
  },
};

/**
 * Battery tank with the decorative graph icon enabled — renders an
 * `<obi-energy-battery>` instead of the default tank silhouette.
 */
export const BatteryWithGraphIcon: Story = {
  args: {
    type: TankType.battery,
    chartMode: TankChartMode.graphAndBar,
    hasGraphIcon: true,
  },
};

export const Rich: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
  },
  render: (args) => renderTankEl(args, renderRichReadout()),
};

export const HorizontalRich: Story = {
  args: {
    type: TankType.atmospheric,
    orientation: TankOrientation.horizontal,
    chartMode: TankChartMode.graphAndBar,
  },
  render: (args) => renderTankEl(args, renderRichReadout()),
};

/**
 * Demonstrates fractional precision in the non-compact readout. The percent
 * readout is controlled by the `percentFractionDigits` property (here `1`,
 * yielding e.g. `25.0%`). The absolute value / max readouts are formatted
 * by the consumer through the `current-value` and `max-value` slots — the
 * component's default rendering uses `.toFixed(0)`, so any decimals must be
 * supplied by the slotted markup. A custom `unit` slot is used too (litres
 * instead of m³).
 *
 * The compact / static layouts only show the percent (no absolute value)
 * and always render it as an integer to keep their fixed-width footprint
 * stable, so fraction-digit control only applies to the non-compact layout.
 *
 * The rich detail rows are now consumer-slotted (`slot="rich"`, canonically an
 * `<obc-readout-list>`); each `<obc-readout-list-item>` owns its own
 * `fractionDigits`, so `percentFractionDigits` no longer affects them.
 */
export const WithFractionDigits: Story = {
  args: {
    type: TankType.atmospheric,
    value: 1.25,
    max: 5,
    trend: TankTrend.rising,
    tag: 'FUEL',
    percentFractionDigits: 1,
  },
  render: (args) => html`
    <obc-automation-tank
      .value=${args.value}
      .max=${args.max}
      .trend=${args.trend}
      .tag=${args.tag}
      .type=${args.type}
      .orientation=${args.orientation}
      .compact=${args.compact}
      .static=${args.static}
      .positioning=${args.positioning}
      .chartMode=${args.chartMode}
      .chartData=${args.chartData}
      .advice=${args.advice}
      .hasAdvice=${args.hasAdvice}
      .hasGraphIcon=${args.hasGraphIcon}
      .showTrendSymbol=${args.showTrendSymbol}
      .priority=${args.priority}
      .percentFractionDigits=${args.percentFractionDigits}
    >
      <span slot="current-value">${args.value.toFixed(2)}</span>
      <span slot="max-value">${args.max.toFixed(2)}</span>
      <span slot="unit">L</span>
    </obc-automation-tank>
  `,
};

/**
 * Alarm-status alert frame on a vertical atmospheric tank. The ring overlays
 * the halo (bordered tank area only); the readout and tag below it remain
 * visually unaffected. The label is slotted via `alert-label`.
 */
export const WithAlertAlarm: Story = {
  args: {
    type: TankType.atmospheric,
    alert: true,
    alertFrameStatus: ObcAlertFrameStatus.Alarm,
    alertFrameType: ObcAlertFrameType.SmallSideFlip,
  },
  render: (args) => html`
    <obc-automation-tank
      .value=${args.value}
      .max=${args.max}
      .trend=${args.trend}
      .tag=${args.tag}
      .type=${args.type}
      .orientation=${args.orientation}
      .compact=${args.compact}
      .static=${args.static}
      .positioning=${args.positioning}
      .chartMode=${args.chartMode}
      .chartData=${args.chartData}
      .advice=${args.advice}
      .hasAdvice=${args.hasAdvice}
      .hasGraphIcon=${args.hasGraphIcon}
      .showTrendSymbol=${args.showTrendSymbol}
      .percentFractionDigits=${args.percentFractionDigits}
      ?alert=${args.alert}
      .alertFrameType=${args.alertFrameType}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameStatus=${args.alertFrameStatus}
      .showAlertCategoryIcon=${args.showAlertCategoryIcon}
      .showAlertIcon=${args.showAlertIcon}
      .priority=${args.priority}
    >
      <span slot="alert-label">Fire alert</span>
    </obc-automation-tank>
  `,
};

/**
 * Warning-status alert on a horizontal atmospheric tank — demonstrates the
 * ring tracks the tank's host orientation correctly.
 */
export const WithAlertWarningHorizontal: Story = {
  ...WithAlertAlarm,
  args: {
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
    alert: true,
    alertFrameStatus: ObcAlertFrameStatus.Warning,
    alertFrameType: ObcAlertFrameType.SmallSideFlip,
  },
};

/**
 * Caution-status alert on a compact tank — the ring includes the badges row
 * because `.halo` wraps both badges and the tank-frame in compact mode.
 */
export const WithAlertCautionCompact: Story = {
  ...WithAlertAlarm,
  args: {
    compact: true,
    type: TankType.atmospheric,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
    alert: true,
    alertFrameStatus: ObcAlertFrameStatus.Caution,
    alertFrameType: ObcAlertFrameType.BottomFlip,
  },
};

export const WithAlertLevelCritical: Story = {
  ...WithAlertAlarm,
  args: {
    type: TankType.atmospheric,
    alert: true,
    alertFrameStatus: ObcAlertFrameStatus.LevelCritical,
    alertFrameType: ObcAlertFrameType.SmallSideFlip,
    badgeAlert: AutomationButtonBadgeAlert.LevelCritical,
  },
};

export const WithAlertLevelDiagnostic: Story = {
  ...WithAlertAlarm,
  args: {
    type: TankType.atmospheric,
    alert: true,
    alertFrameStatus: ObcAlertFrameStatus.LevelDiagnostic,
    alertFrameType: ObcAlertFrameType.Regular,
    badgeAlert: AutomationButtonBadgeAlert.LevelDiagnostic,
  },
};

/**
 * Demonstrates `positioning="button"`: the tank host fills its parent
 * container (100% × 100%) with no P&ID anchor offset, so it behaves like a
 * regular button placed inside a sized layout slot. Drag the corner of the
 * dashed container to resize it — the tank fills the new footprint, and any
 * extra space flows into the chart cell (textual cells stay min-content).
 * All controls (orientation, type, compact, static, chart mode, etc.)
 * remain functional.
 *
 * Contrast with the default `positioning="point"` used by every other
 * story, which gives the host fixed default dimensions and a P&ID
 * top-center anchor for placement on a pipe-grid coordinate.
 */
export const Responsive: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
    hasAdvice: true,
    advice: SAMPLE_ADVICE,
    badgeControl: AutomationButtonBadgeControl.Auto,
    badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
    positioning: TankPositioning.button,
  },
  decorators: [],
  render(args) {
    return html`
      <div
        style="
          resize: both;
          overflow: hidden;
          width: 320px;
          height: 480px;
          min-width: 120px;
          min-height: 120px;
          border: 2px dashed var(--instrument-frame-tertiary-color);
          box-sizing: border-box;
        "
      >
        <obc-automation-tank
          .value=${args.value}
          .max=${args.max}
          .trend=${args.trend}
          .tag=${args.tag}
          .type=${args.type}
          .orientation=${args.orientation}
          .compact=${args.compact}
          .static=${args.static}
          .positioning=${args.positioning}
          .chartMode=${args.chartMode}
          .chartData=${args.chartData}
          .advice=${args.advice}
          .hasAdvice=${args.hasAdvice}
          .hasGraphIcon=${args.hasGraphIcon}
          .showTrendSymbol=${args.showTrendSymbol}
          .percentFractionDigits=${args.percentFractionDigits}
          ?alert=${args.alert}
          .alertFrameType=${args.alertFrameType}
          .alertFrameThickness=${args.alertFrameThickness}
          .alertFrameStatus=${args.alertFrameStatus}
          .showAlertCategoryIcon=${args.showAlertCategoryIcon}
          .showAlertIcon=${args.showAlertIcon}
          .badgeControl=${args.badgeControl}
          .badgeAlert=${args.badgeAlert}
          .badgeInterlock=${args.badgeInterlock}
          .badgeCommandLocked=${args.badgeCommandLocked}
          .priority=${args.priority}
        >
        </obc-automation-tank>
      </div>
    `;
  },
};

// ---------------------------------------------------------------------------
// Ignition Perspective flex-repeater reproduction
// ---------------------------------------------------------------------------
// Mirrors the DOM an `ia.display.flex-repeater` produces for the Vessel /
// Tank Status page: a wrapping flex line of instances whose cross-axis size is
// content-derived (`elementPosition.basis: "auto"`, `useDefaultViewHeight` and
// `useDefaultViewWidth` both `false`), each instance holding a column
// `ia.container.flex` with the tank at `align: center, grow: 1`. The
// obc-perspective wrapper defaults `positioning` to `button`, so the tank host
// is `width/height: 100%` with the min-size floors dropped.

const REPEATER_TANKS = [
  {tag: 'FO TOT', value: 61.4, max: 76.21, points: 8},
  {tag: 'FO SERV SB', value: 0.82, max: 1.06, points: 11},
  {tag: 'FO SERV PS', value: 0.41, max: 1.06, points: 14},
  {tag: 'OVERFLOW', value: 2.3, max: 17.4, points: 17},
  {tag: 'AFT SB FO', value: 14.9, max: 17.4, points: 20},
  {tag: 'FWD SB FO', value: 8.7, max: 20.26, points: 23},
  {tag: 'FWD PS FO', value: 17.2, max: 19.03, points: 12},
  {tag: 'UREA', value: 3.9, max: 5.5, points: 16},
];

// Series lengths deliberately differ per tank, matching real repeater data.
const repeaterSeries = (points: number, seed: number) =>
  Array.from({length: points}, (_, i) => ({
    label: String(i).padStart(2, '0'),
    value: 2_000 + (((i + seed) * 1_900) % 7_000),
  }));

/**
 * Instrumentation: records the distinct rendered sizes of every tank host. A
 * settled layout converges on one size per tank and stops calling back; a
 * non-convergent one keeps accumulating sizes. Also reports whether the chart
 * cell actually has a renderer in it, and keeps a rolling trace of the first
 * tank so a few-pixel ringing is legible.
 */
const probeResets = new WeakMap<Element, () => void>();
const probeStops = new WeakMap<Element, () => void>();

const attachOscillationProbe = (container?: Element): void => {
  if (!container) return;
  probeStops.get(container)?.();

  // Deferred one frame: the ref callback commits before the sibling template
  // parts that create the readout panel and the tanks.
  const startFrame = requestAnimationFrame(() => {
    const panel = container.querySelector('.probe-readout');
    const tanks = Array.from(container.querySelectorAll('obc-automation-tank'));
    if (!panel || tanks.length === 0) return;

    let sizes = tanks.map(() => new Set<string>());
    let callbacks = tanks.map(() => 0);
    let trace: string[] = [];

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const index = tanks.findIndex((tank) => tank === entry.target);
        if (index < 0) continue;
        const size = `${Math.round(entry.contentRect.width)}×${Math.round(entry.contentRect.height)}`;
        sizes[index].add(size);
        callbacks[index] += 1;
        if (index === 0) trace = [...trace, size].slice(-14);
      }
    });
    tanks.forEach((tank) => observer.observe(tank));

    const reportTimer = window.setInterval(() => {
      const lines = tanks.map((tank, index) => {
        const label = (tank as ObcAutomationTank).tag || `tank ${index}`;
        const cell = tank.shadowRoot?.querySelector('.bar-container');
        const chart = cell && cell.children.length > 0 ? 'yes' : 'NO ';
        const now = [...sizes[index]].pop() ?? '—';
        return `${label.padEnd(9)} ${String(sizes[index].size).padStart(4)} sizes ${String(callbacks[index]).padStart(5)} cb  chart:${chart}  now ${now}`;
      });
      panel.textContent = `${lines.join('\n')}\n\ntrace (${(tanks[0] as ObcAutomationTank).tag}): ${trace.join('  ')}`;
    }, 250);

    probeResets.set(container, () => {
      sizes = tanks.map(() => new Set<string>());
      callbacks = tanks.map(() => 0);
      trace = [];
    });

    // Each layout change makes the tanks ring for about a second and land on a
    // different width. In the gateway the loop is self-sustaining; in isolation
    // it damps out, so this nudges the row by a scrollbar's width to keep
    // supplying the relayouts a live page gets for free. Driving `value`,
    // digit count, slotted text or new chartData identities was tried first and
    // none of them moves the layout at all.
    let nudgeTimer = 0;
    const row = container.querySelector('[data-row]') as HTMLElement | null;
    if (container.hasAttribute('data-tick') && row) {
      let wide = false;
      nudgeTimer = window.setInterval(() => {
        wide = !wide;
        row.style.width = wide ? 'calc(100% - 14px)' : '100%';
      }, 1_200);
    }

    probeStops.set(container, () => {
      observer.disconnect();
      window.clearInterval(reportTimer);
      if (nudgeTimer) window.clearInterval(nudgeTimer);
    });
  });

  probeStops.set(container, () => cancelAnimationFrame(startFrame));
};

// Row geometry. `DEFINITE_*` pins both axes (the layout that behaves); the
// `FREE_*` variants hand an axis back to content, which is what
// `elementPosition.basis: "auto"` / `useDefaultViewHeight: false` and the tank's
// `align: center` do in Perspective.
const DEFINITE_ROW = 'display: flex; height: 420px;';
const FREE_HEIGHT_ROW = 'display: flex;';
const DEFINITE_INSTANCE =
  'flex: 0 0 auto; width: 320px; padding: 5px; box-sizing: border-box;';

const rootOf = (el: EventTarget | null) =>
  (el as HTMLElement | null)?.closest(
    '[data-probe-root]'
  ) as HTMLElement | null;

// `_cellWidth` / `_cellHeight` survive a detach, so the cold-start deadlock can
// only be shown on genuinely fresh elements. Every tank must come out before any
// goes back in — otherwise the remaining siblings hold the row open and the
// replacements measure a non-zero cell.
const remountTanks = (root: HTMLElement): void => {
  const specs = [...root.querySelectorAll('obc-automation-tank')].map(
    (node) => {
      const old = node as ObcAutomationTank;
      return {
        parent: old.parentElement,
        style: old.getAttribute('style') ?? '',
        props: {
          value: old.value,
          max: old.max,
          tag: old.tag,
          type: old.type,
          positioning: old.positioning,
          chartMode: old.chartMode,
          chartData: old.chartData,
          showTrendSymbol: old.showTrendSymbol,
          percentFractionDigits: old.percentFractionDigits,
        },
      };
    }
  );
  specs.forEach((spec) =>
    spec.parent?.querySelector('obc-automation-tank')?.remove()
  );
  specs.forEach((spec) => {
    const fresh = document.createElement(
      'obc-automation-tank'
    ) as ObcAutomationTank;
    Object.assign(fresh, spec.props);
    fresh.setAttribute('style', spec.style);
    spec.parent?.appendChild(fresh);
  });
};

const applyLayout = (
  target: EventTarget | null,
  rowStyle: string,
  instanceStyle: string,
  remount = false
): void => {
  const root = rootOf(target);
  const repeater = root?.querySelector('[data-repeater]') as HTMLElement | null;
  if (!root || !repeater) return;
  repeater.setAttribute('style', rowStyle);
  [...repeater.children].forEach((child) =>
    child.setAttribute('style', instanceStyle)
  );
  if (remount) {
    remountTanks(root);
    attachOscillationProbe(root);
    return;
  }
  probeResets.get(root)?.();
};

const buttonStyle = 'padding: 6px 10px;';

/*
 * SHARED ROOT CAUSE (all three bug stories below)
 * Root cause (all three stories): the tank measures .bar-container with a
 * ResizeObserver into _cellWidth / _cellHeight (automation-tank.ts ~L420) and
 * passes them to the chart as its reference size. The chart converts that back
 * into intrinsic pixels, which changes the very box that was measured.
 *
 * An axis left to content therefore never resolves to a stable value. Pinning the
 * axis breaks the loop, which is why giving the row a definite size fixes all
 * three.
 */

const renderScenario = (
  args: StoryArgs,
  rowStyle: string,
  instanceStyle: string,
  controls: unknown,
  rowWidth = 1_800
) => html`
  <!-- Inline position beats the shared crossDecorator's
       \`.wrapper > * {position:absolute; top:50%; left:50%}\`, which would push
       these full-width layouts into the bottom-right quadrant. -->
  <div
    data-probe-root
    style="position: static; padding: 8px;"
    ${ref(attachOscillationProbe)}
  >
    <div
      style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 8px;"
    >
      ${controls}
    </div>
    <pre
      class="probe-readout"
      style="
        margin: 0 0 8px;
        padding: 8px;
        font: 12px/1.5 monospace;
        white-space: pre;
        color: var(--element-neutral-color);
        border: 1px solid var(--border-divider-color);
      "
    >
sampling…</pre
    >
    <!-- Scrolls rather than clips, so a runaway never grows the page itself. -->
    <div
      style="height: 460px; overflow: auto; border: 1px dashed var(--border-divider-color);"
    >
      <div data-row style="width: ${rowWidth}px;">
        <div data-repeater style=${rowStyle}>
          ${REPEATER_TANKS.map(
            (tank, index) => html`
              <div style=${instanceStyle}>
                <div
                  style="display: flex; flex-direction: column; height: 100%; padding: 8px; box-sizing: border-box; border: 1px solid var(--border-divider-color);"
                >
                  <obc-automation-tank
                    style="align-self: center; flex-grow: 1;"
                    .value=${tank.value}
                    .max=${tank.max}
                    .tag=${tank.tag}
                    .type=${args.type}
                    .positioning=${TankPositioning.button}
                    .chartMode=${args.chartMode}
                    .chartData=${repeaterSeries(tank.points, index)}
                    .showTrendSymbol=${false}
                    .percentFractionDigits=${1}
                  ></obc-automation-tank>
                </div>
              </div>
            `
          )}
        </div>
      </div>
    </div>
  </div>
`;

// Byte-for-byte replica of the DOM and inline styles Perspective emits for an
// `ia.display.flex-repeater`, read off a running Ignition gateway. The details
// that matter and are easy to get wrong:
//   - the instance uses min-height/max-height, NOT height, so its `height`
//     property is `auto` and the tank's `height: 100%` never resolves
//   - a component wrapper div sits between the instance and the tank, carrying
//     `align-self: center; flex: 1 1 auto` from the tank's `position`
//   - `.responsive-container > *` sets min-width/min-height to 0
const PERSPECTIVE_REPEATER =
  'display: flex; overflow: auto; flex-flow: row; place-content: stretch flex-start; align-items: stretch; flex: 0 0 360px;';
const PERSPECTIVE_INSTANCE =
  'display: flex; overflow: auto; flex-flow: column; place-content: stretch flex-start; align-items: stretch; min-height: 340px; max-height: 340px; flex: 1 1 auto; margin: 4px; min-width: 0;';
const PERSPECTIVE_INSTANCE_PINNED =
  'display: flex; overflow: auto; flex-flow: column; place-content: stretch flex-start; align-items: stretch; min-height: 340px; max-height: 340px; flex: 0 0 160px; width: 160px; margin: 4px; min-width: 0;';
// `.obc-automation-tank-component` — `align-self: center; flex: 1 1 auto` comes
// from the tank's `position: {align: "center", grow: 1}`.
const PERSPECTIVE_WRAPPER =
  'align-self: center; flex: 1 1 auto; min-width: 0; min-height: 0;';

const renderPerspectiveReplica = (args: StoryArgs, controls: unknown) => html`
  <div
    data-probe-root
    data-tick
    style="position: static; padding: 8px;"
    ${ref(attachOscillationProbe)}
  >
    <div
      style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 8px;"
    >
      ${controls}
    </div>
    <pre
      class="probe-readout"
      style="
        margin: 0 0 8px;
        padding: 8px;
        font: 12px/1.5 monospace;
        white-space: pre;
        color: var(--element-neutral-color);
        border: 1px solid var(--border-divider-color);
      "
    >
sampling…</pre
    >
    <div data-row style="width: 100%;">
      <div data-repeater style=${PERSPECTIVE_REPEATER}>
        ${REPEATER_TANKS.map(
          (tank, index) => html`
            <div style=${PERSPECTIVE_INSTANCE}>
              <div style=${PERSPECTIVE_WRAPPER}>
                <obc-automation-tank
                  .value=${tank.value}
                  .max=${tank.max}
                  .tag=${tank.tag}
                  .type=${args.type}
                  .positioning=${TankPositioning.button}
                  .chartMode=${args.chartMode}
                  .chartData=${repeaterSeries(tank.points, index)}
                  .showTrendSymbol=${false}
                  .percentFractionDigits=${1}
                >
                  <span slot="current-value" data-current-value
                    >${tank.value}</span
                  >
                  <span slot="max-value">${tank.max}</span>
                </obc-automation-tank>
              </div>
            </div>
          `
        )}
      </div>
    </div>
  </div>
`;

const scenarioArgs = {
  type: TankType.atmospheric,
  positioning: TankPositioning.button,
  showTrendSymbol: false,
  percentFractionDigits: 1,
} satisfies Partial<StoryArgs>;

/**
 * **Bug 1 — the chart never initialises.**
 *
 * The row is mounted with no definite height, so `.bar-container` measures 0 on
 * the first pass, `_cellHeight` stays 0 and the `hasSize` guard renders an empty
 * chart cell. Because the cell is then permanently empty it never gains height,
 * so it never recovers.
 *
 * On load every tank reports `chart:NO` and sits at its min-content size
 * (≈258×143 instead of 258×392). Press *Give the row a definite height* and the
 * charts appear immediately — the component is fine, it just cannot bootstrap
 * itself from a content-sized container.
 */
export const BugChartCellNeverInitialises: Story = {
  args: {...scenarioArgs, chartMode: TankChartMode.graphAndBar},
  decorators: [],
  render: (args) =>
    renderScenario(
      args,
      FREE_HEIGHT_ROW,
      DEFINITE_INSTANCE,
      html`
        <button
          type="button"
          style=${buttonStyle}
          @click=${(e: Event) =>
            applyLayout(e.currentTarget, DEFINITE_ROW, DEFINITE_INSTANCE)}
        >
          Give the row a definite height (fixes it)
        </button>
        <button
          type="button"
          style=${buttonStyle}
          @click=${(e: Event) =>
            applyLayout(
              e.currentTarget,
              FREE_HEIGHT_ROW,
              DEFINITE_INSTANCE,
              true
            )}
        >
          Remount into a content-sized row (breaks it again)
        </button>
      `
    ),
};

/**
 * **Bug 2 — unbounded vertical growth**, `chartMode: bar`.
 *
 * Starts with both axes definite and settled at 292×392. Press *Release the row
 * height* and the tank grows forever: measured 252 distinct sizes and 252 resize
 * callbacks in 4s, climbing 292×392 → 292×1857 and still going. Watch the
 * `now` column and the trace in the readout.
 *
 * The row is inside a scrollable dashed box so the page itself never grows — on
 * a real page this is what silently adds scrollbars.
 *
 * `obc-bar-vertical` writes inline `width: auto; height: 100%` onto its own host
 * in `_applyFixedAspectRatioStyles()`, so its height comes from the measurement
 * the tank took of the cell that contains it.
 */
export const BugUnboundedVerticalGrowth: Story = {
  args: {...scenarioArgs, chartMode: TankChartMode.bar},
  decorators: [],
  render: (args) =>
    renderScenario(
      args,
      DEFINITE_ROW,
      DEFINITE_INSTANCE,
      html`
        <button
          type="button"
          style=${buttonStyle}
          @click=${(e: Event) =>
            applyLayout(e.currentTarget, FREE_HEIGHT_ROW, DEFINITE_INSTANCE)}
        >
          Release the row height (reproduce)
        </button>
        <button
          type="button"
          style=${buttonStyle}
          @click=${(e: Event) =>
            applyLayout(e.currentTarget, DEFINITE_ROW, DEFINITE_INSTANCE)}
        >
          Reset
        </button>
      `
    ),
};

/**
 * **Bug 3 — damped horizontal ringing**, `chartMode: graph` / `graph-and-bar`.
 *
 * Press *Release both axes*, then *Toggle row width ±15px*.
 *
 * With both axes content-derived and the row over-subscribed enough for
 * flex-shrink to be active, the width overshoots and rings before settling —
 * 274 → 281 → 272 → 273 → 273 → 272 over roughly a second. It is a damped
 * oscillator, not a free-running loop, so a single release rings once and stops.
 *
 * The toggle makes that falsifiable: it drives the row between exactly **two**
 * widths, so a well-behaved component would visit exactly two sizes. Instead the
 * `sizes` counter climbs past 35 and the trace shows intermediate values
 * (296 → 297 → 297 → 298 → 296) that correspond to no input.
 *
 * Caveat: this is a *damped* oscillator with a 3–7px amplitude that settles
 * within a few seconds. It reproduces the measurable non-convergence but not the
 * continuous bouncing seen in the field, whose source of repeated perturbation
 * has not been identified.
 *
 * Both axes must be free — pinning either one alone removes it, which is why
 * only the combination of `align: center` → stretch *and* a definite
 * `elementPosition.basis` fixed the Perspective view.
 *
 * It also only rings inside a row-width band. With six tanks that is roughly
 * 1200–1950px; outside it the layout settles immediately. Use the slider to
 * sweep it.
 */
/*
 * BUG 3 — NOTES FOR THE MAINTAINER
 * (see SHARED_ROOT_CAUSE above)
 *
 * obc-gauge-trend hardcodes fixedAspectRatioScaling = true (gauge-trend.ts:155).
 * chart-line-base updateComputedDimensions() (L1795) derives a pixel height from
 * the measured width and publishes it as an inline --chart-height (L2189), while
 * chart-common.css gives the chart host a width but NO height. So the chart height
 * is intrinsic content computed from its own measured width, and the tank content
 * width depends on that height. The width has no fixed point.
 *
 * This story is a replica of the DOM and inline styles Perspective emits for an
 * ia.display.flex-repeater, read off a running Ignition gateway. The details that
 * make or break the reproduction:
 *
 *   1. The instance uses min-height/max-height: 340px, NOT height. The box looks
 *      340px tall but its height PROPERTY is auto, so the tank height: 100% never
 *      resolves and falls back to content. Using height: 340px instead makes the
 *      whole thing stable and hides the bug.
 *   2. A component wrapper div sits between instance and tank carrying
 *      align-self: center + flex: 1 1 auto, from the tank position
 *      {align: "center", grow: 1}. align-self: center is what makes the width
 *      shrink-to-fit, i.e. content-derived.
 *   3. .responsive-container > * sets min-width/min-height to 0, so nothing floors
 *      the shrink.
 *   4. instance flex: 1 1 auto and repeater align-items: stretch.
 *   5. The values are the vessel ones (61.4 / 76.21 ...). With large values the
 *      readout text pins the width and the bug disappears.
 *
 * In Perspective terms this is useDefaultViewHeight: true + useDefaultViewWidth:
 * false: height pinned so every chart initialises, width content-derived and free.
 *
 * A ticker rewrites every value once a second, standing in for the tag binding.
 *
 * Measured in Ignition, project data/projects/tank-resize-repro on the container
 * gateway (port 8090): 8 tanks on one line, every chart rendered, 5-8 distinct
 * sizes and 10 resize callbacks per tank in 12s, container fixed at 1400x360 and
 * the page never scrolling.
 *
 * This is NOT a consumer CSS mistake. The same markup with chartMode bar is
 * stable, and giving the tank a definite size does not fix the component, it just
 * stops asking it a question it cannot answer.
 *
 * CAPTURED FROM THE RUNNING GATEWAY. A MutationObserver + ResizeObserver on the
 * Ignition page recorded this, with no input of any kind - the loop is
 * self-sustaining and needs no tag updates at all:
 *
 *   13   ATTR   GAUGE-TREND.width = 288
 *   51   ATTR   GAUGE-TREND.style --chart-height: 231px
 *   91   RESIZE TANK 149x340 / CELL 121x226
 *   97   ATTR   GAUGE-TREND.width = 121
 *   143  ATTR   --chart-height: 219px
 *   205  ATTR   --chart-height: 217px
 *   245  ATTR   --chart-height: 232px
 *   363  ATTR   GAUGE-TREND.width = 133
 *   449  RESIZE TANK 164x340
 *   455  ATTR   GAUGE-TREND.width = 136
 *   ...  TANK width goes 149 -> 164 -> 162 -> 174 -> 160 -> ... indefinitely
 *
 * That is the closed loop in one trace: --chart-height (px) -> canvas intrinsic
 * width -> tank max-content width -> instance width -> cell width ->
 * gauge-trend.width -> --chart-height.
 *
 * Two conditions are easy to get wrong when reproducing:
 *   - type must be "generic". The atmospheric caps widen the tank's min-content
 *     enough that the text pins the width and the loop never engages.
 *   - the values must be small (61.4 / 76.21). With large values the readout text
 *     pins min-content and the bug disappears.
 *
 * KNOWN GAP: this isolated story rings on load (9-11 distinct sizes, 12 resize
 * callbacks per tank, tank width 161 which matches the gateway's ~160) and then
 * settles, whereas the gateway never settles. Driving value, digit count, slotted
 * text and new chartData identities were all tried and none sustains it here. The
 * Ignition project remains the authoritative reproduction of the sustained
 * symptom.
 *
 * How to read it: compare the sizes and cb counters against the pinned state.
 * Press "Pin the width" and they drop to 1 size / 1 callback immediately.
 */

export const BugHorizontalRinging: Story = {
  // `generic` matches the Tank Status page; the atmospheric caps widen
  // min-content enough to hide the loop.
  args: {
    ...scenarioArgs,
    type: TankType.generic,
    chartMode: TankChartMode.graphAndBar,
  },
  decorators: [],
  render: (args) =>
    renderPerspectiveReplica(
      args,
      html`
        <button
          type="button"
          style=${buttonStyle}
          @click=${(e: Event) =>
            applyLayout(
              e.currentTarget,
              PERSPECTIVE_REPEATER,
              PERSPECTIVE_INSTANCE_PINNED
            )}
        >
          Pin the width (fix)
        </button>
        <button
          type="button"
          style=${buttonStyle}
          @click=${(e: Event) =>
            applyLayout(
              e.currentTarget,
              PERSPECTIVE_REPEATER,
              PERSPECTIVE_INSTANCE
            )}
        >
          Free the width (reproduce)
        </button>
      `
    ),
};
