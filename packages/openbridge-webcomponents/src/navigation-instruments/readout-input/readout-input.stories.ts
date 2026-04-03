import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import '../../icons/icon-input-right.js';
import {
  ReadoutInputSize,
  ReadoutInputState,
  ReadoutInputType,
} from './readout-input.js';
import './readout-input.js';

type ReadoutInputStoryArgs = {
  size: ReadoutInputSize;
  type?: ReadoutInputType;
  state: ReadoutInputState;
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
      ${story()}
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
        .type=${args.type}
        .size=${args.size}
        .state=${args.state}
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
    type: undefined,
    state: ReadoutInputState.enabled,
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
    type: {
      name: 'Type',
      control: {
        type: 'select',
        labels: {
          undefined: 'Not selected',
          [ReadoutInputType.regular]: 'Regular',
          [ReadoutInputType.enhanced]: 'Enhanced',
          [ReadoutInputType.description]: 'Description',
          [ReadoutInputType.range]: 'Range',
          [ReadoutInputType.verticalStack]: 'Vertical-stack',
          [ReadoutInputType.baseline]: 'Baseline',
          [ReadoutInputType.button]: 'Button',
        },
      },
      options: [undefined, ...Object.values(ReadoutInputType)],
    },
    state: {
      name: 'State',
      control: {
        type: 'select',
        labels: {
          [ReadoutInputState.enabled]: 'Enabled',
          [ReadoutInputState.enhanced]: 'Enhanced',
          [ReadoutInputState.input]: 'Input',
          [ReadoutInputState.inputTemporary]: 'Input Temporary',
        },
      },
      options: [
        ReadoutInputState.enabled,
        ReadoutInputState.enhanced,
        ReadoutInputState.input,
        ReadoutInputState.inputTemporary,
      ],
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
    value: {
      name: 'Value',
      control: 'text',
      table: {category: 'Input Value'},
    },
    secondaryValue: {
      name: 'Secondary Value',
      control: 'text',
      if: {arg: 'type', eq: ReadoutInputType.range},
      table: {category: 'Input Value'},
    },
    description: {
      name: 'Description',
      control: 'text',
      if: {arg: 'type', eq: ReadoutInputType.description},
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
      if: {arg: 'size', eq: ReadoutInputSize.medium},
      table: {category: 'Input Value'},
      description:
        'Available only for Medium active input states when Has Fixed Length is false.',
    },
  },
} satisfies Meta<ReadoutInputStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutInputStoryArgs>;

export const Primary: Story = {};

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
            .state=${ReadoutInputState.enhanced}
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
  state: ReadoutInputState;
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
    state: ReadoutInputState.enabled,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.enhanced,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.input,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.inputTemporary,
    hugContent: true,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.enabled,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.enhanced,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.input,
    hugContent: false,
    hasDegree: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.inputTemporary,
    hugContent: false,
    hasDegree: false,
  })),
];

const usesFixedLength = (size: ReadoutInputSize): boolean =>
  size === ReadoutInputSize.small || size === ReadoutInputSize.large;

const renderVariant = (variant: Variant) => html`
  <obc-readout-input
    .size=${variant.size}
    .state=${variant.state}
    .hugContent=${variant.hugContent}
    .hasFixedLength=${usesFixedLength(variant.size)}
    .hasDegree=${variant.hasDegree}
    value="123"
    valueLength="123"
    .hasHintedZeros=${false}
    title=${`Size=${variant.size}, State=${variant.state}, Hug content=${variant.hugContent}, Degree=${variant.hasDegree}`}
  >
    <obi-input-right slot="icon"></obi-input-right>
  </obc-readout-input>
`;

export const AllCombinations: Story = {
  render: () => {
    const hugContentRows = variantRows.slice(0, 4);
    const noHugContentRows = variantRows.slice(4);

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
