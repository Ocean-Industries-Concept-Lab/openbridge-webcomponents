import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiTargetButtonGroup} from './poi-target-button-group.js';
import './poi-target-button-group.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import '../poi-target-button/poi-target-button.js';
import '../../icons/icon-ais-target-activated-iec.js';
import '../poi-target/poi-target.js';
import {ObcPoiTarget, PoiTargetVisualState} from '../poi-target/poi-target.js';

const meta: Meta<ObcPoiTargetButtonGroup> = {
  title: 'AR/POI Target Button Group',
  tags: ['6.0'],
  component: 'obc-poi-target-button-group',
  decorators: [crossDecorator],
  args: {},
  render: (args) => {
    const wrapperRef = createRef<HTMLDivElement>();
    const onExpand = (event: CustomEvent<{expand: boolean}>) => {
      const wrapper = wrapperRef.value;
      const outside = wrapper?.querySelector(
        '[data-role="outside"]'
      ) as ObcPoiTarget | null;
      if (!outside) {
        return;
      }
      outside.visualState = event.detail.expand
        ? PoiTargetVisualState.Overlap
        : PoiTargetVisualState.Normal;
    };

    return html`
      <style>
        obc-poi-target {
          position: absolute;
        }
        .stage {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 640px;
          height: 480px;
          transform: translate(-50%, -50%);
        }
      </style>
      <div
        ${ref(wrapperRef)}
        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
      >
        <div class="stage">
          <obc-poi-target-button-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50%)"
            @expand=${onExpand}
          >
            <obc-poi-target
              data-role="b3"
              .x=${300}
              .y=${240}
              data-visual-state="overlap"
            ></obc-poi-target>
            <obc-poi-target
              data-role="b1"
              .x=${320}
              .y=${240}
              .relativeDirection=${65}
            ></obc-poi-target>
            <obc-poi-target
              data-role="b2"
              .x=${340}
              .y=${240}
              data-visual-state="overlap"
            ></obc-poi-target>
          </obc-poi-target-button-group>
          <obc-poi-target
            data-role="outside"
            .x=${200}
            .y=${240}
            data-visual-state=${args.expand ? 'overlap' : 'normal'}
          ></obc-poi-target>
        </div>
      </div>
    `;
  },
} satisfies Meta<ObcPoiTargetButtonGroup>;

export default meta;
type Story = StoryObj<ObcPoiTargetButtonGroup>;

export const Grouped: Story = {
  args: {
    expand: false,
  },
};

export const GroupedWithNumbers: Story = {
  args: {
    expand: false,
  },
  render: (args) => {
    const wrapperRef = createRef<HTMLDivElement>();
    const onExpand = (event: CustomEvent<{expand: boolean}>) => {
      const wrapper = wrapperRef.value;
      const outside = wrapper?.querySelector(
        '[data-role="outside"]'
      ) as ObcPoiTarget | null;
      if (!outside) {
        return;
      }
      outside.visualState = event.detail.expand
        ? PoiTargetVisualState.Overlap
        : PoiTargetVisualState.Normal;
    };

    return html`
      <style>
        obc-poi-target {
          position: absolute;
        }
        .stage {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 640px;
          height: 480px;
          transform: translate(-50%, -50%);
        }
      </style>
      <div
        ${ref(wrapperRef)}
        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
      >
        <div class="stage">
          <obc-poi-target-button-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50%)"
            @expand=${onExpand}
          >
            <obc-poi-target
              data-role="b3"
              .x=${300}
              .y=${240}
              data-visual-state="overlap"
              selectedId="3"
            ></obc-poi-target>
            <obc-poi-target
              data-role="b1"
              .x=${320}
              .y=${240}
              .relativeDirection=${65}
              selectedId="1"
            ></obc-poi-target>
            <obc-poi-target
              data-role="b2"
              .x=${340}
              .y=${240}
              data-visual-state="overlap"
              selectedId="2"
            ></obc-poi-target>
          </obc-poi-target-button-group>
          <obc-poi-target
            data-role="outside"
            .x=${200}
            .y=${240}
            data-visual-state=${args.expand ? 'overlap' : 'normal'}
            selectedId="4"
          ></obc-poi-target>
        </div>
      </div>
    `;
  },
};

export const Expanded: Story = {
  args: {
    expand: true,
  },
};

