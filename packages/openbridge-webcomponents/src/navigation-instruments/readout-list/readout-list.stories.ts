import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {expect} from 'storybook/test';
import './readout-list.js';
import {
  ReadoutListItemSize,
  ReadoutListItemPriority,
  ReadoutListItemDataQuality,
  type ReadoutValueOptions,
} from '../readout-list-item/readout-list-item.js';
import '../readout-list-item/readout-list-item.js';
import type {AlertFrameConfig} from '../../components/alert-frame/alert-frame.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

type ListArgs = {
  showDebugOverlay: boolean;
};

type Row = {
  label: string;
  value: number | null;
  unit: string;
  size?: ReadoutListItemSize;
  hasDegree?: boolean;
  fractionDigits?: number;
  priority?: ReadoutListItemPriority;
  hasSetpoint?: boolean;
  setpoint?: number;
  hasAdvice?: boolean;
  advice?: number;
  off?: boolean;
  // Row-level and per-block state, so the list stories can smoke-test data
  // quality + alert frames alongside the auto-alignment.
  dataQuality?: ReadoutListItemDataQuality;
  alert?: AlertFrameConfig;
  valueDataQuality?: ReadoutListItemDataQuality;
  valueAlert?: AlertFrameConfig;
  setpointDataQuality?: ReadoutListItemDataQuality;
};

function renderRow(row: Row) {
  const valueOptions =
    row.valueDataQuality || row.valueAlert
      ? {dataQuality: row.valueDataQuality, alert: row.valueAlert}
      : undefined;
  const setpointOptions = row.setpointDataQuality
    ? {dataQuality: row.setpointDataQuality}
    : undefined;
  return html`
    <obc-readout-list-item
      .label=${row.label}
      .unit=${row.unit}
      .value=${row.value}
      .size=${row.size ?? ReadoutListItemSize.small}
      .hasDegree=${row.hasDegree ?? false}
      .fractionDigits=${row.fractionDigits ?? 0}
      .priority=${row.priority}
      .off=${row.off ?? false}
      .hasSetpoint=${row.hasSetpoint ?? false}
      .setpoint=${row.setpoint}
      .hasAdvice=${row.hasAdvice ?? false}
      .advice=${row.advice}
      .dataQuality=${row.dataQuality}
      .alert=${row.alert ?? false}
      .valueOptions=${valueOptions}
      .setpointOptions=${setpointOptions}
    ></obc-readout-list-item>
  `;
}

function renderList(rows: Row[], showDebugOverlay: boolean) {
  return html`
    <div
      data-obc-theme="day"
      style="background: var(--container-background-color); padding: 16px; width: 360px; box-sizing: border-box;"
    >
      <obc-readout-list .showDebugOverlay=${showDebugOverlay}>
        ${rows.map(renderRow)}
      </obc-readout-list>
    </div>
  `;
}

const meta = {
  title: 'Instruments/Readout List',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-readout-list',
  args: {
    showDebugOverlay: true,
  },
  argTypes: {
    showDebugOverlay: {control: {type: 'boolean'}},
  },
} satisfies Meta<ListArgs>;

export default meta;
type Story = StoryObj<ListArgs>;

const MIXED_ROWS: Row[] = [
  {label: 'Temperature', value: 45, unit: 'C', hasDegree: true},
  {label: 'Heading', value: 287, unit: 'T', hasDegree: true},
  {label: 'Pressure', value: 1013, unit: 'Pa', fractionDigits: 1},
  {label: 'Distance', value: 4.2, unit: 'miles', fractionDigits: 1},
  {label: 'Speed', value: 18, unit: 'kn', fractionDigits: 1},
];

export const Default: Story = {
  render: (args) => renderList(MIXED_ROWS, args.showDebugOverlay),
};

const DEGREE_ROWS: Row[] = [
  {label: 'Heading', value: 287, unit: 'T', hasDegree: true},
  {label: 'COG', value: 92, unit: 'T', hasDegree: true},
  {label: 'Speed', value: 18, unit: 'kn'},
  {label: 'Depth', value: 124, unit: 'm'},
];

