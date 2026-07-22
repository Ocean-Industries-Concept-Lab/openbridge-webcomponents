import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {userEvent} from 'storybook/test';
import {gsap} from 'gsap';
import {
  ReadoutListItemSize,
  ReadoutListItemStacking,
  ReadoutListItemPriority,
  ReadoutListItemDataQuality,
  ReadoutListItemBorder,
  ReadoutListItemSetpointInteraction,
  ObcTextboxFontWeight,
  type ReadoutListItemClickable,
  type ReadoutValueOptions,
  type ReadoutSetpointOptions,
  type ReadoutAdviceOptions,
  type ReadoutReserverOptions,
  type ReadoutSrcOptions,
} from './readout-list-item.js';
import type {AlertFrameConfig} from '../../components/alert-frame/alert-frame.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';
import './readout-list-item.js';
import '../../icons/icon-placeholder.js';
import '../azimuth-thruster/azimuth-thruster.js';
import {InstrumentState, Priority} from '../types.js';

const NONE = 'none';

type ReadoutListItemStoryArgs = {
  // Primitives
  label: string;
  unit: string;
  src: string;
  hasValue: boolean;
  value: number;
  off: boolean;
  hasSetpoint: boolean;
  setpoint: number;
  hasAdvice: boolean;
  advice: number;
  // Flattened options
  'options.size': ReadoutListItemSize;
  'options.priority': ReadoutListItemPriority;
  'options.stacking': ReadoutListItemStacking;
  'options.clickable': boolean;
  'options.clickable.border': ReadoutListItemBorder;
  'options.hasLeadingIcon': boolean;
  'options.hasDegree': boolean;
  'options.hasDegreeSpacer': boolean;
  'options.fractionDigits': number;
  'options.maxDigits': number;
  'options.dataQuality': ReadoutListItemDataQuality | typeof NONE;
  'options.value.weight': ObcTextboxFontWeight;
  'options.value.hasIcon': boolean;
  'options.value.hintedZeros': boolean;
  'options.setpoint.interaction': ReadoutListItemSetpointInteraction;
  'options.setpoint.touching': boolean;
  'options.unit.spaceReserver': string;
};

// Authoring convenience for the stories only: the component's API is flat
// (global props + per-block `*Options`), but grouping them under one `options`
// object keeps the showcase cases compact. `renderItem` spreads this onto the
// element's real props.
type StoryOptions = {
  size?: ReadoutListItemSize;
  priority?: ReadoutListItemPriority;
  stacking?: ReadoutListItemStacking;
  clickable?: boolean | ReadoutListItemClickable;
  hasLeadingIcon?: boolean;
  hasDegree?: boolean;
  hasDegreeSpacer?: boolean;
  fractionDigits?: number;
  maxDigits?: number;
  dataQuality?: ReadoutListItemDataQuality;
  alert?: false | AlertFrameConfig;
  value?: ReadoutValueOptions;
  setpoint?: ReadoutSetpointOptions;
  advice?: ReadoutAdviceOptions;
  unit?: ReadoutReserverOptions;
  src?: ReadoutSrcOptions;
};

type ReadoutItemConfig = {
  label?: string;
  unit?: string;
  src?: string;
  hasValue?: boolean;
  value?: number | null;
  off?: boolean;
  hasSetpoint?: boolean;
  setpoint?: number;
  hasAdvice?: boolean;
  advice?: number;
  options?: StoryOptions;
  hasLeadingIcon?: boolean;
  hasValueIcon?: boolean;
  showDebugOverlay?: boolean;
};

type ShowcaseCase = {label: string; config: ReadoutItemConfig};
// `columns` pins the grid to a fixed column count so cases group logically
// (e.g. one row per size, columns = the state variants) instead of `auto-fit`
// packing different sizes onto the same line. Omit for a free-flowing grid.
type ShowcaseSection = {
  title: string;
  cases: ShowcaseCase[];
  columns?: number;
};

const centeredCanvasDecorator = (story: () => unknown) => html`
  <div
    style="min-height: 100vh; width: 100%; display: flex; align-items: center; padding: 24px;"
  >
    <div
      data-obc-theme="day"
      style="background: var(--container-background-color); padding: 24px; width: 100%; box-sizing: border-box;"
    >
      ${story()}
    </div>
  </div>
`;

const showcaseStyle = `
  .rli-sections { display: flex; flex-direction: column; gap: 32px; width: 100%; }
  .rli-section { display: flex; flex-direction: column; gap: 16px; width: 100%; }
  .rli-section-title {
    margin: 0; font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--element-neutral-color, #777);
  }
  .rli-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, max-content));
    gap: 20px; width: 100%; align-items: start; justify-items: stretch;
  }
  .rli-card {
    display: flex; flex-direction: column; gap: 10px; padding: 12px;
    border-radius: 8px; background: rgba(0, 0, 0, 0.03);
  }
  .rli-card-title {
    font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--element-neutral-color, #777);
  }
`;

// Faithful render: data primitives pass through as-is, so an emptied Storybook
// control (undefined) shows the nil state — value/setpoint/advice render a dash,
// label/unit/src are omitted (and the row keeps its height). Used by the
// Playground and the alignment column.
function renderItem(config: ReadoutItemConfig) {
  const o = config.options ?? {};
  return html`
    <obc-readout-list-item
      .label=${config.label}
      .unit=${config.unit}
      .src=${config.src}
      .hasValue=${config.hasValue ?? true}
      .value=${config.value ?? null}
      .off=${config.off ?? false}
      .hasSetpoint=${config.hasSetpoint ?? false}
      .setpoint=${config.setpoint}
      .hasAdvice=${config.hasAdvice ?? false}
      .advice=${config.advice}
      .size=${o.size}
      .priority=${o.priority}
      .stacking=${o.stacking}
      .clickable=${o.clickable ?? false}
      .hasLeadingIcon=${o.hasLeadingIcon ?? false}
      .hasDegree=${o.hasDegree ?? false}
      .hasDegreeSpacer=${o.hasDegreeSpacer ?? false}
      .fractionDigits=${o.fractionDigits ?? 0}
      .maxDigits=${o.maxDigits ?? 0}
      .dataQuality=${o.dataQuality}
      .alert=${o.alert ?? false}
      .valueOptions=${o.value}
      .setpointOptions=${o.setpoint}
      .adviceOptions=${o.advice}
      .unitOptions=${o.unit}
      .srcOptions=${o.src}
      .showDebugOverlay=${config.showDebugOverlay ?? false}
    >
      ${config.hasLeadingIcon
        ? html`<obi-placeholder slot="leading-icon"></obi-placeholder>`
        : nothing}
      ${config.hasValueIcon
        ? html`<obi-placeholder slot="value-icon"></obi-placeholder>`
        : nothing}
    </obc-readout-list-item>
  `;
}

// Showcase render: fills demo defaults (Label / Unit / SRC / 123 / 120 / 118)
// for the static preset cards that omit those fields. The Playground uses
// renderItem directly so emptying a control surfaces the nil state.
function showcaseItem(config: ReadoutItemConfig) {
  return renderItem({
    ...config,
    label: config.label ?? 'Label',
    unit: config.unit ?? 'Unit',
    src: config.src ?? 'SRC',
    value: config.value === undefined ? 123 : config.value,
    setpoint: config.setpoint ?? 120,
    advice: config.advice ?? 118,
  });
}

