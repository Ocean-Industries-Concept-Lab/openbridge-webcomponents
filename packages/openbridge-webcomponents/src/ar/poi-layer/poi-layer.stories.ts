import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {OverlapMode, PoiLayerRole} from './poi-layer.js';
import './poi-layer.js';
import '../poi-data/poi-data.js';
import {ObcPoiData, PoiDataValue} from '../poi-data/poi-data.js';
import '../poi-group/poi-group.js';

type PoiLayerArgs = {
  label: string;
  debug: boolean;
  layerIndex: number;
  overlapMode: OverlapMode;
  role: PoiLayerRole;
  typeFilter: string;
  expand?: boolean;
  joinWhileExpanded?: boolean;
  internalSwapping?: boolean;
};

const meta: Meta<PoiLayerArgs> = {
  title: 'AR/POI Layer',
  tags: ['6.0'],
  component: 'obc-poi-layer',
  decorators: [
    (story) => html`
      <style>
        .poi-layer-story-frame {
          min-height: 150px;
          display: block;
        }
      </style>
      <div class="poi-layer-story-frame">${story()}</div>
    `,
  ],
  args: {
    label: 'Selected Targets',
    debug: true,
    layerIndex: 0,
    overlapMode: OverlapMode.Grouping,
    role: PoiLayerRole.Default,
    typeFilter: '',
    joinWhileExpanded: false,
    internalSwapping: false,
  },
  parameters: {
    controls: {
      include: [
        'label',
        'debug',
        'layerIndex',
        'overlapMode',
        'role',
        'typeFilter',
        'joinWhileExpanded',
        'internalSwapping',
      ],
    },
  },
} satisfies Meta<PoiLayerArgs>;

