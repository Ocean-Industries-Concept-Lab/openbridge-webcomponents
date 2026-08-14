import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type TemplateResult} from 'lit';
import {ref} from 'lit/directives/ref.js';
import '../../bars-graphs/line-graph/line-graph.js';
import '../../bars-graphs/area-graph/area-graph.js';
import '../../navigation-instruments/gauge-trend/gauge-trend.js';
import '../../navigation-instruments/gauge-vertical/gauge-vertical.js';
import '../../navigation-instruments/gauge-horizontal/gauge-horizontal.js';
import '../bar-vertical/bar-vertical.js';
import '../bar-horizontal/bar-horizontal.js';
import '../../automation/automation-tank/automation-tank.js';
import {AdviceType} from '../../navigation-instruments/watch/advice.js';

const DATA = Array.from({length: 12}, (_, i) => ({
  label: String(i),
  value: 40 + 30 * Math.sin(i / 2),
}));

/**
 * How a subject is expected to size itself.
 *
 * - `fills`: told the cell's measured size as its aspect-ratio reference (the
 *   integration `obc-automation-tank` uses), so its painted surface must cover
 *   the cell exactly.
 * - `intrinsic`: owns its size by design — the fixed-config gauges, and any
 *   chart in pixel mode. Only checked for layout stability.
 */
enum SizingContract {
  /** Must cover the box it was given. */
  fills = 'fills',
  /** Owns its size; only checked for stability. */
  intrinsic = 'intrinsic',
}

interface Subject {
  label: string;
  contract: SizingContract;
  /**
   * Whether the harness must hand this subject the cell's measured size as its
   * aspect-ratio reference. The tanks measure their own chart cell internally,
   * so they are driven by the cell alone.
   */
  feedsSize?: boolean;
  render: () => TemplateResult;
}

interface Shape {
  label: string;
  outer: string;
  inner: string;
  /** Cells this small are below the components' min-content size. */
  degenerate?: boolean;
}

const FILL_STYLE = 'position:absolute;inset:0';

const SHAPES: Shape[] = [
  {label: '1.5:1', outer: '', inner: 'width:300px;height:200px'},
  {label: '1:1', outer: '', inner: 'width:240px;height:240px'},
  {label: '3:1', outer: '', inner: 'width:480px;height:160px'},
  {label: '6:1', outer: '', inner: 'width:600px;height:100px'},
  {label: '1:2', outer: '', inner: 'width:160px;height:320px'},
  {
    label: 'flex min/max + centred',
    outer: 'display:flex;width:420px;height:220px;align-items:center',
    inner: 'flex:1;min-height:150px;max-height:190px;align-self:center',
  },
  {
    label: 'grid track',
    outer:
      'display:grid;grid-template-columns:1fr 1fr;width:480px;height:200px',
    inner: 'min-width:0;min-height:0',
  },
  {
    label: 'aspect-ratio only',
    outer: '',
    inner: 'width:300px;aspect-ratio:2/1',
  },
  {
    label: 'tiny',
    outer: '',
    inner: 'width:120px;height:90px',
    degenerate: true,
  },
];