function renderShowcase(sections: ShowcaseSection[]) {
  return html`
    <style>
      ${showcaseStyle}
    </style>
    <div class="rli-sections">
      ${sections.map(
        (section) => html`
          <section class="rli-section">
            <h3 class="rli-section-title">${section.title}</h3>
            <div
              class="rli-grid"
              style=${section.columns
                ? `grid-template-columns: repeat(${section.columns}, max-content);`
                : nothing}
            >
              ${section.cases.map(
                (item) => html`
                  <div class="rli-card">
                    <div class="rli-card-title">${item.label}</div>
                    ${showcaseItem(item.config)}
                  </div>
                `
              )}
            </div>
          </section>
        `
      )}
    </div>
  `;
}

const defaultArgs: ReadoutListItemStoryArgs = {
  label: 'Label',
  unit: 'Unit',
  src: 'SRC',
  hasValue: true,
  value: 123,
  off: false,
  hasSetpoint: false,
  setpoint: 120,
  hasAdvice: false,
  advice: 118,
  'options.size': ReadoutListItemSize.small,
  'options.priority': ReadoutListItemPriority.regular,
  'options.stacking': ReadoutListItemStacking.trailingUnit,
  'options.clickable': false,
  'options.clickable.border': ReadoutListItemBorder.squared,
  'options.hasLeadingIcon': false,
  'options.hasDegree': true,
  'options.hasDegreeSpacer': false,
  'options.fractionDigits': 0,
  'options.maxDigits': 0,
  'options.dataQuality': NONE,
  'options.value.weight': ObcTextboxFontWeight.regular,
  'options.value.hasIcon': false,
  'options.value.hintedZeros': false,
  'options.setpoint.interaction':
    ReadoutListItemSetpointInteraction.alwaysVisible,
  'options.setpoint.touching': false,
  'options.unit.spaceReserver': '',
};

function argsToOptions(args: ReadoutListItemStoryArgs): StoryOptions {
  return {
    size: args['options.size'],
    priority: args['options.priority'],
    stacking: args['options.stacking'],
    clickable: args['options.clickable']
      ? {border: args['options.clickable.border']}
      : false,
    hasLeadingIcon: args['options.hasLeadingIcon'],
    hasDegree: args['options.hasDegree'],
    hasDegreeSpacer: args['options.hasDegreeSpacer'],
    fractionDigits: args['options.fractionDigits'],
    maxDigits: args['options.maxDigits'],
    dataQuality:
      args['options.dataQuality'] === NONE
        ? undefined
        : args['options.dataQuality'],
    value: {
      weight: args['options.value.weight'],
      hasIcon: args['options.value.hasIcon'],
      hintedZeros: args['options.value.hintedZeros'],
    },
    setpoint: {
      interaction: args['options.setpoint.interaction'],
      touching: args['options.setpoint.touching'],
    },
    unit: {spaceReserver: args['options.unit.spaceReserver'] || undefined},
  };
}

const meta = {
  title: 'Instruments/Readout List Item',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-readout-list-item',
  decorators: [centeredCanvasDecorator],
  render: (args) =>
    html`<div style="display:flex; width:100%;">
      ${renderItem({
        label: args.label,
        unit: args.unit,
        src: args.src,
        hasValue: args.hasValue,
        value: args.value,
        off: args.off,
        hasSetpoint: args.hasSetpoint,
        setpoint: args.setpoint,
        hasAdvice: args.hasAdvice,
        advice: args.advice,
        options: argsToOptions(args),
        hasLeadingIcon: args['options.hasLeadingIcon'],
        hasValueIcon: args['options.value.hasIcon'],
      })}
    </div>`,
  args: defaultArgs,
  argTypes: {
    label: {name: 'Label', control: {type: 'text'}, table: {category: 'Data'}},
    unit: {name: 'Unit', control: {type: 'text'}, table: {category: 'Data'}},
    src: {name: 'Source', control: {type: 'text'}, table: {category: 'Data'}},
    hasValue: {name: 'Has Value', table: {category: 'Data'}},
    value: {
      name: 'Value',
      control: {type: 'number'},
      table: {category: 'Data'},
    },
    off: {name: 'Off', table: {category: 'Data'}},
    hasSetpoint: {name: 'Has Setpoint', table: {category: 'Data'}},
    setpoint: {
      name: 'Setpoint',
      control: {type: 'number'},
      if: {arg: 'hasSetpoint', truthy: true},
      table: {category: 'Data'},
    },
    hasAdvice: {name: 'Has Advice', table: {category: 'Data'}},
    advice: {
      name: 'Advice',
      control: {type: 'number'},
      if: {arg: 'hasAdvice', truthy: true},
      table: {category: 'Data'},
    },
    'options.size': {
      name: 'Size',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemSize),
      table: {category: 'Layout'},
    },
    'options.priority': {
      name: 'Priority',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemPriority),
      table: {category: 'Layout'},
    },
    'options.stacking': {
      name: 'Stacking',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemStacking),
      table: {category: 'Layout'},
    },
    'options.clickable': {name: 'Clickable', table: {category: 'Layout'}},
    'options.clickable.border': {
      name: 'Clickable Border',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemBorder),
      if: {arg: 'options.clickable', truthy: true},
      table: {category: 'Layout'},
    },
    'options.hasLeadingIcon': {
      name: 'Has Leading Icon',
      table: {category: 'Layout'},
    },
    'options.hasDegree': {name: 'Has Degree', table: {category: 'Format'}},
    'options.hasDegreeSpacer': {
      name: 'Has Degree Spacer',
      table: {category: 'Format'},
    },
    'options.fractionDigits': {
      name: 'Fraction Digits',
      control: {type: 'number', min: 0, step: 1},
      table: {category: 'Format'},
    },
    'options.maxDigits': {
      name: 'Max Digits',
      control: {type: 'number', min: 0, step: 1},
      table: {category: 'Format'},
    },
    'options.dataQuality': {
      name: 'Data Quality',
      control: {type: 'select'},
      options: [NONE, ...Object.values(ReadoutListItemDataQuality)],
      table: {category: 'State'},
    },
    'options.value.weight': {
      name: 'Value Weight',
      control: {type: 'select'},
      options: Object.values(ObcTextboxFontWeight),
      table: {category: 'Value'},
    },
    'options.value.hasIcon': {
      name: 'Value Has Icon',
      table: {category: 'Value'},
    },
    'options.value.hintedZeros': {
      name: 'Value Hinted Zeros',
      if: {arg: 'options.maxDigits', truthy: true},
      table: {category: 'Value'},
    },
    'options.setpoint.interaction': {
      name: 'Setpoint Interaction',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemSetpointInteraction),
      if: {arg: 'hasSetpoint', truthy: true},
      table: {category: 'Setpoint'},
    },
    'options.setpoint.touching': {
      name: 'Setpoint Touching',
      if: {arg: 'hasSetpoint', truthy: true},
      table: {category: 'Setpoint'},
    },
    'options.unit.spaceReserver': {
      name: 'Unit Space Reserver',
      control: {type: 'text'},
      table: {category: 'Format'},
    },
  },
} satisfies Meta<ReadoutListItemStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutListItemStoryArgs>;

