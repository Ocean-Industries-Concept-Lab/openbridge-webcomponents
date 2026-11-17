import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import '../bar-vertical/bar-vertical.js';
import '../bar-horizontal/bar-horizontal.js';
import '../../navigation-instruments/watch/watch.js';
import '../../navigation-instruments/gauge-radial/gauge-radial.js';
import {WatchCircleType} from '../../navigation-instruments/watch/watch.js';
import {ObcGaugeRadialType} from '../../navigation-instruments/gauge-radial/gauge-radial.js';
import {
  BorderRadiusPosition,
  ExternalScaleSide,
  FillMode,
} from '../bar-vertical/bar-vertical.js';
import {Priority} from '../../navigation-instruments/types.js';
import {
  AdviceCategory,
  AdviceState,
  AdviceTrigger,
  type AdviceInput,
} from '../../svghelpers/advice.js';

/**
 * The advice system: one design layer (`svghelpers/advice.ts`) drawn by the
 * linear scale, the watch, the thruster bar and the chart canvas. These
 * stories put the linear and the radial rendering side by side so a category
 * or a state can be checked across both, the way the setpoint stories do.
 */

interface AdvicePlaygroundArgs {
  category: AdviceCategory;
  state: AdviceState;
  min: number;
  max: number;
  showArea: boolean;
  showIcon: boolean;
  value: number;
  setpoint?: number;
  adviceTrigger: AdviceTrigger;
  adviceEmphasis: boolean;
}

const CATEGORIES = Object.values(AdviceCategory);
const STATES = [
  AdviceState.hinted,
  AdviceState.enabled,
  AdviceState.active,
  AdviceState.triggered,
];

const meta = {
  title: 'Building Blocks/Advice',
  tags: ['autodocs', '6.1'],
  parameters: {
    docs: {
      description: {
        component: `# Advice

An advice is a range (\`min\`/\`max\`) or a point (\`value\`) on an instrument's
scale that the operator should steer into (**go-to**: \`optimal\`, \`running\`,
\`eco\`) or stay out of (**no-go**: \`caution\`, \`warning\`, \`alarm\`,
\`exclusion\`). Every instrument takes the same \`advices\` list and resolves it
against its readings: the band turns \`triggered\` while a reading sits inside
it. \`adviceTrigger\` picks the readings (\`both\`, \`value\`, \`setpoint\`);
\`adviceEmphasis\` applies the design's resting rule — go-to bands \`active\`,
no-go bands \`enabled\`, and a hit on one group fades the other to \`hinted\`.

Advices are temporary: an application shows them while an assistance mode is
on and clears the list afterwards. See the *Advice System* page under
Introduction for the vocabulary, the tokens and the migration from the
instrument-specific shapes.

Source: \`packages/openbridge-webcomponents/src/svghelpers/advice.ts\``,
      },
    },
  },
  argTypes: {
    category: {
      control: 'select',
      options: CATEGORIES,
      description:
        'What the advice is for: go-to (optimal, running, eco) or no-go (caution, warning, alarm, exclusion)',
    },
    state: {
      control: 'select',
      options: STATES,
      description:
        'The state the band rests in; a reading inside the band turns it triggered',
    },
    min: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: 'Range start',
    },
    max: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: 'Range end',
    },
    showArea: {
      control: 'boolean',
      description:
        'Also draws the limit lines across the bar and the face, tinted while triggered',
    },
    showIcon: {
      control: 'boolean',
      description:
        "Draws the category's icon beside the band, in the label column; an alert category switches to its IEC icon while triggered",
    },
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: "The instruments' value",
    },
    setpoint: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: "The instruments' setpoint; leave it unset for none",
    },
    adviceTrigger: {
      control: 'select',
      options: Object.values(AdviceTrigger),
      description:
        'Which reading triggers the band: the value, the setpoint, or either',
    },
    adviceEmphasis: {
      control: 'boolean',
      description:
        'Go-to bands rest active and no-go bands enabled; a hit on one group fades the other to hinted',
    },
  },
  args: {
    category: AdviceCategory.optimal,
    state: AdviceState.enabled,
    min: 40,
    max: 70,
    showArea: false,
    showIcon: false,
    value: 20,
    setpoint: undefined,
    adviceTrigger: AdviceTrigger.both,
    adviceEmphasis: false,
  },
  render: (args) => {
    const advices: AdviceInput[] = [
      {
        min: args.min,
        max: args.max,
        category: args.category,
        state: args.state,
        showArea: args.showArea,
        showIcon: args.showIcon,
      },
    ];
    return html`
      <div style="display: flex; gap: 48px; align-items: flex-start;">
        ${linearAdvice(advices, {
          value: args.value,
          setpoint: args.setpoint,
          trigger: args.adviceTrigger,
          emphasis: args.adviceEmphasis,
          height: 280,
        })}
        ${radialAdvice(advices, {
          value: args.value,
          setpoint: args.setpoint,
          trigger: args.adviceTrigger,
          emphasis: args.adviceEmphasis,
          size: 280,
        })}
      </div>
    `;
  },
} satisfies Meta<AdvicePlaygroundArgs>;

