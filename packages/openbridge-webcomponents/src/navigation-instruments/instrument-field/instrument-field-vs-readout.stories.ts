import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing, type TemplateResult} from 'lit';
import './instrument-field.js';
import {InstrumentFieldSize} from './instrument-field.js';
import '../readout/readout.js';
import {
  ReadoutSize,
  ReadoutPriority,
  ReadoutDirection,
  ReadoutAlignment,
  ReadoutSetpointInteraction,
} from '../readout/readout.js';
import '../readout-list-item/readout-list-item.js';
import {
  ReadoutListItemSize,
  ReadoutListItemPriority,
  ReadoutListItemStacking,
} from '../readout-list-item/readout-list-item.js';

/**
 * Migration reference: every `<obc-instrument-field>` story rebuilt with
 * `<obc-readout>`.
 *
 * The deprecated `<obc-instrument-field>` is on the left, the closest
 * `<obc-readout>` configuration on the right, and a verdict underneath saying
 * whether the two match, differ in a named way, or cannot be reconciled today.
 *
 * These are manual-mode stories: the args panel is deliberately empty because
 * the point is a fixed, comparable pair, not a playground. Use the
 * `Instruments/Instrument Field (deprecated)` and `Instruments/Readout` entries
 * for interactive controls.
 */
