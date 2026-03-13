import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiAton} from './poi-aton.js';
import './poi-aton.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import {ObcPoiState, ObcPoiType} from '../building-blocks/poi/poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';
import '../building-blocks/poi-header/poi-header.js';
import '../../icons/icon-beacon-general-east.js';
import '../../icons/icon-beacon-general-north.js';
import '../../icons/icon-beacon-general-south.js';
import '../../icons/icon-beacon-general-danger.js';
import '../../icons/icon-beacon-tower-flag.js';
import {
  ObcPoiObjectAtonType,
  ObcPoiObjectAtonStyle,
  ObcPoiObjectAtonState,
} from '../poi-object-aton/poi-object-aton.js';
import {PoiBaseValue as PoiVariantValue} from '../building-blocks/poi/poi-base.js';

const compactDocsHeightDecorator = (story: () => unknown) => html`
  <style>
    .wrapper {
      height: 560px !important;
      min-height: 560px !important;
    }
  </style>
  ${story()}
`;

const meta: Meta<ObcPoiAton> = {
  title: 'AR/POI AtoN',
  tags: ['autodocs'],
  component: 'obc-poi-aton',
  args: {
    type: ObcPoiType.Line,
    state: ObcPoiState.Enabled,
    x: 444,
    y: 192,
    buttonY: 192,
    outsideAngle: 315,
    value: PoiVariantValue.Unchecked,
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
    atonType: ObcPoiObjectAtonType.AtoN,
    atonStyle: ObcPoiObjectAtonStyle.Regular,
    atonState: null,
    atonInteractive: false,
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
    x: {control: {type: 'range', min: 0, max: 640, step: 1}},
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
      options: Object.values(PoiVariantValue),
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
    data: {control: 'object'},
    atonType: {
      options: Object.values(ObcPoiObjectAtonType),
      control: {type: 'select'},
    },
    atonStyle: {
      options: Object.values(ObcPoiObjectAtonStyle),
      control: {type: 'select'},
    },
    atonState: {
      options: [null, ...Object.values(ObcPoiObjectAtonState)],
      control: {type: 'select'},
    },
    atonInteractive: {control: {type: 'boolean'}},
  },
  render: (args) => {
    return html`
      <style>
        .frame {
          position: relative;
          width: 888px;
          height: 2000px;
          transform: translate(-50%, -50%);
        }

        .frame obc-poi-aton {
          position: absolute;
        }
      </style>
      <obc-poi-aton
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
        .atonType=${args.atonType}
        .atonStyle=${args.atonStyle}
        .atonState=${args.atonState}
        .atonInteractive=${args.atonInteractive}
      >
        ${args.hasHeader
          ? html`<obc-poi-header
              slot="header"
              content="B1"
              type="id"
              state="selected"
              size="regular"
              has-indicator
            ></obc-poi-header>`
          : html``}
        <obi-beacon-general-east></obi-beacon-general-east>
      </obc-poi-aton>
    `;
  },
} satisfies Meta<ObcPoiAton>;

export default meta;
type Story = StoryObj<ObcPoiAton>;

export const Preview: Story = {
  args: {
    type: ObcPoiType.Line,
    x: 444,
  },
  render: (args) => {
    return html`
      <style>
        .frame {
          position: relative;
          width: 640px;
          height: 420px;
          transform: translate(-50%, -50%);
        }

        .frame obc-poi-aton {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-aton
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
          .atonType=${args.atonType}
          .atonStyle=${args.atonStyle}
          .atonState=${args.atonState}
          .atonInteractive=${args.atonInteractive}
        >
          ${args.hasHeader
            ? html`<obc-poi-header
                slot="header"
                content="B1"
                type="id"
                state="selected"
                size="regular"
                has-indicator
              ></obc-poi-header>`
            : html``}
          <obi-beacon-general-east></obi-beacon-general-east>
        </obc-poi-aton>
      </div>
    `;
  },
};