export default meta;
type Story = StoryObj<AdvicePlaygroundArgs>;

interface ReadingOptions {
  value?: number;
  setpoint?: number;
  trigger?: AdviceTrigger;
  emphasis?: boolean;
}

/** A vertical bar over 0–100 that resolves the list against its readings. */
function linearAdvice(
  advices: AdviceInput[],
  opts: ReadingOptions & {height?: number} = {}
) {
  return html`
    <obc-bar-vertical
      minValue="0"
      maxValue="100"
      height=${opts.height ?? 120}
      side=${ExternalScaleSide.right}
      primaryTickmarkInterval="25"
      secondaryTickmarkInterval="5"
      hasBar
      scaleBackground
      borderRadiusPosition=${BorderRadiusPosition.innerFirstChild}
      fillMode=${FillMode.fill}
      .priority=${Priority.enhanced}
      .value=${opts.value ?? 10}
      .setpoint=${opts.setpoint}
      .advices=${advices}
      .adviceTrigger=${opts.trigger ?? AdviceTrigger.both}
      .adviceEmphasis=${opts.emphasis ?? false}
    ></obc-bar-vertical>
  `;
}

/** A radial gauge over 0–100 that resolves the list against its readings. */
function radialAdvice(
  advices: AdviceInput[],
  opts: ReadingOptions & {size?: number} = {}
) {
  const size = opts.size ?? 160;
  return html`
    <div style="width: ${size}px; height: ${size}px;">
      <obc-gauge-radial
        minValue="0"
        maxValue="100"
        .type=${ObcGaugeRadialType.filled}
        .priority=${Priority.enhanced}
        .value=${opts.value ?? 10}
        .setpoint=${opts.setpoint}
        .advices=${advices}
        .adviceTrigger=${opts.trigger ?? AdviceTrigger.both}
        .adviceEmphasis=${opts.emphasis ?? false}
      ></obc-gauge-radial>
    </div>
  `;
}

/** A bare watch: it draws the list as given, with no reading to resolve against. */
function watchAdvice(advices: AdviceInput[], size = 110) {
  return html`
    <div style="width: 100%; height: ${size}px;">
      <obc-watch
        .watchCircleType=${WatchCircleType.double}
        .advices=${advices}
      ></obc-watch>
    </div>
  `;
}

const cell = (label: string, content: unknown) => html`
  <div style="text-align: center;">
    <div style="margin-bottom: 8px; font-size: 12px; color: #888;">
      ${label}
    </div>
    ${content}
  </div>
`;

