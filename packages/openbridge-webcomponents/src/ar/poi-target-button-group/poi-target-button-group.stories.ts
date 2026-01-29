import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiTargetButtonGroup} from './poi-target-button-group.js';
import './poi-target-button-group.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import '../poi-target-button/poi-target-button.js';
import '../../icons/icon-ais-target-activated-iec.js';
import '../poi-target/poi-target.js';
import {ObcPoiTarget} from '../poi-target/poi-target.js';

function onExpand(event: CustomEvent<{expand: boolean}>) {
  (document.querySelector('#outside') as ObcPoiTarget).visualState =
    event.detail.expand ? 'overlap' : 'normal';
}

const meta: Meta<ObcPoiTargetButtonGroup> = {
  title: 'AR/POI Target Button Group',
  tags: ['6.0'],
  component: 'obc-poi-target-button-group',
  decorators: [crossDecorator],
  args: {},
  render: (args) => html`
    <style>
      #b1 { left: calc(50% - 15px); }
      #b2 { left: calc(50% + 15px); }
      #b3 { left: calc(50% - 30px); }
      #outside { left: calc(50% - 120px); }
    </style>
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
      <obc-poi-target-button-group
        style="position: absolute; top: 0; left: 0;"
        .expand=${args.expand}
        positionVertical="calc(50%)"
        @expand=${onExpand}
      >
        <obc-poi-target id="b3" style="position: absolute; top: 50%;" data-visual-state="overlap"></obc-poi-target>
        <obc-poi-target id="b1" style="position: absolute; top: 50%;" .relativeDirection=${65}></obc-poi-target>
        <obc-poi-target id="b2" style="position: absolute; top: 50%;" data-visual-state="overlap"></obc-poi-target>
      </obc-poi-target-button-group>
      <obc-poi-target
        id="outside"
        style="position: absolute; top: 50%;"
        data-visual-state=${args.expand ? 'overlap' : 'normal'}
      >
        <obi-ais-target-activated-iec></obi-ais-target-activated-iec>
      </obc-poi-target>
    </div>
  `,
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
  render: (args) => html`
    <style>
      #b1 { left: calc(50% - 15px); }
      #b2 { left: calc(50% + 15px); }
      #b3 { left: calc(50% - 30px); }
      #outside { left: calc(50% - 120px); }
    </style>
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
      <obc-poi-target-button-group
        style="position: absolute; top: 0; left: 0;"
        .expand=${args.expand}
        positionVertical="calc(50%)"
        @expand=${onExpand}
      >
        <obc-poi-target id="b3" style="position: absolute; top: 50%;" data-visual-state="overlap" selectedId="3"></obc-poi-target>
        <obc-poi-target id="b1" style="position: absolute; top: 50%;" .relativeDirection=${65} selectedId="1"></obc-poi-target>
        <obc-poi-target id="b2" style="position: absolute; top: 50%;" data-visual-state="overlap" selectedId="2"></obc-poi-target>
      </obc-poi-target-button-group>
      <obc-poi-target
        id="outside"
        style="position: absolute; top: 50%;"
        data-visual-state=${args.expand ? 'overlap' : 'normal'}
        selectedId="4"
      >
        <obi-ais-target-activated-iec></obi-ais-target-activated-iec>
      </obc-poi-target>
    </div>
  `,
};

export const Expanded: Story = {
  args: {
    expand: true,
  },
};

