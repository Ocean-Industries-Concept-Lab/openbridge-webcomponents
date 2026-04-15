import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiButtonVessel} from './poi-button-vessel.js';
import './poi-button-vessel.js';
import '../../icons/icon-vessel-type-psv-outlined.js';
import '../../icons/icon-vessel-type-tanker-outlined.js';
import '../../icons/icon-vessel-type-cargo-outlined.js';
import '../../icons/icon-vessel-type-passenger-outlined.js';
import '../../icons/icon-vessel-type-fishing-outlined.js';
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
} from '../building-blocks/poi-button/poi-button-story-utils.js';
import {
  ObcPoiButtonState,
  ObcPoiButtonType,
  PoiButtonVisualState,
} from '../building-blocks/poi-button/poi-button.js';
import {
  ObcPoiObjectVesselType,
  ObcPoiObjectVesselStyle,
  ObcPoiObjectVesselState,
} from '../poi-object-vessel/poi-object-vessel.js';
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
    vesselState: null,
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
    vesselState: {
      control: {type: 'select'},
      options: [null, ...Object.values(ObcPoiObjectVesselState)],
    },
  },
  parameters: {
    controls: {
      include: [
        'selected',
        'hasHeader',
        'type',
        'overlapOpaque',
        'state',
        'value',
        'vesselType',
        'vesselStyle',
        'vesselState',
        'data',
      ],
    },
    docs: {
      controls: {
        include: [
          'selected',
          'hasHeader',
          'type',
          'overlapOpaque',
          'state',
          'value',
          'vesselType',
          'vesselStyle',
          'vesselState',
          'data',
        ],
      },
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
      .vesselState=${args.vesselState}
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
  type?: ObcPoiButtonType;
  data?: Array<{value: string; label: string; unit: string}>;
  stageTall?: boolean;
  icon?: 'psv' | 'tanker' | 'cargo' | 'passenger' | 'fishing';
  label: string;
};

const iconMap = {
  psv: html`<obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>`,
  tanker: html`<obi-vessel-type-tanker-outlined></obi-vessel-type-tanker-outlined>`,
  cargo: html`<obi-vessel-type-cargo-outlined></obi-vessel-type-cargo-outlined>`,
  passenger: html`<obi-vessel-type-passenger-outlined></obi-vessel-type-passenger-outlined>`,
  fishing: html`<obi-vessel-type-fishing-outlined></obi-vessel-type-fishing-outlined>`,
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
        .type=${cfg.type ?? ObcPoiButtonType.Button}
        .data=${cfg.data ?? []}
      >
        ${iconMap[cfg.icon ?? 'psv']}
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

export const AllVesselTypes: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Regular',
            vesselType: ObcPoiObjectVesselType.Regular,
            icon: 'psv',
          })}
          ${renderMatrixButton({
            label: 'Large',
            vesselType: ObcPoiObjectVesselType.Large,
            icon: 'tanker',
          })}
          ${renderMatrixButton({
            label: 'Indicator',
            vesselType: ObcPoiObjectVesselType.Indicator,
            icon: 'cargo',
          })}
          ${renderMatrixButton({
            label: 'Speed-Rot',
            vesselType: ObcPoiObjectVesselType.SpeedRot,
            icon: 'passenger',
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Enhanced + Regular',
            vesselType: ObcPoiObjectVesselType.Regular,
            type: ObcPoiButtonType.Enhanced,
            icon: 'psv',
          })}
          ${renderMatrixButton({
            label: 'N-Up',
            vesselType: ObcPoiObjectVesselType.NUp,
            icon: 'fishing',
          })}
          ${renderMatrixButton({
            label: 'N-Up Large',
            vesselType: ObcPoiObjectVesselType.NUpLarge,
            icon: 'cargo',
          })}
        </div>
      </div>
    `),
};

export const AllAlertStates: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Enabled',
            state: ObcPoiButtonState.Enabled,
            value: PoiButtonVisualState.Checked,
            icon: 'psv',
          })}
          ${renderMatrixButton({
            label: 'Caution',
            state: ObcPoiButtonState.Caution,
            value: PoiButtonVisualState.Checked,
            icon: 'tanker',
          })}
          ${renderMatrixButton({
            label: 'Warning',
            state: ObcPoiButtonState.Warning,
            value: PoiButtonVisualState.Checked,
            icon: 'cargo',
          })}
          ${renderMatrixButton({
            label: 'Alarm',
            state: ObcPoiButtonState.Alarm,
            value: PoiButtonVisualState.Checked,
            icon: 'passenger',
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Caution + Selected',
            state: ObcPoiButtonState.Caution,
            value: PoiButtonVisualState.Checked,
            selected: true,
            hasHeader: true,
            icon: 'psv',
          })}
          ${renderMatrixButton({
            label: 'Warning + Selected',
            state: ObcPoiButtonState.Warning,
            value: PoiButtonVisualState.Checked,
            selected: true,
            hasHeader: true,
            icon: 'cargo',
          })}
          ${renderMatrixButton({
            label: 'Alarm + Selected',
            state: ObcPoiButtonState.Alarm,
            value: PoiButtonVisualState.Checked,
            selected: true,
            hasHeader: true,
            icon: 'passenger',
          })}
        </div>
      </div>
    `),
};

export const DifferentIcons: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({label: 'PSV', icon: 'psv'})}
          ${renderMatrixButton({label: 'Tanker', icon: 'tanker'})}
          ${renderMatrixButton({label: 'Cargo', icon: 'cargo'})}
          ${renderMatrixButton({label: 'Passenger', icon: 'passenger'})}
          ${renderMatrixButton({label: 'Fishing', icon: 'fishing'})}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'PSV + Checked',
            icon: 'psv',
            value: PoiButtonVisualState.Checked,
          })}
          ${renderMatrixButton({
            label: 'Tanker + Activated',
            icon: 'tanker',
            value: PoiButtonVisualState.Activated,
          })}
          ${renderMatrixButton({
            label: 'Cargo + Selected',
            icon: 'cargo',
            selected: true,
            hasHeader: true,
          })}
          ${renderMatrixButton({
            label: 'Passenger + Alarm',
            icon: 'passenger',
            state: ObcPoiButtonState.Alarm,
            value: PoiButtonVisualState.Checked,
          })}
          ${renderMatrixButton({
            label: 'Fishing + Data',
            icon: 'fishing',
            stageTall: true,
            data: [{value: '5.2', label: 'SOG', unit: 'kn'}],
          })}
        </div>
      </div>
    `),
};
