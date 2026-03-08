import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {LitElement, html} from 'lit';
import {
  computeExternalScaleLayout,
  renderExternalScale,
  type ExternalScaleConfig,
  ScaleType,
  FillMode,
  AdvicePosition,
  ExternalScaleOrientation,
  ExternalScaleSide,
} from './external-scale.js';
import {
  InstrumentState,
  Priority,
  FrameStyle,
  BorderRadiusPosition,
} from '../../navigation-instruments/types.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';
// Import the component for side-effects (custom element registration)
import '../bar-vertical/bar-vertical.js';
import type {ObcBarVertical} from '../bar-vertical/bar-vertical.js';

type ExternalScaleStoryArgs = Omit<ExternalScaleConfig, 'side'> & {
  /** Used when orientation==='vertical'. */
  sideVertical: ExternalScaleSide.left | ExternalScaleSide.right;
  /** Used when orientation==='horizontal'. */
  sideHorizontal: ExternalScaleSide.top | ExternalScaleSide.bottom;
};

const EXTERNAL_SCALE_STORY_TAG = 'obc-external-scale-story';

if (!customElements.get(EXTERNAL_SCALE_STORY_TAG)) {
  customElements.define(
    EXTERNAL_SCALE_STORY_TAG,
    class extends LitElement {
      static properties = {
        config: {attribute: false},
      } as const;

      declare config?: ExternalScaleConfig;

      private _computedBorderRadius?: number;
      private _borderRadiusObserver?: MutationObserver;
      private _resizeObserver?: ResizeObserver;

      override connectedCallback(): void {
        super.connectedCallback();
        this._refreshBorderRadiusFromCssVar();
        this._startObservers();
      }

      override disconnectedCallback(): void {
        this._borderRadiusObserver?.disconnect();
        this._borderRadiusObserver = undefined;
        this._resizeObserver?.disconnect();
        this._resizeObserver = undefined;
        super.disconnectedCallback();
      }

      override render() {
        if (!this.config) return html``;

        this._refreshBorderRadiusFromCssVar();

        const borderRadiusFallback =
          this.config.scaleType === ScaleType.condensed ? 4 : 8;
        const borderRadius = this._computedBorderRadius ?? borderRadiusFallback;

        const config: ExternalScaleConfig = {
          ...this.config,
          // Force numeric px radius so selective-corner path geometry can match the
          // CSS-variable-driven theme/component-size system.
          borderRadius,
        };

        const layout = computeExternalScaleLayout({
          orientation: config.orientation,
          side: config.side,
          hasBar: config.hasBar,
          hasScale: config.hasScale,
          labels: config.labels,
          barThickness: config.barThickness,
          tickThickness: config.tickThickness,
          labelThickness: config.labelThickness,
          length: config.length,
          scaleType: config.scaleType,
        });

        const parts = renderExternalScale(config);

        if (config.orientation === 'vertical') {
          const viewBoxX = layout.viewBoxPerpStart;
          const viewBoxY = -config.length / 2;
          const viewBoxWidth = layout.viewBoxThickness;
          const viewBoxHeight = config.length;

          return html`<svg
            width="${viewBoxWidth}px"
            height="${config.length}px"
            viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}"
            preserveAspectRatio="none"
          >
            ${parts.barContainer} ${parts.barFill} ${parts.scaleBackground}
            ${parts.tickmarks} ${parts.labels} ${parts.adviceOverlays}
            ${parts.currentValueDot} ${parts.setpoint}
          </svg>`;
        }

        const viewBoxX = 0;
        const viewBoxY = layout.viewBoxPerpStart;
        const viewBoxWidth = config.length;
        const viewBoxHeight = layout.viewBoxThickness;

        return html`<svg
          width="${config.length}px"
          height="${viewBoxHeight}px"
          viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}"
          preserveAspectRatio="none"
        >
          ${parts.barContainer} ${parts.barFill} ${parts.scaleBackground}
          ${parts.tickmarks} ${parts.labels} ${parts.adviceOverlays}
          ${parts.currentValueDot} ${parts.setpoint}
        </svg>`;
      }

      protected override createRenderRoot() {
        return this;
      }

      private _startObservers(): void {
        this._borderRadiusObserver?.disconnect();
        this._borderRadiusObserver = new MutationObserver(() => {
          this._refreshBorderRadiusFromCssVar();
          this.requestUpdate();
        });

        // Observe class/style changes up the ancestor chain so size/theme wrappers
        // (e.g. .obc-component-size-*) update the derived numeric radius.
        this._borderRadiusObserver.observe(this, {
          attributes: true,
          attributeFilter: ['class', 'style'],
        });

        let element: Element | null = this.parentElement;
        while (element) {
          this._borderRadiusObserver.observe(element, {
            attributes: true,
            attributeFilter: ['class', 'style'],
          });
          element = element.parentElement;
        }
        this._borderRadiusObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class', 'style'],
        });

        this._resizeObserver?.disconnect();
        this._resizeObserver = new ResizeObserver(() => {
          this._refreshBorderRadiusFromCssVar();
          this.requestUpdate();
        });
        this._resizeObserver.observe(this);
      }

      private _refreshBorderRadiusFromCssVar(): void {
        const raw = getComputedStyle(this)
          .getPropertyValue(
            '--instrument-components-watchface-frame-regular-border-radius'
          )
          .trim();

        const parsed = this._parseCssLengthToPx(raw);
        this._computedBorderRadius = parsed;
      }

      private _parseCssLengthToPx(value: string): number | undefined {
        if (!value) return undefined;

        const v = value.trim();
        const n = Number.parseFloat(v);
        if (!Number.isFinite(n)) return undefined;

        if (v.endsWith('px')) return n;

        if (v.endsWith('rem')) {
          const rootFontSize = Number.parseFloat(
            getComputedStyle(document.documentElement).fontSize
          );
          return Number.isFinite(rootFontSize) ? n * rootFontSize : undefined;
        }

        if (v.endsWith('em')) {
          const fontSize = Number.parseFloat(getComputedStyle(this).fontSize);
          return Number.isFinite(fontSize) ? n * fontSize : undefined;
        }

        return n;
      }
    }
  );
}

