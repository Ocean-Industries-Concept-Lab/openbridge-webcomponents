import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {PoiLayerSelectionMode} from './poi-layer-stack.js';
import './poi-layer-stack.js';
import '../poi-layer/poi-layer.js';
import '../poi-data/poi-data.js';

type PoiLayerStackArgs = {
  label: string;
  debug: boolean;
  layerIndex: number;
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
    layerIndex: 0,
    selectionMode: PoiLayerSelectionMode.Single,
  },
  argTypes: {
    layerIndex: {
      control: {type: 'number', min: 0},
    },
    selectionMode: {
      control: {type: 'select'},
      options: Object.values(PoiLayerSelectionMode),
    },
  },
} satisfies Meta<PoiLayerStackArgs>;

export default meta;
type Story = StoryObj<PoiLayerStackArgs>;
type AnimatedPoiData = HTMLElement & {x: number; y: number};

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
    <obc-poi-layer label="Layer A" role="selected" .layerIndex=${1} debug>
      <obc-poi-data .x=${220} .y=${90} .fixedTarget=${false}> </obc-poi-data>
    </obc-poi-layer>
    <obc-poi-layer label="Layer B" role="default" .layerIndex=${2} debug>
      <obc-poi-data .x=${120} .y=${110} .fixedTarget=${false}> </obc-poi-data>
      <obc-poi-data .x=${320} .y=${70} .fixedTarget=${false}> </obc-poi-data>
    </obc-poi-layer>
  </obc-poi-layer-stack>
`;

const renderThreeLayers = (args: PoiLayerStackArgs) => {
  const baseIndex = Math.max(0, args.layerIndex);
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
      <obc-poi-layer
        label="Layer A"
        .layerIndex=${baseIndex + 1}
        role="selected"
        debug
      >
        <obc-poi-data .x=${520} .y=${110} .fixedTarget=${false}> </obc-poi-data>
      </obc-poi-layer>
      <obc-poi-layer
        label="Layer B"
        .layerIndex=${baseIndex + 2}
        role="filtered"
        type-filter="enhanced"
        debug
      >
      </obc-poi-layer>
      <obc-poi-layer
        label="Layer C"
        .layerIndex=${baseIndex + 3}
        role="default"
        ?debug=${args.debug}
      >
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
};

export const SelectionNone: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.None,
  },
  render: renderTwoLayers,
};

export const SelectionMulti: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Multi,
  },
  render: renderThreeLayers,
};

export const SelectionMultiAnimated: Story = {
  args: {
    selectionMode: PoiLayerSelectionMode.Multi,
  },
  render: (args) => {
    const baseIndex = Math.max(0, args.layerIndex);
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
        <obc-poi-layer
          label="Layer A"
          .layerIndex=${baseIndex + 1}
          role="selected"
          debug
        >
          <obc-poi-data
            class="anim-poi p0"
            .x=${520}
            .y=${110}
            .fixedTarget=${false}
          ></obc-poi-data>
        </obc-poi-layer>
        <obc-poi-layer
          label="Layer B"
          .layerIndex=${baseIndex + 2}
          role="filtered"
          type-filter="enhanced"
          debug
        >
        </obc-poi-layer>
        <obc-poi-layer
          label="Layer C"
          .layerIndex=${baseIndex + 3}
          role="default"
          ?debug=${args.debug}
        >
          <obc-poi-data class="anim-poi p1" .x=${80} .y=${120}></obc-poi-data>
          <obc-poi-data class="anim-poi p2" .x=${260} .y=${80}></obc-poi-data>
          <obc-poi-data class="anim-poi p3" .x=${180} .y=${100}></obc-poi-data>
          <obc-poi-data class="anim-poi p4" .x=${420} .y=${140}></obc-poi-data>
          <obc-poi-data class="anim-poi p5" .x=${140} .y=${90}></obc-poi-data>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    `;
  },
  play: async ({canvasElement}) => {
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
    }));
    const ampX = [22, 28, 24, 26, 20, 22];
    const ampY = [8, 10, 9, 8, 7, 8];
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
        target.x = base[i].x + ampX[i] * Math.sin(waveX);
        target.y = base[i].y + ampY[i] * Math.cos(waveY);
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
  },
};