export const Playground: Story = {};

export const Off: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Off (value only, setpoint and advice remain)',
        columns: 3,
        cases: [
          {label: 'value off', config: {off: true}},
          {
            label: 'value off + setpoint',
            config: {off: true, hasSetpoint: true, setpoint: 120},
          },
          {
            label: 'value off + advice',
            config: {off: true, hasAdvice: true, advice: 118},
          },
        ],
      },
    ]),
};

const SIZES = [
  ReadoutListItemSize.small,
  ReadoutListItemSize.medium,
  ReadoutListItemSize.large,
] as const;

export const Sizes: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Sizes × Priority',
        columns: 2,
        cases: SIZES.flatMap((size) =>
          [
            ReadoutListItemPriority.regular,
            ReadoutListItemPriority.enhanced,
          ].map((priority) => ({
            label: `${size} / ${priority}`,
            config: {options: {size, priority, hasDegree: true}},
          }))
        ),
      },
    ]),
};

function stackingCases(stacking: ReadoutListItemStacking): ShowcaseCase[] {
  return SIZES.flatMap((size) => [
    {
      label: `${size} / value`,
      config: {options: {size, stacking, hasDegree: true}},
    },
    {
      label: `${size} / value + setpoint`,
      config: {
        hasSetpoint: true,
        setpoint: 120,
        options: {size, stacking, hasDegree: true},
      },
    },
    {
      label: `${size} / value + advice + setpoint`,
      config: {
        hasAdvice: true,
        advice: 118,
        hasSetpoint: true,
        setpoint: 120,
        options: {size, stacking, hasDegree: true},
      },
    },
  ]);
}

export const TrailingUnit: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Stacking: trailing-unit',
        columns: 3,
        cases: stackingCases(ReadoutListItemStacking.trailingUnit),
      },
    ]),
};

export const LeadingUnit: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Stacking: leading-unit',
        columns: 3,
        cases: stackingCases(ReadoutListItemStacking.leadingUnit),
      },
    ]),
};

export const LeadingSrc: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Stacking: leading-src',
        columns: 3,
        cases: stackingCases(ReadoutListItemStacking.leadingSrc),
      },
    ]),
};

export const SetpointFlipFlop: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Setpoint flip-flop (value vs. setpoint focus)',
        columns: 2,
        cases: SIZES.flatMap((size) => [
          {
            label: `${size} / not at setpoint`,
            config: {
              value: 123,
              hasSetpoint: true,
              setpoint: 120,
              options: {
                size,
                setpoint: {
                  interaction: ReadoutListItemSetpointInteraction.flipFlop,
                },
                hasDegree: true,
              },
            },
          },
          {
            label: `${size} / at setpoint`,
            config: {
              value: 120,
              hasSetpoint: true,
              setpoint: 120,
              options: {
                size,
                setpoint: {
                  interaction: ReadoutListItemSetpointInteraction.flipFlop,
                },
                hasDegree: true,
              },
            },
          },
        ]),
      },
    ]),
};

// The four Figma "states" (sandbox file g9gUFzN6MzzvNudv4XOqMT), each with a
// setpoint, mapped onto the component API. Value 123 ≠ setpoint 120 so the
// flip-flop emphasises the setpoint. Locks the both-gray/both-blue colour rule
// and the setpoint emphasis (SemiBold only when emphasised; value stays Regular).
const STATE_VARIANTS: {label: string; options: StoryOptions}[] = [
  {label: 'regular', options: {priority: ReadoutListItemPriority.regular}},
  {label: 'enhanced', options: {priority: ReadoutListItemPriority.enhanced}},
  {
    label: 'input (adjusting)',
    options: {
      priority: ReadoutListItemPriority.enhanced,
      setpoint: {touching: true},
    },
  },
  {
    label: 'input flip-flop',
    options: {
      priority: ReadoutListItemPriority.enhanced,
      setpoint: {interaction: ReadoutListItemSetpointInteraction.flipFlop},
    },
  },
];

export const States: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'States (value + setpoint) — both neutral or both enhanced',
        columns: 4,
        cases: SIZES.flatMap((size) =>
          STATE_VARIANTS.map((variant) => ({
            label: `${size} / ${variant.label}`,
            config: {
              value: 123,
              hasSetpoint: true,
              setpoint: 120,
              options: {size, hasDegree: true, ...variant.options},
            },
          }))
        ),
      },
    ]),
};

// `flip-flop` (value/setpoint swap) and `pop-up` (setpoint fades out once
// reached) only read clearly in motion, and they need `value === setpoint`
// transitions rather than a single control — so each gets a focused static
// story plus a GSAP-driven animated one below.

export const SetpointPopUp: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Pop-up — setpoint shown only until the value reaches it',
        columns: 2,
        cases: [
          {
            label: 'value ≠ setpoint → shown',
            config: {
              value: 123,
              hasSetpoint: true,
              setpoint: 120,
              options: {
                setpoint: {
                  interaction: ReadoutListItemSetpointInteraction.popUp,
                },
              },
            },
          },
          {
            label: 'value = setpoint → fades out (space kept)',
            config: {
              value: 120,
              hasSetpoint: true,
              setpoint: 120,
              options: {
                setpoint: {
                  interaction: ReadoutListItemSetpointInteraction.popUp,
                },
              },
            },
          },
        ],
      },
    ]),
};

export const SetpointTouch: Story = {
  render: () =>
    renderShowcase([
      {
        title:
          'Touch (focus) — the setpoint triangle is highlighted while adjusting',
        columns: 2,
        cases: [
          {
            label: 'normal',
            config: {
              value: 123,
              hasSetpoint: true,
              setpoint: 120,
              options: {setpoint: {}},
            },
          },
          {
            label: 'touching (focus)',
            config: {
              value: 123,
              hasSetpoint: true,
              setpoint: 120,
              options: {setpoint: {touching: true}},
            },
          },
        ],
      },
    ]),
};

