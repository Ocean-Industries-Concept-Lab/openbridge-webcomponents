import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-controller.js';
import {PoiFitMode} from './poi-controller.js';
import {PoiLayerSelectionMode} from '../poi-layer-stack/poi-layer-stack.js';
import '../poi/poi-data.js';
import '../poi/poi-aton.js';
import '../poi/poi-vessel.js';
import '../../icons/icon-beacon-general-east.js';
import '../../icons/icon-vessel-type-psv-outlined.js';

const isVitestBrowser = Boolean(
  (globalThis as {__vitest_browser__?: unknown}).__vitest_browser__
);

type PoiControllerArgs = {
  fit: PoiFitMode;
  classFilter: string[];
};

type AnimatedPoiTarget = HTMLElement & {
  x: number;
  y: number;
  boxWidth: number | null;
  boxHeight: number | null;
  relativeDirection: number;
};

type AnimatedPoiSnapshotPose = {
  x: number;
  y: number;
  boxWidth: number;
  boxHeight: number;
  relativeDirection: number;
};

const selectionMultiAnimatedSnapshotPose: AnimatedPoiSnapshotPose[] = [
  {x: 543, y: 110, boxWidth: 43, boxHeight: 37, relativeDirection: -1},
  {x: 149, y: 122, boxWidth: 49, boxHeight: 36, relativeDirection: 174},
  {x: 290, y: 78, boxWidth: 38, boxHeight: 33, relativeDirection: 162},
  {x: 385, y: 100, boxWidth: 36, boxHeight: 32, relativeDirection: -4},
  {x: 483, y: 135, boxWidth: 32, boxHeight: 33, relativeDirection: -170},
  {x: 624, y: 100, boxWidth: 33, boxHeight: 35, relativeDirection: 26},
];

const waitForStorySettle = async (
  canvasElement: HTMLElement,
  options: {drainTransitions?: boolean} = {}
) => {
  const image = canvasElement.querySelector(
    '.stage img'
  ) as HTMLImageElement | null;
  if (image && !image.complete) {
    await new Promise<void>((resolve) => {
      const done = () => resolve();
      image.addEventListener('load', done, {once: true});
      image.addEventListener('error', done, {once: true});
    });
  }

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
            y: 1210,
            box_width: 40,
            box_height: 36,
            confidence: 0.38,
            class: 'boat',
            class_id: 7,
          },
          {
            x: 590,
            y: 1220,
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
          <img slot="media" src="/assets/AR-test-image.png" />
          <obc-poi-layer-stack
            slot="stack"
            selection-mode=${PoiLayerSelectionMode.Multi}
          >
            <obc-poi-layer .isSelected=${true}></obc-poi-layer>
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
  play: async ({canvasElement}) => {
    await waitForStorySettle(canvasElement);
  },
};

