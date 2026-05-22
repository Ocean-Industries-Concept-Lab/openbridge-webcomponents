import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiData, PoiDataValue} from './poi-data.js';
import './poi-data.js';
import {crossDecorator} from '../../storybook-util.js';
import {waitForStorySettle} from '../_test-utils.js';
import {html} from 'lit';
import {ObcPoiState, ObcPoiType} from './poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';
import '../building-blocks/poi-header/poi-header.js';

const compactDocsHeightDecorator = (story: () => unknown) => html`
  <style>
    .wrapper {
      height: 560px !important;
      min-height: 560px !important;
    }
  </style>
  ${story()}
`;

const defaultFrameWidth = 888;
const defaultFrameHeight = 420;
const previewFrameWidth = 888;
const previewFrameHeight = 420;

const renderFrame = (
  content: unknown,
  width: number,
  height: number,
  selector: string
) => html`
  <style>
    .frame {
      position: relative;
      width: ${width}px;
      height: ${height}px;
      transform: translate(-50%, -50%);
    }

    .frame ${selector} {
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
  <div class="frame">${content}</div>
`;

const renderPoiData = (args: ObcPoiData) => html`
  <obc-poi-data
    .type=${args.type}
    .state=${args.state}
    .x=${args.x}
    .y=${args.y}
    .buttonY=${args.buttonY}
    .outsideAngle=${args.outsideAngle}
    .hasPointer=${args.hasPointer}
    .hasHeader=${args.hasHeader}
    .value=${args.value}
    .buttonType=${args.buttonType}
    .pointerType=${args.pointerType}
    .pointerState=${args.pointerState}
    .relativeDirection=${args.relativeDirection}
    .buttonOffsetX=${args.buttonOffsetX}
    .targetOffsetX=${args.targetOffsetX}
    .selected=${args.selected}
    .boxWidth=${args.boxWidth}
    .boxHeight=${args.boxHeight}
    .animatePosition=${args.animatePosition}
    .overlapOpaque=${args.overlapOpaque}
    .data=${args.data}
    .fixedTarget=${args.fixedTarget}
  >
    ${args.hasHeader
      ? html`<obc-poi-header
          slot="header"
          content="1"
          type="id"
          state="selected"
          size="regular"
          has-indicator
        ></obc-poi-header>`
      : html``}
  </obc-poi-data>
`;

const meta: Meta<ObcPoiData> = {
  title: 'AR/POI/POI Data',
  tags: ['autodocs'],
  component: 'obc-poi-data',
  args: {
    type: ObcPoiType.Line,
    state: ObcPoiState.Enabled,
    x: 444,
    y: 192,
    buttonY: 0,
    outsideAngle: 315,
    value: PoiDataValue.Unchecked,
    hasPointer: true,
    hasHeader: false,
    pointerType: undefined,
    pointerState: undefined,
    relativeDirection: 0,
    buttonOffsetX: 0,
    targetOffsetX: 0,
    selected: false,
    boxWidth: null,
    boxHeight: null,
    animatePosition: false,
    overlapOpaque: false,
    data: [],
    fixedTarget: false,
  },
  decorators: [crossDecorator, compactDocsHeightDecorator],
  argTypes: {
    type: {
      options: Object.values(ObcPoiType),
      control: {type: 'select'},
    },
    state: {
      options: Object.values(ObcPoiState),
      control: {type: 'select'},
    },
    x: {control: {type: 'range', min: 0, max: 888, step: 1}},
    y: {control: {type: 'range', min: 32, max: 400, step: 1}},
    buttonY: {control: {type: 'range', min: 0, max: 480, step: 1}},
    fixedTarget: {control: {type: 'boolean'}},
    outsideAngle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
      if: {arg: 'type', eq: ObcPoiType.Outside},
    },
    hasPointer: {control: {type: 'boolean'}},
    hasHeader: {control: {type: 'boolean'}},
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
    selected: {control: {type: 'boolean'}},
    boxWidth: {control: {type: 'number', min: 0, step: 1}},
    boxHeight: {control: {type: 'number', min: 0, step: 1}},
    animatePosition: {control: {type: 'boolean'}},
    overlapOpaque: {control: {type: 'boolean'}},
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
        'state',
        'x',
        'y',
        'buttonY',
        'fixedTarget',
        'outsideAngle',
        'hasPointer',
        'hasHeader',
        'value',
        'buttonType',
        'pointerType',
        'pointerState',
        'relativeDirection',
        'buttonOffsetX',
        'targetOffsetX',
        'selected',
        'boxWidth',
        'boxHeight',
        'animatePosition',
        'overlapOpaque',
        'data',
      ],
    },
  },
  render: (args) => {
    return renderFrame(
      renderPoiData(args),
      defaultFrameWidth,
      defaultFrameHeight,
      'obc-poi-data'
    );
  },
} satisfies Meta<ObcPoiData>;