// Shared scaffold for the GSAP-driven interaction demos: a single readout whose
// `value` is swept toward / away from the setpoint so the flip-flop swap and the
// pop-up show/hide can be seen in motion. Tagged `skip-test` (the animation makes
// snapshots flaky).
function animatedInteractionStory(config: {
  name: string;
  interaction: ReadoutListItemSetpointInteraction;
  intro: string;
  awayLabel: string;
  reachLabel: string;
}): Story {
  const SETPOINT = 120;
  const AWAY = 124;
  return {
    name: config.name,
    render: () => html`
      <div
        style="display:flex; flex-direction:column; gap:16px; width:360px; padding:24px;"
      >
        <div style="font-size:14px; color:var(--element-neutral-color, #888);">
          ${config.intro}
        </div>
        <div
          style="padding:8px; border:1px dashed var(--border-divider-color, #ccc); border-radius:8px;"
        >
          <obc-readout-list-item
            id="anim-demo"
            .label=${'Heading'}
            .value=${AWAY}
            .hasSetpoint=${true}
            .setpoint=${SETPOINT}
            .size=${ReadoutListItemSize.medium}
            .hasDegree=${true}
            .setpointOptions=${{interaction: config.interaction}}
          ></obc-readout-list-item>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button id="btn-away" style="padding:8px 16px; cursor:pointer;">
            ${config.awayLabel}
          </button>
          <button id="btn-reach" style="padding:8px 16px; cursor:pointer;">
            ${config.reachLabel}
          </button>
        </div>
        <div
          id="anim-status"
          style="font:12px/1.4 monospace; color:var(--element-neutral-color, #666);"
        >
          value=${AWAY}, setpoint=${SETPOINT}
        </div>
      </div>
    `,
    play: async ({canvasElement}) => {
      await new Promise((r) => setTimeout(r, 300));
      const el = canvasElement.querySelector('#anim-demo') as
        | (HTMLElement & {
            value: number;
            setpointOptions: ReadoutSetpointOptions;
          })
        | null;
      const status = canvasElement.querySelector(
        '#anim-status'
      ) as HTMLElement | null;
      const btnAway = canvasElement.querySelector(
        '#btn-away'
      ) as HTMLButtonElement | null;
      const btnReach = canvasElement.querySelector(
        '#btn-reach'
      ) as HTMLButtonElement | null;
      if (!el || !status || !btnAway || !btnReach) return;

      const anim = {value: AWAY};
      // Focus/touch state — on while actively adjusting (sweeping toward the
      // setpoint), off once settled. Rebuild the object so Lit re-renders.
      const setTouch = (on: boolean) => {
        el.setpointOptions = {interaction: config.interaction, touching: on};
      };
      const setVal = (v: number) => {
        el.value = v;
        status.textContent = `value=${Math.round(v)}, setpoint=${SETPOINT}`;
      };
      // Snap to the exact target on complete so `value === setpoint` holds (the
      // flip-flop swap and pop-up hide both key off strict equality).
      const tweenTo = (target: number) => {
        gsap.killTweensOf(anim);
        setTouch(true);
        gsap.to(anim, {
          value: target,
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: () => setVal(anim.value),
          onComplete: () => {
            setVal(target);
            setTouch(false);
          },
        });
      };
      btnAway.onclick = () => tweenTo(AWAY);
      btnReach.onclick = () => tweenTo(SETPOINT);

      // Auto-play a couple of cycles for the "Play" button.
      for (let i = 0; i < 2; i++) {
        await userEvent.click(btnReach);
        await new Promise((r) => setTimeout(r, 1500));
        await userEvent.click(btnAway);
        await new Promise((r) => setTimeout(r, 1500));
      }
    },
  };
}

// `tags: ['skip-test']` must sit on the export literal (not inside the helper) —
// Storybook's CSF indexer reads tags statically, so a tag returned from a
// function call would not exclude the story from the visual snapshot run.
export const SetpointFlipFlopAnimated: Story = {
  ...animatedInteractionStory({
    name: 'Flip-Flop (Animated)',
    interaction: ReadoutListItemSetpointInteraction.flipFlop,
    intro:
      'Flip-flop: as the value reaches the setpoint (120) the emphasis swaps from the setpoint to the value (100ms). Press Play, or use the buttons.',
    awayLabel: 'Away (124)',
    reachLabel: 'Reach setpoint (120)',
  }),
  tags: ['skip-test'],
};

export const SetpointPopUpAnimated: Story = {
  ...animatedInteractionStory({
    name: 'Pop-Up (Animated)',
    interaction: ReadoutListItemSetpointInteraction.popUp,
    intro:
      'Pop-up: the setpoint shows while the value differs, then fades out (100ms) once the value reaches it. Press Play, or use the buttons.',
    awayLabel: 'Leave setpoint (124)',
    reachLabel: 'Reach setpoint (120)',
  }),
  tags: ['skip-test'],
};

// Demo durations (s) for the synced azimuth-thruster flow below — the vessel
// response after "confirm": thrust catches up faster than the heavier angle.
const SYNC_THRUST_DURATION = 2;
const SYNC_ANGLE_DURATION = 10;

// Reserve integer-digit width so the value / setpoint don't shift left↔right as
// they cross the 2↔3 digit boundary during the sweep (angle 30↔120, up to 360°;
// power up to 100%). `maxDigits` reserves the width for the value AND the
// setpoint block at once, without printing leading zeros.
const SYNC_MAX_DIGITS = 3;

// The readouts' flip-flop setpoint options; only `touch` changes during the flow
// (size/maxDigits are static flat props on the elements).
function syncSetpointOptions(touching: boolean): ReadoutSetpointOptions {
  return {
    interaction: ReadoutListItemSetpointInteraction.flipFlop,
    touching,
  };
}

/**
 * **Synced with an instrument (Azimuth Thruster)** — replays the exact setpoint
 * adjustment flow from `Building Blocks/Setpoint → Setpoint Azimuth Thruster
 * Flow`, with two `obc-readout-list-item`s wired to the same demo state below the
 * instrument.
 *
 * These are **two independent components driven by one shared animation** (synced
 * manually, for this demo only): the `obc-azimuth-thruster` instrument and the
 * `obc-readout-list-item` rows. `obc-azimuth-thruster-labeled` pairs the thruster
 * with the older `obc-readout`; this shows the new readout list item mirroring the
 * same angle/thrust adjustment — the setpoint triangle is highlighted while
 * touching, the setpoint value slides during "move", and the value catches up
 * (with the flip-flop emphasis swap) on "confirm".
 *
 * Press "Play", or use the buttons, to run reset → initiate → move → confirm on
 * both at once.
 */
