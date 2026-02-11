import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiData, PoiDataValue} from './poi-data.js';
import './poi-data.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import {ObcPoiType} from '../building-blocks/poi/poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';
const meta: Meta<ObcPoiData> = {
  title: 'AR/POI Data',
  tags: ['autodocs'],
  component: 'obc-poi-data',
  args: {
    type: ObcPoiType.Line,
    x: 444,
    y: 192,
    buttonY: 192,
    value: PoiDataValue.Unchecked,
    hasPointer: true,
    buttonType: 'button',
    pointerType: undefined,
    pointerState: undefined,
    relativeDirection: 0,
    buttonOffsetX: 0,
    targetOffsetX: 0,
    animatePosition: false,
    data: [],
    fixedTarget: false,
  },
  decorators: [crossDecorator],
  argTypes: {
    type: {
      options: Object.values(ObcPoiType),
      control: {type: 'select'},
    },
    x: {control: {type: 'range', min: 0, max: 640, step: 1}},
    y: {control: {type: 'range', min: 32, max: 400, step: 1}},
    buttonY: {control: {type: 'range', min: 0, max: 480, step: 1}},
    fixedTarget: {control: {type: 'boolean'}},
    hasPointer: {control: {type: 'boolean'}},
    value: {
      options: Object.values(PoiDataValue),
      control: {type: 'select'},
    },
    buttonType: {
      options: ['button', 'enhanced'],
      control: {type: 'select'},
    },
    pointerType: {
      options: [undefined, ...Object.values(ObcPoiPointerType)],
      control: {type: 'select'},
    },
    pointerState: {
      options: [undefined, ...Object.values(ObcPoiPointerState)],
      control: {type: 'select'},
    },
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
    buttonOffsetX: {
      control: {type: 'range', min: -100, max: 100, step: 1},
    },
    targetOffsetX: {
      control: {type: 'range', min: -100, max: 100, step: 1},
    },
    animatePosition: {control: {type: 'boolean'}},
    data: {
      control: 'object',
      description:
        'Array of value objects with value, label, and unit (also accepts JSON via values attribute)',
    },
  },
  parameters: {
    controls: {
      include: [
        'type',
        'x',
        'y',
        'buttonY',
        'fixedTarget',
        'hasPointer',
        'value',
        'buttonType',
        'pointerType',
        'pointerState',
        'relativeDirection',
        'buttonOffsetX',
        'targetOffsetX',
        'animatePosition',
        'data',
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

        .frame obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-data
          .type=${args.type}
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .hasPointer=${args.hasPointer}
          .value=${args.value}
          .buttonType=${args.buttonType}
          .pointerType=${args.pointerType}
          .pointerState=${args.pointerState}
          .relativeDirection=${args.relativeDirection}
          .buttonOffsetX=${args.buttonOffsetX}
          .targetOffsetX=${args.targetOffsetX}
          .animatePosition=${args.animatePosition}
          .data=${args.data}
          .fixedTarget=${args.fixedTarget}
        ></obc-poi-data>
      </div>
    `;
  },
} satisfies Meta<ObcPoiData>;

export default meta;
type Story = StoryObj<ObcPoiData>;

export const Normal: Story = {
  args: {
    value: PoiDataValue.Unchecked,
  },
};

export const Enhanced: Story = {
  args: {
    value: PoiDataValue.Checked,
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

        .frame obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-data
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .value=${args.value}
          .pointerType=${args.pointerType}
          .relativeDirection=${args.relativeDirection}
          .targetOffsetX=${args.targetOffsetX}
          .animatePosition=${args.animatePosition}
          .data=${values}
          .fixedTarget=${args.fixedTarget}
        ></obc-poi-data>
      </div>
    `;
  },
};

export const AnimatedOffsetBottom: Story = {
  args: {
    x: 444,
    y: 192,
    buttonY: 192,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let targetOffsetX = 0;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector('#animated-poi-data') as ObcPoiData;
      if (!target || !target.isConnected) return;

      targetOffsetX += direction * 0.3;
      if (targetOffsetX > 50) direction = -1;
      if (targetOffsetX < -50) direction = 1;

      target.targetOffsetX = targetOffsetX;
      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-poi-data'
      ) as ObcPoiData | null;
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

        .frame obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-data
          id="animated-poi-data"
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-data>
      </div>
    `;
  },
};

export const AnimatedOffsetTop: Story = {
  args: {
    x: 444,
    y: 192,
    buttonY: 192,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let buttonOffsetX = 0;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-poi-data-top'
      ) as ObcPoiData;
      if (!target || !target.isConnected) return;

      buttonOffsetX += direction * 0.3;
      if (buttonOffsetX > 50) direction = -1;
      if (buttonOffsetX < -50) direction = 1;

      target.buttonOffsetX = buttonOffsetX;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-poi-data-top'
      ) as ObcPoiData | null;
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

        .frame obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-data
          id="animated-poi-data-top"
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-data>
      </div>
    `;
  },
};

export const AnimatedHeight: Story = {
  args: {
    x: 444,
    y: 150,
    buttonY: 300,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let buttonY = 300;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-height-target'
      ) as ObcPoiData;
      if (!target || !target.isConnected) return;

      buttonY += direction * 1;
      if (buttonY > 400) direction = -1;
      if (buttonY < 200) direction = 1;

      target.buttonY = buttonY;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-height-target'
      ) as ObcPoiData | null;
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

        .frame obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-data
          id="animated-height-target"
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-data>
      </div>
    `;
  },
};

export const AnimatedLineLength: Story = {
  args: {
    x: 444,
    y: 150,
    buttonY: 250,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let lineLength = 150;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-line-length'
      ) as ObcPoiData;
      if (!target || !target.isConnected) return;

      lineLength += direction * 1;
      if (lineLength > 300) direction = -1;
      if (lineLength < 50) direction = 1;

      // Keep target position (buttonY) fixed, adjust line length (y)
      target.y = lineLength;

      if (target.isConnected) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      const target = document.querySelector(
        '#animated-line-length'
      ) as ObcPoiData | null;
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

        .frame obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-data
          id="animated-line-length"
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .value=${args.value}
          .pointerType=${args.pointerType}
        ></obc-poi-data>
      </div>
    `;
  },
};