const meta = {
  title: 'Instruments/Instrument Field (deprecated) — Readout Comparison',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `# Instrument Field → Readout

\`<obc-instrument-field>\` is deprecated in favour of \`<obc-readout>\`. Each story
below rebuilds one \`<obc-instrument-field>\` story with \`<obc-readout>\` and
states how close the result is.

## Verdicts

| Badge | Meaning |
|-------|---------|
| **Fully covered** | The readout API expresses the case. Only the shared restyle below differs. |
| **Differs** | Reproducible, but with a case-specific difference on top of the restyle. |
| **Not reachable** | Cannot be produced with \`<obc-readout>\` as it stands. |

Nothing is pixel-identical: \`<obc-readout>\` is the OB 6.1 redraw of the same
information, so **Fully covered** means "no API gap", not "same pixels".

## Shared restyle differences

These four apply to *every* story below and are not repeated in each verdict.

1. **Typography** — \`obc-instrument-field\` sizes text by \`font-size\`; the readout
   stack sizes it by cap height through \`obc-textbox\`. The tiers line up by
   design, not by measurement.
2. **Label weight** — the readout renders \`label\` SemiBold
   (\`renderTextbox()\` hardcodes it); the legacy \`tag\` is regular weight.
3. **Setpoint marker** — the \`obi-input-right\` chevron replaces the legacy
   inline triangle.
4. **Setpoint emphasis** — this is the biggest one. \`<obc-readout>\` *always*
   renders the setpoint one tier below the value (\`readoutSecondarySize\`),
   because \`isSetpointEmphasized\` is false outside \`flip-flop\`/\`touching\`.
   \`obc-instrument-field\` only does that in one of its four layouts:

   | Legacy layout | Legacy setpoint | Legacy value | Agrees with readout? |
   |---|---|---|---|
   | vertical + \`regular\` | 16px | 16px | no — readout shrinks it |
   | vertical + \`enhanced\` | 16px | 34px | **yes** |
   | horizontal + \`regular\` | 16px | 16px | no — readout shrinks it |
   | horizontal + \`enhanced\` | 34px | 34px | no — readout shrinks it |

   So a setpoint that used to read at full value size now reads as a smaller
   secondary reference in three of the four layouts.

## Property mapping

| \`<obc-instrument-field>\` | \`<obc-readout>\` |
|---|---|
| \`size="regular"\` | \`size="small"\` |
| \`size="enhanced"\` | \`size="large"\` |
| — | \`size="medium"\` (new intermediate tier) |
| \`tag\` | \`label\` |
| \`unit\`, \`src\`, \`value\`, \`setpoint\`, \`hasSetpoint\`, \`fractionDigits\` | same names |
| \`hasSrc\` | derived from a non-blank \`src\` |
| *(default)* | \`priority="enhanced"\` |
| \`neutralColor\` | \`priority="regular"\` |
| \`showZeroPadding\` | \`valueOptions.hintedZeros\` |
| \`horizontal\` | \`direction="horizontal"\` |
| \`center\` | \`alignment="center"\` |
| \`labelOnly\` | \`hasValue={false}\` |
| \`autoHideSetpoint\` | \`setpointOptions.interaction="pop-up"\` |
| \`--obc-instrument-field-source-width\` | \`srcOptions.spaceReserver\` |
| \`--obc-instrument-field-tag-width\` | *no equivalent* |
| \`autoHideDeadband\` | *no equivalent* |
| \`off-value\` slot | \`offText\` (plain string only) |

The colour mapping is exact rather than approximate:
\`--element-neutral-enhanced-color\` (readout, enhanced) and
\`--instrument-enhanced-secondary-color\` (instrument-field, default) resolve to
the same value in every theme.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** How completely `<obc-readout>` reproduces the legacy story. */
enum Verdict {
  match = 'match',
  differs = 'differs',
  gap = 'gap',
}

const VERDICT_LABEL: Record<Verdict, string> = {
  [Verdict.match]: 'Fully covered',
  [Verdict.differs]: 'Differs',
  [Verdict.gap]: 'Not reachable',
};

const comparisonStyle = `
  .cmp {
    border: 1px solid var(--border-divider-color);
    border-radius: 8px;
    overflow: hidden;
    max-width: 900px;
  }
  .cmp-head {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-divider-color);
  }
  .cmp-name {
    font: 600 12px/1.2 var(--global-typography-font-family, inherit);
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--element-active-color);
  }
  .cmp-badge {
    font: 600 10px/1 var(--global-typography-font-family, inherit);
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 4px 8px; border-radius: 10px;
    border: 1px solid currentColor;
  }
  .cmp-badge.match { color: var(--alert-success-color); }
  .cmp-badge.differs { color: var(--alert-caution-color); }
  .cmp-badge.gap { color: var(--alert-alarm-color); }
  .cmp-cols { display: grid; grid-template-columns: 1fr 1fr; }
  .cmp-col { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
  .cmp-col + .cmp-col { border-left: 1px solid var(--border-divider-color); }
  .cmp-tag {
    font: 10px/1.2 ui-monospace, monospace;
    color: var(--element-neutral-color);
  }
  .cmp-stage {
    display: flex; align-items: center; justify-content: center;
    min-height: 92px; padding: 8px;
    border-radius: 6px;
    background: var(--container-background-color);
  }
  .cmp-alt { margin-top: 4px; }
  .cmp-notes {
    padding: 12px;
    border-top: 1px solid var(--border-divider-color);
    font: 12px/1.6 var(--global-typography-font-family, inherit);
    color: var(--element-neutral-color);
  }
  .cmp-notes p { margin: 0 0 8px; }
  .cmp-notes p:last-child { margin-bottom: 0; }
  .cmp-notes code {
    font: 11px/1.4 ui-monospace, monospace;
    color: var(--element-active-color);
  }
`;

function renderComparison(config: {
  name: string;
  verdict: Verdict;
  legacy: TemplateResult;
  modern: TemplateResult;
  /** A second reference render when another family member is the real answer. */
  modernAlt?: {tag: string; content: TemplateResult};
  notes: TemplateResult;
}): TemplateResult {
  return html`
    <style>
      ${comparisonStyle}
    </style>
    <div class="cmp">
      <div class="cmp-head">
        <span class="cmp-name">${config.name}</span>
        <span class="cmp-badge ${config.verdict}"
          >${VERDICT_LABEL[config.verdict]}</span
        >
      </div>
      <div class="cmp-cols">
        <div class="cmp-col">
          <span class="cmp-tag">&lt;obc-instrument-field&gt; (deprecated)</span>
          <div class="cmp-stage">${config.legacy}</div>
        </div>
        <div class="cmp-col">
          <span class="cmp-tag">&lt;obc-readout&gt;</span>
          <div class="cmp-stage">${config.modern}</div>
          ${config.modernAlt
            ? html`
                <span class="cmp-tag cmp-alt">${config.modernAlt.tag}</span>
                <div class="cmp-stage">${config.modernAlt.content}</div>
              `
            : nothing}
        </div>
      </div>
      <div class="cmp-notes">${config.notes}</div>
    </div>
  `;
}

// The legacy stories inherit `setpoint: 0` and `value: 0` from the file-level
// `args` in instrument-field.stories.ts. Both sides below bind the *effective*
// values explicitly so each pair reproduces what that story actually renders.

export const Primary: Story = {
  render: () =>
    renderComparison({
      name: 'Primary',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          hasSetpoint
          .setpoint=${123}
          .value=${123}
          tag="HDG"
          unit="DEG"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.small}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${123}
          .value=${123}
          label="HDG"
          unit="DEG"
        ></obc-readout>
      `,
      notes: html`
        <p>
          Same structure — setpoint over value, then label and unit on one row.
          <code>size="regular"</code> maps to <code>size="small"</code>, and the
          legacy default (<code>neutralColor</code> unset) maps to
          <code>priority="enhanced"</code>.
        </p>
        <p>
          No API gap, but the shared restyle is clearly visible here: the legacy
          <code>regular</code> layout renders setpoint and value at the same
          16px, while <code>obc-readout</code> drops the setpoint to the
          secondary tier. The two <code>123</code>s are the same size on the
          left and deliberately different sizes on the right.
        </p>
      `,
    }),
};