export default meta;
type Story = StoryObj<PoiLayerArgs>;

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

      const first = root.querySelector('obc-poi-data.first') as HTMLElement & {
        x: number;
        y: number;
      };
      const second = root.querySelector(
        'obc-poi-data.second'
      ) as HTMLElement & {x: number; y: number};
      const third = root.querySelector('obc-poi-data.third') as HTMLElement & {
        x: number;
        y: number;
      };
      const fourth = root.querySelector(
        'obc-poi-data.fourth'
      ) as HTMLElement & {x: number; y: number};

      if (!first || !second || !third || !fourth) return;

      const start = performance.now();
      let rafId = 0;

      const tick = (now: number) => {
        const t = (now - start) / 1000;
        const phase = (1 - Math.cos((t * Math.PI) / 6)) / 2;
        const x1 = 120 + (260 - 120) * phase;
        const x2 = 520 - (520 - 260) * phase;

        first.y = 110;
        second.y = 70;
        third.y = 90;
        fourth.y = 100;
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data class="first" .y=${110}> </obc-poi-data>
          <obc-poi-data class="second" .y=${70}> </obc-poi-data>
          <obc-poi-data class="third" .y=${90}> </obc-poi-data>
          <obc-poi-data class="fourth" .y=${100}> </obc-poi-data>
        </obc-poi-layer>
      </div>
    `;
  },
};

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
        .overlapMode=${args.overlapMode}
        .role=${args.role}
        .typeFilter=${args.typeFilter}
        ?debug=${args.debug}
        ?join-while-expanded=${args.joinWhileExpanded}
        .internalSwapping=${!!args.internalSwapping}
      >
        <obc-poi-data .x=${120} .y=${120}> </obc-poi-data>
        <obc-poi-data .x=${320} .y=${70}> </obc-poi-data>
        <obc-poi-data .x=${520} .y=${140}> </obc-poi-data>
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
        .overlapMode=${args.overlapMode}
        .role=${args.role}
        .typeFilter=${args.typeFilter}
        ?debug=${args.debug}
        ?join-while-expanded=${args.joinWhileExpanded}
        .internalSwapping=${!!args.internalSwapping}
      >
        <obc-poi-data .x=${120} .y=${140} .values=${valuesA}></obc-poi-data>
        <obc-poi-data .x=${320} .y=${120} .values=${valuesB}></obc-poi-data>
        <obc-poi-data .x=${520} .y=${160} .values=${valuesC}></obc-poi-data>
      </obc-poi-layer>
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data .x=${260} .y=${80}></obc-poi-data>
          <obc-poi-data .x=${280} .y=${140}></obc-poi-data>
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data .x=${300} .y=${80}></obc-poi-data>
          <obc-poi-data
            .x=${320}
            .y=${140}
            .relativeDirection=${65}
          ></obc-poi-data>
          <obc-poi-data .x=${340} .y=${60}></obc-poi-data>
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data .x=${300} .y=${80} id="3"></obc-poi-data>
          <obc-poi-data
            .x=${320}
            .y=${140}
            .relativeDirection=${65}
            id="1"
          ></obc-poi-data>
          <obc-poi-data .x=${340} .y=${60} id="2"></obc-poi-data>
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

      const a = root.querySelector('obc-poi-data.a') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const b = root.querySelector('obc-poi-data.b') as
        | (HTMLElement & {x: number; y: number})
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data class="a" .y=${140}></obc-poi-data>
          <obc-poi-data class="b" .y=${80}></obc-poi-data>
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

      const a = root.querySelector('obc-poi-data.a') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const b = root.querySelector('obc-poi-data.b') as
        | (HTMLElement & {x: number; y: number})
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data class="a" .y=${120}></obc-poi-data>
          <obc-poi-data class="b" .y=${90}></obc-poi-data>
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

      const a = root.querySelector('obc-poi-data.a') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const b = root.querySelector('obc-poi-data.b') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const c = root.querySelector('obc-poi-data.c') as
        | (HTMLElement & {x: number; y: number})
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
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data class="a" .x=${300} .y=${140}></obc-poi-data>
          <obc-poi-data class="b" .x=${320} .y=${100}></obc-poi-data>
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
    expand: true,
    joinWhileExpanded: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const layerRef = createRef<HTMLElement>();
    const spawnLateTarget = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-data.a') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const b = root.querySelector('obc-poi-data.b') as
        | (HTMLElement & {x: number; y: number})
        | null;
      if (!a || !b) return;

      a.x = 300;
      b.x = 320;

      const c = document.createElement('obc-poi-data') as ObcPoiData;
      c.classList.add('c');
      c.x = 520;
      c.y = 80;

      setTimeout(() => {
        const layer = layerRef.value;
        if (!layer) return;
        layer.appendChild(c);
        c.value = PoiDataValue.Overlapped;
        const duration = 12000;
        const delayMs = 1000;
        let startTime: number | null = null;
        const tick = (now: number) => {
          if (!c.isConnected) return;
          if (c.hasAttribute('data-joined-expanded')) {
            if (startTime === null) startTime = now;
            const t = (now - startTime) / 1000;
            c.x = 340 + 20 * Math.sin(t * 0.8);
            requestAnimationFrame(tick);
            return;
          }
          if (startTime === null) startTime = now + delayMs;
          const elapsed = now - startTime;
          if (elapsed < 0) {
            c.x = 520;
            requestAnimationFrame(tick);
            return;
          }
          const t = (elapsed % duration) / duration;
          if (t < 0.5) {
            const phase = t / 0.5;
            const eased = phase * phase * (3 - 2 * phase);
            const x3 = 520 - (520 - 340) * eased;
            c.x = x3;
          } else {
            c.x = 340;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, 250);

      const observer = new MutationObserver(() => {
        if (!root.isConnected) {
          observer.disconnect();
        }
      });
      observer.observe(root, {childList: true, subtree: true});
    };

    setTimeout(() => spawnLateTarget(hostRef.value ?? null), 0);
    setTimeout(() => {
      const layer = layerRef.value;
      if (!layer) return;
      const applyInitialExpand = () => {
        const group = layer.querySelector('obc-poi-group[data-auto-group]') as {
          expand: boolean;
        } | null;
        if (!group) return false;
        group.expand = !!args.expand;
        return true;
      };
      if (applyInitialExpand()) return;
      const observer = new MutationObserver(() => {
        if (applyInitialExpand()) {
          observer.disconnect();
        }
      });
      observer.observe(layer, {childList: true, subtree: true});
    }, 0);
    return html`
      <style>
        .join-expanded {
          width: 640px;
        }

        .join-expanded obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-overlap-enter: 10px;
          --obc-poi-layer-overlap-pre: 16px;
          --obc-poi-layer-overlap-behind: 10px;
          --obc-poi-layer-overlap-exit: 18px;
          width: 100%;
        }
      </style>
      <div class="join-expanded" ${ref(hostRef)}>
        <obc-poi-layer
          ${ref(layerRef)}
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data class="a" .y=${140}></obc-poi-data>
          <obc-poi-data class="b" .y=${100}></obc-poi-data>
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
    expand: true,
  },
  render(args) {
    const hostRef = createRef<HTMLDivElement>();
    const layerRef = createRef<HTMLElement>();
    const startAnimation = (root: HTMLElement | null) => {
      if (!root || root.dataset.animating === 'true') return;
      root.dataset.animating = 'true';

      const a = root.querySelector('obc-poi-data.a') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const b = root.querySelector('obc-poi-data.b') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const c = root.querySelector('obc-poi-data.c') as
        | (HTMLElement & {x: number; y: number})
        | null;
      if (!a || !b || !c) return;

      a.x = 300;
      b.x = 320;
      c.x = 360;

      const duration = 8000;
      let rafId = 0;
      let startTime: number | null = null;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const t = (elapsed % duration) / duration;

        if (t < 0.5) {
          c.x = 360;
        } else {
          const phase = (t - 0.5) / 0.5;
          const eased = phase * phase * (3 - 2 * phase);
          const x3 = 360 + (520 - 340) * eased;
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
    setTimeout(() => {
      const layer = layerRef.value;
      if (!layer) return;
      const applyInitialExpand = () => {
        const group = layer.querySelector('obc-poi-group') as {
          expand: boolean;
        } | null;
        if (!group) return false;
        group.expand = !!args.expand;
        return true;
      };
      if (applyInitialExpand()) return;
      const observer = new MutationObserver(() => {
        if (applyInitialExpand()) {
          observer.disconnect();
        }
      });
      observer.observe(layer, {childList: true, subtree: true});
    }, 0);
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
      <div class="leave-expanded" ${ref(hostRef)}>
        <obc-poi-layer
          ${ref(layerRef)}
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          .overlapMode=${args.overlapMode}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
        >
          <obc-poi-data class="a" .y=${140}></obc-poi-data>
          <obc-poi-data class="b" .y=${100}></obc-poi-data>
          <obc-poi-data class="c" .y=${80}></obc-poi-data>
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
    let rafId = 0;
    let observer: MutationObserver | null = null;
    let startTime: number | null = null;
    const leftX = 240;
    const rightX = 400;
    const staticX = 320;

    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const resetPositions = () => {
      const root = hostRef.value;
      if (!root) return;
      const staticPoi = root.querySelector('obc-poi-data.static') as
        | (HTMLElement & {x: number; y: number})
        | null;
      const movingPoi = root.querySelector('obc-poi-data.moving') as
        | (HTMLElement & {x: number; y: number})
        | null;
      if (!staticPoi || !movingPoi) return;
      staticPoi.x = staticX;
      movingPoi.x = leftX;
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

        const movingPoi = root.querySelector('obc-poi-data.moving') as
          | (HTMLElement & {x: number; y: number})
          | null;
        const staticPoi = root.querySelector('obc-poi-data.static') as
          | (HTMLElement & {x: number; y: number})
          | null;
        if (!movingPoi || !staticPoi) return;

        staticPoi.x = staticX;
        let x = leftX;
        if (t < 0.35) {
          x = leftX;
        } else if (t < 0.75) {
          const phase = smoothstep((t - 0.35) / 0.4);
          x = leftX + (rightX - leftX) * phase;
        } else {
          const phase = smoothstep((t - 0.75) / 0.25);
          x = rightX + (leftX - rightX) * phase;
        }
        movingPoi.x = x;

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

    setTimeout(() => startAnimation(hostRef.value ?? null), 0);
    return html`
      <style>
        .crossing-mode {
          width: 640px;
        }

        .crossing-mode obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          --obc-poi-layer-crossing-min-gap: 64px;
          width: 100%;
        }
      </style>
      <div class="crossing-mode" ${ref(hostRef)}>
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          .role=${args.role}
          .typeFilter=${args.typeFilter}
          ?debug=${args.debug}
          ?join-while-expanded=${args.joinWhileExpanded}
          .internalSwapping=${!!args.internalSwapping}
          .overlapMode=${OverlapMode.Crossing}
        >
          <obc-poi-data class="static" .y=${120}></obc-poi-data>
          <obc-poi-data
            class="moving"
            .y=${120}
            .allowButtonTransition=${true}
          ></obc-poi-data>
        </obc-poi-layer>
      </div>
    `;
  },
};
