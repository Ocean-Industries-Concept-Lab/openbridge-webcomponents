import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiTarget, Pointer, TargetValue} from './poi-target.js';
import './poi-target.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
const meta: Meta<ObcPoiTarget> = {
  title: 'AR/POI Target',
  tags: ['autodocs'],
  component: 'obc-poi-target',
  args: {
    x: 444,
    y: 192,
    height: 192,
    topOffset: 0,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
    relativeDirection: 0,
    offset: 0,
    values: [],
    fixedTarget: false,
  },
  decorators: [crossDecorator],
  argTypes: {
    x: {control: {type: 'range', min: 0, max: 640, step: 1}},
    y: {control: {type: 'range', min: 32, max: 400, step: 1}},
    height: {control: {type: 'range', min: 0, max: 480, step: 1}},
    topOffset: {control: {type: 'range', min: -200, max: 200, step: 1}},
    fixedTarget: {control: {type: 'boolean'}},
    value: {
      options: [TargetValue.enabled, TargetValue.checked],
      control: {type: 'select'},
    },
    pointerType: {
      options: [
        Pointer.Line,
        Pointer.ArrowLeft,
        Pointer.ArrowRight,
        Pointer.None,
      ],
      control: {type: 'select'},
    },
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
    offset: {
      control: {type: 'range', min: -100, max: 100, step: 1},
    },
    values: {
      control: 'object',
      description:
        'Array of value objects with value, label, and unit (also accepts JSON via values attribute)',
    },
  },
  parameters: {
    controls: {
      include: [
        'x',
        'y',
        'height',
        'topOffset',
        'fixedTarget',
        'value',
        'pointerType',
        'relativeDirection',
        'offset',
        'values',
      ],
    },
  },
  render: (args) => {
    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
        }

        .frame obc-poi-target {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-target
          .x=${args.x}
          .y=${args.y}
          .height=${args.height}
          .topOffset=${args.topOffset}
          .value=${args.value}
          .pointerType=${args.pointerType}
          .relativeDirection=${args.relativeDirection}
          .offset=${args.offset}
          .values=${args.values}
          .fixedTarget=${args.fixedTarget}
        ></obc-poi-target>
      </div>
    `;
  },
} satisfies Meta<ObcPoiTarget>;

export default meta;
type Story = StoryObj<ObcPoiTarget>;

export const Normal: Story = {
  args: {
    value: TargetValue.enabled,
  },
};

export const Enhanced: Story = {
  args: {
    value: TargetValue.checked,
  },
};

export const WithValues: Story = {
  render: (args) => {
    const values = [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ];
    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
        }

        .frame obc-poi-target {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-target
          .x=${args.x}
          .y=${args.y}
          .height=${args.height}
          .topOffset=${args.topOffset}
          .value=${args.value}
          .pointerType=${args.pointerType}
          .relativeDirection=${args.relativeDirection}
          .offset=${args.offset}
          .values=${values}
          .fixedTarget=${args.fixedTarget}
        ></obc-poi-target>
      </div>
    `;
  },
};

export const AnimatedOffsetBottom: Story = {
  args: {
    x: 444,
    y: 192,
    height: 192,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let offset = 0;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-poi-target'
      ) as ObcPoiTarget;
      if (!target || !target.isConnected) return;

      offset += direction * 0.3;
      if (offset > 50) direction = -1;
      if (offset < -50) direction = 1;

      target.offset = offset;
      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-poi-target'
      ) as ObcPoiTarget | null;
      if (!target || !target.isConnected) return;
      requestAnimationFrame(animate);
    }, 100);

    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
        }

        .frame obc-poi-target {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-target
          id="animated-poi-target"
          .x=${args.x}
          .y=${args.y}
          .height=${args.height}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-target>
      </div>
    `;
  },
};

export const AnimatedOffsetTop: Story = {
  args: {
    x: 444,
    y: 192,
    height: 192,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let topOffset = 0;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-poi-target-top'
      ) as ObcPoiTarget;
      if (!target || !target.isConnected) return;

      topOffset += direction * 0.3;
      if (topOffset > 50) direction = -1;
      if (topOffset < -50) direction = 1;

      target.topOffset = topOffset;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-poi-target-top'
      ) as ObcPoiTarget | null;
      if (!target || !target.isConnected) return;
      requestAnimationFrame(animate);
    }, 100);

    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
        }

        .frame obc-poi-target {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-target
          id="animated-poi-target-top"
          .x=${args.x}
          .y=${args.y}
          .height=${args.height}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-target>
      </div>
    `;
  },
};