const SUBJECTS: Subject[] = [
  {
    label: 'gauge-trend',
    contract: SizingContract.fills,
    feedsSize: true,
    render: () =>
      html`<obc-gauge-trend
        style=${FILL_STYLE}
        .data=${DATA}
        .minValue=${0}
        .maxValue=${100}
        .value=${55}
        .chartFill=${true}
        .hasLabelPadding=${false}
      ></obc-gauge-trend>`,
  },
  {
    label: 'gauge-trend + bar + scale',
    contract: SizingContract.fills,
    feedsSize: true,
    render: () =>
      html`<obc-gauge-trend
        style=${FILL_STYLE}
        .data=${DATA}
        .minValue=${0}
        .maxValue=${100}
        .value=${55}
        .chartFill=${true}
        .hasBar=${true}
        .hasScale=${true}
        .primaryTickmarkInterval=${25}
      ></obc-gauge-trend>`,
  },
  {
    label: 'gauge-trend + advice + setpoint',
    contract: SizingContract.fills,
    feedsSize: true,
    render: () =>
      html`<obc-gauge-trend
        style=${FILL_STYLE}
        .data=${DATA}
        .minValue=${0}
        .maxValue=${100}
        .value=${55}
        .chartFill=${true}
        .hasBar=${true}
        .hasAdvice=${true}
        .advice=${[
          {min: 75, max: 100, type: AdviceType.caution, hinted: false},
        ]}
        .setpoint=${70}
        .hasLabelPadding=${false}
      ></obc-gauge-trend>`,
  },
  {
    label: 'line-graph (aspect)',
    contract: SizingContract.fills,
    feedsSize: true,
    render: () =>
      html`<obc-line-graph
        style=${FILL_STYLE}
        .data=${DATA}
        .fixedAspectRatioScaling=${true}
        .hasLabelPadding=${false}
      ></obc-line-graph>`,
  },
  {
    label: 'area-graph (aspect)',
    contract: SizingContract.fills,
    feedsSize: true,
    render: () =>
      html`<obc-area-graph
        style=${FILL_STYLE}
        .data=${DATA}
        .fixedAspectRatioScaling=${true}
        .hasLabelPadding=${false}
      ></obc-area-graph>`,
  },
  {
    label: 'tank graph-and-bar',
    contract: SizingContract.fills,
    render: () =>
      html`<obc-automation-tank
        style=${FILL_STYLE}
        chart-mode="graph-and-bar"
        .chartData=${DATA}
        .value=${62}
        .max=${100}
        tag="TK"
      ></obc-automation-tank>`,
  },
  {
    label: 'tank graph horizontal',
    contract: SizingContract.fills,
    render: () =>
      html`<obc-automation-tank
        style=${FILL_STYLE}
        chart-mode="graph"
        orientation="horizontal"
        .chartData=${DATA}
        .value=${62}
        .max=${100}
        tag="TK"
      ></obc-automation-tank>`,
  },
  {
    label: 'tank bar mode',
    contract: SizingContract.fills,
    render: () =>
      html`<obc-automation-tank
        style=${FILL_STYLE}
        chart-mode="bar"
        .value=${62}
        .max=${100}
        tag="TK"
      ></obc-automation-tank>`,
  },
  {
    label: 'tank compact',
    contract: SizingContract.fills,
    render: () =>
      html`<obc-automation-tank
        style=${FILL_STYLE}
        chart-mode="graph-and-bar"
        compact
        .chartData=${DATA}
        .value=${62}
        .max=${100}
        tag="TK"
      ></obc-automation-tank>`,
  },
  {
    label: 'line-graph (pixel mode)',
    contract: SizingContract.intrinsic,
    render: () =>
      html`<obc-line-graph
        .data=${DATA}
        .width=${240}
        .height=${160}
      ></obc-line-graph>`,
  },
  {
    label: 'bar-vertical',
    contract: SizingContract.intrinsic,
    render: () =>
      html`<obc-bar-vertical
        .minValue=${0}
        .maxValue=${100}
        .value=${55}
        .hasBar=${true}
        .hasScale=${true}
        .primaryTickmarkInterval=${25}
        .fixedAspectRatio=${true}
      ></obc-bar-vertical>`,
  },
  {
    label: 'gauge-vertical',
    contract: SizingContract.intrinsic,
    render: () =>
      html`<obc-gauge-vertical
        .minValue=${0}
        .maxValue=${100}
        .value=${55}
        .primaryTickmarkInterval=${25}
      ></obc-gauge-vertical>`,
  },
];

/**
 * The painted surface to compare against the cell. For the tank that is the
 * canvas (or bar SVG) inside its chart cell, so the tank's own frame, readout
 * and tag are excluded; for everything else it is the component's own canvas
 * or SVG measured against the component box.
 */
