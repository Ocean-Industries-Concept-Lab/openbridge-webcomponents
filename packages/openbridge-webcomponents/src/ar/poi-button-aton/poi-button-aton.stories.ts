import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPoiButtonAton} from './poi-button-aton.js';
import './poi-button-aton.js';
import '../../icons/icon-beacon-general-north.js';
import '../../icons/icon-beacon-general-south.js';
import '../../icons/icon-beacon-general-danger.js';
import '../../icons/icon-beacon-tower-flag.js';
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
  ObcPoiObjectAtonType,
  ObcPoiObjectAtonStyle,
  ObcPoiObjectAtonState,
} from '../poi-object-aton/poi-object-aton.js';
import {
  ObcPoiHeaderSize,
  ObcPoiHeaderState,
  ObcPoiHeaderType,
} from '../building-blocks/poi-header/poi-header.js';

const meta: Meta<ObcPoiButtonAton> = {
  title: 'AR/POI Button AtoN',
  tags: ['autodocs'],
  component: 'obc-poi-button-aton',
  decorators: [crossDecorator],
  args: {
    selected: false,
    hasHeader: false,
    type: ObcPoiButtonType.Button,
    overlapOpaque: false,
    state: ObcPoiButtonState.Enabled,
    value: PoiButtonVisualState.Unchecked,
    atonType: ObcPoiObjectAtonType.AtoN,
    atonStyle: ObcPoiObjectAtonStyle.Regular,
    atonState: null,
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
    atonType: {
      control: {type: 'select'},
      options: Object.values(ObcPoiObjectAtonType),
    },
    atonStyle: {
      control: {type: 'select'},
      options: Object.values(ObcPoiObjectAtonStyle),
    },
    atonState: {
      control: {type: 'select'},
      options: [null, ...Object.values(ObcPoiObjectAtonState)],
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
        'atonType',
        'atonStyle',
        'atonState',
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
          'atonType',
          'atonStyle',
          'atonState',
          'data',
        ],
      },
    },
  },
  render: (args) => html`
    <obc-poi-button-aton
      .data=${args.data}
      .selected=${args.selected}
      .hasHeader=${args.hasHeader}
      .overlapOpaque=${args.overlapOpaque}
      .state=${args.state}
      .value=${args.value}
      .type=${args.type}
      .atonType=${args.atonType}
      .atonStyle=${args.atonStyle}
      .atonState=${args.atonState}
    >
      <obi-beacon-general-north></obi-beacon-general-north>
      <obc-poi-header
        slot="header"
        .content=${'1'}
        .type=${ObcPoiHeaderType.Id}
        .state=${ObcPoiHeaderState.Selected}
        .size=${ObcPoiHeaderSize.Regular}
        .hasIndicator=${true}
      >
        <obi-placeholder slot="indicator"></obi-placeholder>
      </obc-poi-header>
    </obc-poi-button-aton>
  `,
} satisfies Meta<ObcPoiButtonAton>;

export default meta;
type Story = StoryObj<ObcPoiButtonAton>;

type MatrixConfig = {
  value?: PoiButtonVisualState;
  selected?: boolean;
  hasHeader?: boolean;
  state?: ObcPoiButtonState;
  atonType?: ObcPoiObjectAtonType;
  atonStyle?: ObcPoiObjectAtonStyle;
  atonState?: ObcPoiObjectAtonState | null;
  type?: ObcPoiButtonType;
  data?: Array<{value: string; label: string; unit: string}>;
  stageTall?: boolean;
  icon?: 'north' | 'south' | 'danger' | 'flag';
  label: string;
};

const iconMap = {
  north: html`<obi-beacon-general-north></obi-beacon-general-north>`,
  south: html`<obi-beacon-general-south></obi-beacon-general-south>`,
  danger: html`<obi-beacon-general-danger></obi-beacon-general-danger>`,
  flag: html`<obi-beacon-tower-flag></obi-beacon-tower-flag>`,
};