export const POIVariants: Story = {
  render: () => {
    const demoX = 90;
    const demoY = 72;
    const demoButtonY = 84;
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

        .variants-item obc-poi-aton {
          position: absolute;
        }
      </style>
      <div class="variants-stage">
        <div class="variants-showcase">
          <div class="variants-item">
            <div class="variants-item-label">Line</div>
            <obc-poi-aton .x=${demoX} .y=${demoY} .buttonY=${demoButtonY}>
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Offset</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Offset}
              .targetOffsetX=${32}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Point</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Outside</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Outside}
              .outsideAngle=${315}
              .hasPointer=${true}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
        </div>
      </div>
    `;
  },
};

export const POIValuesAndContent: Story = {
  render: () => {
    const demoX = 108;
    const demoY = 72;
    const demoButtonY = 72;
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

        .values-item obc-poi-aton {
          position: absolute;
        }
      </style>
      <div class="values-stage">
        <div class="values-showcase">
          <div class="values-item">
            <div class="values-item-label">Checked</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Checked}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="values-item">
            <div class="values-item-label">Activated</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Activated}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="values-item">
            <div class="values-item-label">Overlapped</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Overlapped}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="values-item">
            <div class="values-item-label">Alarm</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Checked}
              .state=${ObcPoiState.Alarm}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="values-item">
            <div class="values-item-label">With Header</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .hasHeader=${true}
            >
              <obc-poi-header
                slot="header"
                content="B1"
                type="id"
                state="selected"
                size="regular"
                has-indicator
              ></obc-poi-header>
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="values-item">
            <div class="values-item-label">With Values</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .data=${values}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
        </div>
      </div>
    `;
  },
};

export const AtonStylesAndTypes: Story = {
  render: () => {
    const demoX = 108;
    const demoY = 72;
    const demoButtonY = 72;

    return html`
      <style>
        .styles-stage {
          position: relative;
          width: 920px;
          height: 480px;
          transform: translate(-50%, -50%);
        }

        .styles-showcase {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          grid-template-columns: repeat(4, 210px);
          grid-auto-rows: 168px;
          gap: 26px 14px;
        }

        .styles-item {
          position: relative;
          height: 100%;
        }

        .styles-item-label {
          position: absolute;
          top: 2px;
          left: 0;
          font-size: 11px;
          font-family: monospace;
          color: rgba(54, 68, 86, 0.88);
        }

        .styles-item obc-poi-aton {
          position: absolute;
        }
      </style>
      <div class="styles-stage">
        <div class="styles-showcase">
          <div class="styles-item">
            <div class="styles-item-label">AtoN + Regular</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.AtoN}
              .atonStyle=${ObcPoiObjectAtonStyle.Regular}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">AtoN + Green</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.AtoN}
              .atonStyle=${ObcPoiObjectAtonStyle.Green}
            >
              <obi-beacon-general-north></obi-beacon-general-north>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">AtoN + Red</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.AtoN}
              .atonStyle=${ObcPoiObjectAtonStyle.Red}
            >
              <obi-beacon-general-south></obi-beacon-general-south>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">AtoN + Yellow</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.AtoN}
              .atonStyle=${ObcPoiObjectAtonStyle.Yellow}
            >
              <obi-beacon-general-danger></obi-beacon-general-danger>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">Regular Type</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.Regular}
              .atonStyle=${ObcPoiObjectAtonStyle.Green}
            >
              <obi-beacon-tower-flag></obi-beacon-tower-flag>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">Large Type</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.Large}
              .atonStyle=${ObcPoiObjectAtonStyle.Red}
            >
              <obi-beacon-general-danger></obi-beacon-general-danger>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">Indicator Type</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.Indicator}
            >
              <obi-beacon-general-north></obi-beacon-general-north>
            </obc-poi-aton>
          </div>
          <div class="styles-item">
            <div class="styles-item-label">Green + Alarm</div>
            <obc-poi-aton
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .atonType=${ObcPoiObjectAtonType.AtoN}
              .atonStyle=${ObcPoiObjectAtonStyle.Green}
              .state=${ObcPoiState.Alarm}
              .value=${PoiVariantValue.Checked}
            >
              <obi-beacon-general-east></obi-beacon-general-east>
            </obc-poi-aton>
          </div>
        </div>
      </div>
    `;
  },
};
