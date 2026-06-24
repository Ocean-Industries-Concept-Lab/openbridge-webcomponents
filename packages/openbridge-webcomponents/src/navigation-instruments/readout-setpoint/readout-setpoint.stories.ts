import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import '../../icons/icon-input-right.js';
import {
  ReadoutSetpointMode,
  ReadoutSetpointFormat,
  ReadoutSetpointSize,
} from './readout-setpoint.js';
import './readout-setpoint.js';
import {Priority} from '../types.js';

type ReadoutSetpointStoryArgs = {
  size: ReadoutSetpointSize;
  format?: ReadoutSetpointFormat;
  mode: ReadoutSetpointMode;
  priority?: Priority;
  hugText: boolean;
  iconId?: string;
  value: number;
  secondaryValue: number;
  description: string;
  minValueLength: number;
  hasHintedZeros: boolean;
  hasDegree: boolean;
};

const centeredCanvasDecorator = (story: () => unknown) => {
  return html`
    <div
      style="
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      "
    >
      <div class="obc-component-size-regular">${story()}</div>
    </div>
  `;
};

const meta = {
  title: 'Instruments/Readout Setpoint',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout-setpoint',
  decorators: [centeredCanvasDecorator],
  render: (args) => {
    return html`
      <obc-readout-setpoint
        .size=${args.size}
        .format=${args.format}
        .mode=${args.mode}
        .priority=${args.priority}
        .hugContent=${args.hugText}
        .value=${args.value}
        .secondaryValue=${args.secondaryValue}
        .description=${args.description}
        .minValueLength=${args.minValueLength}
        .hasHintedZeros=${args.hasHintedZeros}
        .hasDegree=${args.hasDegree}
      >
        ${args.iconId
          ? iconIdToIconHtml(args.iconId, {slot: 'icon'})
          : html`<obi-input-right slot="icon"></obi-input-right>`}
      </obc-readout-setpoint>
    `;
  },
  args: {
    size: ReadoutSetpointSize.small,
    format: undefined,
    mode: ReadoutSetpointMode.display,
    priority: undefined,
    hugText: true,
    iconId: undefined,
    value: 123,
    secondaryValue: 123,
    description: 'SET',
    minValueLength: 3,
    hasHintedZeros: false,
    hasDegree: false,
  },
  argTypes: {
    size: {
      name: 'Size',
      control: {
        type: 'select',
        labels: {
          [ReadoutSetpointSize.small]: 'Small',
          [ReadoutSetpointSize.regular]: 'Regular',
          [ReadoutSetpointSize.medium]: 'Medium',
          [ReadoutSetpointSize.large]: 'Large',
        },
      },
      options: Object.values(ReadoutSetpointSize),
    },
    format: {
      name: 'Format',
      control: {type: 'select'},
      options: [undefined, ...Object.values(ReadoutSetpointFormat)],
      description: 'Structural subtype axis.',
    },
    mode: {
      name: 'Mode',
      control: {type: 'select'},
      options: Object.values(ReadoutSetpointMode),
      description: 'Interaction axis.',
    },
    priority: {
      name: 'Priority',
      control: {type: 'select'},
      options: [undefined, ...Object.values(Priority)],
      description: 'Emphasis/color axis.',
    },
    hugText: {
      name: 'Hug Text',
    },
    iconId: {
      name: 'Icon',
      control: {
        type: 'select',
        labels: {
          undefined: 'Default Arrow',
        },
      },
      options: [undefined, ...iconIds],
    },
    variant: {table: {disable: true}, control: false},
    direction: {table: {disable: true}, control: false},
    readoutStyle: {table: {disable: true}, control: false},
    hugContent: {table: {disable: true}, control: false},
    value: {
      name: 'Value',
      control: {type: 'number'},
      table: {category: 'Setpoint Value'},
    },
    secondaryValue: {
      name: 'Secondary Value',
      control: {type: 'number'},
      if: {arg: 'format', eq: ReadoutSetpointFormat.range},
      table: {category: 'Setpoint Value'},
    },
    description: {
      name: 'Description / Stack Label',
      control: 'text',
      if: {
        arg: 'format',
        in: [
          ReadoutSetpointFormat.description,
          ReadoutSetpointFormat.verticalStack,
        ],
      },
      table: {category: 'Setpoint Value'},
    },
    minValueLength: {
      name: 'Min Value Length',
      control: {type: 'number', min: 0, step: 1},
      table: {category: 'Setpoint Value'},
    },
    hasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'minValueLength', gt: 1},
      table: {category: 'Setpoint Value'},
    },
    hasDegree: {
      name: 'Has Degree',
      table: {category: 'Setpoint Value'},
      description: 'Renders a ° suffix when enabled.',
    },
  },
} satisfies Meta<ReadoutSetpointStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutSetpointStoryArgs>;

export const Primary: Story = {};