const meta = {
  title: 'Building Blocks/External Scale',
  tags: ['autodocs', '6.0'],
  parameters: {
    docs: {
      description: {
        component: `# External Scale renderer (pure SVG building block)

This module provides a side-aware, orientation-aware SVG “ruler/axis” renderer that can be used standalone, as an overlay axis for charts, or composed inside other components.

Unlike Lit components, this file exports **pure functions** that return \`SVGTemplateResult\` fragments. Consumers are responsible for creating the outer \`<svg>\` element (including \`viewBox\`, sizing, and \`preserveAspectRatio\`).

## What it renders
- **Bar container**: a rounded rectangle band (optional)
- **Bar fill**: value fill (0→value) or tinted range fill (fillMin→fillMax)
- **Tickmarks**: main + primary + secondary + tertiary tick lines (optional)
- **Labels**: numeric labels at primary tick interval (optional)
- **Advice overlays**: alert/advice/caution ranges with canonical dashed bounds
- **Setpoint marker**: a triangular marker that flips by side and scales when “at setpoint”

## Layout model
- \`orientation\`: \`'vertical' | 'horizontal'\` controls value→coordinate mapping
- \`side\`: where the scale attaches to the chart edge
  - vertical: \`'left' | 'right'\`
  - horizontal: \`'top' | 'bottom'\`
- The **chart edge is always at perpendicular coordinate \`0\`**. The scale expands outward into positive or negative perpendicular space depending on \`side\`.

Use \`computeExternalScaleLayout()\` to compute the minimal viewBox thickness for the selected bands (bar/ticks/labels).

## Theming & responsive sizing
This renderer uses CSS variables directly in SVG attributes.

It is designed to inherit theme and sizing variables from parent containers (e.g. \`.obc-component-size-*\` wrappers) the same way web components do.

Common variables involved:
- \`--global-typography-ui-label-font-size\`
- \`--instrument-frame-*-color\`, \`--instrument-*-*-color\`
- \`--instrument-components-watchface-frame-regular-border-radius\`

**Browser note (SVG geometry + CSS variables):**
Some browsers (notably Chrome) do not reliably resolve \`var(--...)\` inside SVG geometry attributes like \`rx\`/\`ry\`. The bar container and fill masks therefore provide numeric fallbacks and also set \`rx\`/\`ry\` via CSS geometry properties to allow theme overrides where supported.

## Usage examples

### Standalone usage
\`\`\`ts
import {html} from 'lit';
import {computeExternalScaleLayout, renderExternalScale} from './external-scale.js';

const config = {
  orientation: 'vertical',
  side: 'right',
  length: 320,
  paddingStart: 32,
  paddingEnd: 32,
  minValue: 0,
  maxValue: 100,
  hasBar: true,
  hasScale: true,
  labels: true,
  scaleBackground: false,
  barThickness: 24,
  tickThickness: 24,
  labelThickness: 60,
  mainTickmarks: [],
  primaryTickmarkInterval: 20,
  secondaryTickmarkInterval: 10,
  tertiaryTickmarkInterval: 2,
  scaleType: ScaleType.regular,
  frameStyle: FrameStyle.regular,
  priority: Priority.enhanced,
  fillMode: FillMode.fill,
  fillMin: 0,
  fillMax: 40,
  value: 40,
  setpoint: 50,
  atSetpoint: false,
  autoAtSetpoint: true,
  autoAtSetpointDeadband: 1,
  setpointAtZeroDeadband: 0.5,
  state: 'active',
  advicePosition: AdvicePosition.inner,
  advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
};

const layout = computeExternalScaleLayout(config);
const parts = renderExternalScale(config);

// Wrap returned fragments in an SVG.
const tpl = html\`<svg
  width="\${layout.viewBoxThickness}px"
  height="\${config.length}px"
  viewBox="\${layout.viewBoxPerpStart} \${-config.length / 2} \${layout.viewBoxThickness} \${config.length}"
  preserveAspectRatio="none"
>
  \${parts.barContainer}
  \${parts.barFill}
  \${parts.scaleBackground}
  \${parts.tickmarks}
  \${parts.labels}
  \${parts.adviceOverlays}
  \${parts.setpoint}
</svg>\`;
\`\`\`

### Web component wrappers
For common usage, prefer the thin wrappers:
- \`obc-bar-vertical\` (sets up vertical viewBox)
- \`obc-bar-horizontal\` (sets up horizontal viewBox)

Source of truth: \`packages/openbridge-webcomponents/src/building-blocks/external-scale/external-scale.ts\``,
      },
    },
  },
  argTypes: {
    orientation: {
      description:
        'Main axis orientation used for value-to-coordinate mapping.',
      control: {type: 'radio'},
      options: ['vertical', 'horizontal'],
    },
    sideVertical: {
      description:
        "Which side of the chart area this scale lives on when orientation='vertical'.",
      control: {type: 'radio'},
      options: ['left', 'right'],
      if: {arg: 'orientation', eq: 'vertical'},
    },
    sideHorizontal: {
      description:
        "Which side of the chart area this scale lives on when orientation='horizontal'.",
      control: {type: 'radio'},
      options: ['top', 'bottom'],
      if: {arg: 'orientation', eq: 'horizontal'},
    },
    length: {
      description:
        'Total length in pixels (vertical: height, horizontal: width), including padding.',
      control: {type: 'range', min: 0, max: 768},
    },
    paddingStart: {
      description:
        'Padding at start of main axis (top for vertical, left for horizontal).',
      control: {type: 'range', min: 0, max: 128},
    },
    paddingEnd: {
      description:
        'Padding at end of main axis (bottom for vertical, right for horizontal).',
      control: {type: 'range', min: 0, max: 128},
    },
    minValue: {
      description: 'Minimum scale value.',
      control: {type: 'number'},
    },
    maxValue: {
      description: 'Maximum scale value.',
      control: {type: 'number'},
    },
    hasBar: {
      description: 'Show bar.',
      control: {type: 'boolean'},
    },
    hasScale: {
      description: 'Show scale tickmarks.',
      control: {type: 'boolean'},
    },
    labels: {
      description: 'Show labels at primary tickmark intervals.',
      control: {type: 'boolean'},
    },
    scaleBackground: {
      description: 'Show background behind the scale tickmarks.',
      control: {type: 'boolean'},
    },
    borderRadiusPosition: {
      description:
        'Border radius position based on component layout. Determines which corners receive rounded borders.',
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
    },
    barThickness: {
      description: 'Bar band thickness in pixels (the container / fill area).',
      control: {type: 'range', min: 8, max: 48},
    },
    tickThickness: {
      description:
        'Tickmark band thickness in pixels (space reserved for tick lines).',
      control: {type: 'range', min: 8, max: 64},
    },
    labelThickness: {
      description:
        'Label band thickness in pixels (space reserved for numbers).',
      control: {type: 'range', min: 0, max: 120},
    },
    mainTickmarks: {
      description:
        'Array of values for main tickmarks. Defaults to [minValue, 0, maxValue] if empty.',
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
    },
    primaryTickmarkInterval: {
      description:
        'Interval for primary tickmarks. When undefined, no primary tickmarks are shown. When a positive number, primary tickmarks are shown at that interval.',
      control: {type: 'number', min: 0},
    },
    secondaryTickmarkInterval: {
      description:
        'Interval for secondary tickmarks. When undefined, no secondary tickmarks are shown. When a positive number, secondary tickmarks are shown at that interval.',
      control: {type: 'number', min: 0},
    },
    tertiaryTickmarkInterval: {
      description:
        'Interval for tertiary tickmarks. When undefined, no tertiary tickmarks are shown. When a positive number, tertiary tickmarks are shown at that interval.',
      control: {type: 'number', min: 0},
    },
    scaleType: {
      description:
        'Tick density preset. ScaleType.regular: longer ticks. ScaleType.condensed: shorter ticks.',
      control: {type: 'select'},
      options: Object.values(ScaleType),
    },
    frameStyle: {
      description:
        'Frame style preset. FrameStyle.regular: all ticks offset from bar edge by a gap. FrameStyle.flat: main ticks touch the bar edge. FrameStyle.framed: framed appearance. FrameStyle.instrument: instrument-style appearance.',
      control: {type: 'select'},
      options: Object.values(FrameStyle),
    },
    priority: {
      description:
        'Priority visual mode: when enhanced, uses enhanced instrument colors for bar fill and setpoint.',
      control: 'select',
      options: Object.values(Priority),
    },
    fillMode: {
      description:
        'Fill visualization mode. FillMode.fill: bar fill from fillMin to fillMax. FillMode.tint: bar fill from fillMin to fillMax with marker at value position.',
      control: {type: 'radio'},
      options: ['fill', 'tint'],
    },
    fillMin: {
      description: 'Minimum fill value for tint mode (defaults to 0).',
      control: {type: 'number'},
    },
    fillMax: {
      description: 'Maximum fill value for tint mode (defaults to value).',
      control: {type: 'number'},
    },
    value: {
      description: 'Current value used for fill and/or marker rendering.',
      control: {type: 'number'},
    },
    newSetpoint: {
      description:
        'New setpoint value being adjusted. When defined, the original setpoint is dimmed and this new marker is shown in focus state.',
      control: {type: 'number'},
    },
    atSetpoint: {
      description: 'Manual override used when autoAtSetpoint=false.',
      control: {type: 'boolean'},
    },
    autoAtSetpoint: {
      description:
        'When true, at-setpoint is derived from value/setpoint and deadband; when false, atSetpoint is used as a manual override.',
      control: {type: 'boolean'},
    },
    autoAtSetpointDeadband: {
      description: 'Deadband used for automatic at-setpoint detection.',
      control: {type: 'number', min: 0},
    },
    setpointAtZeroDeadband: {
      description:
        'Deadband around 0 where the setpoint indicator snaps to exactly 0.',
      control: {type: 'number', min: 0},
    },
    state: {
      description:
        'Instrument state (affects colors and some marker behavior).',
      control: {type: 'select'},
      options: Object.values(InstrumentState),
    },
    advicePosition: {
      description:
        'Where advice overlays are drawn relative to the bar/tick bands. center: in bar. inner: covers minor ticks. outer: no overlap.',
      control: {type: 'select'},
      options: ['center', 'inner', 'outer'],
    },
    advices: {
      description: 'Array of advice ranges (min/max/type/hinted).',
      control: {type: 'object'},
    },
    highlightCurrentValue: {
      description:
        'When true, displays a dot indicator at the current value position in the scale band.',
      control: {type: 'boolean'},
    },
  },
  args: {
    orientation: ExternalScaleOrientation.vertical,
    sideVertical: ExternalScaleSide.right,
    sideHorizontal: ExternalScaleSide.bottom,
    length: 320,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: 0,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: true,
    scaleBackground: false,
    borderRadiusPosition: undefined,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.regular,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: 40,
    setpoint: 40,
    newSetpoint: undefined,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.inner,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
    highlightCurrentValue: false,
  },
} satisfies Meta<ExternalScaleStoryArgs>;