export const UndefinedSetpoint: Story = {
  render: () =>
    renderComparison({
      name: 'Undefined Setpoint',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          hasSetpoint
          .setpoint=${undefined}
          .value=${undefined}
          tag="HDG"
          unit="DEG"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.small}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${undefined}
          .value=${null}
          label="HDG"
          unit="DEG"
        ></obc-readout>
      `,
      notes: html`
        <p>
          Both render the unavailable dash for value and setpoint. Note the
          spelling: a missing readout value is <code>null</code>, not
          <code>undefined</code>.
        </p>
        <p>
          Both emit a single dash here because the legacy
          <code>maxDigits</code> default is 1 with padding off. The glyphs
          differ deliberately: legacy renders the ASCII hyphen, while
          <code>obc-readout</code> renders the digit-width U+2012 figure dash
          (#1105), so its placeholder aligns with the digits it stands in for.
          With padding on they also diverge in count: legacy widens the run to
          <code>maxDigits</code> (<code>---</code>) while
          <code>obc-readout</code> always renders one dash —
          <code>readoutNumericFormatOptions()</code> hardcodes
          <code>showZeroPadding: false</code>. The reserved width is unchanged
          either way, so nothing shifts. The contracts live in
          <code>docs/agents/readout-components.md</code>.
        </p>
      `,
    }),
};

export const Enhanced: Story = {
  render: () =>
    renderComparison({
      name: 'Enhanced',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          .setpoint=${0}
          .value=${10}
          tag="HDG"
          unit="/min"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${0}
          .value=${10}
          label="HDG"
          unit="/min"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>size="enhanced"</code> maps to <code>size="large"</code>. Legacy
          <code>enhanced</code> is the 34px
          <code>--global-typography-instrument-value-large-font-size</code>;
          readout <code>large</code> is <code>ObcTextboxSize.l</code>, a 24px
          cap height, which lands on roughly the same type size.
        </p>
        <p>
          The setpoint reads <code>0</code> rather than a dash — this story
          inherits <code>setpoint: 0</code> from the file-level args.
        </p>
      `,
    }),
};