export const SelectionMultiAnimated: Story = {
  args: {
    fit: PoiFitMode.Contain,
    classFilter: [],
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
          --obc-poi-layer-debug-background: rgb(8 12 18 / 52%);
          --obc-poi-layer-debug-color: rgb(255 255 255 / 100%);
          width: 100%;
        }

        obc-poi-layer::part(debug-label) {
          text-shadow: 0 1px 2px rgb(0 0 0 / 70%);
        }
      </style>
      <div class="stage">
        <obc-poi-controller
          class="controller-animated"
          .fit=${args.fit}
          .classFilter=${args.classFilter}
        >
          <img slot="media" src="/assets/AR-test-image.png" />
          <obc-poi-layer-stack
            slot="stack"
            class="stack-animated"
            selection-mode=${PoiLayerSelectionMode.Multi}
          >
            <obc-poi-layer label="Layer A" .isSelected=${true}>
              <obc-poi-data
                class="anim-poi p0"
                .x=${p0.x}
                .y=${p0.y}
                .relativeDirection=${p0.relativeDirection}
                .boxWidth=${p0.boxWidth}
                .boxHeight=${p0.boxHeight}
                .fixedTarget=${false}
              ></obc-poi-data>
            </obc-poi-layer>
            <obc-poi-layer label="Layer B">
              <obc-poi-aton .x=${215} .y=${118}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-aton>
              <obc-poi-aton .x=${372} .y=${92}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-aton>
            </obc-poi-layer>
            <obc-poi-layer label="Layer C" data-controller-layer="background">
              <obc-poi-data
                class="anim-poi p1"
                .x=${p1.x}
                .y=${p1.y}
                .relativeDirection=${p1.relativeDirection}
                .boxWidth=${p1.boxWidth}
                .boxHeight=${p1.boxHeight}
              ></obc-poi-data>
              <obc-poi-vessel
                class="anim-poi p2"
                .x=${p2.x}
                .y=${p2.y}
                .relativeDirection=${p2.relativeDirection}
                .boxWidth=${p2.boxWidth}
                .boxHeight=${p2.boxHeight}
              >
                <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
              </obc-poi-vessel>
              <obc-poi-data
                class="anim-poi p3"
                .x=${p3.x}
                .y=${p3.y}
                .relativeDirection=${p3.relativeDirection}
                .boxWidth=${p3.boxWidth}
                .boxHeight=${p3.boxHeight}
              ></obc-poi-data>
              <obc-poi-vessel
                class="anim-poi p4"
                .x=${p4.x}
                .y=${p4.y}
                .relativeDirection=${p4.relativeDirection}
                .boxWidth=${p4.boxWidth}
                .boxHeight=${p4.boxHeight}
              >
                <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
              </obc-poi-vessel>
              <obc-poi-data
                class="anim-poi p5"
                .x=${p5.x}
                .y=${p5.y}
                .relativeDirection=${p5.relativeDirection}
                .boxWidth=${p5.boxWidth}
                .boxHeight=${p5.boxHeight}
              ></obc-poi-data>
            </obc-poi-layer>
          </obc-poi-layer-stack>
        </obc-poi-controller>
      </div>
    `;
  },
  play: async ({canvasElement}) => {
    await waitForStorySettle(canvasElement, {drainTransitions: true});
    if (isVitestBrowser) return;

    const root = canvasElement.querySelector(
      '.controller-animated'
    ) as HTMLElement | null;
    if (!root || root.dataset.animating === 'true') return;
    root.dataset.animating = 'true';

    const targets = Array.from(
      root.querySelectorAll('.anim-poi')
    ) as AnimatedPoiTarget[];
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

export const BottomLayerWithValues: Story = {
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

        obc-poi-controller.controller-values {
          width: 100%;
          height: 100%;
        }

        obc-poi-layer-stack.stack-values {
          width: 100%;
          gap: 8px;
          transform: translateY(-72px);
        }

        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <div class="stage">
        <obc-poi-controller
          class="controller-values"
          .fit=${args.fit}
          .classFilter=${args.classFilter}
        >
          <img slot="media" src="/assets/AR-test-image.png" />
          <obc-poi-layer-stack
            slot="stack"
            class="stack-values"
            selection-mode=${PoiLayerSelectionMode.Multi}
          >
            <obc-poi-layer label="Layer A" .isSelected=${true} .debug=${true}>
              <obc-poi-aton .x=${460} .y=${112}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-aton>
            </obc-poi-layer>
            <obc-poi-layer
              label="Layer B"
              debug
              data-controller-layer="background"
            >
              <obc-poi-data
                .x=${320}
                .y=${132}
                .fixedTarget=${false}
                .data=${[
                  {value: '10', label: 'Lab', unit: 'Unit'},
                  {value: '20', label: 'Lab 2', unit: 'Unit 2'},
                ]}
              ></obc-poi-data>
              <obc-poi-data
                .x=${640}
                .y=${144}
                .fixedTarget=${false}
                .data=${[
                  {value: '70', label: 'Lab', unit: 'Unit'},
                  {value: '80', label: 'Lab 2', unit: 'Unit 2'},
                ]}
              ></obc-poi-data>
            </obc-poi-layer>
          </obc-poi-layer-stack>
        </obc-poi-controller>
      </div>
    `;
  },
  play: async ({canvasElement}) => {
    await waitForStorySettle(canvasElement);
  },
};
