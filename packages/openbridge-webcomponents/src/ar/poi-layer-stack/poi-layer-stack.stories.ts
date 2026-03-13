import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {PoiLayerSelectionMode} from './poi-layer-stack.js';
import './poi-layer-stack.js';
import '../poi-layer/poi-layer.js';
import '../poi-data/poi-data.js';
import {PoiDataVisualRectPreference} from '../poi-data/poi-data.js';
import '../poi-aton/poi-aton.js';
import '../poi-vessel/poi-vessel.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-beacon-general-east.js';
import '../../icons/icon-vessel-type-psv-outlined.js';

const isVitestBrowser = Boolean(
  (globalThis as {__vitest_browser__?: unknown}).__vitest_browser__
);

type PoiLayerStackArgs = {
  label: string;
  debug: boolean;
  selectionMode: PoiLayerSelectionMode;
};

const meta: Meta<PoiLayerStackArgs> = {
  title: 'AR/POI Layer Stack',
  tags: ['6.0'],
  component: 'obc-poi-layer-stack',
  decorators: [
    (story) => html`
      <style>
        .poi-layer-stack-story-frame {
          min-height: 220px;
          display: block;
        }
      </style>
      <div class="poi-layer-stack-story-frame">${story()}</div>
    `,
  ],
  args: {
    label: 'Layer A',
    debug: true,
    selectionMode: PoiLayerSelectionMode.Single,
  },
  argTypes: {
    selectionMode: {
      control: {type: 'select'},
      options: Object.values(PoiLayerSelectionMode),
    },
  },
} satisfies Meta<PoiLayerStackArgs>;

export default meta;
type Story = StoryObj<PoiLayerStackArgs>;
type AnimatedPoiData = HTMLElement & {
  x: number;
  y: number;
  boxWidth: number | null;
  boxHeight: number | null;
};

type AnimatedPoiSnapshotPose = {
  x: number;
  y: number;
  boxWidth: number;
  boxHeight: number;
};

type DiagnosticPoiData = HTMLElement & {
  x: number;
  y: number;
  buttonY?: number | null;
  getVisualRect: (preference: PoiDataVisualRectPreference) => DOMRect;
};

type DiagnosticLayerStack = HTMLElement & {
  selectionMap?: Map<
    DiagnosticPoiData,
    {originLayer: HTMLElement; targetViewportY: number}
  >;
};

type ButtonYDiagnosticMeasurement = {
  sourceTarget: DiagnosticPoiData;
  activeTarget: DiagnosticPoiData;
  isProxy: boolean;
  currentLayer: string;
  sourceButtonY: number;
  sourceTargetY: number;
  activeButtonY: number;
  activeTargetY: number;
  renderedHeight: number;
  buttonAnchorY: number;
  targetAnchorY: number;
  measuredLineHeight: number;
  storedTargetViewportY: number;
  selectedLayerTop: number;
  selectedLayerBottom: number;
  originLayerTop: number;
  jumpCalcFromTop: number;
  jumpCalcFromBottom: number;
  poiHostVarY: string;
  poiButtonVarY: string;
  poiHostTop: string;
  poiButtonTransform: string;
};

const selectionMultiAnimatedSnapshotPose: AnimatedPoiSnapshotPose[] = [
  {x: 542, y: 109, boxWidth: 44, boxHeight: 35},
  {x: 107, y: 117, boxWidth: 48, boxHeight: 34},
  {x: 264, y: 72, boxWidth: 35, boxHeight: 32},
  {x: 170, y: 92, boxWidth: 33, boxHeight: 33},
  {x: 403, y: 134, boxWidth: 32, boxHeight: 35},
  {x: 119, y: 87, boxWidth: 36, boxHeight: 38},
];

const waitForStorySettle = async (
  options: {drainTransitions?: boolean} = {}
) => {
  if ('fonts' in document) {
    await (document as Document & {fonts?: FontFaceSet}).fonts?.ready;
  }
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

  if (options.drainTransitions && isVitestBrowser) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 220);
    });
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );
  }
};

