import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {
  ReadoutAdviceSize,
  ReadoutAdviceState,
  ReadoutAdviceType,
} from './readout-advice.js';
import './readout-advice.js';

type ReadoutAdviceStoryArgs = {
  size: ReadoutAdviceSize;
  type?: ReadoutAdviceType;
  state: ReadoutAdviceState;
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
  title: 'Instruments/Readout Advice',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout-advice',
  decorators: [centeredCanvasDecorator],
  render: (args) => {
    return html`
      <obc-readout-advice
        .size=${args.size}
        .type=${args.type}
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
        ${args.iconId ? iconIdToIconHtml(args.iconId, {slot: 'icon'}) : null}
      </obc-readout-advice>
    `;
  },
  args: {
    size: ReadoutAdviceSize.small,
    type: undefined,
    state: ReadoutAdviceState.enabled,
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
          [ReadoutAdviceSize.small]: 'Small',
          [ReadoutAdviceSize.regular]: 'Regular',
          [ReadoutAdviceSize.medium]: 'Medium',
          [ReadoutAdviceSize.large]: 'Large',
        },
      },
      options: Object.values(ReadoutAdviceSize),
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
        labels: {
          undefined: 'Not selected',
          [ReadoutAdviceType.regular]: 'Regular',
          [ReadoutAdviceType.enhanced]: 'Enhanced',
          [ReadoutAdviceType.description]: 'Description',
          [ReadoutAdviceType.range]: 'Range',
          [ReadoutAdviceType.verticalStack]: 'Vertical-stack',
          [ReadoutAdviceType.baseline]: 'Baseline',
          [ReadoutAdviceType.button]: 'Button',
        },
      },
      options: [undefined, ...Object.values(ReadoutAdviceType)],
    },
    state: {
      name: 'State',
      control: {
        type: 'select',
        labels: {
          [ReadoutAdviceState.enabled]: 'Enabled',
          [ReadoutAdviceState.enhanced]: 'Enhanced',
          [ReadoutAdviceState.active]: 'Active',
          [ReadoutAdviceState.amplified]: 'Amplified',
        },
      },
      options: Object.values(ReadoutAdviceState),
    },
    hugText: {
      name: 'Hug Text',
    },
    iconId: {
      name: 'Icon',
      control: {
        type: 'select',
        labels: {
          undefined: 'Default',
        },
      },
      options: [undefined, ...iconIds],
    },
    value: {
      name: 'Value',
      control: 'text',
      table: {category: 'Advice Value'},
    },
    secondaryValue: {
      name: 'Secondary Value',
      control: 'text',
      if: {arg: 'type', eq: ReadoutAdviceType.range},
      table: {category: 'Advice Value'},
    },
    description: {
      name: 'Description',
      control: 'text',
      if: {arg: 'type', eq: ReadoutAdviceType.description},
      table: {category: 'Advice Value'},
    },
    valueLength: {
      name: 'Value Length',
      control: 'text',
      if: {arg: 'hasFixedLength', truthy: true},
      table: {category: 'Advice Value'},
    },
    hasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'hasFixedLength', truthy: true},
      table: {category: 'Advice Value'},
    },
    hasDegree: {
      name: 'Has Degree',
      if: {arg: 'size', eq: ReadoutAdviceSize.medium},
      table: {category: 'Advice Value'},
      description:
        'Available only for Medium active advice state when Has Fixed Length is false.',
    },
  },
} satisfies Meta<ReadoutAdviceStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutAdviceStoryArgs>;

export const Primary: Story = {};

type Variant = {
  size: ReadoutAdviceSize;
  state: ReadoutAdviceState;
  hugContent: boolean;
};

const sizes: ReadoutAdviceSize[] = [
  ReadoutAdviceSize.small,
  ReadoutAdviceSize.regular,
  ReadoutAdviceSize.medium,
  ReadoutAdviceSize.large,
];

const variantRows: Variant[][] = [
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.enabled,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.enhanced,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.active,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.amplified,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.enabled,
    hugContent: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.enhanced,
    hugContent: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.active,
    hugContent: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutAdviceState.amplified,
    hugContent: false,
  })),
];

const usesFixedLength = (size: ReadoutAdviceSize): boolean =>
  size === ReadoutAdviceSize.small || size === ReadoutAdviceSize.large;

const renderVariant = (variant: Variant) => html`
  <obc-readout-advice
    .size=${variant.size}
    .state=${variant.state}
    .hugContent=${variant.hugContent}
    .hasFixedLength=${usesFixedLength(variant.size)}
    value="123"
    valueLength="123"
    .hasHintedZeros=${false}
    title=${`Size=${variant.size}, State=${variant.state}, Hug content=${variant.hugContent}`}
  ></obc-readout-advice>
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
