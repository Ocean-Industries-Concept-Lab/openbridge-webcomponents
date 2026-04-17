import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiButtonVessel} from './poi-button-vessel.js';
import './poi-button-vessel.js';
import '../../icons/icon-vessel-type-psv-outlined.js';
import '../building-blocks/poi-header/poi-header.js';
import {html} from 'lit';
import {crossDecorator} from '../../storybook-util.js';
import {
  sectionStyle,
  gridStyle,
  itemStyle,
  stageStyle,
  stageTallStyle,
  buttonAnchorStyle,
  labelStyle,
  renderOverview,
} from './poi-button-story-utils.js';
import {
  ObcPoiButtonState,
  ObcPoiButtonType,
  PoiButtonVisualState,
} from './poi-button.js';
import {
  ObcPoiObjectVesselType,
  ObcPoiObjectVesselStyle,
} from '../poi-object/poi-object-vessel.js';
import {
  ObcPoiHeaderSize,
  ObcPoiHeaderState,
  ObcPoiHeaderType,
} from '../building-blocks/poi-header/poi-header.js';

const meta: Meta<ObcPoiButtonVessel> = {
  title: 'AR/POI Button/POI Button Vessel',
  tags: ['autodocs', 'skip-test'],
  component: 'obc-poi-button-vessel',
  decorators: [crossDecorator],
  args: {
    selected: false,
    hasHeader: false,
    type: ObcPoiButtonType.Button,
    overlapOpaque: false,
    state: ObcPoiButtonState.Enabled,
    value: PoiButtonVisualState.Unchecked,
    vesselType: ObcPoiObjectVesselType.Regular,
    vesselStyle: ObcPoiObjectVesselStyle.Regular,
    data: [],
  },
  argTypes: {
    selected: {control: {type: 'boolean'}},
    hasHeader: {control: {type: 'boolean'}},
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonState),
    },
    value: {
      control: {type: 'select'},
      options: Object.values(PoiButtonVisualState),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonType),
    },
    overlapOpaque: {control: {type: 'boolean'}},
    vesselType: {
      control: {type: 'select'},
      options: Object.values(ObcPoiObjectVesselType),
    },
    vesselStyle: {
      control: {type: 'select'},
      options: Object.values(ObcPoiObjectVesselStyle),
    },
  },
  render: (args) => html`
    <obc-poi-button-vessel
      .data=${args.data}
      .selected=${args.selected}
      .hasHeader=${args.hasHeader}
      .overlapOpaque=${args.overlapOpaque}
      .state=${args.state}
      .value=${args.value}
      .type=${args.type}
      .vesselType=${args.vesselType}
      .vesselStyle=${args.vesselStyle}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
      <obc-poi-header
        slot="header"
        .content=${'1'}
        .type=${ObcPoiHeaderType.Id}
        .state=${ObcPoiHeaderState.Selected}
        .size=${ObcPoiHeaderSize.Regular}
        .hasIndicator=${true}
      >
      </obc-poi-header>
    </obc-poi-button-vessel>
  `,
} satisfies Meta<ObcPoiButtonVessel>;

export default meta;
type Story = StoryObj<ObcPoiButtonVessel>;

type MatrixConfig = {
  value?: PoiButtonVisualState;
  selected?: boolean;
  hasHeader?: boolean;
  state?: ObcPoiButtonState;
  vesselType?: ObcPoiObjectVesselType;
  vesselStyle?: ObcPoiObjectVesselStyle;
  data?: Array<{value: string; label: string; unit: string}>;
  stageTall?: boolean;
  label: string;
};

const renderMatrixButton = (cfg: MatrixConfig) => html`
  <div style=${itemStyle}>
    <div style=${cfg.stageTall ? stageTallStyle : stageStyle}>
      <obc-poi-button-vessel
        style=${buttonAnchorStyle}
        .value=${cfg.value ?? PoiButtonVisualState.Unchecked}
        .selected=${cfg.selected ?? false}
        .hasHeader=${cfg.hasHeader ?? false}
        .state=${cfg.state ?? ObcPoiButtonState.Enabled}
        .vesselType=${cfg.vesselType ?? ObcPoiObjectVesselType.Regular}
        .vesselStyle=${cfg.vesselStyle ?? ObcPoiObjectVesselStyle.Regular}
        .data=${cfg.data ?? []}
      >
        <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
        ${cfg.hasHeader
          ? html`<obc-poi-header
              slot="header"
              .content=${'1'}
              .type=${ObcPoiHeaderType.Id}
              .state=${ObcPoiHeaderState.Selected}
              .size=${ObcPoiHeaderSize.Regular}
              .hasIndicator=${true}
            >
            </obc-poi-header>`
          : html``}
      </obc-poi-button-vessel>
    </div>
    <div style=${labelStyle}>${cfg.label}</div>
  </div>
`;

export const Default: Story = {
  args: {},
};

export const AllValues: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({label: 'Unchecked'})}
          ${renderMatrixButton({
            label: 'Checked',
            value: PoiButtonVisualState.Checked,
          })}
          ${renderMatrixButton({
            label: 'Activated',
            value: PoiButtonVisualState.Activated,
          })}
          ${renderMatrixButton({
            label: 'Overlapped',
            value: PoiButtonVisualState.Overlapped,
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Selected',
            selected: true,
            hasHeader: true,
          })}
          ${renderMatrixButton({
            label: 'Checked + Header',
            value: PoiButtonVisualState.Checked,
            hasHeader: true,
          })}
          ${renderMatrixButton({
            label: 'Activated + Header',
            value: PoiButtonVisualState.Activated,
            hasHeader: true,
          })}
          ${renderMatrixButton({
            label: 'Overlapped + Header',
            value: PoiButtonVisualState.Overlapped,
            hasHeader: true,
          })}
        </div>
      </div>
    `),
};

export const AllData: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Unchecked + Data',
            stageTall: true,
            data: [{value: '123', label: 'Lab', unit: 'Unit'}],
          })}
          ${renderMatrixButton({
            label: 'Checked + Data',
            stageTall: true,
            value: PoiButtonVisualState.Checked,
            data: [{value: '123', label: 'Lab', unit: 'Unit'}],
          })}
          ${renderMatrixButton({
            label: 'Activated + Data',
            stageTall: true,
            value: PoiButtonVisualState.Activated,
            data: [{value: '123', label: 'Lab', unit: 'Unit'}],
          })}
          ${renderMatrixButton({
            label: 'Overlapped + Data',
            stageTall: true,
            value: PoiButtonVisualState.Overlapped,
            data: [{value: '123', label: 'Lab', unit: 'Unit'}],
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Data + Header',
            stageTall: true,
            hasHeader: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
          })}
          ${renderMatrixButton({
            label: 'Checked + Data + Header',
            stageTall: true,
            value: PoiButtonVisualState.Checked,
            hasHeader: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
          })}
          ${renderMatrixButton({
            label: 'Activated + Data + Header',
            stageTall: true,
            value: PoiButtonVisualState.Activated,
            hasHeader: true,
            data: [
              {value: '10', label: 'Lab', unit: 'Unit'},
              {value: '20', label: 'Lab 2', unit: 'Unit 2'},
            ],
          })}
        </div>
      </div>
    `),
};