export const AnimatedHeight: Story = {
  args: {
    x: 444,
    y: 150,
    height: 300,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let height = 300;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-height-target'
      ) as ObcPoiTarget;
      if (!target || !target.isConnected) return;

      height += direction * 1;
      if (height > 400) direction = -1;
      if (height < 200) direction = 1;

      target.height = height;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-height-target'
      ) as ObcPoiTarget | null;
      if (!target || !target.isConnected) return;
      requestAnimationFrame(animate);
    }, 100);

    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.02);
        }

        .frame obc-poi-target {
          position: absolute;
        }

        .reference-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 0, 0, 0.3);
          pointer-events: none;
        }

        .button-reference {
          top: ${(args.height ?? 300) - args.y}px;
        }

        .bottom-reference {
          top: ${args.height ?? 300}px;
        }
      </style>
      <div class="frame">
        <div class="reference-line button-reference"></div>
        <div class="reference-line bottom-reference"></div>
        <obc-poi-target
          id="animated-height-target"
          .x=${args.x}
          .y=${args.y}
          .height=${args.height}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-target>
      </div>
    `;
  },
};

export const AnimatedLineLength: Story = {
  args: {
    x: 444,
    y: 150,
    height: 250,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let lineLength = 150;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-line-length'
      ) as ObcPoiTarget;
      if (!target || !target.isConnected) return;

      lineLength += direction * 1;
      if (lineLength > 300) direction = -1;
      if (lineLength < 50) direction = 1;

      // Keep target position (height) fixed, adjust line length (y)
      target.y = lineLength;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-line-length'
      ) as ObcPoiTarget | null;
      if (!target || !target.isConnected) return;
      requestAnimationFrame(animate);
    }, 100);

    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.02);
        }

        .frame obc-poi-target {
          position: absolute;
        }

        .reference-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 128, 255, 0.5);
          pointer-events: none;
        }

        .target-reference {
          top: ${args.height ?? 250}px;
        }

        .label {
          position: absolute;
          left: 10px;
          font-size: 12px;
          color: rgba(0, 128, 255, 0.8);
          font-family: monospace;
        }

        .target-label {
          top: ${(args.height ?? 250) + 5}px;
        }
      </style>
      <div class="frame">
        <div class="reference-line target-reference"></div>
        <div class="label target-label">Target Position (height) Fixed</div>
        <obc-poi-target
          id="animated-line-length"
          .x=${args.x}
          .y=${args.y}
          .height=${args.height}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-target>
      </div>
    `;
  },
};