export default meta;
type Story = StoryObj<ExternalScaleStoryArgs>;

function toConfig(args: ExternalScaleStoryArgs): ExternalScaleConfig {
  const {sideVertical, sideHorizontal, ...rest} = args;
  return {
    ...rest,
    side: rest.orientation === 'vertical' ? sideVertical : sideHorizontal,
  };
}

function renderScale(config: ExternalScaleConfig) {
  return html`<obc-external-scale-story
    .config=${config}
  ></obc-external-scale-story>`;
}

export const VerticalRightBasic: Story = {
  name: 'Vertical (right side, hasBar, advices, setpoint)',
  args: {
    orientation: ExternalScaleOrientation.vertical,
    sideVertical: ExternalScaleSide.right,
    sideHorizontal: ExternalScaleSide.bottom,
    length: 320,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: 0,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: true,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.enhanced,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: 40,
    setpoint: 50,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.inner,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
  render: (args) => renderScale(toConfig(args)),
};

export const VerticalWithCurrentValueDot: Story = {
  name: 'Vertical (with highlightCurrentValue dot)',
  args: {
    orientation: ExternalScaleOrientation.vertical,
    sideVertical: ExternalScaleSide.right,
    sideHorizontal: ExternalScaleSide.bottom,
    length: 320,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: 0,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: false,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.enhanced,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: 40,
    setpoint: 50,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.inner,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
    highlightCurrentValue: true,
  },
  render: (args) => renderScale(toConfig(args)),
};

export const VerticalLeftTint: Story = {
  name: 'Vertical (left side, hasBar, advices, setpoint, fillMode:tint)',
  args: {
    orientation: ExternalScaleOrientation.vertical,
    sideVertical: ExternalScaleSide.left,
    sideHorizontal: ExternalScaleSide.bottom,
    length: 370,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: -100,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: true,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.enhanced,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 50,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.center,
    advices: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
  render: (args) => renderScale(toConfig(args)),
};

export const HorizontalBottomBasic: Story = {
  name: 'Horizontal (bottom side, hasBar, advices, setpoint)',
  args: {
    orientation: ExternalScaleOrientation.horizontal,
    sideVertical: ExternalScaleSide.right,
    sideHorizontal: ExternalScaleSide.bottom,
    length: 480,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: 0,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: true,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.regular,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: 40,
    setpoint: 40,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.inner,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
  render: (args) => renderScale(toConfig(args)),
};

export const HorizontalTopTint: Story = {
  name: 'Horizontal (top side, hasBar, advices, setpoint, fillMode:tint)',
  args: {
    orientation: ExternalScaleOrientation.horizontal,
    sideVertical: ExternalScaleSide.right,
    sideHorizontal: ExternalScaleSide.top,
    length: 480,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: -100,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: true,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 50,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.enhanced,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 75,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.center,
    advices: [
      {min: -75, max: -60, type: AdviceType.advice, hinted: true},
      {min: 70, max: 90, type: AdviceType.caution, hinted: true},
    ],
  },
  render: (args) => renderScale(toConfig(args)),
};

export const VerticalRightScaleBackground: Story = {
  name: 'Vertical (right side, scaleBackground=true)',
  args: {
    orientation: ExternalScaleOrientation.vertical,
    sideVertical: ExternalScaleSide.right,
    sideHorizontal: ExternalScaleSide.bottom,
    length: 320,
    paddingStart: 32,
    paddingEnd: 32,
    minValue: 0,
    maxValue: 100,
    hasScale: true,
    labels: true,
    hasBar: true,
    scaleBackground: true,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    barThickness: 24,
    tickThickness: 24,
    labelThickness: 60,
    mainTickmarks: [],
    primaryTickmarkInterval: 20,
    secondaryTickmarkInterval: 10,
    tertiaryTickmarkInterval: 2,
    scaleType: ScaleType.regular,
    frameStyle: FrameStyle.regular,
    priority: Priority.enhanced,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: 40,
    setpoint: 50,
    atSetpoint: false,
    autoAtSetpoint: true,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: InstrumentState.active,
    advicePosition: AdvicePosition.inner,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
  render: (args) => renderScale(toConfig(args)),
};

/**
 * When `fixedAspectRatio=true`, the component scales proportionally (like CSS transform:scale)
 * based on container size, while keeping label font-size constant.
 *
 * - **false (default)**: Dimensions react to component properties
 * - **true**: "Freezes" internal calculations and scales the entire component as a vector
 *
 * This story demonstrates both modes side-by-side with resizable containers using
 * the pure function renderer.
 */
export const FixedAspectRatioComparison: StoryObj = {
  tags: ['!snapshot'],
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 16px;
      height: 600px;
    `;

    // Create two containers
    const containerNormal = document.createElement('div');
    containerNormal.style.cssText = `
      border: 2px dashed var(--instrument-frame-tertiary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 100px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
    `;

    const containerFixed = document.createElement('div');
    containerFixed.style.cssText = `
      border: 2px dashed var(--instrument-enhanced-primary-color);
      padding: 16px;
      resize: both;
      overflow: auto;
      min-width: 100px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
    `;

    const labelNormal = document.createElement('div');
    labelNormal.textContent = 'fixedAspectRatio=false (default)';
    labelNormal.style.cssText = `
      font-family: var(--font-family-main);
      font-size: 14px;
      color: var(--instrument-frame-tertiary-color);
      margin-bottom: 8px;
    `;

    const labelFixed = document.createElement('div');
    labelFixed.textContent = 'fixedAspectRatio=true (vector scaling)';
    labelFixed.style.cssText = `
      font-family: var(--font-family-main);
      font-size: 14px;
      color: var(--instrument-enhanced-primary-color);
      margin-bottom: 8px;
    `;

    // Normal bar (responsive to CSS variables)
    const barNormal = document.createElement(
      'obc-bar-vertical'
    ) as ObcBarVertical;
    barNormal.minValue = -20;
    barNormal.maxValue = 120;
    barNormal.height = 320;
    barNormal.hasBar = true;
    barNormal.hasScale = true;
    barNormal.showLabels = true;
    barNormal.value = 60;
    barNormal.setpoint = 80;
    barNormal.fillMode = FillMode.fill;
    barNormal.priority = Priority.regular;
    barNormal.primaryTickmarkInterval = 20;
    barNormal.fixedAspectRatio = false;
    barNormal.style.cssText = 'flex: 1; width: 100%;';

    // Make barNormal responsive to container height changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerHeight = entry.contentRect.height;
        const labelHeight = labelNormal.offsetHeight;
        const padding = 32; // 16px top + 16px bottom from container padding
        const availableHeight = containerHeight - labelHeight - padding;
        if (availableHeight > 0) {
          barNormal.height = availableHeight;
        }
      }
    });
    resizeObserver.observe(containerNormal);

    // Fixed aspect ratio bar (scales as vector)
    const barFixed = document.createElement(
      'obc-bar-vertical'
    ) as ObcBarVertical;
    barFixed.minValue = -20;
    barFixed.maxValue = 120;
    barFixed.height = 320;
    barFixed.hasBar = true;
    barFixed.hasScale = true;
    barFixed.showLabels = false;
    barFixed.value = 60;
    barFixed.setpoint = 80;
    barFixed.fillMode = FillMode.fill;
    barFixed.priority = Priority.enhanced;
    barFixed.primaryTickmarkInterval = 20;
    barFixed.fixedAspectRatio = true;
    barFixed.style.cssText = 'flex: 1; width: 100%;';

    containerNormal.appendChild(labelNormal);
    containerNormal.appendChild(barNormal);
    containerFixed.appendChild(labelFixed);
    containerFixed.appendChild(barFixed);

    wrapper.appendChild(containerNormal);
    wrapper.appendChild(containerFixed);

    return wrapper;
  },
};
