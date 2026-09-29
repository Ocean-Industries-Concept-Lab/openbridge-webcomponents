import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcTransmitterStack,
  type TransmitterStackValue,
} from './transmitter-stack.js';
import './transmitter-stack.js';
import {TransmitterOrientation} from '../transmitter/transmitter.js';
import {crossDecorator} from '../../storybook-util.js';
import '../../icons/icon-temperature-air.js';
import '../../icons/icon-pressure.js';
import '../../icons/icon-placeholder.js';
import '../horizontal-line/horizontal-line.js';
import {LineMedium, LineType} from '../index.js';

const designValues: TransmitterStackValue[] = [
  {
    value: 12.3,
    unit: 'C',
    hasDegree: true,
    idTag: '#0000',
    iconSlotName: 'temperature',
  },
  {value: 12.3, unit: 'mVs', idTag: '#0000', iconSlotName: 'pressure'},
  {value: 12.3, unit: 'm', idTag: '#0000', iconSlotName: 'level'},
];

const meta: Meta<typeof ObcTransmitterStack> = {
  title: 'Automation/Transmitter/Transmitter Stack',
  tags: ['autodocs', 'experimental'],
  component: 'obc-transmitter-stack',
  decorators: [crossDecorator],
  args: {
    orientation: TransmitterOrientation.bottom,
    lineType: LineType.fluid,
    values: designValues,
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
    lineType: {
      options: [
        LineType.air,
        LineType.connector,
        LineType.electric,
        LineType.fluid,
      ],
      control: {type: 'radio'},
    },
  },
} satisfies Meta<ObcTransmitterStack>;

export default meta;
type Story = StoryObj<ObcTransmitterStack>;

function renderComponent(args: ObcTransmitterStack) {
  return html`
    <obc-transmitter-stack
      .orientation=${args.orientation}
      .lineType=${args.lineType}
      .values=${args.values}
    >
      <obi-temperature-air slot="temperature"></obi-temperature-air>
      <obi-pressure slot="pressure"></obi-pressure>
      <obi-placeholder slot="level"></obi-placeholder>
    </obc-transmitter-stack>
  `;
}

export const Bottom: Story = {
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const Top: Story = {
  args: {orientation: TransmitterOrientation.top},
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const Left: Story = {
  args: {orientation: TransmitterOrientation.left},
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const Right: Story = {
  args: {orientation: TransmitterOrientation.right},
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const WithoutIdTags: Story = {
  args: {
    values: designValues.map((entry) => ({...entry, idTag: undefined})),
  },
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const MixedIdTags: Story = {
  args: {
    values: designValues.map((entry, index) => ({
      ...entry,
      idTag: index === 0 ? '#0000' : undefined,
    })),
  },
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const MissingValues: Story = {
  args: {
    values: [
      {...designValues[0], value: null, maxDigits: 3, hintedZeros: true},
      {...designValues[1], value: NaN},
      designValues[2],
    ],
  },
  render: (args) => renderComponent(args as ObcTransmitterStack),
};

export const UsageWithPipe: Story = {
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
      ${renderComponent(args as ObcTransmitterStack)}
      <obc-horizontal-line
        .medium=${LineMedium.water}
        .lineType=${args.lineType || LineType.fluid}
        length="5"
        id="line-bottom"
      ></obc-horizontal-line>
    </div>
  `,
};
