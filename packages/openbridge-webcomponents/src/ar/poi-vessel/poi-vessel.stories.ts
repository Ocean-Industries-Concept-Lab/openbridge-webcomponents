import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiVessel} from './poi-vessel.js';
import './poi-vessel.js';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import {ObcPoiState, ObcPoiType} from '../building-blocks/poi/poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';
import '../building-blocks/poi-header/poi-header.js';
import '../../icons/icon-vessel-type-psv-outlined.js';
import '../../icons/icon-vessel-type-tanker-outlined.js';
import '../../icons/icon-vessel-type-cargo-outlined.js';
import '../../icons/icon-vessel-type-passenger-outlined.js';
import '../../icons/icon-vessel-type-fishing-outlined.js';
import {
  ObcPoiObjectVesselType,
  ObcPoiObjectVesselStyle,
  ObcPoiObjectVesselState,
} from '../poi-object-vessel/poi-object-vessel.js';
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

const meta: Meta<ObcPoiVessel> = {
  title: 'AR/POI Button/POI Vessel',
  tags: ['autodocs'],
  component: 'obc-poi-vessel',
  args: {
    type: ObcPoiType.Line,
    state: ObcPoiState.Enabled,
    x: 444,
    y: 192,
    buttonY: 192,
    outsideAngle: 315,
    hasPointer: true,
    hasHeader: false,
    pointerType: undefined,
    pointerState: undefined,
    relativeDirection: 0,
    targetOffsetX: 0,
    data: [],
    vesselType: ObcPoiObjectVesselType.Regular,
    vesselStyle: ObcPoiObjectVesselStyle.Regular,
    vesselState: null,
    vesselInteractive: false,
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
    outsideAngle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
      if: {arg: 'type', eq: ObcPoiType.Outside},
    },
    hasPointer: {control: {type: 'boolean'}},
    hasHeader: {control: {type: 'boolean'}},
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
    targetOffsetX: {
      control: {type: 'range', min: -100, max: 100, step: 1},
    },
    data: {control: 'object'},
    vesselType: {
      options: Object.values(ObcPoiObjectVesselType),
      control: {type: 'select'},
    },
    vesselStyle: {
      options: Object.values(ObcPoiObjectVesselStyle),
      control: {type: 'select'},
    },
    vesselState: {
      options: [null, ...Object.values(ObcPoiObjectVesselState)],
      control: {type: 'select'},
    },
    vesselInteractive: {control: {type: 'boolean'}},
    value: {table: {disable: true}},
    selected: {table: {disable: true}},
    buttonOffsetX: {table: {disable: true}},
    overlapOpaque: {table: {disable: true}},
    animatePosition: {table: {disable: true}},
    fixedTarget: {table: {disable: true}},
    buttonType: {table: {disable: true}},
    boxWidth: {table: {disable: true}},
    boxHeight: {table: {disable: true}},
    headerContent: {table: {disable: true}},
    lineCompensationY: {table: {disable: true}},
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

        .frame obc-poi-vessel {
          position: absolute;
        }
      </style>
      <obc-poi-vessel
        .type=${args.type}
        .state=${args.state}
        .x=${args.x}
        .y=${args.y}
        .buttonY=${args.buttonY}
        .outsideAngle=${args.outsideAngle}
        .hasPointer=${args.hasPointer}
        .hasHeader=${args.hasHeader}
        .pointerType=${args.pointerType}
        .pointerState=${args.pointerState}
        .relativeDirection=${args.relativeDirection}
        .targetOffsetX=${args.targetOffsetX}
        .data=${args.data}
        .vesselType=${args.vesselType}
        .vesselStyle=${args.vesselStyle}
        .vesselState=${args.vesselState}
        .vesselInteractive=${args.vesselInteractive}
      >
        ${args.hasHeader
          ? html`<obc-poi-header
              slot="header"
              content="V1"
              type="id"
              state="selected"
              size="regular"
              has-indicator
            ></obc-poi-header>`
          : html``}
        <span style="transform: rotate(${args.relativeDirection}deg);">
          <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
        </span>
      </obc-poi-vessel>
    `;
  },
} satisfies Meta<ObcPoiVessel>;

export default meta;
type Story = StoryObj<ObcPoiVessel>;

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

        .frame obc-poi-vessel {
          position: absolute;
        }
      </style>
      <div class="frame">
        <obc-poi-vessel
          .type=${args.type}
          .state=${args.state}
          .x=${args.x}
          .y=${args.y}
          .buttonY=${args.buttonY}
          .outsideAngle=${args.outsideAngle}
          .hasPointer=${args.hasPointer}
          .hasHeader=${args.hasHeader}
          .pointerType=${args.pointerType}
          .pointerState=${args.pointerState}
          .relativeDirection=${args.relativeDirection}
          .targetOffsetX=${args.targetOffsetX}
          .data=${args.data}
          .vesselType=${args.vesselType}
          .vesselStyle=${args.vesselStyle}
          .vesselState=${args.vesselState}
          .vesselInteractive=${args.vesselInteractive}
        >
          ${args.hasHeader
            ? html`<obc-poi-header
                slot="header"
                content="V1"
                type="id"
                state="selected"
                size="regular"
                has-indicator
              ></obc-poi-header>`
            : html``}
          <span style="transform: rotate(${args.relativeDirection}deg);">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </span>
        </obc-poi-vessel>
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

        .variants-item obc-poi-vessel {
          position: absolute;
        }
      </style>
      <div class="variants-stage">
        <div class="variants-showcase">
          <div class="variants-item">
            <div class="variants-item-label">Line</div>
            <obc-poi-vessel .x=${demoX} .y=${demoY} .buttonY=${demoButtonY}>
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Offset</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Offset}
              .targetOffsetX=${32}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Point</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="variants-item">
            <div class="variants-item-label">Outside</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Outside}
              .outsideAngle=${315}
              .hasPointer=${true}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
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

        .values-item obc-poi-vessel {
          position: absolute;
        }
      </style>
      <div class="values-stage">
        <div class="values-showcase">
          <div class="values-item">
            <div class="values-item-label">Checked</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Checked}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="values-item">
            <div class="values-item-label">Activated</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Activated}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="values-item">
            <div class="values-item-label">Overlapped</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Overlapped}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="values-item">
            <div class="values-item-label">Alarm</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .value=${PoiVariantValue.Checked}
              .state=${ObcPoiState.Alarm}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="values-item">
            <div class="values-item-label">With Header</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .hasHeader=${true}
            >
              <obc-poi-header
                slot="header"
                content="V1"
                type="id"
                state="selected"
                size="regular"
                has-indicator
              ></obc-poi-header>
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="values-item">
            <div class="values-item-label">With Values</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .type=${ObcPoiType.Point}
              .data=${values}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
        </div>
      </div>
    `;
  },
};

