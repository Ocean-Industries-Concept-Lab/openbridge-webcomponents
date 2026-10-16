import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTransmitter} from './transmitter.js';
import './transmitter.js';
import {TransmitterOrientation, TransmitterType} from './transmitter.js';
import {TransmitterButtonSize} from '../transmitter-button/transmitter-button.js';
import {crossDecorator} from '../../storybook-util.js';
import '../../icons/icon-temperature-air.js';
import '../../icons/icon-placeholder.js';
import '../horizontal-line/horizontal-line.js';
import {LineMedium, LineType} from '../index.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {argTypesAlertFrame} from '../../components/alert-frame/alert-frame-storybook-helpers.js';

const sineData: [number[], number[]] = [
  Array.from({length: 30}, (_, i) => i),
  Array.from({length: 30}, (_, i) => 2 + Math.sin((i / 30) * 2 * Math.PI)),
];

const meta: Meta<typeof ObcTransmitter> = {
  title: 'Automation/Transmitter/Transmitter',
  tags: ['autodocs', 'experimental'],
  component: 'obc-transmitter',
  decorators: [crossDecorator],
  args: {
    orientation: TransmitterOrientation.bottom,
    type: TransmitterType.value,
    size: TransmitterButtonSize.regular,
    lineType: LineType.fluid,
    value: 12.3,
    unit: 'C',
    fractionDigits: 1,
    maxDigits: 0,
    hintedZeros: false,
    hasSignSpacer: false,
    hasDegree: true,
    hasIcon: true,
    hasAdvice: false,
    adviceValue: 123,
    hasSetPoint: false,
    setpointValue: 123,
    hasAlert: false,
    alertFrameStatus: ObcAlertFrameStatus.Alarm,
    alertFrameType: ObcAlertFrameType.Regular,
    alertFrameThickness: ObcAlertFrameThickness.Small,
    alertFrameMode: ObcAlertFrameMode.ackedActive,
    showAlertCategoryIcon: true,
    showAlertIcon: false,
    tag: 'TT',
    idTag: '#0000',
    data: sineData,
  },
  argTypes: {
    orientation: {
      options: [
        TransmitterOrientation.top,
        TransmitterOrientation.right,
        TransmitterOrientation.bottom,
        TransmitterOrientation.left,
      ],
      control: {type: 'radio'},
    },
    type: {
      options: [
        TransmitterType.indicator,
        TransmitterType.value,
        TransmitterType.horizontalGraph,
        TransmitterType.verticalGraph,
      ],
      control: {type: 'radio'},
    },
    size: {
      options: [
        TransmitterButtonSize.regular,
        TransmitterButtonSize.medium,
        TransmitterButtonSize.large,
      ],
      control: {type: 'radio'},
    },
    lineType: {
      options: [
        LineType.air,
        LineType.connector,
        LineType.electric,
        LineType.fluid,
      ],
      control: {type: 'radio'},
    },
    value: {control: {type: 'range', min: -99, max: 999, step: 0.1}},
    ...argTypesAlertFrame,
  },
} satisfies Meta<ObcTransmitter>;

export default meta;
type Story = StoryObj<ObcTransmitter>;

function renderComponent(args: ObcTransmitter) {
  return html`
    <obc-transmitter
      .orientation=${args.orientation}
      .type=${args.type}
      .lineType=${args.lineType}
      .size=${args.size}
      .value=${args.value}
      .unit=${args.unit}
      .fractionDigits=${args.fractionDigits}
      .maxDigits=${args.maxDigits}
      .hintedZeros=${args.hintedZeros}
      .hasSignSpacer=${args.hasSignSpacer}
      .hasDegree=${args.hasDegree}
      .hasIcon=${args.hasIcon}
      .hasAdvice=${args.hasAdvice}
      .adviceValue=${args.adviceValue}
      .hasSetPoint=${args.hasSetPoint}
      .setpointValue=${args.setpointValue}
      .hasAlert=${args.hasAlert}
      .alertFrameStatus=${args.alertFrameStatus}
      .alertFrameType=${args.alertFrameType}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameMode=${args.alertFrameMode}
      .showAlertCategoryIcon=${args.showAlertCategoryIcon}
      .showAlertIcon=${args.showAlertIcon}
      .tag=${args.tag}
      .idTag=${args.idTag}
      .data=${args.data}
    >
      ${
        args.hasIcon
          ? html`<obi-temperature-air slot="icon"></obi-temperature-air>`
          : ''
      }
      ${
        args.hasAlert
          ? html`
              <obi-placeholder slot="alert-icon"></obi-placeholder>
              <span slot="alert-label">High</span>
              <span slot="alert-timer">00:45</span>
            `
          : ''
      }
    </obc-transmitter>
  `;
}