export const EnhancedWithSrc: Story = {
  render: () =>
    renderComparison({
      name: 'Enhanced With Src',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          .setpoint=${0}
          .value=${10}
          tag="HDG"
          unit="/min"
          hasSrc
          src="GPS"
          .maxDigits=${3}
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${0}
          .value=${10}
          label="HDG"
          unit="/min"
          src="GPS"
          .maxDigits=${3}
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>maxDigits: 3</code> reserves three digit widths on both sides.
          Legacy renders the unfilled positions as transparent hint zeros;
          <code>obc-readout-block</code> reserves them through
          <code>obc-textbox</code>'s <code>length</code> slot instead. Same
          result, no layout shift.
        </p>
        <p>
          There is no <code>hasSrc</code> boolean —
          <code>obc-readout</code> derives it from a non-blank
          <code>src</code> and adds the divider automatically.
        </p>
      `,
    }),
};

export const EnhancedZeroPadding: Story = {
  render: () =>
    renderComparison({
      name: 'Enhanced Zero Padding',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          .setpoint=${0}
          .value=${10}
          tag="HDG"
          unit="/min"
          hasSrc
          src="GPS"
          showZeroPadding
          .maxDigits=${3}
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${0}
          .value=${10}
          label="HDG"
          unit="/min"
          src="GPS"
          .maxDigits=${3}
          .valueOptions=${{hintedZeros: true}}
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>showZeroPadding</code> maps to
          <code>valueOptions.hintedZeros</code>, and both render
          <code>010</code>. The hint zeros use different tokens, though: legacy
          <code>--border-outline-color</code>, readout
          <code>--element-inactive-color</code>.
        </p>
        <p>
          More importantly,
          <strong><code>maxDigits</code> does not mean the same thing</strong>.
          Legacy subtracts the whole formatted string — decimal point and
          fraction digits included — from <code>maxDigits</code>, while
          <code>obc-readout-block</code> counts integer digits only. The two
          agree here because <code>fractionDigits</code> is 0; with decimals the
          readout needs about <code>maxDigits - fractionDigits - 1</code> to pad
          the same way. Copying the number across unchanged over-pads.
        </p>
      `,
    }),
};

export const NoSetpoint: Story = {
  render: () =>
    renderComparison({
      name: 'No Setpoint',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          .value=${10}
          tag="HDG"
          unit="/min"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.small}
          .priority=${ReadoutPriority.enhanced}
          .value=${10}
          label="HDG"
          unit="/min"
        ></obc-readout>
      `,
      notes: html`
        <p>
          Dropping <code>hasSetpoint</code> removes the setpoint block on both
          sides; nothing else changes.
        </p>
      `,
    }),
};

export const WithDecimals: Story = {
  render: () =>
    renderComparison({
      name: 'With Decimals',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          .value=${1.3}
          .fractionDigits=${2}
          tag="Offset"
          unit="m"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.small}
          .priority=${ReadoutPriority.enhanced}
          .value=${1.3}
          .fractionDigits=${2}
          label="Offset"
          unit="m"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>fractionDigits: 2</code> formats identically
          (<code>1.30</code>). Neither side pads: the legacy default
          <code>maxDigits</code> of 1 is already shorter than the four-character
          result, and <code>obc-readout</code> defaults
          <code>maxDigits</code> to 0.
        </p>
      `,
    }),
};

export const NeutralColor: Story = {
  render: () =>
    renderComparison({
      name: 'Neutral Color',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          neutralColor
          .size=${InstrumentFieldSize.enhanced}
          .value=${63}
          tag="Speed"
          unit="KN"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.regular}
          .value=${63}
          label="Speed"
          unit="KN"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>neutralColor</code> maps to <code>priority="regular"</code> and
          the value colour matches exactly
          (<code>--element-neutral-color</code>).
        </p>
        <p>
          The difference is invisible here because this story has no setpoint.
          When one is present the two disagree: legacy hardcodes the setpoint to
          <code>--instrument-enhanced-secondary-color</code>, so
          <code>neutralColor</code> yields a grey value beside a blue setpoint.
          <code>obc-readout</code> refuses that combination by design — value
          and setpoint are always both neutral or both enhanced. That is a
          deliberate design correction, not an oversight, but it is a visual
          change for anyone relying on it.
        </p>
      `,
    }),
};

export const Horizontal: Story = {
  render: () =>
    renderComparison({
      name: 'Horizontal',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          horizontal
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          .setpoint=${123}
          .value=${63}
          tag="Speed"
          unit="KN"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .direction=${ReadoutDirection.horizontal}
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${123}
          .value=${63}
          label="Speed"
          unit="KN"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>horizontal</code> maps to <code>direction="horizontal"</code>,
          and both stack the label over the unit beside the value.
        </p>
        <p>
          <code>obc-readout</code> does not draw the vertical divider the legacy
          component places between the setpoint and the value (its
          <code>horizontal && !labelOnly && hasSetpoint</code> branch). The only
          divider a readout emits is the automatic one before the source.
        </p>
        <p>
          This is also where the shared setpoint-emphasis rule bites hardest.
          <code>horizontal</code> + <code>enhanced</code> is the one legacy
          layout that renders the setpoint at the full 34px value size, so
          <code>123</code> and <code>63</code> read as equals on the left. The
          readout demotes the setpoint to the secondary tier, so the pair reads
          as reference-plus-value instead. Nothing in the API restores the old
          balance — <code>flip-flop</code> and <code>touching</code> swap which
          block is emphasised, they never emphasise both.
        </p>
      `,
    }),
};