export const VesselTypesAndIcons: Story = {
  render: () => {
    const demoX = 108;
    const demoY = 72;
    const demoButtonY = 72;

    return html`
      <style>
        .types-stage {
          position: relative;
          width: 920px;
          height: 480px;
          transform: translate(-50%, -50%);
        }

        .types-showcase {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          grid-template-columns: repeat(4, 210px);
          grid-auto-rows: 168px;
          gap: 26px 14px;
        }

        .types-item {
          position: relative;
          height: 100%;
        }

        .types-item-label {
          position: absolute;
          top: 2px;
          left: 0;
          font-size: 11px;
          font-family: monospace;
          color: rgba(54, 68, 86, 0.88);
        }

        .types-item obc-poi-vessel {
          position: absolute;
        }
      </style>
      <div class="types-stage">
        <div class="types-showcase">
          <div class="types-item">
            <div class="types-item-label">Regular + PSV</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .vesselType=${ObcPoiObjectVesselType.Regular}
            >
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">Large + Tanker</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .vesselType=${ObcPoiObjectVesselType.Large}
            >
              <obi-vessel-type-tanker-outlined></obi-vessel-type-tanker-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">Indicator + Cargo</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .vesselType=${ObcPoiObjectVesselType.Indicator}
            >
              <obi-vessel-type-cargo-outlined></obi-vessel-type-cargo-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">Speed-Rot + Passenger</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .vesselType=${ObcPoiObjectVesselType.SpeedRot}
            >
              <obi-vessel-type-passenger-outlined></obi-vessel-type-passenger-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">Fishing + Checked</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .value=${PoiVariantValue.Checked}
            >
              <obi-vessel-type-fishing-outlined></obi-vessel-type-fishing-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">Cargo + Alarm</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .value=${PoiVariantValue.Checked}
              .state=${ObcPoiState.Alarm}
            >
              <obi-vessel-type-cargo-outlined></obi-vessel-type-cargo-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">Tanker + Warning</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .value=${PoiVariantValue.Checked}
              .state=${ObcPoiState.Warning}
            >
              <obi-vessel-type-tanker-outlined></obi-vessel-type-tanker-outlined>
            </obc-poi-vessel>
          </div>
          <div class="types-item">
            <div class="types-item-label">PSV + Selected</div>
            <obc-poi-vessel
              .x=${demoX}
              .y=${demoY}
              .buttonY=${demoButtonY}
              .selected=${true}
              .hasHeader=${true}
              .value=${PoiVariantValue.Checked}
            >
              <obc-poi-header
                slot="header"
                content="V1"
                type="id"
                state="selected"
                size="regular"
                has-indicator
              ></obc-poi-header>
              <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
            </obc-poi-vessel>
          </div>
        </div>
      </div>
    `;
  },
};
