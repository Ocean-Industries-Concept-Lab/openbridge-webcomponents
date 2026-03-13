import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiButtonData} from './poi-button-data.js';
import './poi-button-data.js';
import '../building-blocks/poi-header/poi-header.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import '../../icons/icon-vessel-type-tanker-outlined.js';
import '../../icons/icon-vessel-type-cargo-outlined.js';
import '../../icons/icon-vessel-type-passenger-outlined.js';
import {
  ObcPoiButtonLayout,
  ObcPoiButtonState,
  ObcPoiButtonType,
  PoiButtonVisualState,
} from '../building-blocks/poi-button/poi-button.js';
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

const meta: Meta<ObcPoiButtonData> = {
  title: 'AR/POI Button Data',
  tags: ['autodocs'],
  component: 'obc-poi-button-data',
  decorators: [crossDecorator],
  args: {
    selected: false,
    hasHeader: false,
    type: ObcPoiButtonType.Button,
    layout: ObcPoiButtonLayout.Anchored,
    relativeDirection: 0,
    state: ObcPoiButtonState.Enabled,
    value: PoiButtonVisualState.Unchecked,
    inExpandedGroup: false,
    data: [],
  },
  argTypes: {
    relativeDirection: {
      control: {type: 'range', min: 0, max: 360},
    },
    selected: {
      control: {type: 'boolean'},
    },
    hasData: {
      control: false,
      table: {disable: true},
    },
    hasHeader: {
      control: {type: 'boolean'},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonState),
    },
    header: {
      control: false,
      table: {disable: true},
    },
    value: {
      control: {type: 'select'},
      options: Object.values(PoiButtonVisualState),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonType),
    },
    layout: {
      control: {type: 'select'},
      options: Object.values(ObcPoiButtonLayout),
    },
    inExpandedGroup: {
      control: {type: 'boolean'},
    },
    resolvedHeaderState: {
      control: false,
      table: {disable: true},
    },
    resolvedHeaderType: {
      control: false,
      table: {disable: true},
    },
    resolvedHeaderSize: {
      control: false,
      table: {disable: true},
    },
    poiObjectType: {
      control: false,
      table: {disable: true},
    },
    poiObjectState: {
      control: false,
      table: {disable: true},
    },
    selectionFrameType: {
      control: false,
      table: {disable: true},
    },
    selectionFrameState: {
      control: false,
      table: {disable: true},
    },
  },
  parameters: {
    controls: {
      include: [
        'selected',
        'hasHeader',
        'type',
        'layout',
        'relativeDirection',
        'state',
        'value',
        'inExpandedGroup',
        'data',
      ],
    },
    docs: {
      controls: {
        include: [
          'selected',
          'hasHeader',
          'type',
          'layout',
          'relativeDirection',
          'state',
          'value',
          'inExpandedGroup',
          'data',
        ],
      },
    },
  },
  render: (args) => {
    return html`
      <obc-poi-button-data
        .data=${args.data}
        .selected=${args.selected}
        .hasHeader=${args.hasHeader}
        .relativeDirection=${args.relativeDirection}
        .layout=${args.layout}
        .state=${args.state}
        .value=${args.value}
        .type=${args.type}
        .inExpandedGroup=${args.inExpandedGroup}
      >
        <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
        <obc-poi-header
          slot="header"
          content="1"
          type="id"
          state="selected"
          size="regular"
          has-indicator
        >
          <obi-placeholder slot="indicator"></obi-placeholder>
        </obc-poi-header>
      </obc-poi-button-data>
    `;
  },
} satisfies Meta<ObcPoiButtonData>;

export default meta;
type Story = StoryObj<ObcPoiButtonData>;

export const Button: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    type: ObcPoiButtonType.Enhanced,
  },
};

export const WithHeader: Story = {
  args: {
    hasHeader: true,
  },
};

export const WithValues: Story = {
  args: {
    data: [
      {value: '10', label: 'Lab', unit: 'Unit'},
      {value: '20', label: 'Lab 2', unit: 'Unit 2'},
    ],
  },
};

