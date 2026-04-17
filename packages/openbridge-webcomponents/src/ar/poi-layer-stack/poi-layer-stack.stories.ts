import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {PoiLayerSelectionMode} from './poi-layer-stack.js';
import './poi-layer-stack.js';
import '../poi-layer/poi-layer.js';
import '../poi-data/poi-data.js';
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
  tags: ['skip-test', '6.0'],
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
    <obc-poi-layer label="Layer A" .isSelected=${true} .debug=${true}>
      <obc-poi-data .x=${220} .y=${90} .fixedTarget=${false}> </obc-poi-data>
    </obc-poi-layer>
    <obc-poi-layer label="Layer B" .debug=${true}>
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
      <obc-poi-layer label="Layer A" .isSelected=${true} .debug=${true}>
        <obc-poi-data .x=${520} .y=${110} .fixedTarget=${false}> </obc-poi-data>
      </obc-poi-layer>
      <obc-poi-layer label="Layer B" .debug=${true}> </obc-poi-layer>
      <obc-poi-layer label="Layer C" .debug=${args.debug}>
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
        <obc-poi-layer label="Layer A" .isSelected=${true} .debug=${true}>
          <obc-poi-data
            class="anim-poi p0"
            .x=${isVitestBrowser ? p0.x : 520}
            .y=${isVitestBrowser ? p0.y : 110}
            .boxWidth=${isVitestBrowser ? p0.boxWidth : 32}
            .boxHeight=${isVitestBrowser ? p0.boxHeight : 32}
            .fixedTarget=${false}
          ></obc-poi-data>
        </obc-poi-layer>
        <obc-poi-layer label="Layer B" .debug=${true}> </obc-poi-layer>
        <obc-poi-layer label="Layer C" .debug=${args.debug}>
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
    <obc-poi-layer label="Layer A" .isSelected=${true} .debug=${true}>
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
    <obc-poi-layer label="Layer B" .debug=${true}>
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
    <obc-poi-layer
      label="Selected"
      .isSelected=${true}
      .debug=${true}
    ></obc-poi-layer>
    <obc-poi-layer label="Buoys" .debug=${true}>
      <obc-poi-aton .x=${200} aton-type="aton" aton-style="green">
        <obi-beacon-general-east></obi-beacon-general-east>
      </obc-poi-aton>
      <obc-poi-aton .x=${350} aton-type="aton" aton-style="red">
        <obi-beacon-general-east></obi-beacon-general-east>
      </obc-poi-aton>
    </obc-poi-layer>
    <obc-poi-layer label="Vessels" .debug=${true}>
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
