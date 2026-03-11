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
import {
  ObcPoiObjectAtonType,
  ObcPoiObjectAtonStyle,
  ObcPoiObjectAtonState,
} from '../poi-object-aton/poi-object-aton.js';
import {PoiVariantValue} from '../building-blocks/poi-variant/poi-variant.js';

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
    atonState: ObcPoiObjectAtonState.Unchecked,
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
      options: Object.values(ObcPoiObjectAtonState),
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