export const Degrees: Story = {
  render: (args) => renderList(DEGREE_ROWS, args.showDebugOverlay),
};

const WARNING_FRAME: AlertFrameConfig = {
  status: AlertType.Warning,
  mode: ObcAlertFrameMode.ackedActive,
  type: ObcAlertFrameType.Regular,
};
const ALARM_FRAME_ICON: AlertFrameConfig = {
  status: AlertType.Alarm,
  mode: ObcAlertFrameMode.ackedActive,
  type: ObcAlertFrameType.SmallSideFlip,
  showAlertCategoryIcon: true,
};

export const WithSetpoints: Story = {
  render: (args) =>
    renderList(
      [
        {
          label: 'Heading',
          value: 287,
          unit: 'T',
          hasDegree: true,
          hasSetpoint: true,
          setpoint: 290,
        },
        // invalid setpoint chip — auto-aligned alongside the others
        {
          label: 'Speed',
          value: 8,
          unit: 'kn',
          fractionDigits: 1,
          hasSetpoint: true,
          setpoint: 12,
          setpointDataQuality: ReadoutListItemDataQuality.invalid,
        },
        // advice reference
        {label: 'Depth', value: 1013, unit: 'm', hasAdvice: true, advice: 1010},
        // per-value alert frame — wraps value + unit
        {label: 'Fuel', value: 42, unit: '%', valueAlert: WARNING_FRAME},
        // whole row invalid + null value (dash)
        {
          label: 'Wind',
          value: null,
          unit: 'kn',
          dataQuality: ReadoutListItemDataQuality.invalid,
        },
        // whole row low-integrity + row-level alert frame with a badge-icon flap
        {
          label: 'Course',
          value: 120,
          unit: 'T',
          hasDegree: true,
          dataQuality: ReadoutListItemDataQuality.lowIntegrity,
          alert: ALARM_FRAME_ICON,
        },
      ],
      args.showDebugOverlay
    ),
};

export const TestDynamicRow: Story = {
  render: (args) => renderList(MIXED_ROWS, args.showDebugOverlay),
  play: async ({canvasElement}) => {
    const list = canvasElement.querySelector('obc-readout-list');
    const row = document.createElement(
      'obc-readout-list-item'
    ) as HTMLElement & {
      label: string;
      value: number;
      unit: string;
      valueOptions?: ReadoutValueOptions;
    };
    row.label = 'Added';
    row.value = 9;
    row.unit = 'kn';
    list?.appendChild(row);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await expect(row.valueOptions?.spaceReserver).toBe('0000.0');
  },
};

// Richer starting set for the interactive demo: a plain degree row, an invalid
// setpoint, an advice reference, a per-value alert frame, a null/invalid row and
// a low-integrity row with a row-level alert frame — so the manual add/remove /
// re-align flow is exercised against the full range of state.
const MANUAL_ROWS: Row[] = [
  {label: 'Heading', value: 287, unit: 'T', hasDegree: true},
  {
    label: 'Speed',
    value: 8,
    unit: 'kn',
    fractionDigits: 1,
    hasSetpoint: true,
    setpoint: 12,
    setpointDataQuality: ReadoutListItemDataQuality.invalid,
  },
  {label: 'Depth', value: 1013, unit: 'm', hasAdvice: true, advice: 1010},
  {label: 'Fuel', value: 42, unit: '%', valueAlert: WARNING_FRAME},
  {
    label: 'Wind',
    value: null,
    unit: 'kn',
    dataQuality: ReadoutListItemDataQuality.invalid,
  },
  {
    label: 'Course',
    value: 120,
    unit: 'T',
    hasDegree: true,
    dataQuality: ReadoutListItemDataQuality.lowIntegrity,
    alert: ALARM_FRAME_ICON,
  },
];

