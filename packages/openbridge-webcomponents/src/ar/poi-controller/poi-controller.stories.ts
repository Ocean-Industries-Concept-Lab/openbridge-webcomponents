import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-controller.js';
import {PoiFitMode} from './poi-controller.js';
import {PoiLayerSelectionMode} from '../poi-layer-stack/poi-layer-stack.js';

type PoiControllerArgs = {
  fit: PoiFitMode;
  classFilter: string[];
};

type AnimatedPoiData = HTMLElement & {
  x: number;
  y: number;
  boxWidth: number | null;
  boxHeight: number | null;
  relativeDirection: number;
};

const meta: Meta<PoiControllerArgs> = {
  title: 'AR/POI Controller',
  tags: ['6.0'],
  component: 'obc-poi-controller',
  args: {
    fit: PoiFitMode.Contain,
    classFilter: [],
  },
  parameters: {
    controls: {
      include: ['fit', 'classFilter'],
    },
  },
  render: (args) => {
    const frames = [
      {
        frame: 1,
        timestamp: 0.04,
        detections: [
          {
            x: 1750,
            y: 310,
            box_width: 40,
            box_height: 36,
            confidence: 0.38,
            class: 'boat',
            class_id: 7,
          },
          {
            x: 590,
            y: 320,
            box_width: 38,
            box_height: 34,
            confidence: 0.62,
            class: 'boat',
            class_id: 7,
          },
        ],
      },
    ];

    return html`
      <style>
        .stage {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
        }

        .stage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      </style>
      <div class="stage">
        <obc-poi-controller
          .frames=${frames}
          .fit=${args.fit}
          .classFilter=${args.classFilter}
        >
          <img slot="media" src="/AR-test-image.png" />
          <obc-poi-layer-stack
            slot="stack"
            selection-mode=${PoiLayerSelectionMode.Single}
          >
            <obc-poi-layer is-selected></obc-poi-layer>
            <obc-poi-layer data-controller-layer="background"></obc-poi-layer>
          </obc-poi-layer-stack>
        </obc-poi-controller>
      </div>
    `;
  },
} satisfies Meta<PoiControllerArgs>;

export default meta;
type Story = StoryObj<PoiControllerArgs>;

export const Primary: Story = {
  args: {},
};

