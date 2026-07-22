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
