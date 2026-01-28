import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {ObcPoiLayer} from './poi-layer.js';
import './poi-layer.js';
import '../poi-target/poi-target.js';
import '../poi-target-button-group/poi-target-button-group.js';

type PoiLayerArgs = {
  label: string;
  debug: boolean;
  layerIndex: number;
};

const meta: Meta<PoiLayerArgs> = {
  title: 'AR/POI Layer',
  tags: ['6.0'],
  component: 'obc-poi-layer',
  args: {
    label: 'Selected Targets',
    debug: true,
    layerIndex: 0,
  },
} satisfies Meta<PoiLayerArgs>;

export default meta;
type Story = StoryObj<PoiLayerArgs>;

export const Primary: Story = {
  render(args) {
    return html`
      <style>
        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 640px;
        }
      </style>
      <obc-poi-layer
        .label=${args.label}
        .layerIndex=${args.layerIndex}
        ?debug=${args.debug}
      >
        <obc-poi-target style="left: 120px;" height="200">
        </obc-poi-target>
        <obc-poi-target style="left: 320px;" height="70">
        </obc-poi-target>
        <obc-poi-target style="left: 520px;" height="140">
        </obc-poi-target>
      </obc-poi-layer>
    `;
  },
};

export const WithValuesTargets: Story = {
  args: {
    label: 'With Values',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
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
    return html`
      <style>
        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 640px;
        }
      </style>
      <obc-poi-layer
        .label=${args.label}
        .layerIndex=${args.layerIndex}
        ?debug=${args.debug}
      >
        <obc-poi-target
          style="left: 120px;"
          height="140"
          .values=${valuesA}
        ></obc-poi-target>
        <obc-poi-target
          style="left: 320px;"
          height="120"
          .values=${valuesB}
        ></obc-poi-target>
        <obc-poi-target
          style="left: 520px;"
          height="160"
          .values=${valuesC}
        ></obc-poi-target>
      </obc-poi-layer>
    `;
  },
};

