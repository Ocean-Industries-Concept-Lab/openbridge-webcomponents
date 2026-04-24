import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {
  ReadoutAdviceFormat,
  ReadoutAdviceSize,
  ReadoutAdviceState,
} from './readout-advice.js';
import './readout-advice.js';
import {Priority} from '../types.js';

type ReadoutAdviceStoryArgs = {
  size: ReadoutAdviceSize;
  state: ReadoutAdviceState;
  format?: ReadoutAdviceFormat;
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
  title: 'Instruments/Readout Advice',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout-advice',
  decorators: [centeredCanvasDecorator],
  render: (args) => {
    return html`
      <obc-readout-advice
        .size=${args.size}
        .state=${args.state}
        .format=${args.format}
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
        ${args.iconId ? iconIdToIconHtml(args.iconId, {slot: 'icon'}) : null}
      </obc-readout-advice>
    `;
  },
  args: {
    size: ReadoutAdviceSize.small,
    state: ReadoutAdviceState.enabled,
    format: ReadoutAdviceFormat.regular,
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
    direction: {table: {disable: true}, control: false},
    readoutStyle: {table: {disable: true}, control: false},
    hugContent: {table: {disable: true}, control: false},
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
    state: {
      name: 'State',
      control: {
        type: 'select',
        labels: {
          [ReadoutAdviceState.enabled]: 'Enabled',
          [ReadoutAdviceState.active]: 'Active',
          [ReadoutAdviceState.amplified]: 'Amplified',
        },
      },
      options: Object.values(ReadoutAdviceState),
    },
    format: {
      name: 'Format',
      control: {type: 'select'},
      options: [undefined, ...Object.values(ReadoutAdviceFormat)],
      description: 'Structural subtype axis.',
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
      if: {arg: 'format', eq: ReadoutAdviceFormat.range},
      table: {category: 'Advice Value'},
    },
    description: {
      name: 'Description',
      control: 'text',
      if: {arg: 'format', eq: ReadoutAdviceFormat.description},
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
      table: {category: 'Advice Value'},
      description: 'Renders a ° suffix when enabled.',
    },
  },
} satisfies Meta<ReadoutAdviceStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutAdviceStoryArgs>;

export const Primary: Story = {};

export const StatePriorityMatrix: Story = {
  name: 'State × Priority (Model)',
  render: () => {
    const cases: Array<{
      label: string;
      state: ReadoutAdviceState;
      priority?: Priority;
    }> = [
      {label: 'enabled + regular', state: ReadoutAdviceState.enabled},
      {
        label: 'enabled + enhanced',
        state: ReadoutAdviceState.enabled,
        priority: Priority.enhanced,
      },
      {
        label: 'active + regular',
        state: ReadoutAdviceState.active,
        priority: Priority.regular,
      },
      {
        label: 'active + enhanced',
        state: ReadoutAdviceState.active,
        priority: Priority.enhanced,
      },
      {
        label: 'amplified + regular',
        state: ReadoutAdviceState.amplified,
        priority: Priority.regular,
      },
      {
        label: 'amplified + enhanced',
        state: ReadoutAdviceState.amplified,
        priority: Priority.enhanced,
      },
    ];

    return html`
      <div style="display: flex; flex-wrap: wrap; gap: 24px;">
        ${cases.map(
          (c) => html`
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
                min-width: 180px;
              "
            >
              <div
                style="
                  font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
                  text-transform: uppercase;
                  letter-spacing: 0.04em;
                  color: var(--element-neutral-color, #777);
                "
              >
                ${c.label}
              </div>
              <obc-readout-advice
                .size=${ReadoutAdviceSize.regular}
                .state=${c.state}
                .priority=${c.priority}
                .hugContent=${true}
                .hasFixedLength=${true}
                .value=${'123'}
                .valueLength=${'000'}
                .hasHintedZeros=${true}
              ></obc-readout-advice>
            </div>
          `
        )}
      </div>
    `;
  },
};

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