export const CompareModes: Story = {
  args: {
    x: 300,
    y: 150,
    buttonY: 300,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let lineLength = 150;
    let direction = 1;
    const fixedButtonY = 100;
    const normalAnchorY = args.buttonY ?? 300;

    const animate = () => {
      const fixedTarget = document.querySelector(
        '#compare-fixed'
      ) as ObcPoiData;
      const normalTarget = document.querySelector(
        '#compare-normal'
      ) as ObcPoiData;
      const fixedYLabel = document.querySelector('#fixed-y-value');
      const fixedButtonYLabel = document.querySelector('#fixed-button-y-value');
      const normalYLabel = document.querySelector('#normal-y-value');
      const normalButtonYLabel = document.querySelector(
        '#normal-button-y-value'
      );

      if (!fixedTarget?.isConnected || !normalTarget?.isConnected) return;

      lineLength += direction * 1;
      if (lineLength > 300) direction = -1;
      if (lineLength < 50) direction = 1;

      fixedTarget.y = lineLength;
      normalTarget.y = lineLength;

      const computedNormalButtonY =
        (normalTarget.buttonY ?? normalAnchorY) - lineLength;

      if (fixedYLabel)
        fixedYLabel.textContent = `y = ${Math.round(lineLength)}px`;
      if (fixedButtonYLabel)
        fixedButtonYLabel.textContent = `buttonY = ${fixedButtonY}px`;
      if (normalYLabel)
        normalYLabel.textContent = `y = ${Math.round(lineLength)}px`;
      if (normalButtonYLabel)
        normalButtonYLabel.textContent = `buttonY = ${Math.round(computedNormalButtonY)}px`;

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
          background: rgba(0, 0, 0, 0.015);
          display: flex;
          gap: 100px;
        }

        .mode-container {
          position: relative;
          flex: 1;
          height: 100%;
        }

        .mode-container obc-poi-data {
          position: absolute;
        }

        .mode-container.fixed-mode obc-poi-data {
          top: ${fixedButtonY}px;
        }

        .reference-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          pointer-events: none;
        }

        .button-reference {
          top: ${fixedButtonY}px;
          background: rgba(92, 122, 152, 0.28);
        }

        .target-reference {
          top: ${normalAnchorY}px;
          background: rgba(92, 122, 152, 0.2);
        }

        .label {
          position: absolute;
          left: 10px;
          font-size: 12px;
          font-family: monospace;
          font-weight: 600;
          color: rgba(54, 68, 86, 0.88);
        }

        .title {
          top: 10px;
          font-size: 14px;
        }

        .button-label {
          top: ${fixedButtonY - 15}px;
          color: rgba(78, 102, 126, 0.82);
        }

        .target-label {
          top: ${normalAnchorY + 5}px;
          color: rgba(78, 102, 126, 0.82);
        }

        .variables {
          top: 35px;
          background: rgba(31, 36, 44, 0.62);
          color: rgba(241, 245, 250, 0.92);
          padding: 8px 12px;
          border-radius: 4px;
          font-weight: normal;
          line-height: 1.6;
        }

        .var-value {
          color: rgba(224, 233, 244, 0.95);
          font-weight: bold;
        }
      </style>
      <div class="frame">
        <div class="mode-container fixed-mode">
          <div class="label title">fixed-target=false (Layer Mode)</div>
          <div class="label variables">
            <div id="fixed-y-value" class="var-value">y = ${args.y}px</div>
            <div id="fixed-button-y-value" class="var-value">
              buttonY = ${fixedButtonY}px
            </div>
          </div>
          <div class="reference-line button-reference"></div>
          <div class="label button-label">Button Fixed</div>
          <obc-poi-data
            id="compare-fixed"
            .x=${args.x}
            .y=${args.y}
            .fixedTarget=${false}
            .value=${args.value}
            .pointerType=${args.pointerType}
          ></obc-poi-data>
        </div>
        <div class="mode-container">
          <div class="label title">fixed-target=true (CV Mode)</div>
          <div class="label variables">
            <div id="normal-y-value" class="var-value">y = ${args.y}px</div>
            <div id="normal-button-y-value" class="var-value">
              buttonY = ${(normalAnchorY ?? 300) - args.y}px
            </div>
          </div>
          <div class="reference-line target-reference"></div>
          <div class="label target-label">Target Fixed</div>
          <obc-poi-data
            id="compare-normal"
            .x=${args.x}
            .y=${args.y}
            .buttonY=${normalAnchorY}
            .fixedTarget=${true}
            .value=${args.value}
            .pointerType=${args.pointerType}
          ></obc-poi-data>
        </div>
      </div>
    `;
  },
};