const grid = (
  header: string[],
  rows: {label: string; cells: unknown[]}[],
  labelPad: number
) => {
  const columns = `80px repeat(${header.length}, 1fr)`;
  return html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div
        style="display: grid; grid-template-columns: ${columns}; gap: 12px; align-items: center;"
      >
        <div></div>
        ${header.map(
          (h) => html`
            <div
              style="text-align: center; font-weight: bold; font-size: 12px; color: #ccc;"
            >
              ${h}
            </div>
          `
        )}
      </div>
      ${rows.map(
        (row) => html`
          <div
            style="display: grid; grid-template-columns: ${columns}; gap: 12px; align-items: flex-start;"
          >
            <div
              style="font-size: 12px; color: #888; padding-top: ${labelPad}px;"
            >
              ${row.label}
            </div>
            ${row.cells}
          </div>
        `
      )}
    </div>
  `;
};

export const Playground: Story = {};

/**
 * Every category in every state on the linear scale. The reading sits
 * outside the band, so each cell shows the configured state; `triggered` is
 * what a hit turns the band into.
 */
export const AdviceComparison: Story = {
  name: 'Visual State Comparison',
  render: () =>
    grid(
      CATEGORIES,
      STATES.map((state) => ({
        label: state,
        cells: CATEGORIES.map((category) =>
          linearAdvice([{min: 40, max: 70, category, state}])
        ),
      })),
      40
    ),
};

/**
 * The same matrix on the watch face. Caution hatches, exclusion hairlines,
 * and the alert outline on a triggered warning or alarm are the radial
 * counterparts of the linear patterns.
 */
export const AdviceComparisonRadial: Story = {
  name: 'Visual State Comparison (Radial)',
  render: () =>
    grid(
      CATEGORIES,
      STATES.map((state) => ({
        label: state,
        cells: CATEGORIES.map((category) =>
          watchAdvice([{min: 20, max: 70, category, state}])
        ),
      })),
      40
    ),
};

const FLOW_ADVICES: AdviceInput[] = [
  {min: 40, max: 70, category: AdviceCategory.optimal},
  {min: 80, max: 100, category: AdviceCategory.caution},
];

/**
 * A value moving through the bands with `adviceEmphasis` on: at rest the
 * go-to band is `active` and the no-go band `enabled`; entering the optimal
 * band triggers it and fades the caution band to `hinted`; entering the
 * caution band does the reverse. The linear and the radial rendering share
 * the resolution.
 */
export const AdviceStateChangeFlow: Story = {
  name: 'State Change Flow',
  render: () => {
    const step = (label: string, value: number) =>
      cell(
        label,
        html`
          <div
            style="display: flex; gap: 16px; justify-content: center; align-items: center;"
          >
            ${linearAdvice(FLOW_ADVICES, {value, emphasis: true, height: 200})}
            ${radialAdvice(FLOW_ADVICES, {value, emphasis: true, size: 200})}
          </div>
        `
      );
    return html`
      <div
        style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;"
      >
        ${step('t=0: value 20, at rest', 20)}
        ${step('t=1: value 55, optimal triggered', 55)}
        ${step('t=2: value 90, caution triggered', 90)}
      </div>
    `;
  },
};

const STACK_ADVICES: AdviceInput[] = [
  {min: 20, max: 60, category: AdviceCategory.optimal},
  {min: 60, max: 90, category: AdviceCategory.caution},
  {min: 90, max: 100, category: AdviceCategory.alarm},
];

/**
 * Chained bands resolved against three readings. Bands that meet are cut
 * flat at the join; a hit on one group fades the other group to `hinted`,
 * while an unhit band of the hit group keeps its resting state.
 */
export const AdviceResolutionStack: Story = {
  name: 'Resolution Stack (Radial)',
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;"
    >
      ${cell(
        'reading 40: optimal triggered, no-go hinted',
        radialAdvice(STACK_ADVICES, {value: 40, emphasis: true, size: 240})
      )}
      ${cell(
        'reading 75: caution triggered, alarm enabled, optimal hinted',
        radialAdvice(STACK_ADVICES, {value: 75, emphasis: true, size: 240})
      )}
      ${cell(
        'reading 95: alarm triggered, caution enabled, optimal hinted',
        radialAdvice(STACK_ADVICES, {value: 95, emphasis: true, size: 240})
      )}
    </div>
  `,
};

/**
 * A range and a point on a horizontal bar, with the area layer on two of
 * them: the tint and the dotted limits of the optimal range, the dashed line
 * of the caution point. The point is a dot on the tick base; an alert point
 * is a short tick instead.
 */
export const AdviceRangeAndPoint: Story = {
  name: 'Range and Point',
  render: () => html`
    <obc-bar-horizontal
      minValue="0"
      maxValue="100"
      width="560"
      side=${ExternalScaleSide.bottom}
      primaryTickmarkInterval="25"
      secondaryTickmarkInterval="5"
      hasBar
      scaleBackground
      borderRadiusPosition=${BorderRadiusPosition.innerFirstChild}
      fillMode=${FillMode.fill}
      .priority=${Priority.enhanced}
      .value=${35}
      .advices=${[
        {
          min: 20,
          max: 45,
          category: AdviceCategory.optimal,
          state: AdviceState.active,
          showArea: true,
        },
        {value: 60, category: AdviceCategory.caution, showArea: true},
        {min: 72, max: 88, category: AdviceCategory.warning},
        {value: 95, category: AdviceCategory.alarm},
      ]}
    ></obc-bar-horizontal>
  `,
};

/**
 * Every category with its icon, at rest and triggered, on the bar and on the
 * radial gauge. The icon sits in the label column, centred on the band; a
 * triggered alert category switches to its IEC icon with that icon's own
 * colours, a go-to category keeps its outline in the band's colour.
 */
export const AdviceIcons: Story = {
  name: 'Icons',
  render: () =>
    grid(
      CATEGORIES,
      [
        {
          label: 'enabled',
          cells: CATEGORIES.map((category) =>
            linearAdvice([{min: 40, max: 70, category, showIcon: true}])
          ),
        },
        {
          label: 'triggered',
          cells: CATEGORIES.map((category) =>
            linearAdvice([{min: 40, max: 70, category, showIcon: true}], {
              value: 55,
            })
          ),
        },
        {
          label: 'radial, triggered',
          cells: CATEGORIES.map((category) =>
            radialAdvice([{min: 20, max: 60, category, showIcon: true}], {
              value: 40,
              size: 140,
            })
          ),
        },
      ],
      40
    ),
};