const renderMatrixButton = (cfg: MatrixConfig) => html`
  <div style=${itemStyle}>
    <div style=${cfg.stageTall ? stageTallStyle : stageStyle}>
      <obc-poi-button-aton
        style=${buttonAnchorStyle}
        .value=${cfg.value ?? PoiButtonVisualState.Unchecked}
        .selected=${cfg.selected ?? false}
        .hasHeader=${cfg.hasHeader ?? false}
        .state=${cfg.state ?? ObcPoiButtonState.Enabled}
        .atonType=${cfg.atonType ?? ObcPoiObjectAtonType.AtoN}
        .atonStyle=${cfg.atonStyle ?? ObcPoiObjectAtonStyle.Regular}
        .atonState=${cfg.atonState ?? null}
        .type=${cfg.type ?? ObcPoiButtonType.Button}
        .data=${cfg.data ?? []}
      >
        ${iconMap[cfg.icon ?? 'north']}
        ${cfg.hasHeader
          ? html`<obc-poi-header
              slot="header"
              .content=${'1'}
              .type=${ObcPoiHeaderType.Id}
              .state=${ObcPoiHeaderState.Selected}
              .size=${ObcPoiHeaderSize.Regular}
              .hasIndicator=${true}
            >
              <obi-placeholder slot="indicator"></obi-placeholder>
            </obc-poi-header>`
          : html``}
      </obc-poi-button-aton>
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

export const AllAtonStyles: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Regular',
            atonStyle: ObcPoiObjectAtonStyle.Regular,
          })}
          ${renderMatrixButton({
            label: 'Green',
            atonStyle: ObcPoiObjectAtonStyle.Green,
          })}
          ${renderMatrixButton({
            label: 'Red',
            atonStyle: ObcPoiObjectAtonStyle.Red,
          })}
          ${renderMatrixButton({
            label: 'Yellow',
            atonStyle: ObcPoiObjectAtonStyle.Yellow,
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

export const AllAtonTypes: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'AtoN (Diamond)',
            atonType: ObcPoiObjectAtonType.AtoN,
            icon: 'north',
          })}
          ${renderMatrixButton({
            label: 'Regular',
            atonType: ObcPoiObjectAtonType.Regular,
            icon: 'south',
          })}
          ${renderMatrixButton({
            label: 'Large',
            atonType: ObcPoiObjectAtonType.Large,
            icon: 'danger',
          })}
          ${renderMatrixButton({
            label: 'Indicator',
            atonType: ObcPoiObjectAtonType.Indicator,
            icon: 'flag',
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Enhanced + AtoN',
            atonType: ObcPoiObjectAtonType.AtoN,
            type: ObcPoiButtonType.Enhanced,
            icon: 'north',
          })}
          ${renderMatrixButton({
            label: 'Enhanced + Regular',
            atonType: ObcPoiObjectAtonType.Regular,
            type: ObcPoiButtonType.Enhanced,
            icon: 'south',
          })}
          ${renderMatrixButton({
            label: 'N-Up',
            atonType: ObcPoiObjectAtonType.NUp,
            icon: 'danger',
          })}
          ${renderMatrixButton({
            label: 'N-Up Large',
            atonType: ObcPoiObjectAtonType.NUpLarge,
            icon: 'flag',
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
            icon: 'north',
          })}
          ${renderMatrixButton({
            label: 'Caution',
            state: ObcPoiButtonState.Caution,
            value: PoiButtonVisualState.Checked,
            icon: 'south',
          })}
          ${renderMatrixButton({
            label: 'Warning',
            state: ObcPoiButtonState.Warning,
            value: PoiButtonVisualState.Checked,
            icon: 'danger',
          })}
          ${renderMatrixButton({
            label: 'Alarm',
            state: ObcPoiButtonState.Alarm,
            value: PoiButtonVisualState.Checked,
            icon: 'flag',
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
            icon: 'north',
          })}
          ${renderMatrixButton({
            label: 'Warning + Selected',
            state: ObcPoiButtonState.Warning,
            value: PoiButtonVisualState.Checked,
            selected: true,
            hasHeader: true,
            icon: 'danger',
          })}
          ${renderMatrixButton({
            label: 'Alarm + Selected',
            state: ObcPoiButtonState.Alarm,
            value: PoiButtonVisualState.Checked,
            selected: true,
            hasHeader: true,
            icon: 'flag',
          })}
        </div>
      </div>
    `),
};