export const AnimatedLayout: Story = {
  args: {
    label: 'Animated Layer',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const first = root.querySelector(
        'obc-poi-target.first'
      ) as HTMLElement & {height: number};
      const second = root.querySelector(
        'obc-poi-target.second'
      ) as HTMLElement & {height: number};
      const third = root.querySelector(
        'obc-poi-target.third'
      ) as HTMLElement & {height: number};
      const fourth = root.querySelector(
        'obc-poi-target.fourth'
      ) as HTMLElement & {height: number};

      if (!first || !second || !third || !fourth) return;

      const start = performance.now();
      let rafId = 0;

      const tick = (now: number) => {
        const t = (now - start) / 1000;
        const phase = (1 - Math.cos((t * Math.PI) / 6)) / 2; // slow in/out
        const x1 = 120 + (260 - 120) * phase;
        const x2 = 520 - (520 - 260) * phase;

        first.height = 110;
        second.height = 70;
        third.height = 90;
        fourth.height = 100;
        first.setAttribute('height', '110');
        second.setAttribute('height', '70');
        third.setAttribute('height', '90');
        fourth.setAttribute('height', '100');
        first.style.left = `${Math.round(x1)}px`;
        second.style.left = `${Math.round(x2)}px`;
        third.style.left = `${Math.round(520 + 100 * Math.sin(t * 0.6 + 1))}px`;
        fourth.style.left = `${Math.round(240 + 120 * Math.sin(t * 0.9 + 2))}px`;

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      const observer = new MutationObserver(() => {
        if (!root.isConnected) {
          cancelAnimationFrame(rafId);
          observer.disconnect();
        }
      });
      observer.observe(root, {childList: true, subtree: true});
    };

    setTimeout(() => startAnimation(hostRef.value ?? null), 0);
    return html`
      <style>
        .anim {
          width: 640px;
        }

        .anim obc-poi-layer {
          --obc-poi-layer-overlap-pre: 16px;
        }
      </style>
      <div class="anim" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target class="first" height="110"> </obc-poi-target>
          <obc-poi-target class="second" height="70"> </obc-poi-target>
          <obc-poi-target class="third" height="90"> </obc-poi-target>
          <obc-poi-target class="fourth" height="100"> </obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const Overlap: Story = {
  args: {
    label: 'Overlap',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    return html`
      <style>
        .half {
          width: 640px;
        }

        .half obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <div class="half">
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target style="left: 260px;" height="80"></obc-poi-target>
          <obc-poi-target style="left: 280px;" height="140"></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const OverlapWithGroup: Story = {
  args: {
    label: 'Overlap Group',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    return html`
      <style>
        .grouped {
          width: 640px;
        }

        .grouped obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }

        .grouped obc-poi-target {
          position: absolute;
          top: 50%;
        }

      .grouped #b1 {
        left: calc(50% - 15px);
      }

        .grouped #b2 {
          left: calc(50% + 15px);
        }

        .grouped #b3 {
          left: calc(50% - 30px);
        }

        .grouped .group {
          top: 0;
          left: 0;
        }
      </style>
      <div class="grouped">
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target-button-group
            class="group"
            positionVertical="calc(50%)"
          >
            <obc-poi-target id="b3" overlap height="80"></obc-poi-target>
            <obc-poi-target id="b1" height="140" .relativeDirection=${65}>
            </obc-poi-target>
            <obc-poi-target id="b2" overlap height="60"></obc-poi-target>
          </obc-poi-target-button-group>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const EnterGroupFromTwo: Story = {
  args: {
    label: 'Enter Group (2)',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-target.a') as HTMLElement | null;
      const b = root.querySelector('obc-poi-target.b') as HTMLElement | null;
      if (!a || !b) return;

      const start = performance.now();
      const duration = 3000;
      let rafId = 0;

      const tick = (now: number) => {
        const t = ((now - start) % duration) / duration;
        let eased = 0;
        if (t < 0.5) {
          const phase = t / 0.5;
          eased = phase * phase * (3 - 2 * phase);
        } else if (t < 0.75) {
          eased = 1;
        } else {
          const phase = (t - 0.75) / 0.25;
          const out = phase * phase * (3 - 2 * phase);
          eased = 1 - out;
        }
        const x1 = 180 + (300 - 180) * eased;
        const x2 = 460 - (460 - 320) * eased;

        a.style.left = `${Math.round(x1)}px`;
        b.style.left = `${Math.round(x2)}px`;

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      const observer = new MutationObserver(() => {
        if (!root.isConnected) {
          cancelAnimationFrame(rafId);
          observer.disconnect();
        }
      });
      observer.observe(root, {childList: true, subtree: true});
    };

    setTimeout(() => startAnimation(hostRef.value ?? null), 0);
    return html`
      <style>
        .enter-two {
          width: 640px;
        }

        .enter-two obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-overlap-enter: 10px;
          --obc-poi-layer-overlap-exit: 18px;
          --obc-poi-layer-overlap-pre: 16px;
          width: 100%;
        }
      </style>
      <div class="enter-two" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target class="a" height="140"></obc-poi-target>
          <obc-poi-target class="b" height="80"></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const ExitGroup: Story = {
  args: {
    label: 'Exit Group (2)',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-target.a') as HTMLElement | null;
      const b = root.querySelector('obc-poi-target.b') as HTMLElement | null;
      if (!a || !b) return;

      const start = performance.now();
      const duration = 2400;
      let rafId = 0;

      const tick = (now: number) => {
        const t = ((now - start) % duration) / duration;
        const phase = t < 0.4 ? 0 : (t - 0.4) / 0.6;
        const eased = phase * phase * (3 - 2 * phase);
        const x1 = 300 - (300 - 180) * eased;
        const x2 = 320 + (460 - 320) * eased;

        a.style.left = `${Math.round(x1)}px`;
        b.style.left = `${Math.round(x2)}px`;

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      const observer = new MutationObserver(() => {
        if (!root.isConnected) {
          cancelAnimationFrame(rafId);
          observer.disconnect();
        }
      });
      observer.observe(root, {childList: true, subtree: true});
    };

    setTimeout(() => startAnimation(hostRef.value ?? null), 0);
    return html`
      <style>
        .exit-two {
          width: 640px;
        }

        .exit-two obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-overlap-enter: 10px;
          --obc-poi-layer-overlap-exit: 18px;
          --obc-poi-layer-overlap-pre: 16px;
          width: 100%;
        }
      </style>
      <div class="exit-two" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target class="a" height="120"></obc-poi-target>
          <obc-poi-target class="b" height="90"></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const JoinGroup: Story = {
  args: {
    label: 'Join Group (3)',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-target.a') as HTMLElement | null;
      const b = root.querySelector('obc-poi-target.b') as HTMLElement | null;
      const c = root.querySelector('obc-poi-target.c') as HTMLElement | null;
      if (!a || !b || !c) return;

      const start = performance.now();
      const duration = 2400;
      let rafId = 0;

      const tick = (now: number) => {
        const t = ((now - start) % duration) / duration;
        const phase = t < 0.5 ? t / 0.5 : 1;
        const eased = phase * phase * (3 - 2 * phase);
        const x3 = 520 - (520 - 340) * eased;

        a.style.left = '280px';
        b.style.left = '320px';
        c.style.left = `${Math.round(x3)}px`;

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      const observer = new MutationObserver(() => {
        if (!root.isConnected) {
          cancelAnimationFrame(rafId);
          observer.disconnect();
        }
      });
      observer.observe(root, {childList: true, subtree: true});
    };

    setTimeout(() => startAnimation(hostRef.value ?? null), 0);
    return html`
      <style>
        .join-three {
          width: 640px;
        }

        .join-three obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-overlap-enter: 10px;
          --obc-poi-layer-overlap-exit: 18px;
          --obc-poi-layer-overlap-pre: 16px;
          width: 100%;
        }
      </style>
      <div class="join-three" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target class="a" height="140"></obc-poi-target>
          <obc-poi-target class="b" height="100"></obc-poi-target>
          <obc-poi-target class="c" height="80"></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};
