import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {userEvent} from 'storybook/test';
import {gsap} from 'gsap';
import './readout.js';
import '../../components/navigation-item/navigation-item.js';
import '../../icons/icon-placeholder.js';
import {
  ReadoutSize,
  ReadoutPriority,
  ReadoutDirection,
  ReadoutStacking,
  ReadoutAlignment,
  ReadoutDataQuality,
  ReadoutSetpointInteraction,
  ReadoutSourceInteraction,
  ObcTextboxFontWeight,
  type ReadoutValueOptions,
  type ReadoutSetpointOptions,
  type ReadoutAdviceOptions,
  type ReadoutReserverOptions,
  type ReadoutSourceOptions,
} from './readout.js';
import {
  type AlertFrameConfig,
  ObcAlertFrameMode,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

const NONE = 'none';

type ReadoutStoryArgs = {
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
  'options.size': ReadoutSize;
  'options.priority': ReadoutPriority;
  'options.direction': ReadoutDirection;
  'options.stacking': ReadoutStacking;
  'options.alignment': ReadoutAlignment;
  'options.hasDegree': boolean;
  'options.hasDegreeSpacer': boolean;
  'options.fractionDigits': number;
  'options.maxDigits': number;
  'options.dataQuality': ReadoutDataQuality | typeof NONE;
  'options.value.weight': ObcTextboxFontWeight;
  'options.value.hasIcon': boolean;
  'options.value.hintedZeros': boolean;
  'options.setpoint.interaction': ReadoutSetpointInteraction;
  'options.setpoint.touching': boolean;
  'options.src.interaction': ReadoutSourceInteraction;
  'options.unit.spaceReserver': string;
};

// Authoring convenience for the stories only: the component's API is flat
// (global props + per-block `*Options`), but grouping them under one `options`
// object keeps the showcase cases compact. `renderReadout` spreads this onto
// the element's real props.
type StoryOptions = {
  size?: ReadoutSize;
  priority?: ReadoutPriority;
  direction?: ReadoutDirection;
  stacking?: ReadoutStacking;
  alignment?: ReadoutAlignment;
  hasDegree?: boolean;
  hasDegreeSpacer?: boolean;
  fractionDigits?: number;
  maxDigits?: number;
  dataQuality?: ReadoutDataQuality;
  alert?: false | AlertFrameConfig;
  value?: ReadoutValueOptions;
  setpoint?: ReadoutSetpointOptions;
  advice?: ReadoutAdviceOptions;
  unit?: ReadoutReserverOptions;
  src?: ReadoutSourceOptions;
};

type ReadoutConfig = {
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
  hasValueIcon?: boolean;
  showDebugOverlay?: boolean;
};

type ShowcaseCase = {label: string; config: ReadoutConfig};
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
  .ro-sections { display: flex; flex-direction: column; gap: 32px; width: 100%; }
  .ro-section { display: flex; flex-direction: column; gap: 16px; width: 100%; }
  .ro-section-title {
    margin: 0; font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--element-neutral-color, #777);
  }
  .ro-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, max-content));
    gap: 20px; width: 100%; align-items: start; justify-items: start;
  }
  .ro-card {
    display: flex; flex-direction: column; gap: 10px; padding: 12px;
    border-radius: 8px; background: rgba(0, 0, 0, 0.03);
  }
  .ro-card-title {
    font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--element-neutral-color, #777);
  }
  .ro-note {
    margin: 0; max-width: 640px;
    font: 12px/1.5 var(--global-typography-ui-label-font-family, inherit);
    color: var(--element-neutral-color, #777);
  }
`;

// Faithful render: data primitives pass through as-is, so an emptied Storybook
// control (undefined) shows the nil state — value/setpoint/advice render a
// dash, label/unit/src are omitted. Used by the Playground and the showcases.
function renderReadout(config: ReadoutConfig) {
  const o = config.options ?? {};
  return html`
    <obc-readout
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
      .direction=${o.direction}
      .stacking=${o.stacking}
      .alignment=${o.alignment}
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
      ${config.hasValueIcon
        ? html`<obi-placeholder slot="value-icon"></obi-placeholder>`
        : nothing}
    </obc-readout>
  `;
}

// Showcase render: fills demo defaults for the static preset cards that omit
// those fields. The Playground uses renderReadout directly so emptying a
// control surfaces the nil state.
function showcaseReadout(config: ReadoutConfig) {
  return renderReadout({
    ...config,
    label: config.label ?? 'SOG',
    unit: config.unit ?? 'kn',
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
    <div class="ro-sections">
      ${sections.map(
        (section) => html`
          <section class="ro-section">
            <h3 class="ro-section-title">${section.title}</h3>
            <div
              class="ro-grid"
              style=${section.columns
                ? `grid-template-columns: repeat(${section.columns}, max-content);`
                : nothing}
            >
              ${section.cases.map(
                (item) => html`
                  <div class="ro-card">
                    <div class="ro-card-title">${item.label}</div>
                    ${showcaseReadout(item.config)}
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

const defaultArgs: ReadoutStoryArgs = {
  label: 'SOG',
  unit: 'kn',
  src: '',
  hasValue: true,
  value: 123,
  off: false,
  hasSetpoint: false,
  setpoint: 120,
  hasAdvice: false,
  advice: 118,
  'options.size': ReadoutSize.large,
  'options.priority': ReadoutPriority.regular,
  'options.direction': ReadoutDirection.vertical,
  'options.stacking': ReadoutStacking.inline,
  'options.alignment': ReadoutAlignment.vertical,
  'options.hasDegree': false,
  'options.hasDegreeSpacer': false,
  'options.fractionDigits': 0,
  'options.maxDigits': 0,
  'options.dataQuality': NONE,
  'options.value.weight': ObcTextboxFontWeight.regular,
  'options.value.hasIcon': false,
  'options.value.hintedZeros': false,
  'options.setpoint.interaction': ReadoutSetpointInteraction.alwaysVisible,
  'options.setpoint.touching': false,
  'options.src.interaction': ReadoutSourceInteraction.none,
  'options.unit.spaceReserver': '',
};

function argsToOptions(args: ReadoutStoryArgs): StoryOptions {
  return {
    size: args['options.size'],
    priority: args['options.priority'],
    direction: args['options.direction'],
    stacking: args['options.stacking'],
    alignment: args['options.alignment'],
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
    src: {interaction: args['options.src.interaction']},
    unit: {spaceReserver: args['options.unit.spaceReserver'] || undefined},
  };
}

const meta = {
  title: 'Instruments/Readout',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-readout',
  decorators: [centeredCanvasDecorator],
  render: (args) =>
    renderReadout({
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
      hasValueIcon: args['options.value.hasIcon'],
    }),
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
      options: Object.values(ReadoutSize),
      table: {category: 'Layout'},
    },
    'options.priority': {
      name: 'Priority',
      control: {type: 'select'},
      options: Object.values(ReadoutPriority),
      table: {category: 'Layout'},
    },
    'options.direction': {
      name: 'Direction',
      control: {type: 'select'},
      options: Object.values(ReadoutDirection),
      table: {category: 'Layout'},
    },
    'options.stacking': {
      name: 'Stacking',
      control: {type: 'select'},
      options: Object.values(ReadoutStacking),
      if: {arg: 'options.direction', eq: ReadoutDirection.vertical},
      table: {category: 'Layout'},
    },
    'options.alignment': {
      name: 'Alignment',
      control: {type: 'select'},
      options: Object.values(ReadoutAlignment),
      if: {arg: 'options.stacking', eq: ReadoutStacking.stacked},
      table: {category: 'Layout'},
    },
    'options.hasDegree': {name: 'Has Degree', table: {category: 'Format'}},
    'options.hasDegreeSpacer': {
      name: 'Has Degree Spacer',
      if: {arg: 'options.hasDegree', truthy: false},
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
      options: [NONE, ...Object.values(ReadoutDataQuality)],
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
      options: Object.values(ReadoutSetpointInteraction),
      if: {arg: 'hasSetpoint', truthy: true},
      table: {category: 'Setpoint'},
    },
    'options.setpoint.touching': {
      name: 'Setpoint Touching',
      if: {arg: 'hasSetpoint', truthy: true},
      table: {category: 'Setpoint'},
    },
    'options.src.interaction': {
      name: 'Source Interaction',
      control: {type: 'select'},
      options: Object.values(ReadoutSourceInteraction),
      table: {category: 'Source'},
    },
    'options.unit.spaceReserver': {
      name: 'Unit Space Reserver',
      control: {type: 'text'},
      table: {category: 'Format'},
    },
  },
} satisfies Meta<ReadoutStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutStoryArgs>;

export const Playground: Story = {};

const SIZES = [
  ReadoutSize.small,
  ReadoutSize.medium,
  ReadoutSize.large,
] as const;

const INTERACTIONS = Object.values(ReadoutSetpointInteraction);

/** One row per size; columns = interaction modes × value≠/=setpoint. */
function interactionMatrix(direction: ReadoutDirection): ShowcaseCase[] {
  return SIZES.flatMap((size) =>
    INTERACTIONS.flatMap((interaction) =>
      [123, 120].map((value) => ({
        label: `${size} / ${interaction} / ${
          value === 120 ? 'at setpoint' : 'off setpoint'
        }`,
        config: {
          value,
          hasSetpoint: true,
          setpoint: 120,
          options: {
            size,
            direction,
            priority: ReadoutPriority.enhanced,
            setpoint: {interaction},
          },
        },
      }))
    )
  );
}

export const Vertical: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Vertical — Sizes × Priority',
        columns: 2,
        cases: SIZES.flatMap((size) =>
          [ReadoutPriority.regular, ReadoutPriority.enhanced].map(
            (priority) => ({
              label: `${size} / ${priority}`,
              config: {options: {size, priority}},
            })
          )
        ),
      },
      {
        title: 'Vertical — Setpoint Interactions',
        columns: 6,
        cases: interactionMatrix(ReadoutDirection.vertical),
      },
    ]),
};

export const Horizontal: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Horizontal — Sizes × Priority',
        columns: 2,
        cases: SIZES.flatMap((size) =>
          [ReadoutPriority.regular, ReadoutPriority.enhanced].map(
            (priority) => ({
              label: `${size} / ${priority}`,
              config: {
                options: {
                  size,
                  priority,
                  direction: ReadoutDirection.horizontal,
                },
              },
            })
          )
        ),
      },
      {
        title: 'Horizontal — Setpoint Interactions',
        columns: 6,
        cases: interactionMatrix(ReadoutDirection.horizontal),
      },
    ]),
};

export const Stacked: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Stacked Meta — Sizes × Alignment',
        columns: 3,
        cases: SIZES.flatMap((size) =>
          Object.values(ReadoutAlignment).map((alignment) => ({
            label: `${size} / ${alignment}`,
            config: {
              options: {size, stacking: ReadoutStacking.stacked, alignment},
            },
          }))
        ),
      },
    ]),
};

export const Advice: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Advice Segment',
        columns: 2,
        cases: [
          {
            label: 'vertical',
            config: {hasAdvice: true, options: {}},
          },
          {
            label: 'horizontal',
            config: {
              hasAdvice: true,
              options: {direction: ReadoutDirection.horizontal},
            },
          },
          {
            label: 'vertical / advice + setpoint',
            config: {hasAdvice: true, hasSetpoint: true, options: {}},
          },
          {
            label: 'horizontal / advice + setpoint',
            config: {
              hasAdvice: true,
              hasSetpoint: true,
              options: {direction: ReadoutDirection.horizontal},
            },
          },
        ],
      },
    ]),
};

export const Off: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Off (value Only, Setpoint and Advice Remain)',
        columns: 3,
        cases: [
          {label: 'value off', config: {off: true}},
          {
            label: 'value off + setpoint',
            config: {off: true, hasSetpoint: true, setpoint: 120},
          },
          {
            label: 'value off / horizontal',
            config: {
              off: true,
              options: {direction: ReadoutDirection.horizontal},
            },
          },
        ],
      },
    ]),
};

export const Source: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Source Row',
        columns: 2,
        cases: [
          {label: 'vertical', config: {src: 'GPS 1', options: {}}},
          {
            label: 'horizontal',
            config: {
              src: 'GPS 1',
              options: {direction: ReadoutDirection.horizontal},
            },
          },
        ],
      },
      {
        title: 'Source Interactions',
        columns: 3,
        cases: Object.values(ReadoutSourceInteraction).map((interaction) => ({
          label: interaction,
          config: {src: 'GPS 1', options: {src: {interaction}}},
        })),
      },
    ]),
};

export const SourcePicker: Story = {
  render: () => html`
    <obc-readout
      .label=${'SOG'}
      .unit=${'kn'}
      .src=${'GPS 1'}
      .value=${12.3}
      .fractionDigits=${1}
      .srcOptions=${{interaction: ReadoutSourceInteraction.picker}}
    >
      <div slot="src-picker-content">
        <obc-navigation-item label="GPS 1" data-value="GPS 1" checked>
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-navigation-item>
        <obc-navigation-item label="GPS 2" data-value="GPS 2">
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-navigation-item>
      </div>
    </obc-readout>
  `,
};

export const DataQuality: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Data Quality',
        columns: 4,
        cases: [
          {label: 'nominal', config: {options: {}}},
          {
            label: 'low-integrity',
            config: {
              options: {dataQuality: ReadoutDataQuality.lowIntegrity},
            },
          },
          {
            label: 'invalid',
            config: {options: {dataQuality: ReadoutDataQuality.invalid}},
          },
          {label: 'null value (dash)', config: {value: null, options: {}}},
        ],
      },
      {
        title: 'Per-Block Data Quality (independent of the Readout)',
        columns: 3,
        cases: [
          {
            label: 'value low-integrity',
            config: {
              options: {
                value: {dataQuality: ReadoutDataQuality.lowIntegrity},
              },
            },
          },
          {
            label: 'setpoint invalid',
            config: {
              hasSetpoint: true,
              options: {
                setpoint: {dataQuality: ReadoutDataQuality.invalid},
              },
            },
          },
          {
            label: 'src invalid',
            config: {
              src: 'GPS 1',
              options: {src: {dataQuality: ReadoutDataQuality.invalid}},
            },
          },
        ],
      },
    ]),
};

// Mirrors the old readout alert stories: an RPM readout with a setpoint and
// degree glyphs inside an alert frame that carries the alert-category badge
// (no explicit frame `type`, so the wrapWithAlertFrame default — the small
// side flip with the category icon — applies, as it did before the rework).
const ALERT_FRAME: AlertFrameConfig = {
  mode: ObcAlertFrameMode.ackedActive,
};

const alertShowcase = (alert: AlertFrameConfig) =>
  showcaseReadout({
    value: 42,
    label: 'RPM',
    unit: 'rpm',
    hasSetpoint: true,
    setpoint: 12,
    options: {hasDegree: true, alert},
  });

export const Alarm: Story = {
  render: () => alertShowcase({...ALERT_FRAME, status: AlertType.Alarm}),
};

export const LevelCritical: Story = {
  render: () =>
    alertShowcase({
      ...ALERT_FRAME,
      status: AlertType.LevelCritical,
      mode: ObcAlertFrameMode.unackedActive,
    }),
};

export const SetpointTouch: Story = {
  render: () =>
    renderShowcase([
      {
        title:
          'Touch (focus) — the Setpoint Triangle Is Highlighted While Adjusting',
        columns: 2,
        cases: [
          {
            label: 'normal',
            config: {
              hasSetpoint: true,
              options: {priority: ReadoutPriority.enhanced},
            },
          },
          {
            label: 'touching (focus)',
            config: {
              hasSetpoint: true,
              options: {
                priority: ReadoutPriority.enhanced,
                setpoint: {touching: true},
              },
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
  interaction: ReadoutSetpointInteraction;
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
          <obc-readout
            id="ro-anim-demo"
            .label=${'Heading'}
            .unit=${'DEG'}
            .value=${AWAY}
            .hasSetpoint=${true}
            .setpoint=${SETPOINT}
            .size=${ReadoutSize.large}
            .hasDegree=${true}
            .priority=${ReadoutPriority.enhanced}
            .setpointOptions=${{interaction: config.interaction}}
          ></obc-readout>
        </div>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button id="ro-btn-away" style="padding:8px 16px; cursor:pointer;">
            ${config.awayLabel}
          </button>
          <button id="ro-btn-reach" style="padding:8px 16px; cursor:pointer;">
            ${config.reachLabel}
          </button>
        </div>
        <div
          id="ro-anim-status"
          style="font:12px/1.4 monospace; color:var(--element-neutral-color, #666);"
        >
          value=${AWAY}, setpoint=${SETPOINT}
        </div>
      </div>
    `,
    play: async ({canvasElement}) => {
      await new Promise((r) => setTimeout(r, 300));
      const el = canvasElement.querySelector('#ro-anim-demo') as
        | (HTMLElement & {
            value: number;
            setpointOptions: ReadoutSetpointOptions;
          })
        | null;
      const status = canvasElement.querySelector(
        '#ro-anim-status'
      ) as HTMLElement | null;
      const btnAway = canvasElement.querySelector(
        '#ro-btn-away'
      ) as HTMLButtonElement | null;
      const btnReach = canvasElement.querySelector(
        '#ro-btn-reach'
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
    interaction: ReadoutSetpointInteraction.flipFlop,
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
    interaction: ReadoutSetpointInteraction.popUp,
    intro:
      'Pop-up: the setpoint shows while the value differs, then fades out (100ms) once the value reaches it. Press Play, or use the buttons.',
    awayLabel: 'Leave setpoint (124)',
    reachLabel: 'Reach setpoint (120)',
  }),
  tags: ['skip-test'],
};

export const Degree: Story = {
  render: () =>
    renderShowcase([
      {
        title: 'Degree Glyph & Degree Spacer (columns Stay Aligned)',
        columns: 3,
        cases: [
          {
            label: 'degree',
            config: {
              label: 'HDG',
              unit: 'DEG',
              options: {hasDegree: true},
            },
          },
          {
            label: 'degree spacer',
            config: {
              label: 'HDG',
              unit: 'DEG',
              options: {hasDegreeSpacer: true},
            },
          },
          {
            label: 'plain',
            config: {label: 'HDG', unit: 'DEG', options: {}},
          },
        ],
      },
    ]),
};

// Each card drops a different part; renderReadout passes nils through, so the
// missing part renders its true nil state (dash for a null value, omitted
// label/unit/src) rather than a demo default. Note the two distinct "no value"
// states: `hasValue=false` is a deliberate label-only LAYOUT (the old
// `labelOnly`, e.g. instrument centre labels) and hugs its remaining parts;
// a temporarily missing value is `value=null` — the dash keeps the value
// block at full size so nothing shifts when data arrives.
const MISSING_PARTS_CASES: {title: string; config: ReadoutConfig}[] = [
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
    config: {label: 'Heading', off: true, value: 123, unit: 'kn', src: 'GPS'},
  },
];

export const MissingParts: Story = {
  render: () => html`
    <style>
      ${showcaseStyle}
    </style>
    <div class="ro-sections">
      <section class="ro-section">
        <h3 class="ro-section-title">
          Missing Parts — Each Card Drops One Part
        </h3>
        <p class="ro-note">
          The two "no value" states differ on purpose: hasValue=false is a
          deliberate label-only layout that hugs its remaining parts, while a
          temporarily missing value should be value=null — the dash keeps the
          value block at full size, so the layout does not shift when data
          arrives (add maxDigits or a spaceReserver to pin the width too).
          Dynamic setpoint modes reserve their own space; see the Vertical
          story's flip-flop / pop-up cases.
        </p>
        <div
          class="ro-grid"
          style="grid-template-columns: repeat(3, max-content);"
        >
          ${MISSING_PARTS_CASES.map(
            (item) => html`
              <div class="ro-card">
                <div class="ro-card-title">${item.title}</div>
                ${renderReadout(item.config)}
              </div>
            `
          )}
        </div>
      </section>
    </div>
  `,
};

const PER_BLOCK_FRAME: AlertFrameConfig = {
  status: AlertType.Warning,
  mode: ObcAlertFrameMode.ackedActive,
  type: ObcAlertFrameType.Regular,
};

export const PerBlockAlertFrame: Story = {
  render: () =>
    renderShowcase([
      {
        title:
          'Value Alert Frame — a Pure Overlay Around the Value Reading, Never Shifting Content',
        columns: 2,
        cases: [
          {label: 'plain', config: {options: {}}},
          {
            label: 'value framed',
            config: {options: {value: {alert: PER_BLOCK_FRAME}}},
          },
          {
            label: 'degree · plain',
            config: {value: 287, unit: 'T', options: {hasDegree: true}},
          },
          {
            label: 'degree · value framed',
            config: {
              value: 287,
              unit: 'T',
              options: {hasDegree: true, value: {alert: PER_BLOCK_FRAME}},
            },
          },
        ],
      },
      {
        title: 'Setpoint / Advice Block Frames — Hug Their Own Block',
        columns: 2,
        cases: [
          {
            label: 'setpoint framed',
            config: {
              hasSetpoint: true,
              options: {setpoint: {alert: PER_BLOCK_FRAME}},
            },
          },
          {
            label: 'advice framed',
            config: {
              hasAdvice: true,
              options: {advice: {alert: PER_BLOCK_FRAME}},
            },
          },
          {
            label: 'all three framed',
            config: {
              hasSetpoint: true,
              hasAdvice: true,
              options: {
                value: {alert: PER_BLOCK_FRAME},
                setpoint: {alert: PER_BLOCK_FRAME},
                advice: {alert: PER_BLOCK_FRAME},
              },
            },
          },
          {
            label: 'horizontal · value framed',
            config: {
              hasSetpoint: true,
              options: {
                direction: ReadoutDirection.horizontal,
                value: {alert: PER_BLOCK_FRAME},
              },
            },
          },
        ],
      },
    ]),
};

// The debug overlay outlines the readout building blocks (red), the degree
// columns (blue) and the degree spacer (green) so the reserved widths that keep
// side-by-side readouts aligned are visible.
export const DebugOverlay: StoryObj<
  ReadoutStoryArgs & {showDebugOverlay: boolean}
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
      ${showcaseStyle}
    </style>
    <div class="ro-sections">
      <section class="ro-section">
        <h3 class="ro-section-title">
          Reserved Widths Made Visible — Blocks (red), Degree Column (blue),
          Degree Spacer (green)
        </h3>
        <div
          class="ro-grid"
          style="grid-template-columns: repeat(3, max-content);"
        >
          <div class="ro-card">
            <div class="ro-card-title">degree</div>
            ${showcaseReadout({
              label: 'HDG',
              unit: 'DEG',
              value: 92,
              showDebugOverlay: args.showDebugOverlay,
              options: {hasDegree: true, maxDigits: 3},
            })}
          </div>
          <div class="ro-card">
            <div class="ro-card-title">degree spacer</div>
            ${showcaseReadout({
              label: 'COG',
              unit: 'DEG',
              value: 8,
              showDebugOverlay: args.showDebugOverlay,
              options: {hasDegreeSpacer: true, maxDigits: 3},
            })}
          </div>
          <div class="ro-card">
            <div class="ro-card-title">setpoint + advice reservers</div>
            ${showcaseReadout({
              hasSetpoint: true,
              hasAdvice: true,
              showDebugOverlay: args.showDebugOverlay,
              options: {
                size: ReadoutSize.medium,
                maxDigits: 4,
                value: {spaceReserver: '0000'},
                setpoint: {spaceReserver: '0000'},
                advice: {spaceReserver: '0000'},
              },
            })}
          </div>
        </div>
      </section>
    </div>
  `,
};