export const SyncedWithAzimuthThruster: Story = {
  name: 'Synced With Azimuth Thruster (Interactive)',
  tags: ['skip-test'],
  render: () => html`
    <div
      style="display:flex; flex-direction:column; gap:24px; width:360px; padding:24px;"
    >
      <div style="font-size:14px; color:var(--element-neutral-color, #888);">
        Two independent components driven by one shared demo state (synced
        manually for this demo): the azimuth-thruster instrument and two
        <code>obc-readout-list-item</code> rows below it. Press "Play", or use
        the buttons, to run the reset → initiate → move → confirm setpoint
        adjustment on both at once.
      </div>

      <div style="width:280px; height:280px; align-self:center;">
        <obc-azimuth-thruster
          id="azimuth-demo"
          .angle=${30}
          .angleSetpoint=${30}
          .thrustSetpoint=${25}
          .thrust=${25}
          .state=${InstrumentState.active}
          .priority=${Priority.enhanced}
          .animateSetpoint=${true}
          .primaryTickmarkInterval=${45}
          .secondaryTickmarkInterval=${5}
          .tertiaryTickmarkInterval=${1}
          .showLabels=${true}
          .tickmarksInside=${true}
        ></obc-azimuth-thruster>
      </div>

      <div
        style="display:flex; flex-direction:column; gap:8px; padding:8px; border:1px dashed var(--border-divider-color, #ccc); border-radius:8px;"
      >
        <obc-readout-list-item
          id="rli-angle"
          .label=${'Angle'}
          .unit=${'DEG'}
          .value=${30}
          .hasSetpoint=${true}
          .setpoint=${30}
          .size=${ReadoutListItemSize.medium}
          .hasDegree=${true}
          .maxDigits=${SYNC_MAX_DIGITS}
          .setpointOptions=${syncSetpointOptions(false)}
        ></obc-readout-list-item>
        <obc-readout-list-item
          id="rli-power"
          .label=${'Power'}
          .unit=${'%'}
          .value=${25}
          .hasSetpoint=${true}
          .setpoint=${25}
          .size=${ReadoutListItemSize.medium}
          .maxDigits=${SYNC_MAX_DIGITS}
          .setpointOptions=${syncSetpointOptions(false)}
        ></obc-readout-list-item>
      </div>

      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <button id="btn-at-reset" style="padding:8px 16px; cursor:pointer;">
          Reset (t=0)
        </button>
        <button id="btn-at-initiate" style="padding:8px 16px; cursor:pointer;">
          Initiate (t=1)
        </button>
        <button id="btn-at-move" style="padding:8px 16px; cursor:pointer;">
          Move (t=2)
        </button>
        <button id="btn-at-confirm" style="padding:8px 16px; cursor:pointer;">
          Confirm (t=3)
        </button>
      </div>

      <div
        id="at-status"
        style="font:12px/1.4 monospace; color:var(--element-neutral-color, #666);"
      >
        State: t=0 (at setpoint) | angle=30°, angleSP=30°, thrust=25%,
        thrustSP=25%
      </div>
    </div>
  `,
  play: async ({canvasElement}) => {
    await new Promise((r) => setTimeout(r, 500));

    const at = canvasElement.querySelector('#azimuth-demo') as
      | (HTMLElement & {
          angle: number;
          angleSetpoint: number | undefined;
          newAngleSetpoint: number | undefined;
          thrust: number;
          thrustSetpoint: number | undefined;
          touching: boolean;
        })
      | null;
    const status = canvasElement.querySelector(
      '#at-status'
    ) as HTMLElement | null;
    const angleReadout = canvasElement.querySelector('#rli-angle') as
      | (HTMLElement & {
          value: number;
          setpoint: number;
          setpointOptions: ReadoutSetpointOptions;
        })
      | null;
    const powerReadout = canvasElement.querySelector('#rli-power') as
      | (HTMLElement & {
          value: number;
          setpoint: number;
          setpointOptions: ReadoutSetpointOptions;
        })
      | null;
    const btnReset = canvasElement.querySelector(
      '#btn-at-reset'
    ) as HTMLButtonElement | null;
    const btnInitiate = canvasElement.querySelector(
      '#btn-at-initiate'
    ) as HTMLButtonElement | null;
    const btnMove = canvasElement.querySelector(
      '#btn-at-move'
    ) as HTMLButtonElement | null;
    const btnConfirm = canvasElement.querySelector(
      '#btn-at-confirm'
    ) as HTMLButtonElement | null;

    if (
      !at ||
      !status ||
      !angleReadout ||
      !powerReadout ||
      !btnReset ||
      !btnInitiate ||
      !btnMove ||
      !btnConfirm
    ) {
      return;
    }

    const ANGLE_FROM = 30;
    const ANGLE_TO = 120;
    const THRUST_FROM = 25;
    const THRUST_TO = 70;

    const anim = {
      angle: ANGLE_FROM,
      thrust: THRUST_FROM,
      newAngle: ANGLE_FROM,
      newThrust: THRUST_FROM,
    };

    // Toggle the readouts' touch (focus) state together. Lit re-renders on a
    // fresh `setpointOptions` reference (the value / setpoint primitives and the
    // static size/maxDigits props update independently).
    const setReadoutTouch = (touch: boolean) => {
      angleReadout.setpointOptions = syncSetpointOptions(touch);
      powerReadout.setpointOptions = syncSetpointOptions(touch);
    };

    const updateStatus = (state: string) => {
      const nAngle = at.newAngleSetpoint;
      status.textContent = `State: ${state} | angle=${Math.round(anim.angle)}°, angleSP=${Math.round(at.angleSetpoint ?? 0)}°, newAngleSP=${nAngle !== undefined ? Math.round(nAngle) + '°' : 'n/a'}, thrust=${Math.round(anim.thrust)}%, thrustSP=${Math.round(at.thrustSetpoint ?? 0)}%`;
    };

    const killAll = () => gsap.killTweensOf(anim);

    // t=0 — vessel at setpoint, no adjustment in progress.
    btnReset.onclick = () => {
      killAll();
      anim.angle = ANGLE_FROM;
      anim.thrust = THRUST_FROM;
      anim.newAngle = ANGLE_FROM;
      anim.newThrust = THRUST_FROM;
      at.angle = ANGLE_FROM;
      at.angleSetpoint = ANGLE_FROM;
      at.newAngleSetpoint = undefined;
      at.thrust = THRUST_FROM;
      at.thrustSetpoint = THRUST_FROM;
      (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
        undefined;
      at.touching = false;
      setReadoutTouch(false);
      angleReadout.value = ANGLE_FROM;
      angleReadout.setpoint = ANGLE_FROM;
      powerReadout.value = THRUST_FROM;
      powerReadout.setpoint = THRUST_FROM;
      updateStatus('t=0 (at setpoint)');
    };

    // t=1 — start adjusting: new setpoint appears at the current position, the
    // readouts enter the touch (focus) state.
    btnInitiate.onclick = () => {
      killAll();
      anim.newAngle = at.angleSetpoint ?? ANGLE_FROM;
      anim.newThrust = at.thrustSetpoint ?? THRUST_FROM;
      at.newAngleSetpoint = anim.newAngle;
      (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
        anim.newThrust;
      at.touching = true;
      setReadoutTouch(true);
      updateStatus('t=1 (initiate)');
    };

    // t=2 — slide the new setpoint; the readouts' setpoint value follows while
    // the value (vessel) stays put, so flip-flop emphasises the setpoint.
    btnMove.onclick = () => {
      killAll();
      if (at.newAngleSetpoint === undefined) {
        at.newAngleSetpoint = at.angleSetpoint ?? ANGLE_FROM;
        anim.newAngle = at.newAngleSetpoint;
        (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
          at.thrustSetpoint ?? THRUST_FROM;
        anim.newThrust = at.thrustSetpoint ?? THRUST_FROM;
        at.touching = true;
        setReadoutTouch(true);
      }
      gsap.to(anim, {
        newAngle: ANGLE_TO,
        newThrust: THRUST_TO,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          at.newAngleSetpoint = anim.newAngle;
          (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
            anim.newThrust;
          angleReadout.setpoint = Math.round(anim.newAngle);
          powerReadout.setpoint = Math.round(anim.newThrust);
          updateStatus('t=2 (move)');
        },
      });
    };

    // t=3 — confirm: setpoint commits, focus clears, the value catches up
    // (thrust faster than the heavier angle); flip-flop swaps back to the value.
    btnConfirm.onclick = () => {
      killAll();
      const targetAngle = Math.round(at.newAngleSetpoint ?? ANGLE_TO);
      const targetThrust = Math.round(anim.newThrust);

      at.angleSetpoint = targetAngle;
      at.newAngleSetpoint = undefined;
      at.thrustSetpoint = targetThrust;
      (at as unknown as {newThrustSetpoint?: number}).newThrustSetpoint =
        undefined;
      at.touching = false;

      anim.angle = at.angle;
      anim.thrust = at.thrust;

      setReadoutTouch(false);
      angleReadout.setpoint = targetAngle;
      powerReadout.setpoint = targetThrust;

      gsap.to(anim, {
        thrust: targetThrust,
        duration: SYNC_THRUST_DURATION,
        ease: 'sine.inOut',
        onUpdate: () => {
          at.thrust = anim.thrust;
          powerReadout.value = Math.round(anim.thrust);
          updateStatus('t=3 (confirm)');
        },
      });

      gsap.to(anim, {
        angle: targetAngle,
        duration: SYNC_ANGLE_DURATION,
        ease: 'sine.inOut',
        onUpdate: () => {
          at.angle = anim.angle;
          angleReadout.value = Math.round(anim.angle);
          updateStatus('t=3 (confirm)');
        },
      });
    };

    // ── Auto-play sequence ──
    await userEvent.click(btnReset);
    await new Promise((r) => setTimeout(r, 1000));
    await userEvent.click(btnInitiate);
    await new Promise((r) => setTimeout(r, 1200));
    await userEvent.click(btnMove);
    await new Promise((r) => setTimeout(r, 3000));
    await userEvent.click(btnConfirm);
    await new Promise((r) => setTimeout(r, SYNC_ANGLE_DURATION * 1000 + 1000));
  },
};

export const DataQuality: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Data quality',
        columns: 4,
        cases: [
          {label: 'nominal', config: {options: {}}},
          {
            label: 'low-integrity',
            config: {
              options: {dataQuality: ReadoutListItemDataQuality.lowIntegrity},
            },
          },
          {
            label: 'invalid',
            config: {
              options: {dataQuality: ReadoutListItemDataQuality.invalid},
            },
          },
          {
            label: 'null value (dash)',
            config: {value: null, options: {}},
          },
        ],
      },
    ]),
};