const renderTwoLayers = (args: PoiLayerStackArgs) => html`
  <style>
    obc-poi-layer-stack.stack {
      gap: 8px;
      width: 640px;
    }

    obc-poi-layer {
      --obc-poi-layer-min-height: 48px;
      width: 100%;
    }
  </style>
  <obc-poi-layer-stack class="stack" selection-mode=${args.selectionMode}>
    <obc-poi-layer label="Layer A" is-selected debug>
      <obc-poi-data .x=${220} .y=${90} .fixedTarget=${false}> </obc-poi-data>
    </obc-poi-layer>
    <obc-poi-layer label="Layer B" debug>
      <obc-poi-data .x=${120} .y=${110} .fixedTarget=${false}> </obc-poi-data>
      <obc-poi-data .x=${320} .y=${70} .fixedTarget=${false}> </obc-poi-data>
    </obc-poi-layer>
  </obc-poi-layer-stack>
`;

const renderThreeLayers = (args: PoiLayerStackArgs) => {
  return html`
    <style>
      obc-poi-layer-stack.stack {
        gap: 8px;
        width: 640px;
      }

      obc-poi-layer {
        --obc-poi-layer-min-height: 48px;
        width: 100%;
      }
    </style>
    <obc-poi-layer-stack class="stack" selection-mode=${args.selectionMode}>
      <obc-poi-layer label="Layer A" is-selected debug>
        <obc-poi-data .x=${520} .y=${110} .fixedTarget=${false}> </obc-poi-data>
      </obc-poi-layer>
      <obc-poi-layer label="Layer B" debug> </obc-poi-layer>
      <obc-poi-layer label="Layer C" ?debug=${args.debug}>
        <obc-poi-data .x=${80} .y=${120}> </obc-poi-data>
        <obc-poi-data .x=${260} .y=${80}> </obc-poi-data>
        <obc-poi-data .x=${180} .y=${100}> </obc-poi-data>
        <obc-poi-data .x=${420} .y=${140}> </obc-poi-data>
        <obc-poi-data .x=${140} .y=${90}> </obc-poi-data>
      </obc-poi-layer>
    </obc-poi-layer-stack>
  `;
};

export const SelectionSingle: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Single,
  },
  render: renderTwoLayers,
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
};

export const SelectionNone: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.None,
  },
  render: renderTwoLayers,
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
};

export const SelectionMulti: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Multi,
  },
  render: renderThreeLayers,
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
};