export const HorizontalWithSrc: Story = {
  render: () =>
    renderComparison({
      name: 'Horizontal With Src',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          horizontal
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          hasSrc
          .setpoint=${123}
          .value=${63}
          tag="Speed"
          unit="KN"
          src="GPS"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .direction=${ReadoutDirection.horizontal}
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${123}
          .value=${63}
          label="Speed"
          unit="KN"
          src="GPS"
        ></obc-readout>
      `,
      notes: html`
        <p>
          Adding the source brings back a divider on both sides —
          <code>obc-readout</code> draws one automatically before the source
          segment, so the legacy <code>src-divider</code> needs no counterpart.
        </p>
        <p>
          The setpoint-to-value divider is still missing, and the setpoint is
          still demoted to the secondary tier — both exactly as in
          <em>Horizontal</em> above.
        </p>
      `,
    }),
};

export const VerticalCenter: Story = {
  render: () =>
    renderComparison({
      name: 'Vertical Center',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          .size=${InstrumentFieldSize.enhanced}
          center
          .value=${1}
          .maxDigits=${3}
          showZeroPadding
          neutralColor
          tag="Speed"
          unit="kn"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.regular}
          .alignment=${ReadoutAlignment.center}
          .value=${1}
          .maxDigits=${3}
          .valueOptions=${{hintedZeros: true}}
          label="Speed"
          unit="kn"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>center</code> maps to <code>alignment="center"</code>, but the
          two centre different things. Legacy <code>center</code> applies
          <code>justify-content: center</code> to the label row only and leaves
          the value right-aligned; <code>alignment="center"</code> centres the
          value cluster, the meta zone and the source together. The readout
          result is the more consistent of the two.
        </p>
        <p>
          Both render identically <em>here</em> because each component is
          <code>fit-content</code> and the widest child is the value, so there
          is no slack to centre within. The difference only appears once the
          component is given more width than its content needs.
        </p>
        <p>
          <code>alignment</code> is documented
          <code>@availableWhen direction==vertical && stacking==stacked</code>,
          yet the CSS applies it to any vertical readout — including the
          <code>inline</code> stacking used here. The annotation is narrower
          than the behaviour, so props tooling may hide a control that works.
        </p>
      `,
    }),
};

