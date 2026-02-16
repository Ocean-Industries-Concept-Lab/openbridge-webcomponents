import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiGroup} from './poi-group.js';
import './poi-group.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import '../poi-button-data/poi-button-data.js';
import '../../icons/icon-ais-target-activated-iec.js';
import '../poi-data/poi-data.js';
import {ObcPoiData, PoiDataValue} from '../poi-data/poi-data.js';

const isVitestBrowser = Boolean(
  (globalThis as {__vitest_browser__?: unknown}).__vitest_browser__
);

type PoiGroupStoryArgs = {
  expand: boolean;
  internalSwapping: boolean;
};

const meta: Meta<PoiGroupStoryArgs> = {
  title: 'AR/POI Group',
  tags: ['6.0'],
  component: 'obc-poi-group',
  decorators: [crossDecorator],
  args: {
    expand: false,
    internalSwapping: false,
  },
  render: (args: PoiGroupStoryArgs) => {
    const wrapperRef = createRef<HTMLDivElement>();
    const onExpand = (event: CustomEvent<{expand: boolean}>) => {
      const wrapper = wrapperRef.value;
      const outside = wrapper?.querySelector('#outside') as ObcPoiData | null;
      if (!outside) {
        return;
      }
      outside.value = event.detail.expand
        ? PoiDataValue.Overlapped
        : PoiDataValue.Unchecked;
    };

    return html`
      <style>
        obc-poi-data {
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
          <obc-poi-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50%)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .x=${300}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .x=${320}
              .buttonY=${240}
              .y=${240}
              .relativeDirection=${65}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .x=${340}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .x=${200}
            .buttonY=${240}
            .y=${240}
          ></obc-poi-data>
        </div>
      </div>
    `;
  },
} satisfies Meta<ObcPoiGroup>;

export default meta;
type Story = StoryObj<PoiGroupStoryArgs>;

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
      const outside = wrapper?.querySelector('#outside') as ObcPoiData | null;
      if (!outside) {
        return;
      }
      outside.value = event.detail.expand
        ? PoiDataValue.Overlapped
        : PoiDataValue.Unchecked;
    };

    return html`
      <style>
        obc-poi-data {
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
          <obc-poi-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50%)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .header=${{content: '3'}}
              .x=${300}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .header=${{content: '1'}}
              .x=${320}
              .buttonY=${240}
              .y=${240}
              .relativeDirection=${65}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .header=${{content: '2'}}
              .x=${340}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .header=${{content: '4'}}
            .x=${200}
            .buttonY=${240}
            .y=${240}
          ></obc-poi-data>
        </div>
      </div>
    `;
  },
};

export const GroupedWithValues: Story = {
  args: {
    expand: false,
  },
  render: (args) => {
    const wrapperRef = createRef<HTMLDivElement>();
    const valuesA = [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ];
    const valuesB = [
      {value: '30', label: 'Lab', unit: 'Unit'},
      {value: '40', label: 'Lab 2', unit: 'Unit 2'},
    ];
    const valuesC = [
      {value: '50', label: 'Lab', unit: 'Unit'},
      {value: '60', label: 'Lab 2', unit: 'Unit 2'},
    ];
    const valuesOutside = [
      {value: '70', label: 'Lab', unit: 'Unit'},
      {value: '80', label: 'Lab 2', unit: 'Unit 2'},
    ];
    const onExpand = (event: CustomEvent<{expand: boolean}>) => {
      const wrapper = wrapperRef.value;
      const outside = wrapper?.querySelector('#outside') as ObcPoiData | null;
      if (!outside) {
        return;
      }
      outside.value = event.detail.expand
        ? PoiDataValue.Overlapped
        : PoiDataValue.Unchecked;
    };

    return html`
      <style>
        obc-poi-data {
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
          <obc-poi-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50%)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .x=${300}
              .buttonY=${240}
              .y=${240}
              .data=${valuesA}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .x=${320}
              .buttonY=${240}
              .y=${240}
              .relativeDirection=${65}
              .data=${valuesB}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .x=${340}
              .buttonY=${240}
              .y=${240}
              .data=${valuesC}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .x=${200}
            .buttonY=${240}
            .y=${240}
            .data=${valuesOutside}
          ></obc-poi-data>
        </div>
      </div>
    `;
  },
};

export const Expanded: Story = {
  args: {
    expand: true,
  },
  render: (args) => {
    const wrapperRef = createRef<HTMLDivElement>();
    const groupRef = createRef<ObcPoiGroup>();

    const onExpand = (event: CustomEvent<{expand: boolean}>) => {
      const wrapper = wrapperRef.value;
      const outside = wrapper?.querySelector('#outside') as ObcPoiData | null;
      if (!outside) {
        return;
      }
      outside.value = event.detail.expand
        ? PoiDataValue.Overlapped
        : PoiDataValue.Unchecked;
    };

    if (args.expand && !isVitestBrowser) {
      setTimeout(() => {
        const group = groupRef.value;
        if (!group || !group.isConnected) return;
        group.expand = true;
      }, 0);
    }

    return html`
      <style>
        obc-poi-data {
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
          <obc-poi-group
            ${ref(groupRef)}
            style="position: absolute; top: 0; left: 0;"
            .expand=${isVitestBrowser ? !!args.expand : false}
            positionVertical="calc(50%)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .x=${300}
              .buttonY=${240}
              .y=${260}
              .fixedTarget=${false}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .x=${320}
              .buttonY=${240}
              .y=${100}
              .fixedTarget=${false}
              .relativeDirection=${65}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .x=${340}
              .buttonY=${240}
              .y=${100}
              .fixedTarget=${false}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .x=${200}
            .buttonY=${240}
            .y=${100}
            .fixedTarget=${false}
          ></obc-poi-data>
        </div>
      </div>
    `;
  },
};

export const InternalGroupSwapping: Story = {
  args: {
    expand: true,
    internalSwapping: true,
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
      if (args.expand && args.internalSwapping) {
        startAnimation(hostRef.value ?? null);
      } else {
        stopAnimation();
      }
    }, 0);

    return html`
      <style>
        obc-poi-data {
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
          <obc-poi-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            .internalSwapping=${args.internalSwapping}
            positionVertical="calc(50%)"
            @expand=${(event: CustomEvent<{expand: boolean}>) => {
              if (event.detail.expand && args.internalSwapping) {
                startAnimation(hostRef.value ?? null);
              } else {
                stopAnimation();
              }
            }}
          >
            <obc-poi-data
              id="swap-a"
              .x=${300}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
            <obc-poi-data
              id="swap-b"
              .x=${320}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
            <obc-poi-data
              id="swap-c"
              .x=${340}
              .buttonY=${240}
              .y=${240}
            ></obc-poi-data>
          </obc-poi-group>
        </div>
      </div>
    `;
  },
};
