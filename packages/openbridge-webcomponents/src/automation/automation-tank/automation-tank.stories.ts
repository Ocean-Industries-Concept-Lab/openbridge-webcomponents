import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAutomationTank,
  TankChartMode,
  TankOrientation,
  TankTrend,
  TankType,
} from './automation-tank.js';
import './automation-tank.js';
import '../../components/badge/badge.js';
import '../../icons/icon-auto.js';
import '../../icons/icon-command-locked-f.js';
import {html} from 'lit';
import {crossDecorator} from '../../storybook-util.js';
import {BadgeType, BadgeSize} from '../../components/badge/badge.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
import type {LinearAdvice} from '../../building-blocks/instrument-linear/advice.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';

// Story-only args. `showDefaultBadges` is not a component property — it's a Storybook
// toggle that injects two default badges into the `badges` slot so consumers
// can flip them on/off without writing custom render functions.
type StoryArgs = ObcAutomationTank & {showDefaultBadges: boolean};

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

const defaultBadges = html`
  <obc-badge
    slot="badges"
    .size=${BadgeSize.regular}
    .showNumber=${false}
    .type=${BadgeType.automation}
    .showIcon=${true}
  >
    <obi-auto slot="badge-icon"></obi-auto>
  </obc-badge>
  <obc-badge
    slot="badges"
    .size=${BadgeSize.regular}
    .showNumber=${false}
    .type=${BadgeType.automation}
    .showIcon=${true}
  >
    <obi-command-locked-f slot="badge-icon"></obi-command-locked-f>
  </obc-badge>
`;

const renderTank = (args: StoryArgs) => html`
  <obc-automation-tank
    .value=${args.value}
    .max=${args.max}
    .trend=${args.trend}
    .tag=${args.tag}
    .type=${args.type}
    .orientation=${args.orientation}
    .compact=${args.compact}
    .static=${args.static}
    .chartMode=${args.chartMode}
    .chartData=${args.chartData}
    .advice=${args.advice}
    .hasAdvice=${args.hasAdvice}
    .hasGraphIcon=${args.hasGraphIcon}
    .showTrendSymbol=${args.showTrendSymbol}
    ?alert=${args.alert}
    .alertFrameType=${args.alertFrameType}
    .alertFrameThickness=${args.alertFrameThickness}
    .alertFrameStatus=${args.alertFrameStatus}
    .showAlertCategoryIcon=${args.showAlertCategoryIcon}
    .showAlertIcon=${args.showAlertIcon}
  >
    ${args.showDefaultBadges ? defaultBadges : null}
  </obc-automation-tank>
`;