type MatrixConfig = {
  value?: PoiButtonVisualState;
  selected?: boolean;
  hasHeader?: boolean;
  state?: ObcPoiButtonState;
  type?: ObcPoiButtonType;
  data?: Array<{value: string; label: string; unit: string}>;
  stageTall?: boolean;
  icon?: 'default' | 'tanker' | 'cargo' | 'passenger';
  label: string;
};

const iconMap = {
  default: html`<obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>`,
  tanker: html`<obi-vessel-type-tanker-outlined></obi-vessel-type-tanker-outlined>`,
  cargo: html`<obi-vessel-type-cargo-outlined></obi-vessel-type-cargo-outlined>`,
  passenger: html`<obi-vessel-type-passenger-outlined></obi-vessel-type-passenger-outlined>`,
};

const renderMatrixButton = (cfg: MatrixConfig) => html`
  <div style=${itemStyle}>
    <div style=${cfg.stageTall ? stageTallStyle : stageStyle}>
      <obc-poi-button-data
        style=${buttonAnchorStyle}
        .value=${cfg.value ?? PoiButtonVisualState.Unchecked}
        .selected=${cfg.selected ?? false}
        .hasHeader=${cfg.hasHeader ?? false}
        .state=${cfg.state ?? ObcPoiButtonState.Enabled}
        .type=${cfg.type ?? ObcPoiButtonType.Button}
        .data=${cfg.data ?? []}
      >
        ${iconMap[cfg.icon ?? 'default']}
        ${cfg.hasHeader
          ? html`<obc-poi-header
              slot="header"
              content="1"
              type="id"
              state="selected"
              size="regular"
              has-indicator
            >
              <obi-placeholder slot="indicator"></obi-placeholder>
            </obc-poi-header>`
          : html``}
      </obc-poi-button-data>
    </div>
    <div style=${labelStyle}>${cfg.label}</div>
  </div>
`;

export const AllValues: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({label: 'Unchecked', icon: 'default'})}
          ${renderMatrixButton({
            label: 'Checked',
            value: PoiButtonVisualState.Checked,
            icon: 'tanker',
          })}
          ${renderMatrixButton({
            label: 'Activated',
            value: PoiButtonVisualState.Activated,
            icon: 'cargo',
          })}
          ${renderMatrixButton({
            label: 'Overlapped',
            value: PoiButtonVisualState.Overlapped,
            icon: 'passenger',
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Selected',
            selected: true,
            hasHeader: true,
            icon: 'default',
          })}
          ${renderMatrixButton({
            label: 'Checked + Header',
            value: PoiButtonVisualState.Checked,
            hasHeader: true,
            icon: 'tanker',
          })}
          ${renderMatrixButton({
            label: 'Activated + Header',
            value: PoiButtonVisualState.Activated,
            hasHeader: true,
            icon: 'cargo',
          })}
          ${renderMatrixButton({
            label: 'Overlapped + Header',
            value: PoiButtonVisualState.Overlapped,
            hasHeader: true,
            icon: 'passenger',
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
            icon: 'default',
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
    `),
};

export const AllDataWithAlerts: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Data + Enabled',
            stageTall: true,
            icon: 'default',
            data: [{value: '12.3', label: 'SOG', unit: 'kn'}],
          })}
          ${renderMatrixButton({
            label: 'Data + Caution',
            stageTall: true,
            state: ObcPoiButtonState.Caution,
            value: PoiButtonVisualState.Checked,
            icon: 'tanker',
            data: [{value: '8.1', label: 'SOG', unit: 'kn'}],
          })}
          ${renderMatrixButton({
            label: 'Data + Warning',
            stageTall: true,
            state: ObcPoiButtonState.Warning,
            value: PoiButtonVisualState.Checked,
            icon: 'cargo',
            data: [{value: '3.5', label: 'SOG', unit: 'kn'}],
          })}
          ${renderMatrixButton({
            label: 'Data + Alarm',
            stageTall: true,
            state: ObcPoiButtonState.Alarm,
            value: PoiButtonVisualState.Checked,
            icon: 'passenger',
            data: [{value: '0.0', label: 'SOG', unit: 'kn'}],
          })}
        </div>
      </div>
    `),
};