export const SelectionMultiAnimated: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Multi,
  },
  render: (args) => {
    const p0 = selectionMultiAnimatedSnapshotPose[0];
    const p1 = selectionMultiAnimatedSnapshotPose[1];
    const p2 = selectionMultiAnimatedSnapshotPose[2];
    const p3 = selectionMultiAnimatedSnapshotPose[3];
    const p4 = selectionMultiAnimatedSnapshotPose[4];
    const p5 = selectionMultiAnimatedSnapshotPose[5];

    return html`
      <style>
        obc-poi-layer-stack.stack-animated {
          gap: 8px;
          width: 640px;
        }

        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <obc-poi-layer-stack
        class="stack-animated"
        selection-mode=${args.selectionMode}
      >
        <obc-poi-layer label="Layer A" is-selected debug>
          <obc-poi-data
            class="anim-poi p0"
            .x=${isVitestBrowser ? p0.x : 520}
            .y=${isVitestBrowser ? p0.y : 110}
            .boxWidth=${isVitestBrowser ? p0.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p0.boxHeight : 32}
            .fixedTarget=${false}
          ></obc-poi-data>
        </obc-poi-layer>
        <obc-poi-layer label="Layer B" debug> </obc-poi-layer>
        <obc-poi-layer label="Layer C" ?debug=${args.debug}>
          <obc-poi-data
            class="anim-poi p1"
            .x=${isVitestBrowser ? p1.x : 80}
            .y=${isVitestBrowser ? p1.y : 120}
            .boxWidth=${isVitestBrowser ? p1.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p1.boxHeight : 32}
          ></obc-poi-data>
          <obc-poi-data
            class="anim-poi p2"
            .x=${isVitestBrowser ? p2.x : 260}
            .y=${isVitestBrowser ? p2.y : 80}
            .boxWidth=${isVitestBrowser ? p2.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p2.boxHeight : 32}
          ></obc-poi-data>
          <obc-poi-data
            class="anim-poi p3"
            .x=${isVitestBrowser ? p3.x : 180}
            .y=${isVitestBrowser ? p3.y : 100}
            .boxWidth=${isVitestBrowser ? p3.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p3.boxHeight : 32}
          ></obc-poi-data>
          <obc-poi-data
            class="anim-poi p4"
            .x=${isVitestBrowser ? p4.x : 420}
            .y=${isVitestBrowser ? p4.y : 140}
            .boxWidth=${isVitestBrowser ? p4.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p4.boxHeight : 32}
          ></obc-poi-data>
          <obc-poi-data
            class="anim-poi p5"
            .x=${isVitestBrowser ? p5.x : 140}
            .y=${isVitestBrowser ? p5.y : 90}
            .boxWidth=${isVitestBrowser ? p5.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p5.boxHeight : 32}
          ></obc-poi-data>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    `;
  },
  play: async ({canvasElement}) => {
    await waitForStorySettle({drainTransitions: true});
    if (isVitestBrowser) return;

    const root = canvasElement.querySelector(
      '.stack-animated'
    ) as HTMLElement | null;
    if (!root || root.dataset.animating === 'true') return;
    root.dataset.animating = 'true';

    const targets = Array.from(
      root.querySelectorAll('obc-poi-data.anim-poi')
    ) as AnimatedPoiData[];
    if (targets.length === 0) return;

    const base = targets.map((target) => ({
      x: Number.isFinite(target.x) ? target.x : 0,
      y: Number.isFinite(target.y) ? target.y : 96,
      boxWidth:
        typeof target.boxWidth === 'number' && Number.isFinite(target.boxWidth)
          ? target.boxWidth
          : 32,
      boxHeight:
        typeof target.boxHeight === 'number' &&
        Number.isFinite(target.boxHeight)
          ? target.boxHeight
          : 32,
    }));
    const ampX = [22, 28, 24, 26, 20, 22];
    const ampY = [8, 10, 9, 8, 7, 8];
    const ampW = [12, 18, 10, 14, 16, 11];
    const ampH = [8, 10, 12, 9, 13, 10];
    const freq = [0.72, 0.51, 0.66, 0.61, 0.56, 0.69];
    const phase = [0.15, 0.9, 1.8, 2.45, 3.15, 3.85];

    let rafId = 0;
    const tick = (now: number) => {
      if (!root.isConnected) {
        cancelAnimationFrame(rafId);
        return;
      }
      const t = now / 1000;
      targets.forEach((target, i) => {
        const waveX = t * freq[i] + phase[i];
        const waveY = t * (freq[i] + 0.18) + phase[i] * 0.72;
        const waveW = t * (freq[i] + 0.22) + phase[i] * 1.13;
        const waveH = t * (freq[i] + 0.31) + phase[i] * 0.84;
        target.x = base[i].x + ampX[i] * Math.sin(waveX);
        target.y = base[i].y + ampY[i] * Math.cos(waveY);
        target.boxWidth = Math.max(
          32,
          base[i].boxWidth + ampW[i] * (0.5 + 0.5 * Math.sin(waveW))
        );
        target.boxHeight = Math.max(
          32,
          base[i].boxHeight + ampH[i] * (0.5 + 0.5 * Math.cos(waveH))
        );
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
  },
};

const renderWithValues = (args: PoiLayerStackArgs) => html`
  <style>
    obc-poi-layer-stack.stack-values {
      gap: 8px;
      width: 720px;
    }

    obc-poi-layer-stack.stack-values obc-poi-layer {
      --obc-poi-layer-min-height: 88px;
      width: 100%;
    }
  </style>
  <obc-poi-layer-stack
    class="stack-values"
    selection-mode=${args.selectionMode}
  >
    <obc-poi-layer label="Layer A" is-selected debug>
      <obc-poi-data
        .x=${120}
        .y=${118}
        .fixedTarget=${false}
        .data=${[
          {value: '10', label: 'SOG', unit: 'kn'},
          {value: '182', label: 'COG', unit: 'deg'},
        ]}
      ></obc-poi-data>
    </obc-poi-layer>
    <obc-poi-layer label="Layer B" debug>
      <obc-poi-data
        .x=${300}
        .y=${92}
        .fixedTarget=${false}
        .data=${[
          {value: '24.5', label: 'Depth', unit: 'm'},
          {value: '6.2', label: 'Current', unit: 'kn'},
        ]}
      ></obc-poi-data>
      <obc-poi-data
        .x=${520}
        .y=${132}
        .fixedTarget=${false}
        .data=${[
          {value: '12', label: 'CPA', unit: 'min'},
          {value: '0.8', label: 'TCPA', unit: 'nm'},
        ]}
      ></obc-poi-data>
    </obc-poi-layer>
  </obc-poi-layer-stack>
`;

export const WithValues: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Single,
  },
  render: renderWithValues,
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
};