export default meta;
type Story = StoryObj<ObcPoiData>;

export const Preview: Story = {
  args: {
    type: ObcPoiType.Line,
    x: 444,
    y: 300,
    buttonY: 180,
  },
  render: (args) => {
    return renderFrame(
      renderPoiData(args),
      previewFrameWidth,
      previewFrameHeight,
      'obc-poi-data'
    );
  },
};

export const POIVariants: Story = {
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
  render: () => {
    const demoX = 90;
    const demoY = 72;
    const demoButtonY = 0;
    return html`
      <style>
        .variants-stage {
          position: relative;
          width: 720px;
          height: 320px;
          transform: translate(-50%, -50%);
        }

        .variants-showcase {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          grid-template-columns: repeat(2, 180px);
          grid-auto-rows: 140px;
          gap: 8px 12px;
        }

        .variants-item {
          position: relative;
          height: 100%;
        }

        .variants-item-label {
          position: absolute;
          top: 2px;
          left: 0;
          font-size: 11px;
          font-family: monospace;
          color: rgba(54, 68, 86, 0.88);
        }

        .variants-item obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="variants-stage">
        <div class="variants-showcase">
          <div class="variants-item">
            <div class="variants-item-label">Line</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
            ></obc-poi-data>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Offset</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Offset}
              .targetOffsetX=${32}
            ></obc-poi-data>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Point</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
            ></obc-poi-data>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Outside</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Outside}
              .outsideAngle=${315}
              .hasPointer=${true}
            ></obc-poi-data>
          </div>
        </div>
      </div>
    `;
  },
};

export const POIValuesAndContent: Story = {
  play: async () => {
    await waitForStorySettle({drainTransitions: true});
  },
  render: () => {
    const demoX = 108;
    const demoY = 72;
    const demoButtonY = 0;
    const values = [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ];

    return html`
      <style>
        .values-stage {
          position: relative;
          width: 760px;
          height: 420px;
          transform: translate(-50%, -50%);
        }

        .values-showcase {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          grid-template-columns: repeat(3, 210px);
          grid-auto-rows: 168px;
          gap: 26px 14px;
        }

        .values-item {
          position: relative;
          height: 100%;
        }

        .values-item-label {
          position: absolute;
          top: 2px;
          left: 0;
          font-size: 11px;
          font-family: monospace;
          color: rgba(54, 68, 86, 0.88);
        }

        .values-item obc-poi-data {
          position: absolute;
        }
      </style>
      <div class="values-stage">
        <div class="values-showcase">
          <div class="values-item">
            <div class="values-item-label">Checked</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Line}
              .value=${PoiDataValue.Checked}
            ></obc-poi-data>
          </div>
          <div class="values-item">
            <div class="values-item-label">Activated</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Line}
              .value=${PoiDataValue.Activated}
            ></obc-poi-data>
          </div>
          <div class="values-item">
            <div class="values-item-label">Overlapped</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiDataValue.Overlapped}
            ></obc-poi-data>
          </div>
          <div class="values-item">
            <div class="values-item-label">Alarm</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Line}
              .value=${PoiDataValue.Checked}
              .state=${ObcPoiState.Alarm}
            ></obc-poi-data>
          </div>
          <div class="values-item">
            <div class="values-item-label">With Header</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .hasHeader=${true}
            >
              <obc-poi-header
                slot="header"
                content="1"
                type="id"
                state="selected"
                size="regular"
                has-indicator
              ></obc-poi-header>
            </obc-poi-data>
          </div>
          <div class="values-item">
            <div class="values-item-label">With Values</div>
            <obc-poi-data
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .data=${values}
            ></obc-poi-data>
          </div>
        </div>
      </div>
    `;
  },
};

export const AnimatedOffsetBottom: Story = {
  tags: ['!snapshot'],
  args: {
    x: 444,
    y: 192,
    buttonY: 0,
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
  tags: ['!snapshot'],
  args: {
    x: 444,
    y: 192,
    buttonY: 0,
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
  tags: ['!snapshot'],
  args: {
    x: 444,
    y: 300,
    buttonY: 180,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let buttonY = args.buttonY ?? 180;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-height-target'
      ) as ObcPoiData;
      if (!target || !target.isConnected) return;

      buttonY += direction * 1;
      if (buttonY > 220) direction = -1;
      if (buttonY < 120) direction = 1;

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
  tags: ['!snapshot'],
  args: {
    x: 444,
    y: 250,
    buttonY: 100,
    value: PoiDataValue.Checked,
    type: ObcPoiType.Line,
  },
  render: (args) => {
    let lineLength = 250;
    let direction = 1;

    const animate = () => {
      const target = document.querySelector(
        '#animated-line-length'
      ) as ObcPoiData;
      if (!target || !target.isConnected) return;

      lineLength += direction * 1;
      if (lineLength > 300) direction = -1;
      if (lineLength < 50) direction = 1;

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