export const AtonStyleByType: Story = {
  render: () =>
    renderOverview(html`
      ${Object.values(ObcPoiObjectAtonType).map(
        (atonType) => html`
          <div style=${sectionStyle}>
            <div style=${gridStyle}>
              ${Object.values(ObcPoiObjectAtonStyle).map(
                (atonStyle) => html`
                  ${renderMatrixButton({
                    label: `${atonType} / ${atonStyle}`,
                    atonType,
                    atonStyle,
                    value: PoiButtonVisualState.Checked,
                  })}
                `
              )}
            </div>
          </div>
        `
      )}
    `),
};

export const AtonStates: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'No State (null)',
            atonState: null,
            value: PoiButtonVisualState.Checked,
          })}
          ${renderMatrixButton({
            label: 'Unchecked',
            atonState: ObcPoiObjectAtonState.Unchecked,
          })}
          ${renderMatrixButton({
            label: 'Checked',
            atonState: ObcPoiObjectAtonState.Checked,
          })}
          ${renderMatrixButton({
            label: 'Activated',
            atonState: ObcPoiObjectAtonState.Activated,
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Static Unchecked',
            atonState: ObcPoiObjectAtonState.StaticUnchecked,
          })}
          ${renderMatrixButton({
            label: 'Static Checked',
            atonState: ObcPoiObjectAtonState.StaticChecked,
          })}
          ${renderMatrixButton({
            label: 'Overlapped',
            atonState: ObcPoiObjectAtonState.Overlapped,
          })}
        </div>
      </div>

      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'Caution',
            atonState: ObcPoiObjectAtonState.Caution,
          })}
          ${renderMatrixButton({
            label: 'Warning',
            atonState: ObcPoiObjectAtonState.Warning,
          })}
          ${renderMatrixButton({
            label: 'Alarm',
            atonState: ObcPoiObjectAtonState.Alarm,
          })}
        </div>
      </div>
    `),
};

export const AtonStateByStyle: Story = {
  render: () =>
    renderOverview(html`
      ${Object.values(ObcPoiObjectAtonStyle).map(
        (atonStyle) => html`
          <div style=${sectionStyle}>
            <div style=${gridStyle}>
              ${[
                ObcPoiObjectAtonState.Checked,
                ObcPoiObjectAtonState.Activated,
                ObcPoiObjectAtonState.Caution,
                ObcPoiObjectAtonState.Warning,
                ObcPoiObjectAtonState.Alarm,
              ].map(
                (atonState) => html`
                  ${renderMatrixButton({
                    label: `${atonStyle} / ${atonState}`,
                    atonStyle,
                    atonState,
                  })}
                `
              )}
            </div>
          </div>
        `
      )}
    `),
};

export const DifferentIcons: Story = {
  render: () =>
    renderOverview(html`
      <div style=${sectionStyle}>
        <div style=${gridStyle}>
          ${renderMatrixButton({
            label: 'North + Green',
            atonStyle: ObcPoiObjectAtonStyle.Green,
            icon: 'north',
          })}
          ${renderMatrixButton({
            label: 'South + Red',
            atonStyle: ObcPoiObjectAtonStyle.Red,
            icon: 'south',
          })}
          ${renderMatrixButton({
            label: 'Danger + Yellow',
            atonStyle: ObcPoiObjectAtonStyle.Yellow,
            icon: 'danger',
          })}
          ${renderMatrixButton({
            label: 'Flag + Regular',
            atonStyle: ObcPoiObjectAtonStyle.Regular,
            icon: 'flag',
          })}
        </div>
      </div>
    `),
};