export const SegmentHugVsFullWidth: Story = {
  name: 'Layout / Segment Hug Vs Full Width',
  render: () => html`
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 360px;
        max-width: 100%;
        padding: 16px;
        border: 1px dashed rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(0, 0, 0, 0.04);
          padding: 12px;
          border-radius: 6px;
        "
      >
        <div
          style="
            font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--element-neutral-color, #777);
          "
        >
          hugContent = true (fit-content)
        </div>
        <obc-readout-setpoint
          .size=${ReadoutSetpointSize.regular}
          .format=${ReadoutSetpointFormat.regular}
          .mode=${ReadoutSetpointMode.display}
          .priority=${Priority.enhanced}
          .hugContent=${true}
          .value=${123}
          title="hugContent=true"
        >
          <obi-input-right slot="icon"></obi-input-right>
        </obc-readout-setpoint>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(0, 0, 0, 0.04);
          padding: 12px;
          border-radius: 6px;
        "
      >
        <div
          style="
            font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--element-neutral-color, #777);
          "
        >
          hugContent = false (width: 100%)
        </div>
        <obc-readout-setpoint
          .size=${ReadoutSetpointSize.regular}
          .format=${ReadoutSetpointFormat.regular}
          .mode=${ReadoutSetpointMode.display}
          .priority=${Priority.enhanced}
          .hugContent=${false}
          .value=${123}
          title="hugContent=false"
        >
          <obi-input-right slot="icon"></obi-input-right>
        </obc-readout-setpoint>
      </div>
    </div>
  `,
};

export const HintedZerosBySize: Story = {
  render: () => html`
    <div
      style="
        display: flex;
        align-items: end;
        gap: 32px;
      "
    >
      ${[
        ReadoutSetpointSize.small,
        ReadoutSetpointSize.regular,
        ReadoutSetpointSize.medium,
        ReadoutSetpointSize.large,
      ].map(
        (size) => html`
          <obc-readout-setpoint
            .size=${size}
            .mode=${ReadoutSetpointMode.display}
            .priority=${Priority.enhanced}
            .hugContent=${true}
            .value=${12}
            .minValueLength=${5}
            .hasHintedZeros=${true}
            title=${`Size=${size}`}
          >
            <obi-input-right slot="icon"></obi-input-right>
          </obc-readout-setpoint>
        `
      )}
    </div>
  `,
};

type Variant = {
  size: ReadoutSetpointSize;
  mode: ReadoutSetpointMode;
  priority?: Priority;
  hugContent: boolean;
  hasDegree: boolean;
};

const sizes: ReadoutSetpointSize[] = [
  ReadoutSetpointSize.small,
  ReadoutSetpointSize.regular,
  ReadoutSetpointSize.medium,
  ReadoutSetpointSize.large,
];

const variantRows: Variant[][] = [
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.display,
    priority: undefined,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.display,
    priority: Priority.enhanced,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.setpoint,
    priority: undefined,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.setpointTemporary,
    priority: undefined,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.display,
    priority: undefined,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.display,
    priority: Priority.enhanced,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.setpoint,
    priority: undefined,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutSetpointMode.setpointTemporary,
    priority: undefined,
    hugContent: false,
    hasDegree: false,
  })),
];

const usesFixedLength = (size: ReadoutSetpointSize): boolean =>
  size === ReadoutSetpointSize.small || size === ReadoutSetpointSize.large;

const renderVariant = (variant: Variant) => html`
  <obc-readout-setpoint
    .size=${variant.size}
    .format=${ReadoutSetpointFormat.regular}
    .mode=${variant.mode}
    .priority=${variant.priority}
    .hugContent=${variant.hugContent}
    .value=${123}
    .minValueLength=${usesFixedLength(variant.size) ? 3 : 0}
    .hasHintedZeros=${false}
    .hasDegree=${variant.hasDegree}
    title=${`Size=${variant.size}, Mode=${variant.mode}, Priority=${variant.priority}, Hug content=${variant.hugContent}, Degree=${variant.hasDegree}`}
  >
    <obi-input-right slot="icon"></obi-input-right>
  </obc-readout-setpoint>
`;

export const AllCombinations: Story = {
  render: () => {
    const hugContentRows = variantRows.filter((row) => row[0]?.hugContent);
    const noHugContentRows = variantRows.filter((row) => !row[0]?.hugContent);

    const renderRows = (rows: Variant[][]) =>
      rows.map(
        (row) => html`
          <div
            style="
              display: grid;
              grid-template-columns: repeat(4, minmax(120px, auto));
              align-items: center;
              gap: 28px;
              min-height: 56px;
            "
          >
            ${row.map(renderVariant)}
          </div>
        `
      );

    return html`
      <div
        style="
          display: flex;
          flex-direction: column;
          gap: 20px;
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 20px;
          "
        >
          <div style="font-weight: 600;">Hug Content: true</div>
          ${renderRows(hugContentRows)}
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 36px;
          "
        >
          <div style="font-weight: 600;">Hug Content: false</div>
          ${renderRows(noHugContentRows)}
        </div>
      </div>
    `;
  },
};