/**
 * **Manual (Interactive)** — the rows are slotted children, so they cannot be
 * driven by Storybook controls. Use the buttons to add / remove rows (a
 * structural change the list re-aligns automatically) and to change the first
 * row's value / unit (a property-only change, so it calls the public
 * {@link ObcReadoutList.align} method). The debug overlay shows the reserved
 * column widths reacting to each change. The starting rows include data-quality
 * and alert-frame variations for a quick visual smoke test.
 */
export const Manual: Story = {
  name: 'Manual (Interactive)',
  tags: ['skip-test'],
  render: (args) => html`
    <div
      data-obc-theme="day"
      style="background: var(--container-background-color); padding: 16px; width: 380px; box-sizing: border-box; display: flex; flex-direction: column; gap: 16px;"
    >
      <div style="font-size: 14px; color: var(--element-neutral-color, #888);">
        Rows are slotted children, so Storybook controls can't drive them. Use
        the buttons to add / remove rows (the list re-aligns automatically) and
        to change the first row's value / unit (a property-only change, so it
        calls
        <code>align()</code>). The debug overlay shows the reserved column
        widths.
      </div>
      <obc-readout-list
        id="manual-list"
        .showDebugOverlay=${args.showDebugOverlay}
      >
        ${MANUAL_ROWS.map(renderRow)}
      </obc-readout-list>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="m-add" style="padding: 6px 12px; cursor: pointer;">
          Add row
        </button>
        <button id="m-remove" style="padding: 6px 12px; cursor: pointer;">
          Remove row
        </button>
        <button id="m-bump" style="padding: 6px 12px; cursor: pointer;">
          Bump first value ×10
        </button>
        <button id="m-unit" style="padding: 6px 12px; cursor: pointer;">
          Toggle first unit
        </button>
      </div>
      <div
        id="m-status"
        style="font: 12px/1.4 monospace; color: var(--element-neutral-color, #666);"
      >
        ${MANUAL_ROWS.length} rows
      </div>
    </div>
  `,
  play: async ({canvasElement}) => {
    const list = canvasElement.querySelector('#manual-list') as
      | (HTMLElement & {align: () => void})
      | null;
    const status = canvasElement.querySelector(
      '#m-status'
    ) as HTMLElement | null;
    const addBtn = canvasElement.querySelector(
      '#m-add'
    ) as HTMLButtonElement | null;
    const removeBtn = canvasElement.querySelector(
      '#m-remove'
    ) as HTMLButtonElement | null;
    const bumpBtn = canvasElement.querySelector(
      '#m-bump'
    ) as HTMLButtonElement | null;
    const unitBtn = canvasElement.querySelector(
      '#m-unit'
    ) as HTMLButtonElement | null;
    if (!list || !status || !addBtn || !removeBtn || !bumpBtn || !unitBtn) {
      return;
    }

    const UNITS = ['kn', 'm', 'C', 'miles'];
    let added = 0;
    const rows = () =>
      Array.from(
        list.querySelectorAll('obc-readout-list-item')
      ) as (HTMLElement & {
        value: number | null;
        unit: string;
      })[];
    const refresh = () => {
      status.textContent = `${rows().length} rows`;
    };

    addBtn.onclick = () => {
      added += 1;
      const row = document.createElement(
        'obc-readout-list-item'
      ) as HTMLElement & {label: string; value: number; unit: string};
      row.label = `Row ${added}`;
      row.value = added * 7;
      row.unit = UNITS[added % UNITS.length];
      list.appendChild(row);
      refresh();
    };
    removeBtn.onclick = () => {
      const all = rows();
      all[all.length - 1]?.remove();
      refresh();
    };
    bumpBtn.onclick = () => {
      const first = rows()[0];
      if (!first) return;
      first.value = Math.round((first.value ?? 1) * 10);
      list.align();
    };
    unitBtn.onclick = () => {
      const first = rows()[0];
      if (!first) return;
      first.unit = first.unit === 'miles' ? 'T' : 'miles';
      list.align();
    };
  },
};