function paintedSurface(
  el: Element
): {box: Element; paint: Element} | undefined {
  const shadow = (el as HTMLElement).shadowRoot;
  if (el.tagName === 'OBC-AUTOMATION-TANK') {
    const cell = shadow?.querySelector('.bar-container');
    const paint =
      shadow
        ?.querySelector('obc-gauge-trend')
        ?.shadowRoot?.querySelector('canvas') ??
      shadow?.querySelector('obc-bar-vertical svg, obc-bar-horizontal svg');
    return cell && paint ? {box: cell, paint} : undefined;
  }
  const paint =
    shadow?.querySelector('canvas') ??
    shadow?.querySelector('svg') ??
    el.querySelector('svg');
  return paint ? {box: el, paint} : undefined;
}

/**
 * The box the host reserved for a chart, when the subject is a host rather
 * than a chart itself. Used to tell "no room was given" apart from "room was
 * given and nothing rendered into it".
 */
function hostChartBox(el: Element): DOMRect | undefined {
  if (el.tagName !== 'OBC-AUTOMATION-TANK') return undefined;
  const cell = (el as HTMLElement).shadowRoot?.querySelector('.bar-container');
  return cell?.getBoundingClientRect();
}

const sizeHistory = new WeakMap<Element, Set<string>>();
const sizeFed = new WeakSet<Element>();

function trackStability(el: Element) {
  if (sizeHistory.has(el)) return;
  const seen = new Set<string>();
  sizeHistory.set(el, seen);
  new ResizeObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    seen.add(
      `${Math.round(entry.contentRect.width)}x${Math.round(entry.contentRect.height)}`
    );
  }).observe(el);
}

/**
 * Feed the measured cell size back to the subject as its aspect-ratio
 * reference. This is what `obc-automation-tank` does internally for its own
 * chart cell, and it is the integration the `fills` contract is defined
 * against — a bare chart is never expected to guess its container's shape.
 */
function feedCellSize(cell: HTMLElement, subject: Element) {
  if (sizeFed.has(subject)) return;
  sizeFed.add(subject);
  const target = subject as unknown as {width: number; height: number};
  new ResizeObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    const w = Math.round(entry.contentRect.width);
    const h = Math.round(entry.contentRect.height);
    if (w > 0 && h > 0) {
      target.width = w;
      target.height = h;
    }
  }).observe(cell);
}

/**
 * Attach live measurement to one rendered battleground and repaint verdicts.
 * Each battleground gets its own callback so that unmounting one does not tear
 * down the probes of its siblings.
 */
