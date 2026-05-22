import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import '../../icons/icon-input-right.js';
import {
  ReadoutInputMode,
  ReadoutInputFormat,
  ReadoutInputSize,
} from './readout-input.js';
import './readout-input.js';
import {Priority} from '../types.js';

type ReadoutInputStoryArgs = {
  size: ReadoutInputSize;
  format?: ReadoutInputFormat;
  mode: ReadoutInputMode;
  priority?: Priority;
  hugText: boolean;
  iconId?: string;
  hasFixedLength: boolean;
  value: string;
  secondaryValue: string;
  description: string;
  valueLength: string;
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
  title: 'Instruments/Readout Input',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout-input',
  decorators: [centeredCanvasDecorator],
  render: (args) => {
    return html`
      <obc-readout-input
        .size=${args.size}
        .format=${args.format}
        .mode=${args.mode}
        .priority=${args.priority}
        .hugContent=${args.hugText}
        .hasFixedLength=${args.hasFixedLength}
        .value=${args.value}
        .secondaryValue=${args.secondaryValue}
        .description=${args.description}
        .valueLength=${args.valueLength}
        .hasHintedZeros=${args.hasHintedZeros}
        .hasDegree=${args.hasDegree}
      >
        ${args.iconId
          ? iconIdToIconHtml(args.iconId, {slot: 'icon'})
          : html`<obi-input-right slot="icon"></obi-input-right>`}
      </obc-readout-input>
    `;
  },
  args: {
    size: ReadoutInputSize.small,
    format: undefined,
    mode: ReadoutInputMode.display,
    priority: undefined,
    hugText: true,
    iconId: undefined,
    hasFixedLength: true,
    value: '123',
    secondaryValue: '123',
    description: 'SET',
    valueLength: '123',
    hasHintedZeros: false,
    hasDegree: false,
  },
  argTypes: {
    size: {
      name: 'Size',
      control: {
        type: 'select',
        labels: {
          [ReadoutInputSize.small]: 'Small',
          [ReadoutInputSize.regular]: 'Regular',
          [ReadoutInputSize.medium]: 'Medium',
          [ReadoutInputSize.large]: 'Large',
        },
      },
      options: Object.values(ReadoutInputSize),
    },
    format: {
      name: 'Format',
      control: {type: 'select'},
      options: [undefined, ...Object.values(ReadoutInputFormat)],
      description: 'Structural subtype axis.',
    },
    mode: {
      name: 'Mode',
      control: {type: 'select'},
      options: Object.values(ReadoutInputMode),
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
      control: 'text',
      table: {category: 'Input Value'},
    },
    secondaryValue: {
      name: 'Secondary Value',
      control: 'text',
      if: {arg: 'format', eq: ReadoutInputFormat.range},
      table: {category: 'Input Value'},
    },
    description: {
      name: 'Description / Stack Label',
      control: 'text',
      if: {
        arg: 'format',
        in: [ReadoutInputFormat.description, ReadoutInputFormat.verticalStack],
      },
      table: {category: 'Input Value'},
    },
    valueLength: {
      name: 'Value Length',
      control: 'text',
      if: {arg: 'hasFixedLength', truthy: true},
      table: {category: 'Input Value'},
    },
    hasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'hasFixedLength', truthy: true},
      table: {category: 'Input Value'},
    },
    hasDegree: {
      name: 'Has Degree',
      table: {category: 'Input Value'},
      description: 'Renders a ° suffix when enabled.',
    },
  },
} satisfies Meta<ReadoutInputStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutInputStoryArgs>;

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
        <obc-readout-input
          .size=${ReadoutInputSize.regular}
          .format=${ReadoutInputFormat.regular}
          .mode=${ReadoutInputMode.display}
          .priority=${Priority.enhanced}
          .hugContent=${true}
          value="123"
          title="hugContent=true"
        >
          <obi-input-right slot="icon"></obi-input-right>
        </obc-readout-input>
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
        <obc-readout-input
          .size=${ReadoutInputSize.regular}
          .format=${ReadoutInputFormat.regular}
          .mode=${ReadoutInputMode.display}
          .priority=${Priority.enhanced}
          .hugContent=${false}
          value="123"
          title="hugContent=false"
        >
          <obi-input-right slot="icon"></obi-input-right>
        </obc-readout-input>
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
        ReadoutInputSize.small,
        ReadoutInputSize.regular,
        ReadoutInputSize.medium,
        ReadoutInputSize.large,
      ].map(
        (size) => html`
          <obc-readout-input
            .size=${size}
            .mode=${ReadoutInputMode.display}
            .priority=${Priority.enhanced}
            .hugContent=${true}
            .hasFixedLength=${true}
            value="12"
            valueLength="00000"
            .hasHintedZeros=${true}
            title=${`Size=${size}`}
          >
            <obi-input-right slot="icon"></obi-input-right>
          </obc-readout-input>
        `
      )}
    </div>
  `,
};

type Variant = {
  size: ReadoutInputSize;
  mode: ReadoutInputMode;
  priority?: Priority;
  hugContent: boolean;
  hasDegree: boolean;
};

const sizes: ReadoutInputSize[] = [
  ReadoutInputSize.small,
  ReadoutInputSize.regular,
  ReadoutInputSize.medium,
  ReadoutInputSize.large,
];

const variantRows: Variant[][] = [
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.display,
    priority: undefined,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.display,
    priority: Priority.enhanced,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.input,
    priority: undefined,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.inputTemporary,
    priority: undefined,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.display,
    priority: undefined,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.display,
    priority: Priority.enhanced,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.input,
    priority: undefined,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    mode: ReadoutInputMode.inputTemporary,
    priority: undefined,
    hugContent: false,
    hasDegree: false,
  })),
];

const usesFixedLength = (size: ReadoutInputSize): boolean =>
  size === ReadoutInputSize.small || size === ReadoutInputSize.large;

const renderVariant = (variant: Variant) => html`
  <obc-readout-input
    .size=${variant.size}
    .format=${ReadoutInputFormat.regular}
    .mode=${variant.mode}
    .priority=${variant.priority}
    .hugContent=${variant.hugContent}
    .hasFixedLength=${usesFixedLength(variant.size)}
    .value=${'123'}
    .valueLength=${'123'}
    .hasHintedZeros=${false}
    .hasDegree=${variant.hasDegree}
    title=${`Size=${variant.size}, Mode=${variant.mode}, Priority=${variant.priority}, Hug content=${variant.hugContent}, Degree=${variant.hasDegree}`}
  >
    <obi-input-right slot="icon"></obi-input-right>
  </obc-readout-input>
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