export const Value: Story = {
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const Left: Story = {
  args: {orientation: TransmitterOrientation.left},
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const Right: Story = {
  args: {orientation: TransmitterOrientation.right},
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const Indicator: Story = {
  args: {type: TransmitterType.indicator},
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const HorizontalGraph: Story = {
  args: {type: TransmitterType.horizontalGraph},
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const VerticalGraph: Story = {
  args: {type: TransmitterType.verticalGraph},
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const WithAdviceAndSetpoint: Story = {
  args: {type: TransmitterType.value, hasAdvice: true, hasSetPoint: true},
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const WithAlert: Story = {
  args: {type: TransmitterType.value, hasAlert: true},
  render: (args) => renderComponent(args as ObcTransmitter),
};

/**
 * Lays transmitters out on a grid of anchor points, one row per entry of
 * `rows` and one column per entry of `columns`, each cell overriding `args`.
 */
function renderAlertGrid(
  args: ObcTransmitter,
  rows: Partial<ObcTransmitter>[],
  columns: Partial<ObcTransmitter>[]
) {
  const cellWidth = 160;
  const cellHeight = 112;
  return html`
    <div
      style="width: ${columns.length * cellWidth}px; height: ${
        rows.length * cellHeight
      }px; transform: translate(-50%, -50%);"
    >
      ${rows.flatMap((row, r) =>
        columns.map(
          (column, c) => html`
            <div
              style="position: absolute; left: ${
                (c + 0.5) * cellWidth
              }px; top: ${r * cellHeight + 24}px;"
            >
              ${renderComponent({...args, ...row, ...column} as ObcTransmitter)}
            </div>
          `
        )
      )}
    </div>
  `;
}

/**
 * Every flap type (rows) in the three statuses (columns), with the flap
 * slots filled.
 */
export const AlertFrameTypes: Story = {
  args: {hasAlert: true, showAlertIcon: true},
  render: (args) =>
    renderAlertGrid(
      args as ObcTransmitter,
      Object.values(ObcAlertFrameType).map((alertFrameType) => ({
        alertFrameType,
      })),
      [
        ObcAlertFrameStatus.Alarm,
        ObcAlertFrameStatus.Warning,
        ObcAlertFrameStatus.Caution,
      ].map((alertFrameStatus) => ({alertFrameStatus}))
    ),
};

/**
 * The acknowledgement modes (columns) at both thicknesses (rows); flashing
 * frames snapshot in their on phase.
 */
export const AlertFrameModes: Story = {
  args: {hasAlert: true, alertFrameType: ObcAlertFrameType.SmallSideFlip},
  render: (args) =>
    renderAlertGrid(
      args as ObcTransmitter,
      Object.values(ObcAlertFrameThickness).map((alertFrameThickness) => ({
        alertFrameThickness,
      })),
      Object.values(ObcAlertFrameMode).map((alertFrameMode) => ({
        alertFrameMode,
      }))
    ),
};

export const ZeroPadded: Story = {
  args: {
    type: TransmitterType.value,
    value: 12.3,
    fractionDigits: 1,
    maxDigits: 4,
    hintedZeros: true,
  },
  render: (args) => renderComponent(args as ObcTransmitter),
};

export const UsageWithPipe: Story = {
  args: {orientation: TransmitterOrientation.bottom},
  render: (args) => html`
    <style>
      .canvas {
        position: relative;
        width: 400px;
        height: 400px;
      }

      #line-bottom {
        position: absolute;
        top: 0;
        left: calc(-2.5 * 24px);
      }
    </style>
    <div class="canvas">
      ${renderComponent(args as ObcTransmitter)}
      <obc-horizontal-line
        .medium=${LineMedium.water}
        .lineType=${args.lineType || LineType.fluid}
        length="5"
        id="line-bottom"
      ></obc-horizontal-line>
    </div>
  `,
};