export const PerBlockState: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Per-block data quality (independent of the row)',
        cases: [
          {
            label: 'value low-integrity',
            config: {
              hasSetpoint: true,
              hasAdvice: true,
              options: {
                value: {dataQuality: ReadoutListItemDataQuality.lowIntegrity},
              },
            },
          },
          {
            label: 'setpoint invalid',
            config: {
              hasSetpoint: true,
              options: {
                setpoint: {dataQuality: ReadoutListItemDataQuality.invalid},
              },
            },
          },
          {
            label: 'advice low-integrity',
            config: {
              hasAdvice: true,
              options: {
                advice: {dataQuality: ReadoutListItemDataQuality.lowIntegrity},
              },
            },
          },
          {
            label: 'src invalid',
            config: {
              options: {src: {dataQuality: ReadoutListItemDataQuality.invalid}},
            },
          },
          {
            label: 'row invalid + value low-integrity (nested)',
            config: {
              options: {
                dataQuality: ReadoutListItemDataQuality.invalid,
                value: {dataQuality: ReadoutListItemDataQuality.lowIntegrity},
              },
            },
          },
        ],
      },
      {
        title: 'Per-block alert frames (nest inside the row)',
        columns: 3,
        cases: [
          {
            label: 'value alert',
            config: {
              options: {
                value: {
                  alert: {
                    status: AlertType.Warning,
                    mode: ObcAlertFrameMode.ackedActive,
                    type: ObcAlertFrameType.Regular,
                  },
                },
              },
            },
          },
          {
            label: 'setpoint alert',
            config: {
              hasSetpoint: true,
              options: {
                setpoint: {
                  alert: {
                    status: AlertType.Caution,
                    mode: ObcAlertFrameMode.ackedActive,
                    type: ObcAlertFrameType.Regular,
                  },
                },
              },
            },
          },
          {
            label: 'row alarm + value warning (nested)',
            config: {
              options: {
                alert: {
                  status: AlertType.Alarm,
                  mode: ObcAlertFrameMode.ackedActive,
                  type: ObcAlertFrameType.Regular,
                },
                value: {
                  alert: {
                    status: AlertType.Warning,
                    mode: ObcAlertFrameMode.ackedActive,
                    type: ObcAlertFrameType.Regular,
                  },
                },
              },
            },
          },
        ],
      },
      {
        // `dataQuality` (the surface bg + outline) is orthogonal to `alert` (the
        // surrounding frame), so they stack: the low-integrity / invalid styling
        // sits INSIDE the alert frame. A side-flip frame type shows the alert
        // category badge in the flap for extra emphasis.
        title: 'Data quality inside an alert frame (combined)',
        columns: 2,
        cases: [
          {
            label: 'low-integrity + warning frame (badge flap)',
            config: {
              hasSetpoint: true,
              setpoint: 120,
              options: {
                dataQuality: ReadoutListItemDataQuality.lowIntegrity,
                alert: {
                  status: AlertType.Warning,
                  mode: ObcAlertFrameMode.ackedActive,
                  type: ObcAlertFrameType.SmallSideFlip,
                  showAlertCategoryIcon: true,
                },
              },
            },
          },
          {
            label: 'invalid + alarm frame (large badge flap)',
            config: {
              value: null,
              options: {
                dataQuality: ReadoutListItemDataQuality.invalid,
                alert: {
                  status: AlertType.Alarm,
                  mode: ObcAlertFrameMode.ackedActive,
                  type: ObcAlertFrameType.LargeSideFlip,
                  showAlertCategoryIcon: true,
                },
              },
            },
          },
        ],
      },
    ]),
};

export const Clickable: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Clickable borders',
        columns: 3,
        cases: [
          {
            label: 'squared',
            config: {
              options: {clickable: {border: ReadoutListItemBorder.squared}},
            },
          },
          {
            label: 'round-corners',
            config: {
              options: {
                clickable: {border: ReadoutListItemBorder.roundCorners},
              },
            },
          },
          {
            label: 'round',
            config: {
              options: {clickable: {border: ReadoutListItemBorder.round}},
            },
          },
        ],
      },
    ]),
};

const alertConfig = (alert: AlertFrameConfig): StoryOptions => ({
  alert,
});

export const Alarm: Story = {
  render: () =>
    showcaseItem({
      options: alertConfig({
        status: AlertType.Alarm,
        mode: ObcAlertFrameMode.ackedActive,
        type: ObcAlertFrameType.Regular,
      }),
    }),
};

// The value alert frame now wraps the whole reading — value + degree + unit — and
// is drawn as a pure overlay (4px/2px padding, stroke centred on that line), so
// toggling it changes neither the row height nor the value/unit column positions.
// Each combo is shown unframed then framed so the constant geometry is obvious;
// the per-item outline marks the layout box (which the frame never grows).
const VALUE_FRAME: AlertFrameConfig = {
  status: AlertType.Warning,
  mode: ObcAlertFrameMode.ackedActive,
  type: ObcAlertFrameType.Regular,
};

const VALUE_FRAME_COMBOS: {label: string; config: ReadoutItemConfig}[] = [
  {label: 'value + unit', config: {value: 123, unit: 'kn'}},
  {
    label: 'value + degree + unit',
    config: {value: 287, unit: 'T', options: {hasDegree: true}},
  },
  {
    label: 'value + unit + setpoint',
    config: {value: 123, unit: 'kn', hasSetpoint: true, setpoint: 120},
  },
  {
    label: 'value + unit + advice + setpoint',
    config: {
      value: 123,
      unit: 'kn',
      hasSetpoint: true,
      setpoint: 120,
      hasAdvice: true,
      advice: 118,
    },
  },
];