const renderMixedTypeLayers = (args: PoiLayerStackArgs) => html`
  <style>
    obc-poi-layer-stack.stack-mixed {
      gap: 8px;
      width: 640px;
    }

    obc-poi-layer-stack.stack-mixed obc-poi-layer {
      --obc-poi-layer-min-height: 48px;
      width: 100%;
    }
  </style>
  <obc-poi-layer-stack class="stack-mixed" selection-mode=${args.selectionMode}>
    <obc-poi-layer label="Selected" is-selected debug></obc-poi-layer>
    <obc-poi-layer label="Buoys" debug>
      <obc-poi-aton .x=${200} aton-type="aton" aton-style="green">
        <obi-beacon-general-east></obi-beacon-general-east>
      </obc-poi-aton>
      <obc-poi-aton .x=${350} aton-type="aton" aton-style="red">
        <obi-beacon-general-east></obi-beacon-general-east>
      </obc-poi-aton>
    </obc-poi-layer>
    <obc-poi-layer label="Vessels" debug>
      <obc-poi-data .x=${120} .y=${110}></obc-poi-data>
      <obc-poi-vessel .x=${280} .y=${96}>
        <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
      </obc-poi-vessel>
      <obc-poi-data .x=${420} .y=${80}></obc-poi-data>
    </obc-poi-layer>
  </obc-poi-layer-stack>
`;

export const MixedComponentTypes: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Multi,
  },
  render: renderMixedTypeLayers,
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
};

const readButtonYDiagnosticMeasurement = (
  root: HTMLElement
): ButtonYDiagnosticMeasurement | null => {
  const sourceTarget = root.querySelector(
    '#diagnostic-target'
  ) as DiagnosticPoiData | null;
  const activeTarget = (root.querySelector('[data-stack-proxy="true"]') ??
    sourceTarget) as DiagnosticPoiData | null;
  const stack = root.querySelector(
    'obc-poi-layer-stack.button-y-stack'
  ) as DiagnosticLayerStack | null;
  if (!sourceTarget || !activeTarget || !stack) {
    return null;
  }

  const buttonRect = activeTarget.getVisualRect(
    PoiDataVisualRectPreference.Anchor
  );
  const poi = activeTarget.shadowRoot?.querySelector('obc-poi');
  const poiHostStyle = poi ? getComputedStyle(poi) : null;
  const poiButton = poi?.shadowRoot?.querySelector(
    '.poi-button'
  ) as HTMLElement | null;
  const poiButtonStyle = poiButton ? getComputedStyle(poiButton) : null;
  const targetAnchor = poi?.shadowRoot?.querySelector(
    '.target-anchor'
  ) as HTMLElement | null;
  const targetRect = targetAnchor?.getBoundingClientRect() ?? null;
  const renderedHeight = activeTarget.getBoundingClientRect().height;
  const buttonAnchorY = buttonRect.bottom;
  const targetAnchorY = targetRect?.top ?? Number.NaN;
  const measuredLineHeight =
    Number.isFinite(buttonAnchorY) && Number.isFinite(targetAnchorY)
      ? Math.abs(targetAnchorY - buttonAnchorY)
      : Number.NaN;
  const currentLayer =
    activeTarget.closest('obc-poi-layer')?.getAttribute('label') ?? 'unknown';
  const isProxy = activeTarget !== sourceTarget;
  const selectedLayer =
    (Array.from(stack.querySelectorAll('obc-poi-layer')).find((layer) =>
      layer.hasAttribute('is-selected')
    ) as HTMLElement | undefined) ?? null;
  const record = stack.selectionMap?.get(sourceTarget);
  const originLayer = (record?.originLayer as HTMLElement | undefined) ?? null;
  const selectedLayerRect = selectedLayer?.getBoundingClientRect() ?? null;
  const originLayerRect = originLayer?.getBoundingClientRect() ?? null;
  const storedTargetViewportY = record?.targetViewportY ?? Number.NaN;

  return {
    sourceTarget,
    activeTarget,
    isProxy,
    currentLayer,
    sourceButtonY: Number(sourceTarget.buttonY ?? 0),
    sourceTargetY: Number(sourceTarget.y ?? 0),
    activeButtonY: Number(activeTarget.buttonY ?? 0),
    activeTargetY: Number(activeTarget.y ?? 0),
    renderedHeight,
    buttonAnchorY,
    targetAnchorY,
    measuredLineHeight,
    storedTargetViewportY,
    selectedLayerTop: selectedLayerRect?.top ?? Number.NaN,
    selectedLayerBottom: selectedLayerRect?.bottom ?? Number.NaN,
    originLayerTop: originLayerRect?.top ?? Number.NaN,
    jumpCalcFromTop:
      storedTargetViewportY - (selectedLayerRect?.top ?? Number.NaN),
    jumpCalcFromBottom:
      storedTargetViewportY - (selectedLayerRect?.bottom ?? Number.NaN),
    poiHostVarY: poiHostStyle?.getPropertyValue('--obc-poi-y').trim() ?? 'n/a',
    poiButtonVarY:
      poiHostStyle?.getPropertyValue('--obc-poi-button-y').trim() ?? 'n/a',
    poiHostTop: poiHostStyle?.top ?? 'n/a',
    poiButtonTransform: poiButtonStyle?.transform ?? 'n/a',
  };
};

