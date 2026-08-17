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
 * Migration reference: every `<obc-instrument-field>` story rendered next to
 * its closest `<obc-readout>` configuration.
 *
 * The deprecated `<obc-instrument-field>` is on the left, the closest
 * `<obc-readout>` configuration on the right, and a verdict underneath saying
 * whether the two match, differ in a named way, or cannot be reconciled today.
 * Verdicts were re-evaluated against the Figma 6.1 review (#1145): several
 * gaps from the original comparison (#1107) are now closed — `equal-size`
 * covers the legacy equal-sized setpoint layouts, and
 * `labelOptions.spaceReserver` closes the label-alignment gap.
 *
 * These are manual-mode stories: the args panel is deliberately not wired
 * because the point is a fixed, comparable pair, not a playground. Use the
 * `Instruments/Readout` entry for interactive controls.
 */
const meta = {
  title: 'Instruments/Instrument Field (deprecated)',
  tags: ['autodocs', '6.0', 'deprecated'],
  component: 'obc-instrument-field',
  parameters: {
    docs: {
      description: {
        component: `# Instrument Field → Readout

\`<obc-instrument-field>\` is deprecated in favour of \`<obc-readout>\`. Each story
below shows the legacy component next to its closest \`<obc-readout>\`
configuration and states how close the result is, so external consumers have a
recipe for migrating. Verdicts follow the Figma 6.1 review (#1145).

## Verdicts

| Badge | Meaning |
|-------|---------|
| **Fully covered** | The readout API expresses the case. Only the shared restyle below differs. |
| **Differs** | Reproducible, but with a case-specific difference on top of the restyle. |
| **Not reachable** | Cannot be produced with \`<obc-readout>\` as it stands. |

Nothing is pixel-identical: \`<obc-readout>\` is the OB 6.1 redraw of the same
information, so **Fully covered** means "no API gap", not "same pixels".

## Shared restyle differences

These apply to *every* story below and are not repeated in each verdict.

1. **Typography** — \`obc-instrument-field\` sizes text by \`font-size\`; the readout
   stack sizes it by cap height through \`obc-textbox\`. The tiers line up by
   design, not by measurement.
2. **Label size & weight** — per the 6.1 review, large readouts render the
   label at textbox \`s\` (bigger than the legacy tag) and labels are SemiBold
   only on \`enhanced\`-priority readouts. The legacy \`tag\` is always regular
   weight, so the weights agree at \`priority="regular"\` and differ (SemiBold)
   at \`priority="enhanced"\`. \`labelOptions.size: 'xs'\` opts back into the
   dense label.
3. **Setpoint marker** — the \`obi-input-right\` chevron replaces the legacy
   inline triangle. Since 6.1 the marker's size follows the setpoint block's
   rendered size (16px beside an \`s\` setpoint, 24px beside \`l\`).
4. **Setpoint emphasis** — \`<obc-readout>\` defaults to primary-secondary (the
   setpoint one tier below the value). The 6.1 \`equal-size\` interaction now
   reproduces the legacy layouts that rendered both at the same size:

   | Legacy layout | Legacy setpoint/value | Readout equivalent |
   |---|---|---|
   | vertical + \`regular\` | 16px / 16px | \`size="small"\` + \`equal-size\` |
   | vertical + \`enhanced\` | 16px / 34px | \`size="large"\` (default) |
   | horizontal + \`regular\` | 16px / 16px | not reachable — see *Horizontal Regular* |
   | horizontal + \`enhanced\` | 34px / 34px | \`size="large"\` + \`equal-size\` |

5. **Hinted zeros** — legacy paints them \`--border-outline-color\`; per the 6.1
   review the readout uses the lighter \`--element-disabled-color\` and always
   regular weight.
6. **Vertical source** — legacy renders the source directly under the label
   with no divider, and since 6.1 the vertical readout does the same (only the
   horizontal direction separates the source with a vertical rule).

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
| \`maxDigits\` | \`maxDigits\` — **different semantics**, see *Max Digits With Decimals* |
| \`horizontal\` | \`direction="horizontal"\` |
| \`center\` | \`alignment="center"\` |
| \`labelOnly\` | \`hasValue={false}\` |
| *(equal-sized setpoint layouts)* | \`setpointOptions.interaction="equal-size"\` |
| \`autoHideSetpoint\` | \`setpointOptions.interaction="pop-up"\` |
| \`autoHideDeadband\` | *no equivalent* — see *Auto Hide Deadband* |
| \`--obc-instrument-field-source-width\` | \`srcOptions.spaceReserver\` |
| \`--obc-instrument-field-tag-width\` | \`labelOptions.spaceReserver\` (new in 6.1) |
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
  /** A second reference render when another configuration is the real answer. */
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

// The original stories inherited `setpoint: 0` and `value: 0` from the old
// file-level `args`. Both sides below bind the *effective* values explicitly
// so each pair reproduces what that story actually rendered.

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
          .setpointOptions=${{
            interaction: ReadoutSetpointInteraction.equalSize,
          }}
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
          The legacy <code>regular</code> layout renders setpoint and value at
          the same 16px, and since 6.1
          <code>setpointOptions.interaction="equal-size"</code> reproduces that
          exactly (used here). Omit it and the readout defaults to
          primary-secondary — the setpoint one tier below the value.
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
          .setpointOptions=${{
            interaction: ReadoutSetpointInteraction.equalSize,
          }}
          label="HDG"
          unit="DEG"
        ></obc-readout>
      `,
      notes: html`
        <p>
          Both render the unavailable dash for value and setpoint. Note the
          spelling — the two properties differ: a missing
          <code>value</code> is <code>null</code> (its type is
          <code>number | string | null</code>), while a missing
          <code>setpoint</code> stays <code>undefined</code> (declared
          <code>setpoint?: number</code>; it does not accept <code>null</code>).
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
          <code>size="enhanced"</code> maps to <code>size="large"</code>, and
          this is the one legacy layout whose sizing agrees with the readout
          default: a 16px setpoint above a 34px value is exactly
          primary-secondary, so no <code>equal-size</code> is needed.
        </p>
        <p>
          Since 6.1 the large readout also renders its label at textbox
          <code>s</code> — visibly closer to the legacy enhanced tag than the
          old <code>xs</code> label was. The setpoint reads
          <code>0</code> rather than a dash — the original story inherited
          <code>setpoint: 0</code> from the file-level args.
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
          <code>obc-readout</code> derives it from a non-blank <code>src</code>.
          Since 6.1 the vertical readout renders the source without a divider,
          exactly like the legacy layout (the original comparison still drew
          one).
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
          <code>010</code>. The hint styling is the 6.1-reviewed one: the
          readout paints hints <code>--element-disabled-color</code> at regular
          weight (legacy uses the darker <code>--border-outline-color</code>).
        </p>
        <p>
          More importantly,
          <strong><code>maxDigits</code> does not mean the same thing</strong>.
          Legacy subtracts the whole formatted string — decimal point and
          fraction digits included — from <code>maxDigits</code>, while
          <code>obc-readout-block</code> counts integer digits only. The two
          agree here because <code>fractionDigits</code> is 0; see
          <em>Max Digits With Decimals</em> below for the divergence and the
          translation rule.
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
      verdict: Verdict.match,
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
          .setpointOptions=${{
            interaction: ReadoutSetpointInteraction.equalSize,
          }}
          label="Speed"
          unit="KN"
        ></obc-readout>
      `,
      notes: html`
        <p>
          <code>horizontal</code> maps to <code>direction="horizontal"</code>,
          and both stack the label over the unit beside the value.
          <code>horizontal</code> + <code>enhanced</code> is the legacy layout
          that renders the setpoint at the full 34px value size, and since 6.1
          <code>setpointOptions.interaction="equal-size"</code> reproduces it —
          <code>123</code> and <code>63</code> read as equals on both sides.
          This closed the biggest sizing gap of the original comparison.
        </p>
        <p>
          <code>obc-readout</code> draws no divider between the setpoint and the
          value where the legacy component has one. The 6.1 review settled this
          deliberately: "setpoint dividers are removed" — the only divider a
          horizontal readout emits is the one before the source. A design
          decision, not an API gap.
        </p>
      `,
    }),
};

export const HorizontalWithSrc: Story = {
  render: () =>
    renderComparison({
      name: 'Horizontal With Src',
      verdict: Verdict.match,
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
          .setpointOptions=${{
            interaction: ReadoutSetpointInteraction.equalSize,
          }}
          label="Speed"
          unit="KN"
          src="GPS"
        ></obc-readout>
      `,
      notes: html`
        <p>
          Adding the source brings a divider on both sides —
          <code>obc-readout</code> draws one automatically before the source
          segment ("Source-divider are there", 6.1 review), so the legacy
          <code>src-divider</code> needs no counterpart.
        </p>
        <p>
          As in <em>Horizontal</em>: <code>equal-size</code> restores the legacy
          sizing, and the missing setpoint-to-value divider is the 6.1 design.
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
          The 6.1 review confirmed this stays a non-goal: in the new structure
          the horizontal readout carries the large value size only, and the
          label-first shape is <code>obc-readout-list-item</code>'s job —
          <code>stacking="leading-unit"</code>, shown underneath. It is a
          different component with a row-oriented API (label left, value right),
          so it is a re-layout rather than a drop-in swap.
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
          setpoint here and both keep its space, so nothing shifts. The 6.1
          review confirmed this behaviour (value stays, setpoint fades); if the
          collapsed reading should still carry the in-control arrow, slot an
          <code>obi-input-right</code> into <code>value-icon</code> — see the
          Readout <em>SetpointPopUpWithValueArrow</em> story.
        </p>
        <p>
          The trigger differs. <code>autoHideDeadband</code> is a tolerance in
          the value's own units, while pop-up compares the
          <strong>rendered</strong> strings via
          <code>isDisplayedAtSetpoint</code>. A deadband is therefore only
          expressible through <code>fractionDigits</code> — at
          <code>fractionDigits: 0</code> the readout hides within ±0.5. See
          <em>Auto Hide Deadband</em> below for the case where they disagree.
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
          colour — enhanced blue here rather than inactive grey. Unchanged by
          the 6.1 review, which did not touch the off state.
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
      verdict: Verdict.match,
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
            .setpointOptions=${{
              interaction: ReadoutSetpointInteraction.equalSize,
            }}
            .setpoint=${360}
            .value=${3}
            .maxDigits=${3}
            label="HDG"
            unit="DEG"
            src="GPS"
            .labelOptions=${{spaceReserver: 'Depth'}}
            .unitOptions=${{spaceReserver: 'DEG'}}
            .srcOptions=${{spaceReserver: 'GYRO 2'}}
          ></obc-readout>
          <obc-readout
            .size=${ReadoutSize.large}
            .priority=${ReadoutPriority.enhanced}
            .direction=${ReadoutDirection.horizontal}
            hasSetpoint
            .setpointOptions=${{
              interaction: ReadoutSetpointInteraction.equalSize,
            }}
            .setpoint=${100}
            .value=${100}
            .maxDigits=${3}
            label="Depth"
            unit="M"
            src="GPS"
            .labelOptions=${{spaceReserver: 'Depth'}}
            .unitOptions=${{spaceReserver: 'DEG'}}
            .srcOptions=${{spaceReserver: 'GYRO 2'}}
          ></obc-readout>
          <obc-readout
            .size=${ReadoutSize.large}
            .priority=${ReadoutPriority.enhanced}
            .direction=${ReadoutDirection.horizontal}
            hasSetpoint
            .setpointOptions=${{
              interaction: ReadoutSetpointInteraction.equalSize,
            }}
            .setpoint=${10}
            .value=${9}
            .maxDigits=${3}
            label="STW"
            unit="KN"
            src="GYRO 2"
            .labelOptions=${{spaceReserver: 'Depth'}}
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
          <code>obc-readout</code> replaces them with per-block reservers, all
          set to the longest expected string on every row:
          <code>labelOptions.spaceReserver</code> (new in 6.1 — this closed the
          "no label reserver" gap that made the original comparison
          unreachable), <code>unitOptions.spaceReserver</code> and
          <code>srcOptions.spaceReserver</code>. With all three set, every
          column lines up and the setpoint edge stays square.
        </p>
        <p>
          For dense rows prefer <code>obc-readout-list</code> +
          <code>obc-readout-list-item</code>, which compute these reservers
          across rows automatically.
        </p>
      `,
    }),
};

// ---------------------------------------------------------------------------
// Edge cases the original stories never exercised. The pairs above can look
// identical while the underlying semantics differ; these two stories pin the
// divergence down so migrating consumers are not surprised by it.
// ---------------------------------------------------------------------------

export const MaxDigitsWithDecimals: Story = {
  render: () =>
    renderComparison({
      name: 'Max Digits With Decimals (edge case)',
      verdict: Verdict.differs,
      legacy: html`
        <obc-instrument-field
          .size=${InstrumentFieldSize.enhanced}
          .value=${1.5}
          .fractionDigits=${1}
          showZeroPadding
          .maxDigits=${4}
          tag="Offset"
          unit="m"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          .value=${1.5}
          .fractionDigits=${1}
          .maxDigits=${4}
          .valueOptions=${{hintedZeros: true}}
          label="Offset"
          unit="m"
        ></obc-readout>
      `,
      modernAlt: {
        tag: '<obc-readout> with translated maxDigits (4 − 1 − 1 = 2)',
        content: html`
          <obc-readout
            .size=${ReadoutSize.large}
            .priority=${ReadoutPriority.enhanced}
            .value=${1.5}
            .fractionDigits=${1}
            .maxDigits=${2}
            .valueOptions=${{hintedZeros: true}}
            label="Offset"
            unit="m"
          ></obc-readout>
        `,
      },
      notes: html`
        <p>
          The <em>Enhanced Zero Padding</em> pair looks identical only because
          its <code>fractionDigits</code> is 0. This story shows the divergence:
          legacy counts the <strong>whole formatted string</strong> against
          <code>maxDigits</code> (decimal point and fraction included), so
          <code>1.5</code> at <code>maxDigits: 4</code> pads to
          <code>01.5</code>. <code>obc-readout-block</code> counts
          <strong>integer digits only</strong>, so the same
          <code>maxDigits: 4</code> pads to <code>0001.5</code> (top right).
        </p>
        <p>
          To keep the rendering, translate the knob:
          <code
            >maxDigits<sub>readout</sub> = maxDigits<sub>legacy</sub> −
            fractionDigits − 1</code
          >
          (the −1 is the decimal point) — here <code>4 − 1 − 1 = 2</code>, shown
          underneath rendering <code>01.5</code> like the legacy side. Copying
          the number across unchanged over-pads.
        </p>
      `,
    }),
};

export const AutoHideDeadband: Story = {
  render: () =>
    renderComparison({
      name: 'Auto Hide Deadband (edge case)',
      verdict: Verdict.gap,
      legacy: html`
        <obc-instrument-field
          autoHideSetpoint
          .autoHideDeadband=${5}
          .size=${InstrumentFieldSize.enhanced}
          hasSetpoint
          .value=${8}
          .setpoint=${10}
          tag="HDG"
          unit="/min"
        ></obc-instrument-field>
      `,
      modern: html`
        <obc-readout
          .size=${ReadoutSize.large}
          .priority=${ReadoutPriority.enhanced}
          hasSetpoint
          .value=${8}
          .setpoint=${10}
          .setpointOptions=${{
            interaction: ReadoutSetpointInteraction.popUp,
          }}
          label="HDG"
          unit="/min"
        ></obc-readout>
      `,
      notes: html`
        <p>
          The <em>Auto Hide Setpoint</em> pair agrees because its value sits
          exactly at the setpoint. This story shows where the semantics diverge:
          with <code>value: 8</code>, <code>setpoint: 10</code> and
          <code>autoHideDeadband: 5</code> the legacy side hides the setpoint
          (|10 − 8| ≤ 5) while the pop-up readout keeps it visible — the
          rendered strings <code>8</code> and <code>10</code> differ, and
          <code>isDisplayedAtSetpoint</code> compares nothing else.
        </p>
        <p>
          A deadband wider than the display rounding has
          <strong>no readout equivalent</strong>: pop-up's tolerance is exactly
          ±half of the last displayed digit (<code>fractionDigits: 0</code> →
          ±0.5). Consumers who relied on a wide deadband must either accept the
          tighter rendered-string rule or pre-round the value they feed the
          readout.
        </p>
      `,
    }),
};
