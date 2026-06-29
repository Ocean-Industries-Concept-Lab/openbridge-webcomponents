import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTransmitter} from './transmitter.js';
import './transmitter.js';
import {TransmitterOrientation, TransmitterType} from './transmitter.js';
import {TransmitterButtonSize} from '../transmitter-button/transmitter-button.js';
import {crossDecorator} from '../../storybook-util.js';
import '../../icons/icon-temperature-air.js';

const sineData: [number[], number[]] = [
  Array.from({length: 30}, (_, i) => i),
  Array.from({length: 30}, (_, i) => 2 + Math.sin((i / 30) * 2 * Math.PI)),
];

const meta: Meta<typeof ObcTransmitter> = {
  title: 'Automation/Transmitter/Transmitter',
  tags: ['autodocs'],
  component: 'obc-transmitter',
  decorators: [crossDecorator],
  args: {
    orientation: TransmitterOrientation.bottom,
    type: TransmitterType.value,
    size: TransmitterButtonSize.regular,
    value: 12.3,
    unit: '°C',
    fractionDigits: 1,
    hasIcon: true,
    hasAdvice: false,
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
        TransmitterButtonSize.small,
        TransmitterButtonSize.regular,
        TransmitterButtonSize.medium,
        TransmitterButtonSize.large,
      ],
      control: {type: 'radio'},
    },
    value: {control: {type: 'range', min: -99, max: 999, step: 0.1}},
  },
} satisfies Meta<ObcTransmitter>;

export default meta;
type Story = StoryObj<ObcTransmitter>;

function renderComponent(args: ObcTransmitter) {
  return html`
    <obc-transmitter
      .orientation=${args.orientation}
      .type=${args.type}
      .size=${args.size}
      .value=${args.value}
      .unit=${args.unit}
      .fractionDigits=${args.fractionDigits}
      .hasIcon=${args.hasIcon}
      .hasAdvice=${args.hasAdvice}
      .tag=${args.tag}
      .idTag=${args.idTag}
      .data=${args.data}
    >
      ${args.hasIcon
        ? html`<obi-temperature-air slot="icon"></obi-temperature-air>`
        : ''}
    </obc-transmitter>
  `;
}

export const Value: Story = {
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