const setDiagnosticGuide = (
  root: HTMLElement,
  selector: string,
  viewportY: number,
  label: string,
  visible: boolean
) => {
  const guide = root.querySelector(selector) as HTMLElement | null;
  if (!guide) {
    return;
  }

  if (!visible || !Number.isFinite(viewportY)) {
    guide.style.display = 'none';
    return;
  }

  const rootRect = root.getBoundingClientRect();
  guide.style.display = 'block';
  guide.style.top = `${viewportY - rootRect.top}px`;
  const labelElement = guide.querySelector(
    '.math-guide-label'
  ) as HTMLElement | null;
  if (labelElement) {
    labelElement.textContent = label;
  }
};

const updateButtonYDiagnosticPanel = (root: HTMLElement) => {
  const readout = root.querySelector('.button-y-readout') as HTMLElement | null;
  const measurement = readButtonYDiagnosticMeasurement(root);
  if (!measurement || !readout) {
    return;
  }

  setDiagnosticGuide(
    root,
    '.math-guide-stored-target',
    measurement.storedTargetViewportY,
    `stored targetViewportY ${Math.round(measurement.storedTargetViewportY)}px`,
    measurement.isProxy
  );
  setDiagnosticGuide(
    root,
    '.math-guide-selected-top',
    measurement.selectedLayerTop,
    `selected layer top ${Math.round(measurement.selectedLayerTop)}px`,
    measurement.isProxy
  );
  setDiagnosticGuide(
    root,
    '.math-guide-selected-bottom',
    measurement.selectedLayerBottom,
    `selected layer bottom ${Math.round(measurement.selectedLayerBottom)}px`,
    measurement.isProxy
  );
  setDiagnosticGuide(
    root,
    '.math-guide-origin-top',
    measurement.originLayerTop,
    `origin layer top ${Math.round(measurement.originLayerTop)}px`,
    measurement.isProxy
  );

  readout.innerHTML = `
    <div>current layer: <strong>${measurement.currentLayer}</strong></div>
    <div>render target: <strong>${measurement.isProxy ? 'proxy' : 'source'}</strong></div>
    <div>source buttonY prop: <strong>${Math.round(measurement.sourceButtonY)}px</strong></div>
    <div>source target y prop: <strong>${Math.round(measurement.sourceTargetY)}px</strong></div>
    <div>active buttonY prop: <strong>${Math.round(measurement.activeButtonY)}px</strong></div>
    <div>active target y prop: <strong>${Math.round(measurement.activeTargetY)}px</strong></div>
    <div>rendered host height: <strong>${Math.round(measurement.renderedHeight)}px</strong></div>
    <div>button anchor y: <strong>${Math.round(measurement.buttonAnchorY)}px</strong></div>
    <div>target anchor y: <strong>${
      Number.isFinite(measurement.targetAnchorY)
        ? Math.round(measurement.targetAnchorY)
        : 'n/a'
    }px</strong></div>
    <div>measured line height: <strong>${
      Number.isFinite(measurement.measuredLineHeight)
        ? Math.round(measurement.measuredLineHeight)
        : 'n/a'
    }px</strong></div>
    <div>stored targetViewportY: <strong>${
      Number.isFinite(measurement.storedTargetViewportY)
        ? Math.round(measurement.storedTargetViewportY)
        : 'n/a'
    }px</strong></div>
    <div>selected layer top: <strong>${
      Number.isFinite(measurement.selectedLayerTop)
        ? Math.round(measurement.selectedLayerTop)
        : 'n/a'
    }px</strong></div>
    <div>selected layer bottom: <strong>${
      Number.isFinite(measurement.selectedLayerBottom)
        ? Math.round(measurement.selectedLayerBottom)
        : 'n/a'
    }px</strong></div>
    <div>origin layer top: <strong>${
      Number.isFinite(measurement.originLayerTop)
        ? Math.round(measurement.originLayerTop)
        : 'n/a'
    }px</strong></div>
    <div>jump calc from top: <strong>${
      Number.isFinite(measurement.jumpCalcFromTop)
        ? Math.round(measurement.jumpCalcFromTop)
        : 'n/a'
    }px</strong></div>
    <div>jump calc from bottom: <strong>${
      Number.isFinite(measurement.jumpCalcFromBottom)
        ? Math.round(measurement.jumpCalcFromBottom)
        : 'n/a'
    }px</strong></div>
    <div>active button-target delta: <strong>${Math.round(
      measurement.activeTargetY - measurement.activeButtonY
    )}px</strong></div>
    <div>obc-poi --obc-poi-y: <strong>${measurement.poiHostVarY || 'n/a'}</strong></div>
    <div>obc-poi --obc-poi-button-y: <strong>${measurement.poiButtonVarY || 'n/a'}</strong></div>
    <div>obc-poi computed top: <strong>${measurement.poiHostTop || 'n/a'}</strong></div>
    <div>.poi-button transform: <strong>${measurement.poiButtonTransform || 'n/a'}</strong></div>
  `;
};