export const HorizontalRegular: Story = {
  render: () =>
    renderComparison({
      name: 'Horizontal Regular',
      verdict: Verdict.gap,
      legacy: html`
        <obc-instrument-field
          horizontal
          .size=${InstrumentFieldSize.regular}
          hasSetpoint
          hasSrc
          .setpoint=${123}
          .value=${63}
          tag="Speed"
          unit="KN"
          src="GPS"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .direction=${ReadoutDirection.horizontal}
          .size=${ReadoutSize.small}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .setpoint=${123}
          .value=${63}
          label="Speed"
          unit="KN"
          src="GPS"
        ></obc-readout>
      `,
      modernAlt: {
        tag: '<obc-readout-list-item> (label-first alternative)',
        content: html`
          <obc-readout-list-item
            .size=${ReadoutListItemSize.small}
            .priority=${ReadoutListItemPriority.enhanced}
            .stacking=${ReadoutListItemStacking.leadingUnit}
            hasSetpoint
            .setpoint=${123}
            .value=${63}
            label="Speed"
            unit="KN"
            src="GPS"
          ></obc-readout-list-item>
        `,
      },
      notes: html`
        <p>
          This is the one arrangement <code>obc-readout</code> cannot produce.
          At <code>horizontal</code> + <code>regular</code> the legacy component
          moves the tag to the <strong>front</strong> of the row (tag │ setpoint
          │ value │ unit │ src). <code>obc-readout</code> always emits the meta
          zone after the value, in both directions.
        </p>
        <p>
          The family does cover the shape —
          <code>obc-readout-list-item</code> with
          <code>stacking="leading-unit"</code> is the label-first layout, shown
          underneath for reference. It is a different component with a
          row-oriented API (label left, value right), so it is a re-layout
          rather than a drop-in swap.
        </p>
      `,
    }),
};

export const LabelOnly: Story = {
  render: () =>
    renderComparison({
      name: 'Label Only',
      verdict: Verdict.match,
      legacy: html`
        <obc-instrument-field
          labelOnly
          horizontal
          .size=${InstrumentFieldSize.enhanced}
          tag="Speed"
          unit="KN"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .hasValue=${false}
          .direction=${ReadoutDirection.horizontal}
          .size=${ReadoutSize.large}
          label="Speed"
          unit="KN"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>labelOnly</code> maps to <code>hasValue={false}</code>. Both
          drop the value and keep the label stacked over the unit. It must be
          set as a property (<code>.hasValue=\${false}</code>): the field is
          declared <code>attribute: false</code> because its default is
          <code>true</code>.
        </p>
        <p>
          For a value that is merely missing right now, keep
          <code>hasValue</code> and pass <code>value={null}</code> instead — the
          dash holds the block at full size, so the layout does not jump when
          data arrives.
        </p>
      `,
    }),
};

