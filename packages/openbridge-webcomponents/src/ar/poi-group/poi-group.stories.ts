import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiGroup} from './poi-group.js';
import './poi-group.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import '../poi-button-data/poi-button-data.js';
import '../../icons/icon-ais-target-activated-iec.js';
import '../poi-data/poi-data.js';
import '../poi-aton/poi-aton.js';
import '../poi-vessel/poi-vessel.js';
import '../building-blocks/poi-header/poi-header.js';
import '../../icons/icon-beacon-general-east.js';
import '../../icons/icon-vessel-type-psv-outlined.js';
import {ObcPoiData, PoiDataValue} from '../poi-data/poi-data.js';

const isVitestBrowser = Boolean(
  (globalThis as {__vitest_browser__?: unknown}).__vitest_browser__
);

const compactPreviewHeightDecorator = (story: () => unknown) => html`
  <style>
    .wrapper {
      height: 260px !important;
      min-height: 260px !important;
      overflow: hidden !important;
    }
  </style>
  ${story()}
`;

type PoiGroupStoryArgs = {
  expand: boolean;
  internalSwapping: boolean;
};

const meta: Meta<PoiGroupStoryArgs> = {
  title: 'AR/POI Group',
  tags: ['6.0'],
  component: 'obc-poi-group',
  decorators: [crossDecorator, compactPreviewHeightDecorator],
  args: {
    expand: false,
    internalSwapping: false,
  },
  parameters: {
    controls: {
      include: ['expand', 'internalSwapping'],
    },
  },
  argTypes: {
    expand: {
      control: {type: 'boolean'},
    },
    internalSwapping: {
      control: {type: 'boolean'},
    },
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
            positionVertical="calc(50% - 40px)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .x=${300}
              .buttonY=${200}
              .y=${150}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .x=${320}
              .buttonY=${200}
              .y=${150}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .x=${340}
              .buttonY=${200}
              .y=${150}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .x=${200}
            .buttonY=${200}
            .y=${150}
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
            positionVertical="calc(50% - 40px)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .hasHeader=${true}
              .x=${300}
              .buttonY=${200}
              .y=${150}
            >
              <obc-poi-header slot="header" content="3"></obc-poi-header>
            </obc-poi-data>
            <obc-poi-data
              id="target-1"
              .hasHeader=${true}
              .x=${320}
              .buttonY=${200}
              .y=${150}
            >
              <obc-poi-header slot="header" content="1"></obc-poi-header>
            </obc-poi-data>
            <obc-poi-data
              id="target-2"
              .hasHeader=${true}
              .x=${340}
              .buttonY=${200}
              .y=${150}
            >
              <obc-poi-header slot="header" content="2"></obc-poi-header>
            </obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .hasHeader=${true}
            .x=${200}
            .buttonY=${200}
            .y=${200}
          >
            <obc-poi-header slot="header" content="4"></obc-poi-header>
          </obc-poi-data>
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
    const groupButtonY = 300;
    const outsideButtonY = 300;
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
        .wrapper {
          height: 360px !important;
          min-height: 360px !important;
          overflow: hidden !important;
        }
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
            .positionVertical=${`${groupButtonY}px`}
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .x=${300}
              .buttonY=${groupButtonY}
              .y=${150}
              .data=${valuesA}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .x=${320}
              .buttonY=${groupButtonY}
              .y=${150}
              .data=${valuesB}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .x=${340}
              .buttonY=${groupButtonY}
              .y=${150}
              .data=${valuesC}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .x=${200}
            .buttonY=${outsideButtonY}
            .y=${200}
            .data=${valuesOutside}
          ></obc-poi-data>
        </div>
      </div>
    `;
  },
};

export const GroupedMixedTypes: Story = {
  args: {
    expand: false,
  },
  render: (args) => {
    return html`
      <style>
        obc-poi-aton,
        obc-poi-vessel {
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
          <obc-poi-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${args.expand}
            positionVertical="calc(50% - 40px)"
          >
            <obc-poi-aton
              id="target-3"
              .hasHeader=${true}
              .x=${300}
              .buttonY=${200}
              .y=${150}
              aton-type="aton"
              aton-style="green"
            >
              <obc-poi-header slot="header" content="3"></obc-poi-header>
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
            <obc-poi-vessel
              id="target-1"
              .hasHeader=${true}
              .x=${320}
              .buttonY=${200}
              .y=${150}
            >
              <obc-poi-header slot="header" content="1"></obc-poi-header>
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
            <obc-poi-aton
              id="target-2"
              .hasHeader=${true}
              .x=${340}
              .buttonY=${200}
              .y=${150}
              aton-type="aton"
              aton-style="red"
            >
              <obc-poi-header slot="header" content="2"></obc-poi-header>
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </obc-poi-group>
        </div>
      </div>
    `;
  },
};

export const Expanded: Story = {
  args: {
    expand: true,
  },
  play: async ({canvasElement, args}) => {
    if (!isVitestBrowser || !args.expand) return;
    const targets = Array.from(canvasElement.querySelectorAll('obc-poi-data'));
    await Promise.all(
      targets.map(
        (target) =>
          ((target as {updateComplete?: Promise<unknown>}).updateComplete ??
            Promise.resolve()) as Promise<unknown>
      )
    );
    const group = canvasElement.querySelector(
      'obc-poi-group'
    ) as ObcPoiGroup | null;
    if (!group) return;
    await ((group as {updateComplete?: Promise<unknown>}).updateComplete ??
      Promise.resolve());
    await new Promise((resolve) => setTimeout(resolve, 60));
    group.expand = true;
    await new Promise((resolve) => setTimeout(resolve, 260));
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
            .expand=${false}
            positionVertical="calc(50% - 40px)"
            @expand=${onExpand}
          >
            <obc-poi-data
              id="target-3"
              .x=${300}
              .buttonY=${200}
              .y=${150}
              .fixedTarget=${false}
            ></obc-poi-data>
            <obc-poi-data
              id="target-1"
              .x=${320}
              .buttonY=${200}
              .y=${150}
              .fixedTarget=${false}
            ></obc-poi-data>
            <obc-poi-data
              id="target-2"
              .x=${340}
              .buttonY=${200}
              .y=${150}
              .fixedTarget=${false}
            ></obc-poi-data>
          </obc-poi-group>
          <obc-poi-data
            id="outside"
            .x=${200}
            .buttonY=${200}
            .y=${150}
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
  play: async ({canvasElement, args}) => {
    if (!isVitestBrowser || !args.expand) return;
    const group = canvasElement.querySelector(
      'obc-poi-group'
    ) as ObcPoiGroup | null;
    if (!group) return;
    await ((group as {updateComplete?: Promise<unknown>}).updateComplete ??
      Promise.resolve());
    await new Promise((resolve) => setTimeout(resolve, 40));
    group.expand = true;
    await new Promise((resolve) => setTimeout(resolve, 260));
  },
  render: (args) => {
    const hostRef = createRef<HTMLDivElement>();
    let rafId = 0;
    let observer: MutationObserver | null = null;
    let startTime: number | null = null;
    const setX = (target: ObcPoiData, value: number) => {
      target.style.setProperty('--obc-poi-data-x', `${value}px`);
    };
    const resetPositions = () => {
      const root = hostRef.value;
      if (!root) return;
      const a = root.querySelector('#swap-a') as ObcPoiData | null;
      const b = root.querySelector('#swap-b') as ObcPoiData | null;
      const c = root.querySelector('#swap-c') as ObcPoiData | null;
      if (!a || !b || !c) return;
      setX(a, 300);
      setX(b, 320);
      setX(c, 340);
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

        const a = root.querySelector('#swap-a') as ObcPoiData | null;
        const b = root.querySelector('#swap-b') as ObcPoiData | null;
        const c = root.querySelector('#swap-c') as ObcPoiData | null;
        if (!a || !b || !c) return;

        if (t < 0.35) {
          setX(a, 300);
          setX(b, 320);
          setX(c, 340);
        } else if (t < 0.75) {
          const phase = (t - 0.35) / 0.4;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 340 + (240 - 340) * eased;
          const x1 = 300 + (380 - 300) * eased;
          const x2 = 320 + (400 - 320) * eased;
          setX(c, x3);
          setX(a, x1);
          setX(b, x2);
        } else {
          const phase = (t - 0.75) / 0.25;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 240 + (340 - 240) * eased;
          const x1 = 380 + (300 - 380) * eased;
          const x2 = 400 + (320 - 400) * eased;
          setX(c, x3);
          setX(a, x1);
          setX(b, x2);
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

    if (!isVitestBrowser) {
      setTimeout(() => {
        if (args.expand && args.internalSwapping) {
          startAnimation(hostRef.value ?? null);
        } else {
          stopAnimation();
        }
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
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
        <div class="stage" ${ref(hostRef)}>
          <obc-poi-group
            style="position: absolute; top: 0; left: 0;"
            .expand=${isVitestBrowser ? false : args.expand}
            .internalSwapping=${args.internalSwapping}
            positionVertical="calc(50% - 40px)"
            @expand=${(event: CustomEvent<{expand: boolean}>) => {
              if (isVitestBrowser) {
                stopAnimation();
                return;
              }
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
              .buttonY=${200}
              .y=${150}
            ></obc-poi-data>
            <obc-poi-data
              id="swap-b"
              .x=${320}
              .buttonY=${200}
              .y=${150}
            ></obc-poi-data>
            <obc-poi-data
              id="swap-c"
              .x=${340}
              .buttonY=${200}
              .y=${150}
            ></obc-poi-data>
          </obc-poi-group>
        </div>
      </div>
    `;
  },
};
