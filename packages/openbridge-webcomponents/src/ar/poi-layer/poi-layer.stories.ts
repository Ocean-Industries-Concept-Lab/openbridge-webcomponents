import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {OverlapMode} from './poi-layer.js';
import './poi-layer.js';
import '../poi-target/poi-target.js';
import '../poi-target-button-group/poi-target-button-group.js';

type PoiLayerArgs = {
  label: string;
  debug: boolean;
  layerIndex: number;
  overlapMode?: OverlapMode;
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
        <obc-poi-target .x=${120} .y=${120} .height=${200}> </obc-poi-target>
        <obc-poi-target .x=${320} .height=${70}> </obc-poi-target>
        <obc-poi-target .x=${520} .height=${140}> </obc-poi-target>
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
          .x=${120}
          .height=${140}
          .values=${valuesA}
        ></obc-poi-target>
        <obc-poi-target
          .x=${320}
          .height=${120}
          .values=${valuesB}
        ></obc-poi-target>
        <obc-poi-target
          .x=${520}
          .height=${160}
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
      ) as HTMLElement & {x: number; height: number};
      const second = root.querySelector(
        'obc-poi-target.second'
      ) as HTMLElement & {x: number; height: number};
      const third = root.querySelector(
        'obc-poi-target.third'
      ) as HTMLElement & {x: number; height: number};
      const fourth = root.querySelector(
        'obc-poi-target.fourth'
      ) as HTMLElement & {x: number; height: number};

      if (!first || !second || !third || !fourth) return;

      const start = performance.now();
      let rafId = 0;

      const tick = (now: number) => {
        const t = (now - start) / 1000;
        const phase = (1 - Math.cos((t * Math.PI) / 6)) / 2;
        const x1 = 120 + (260 - 120) * phase;
        const x2 = 520 - (520 - 260) * phase;

        first.height = 110;
        second.height = 70;
        third.height = 90;
        fourth.height = 100;
        first.x = Math.round(x1);
        second.x = Math.round(x2);
        third.x = Math.round(520 + 100 * Math.sin(t * 0.6 + 1));
        fourth.x = Math.round(240 + 120 * Math.sin(t * 0.9 + 2));

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
          <obc-poi-target class="first" .height=${110}> </obc-poi-target>
          <obc-poi-target class="second" .height=${70}> </obc-poi-target>
          <obc-poi-target class="third" .height=${90}> </obc-poi-target>
          <obc-poi-target class="fourth" .height=${100}> </obc-poi-target>
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
          <obc-poi-target .x=${260} .height=${80}></obc-poi-target>
          <obc-poi-target .x=${280} .height=${140}></obc-poi-target>
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
      </style>
      <div class="grouped">
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target .x=${300} .height=${80}></obc-poi-target>
          <obc-poi-target
            .x=${320}
            .height=${140}
            .relativeDirection=${65}
          ></obc-poi-target>
          <obc-poi-target .x=${340} .height=${60}></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const OverlapWithGroupNumbers: Story = {
  args: {
    label: 'Overlap Group (Numbers)',
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
      </style>
      <div class="grouped">
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target .x=${300} .height=${80} id="3"></obc-poi-target>
          <obc-poi-target
            .x=${320}
            .height=${140}
            .relativeDirection=${65}
            id="1"
          ></obc-poi-target>
          <obc-poi-target .x=${340} .height=${60} id="2"></obc-poi-target>
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

      const a = root.querySelector('obc-poi-target.a') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const b = root.querySelector('obc-poi-target.b') as
        | (HTMLElement & {x: number; height: number})
        | null;
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

        a.x = Math.round(x1);
        b.x = Math.round(x2);

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
          <obc-poi-target class="a" .height=${140}></obc-poi-target>
          <obc-poi-target class="b" .height=${80}></obc-poi-target>
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

      const a = root.querySelector('obc-poi-target.a') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const b = root.querySelector('obc-poi-target.b') as
        | (HTMLElement & {x: number; height: number})
        | null;
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

        a.x = Math.round(x1);
        b.x = Math.round(x2);

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
          <obc-poi-target class="a" .height=${120}></obc-poi-target>
          <obc-poi-target class="b" .height=${90}></obc-poi-target>
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

      const a = root.querySelector('obc-poi-target.a') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const b = root.querySelector('obc-poi-target.b') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const c = root.querySelector('obc-poi-target.c') as
        | (HTMLElement & {x: number; height: number})
        | null;
      if (!a || !b || !c) return;

      const start = performance.now();
      const duration = 2400;
      let rafId = 0;

      const tick = (now: number) => {
        const t = ((now - start) % duration) / duration;
        const phase = t < 0.5 ? t / 0.5 : 1;
        const eased = phase * phase * (3 - 2 * phase);
        const x3 = 520 - (520 - 340) * eased;

        a.x = 280;
        b.x = 320;
        c.x = Math.round(x3);

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
          <obc-poi-target class="a" .height=${140}></obc-poi-target>
          <obc-poi-target class="b" .height=${100}></obc-poi-target>
          <obc-poi-target class="c" .height=${80}></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const JoinExpandedGroup: Story = {
  args: {
    label: 'Join Expanded Group',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-target.a') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const b = root.querySelector('obc-poi-target.b') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const c = root.querySelector('obc-poi-target.c') as
        | (HTMLElement & {x: number; height: number})
        | null;
      if (!a || !b || !c) return;

      a.x = 300;
      b.x = 320;
      c.x = 520;

      const duration = 12000;
      let rafId = 0;
      let startTime: number | null = null;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const t = (elapsed % duration) / duration;

        if (t < 0.5) {
          c.x = 520;
        } else {
          const phase = (t - 0.5) / 0.5;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 520 - (520 - 340) * eased;
          c.x = Math.round(x3);
        }

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
        .join-expanded {
          width: 640px;
        }

        .join-expanded obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-overlap-enter: 10px;
          --obc-poi-layer-overlap-exit: 18px;
          --obc-poi-layer-overlap-pre: 16px;
          width: 100%;
        }
      </style>
      <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
        Click to expand the group, then watch as target C joins while expanded.
      </p>
      <div class="join-expanded" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target class="a" .height=${140}></obc-poi-target>
          <obc-poi-target class="b" .height=${100}></obc-poi-target>
          <obc-poi-target class="c" .height=${80}></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const LeaveExpandedGroup: Story = {
  args: {
    label: 'Leave Expanded Group',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-target.a') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const b = root.querySelector('obc-poi-target.b') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const c = root.querySelector('obc-poi-target.c') as
        | (HTMLElement & {x: number; height: number})
        | null;
      if (!a || !b || !c) return;

      a.x = 300;
      b.x = 320;
      c.x = 340;

      const duration = 8000;
      let rafId = 0;
      let startTime: number | null = null;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const t = (elapsed % duration) / duration;

        if (t < 0.5) {
          c.x = 340;
        } else {
          const phase = (t - 0.5) / 0.5;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 340 + (520 - 340) * eased;
          c.x = Math.round(x3);
        }

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
        .leave-expanded {
          width: 640px;
        }

        .leave-expanded obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-overlap-enter: 10px;
          --obc-poi-layer-overlap-exit: 18px;
          --obc-poi-layer-overlap-pre: 16px;
          width: 100%;
        }
      </style>
      <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
        Click to expand the group, then watch as target C leaves while expanded.
      </p>
      <div class="leave-expanded" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target class="a" .height=${140}></obc-poi-target>
          <obc-poi-target class="b" .height=${100}></obc-poi-target>
          <obc-poi-target class="c" .height=${80}></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};

export const CrossingMode: Story = {
  args: {
    label: 'Crossing Mode',
    layerIndex: 0,
    debug: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const staticPoi = root.querySelector('obc-poi-target.static') as
        | (HTMLElement & {x: number; height: number})
        | null;
      const movingPoi = root.querySelector('obc-poi-target.moving') as
        | (HTMLElement & {x: number; height: number})
        | null;
      if (!staticPoi || !movingPoi) return;

      staticPoi.x = 320;

      const start = performance.now();
      const duration = 6000;
      let rafId = 0;

      const tick = (now: number) => {
        const t = ((now - start) % duration) / duration;

        let phase: number;
        if (t < 0.5) {
          phase = t / 0.5;
        } else {
          phase = 1 - (t - 0.5) / 0.5;
        }
        const eased = phase * phase * (3 - 2 * phase);
        const x = 180 + (460 - 180) * eased;

        movingPoi.x = Math.round(x);

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
        .crossing-mode {
          width: 640px;
        }

        .crossing-mode obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <p style="font-size: 12px; color: #666; margin-bottom: 8px;">
        Crossing mode: Moving POI crosses the static POI. Internal swapping
        keeps targets ordered without grouping or overlap.
      </p>
      <div class="crossing-mode" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
          .overlapMode=${OverlapMode.Crossing}
        >
          <obc-poi-target class="static" .height=${120}></obc-poi-target>
          <obc-poi-target class="moving" .height=${120}></obc-poi-target>
        </obc-poi-layer>
      </div>
    `;
  },
};