const meta: Meta<StoryArgs> = {
  title: 'Automation/Tanks/Tank',
  tags: ['autodocs'],
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
    chartMode: TankChartMode.bar,
    chartData: SAMPLE_DATA,
    advice: [],
    hasAdvice: false,
    hasGraphIcon: false,
    showTrendSymbol: true,
    alert: false,
    alertFrameType: ObcAlertFrameType.SmallSideFlip,
    alertFrameThickness: ObcAlertFrameThickness.Small,
    alertFrameStatus: ObcAlertFrameStatus.Alarm,
    showAlertCategoryIcon: true,
    showAlertIcon: false,
    showDefaultBadges: false,
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
    value: {
      control: {type: 'range', min: 0, max: 10_000},
    },
    compact: {
      control: {type: 'boolean'},
    },
    static: {
      control: {type: 'boolean'},
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
    advice: {
      control: {type: 'object'},
      description:
        'Advice overlay bands. `min`/`max` are in the same units as `max`. Toggle visibility with `hasAdvice`. Works in all three `chartMode` variants — `bar` overlays advice pills on the static bar, `graph` and `graph-and-bar` forward them to the embedded `obc-gauge-trend`.',
    },
    showDefaultBadges: {
      control: {type: 'boolean'},
      description:
        'Storybook-only toggle for visual/layout testing — not part of the component API. Injects two default badges into the `badges` slot.',
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
  args: {type: TankType.atmospheric, showDefaultBadges: true},
};

export const Pressurized: Story = {
  args: {type: TankType.pressurized},
};

export const Battery: Story = {
  args: {type: TankType.battery},
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
  args: {static: true, type: TankType.atmospheric, showDefaultBadges: true},
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

/**
 * Demonstrates fractional value/max display in the non-compact readout by
 * slotting the `current-value` and `max-value` slots with pre-formatted
 * numbers. The component's default rendering uses `.toFixed(0)`; consumers
 * that need decimals format the number themselves and pass it through the
 * slot. A custom `unit` slot is used here too (litres instead of m³).
 *
 * The compact / static layouts only show the percent (no absolute value),
 * so fraction-digit control only applies to the non-compact layout.
 */
export const WithFractionDigits: Story = {
  args: {
    type: TankType.atmospheric,
    value: 1.25,
    max: 5,
    trend: TankTrend.rising,
    tag: 'FUEL',
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
      .chartMode=${args.chartMode}
      .chartData=${args.chartData}
      .advice=${args.advice}
      .hasAdvice=${args.hasAdvice}
      .hasGraphIcon=${args.hasGraphIcon}
      .showTrendSymbol=${args.showTrendSymbol}
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
      .chartMode=${args.chartMode}
      .chartData=${args.chartData}
      .advice=${args.advice}
      .hasAdvice=${args.hasAdvice}
      .hasGraphIcon=${args.hasGraphIcon}
      ?alert=${args.alert}
      .alertFrameType=${args.alertFrameType}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameStatus=${args.alertFrameStatus}
      .showAlertCategoryIcon=${args.showAlertCategoryIcon}
      .showAlertIcon=${args.showAlertIcon}
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
    showDefaultBadges: true,
    alert: true,
    alertFrameStatus: ObcAlertFrameStatus.Caution,
    alertFrameType: ObcAlertFrameType.BottomFlip,
  },
};

/**
 * Demonstrates host-driven resizing: drag the corner of the dashed container
 * to change its size — the tank fills the container's width and height, and
 * any extra space flows into the chart cell (textual cells stay min-content).
 * All controls (orientation, type, compact, static, etc.) remain functional.
 *
 * The tank host is placed at `left: 50%` of the container (the P&ID drop
 * coordinate) so its centerline aligns with the container's center, matching
 * the component's anchor-point convention. The host's `width` is sized to the
 * full container minus the visual padding, so the visible tank extends
 * symmetrically inward from both edges.
 */
export const Responsive: Story = {
  args: {
    type: TankType.atmospheric,
    chartMode: TankChartMode.graphAndBar,
    hasAdvice: true,
    advice: SAMPLE_ADVICE,
    showDefaultBadges: true,
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
          position: relative;
        "
      >
        <obc-automation-tank
          style="position: absolute; left: 50%; top: 16px; width: calc(100% - 32px); height: calc(100% - 32px);"
          .value=${args.value}
          .max=${args.max}
          .trend=${args.trend}
          .tag=${args.tag}
          .type=${args.type}
          .orientation=${args.orientation}
          .compact=${args.compact}
          .static=${args.static}
          .chartMode=${args.chartMode}
          .chartData=${args.chartData}
          .advice=${args.advice}
          .hasAdvice=${args.hasAdvice}
          .hasGraphIcon=${args.hasGraphIcon}
          ?alert=${args.alert}
          .alertFrameType=${args.alertFrameType}
          .alertFrameThickness=${args.alertFrameThickness}
          .alertFrameStatus=${args.alertFrameStatus}
          .showAlertCategoryIcon=${args.showAlertCategoryIcon}
          .showAlertIcon=${args.showAlertIcon}
        >
          ${args.showDefaultBadges ? defaultBadges : null}
        </obc-automation-tank>
      </div>
    `;
  },
};