export const CompareModes: Story = {
  args: {
    x: 300,
    y: 150,
    height: 300,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let lineLength = 150;
    let direction = 1;

    const animate = () => {
      const fixedTarget = document.querySelector(
        '#compare-fixed'
      ) as ObcPoiTarget;
      const normalTarget = document.querySelector(
        '#compare-normal'
      ) as ObcPoiTarget;
      const fixedYLabel = document.querySelector('#fixed-y-value');
      const fixedHeightLabel = document.querySelector('#fixed-height-value');
      const normalYLabel = document.querySelector('#normal-y-value');
      const normalHeightLabel = document.querySelector('#normal-height-value');

      if (!fixedTarget?.isConnected || !normalTarget?.isConnected) return;

      lineLength += direction * 1;
      if (lineLength > 300) direction = -1;
      if (lineLength < 50) direction = 1;

      fixedTarget.y = lineLength;
      normalTarget.y = lineLength;

      // Update labels
      if (fixedYLabel)
        fixedYLabel.textContent = `y = ${Math.round(lineLength)}px`;
      if (fixedHeightLabel)
        fixedHeightLabel.textContent = `height = ${fixedTarget.height ?? 'null'}`;
      if (normalYLabel)
        normalYLabel.textContent = `y = ${Math.round(lineLength)}px`;
      if (normalHeightLabel)
        normalHeightLabel.textContent = `height = ${normalTarget.height ?? 'null'}px`;

      if (fixedTarget.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.02);
          display: flex;
          gap: 100px;
        }

        .mode-container {
          position: relative;
          flex: 1;
          height: 100%;
        }

        .mode-container obc-poi-target {
          position: absolute;
        }

        .mode-container.fixed-mode obc-poi-target {
          top: 100px;
        }

        .reference-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          pointer-events: none;
        }

        .button-reference {
          top: 100px;
          background: rgba(0, 255, 0, 0.5);
        }

        .target-reference {
          top: ${args.height ?? 300}px;
          background: rgba(255, 0, 0, 0.3);
        }

        .label {
          position: absolute;
          left: 10px;
          font-size: 12px;
          font-family: monospace;
          font-weight: bold;
        }

        .title {
          top: 10px;
          font-size: 14px;
        }

        .button-label {
          top: 85px;
          color: rgba(0, 255, 0, 0.8);
        }

        .target-label {
          top: ${(args.height ?? 300) + 5}px;
          color: rgba(255, 0, 0, 0.8);
        }

        .variables {
          top: 35px;
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 8px 12px;
          border-radius: 4px;
          font-weight: normal;
          line-height: 1.6;
        }

        .var-value {
          color: #ffd700;
          font-weight: bold;
        }
      </style>
      <div class="frame">
        <div class="mode-container fixed-mode">
          <div class="label title">fixed-target=false (Layer Mode)</div>
          <div class="label variables">
            <div id="fixed-y-value" class="var-value">y = ${args.y}px</div>
            <div id="fixed-height-value" class="var-value">height = null</div>
          </div>
          <div class="reference-line button-reference"></div>
          <div class="label button-label">Button Fixed</div>
          <obc-poi-target
            id="compare-fixed"
            .x=${args.x}
            .y=${args.y}
            .fixedTarget=${false}
            .value=${args.value}
            .pointerType=${args.pointerType}
          ></obc-poi-target>
        </div>
        <div class="mode-container">
          <div class="label title">fixed-target=true (CV Mode)</div>
          <div class="label variables">
            <div id="normal-y-value" class="var-value">y = ${args.y}px</div>
            <div id="normal-height-value" class="var-value">
              height = ${args.height ?? 300}px
            </div>
          </div>
          <div class="reference-line target-reference"></div>
          <div class="label target-label">Target Fixed</div>
          <obc-poi-target
            id="compare-normal"
            .x=${args.x}
            .y=${args.y}
            .height=${args.height ?? 300}
            .fixedTarget=${true}
            .value=${args.value}
            .pointerType=${args.pointerType}
          ></obc-poi-target>
        </div>
      </div>
    `;
  },
};

export const AnimatedLineLengthButtonFixed: Story = {
  args: {
    x: 444,
    y: 150,
    value: TargetValue.checked,
    pointerType: Pointer.Line,
  },
  render: (args) => {
    let lineLength = 150;
    let direction = 1;
    const buttonFixedTop = 100; // Button stays at this Y position

    const animate = () => {
      const target = document.querySelector(
        '#animated-line-length-button-fixed'
      ) as ObcPoiTarget;
      if (!target || !target.isConnected) return;

      lineLength += direction * 1;
      if (lineLength > 300) direction = -1;
      if (lineLength < 50) direction = 1;

      // With fixed-button mode, just animate y (line length)
      target.y = lineLength;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-line-length-button-fixed'
      ) as ObcPoiTarget | null;
      if (!target || !target.isConnected) return;
      requestAnimationFrame(animate);
    }, 100);

    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 480px;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.02);
        }

        .frame obc-poi-target {
          position: absolute;
          top: ${buttonFixedTop}px;
        }

        .reference-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          pointer-events: none;
        }

        .button-reference {
          top: ${buttonFixedTop}px;
          background: rgba(0, 255, 0, 0.5);
        }

        .label {
          position: absolute;
          left: 10px;
          font-size: 12px;
          font-family: monospace;
        }

        .button-label {
          top: ${buttonFixedTop - 15}px;
          color: rgba(0, 255, 0, 0.8);
        }
      </style>
      <div class="frame">
        <div class="reference-line button-reference"></div>
        <div class="label button-label">
          POI Button Fixed (fixed-target=false)
        </div>
        <obc-poi-target
          id="animated-line-length-button-fixed"
          .x=${args.x}
          .y=${args.y}
          .fixedTarget=${false}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-target>
      </div>
    `;
  },
};