export const SelectionMultiAnimated: Story = {
  args: {
    fit: PoiFitMode.Contain,
    classFilter: [],
  },
  render: (args) => {
    return html`
      <style>
        .stage {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
          background: #11161d;
        }

        .stage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        obc-poi-controller.controller-animated {
          width: 100%;
          height: 100%;
        }

        obc-poi-layer-stack.stack-animated {
          width: 100%;
          gap: 8px;
        }

        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <div class="stage">
        <obc-poi-controller
          class="controller-animated"
          .fit=${args.fit}
          .classFilter=${args.classFilter}
        >
          <img slot="media" src="/AR-test-image.png" />
          <obc-poi-layer-stack
            slot="stack"
            class="stack-animated"
            selection-mode=${PoiLayerSelectionMode.Multi}
          >
            <obc-poi-layer label="Layer A" is-selected>
              <obc-poi-data
                class="anim-poi p0"
                .x=${520}
                .y=${110}
                .relativeDirection=${18}
                .boxWidth=${32}
                .boxHeight=${32}
                .fixedTarget=${false}
              ></obc-poi-data>
            </obc-poi-layer>
            <obc-poi-layer label="Layer B"></obc-poi-layer>
            <obc-poi-layer label="Layer C" data-controller-layer="background">
              <obc-poi-data
                class="anim-poi p1"
                .x=${170}
                .y=${120}
                .relativeDirection=${-36}
                .boxWidth=${32}
                .boxHeight=${32}
              ></obc-poi-data>
              <obc-poi-data
                class="anim-poi p2"
                .x=${280}
                .y=${80}
                .relativeDirection=${128}
                .boxWidth=${32}
                .boxHeight=${32}
              ></obc-poi-data>
              <obc-poi-data
                class="anim-poi p3"
                .x=${390}
                .y=${100}
                .relativeDirection=${-156}
                .boxWidth=${32}
                .boxHeight=${32}
              ></obc-poi-data>
              <obc-poi-data
                class="anim-poi p4"
                .x=${500}
                .y=${140}
                .relativeDirection=${42}
                .boxWidth=${32}
                .boxHeight=${32}
              ></obc-poi-data>
              <obc-poi-data
                class="anim-poi p5"
                .x=${610}
                .y=${90}
                .relativeDirection=${172}
                .boxWidth=${32}
                .boxHeight=${32}
              ></obc-poi-data>
            </obc-poi-layer>
          </obc-poi-layer-stack>
        </obc-poi-controller>
      </div>
    `;
  },
  play: async ({canvasElement}) => {
    const root = canvasElement.querySelector(
      '.controller-animated'
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
      relativeDirection:
        typeof target.relativeDirection === 'number' &&
        Number.isFinite(target.relativeDirection)
          ? target.relativeDirection
          : 0,
    }));
    const driftRange = [34, 28, 32, 26, 36, 30];
    const driftDirX = [0.98, -0.72, 0.41, -0.93, 0.86, -0.55];
    const driftDirY = [-0.14, 0.21, -0.18, 0.16, 0.07, -0.24];
    const lateralRange = [6, 5, 6, 4, 6, 5];
    const ampW = [12, 18, 10, 14, 16, 11];
    const ampH = [8, 10, 12, 9, 13, 10];
    const freq = [0.34, 0.29, 0.31, 0.27, 0.33, 0.3];
    const phase = [0.15, 0.9, 1.8, 2.45, 3.15, 3.85];
    const headingOffsetDeg = 0;
    const headingSmoothing = 0.25;
    const normalizeDeg = (deg: number): number =>
      ((((deg + 180) % 360) + 360) % 360) - 180;
    const lerpAngleDeg = (from: number, to: number, alpha: number): number =>
      normalizeDeg(from + normalizeDeg(to - from) * alpha);

    let rafId = 0;
    const tick = (now: number) => {
      if (!root.isConnected) {
        cancelAnimationFrame(rafId);
        return;
      }
      const t = now / 1000;
      targets.forEach((target, i) => {
        const wave = t * freq[i] + phase[i];
        const waveW = t * (freq[i] + 0.22) + phase[i] * 1.13;
        const waveH = t * (freq[i] + 0.31) + phase[i] * 0.84;
        const dirX = driftDirX[i];
        const dirY = driftDirY[i];
        const perpX = -dirY;
        const perpY = dirX;
        const forward = driftRange[i] * Math.sin(wave);
        const lateralWave = wave * 0.6 + phase[i] * 0.5;
        const lateral = lateralRange[i] * Math.sin(lateralWave);
        target.x = base[i].x + dirX * forward + perpX * lateral;
        target.y = base[i].y + dirY * forward + perpY * lateral;
        target.boxWidth = Math.max(
          32,
          base[i].boxWidth + ampW[i] * (0.5 + 0.5 * Math.sin(waveW))
        );
        target.boxHeight = Math.max(
          32,
          base[i].boxHeight + ampH[i] * (0.5 + 0.5 * Math.cos(waveH))
        );
        const dForward = driftRange[i] * Math.cos(wave) * freq[i];
        const dLateral =
          lateralRange[i] * Math.cos(lateralWave) * (freq[i] * 0.6);
        const vx = dirX * dForward + perpX * dLateral;
        const vy = dirY * dForward + perpY * dLateral;
        const headingDeg =
          (Math.atan2(vy, vx) * 180) / Math.PI + headingOffsetDeg;
        const currentHeading = Number.isFinite(target.relativeDirection)
          ? target.relativeDirection
          : base[i].relativeDirection;
        target.relativeDirection = lerpAngleDeg(
          currentHeading,
          headingDeg,
          headingSmoothing
        );
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
  },
};