export const AutoHideSetpoint: Story = {
  render: () =>
    renderComparison({
      name: 'Auto Hide Setpoint',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          autoHideSetpoint
          .autoHideDeadband=${1}
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          .value=${10}
          .setpoint=${10}
          tag="HDG"
          unit="/min"
          hasSrc
          src="GPS"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .value=${10}
          .setpoint=${10}
          .setpointOptions=${{
            interaction: ReadoutSetpointInteraction.popUp,
          }}
          label="HDG"
          unit="/min"
          src="GPS"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>autoHideSetpoint</code> maps to
          <code>setpointOptions.interaction="pop-up"</code>. Both hide the
          setpoint here and both keep its space, so nothing shifts.
        </p>
        <p>
          The trigger differs. <code>autoHideDeadband</code> is a tolerance in
          the value's own units, while pop-up compares the
          <strong>rendered</strong> strings via
          <code>isDisplayedAtSetpoint</code>. A deadband is therefore only
          expressible through <code>fractionDigits</code> — at
          <code>fractionDigits: 0</code> the readout hides within ±0.5, and the
          <code>autoHideDeadband: 1</code> used here has no equivalent.
        </p>
      `,
    }),
};

export const Off: Story = {
  render: () =>
    renderComparison({
      name: 'Off',
      verdict: Verdict.gap,
      legacy: html`
        <obc-instrument-field
          off
          .size=${InstrumentFieldSize.enhanced}
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          off
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
        ></obc-readout>
      `,
      notes: html`
        <p>
          Both substitute the value with <code>OFF</code>, and the readout adds
          <code>offText</code> to change the word. But the legacy
          <code>off</code> state also dims the value, label and source to
          <code>--element-inactive-color</code>, and nothing in the readout
          stack does: <code>off</code> never reaches the root class list, and no
          rule in <code>readout.css</code> or
          <code>readout-block.css</code> styles it. The text stays at full value
          colour — enhanced blue here rather than inactive grey.
        </p>
        <p>
          The legacy <code>off-value</code> slot has no counterpart either;
          <code>offText</code> takes a plain string only.
        </p>
      `,
    }),
};

export const AlignMultiple: Story = {
  render: () =>
    renderComparison({
      name: 'Align Multiple',
      verdict: Verdict.gap,
      legacy: html`
        <div
          style="display: flex; flex-direction: column; align-items: end;
            --obc-instrument-field-source-width: 60px;
            --obc-instrument-field-tag-width: 5ch;"
        >
          <obc-instrument-field
            .size=${InstrumentFieldSize.enhanced}
            horizontal
            hasSetpoint
            .setpoint=${360}
            .value=${3}
            .maxDigits=${3}
            tag="HDG"
            unit="DEG"
            src="GPS"
            hasSrc
          ></obc-instrument-field>
          <obc-instrument-field
            .size=${InstrumentFieldSize.enhanced}
            horizontal
            hasSetpoint
            .setpoint=${100}
            .value=${100}
            .maxDigits=${3}
            tag="Depth"
            unit="M"
            hasSrc
            src="GPS"
          ></obc-instrument-field>
          <obc-instrument-field
            .size=${InstrumentFieldSize.enhanced}
            horizontal
            hasSetpoint
            .setpoint=${10}
            .value=${9}
            .maxDigits=${3}
            tag="STW"
            unit="KN"
            hasSrc
            src="GYRO 2"
          ></obc-instrument-field>
        </div>
      `,
      modern: html`
        <div style="display: flex; flex-direction: column; align-items: end;">
          <obc-readout
            .size=${ReadoutSize.large}
            .priority=${ReadoutPriority.enhanced}
            .direction=${ReadoutDirection.horizontal}
            hasSetpoint
            .setpoint=${360}
            .value=${3}
            .maxDigits=${3}
            label="HDG"
            unit="DEG"
            src="GPS"
            .unitOptions=${{spaceReserver: 'DEG'}}
            .srcOptions=${{spaceReserver: 'GYRO 2'}}
          ></obc-readout>
          <obc-readout
            .size=${ReadoutSize.large}
            .priority=${ReadoutPriority.enhanced}
            .direction=${ReadoutDirection.horizontal}
            hasSetpoint
            .setpoint=${100}
            .value=${100}
            .maxDigits=${3}
            label="Depth"
            unit="M"
            src="GPS"
            .unitOptions=${{spaceReserver: 'DEG'}}
            .srcOptions=${{spaceReserver: 'GYRO 2'}}
          ></obc-readout>
          <obc-readout
            .size=${ReadoutSize.large}
            .priority=${ReadoutPriority.enhanced}
            .direction=${ReadoutDirection.horizontal}
            hasSetpoint
            .setpoint=${10}
            .value=${9}
            .maxDigits=${3}
            label="STW"
            unit="KN"
            src="GYRO 2"
            .unitOptions=${{spaceReserver: 'DEG'}}
            .srcOptions=${{spaceReserver: 'GYRO 2'}}
          ></obc-readout>
        </div>
      `,
      notes: html`
        <p>
          Legacy aligns a column of fields with two CSS variables:
          <code>--obc-instrument-field-tag-width</code> and
          <code>--obc-instrument-field-source-width</code>.
        </p>
        <p>
          <code>obc-readout</code> replaces the source variable with
          <code>srcOptions.spaceReserver</code> and adds
          <code>unitOptions.spaceReserver</code> — both set here — but there is
          <strong>no label reserver</strong>:
          <code>renderMetaZone()</code> calls
          <code>renderTextbox('label', …)</code> without one, and no
          <code>labelOptions</code> property exists. Because the meta zone is as
          wide as its widest child, the ragged <code>HDG</code> /
          <code>Depth</code> / <code>STW</code> labels give each row a different
          total width — and since the stack is right-aligned, everything to the
          <em>left</em> of the meta zone goes ragged with it. Compare the
          setpoint column: square on the left, stepped on the right.
        </p>
        <p>
          <code>obc-readout-list</code> does not help either — it aligns
          <code>obc-readout-list-item</code> rows only.
          <code>::part(label)</code> is exposed and can be given a width, but it
          bypasses the <code>length</code>-slot reserve the rest of the family
          uses.
        </p>
      `,
    }),
};
