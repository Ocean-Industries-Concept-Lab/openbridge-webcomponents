import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcReadoutInput,
  ReadoutInputSize,
  ReadoutInputState,
  ReadoutInputWeight,
} from './readout-input.js';
import './readout-input.js';

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
        .size=${args.size}
        .state=${args.state}
        .hugContent=${args.hugContent}
        .weight=${args.weight}
        .stringWidth=${args.stringWidth}
        .value=${args.value}
        .valueLength=${args.valueLength}
        .hasHintedZeros=${args.hasHintedZeros}
        .hasDegree=${args.hasDegree}
      ></obc-readout-input>
    `;
  },
  args: {
    size: ReadoutInputSize.small,
    state: ReadoutInputState.enabled,
    hugContent: true,
    stringWidth: true,
    value: '123',
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
    hugContent: {
      name: 'Hug Content',
    },
    weight: {
      name: 'Weight',
      control: {
        type: 'select',
        labels: {
          [ReadoutInputWeight.regular]: 'Regular',
          [ReadoutInputWeight.active]: 'Active',
          [ReadoutInputWeight.bold]: 'Bold',
        },
      },
      options: Object.values(ReadoutInputWeight),
      table: {category: 'Input Value'},
      description: 'Bold is available only for Regular size.',
    },
    stringWidth: {
      name: 'String Width',
      table: {category: 'Input Value'},
    },
    value: {
      name: 'Value',
      control: 'text',
      table: {category: 'Input Value'},
    },
    valueLength: {
      name: 'Value Length',
      control: 'text',
      if: {arg: 'stringWidth', truthy: true},
      table: {category: 'Input Value'},
    },
    hasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'stringWidth', truthy: true},
      table: {category: 'Input Value'},
    },
    hasDegree: {
      name: 'Has Degree',
      if: {arg: 'size', eq: ReadoutInputSize.medium},
      table: {category: 'Input Value'},
      description:
        'Available only for Medium when Weight is Active and String Width is false.',
    },
  },
} satisfies Meta<ObcReadoutInput>;

export default meta;
type Story = StoryObj<ObcReadoutInput>;

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
            .weight=${ReadoutInputWeight.regular}
            .stringWidth=${true}
            value="12"
            valueLength="000"
            .hasHintedZeros=${true}
            title=${`Size=${size}`}
          ></obc-readout-input>
        `
      )}
    </div>
  `,
};

type Variant = {
  size: ReadoutInputSize;
  state: ReadoutInputState;
  hugContent: boolean;
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
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.enhanced,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.input,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.inputTemporary,
    hugContent: true,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.enabled,
    hugContent: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.enhanced,
    hugContent: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.input,
    hugContent: false,
  })),
  sizes.map((size) => ({
    size,
    state: ReadoutInputState.inputTemporary,
    hugContent: false,
  })),
];

const useStringWidth = (size: ReadoutInputSize): boolean =>
  size === ReadoutInputSize.small || size === ReadoutInputSize.large;

const renderVariant = (variant: Variant) => html`
  <obc-readout-input
    .size=${variant.size}
    .state=${variant.state}
    .hugContent=${variant.hugContent}
    .stringWidth=${useStringWidth(variant.size)}
    value="123"
    valueLength="123"
    .hasHintedZeros=${false}
    title=${`Size=${variant.size}, State=${variant.state}, Hug content=${variant.hugContent}`}
  ></obc-readout-input>
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