export const ValueAlertFrame: Story = {
  render: () => html`
    <style>
      .rli-vf {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 380px;
      }
      .rli-vf-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .rli-vf-tag {
        width: 180px;
        flex: none;
        font: 10px/1.2 var(--global-typography-ui-label-font-family, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--element-neutral-color, #777);
      }
      .rli-vf-item {
        flex: 1;
        outline: 1px solid rgba(0, 0, 0, 0.12);
      }
    </style>
    <div class="rli-vf">
      ${VALUE_FRAME_COMBOS.flatMap((combo) =>
        [false, true].map(
          (framed) => html`
            <div class="rli-vf-row">
              <div class="rli-vf-tag">
                ${combo.label} ${framed ? '· framed' : '· plain'}
              </div>
              <div class="rli-vf-item">
                ${renderItem({
                  ...combo.config,
                  label: 'Heading',
                  options: {
                    ...combo.config.options,
                    size: ReadoutListItemSize.medium,
                    value: framed ? {alert: VALUE_FRAME} : undefined,
                  },
                })}
              </div>
            </div>
          `
        )
      )}
    </div>
  `,
};

// Each row drops a different part; the per-row outline makes it obvious that the
// row height and the bottom baseline stay constant regardless of what's missing.
const MISSING_PARTS_ROWS: {title: string; config: ReadoutItemConfig}[] = [
  {
    title: 'all parts',
    config: {label: 'Heading', value: 123, unit: 'kn', src: 'GPS'},
  },
  {title: 'no label', config: {value: 123, unit: 'kn', src: 'GPS'}},
  {
    title: 'no value (hasValue false)',
    config: {label: 'Heading', hasValue: false, unit: 'kn', src: 'GPS'},
  },
  {
    title: 'null value (dash)',
    config: {label: 'Heading', value: null, unit: 'kn', src: 'GPS'},
  },
  {title: 'no unit', config: {label: 'Heading', value: 123, src: 'GPS'}},
  {title: 'no src', config: {label: 'Heading', value: 123, unit: 'kn'}},
  {title: 'label only', config: {label: 'Heading', hasValue: false}},
  {title: 'value only', config: {value: 123}},
  {
    title: 'off',
    config: {label: 'Heading', off: true, unit: 'kn', src: 'GPS'},
  },
];

export const MissingParts: Story = {
  render: () => html`
    <style>
      .rli-mp {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 380px;
      }
      .rli-mp-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .rli-mp-tag {
        width: 150px;
        flex: none;
        font: 10px/1.2 var(--global-typography-ui-label-font-family, sans-serif);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--element-neutral-color, #777);
      }
      .rli-mp-item {
        flex: 1;
        outline: 1px solid rgba(0, 0, 0, 0.12);
      }
    </style>
    <div class="rli-mp">
      ${MISSING_PARTS_ROWS.map(
        (row) => html`
          <div class="rli-mp-row">
            <div class="rli-mp-tag">${row.title}</div>
            <div class="rli-mp-item">
              ${renderItem({
                ...row.config,
                options: {
                  ...row.config.options,
                  size: ReadoutListItemSize.medium,
                },
              })}
            </div>
          </div>
        `
      )}
    </div>
  `,
};

/**
 * Layout / alignment stress test — many rows stacked in a fixed-width column,
 * deliberately combining as much of the API as can coexist in one aligned
 * column: degree / no-degree, short and long units (`C`, `Pa`, `m/s`, `miles`),
 * large/small/negative numbers, fractional values, a `null` (dash) value,
 * hinted zeros, `low-integrity` and `invalid` data quality, an `enhanced`
 * priority and a `bold` value weight, and a "kitchen-sink" row (Depth) with a
 * setpoint, advice and both leading + value icons.
 *
 * Each `obc-readout-list-item` is its own custom element, so cross-row column
 * alignment is **not** automatic — it is driven per-row by the width reservers.
 * The first column sets none, so the unit column and value right edge drift.
 * The second column gives every row the same reservers — the longest value
 * (`"0000.0"` via `options.value/setpoint/advice.spaceReserver`) and the longest
 * unit (`"miles"` via `options.unit.spaceReserver`) — plus reserves the degree
 * column (`hasDegreeSpacer`) on non-degree rows. So every block reserves the
 * same width regardless of each row's own value length / `fractionDigits`, and
 * the columns line up.
 *
 * (Source/stacking variations are exercised in the `LeadingSrc` / `LeadingUnit`
 * stories; mixing them here would move the unit out of the rightmost column.)
 *
 * The last two rows use `size=medium` / `size=large`. Their value digit edges do
 * NOT fully align with the small rows (~8px stagger): the `°` column scales with
 * the value size (6 / 8 / 12px), so a degree row's value edge sits `degree-width`
 * to the left of the unit. This is a genuine cross-size trade-off (#7) — for
 * degree rows of different sizes you can align the unit column (as here) OR the
 * value digit edges, not both. Aligning the value edges would need either a
 * constant degree reserve (which widens the smaller rows' `°` — visually
 * undesirable) or pinning the value edge and letting the unit column stagger;
 * left for the designer. Several rows also carry per-block / row state — a value
 * `invalid` chip (Battery), a value alert frame (Fuel), a `low-integrity` advice
 * chip (Pressure), and a whole-row `low-integrity` + `invalid` setpoint + a
 * row-level alert frame with a badge-icon flap (Distance) — to confirm none of
 * them shift the aligned columns.
 */
type AlignmentRow = {
  label: string;
  value: number | null;
  unit: string;
  size?: ReadoutListItemSize;
  hasDegree?: boolean;
  fractionDigits?: number;
  priority?: ReadoutListItemPriority;
  weight?: ObcTextboxFontWeight;
  hintedZeros?: boolean;
  dataQuality?: ReadoutListItemDataQuality;
  hasSetpoint?: boolean;
  setpoint?: number;
  hasAdvice?: boolean;
  advice?: number;
  hasLeadingIcon?: boolean;
  hasValueIcon?: boolean;
  valueDataQuality?: ReadoutListItemDataQuality;
  valueAlert?: AlertFrameConfig;
  setpointDataQuality?: ReadoutListItemDataQuality;
  adviceDataQuality?: ReadoutListItemDataQuality;
  alert?: AlertFrameConfig;
};