export const InternalGroupSwapping: Story = {
  args: {
    expand: true,
  },
  render: (args) => {
    const hostRef = createRef<HTMLDivElement>();
    let rafId = 0;
    let observer: MutationObserver | null = null;
    let startTime: number | null = null;

    const resetPositions = () => {
      const root = hostRef.value;
      if (!root) return;
      const a = root.querySelector('#swap-a') as HTMLElement | null;
      const b = root.querySelector('#swap-b') as HTMLElement | null;
      const c = root.querySelector('#swap-c') as HTMLElement | null;
      if (!a || !b || !c) return;
      a.style.left = '300px';
      b.style.left = '320px';
      c.style.left = '340px';
    };

    const stopAnimation = () => {
      const root = hostRef.value;
      if (!root) return;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      root.dataset.animating = 'false';
      resetPositions();
    };

    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';
      resetPositions();
      startTime = null;
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      const duration = 8000;
      const tick = (now: number) => {
        if (!root.isConnected) {
          stopAnimation();
          return;
        }
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const t = (elapsed % duration) / duration;

        const a = root.querySelector('#swap-a') as HTMLElement | null;
        const b = root.querySelector('#swap-b') as HTMLElement | null;
        const c = root.querySelector('#swap-c') as HTMLElement | null;
        if (!a || !b || !c) return;

        if (t < 0.35) {
          a.style.left = '300px';
          b.style.left = '320px';
          c.style.left = '340px';
        } else if (t < 0.75) {
          const phase = (t - 0.35) / 0.4;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 340 + (240 - 340) * eased;
          const x1 = 300 + (380 - 300) * eased;
          const x2 = 320 + (400 - 320) * eased;
          c.style.left = `${Math.round(x3)}px`;
          a.style.left = `${Math.round(x1)}px`;
          b.style.left = `${Math.round(x2)}px`;
        } else {
          const phase = (t - 0.75) / 0.25;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 240 + (340 - 240) * eased;
          const x1 = 380 + (300 - 380) * eased;
          const x2 = 400 + (320 - 400) * eased;
          c.style.left = `${Math.round(x3)}px`;
          a.style.left = `${Math.round(x1)}px`;
          b.style.left = `${Math.round(x2)}px`;
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
      observer = new MutationObserver(() => {
        if (!root.isConnected) {
          stopAnimation();
        }
      });
      const observerTarget = root.parentElement ?? document.body;
      observer.observe(observerTarget, {childList: true, subtree: true});
    };

    setTimeout(() => {
      if (args.expand) {
        startAnimation(hostRef.value ?? null);
      }
    }, 0);

    return html`
      <style>
        obc-poi-target {
          position: absolute;
        }
        .stage {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 640px;
          height: 480px;
          transform: translate(-50%, -50%);
        }
      </style>
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
        <div class="stage" ${ref(hostRef)}>
          <obc-poi-target-button-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50%)"
            @expand=${(event: CustomEvent<{expand: boolean}>) => {
              if (event.detail.expand) {
                startAnimation(hostRef.value ?? null);
              } else {
                stopAnimation();
              }
            }}
          >
            <obc-poi-target
              id="swap-a"
              .x=${300}
              .y=${240}
              data-visual-state="overlap"
            ></obc-poi-target>
            <obc-poi-target id="swap-b" .x=${320} .y=${240}></obc-poi-target>
            <obc-poi-target
              id="swap-c"
              .x=${340}
              .y=${240}
              data-visual-state="overlap"
            ></obc-poi-target>
          </obc-poi-target-button-group>
        </div>
      </div>
    `;
  },
};

export const GroupWithTopOffsetTransition: Story = {
  args: {},
  render: () => {
    return html`
      <style>
        obc-poi-target {
          position: absolute;
        }
        .stage {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 640px;
          height: 480px;
          transform: translate(-50%, -50%);
        }
      </style>
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
        <div class="stage">
          <obc-poi-target-button-group
            style="position: absolute; top: 0; left: 0;"
            positionVertical="calc(50%)"
          >
            <obc-poi-target
              id="top-grp-target-3"
              .x=${340}
              .y=${240}
              .height=${160}
              data-visual-state="overlap"
            ></obc-poi-target>
            <obc-poi-target
              id="top-grp-target-1"
              .x=${300}
              .y=${240}
              .height=${180}
              data-visual-state="overlap"
            ></obc-poi-target>
            <obc-poi-target
              id="top-grp-target-2"
              .x=${320}
              .y=${240}
              .height=${200}
            ></obc-poi-target>
          </obc-poi-target-button-group>
        </div>
      </div>
    `;
  },
};