function createMeasure(): (root?: Element) => void {
  let probe: number | undefined;
  return (root?: Element) => {
    // Cleared unconditionally, not only on unmount: a re-invocation with a
    // mounted root (a rerender, or HMR) would otherwise leave the previous
    // interval running forever alongside the new one.
    if (probe !== undefined) clearInterval(probe);
    probe = undefined;
    if (!(root instanceof HTMLElement)) return;

    const paint = () => {
      let pass = 0;
      let total = 0;
      root.querySelectorAll<HTMLElement>('[data-cell]').forEach((cell) => {
        const subject = cell.firstElementChild;
        const readout = cell
          .closest<HTMLElement>('[data-case]')
          ?.querySelector<HTMLElement>('[data-readout]');
        if (!subject || !readout) return;

        // Wired from here rather than once up front: the `ref` callback runs
        // before the template's child parts commit, so at that point the cells
        // do not exist yet. Both helpers are idempotent.
        trackStability(subject);
        if (cell.dataset.feed === 'true') feedCellSize(cell, subject);

        const contract = cell.dataset.contract as SizingContract;
        const distinct = sizeHistory.get(subject)?.size ?? 0;
        const surface = paintedSurface(subject);
        const hostBox = hostChartBox(subject);

        // A host that gave its chart no room at all (a tank squeezed below the
        // height its badges, readout and tag need) cannot be held to the fill
        // contract. Reported rather than hidden, and kept distinct from "the
        // box has room but nothing rendered into it", which is a real failure.
        if (hostBox && hostBox.width * hostBox.height < 1) {
          readout.textContent = 'host left no room for a chart  (n/a)';
          readout.style.color = 'var(--element-neutral-color)';
          return;
        }

        if (!surface) {
          total += 1;
          readout.textContent = 'box has room but nothing rendered  FAIL';
          readout.style.color = 'var(--alert-alarm-color)';
          return;
        }

        const box = surface.box.getBoundingClientRect();
        const px = surface.paint.getBoundingClientRect();
        const fill =
          box.width * box.height > 0
            ? (px.width * px.height) / (box.width * box.height)
            : 0;
        const overflow = Math.max(px.width - box.width, px.height - box.height);
        const stable = distinct <= 1;
        const enforced = contract === SizingContract.fills;
        const ok = stable && (!enforced || (fill >= 0.99 && overflow <= 1));

        total += 1;
        if (ok) pass += 1;

        readout.textContent =
          `cell ${Math.round(box.width)}×${Math.round(box.height)}` +
          `  paint ${Math.round(px.width)}×${Math.round(px.height)}` +
          `  fills ${(fill * 100).toFixed(0)}%` +
          `  sizes ${distinct}` +
          (enforced ? (ok ? '  PASS' : '  FAIL') : '  (intrinsic)');
        readout.style.color = ok
          ? 'var(--element-neutral-color)'
          : 'var(--alert-alarm-color)';
      });

      const summary = root.querySelector<HTMLElement>('[data-summary]');
      if (summary) {
        summary.textContent = `${pass} / ${total} cells pass`;
        summary.style.color =
          pass === total
            ? 'var(--element-neutral-color)'
            : 'var(--alert-alarm-color)';
      }
    };

    paint();
    probe = window.setInterval(paint, 500);
  };
}

const MONO =
  'font:11px/1.5 monospace;color:var(--element-neutral-color);white-space:pre';

function cellFor(shape: Shape, subject: Subject): TemplateResult {
  const contract = shape.degenerate
    ? SizingContract.intrinsic
    : subject.contract;
  return html`
    <div data-case style="margin:0 12px 12px 0">
      <div style=${MONO}>${shape.label} · ${subject.label}</div>
      <div data-readout style=${MONO}>measuring…</div>
      <div style=${shape.outer}>
        <div
          data-cell
          data-feed=${String(!!subject.feedsSize)}
          data-contract=${contract}
          style="position:relative;overflow:hidden;outline:1px dashed var(--border-divider-color);${shape.inner}"
        >
          ${subject.render()}
        </div>
        ${shape.outer.includes('grid') ? html`<div></div>` : null}
      </div>
    </div>
  `;
}