export const ButtonYLayerMoveDiagnostic: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Single,
  },
  render: () => html`
    <style>
      .button-y-diagnostic {
        width: 640px;
        display: grid;
        gap: 16px;
        position: relative;
      }

      .button-y-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
      }

      .button-y-controls button {
        border: 1px solid #8aa0b8;
        background: #eff3f7;
        color: #0f1720;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font: inherit;
      }

      .button-y-readout {
        display: grid;
        gap: 4px;
        font:
          12px/1.4 ui-monospace,
          monospace;
        color: #102132;
        background: #f4f7fa;
        border: 1px solid #c9d3de;
        border-radius: 10px;
        padding: 12px;
      }

      obc-poi-layer-stack.button-y-stack {
        gap: 8px;
        width: 100%;
      }

      obc-poi-layer-stack.button-y-stack obc-poi-layer {
        --obc-poi-layer-min-height: 48px;
        width: 100%;
        position: relative;
      }

      .target-y-guide {
        position: absolute;
        left: 0;
        right: 0;
        top: 110px;
        border-top: 1px dashed #d84e3f;
        pointer-events: none;
        z-index: 0;
      }

      .target-y-label {
        position: absolute;
        right: 10px;
        top: 96px;
        font:
          11px/1 ui-monospace,
          monospace;
        color: #d84e3f;
        background: rgba(255, 255, 255, 0.92);
        padding: 3px 6px;
        border-radius: 999px;
        pointer-events: none;
      }

      .math-guide {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px dashed;
        pointer-events: none;
        z-index: 2;
      }

      .math-guide-label {
        position: absolute;
        right: 10px;
        top: -14px;
        font:
          11px/1 ui-monospace,
          monospace;
        background: rgba(255, 255, 255, 0.92);
        padding: 3px 6px;
        border-radius: 999px;
        white-space: nowrap;
      }

      .math-guide-stored-target {
        border-color: #f08c00;
      }

      .math-guide-stored-target .math-guide-label {
        color: #a15c00;
      }

      .math-guide-selected-top {
        border-color: #2b6cb0;
      }

      .math-guide-selected-top .math-guide-label {
        color: #1f4f83;
      }

      .math-guide-selected-bottom {
        border-color: #7b61ff;
      }

      .math-guide-selected-bottom .math-guide-label {
        color: #5a47b8;
      }

      .math-guide-origin-top {
        border-color: #1f9d55;
      }

      .math-guide-origin-top .math-guide-label {
        color: #16683a;
      }
    </style>
    <div class="button-y-diagnostic">
      <div class="math-guide math-guide-stored-target">
        <div class="math-guide-label"></div>
      </div>
      <div class="math-guide math-guide-selected-top">
        <div class="math-guide-label"></div>
      </div>
      <div class="math-guide math-guide-selected-bottom">
        <div class="math-guide-label"></div>
      </div>
      <div class="math-guide math-guide-origin-top">
        <div class="math-guide-label"></div>
      </div>
      <div class="button-y-controls">
        <button type="button" data-action="click-target">
          Programmatic Click Target
        </button>
        <button type="button" data-action="button-up">buttonY - 32</button>
        <button type="button" data-action="button-down">buttonY + 32</button>
        <button type="button" data-action="reset-button-y">
          Reset buttonY
        </button>
      </div>
      <div class="button-y-readout"></div>
      <obc-poi-layer-stack
        class="button-y-stack"
        selection-mode=${PoiLayerSelectionMode.Single}
      >
        <obc-poi-layer label="Selected" is-selected debug>
          <div class="target-y-guide"></div>
          <div class="target-y-label">target y = 110px</div>
        </obc-poi-layer>
        <obc-poi-layer label="Origin" debug>
          <div class="target-y-guide"></div>
          <div class="target-y-label">target y = 110px</div>
          <obc-poi-data
            id="diagnostic-target"
            .x=${444}
            .y=${110}
            .buttonY=${0}
            .fixedTarget=${false}
            .hasPointer=${true}
            .animatePosition=${true}
          ></obc-poi-data>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    </div>
  `,
  play: async ({canvasElement}) => {
    await waitForStorySettle({drainTransitions: true});

    const root = canvasElement.querySelector(
      '.button-y-diagnostic'
    ) as HTMLElement | null;
    if (!root || root.dataset.bound === 'true') {
      if (root) {
        updateButtonYDiagnosticPanel(root);
      }
      return;
    }

    root.dataset.bound = 'true';

    const target = root.querySelector(
      '#diagnostic-target'
    ) as DiagnosticPoiData | null;
    const clickButton = root.querySelector(
      '[data-action="click-target"]'
    ) as HTMLButtonElement | null;
    const upButton = root.querySelector(
      '[data-action="button-up"]'
    ) as HTMLButtonElement | null;
    const downButton = root.querySelector(
      '[data-action="button-down"]'
    ) as HTMLButtonElement | null;
    const resetButton = root.querySelector(
      '[data-action="reset-button-y"]'
    ) as HTMLButtonElement | null;

    if (!target) {
      return;
    }

    const bind = (
      button: HTMLButtonElement | null,
      handler: () => void
    ): void => {
      button?.addEventListener('click', handler);
    };

    bind(clickButton, () => {
      target.dispatchEvent(
        new MouseEvent('click', {bubbles: true, composed: true})
      );
      requestAnimationFrame(() => updateButtonYDiagnosticPanel(root));
    });
    bind(upButton, () => {
      const next = Number.isFinite(target.buttonY ?? NaN)
        ? (target.buttonY as number) - 32
        : 128;
      target.buttonY = next;
      updateButtonYDiagnosticPanel(root);
    });
    bind(downButton, () => {
      const next = Number.isFinite(target.buttonY ?? NaN)
        ? (target.buttonY as number) + 32
        : 192;
      target.buttonY = next;
      updateButtonYDiagnosticPanel(root);
    });
    bind(resetButton, () => {
      target.buttonY = 0;
      updateButtonYDiagnosticPanel(root);
    });

    let rafId = 0;
    const tick = () => {
      if (!root.isConnected) {
        cancelAnimationFrame(rafId);
        return;
      }
      updateButtonYDiagnosticPanel(root);
      rafId = requestAnimationFrame(tick);
    };

    updateButtonYDiagnosticPanel(root);
    rafId = requestAnimationFrame(tick);
  },
};