const ALIGNMENT_ROWS: AlignmentRow[] = [
  // degree + enhanced priority (accent value)
  {
    label: 'Temperature',
    value: 45,
    unit: 'C',
    hasDegree: true,
    priority: ReadoutListItemPriority.enhanced,
  },
  // degree + hinted zeros (small value padded to maxDigits in the aligned column)
  {label: 'Heading', value: 8, unit: 'T', hasDegree: true, hintedZeros: true},
  // advice + setpoint (no icons) — to check that advice/setpoint also
  // column-align across rows (they should: the value block is width-reserved,
  // so the blocks left of it sit at fixed offsets)
  {
    label: 'Pressure',
    value: 1013,
    unit: 'Pa',
    fractionDigits: 1,
    hasSetpoint: true,
    setpoint: 1015,
    hasAdvice: true,
    advice: 1008,
    // per-block advice low-integrity — the advice chip must not shift the columns
    adviceDataQuality: ReadoutListItemDataQuality.lowIntegrity,
  },
  // negative value + fraction + low-integrity data quality
  {
    label: 'Flow speed',
    value: -12.5,
    unit: 'm/s',
    fractionDigits: 1,
    dataQuality: ReadoutListItemDataQuality.lowIntegrity,
  },
  // long unit + advice + setpoint (the "miles" row) — also a "kitchen sink of
  // state": whole row low-integrity, an invalid setpoint chip, and a row-level
  // alert frame with a badge-icon flap, all at once, to prove none of them shift
  // the aligned columns.
  {
    label: 'Distance',
    value: 4.2,
    unit: 'miles',
    fractionDigits: 1,
    hasSetpoint: true,
    setpoint: 4.5,
    hasAdvice: true,
    advice: 4,
    dataQuality: ReadoutListItemDataQuality.lowIntegrity,
    setpointDataQuality: ReadoutListItemDataQuality.invalid,
    alert: {
      status: AlertType.Warning,
      mode: ObcAlertFrameMode.ackedActive,
      type: ObcAlertFrameType.SmallSideFlip,
      showAlertCategoryIcon: true,
    },
  },
  // kitchen sink: value + setpoint + advice + leading icon + value icon
  {
    label: 'Depth',
    value: 1013.7,
    unit: 'm',
    fractionDigits: 1,
    hasSetpoint: true,
    setpoint: 1015,
    hasAdvice: true,
    advice: 1010,
    hasLeadingIcon: true,
    hasValueIcon: true,
  },
  // bold value weight — heavier weight only, no colour change (stays neutral)
  {
    label: 'Speed',
    value: 18,
    unit: 'kn',
    fractionDigits: 1,
    weight: ObcTextboxFontWeight.bold,
  },
  // null (dash) + invalid data quality
  {
    label: 'Wind',
    value: null,
    unit: 'kn',
    dataQuality: ReadoutListItemDataQuality.invalid,
  },
  // per-block (nested) value invalid — the chip uses outline, so the value edge
  // must stay aligned with the other rows
  {
    label: 'Battery',
    value: 11.8,
    unit: 'V',
    fractionDigits: 1,
    valueDataQuality: ReadoutListItemDataQuality.invalid,
  },
  // per-block (nested) value alert frame — must not shift the value edge
  {
    label: 'Fuel',
    value: 42,
    unit: '%',
    valueAlert: {
      status: AlertType.Warning,
      mode: ObcAlertFrameMode.ackedActive,
      type: ObcAlertFrameType.Regular,
    },
  },
  // size variants — value digit edges do NOT fully align cross-size (the degree
  // column scales 6/8/12px with the value size); see the ColumnAlignment doc.

  {
    label: 'Course',
    value: 287,
    unit: 'T',
    hasDegree: true,
    size: ReadoutListItemSize.medium,
  },
  {
    label: 'COG',
    value: 92,
    unit: 'T',
    hasDegree: true,
    size: ReadoutListItemSize.large,
  },
];

const LONGEST_UNIT = 'miles';
const MAX_INTEGER_DIGITS = 4;
// Longest value string in the column (4 integer digits + 1 fraction). Passed to
// every row's value/setpoint/advice spaceReserver so they all reserve the same
// width regardless of each row's own fractionDigits — like LONGEST_UNIT does for
// the unit column.
const VALUE_RESERVER = `${'0'.repeat(MAX_INTEGER_DIGITS)}.0`;

const alignmentStyle = `
  .rli-align-wrap { display: flex; flex-direction: column; gap: 24px; width: 100%; }
  .rli-align-section { display: flex; flex-direction: column; gap: 8px; }
  .rli-align-section-title {
    margin: 0; font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--element-neutral-color, #777);
  }
  .rli-align-col {
    display: flex; flex-direction: column; gap: 8px; width: 480px;
    padding: 8px; border: 1px dashed var(--border-divider-color, #ccc); border-radius: 8px;
  }
`;

function renderAlignmentColumn(aligned: boolean, showDebugOverlay: boolean) {
  return html`
    <div class="rli-align-col">
      ${ALIGNMENT_ROWS.map((row) =>
        renderItem({
          label: row.label,
          unit: row.unit,
          src: '',
          value: row.value,
          hasSetpoint: row.hasSetpoint,
          setpoint: row.setpoint,
          hasAdvice: row.hasAdvice,
          advice: row.advice,
          hasLeadingIcon: row.hasLeadingIcon,
          hasValueIcon: row.hasValueIcon,
          showDebugOverlay,
          options: {
            size: row.size ?? ReadoutListItemSize.small,
            hasDegree: row.hasDegree ?? false,
            fractionDigits: row.fractionDigits ?? 0,
            priority: row.priority,
            dataQuality: row.dataQuality,
            alert: row.alert,
            hasLeadingIcon: row.hasLeadingIcon,
            value: {
              hasIcon: row.hasValueIcon,
              weight: row.weight,
              hintedZeros: row.hintedZeros,
              dataQuality: row.valueDataQuality,
              alert: row.valueAlert,
              // Same value reserver on every row -> uniform value-block width,
              // independent of each row's own fractionDigits.
              ...(aligned ? {spaceReserver: VALUE_RESERVER} : {}),
            },
            // Setpoint / advice carry their per-block data quality in both
            // columns; the shared reserver is added only in the aligned column.
            setpoint: {
              dataQuality: row.setpointDataQuality,
              ...(aligned ? {spaceReserver: VALUE_RESERVER} : {}),
            },
            advice: {
              dataQuality: row.adviceDataQuality,
              ...(aligned ? {spaceReserver: VALUE_RESERVER} : {}),
            },
            ...(aligned
              ? {
                  // Non-degree rows reserve the degree column so their digits
                  // and units line up with the degree rows.
                  hasDegreeSpacer: !(row.hasDegree ?? false),
                  maxDigits: MAX_INTEGER_DIGITS,
                  unit: {spaceReserver: LONGEST_UNIT},
                }
              : {}),
          },
        })
      )}
    </div>
  `;
}

export const ColumnAlignment: StoryObj<
  ReadoutListItemStoryArgs & {showDebugOverlay: boolean}
> = {
  args: {showDebugOverlay: true},
  argTypes: {
    showDebugOverlay: {
      name: 'Show Debug Overlay',
      control: {type: 'boolean'},
      table: {category: 'Debug'},
    },
  },
  render: (args) => html`
    <style>
      ${alignmentStyle}
    </style>
    <div class="rli-align-wrap">
      <section class="rli-align-section">
        <h3 class="rli-align-section-title">
          Without reservers — columns drift
        </h3>
        ${renderAlignmentColumn(false, args.showDebugOverlay)}
      </section>
      <section class="rli-align-section">
        <h3 class="rli-align-section-title">
          With shared reservers — unit column &amp; value right edge aligned
        </h3>
        ${renderAlignmentColumn(true, args.showDebugOverlay)}
      </section>
    </div>
  `,
};