export const AnimatedTopOffset: Story = {
  args: {},
  render: () => {
    const targets = [
      {id: 'anim-target-1', originalX: -20, expandedX: -50},
      {id: 'anim-target-2', originalX: 0, expandedX: 0},
      {id: 'anim-target-3', originalX: 20, expandedX: 50},
    ];

    let progress = 0;
    let expanding = true;
    let pauseFrames = 0;

    const animate = () => {
      if (pauseFrames > 0) {
        pauseFrames--;
        requestAnimationFrame(animate);
        return;
      }

      progress += expanding ? 0.005 : -0.005;

      if (progress >= 1) {
        progress = 1;
        expanding = false;
        pauseFrames = 60;
      }
      if (progress <= 0) {
        progress = 0;
        expanding = true;
        pauseFrames = 60;
      }

      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      targets.forEach((t, index) => {
        const target = document.querySelector(`#${t.id}`) as ObcPoiTarget;
        if (!target) return;

        const currentX = t.originalX + (t.expandedX - t.originalX) * eased;
        const buttonOffset = currentX - t.originalX;

        target.style.transform = `translateX(${buttonOffset}px)`;
        target.offset = -buttonOffset;

        if (index !== 1) {
          target.visualState = progress > 0.5 ? 'normal' : 'overlap';
        }
      });

      requestAnimationFrame(animate);
    };

    setTimeout(() => requestAnimationFrame(animate), 100);

    return html`
      <style>
        .anim-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        #anim-target-1, #anim-target-2, #anim-target-3 {
          position: absolute;
          top: 50%;
        }
        #anim-target-1 { left: calc(50% - 20px); }
        #anim-target-2 { left: 50%; }
        #anim-target-3 { left: calc(50% + 20px); }
      </style>
      <div class="anim-container">
        <obc-poi-target id="anim-target-3" .height=${160} data-visual-state="overlap"></obc-poi-target>
        <obc-poi-target id="anim-target-1" .height=${180} data-visual-state="overlap"></obc-poi-target>
        <obc-poi-target id="anim-target-2" .height=${200}></obc-poi-target>
      </div>
    `;
  },
};

export const GroupWithTopOffsetTransition: Story = {
  args: {},
  render: () => {
    const targetConfigs = [
      {id: 'grp-target-1', expandedOffset: -35},
      {id: 'grp-target-2', expandedOffset: 0},
      {id: 'grp-target-3', expandedOffset: 35},
    ];

    let animationId: number | null = null;
    let progress = 0;
    let isExpanded = false;

    const animateTo = (targetProgress: number) => {
      if (animationId) cancelAnimationFrame(animationId);

      const step = () => {
        const diff = targetProgress - progress;
        if (Math.abs(diff) < 0.01) {
          progress = targetProgress;
          animationId = null;
        } else {
          progress += diff * 0.08;
          animationId = requestAnimationFrame(step);
        }

        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        targetConfigs.forEach((t, index) => {
          const target = document.querySelector(`#${t.id}`) as ObcPoiTarget;
          if (!target) return;

          const buttonOffset = t.expandedOffset * eased;
          target.style.transform = `translateX(${buttonOffset}px)`;
          target.offset = -buttonOffset;

          if (index !== 1) {
            target.visualState = progress > 0.5 ? 'normal' : 'overlap';
          }
        });
      };

      step();
    };

    const handleClick = () => {
      isExpanded = !isExpanded;
      animateTo(isExpanded ? 1 : 0);
    };

    return html`
      <style>
        .top-offset-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        #grp-target-1, #grp-target-2, #grp-target-3 {
          position: absolute;
          top: 50%;
        }
        #grp-target-1 { left: calc(50% - 15px); }
        #grp-target-2 { left: 50%; }
        #grp-target-3 { left: calc(50% + 15px); }
        .click-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
          appearance: none;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: none;
          padding: 0;
          margin: 0;
          height: 38px;
          width: 80px;
          border-radius: 18px;
          cursor: pointer;
          z-index: 10;
        }
        .click-wrapper:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .click-wrapper:active {
          background: rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="top-offset-container">
        <obc-poi-target id="grp-target-3" .height=${160} data-visual-state="overlap"></obc-poi-target>
        <obc-poi-target id="grp-target-1" .height=${180} data-visual-state="overlap"></obc-poi-target>
        <obc-poi-target id="grp-target-2" .height=${200}></obc-poi-target>
        <button class="click-wrapper" @click=${handleClick}></button>
      </div>
    `;
  },
};