function battleground(
  shapes: Shape[],
  subjects: Subject[],
  zoom = 1
): TemplateResult {
  return html`
    <div ${ref(createMeasure())}>
      <div
        data-summary
        style="font:14px monospace;padding:8px 0;position:sticky;top:0;background:var(--container-background-color);z-index:2"
      >
        measuring…
      </div>
      <div style=${zoom === 1 ? '' : `zoom:${zoom}`}>
        <div style="display:flex;flex-wrap:wrap;align-items:flex-start">
          ${subjects.flatMap((s) => shapes.map((shape) => cellFor(shape, s)))}
        </div>
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'Building Blocks/Chart Sizing Battleground',
  tags: ['skip-test'],
  parameters: {
    controls: {disable: true},
    docs: {
      description: {
        component:
          'A live matrix for the chart sizing contract. Every cell measures ' +
          'its own painted surface against the box it was given and prints a ' +
          'verdict, so a sizing regression shows up as a red FAIL rather than ' +
          'as an impression. Subjects marked `(intrinsic)` own their size by ' +
          'design and are only checked for layout stability — `sizes` counts ' +
          'the distinct rendered sizes a `ResizeObserver` has seen, so ' +
          'anything above 1 after settling means the layout is ringing.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Every subject in every container shape. `fills` subjects are fed the cell's
 * measured size as their aspect-ratio reference — the integration
 * `obc-automation-tank` uses — so their painted surface must cover the cell.
 *
 * The wide shapes (`3:1`, `6:1`) are the ones that regressed in issue #1138:
 * the canvas could not exceed twice its own height, so the remainder showed up
 * as symmetric empty margins.
 *
 * One cell is expected to be red: `1:2 · tank graph horizontal`. A horizontal
 * tank in a portrait box gets a 30px-wide chart cell, below the width its own
 * layout needs, so the chart overflows it. That is a tank layout limit rather
 * than a chart sizing one — it predates #1138 and is unchanged by its fix.
 */
export const ContainerShapes: Story = {
  render: () => battleground(SHAPES, SUBJECTS),
};

/**
 * A representative subject set repeated under CSS `zoom`. A global
 * `html { zoom: … }` is how a fixed layout is fitted to a display — the
 * `vue-demo` exposes exactly that as a user setting — so every level here is a
 * shape real deployments run in.
 *
 * Both halves of the double-application are covered: below 1 the canvas used
 * to shrink to `zoom²` of its cell, above 1 it used to overflow by the same
 * factor.
 */
export const ZoomLevels: Story = {
  render: () => {
    const subjects = SUBJECTS.filter((s) =>
      [
        'gauge-trend',
        'gauge-trend + bar + scale',
        'tank graph-and-bar',
        'area-graph (aspect)',
      ].includes(s.label)
    );
    const shapes = SHAPES.filter((s) => ['1.5:1', '3:1'].includes(s.label));
    return html`${[0.5, 0.8, 1, 1.25, 1.5, 2].map(
      (zoom) => html`
        <h3
          style="font:600 13px monospace;color:var(--element-active-color);margin:16px 0 4px"
        >
          zoom ${zoom}
        </h3>
        ${battleground(shapes, subjects, zoom)}
      `
    )}`;
  },
};

/**
 * Drives each cell through a sweep of sizes and keeps counting distinct
 * rendered sizes. A settled layout converges to one size per step; a circular
 * constraint between a component and the box that measures it shows up here as
 * a `sizes` count that keeps climbing (issue #1121).
 */
export const ResizeStress: Story = {
  render: () => {
    const subjects = SUBJECTS.filter((s) =>
      [
        'gauge-trend + bar + scale',
        'tank graph-and-bar',
        'tank graph horizontal',
        'line-graph (aspect)',
      ].includes(s.label)
    );
    const shape: Shape = {
      label: 'Animated',
      outer: '',
      inner: 'width:300px;height:200px',
    };
    const createdMeasure = createMeasure();
    let timer: number | undefined;
    const drive = (root?: Element) => {
      createdMeasure(root);
      // Same reasoning as createMeasure(): clear before starting, so a
      // rerender cannot leave two sweeps fighting over the same cells.
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
      if (!(root instanceof HTMLElement)) return;
      const steps = [
        [300, 200],
        [300, 340],
        [520, 340],
        [520, 140],
        [180, 140],
      ];
      let i = 0;
      timer = window.setInterval(() => {
        const [w, h] = steps[i++ % steps.length];
        root.querySelectorAll<HTMLElement>('[data-cell]').forEach((cell) => {
          cell.style.width = `${w}px`;
          cell.style.height = `${h}px`;
          // The size count is per step: the question is whether the layout
          // settles on ONE size for the box it was just given, not how many
          // boxes the sweep has been through.
          const subject = cell.firstElementChild;
          if (subject) sizeHistory.get(subject)?.clear();
        });
      }, 1200);
    };
    return html`<div ${ref(drive)}>${battleground([shape], subjects)}</div>`;
  },
};
