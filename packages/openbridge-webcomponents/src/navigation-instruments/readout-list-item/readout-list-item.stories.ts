import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import {useArgs} from 'storybook/preview-api';
import {
  ReadoutListItemSize,
  ReadoutListItemStacking,
  ReadoutListItemAlertState,
  ReadoutListItemPriority,
} from './readout-list-item.js';
import './readout-list-item.js';
import '../../icons/icon-placeholder.js';

type ReadoutListItemStoryArgs = {
  size: ReadoutListItemSize;
  stacking: ReadoutListItemStacking;
  priority: ReadoutListItemPriority;
  alertState: ReadoutListItemAlertState;
  hasInput: boolean;
  inputValue: string;
  hasLabel: boolean;
  hasDegree: boolean;
  hasUnit: boolean;
  hasSource: boolean;
  hasLeadingIcon: boolean;
  hasValueIcon: boolean;
  hasFixedLength: boolean;
  valueLength: string;
  hasHintedZeros: boolean;
  label: string;
  unit: string;
  src: string;
  value: string;
  fractionDigits: number;
  showZeroPadding: boolean;
  maxDigits: number;
};

type ReadoutShowcaseCase = {
  label: string;
  args: Partial<ReadoutListItemStoryArgs>;
};

type ReadoutShowcaseSection = {
  title: string;
  cases: ReadoutShowcaseCase[];
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
      <div
        data-obc-theme="day"
        style="
          background: var(--container-background-color);
          padding: 24px;
          width: 100%;
          max-width: none;
          display: block;
          box-sizing: border-box;
        "
      >
        ${story()}
      </div>
    </div>
  `;
};

const readoutShowcaseStyle = `
  .obc-readout-list-item-sections {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
    width: 100%;
  }

  .obc-readout-list-item-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    width: 100%;
  }

  .obc-readout-list-item-section-title {
    margin: 0;
    font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--element-neutral-color, #777);
  }

  .obc-readout-list-item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, max-content));
    gap: 20px;
    width: 100%;
    align-items: start;
    justify-content: center;
    justify-items: center;
  }

  .obc-readout-list-item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 240px;
    padding: 12px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.03);
  }

  .obc-readout-list-item-title {
    font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--element-neutral-color, #777);
    text-align: center;
  }
`;

const defaultArgs: ReadoutListItemStoryArgs = {
  size: ReadoutListItemSize.base,
  stacking: ReadoutListItemStacking.trailingUnit,
  priority: ReadoutListItemPriority.regular,
  alertState: ReadoutListItemAlertState.none,
  hasInput: false,
  inputValue: '123',
  hasDegree: true,
  hasUnit: true,
  hasSource: false,
  hasLeadingIcon: false,
  hasValueIcon: false,
  hasFixedLength: false,
  valueLength: '000',
  hasHintedZeros: false,
  hasLabel: true,
  label: 'Label',
  unit: 'Unit',
  src: 'SRC',
  value: '123',
  fractionDigits: 0,
  showZeroPadding: false,
  maxDigits: 3,
};

function renderReadoutListItem(args: Partial<ReadoutListItemStoryArgs>) {
  const resolved = {...defaultArgs, ...args};
  return html`
    <obc-readout-list-item
      .size=${resolved.size}
      .stacking=${resolved.stacking}
      .priority=${resolved.priority}
      .alertState=${resolved.alertState}
      .hasInput=${resolved.hasInput}
      .inputValue=${resolved.inputValue}
      .hasLabel=${resolved.hasLabel}
      .hasDegree=${resolved.hasDegree}
      .hasUnit=${resolved.hasUnit}
      .hasSource=${resolved.hasSource}
      .hasLeadingIcon=${resolved.hasLeadingIcon}
      .hasValueIcon=${resolved.hasValueIcon}
      .hasFixedLength=${resolved.hasFixedLength}
      .valueLength=${resolved.valueLength}
      .hasHintedZeros=${resolved.hasHintedZeros}
      .label=${resolved.label}
      .unit=${resolved.unit}
      .src=${resolved.src}
      .value=${resolved.value}
      .fractionDigits=${resolved.fractionDigits}
      .showZeroPadding=${resolved.showZeroPadding}
      .maxDigits=${resolved.maxDigits}
    >
      ${resolved.hasLeadingIcon
        ? html`<span
            slot="leading-icon"
            style="display:block; width:100%; height:100%;"
          >
            <obi-placeholder></obi-placeholder>
          </span>`
        : nothing}
      ${resolved.hasValueIcon
        ? html`<span
            slot="value-icon"
            style="display:block; width:100%; height:100%;"
          >
            <obi-placeholder></obi-placeholder>
          </span>`
        : nothing}
    </obc-readout-list-item>
  `;
}

function renderShowcaseSections(sections: ReadoutShowcaseSection[]) {
  return html`
    <style>
      ${readoutShowcaseStyle}
    </style>
    <div class="obc-readout-list-item-sections">
      ${sections.map(
        (section) => html`
          <section class="obc-readout-list-item-section">
            <h3 class="obc-readout-list-item-section-title">
              ${section.title}
            </h3>
            <div class="obc-readout-list-item-grid">
              ${section.cases.map(
                (item) => html`
                  <div class="obc-readout-list-item-card">
                    <div class="obc-readout-list-item-title">${item.label}</div>
                    ${renderReadoutListItem(item.args)}
                  </div>
                `
              )}
            </div>
          </section>
        `
      )}
    </div>
  `;
}

const meta = {
  title: 'Instruments/Readout List Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout-list-item',
  decorators: [centeredCanvasDecorator],
  render: (args) => {
    const [, updateArgs] = useArgs<ReadoutListItemStoryArgs>();
    if (args.hasFixedLength === false && args.hasHintedZeros) {
      updateArgs({hasHintedZeros: false});
    }
    return html`<div style="display:flex; justify-content:center; width:100%;">
      ${renderReadoutListItem(args)}
    </div>`;
  },
  args: defaultArgs,
  argTypes: {
    size: {
      name: 'Size',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemSize),
      table: {category: 'Readout'},
    },
    stacking: {
      name: 'Stacking',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemStacking),
      table: {category: 'Readout'},
    },
    priority: {
      name: 'Priority',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemPriority),
      table: {category: 'Readout'},
    },
    alertState: {
      name: 'Alert State',
      control: {type: 'select'},
      options: Object.values(ReadoutListItemAlertState),
      table: {category: 'Readout'},
    },
    hasInput: {
      name: 'Has Input',
      table: {category: 'Readout'},
    },
    inputValue: {
      name: 'Input Value',
      control: {type: 'text'},
      if: {
        arg: 'hasInput',
        truthy: true,
      },
      table: {category: 'Value'},
    },
    hasDegree: {
      name: 'Has Degree',
      table: {category: 'Content'},
    },
    hasLabel: {
      name: 'Has Label',
      table: {category: 'Content'},
    },
    hasUnit: {
      name: 'Has Unit',
      table: {category: 'Content'},
    },
    hasSource: {
      name: 'Has Source',
      table: {category: 'Content'},
    },
    hasLeadingIcon: {
      name: 'Has Leading Icon',
      table: {category: 'Slots'},
    },
    hasValueIcon: {
      name: 'Has Value Icon',
      table: {category: 'Slots'},
    },
    label: {
      name: 'Label',
      control: {type: 'text'},
      table: {category: 'Content'},
    },
    unit: {
      name: 'Unit',
      control: {type: 'text'},
      if: {arg: 'hasUnit', truthy: true},
      table: {category: 'Content'},
    },
    src: {
      name: 'Source',
      control: {type: 'text'},
      if: {arg: 'hasSource', truthy: true},
      table: {category: 'Content'},
    },
    value: {
      name: 'Value',
      control: {type: 'text'},
      table: {category: 'Value'},
    },
    fractionDigits: {
      name: 'Fraction Digits',
      control: {type: 'number', min: 0, step: 1},
      table: {category: 'Formatting'},
    },
    maxDigits: {
      name: 'Max Digits',
      control: {type: 'number', min: 1, step: 1},
      table: {category: 'Formatting'},
    },
    showZeroPadding: {
      name: 'Show Zero Padding',
      table: {category: 'Formatting'},
    },
    hasFixedLength: {
      name: 'Has Fixed Length',
      table: {category: 'Formatting'},
    },
    valueLength: {
      name: 'Value Length',
      control: {type: 'text'},
      if: {arg: 'hasFixedLength', truthy: true},
      table: {category: 'Formatting'},
    },
    hasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'hasFixedLength', truthy: true},
      table: {category: 'Formatting'},
    },
  },
} satisfies Meta<ReadoutListItemStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutListItemStoryArgs>;

export const Playground: Story = {};

function renderStackingMatrix({
  stacking,
  hasUnit,
  hasSource,
}: {
  stacking: ReadoutListItemStacking;
  hasUnit: boolean;
  hasSource: boolean;
}) {
  const sizes = [
    ReadoutListItemSize.base,
    ReadoutListItemSize.priority,
    ReadoutListItemSize.enhanced,
  ] as const;
  const priorities = [
    ReadoutListItemPriority.regular,
    ReadoutListItemPriority.enhanced,
    ReadoutListItemPriority.input,
    ReadoutListItemPriority.inputFlipFlop,
  ] as const;
  const hasInputs = [false, true] as const;

  const cases: ReadoutShowcaseCase[] = [];

  for (const size of sizes) {
    for (const priority of priorities) {
      for (const hasInput of hasInputs) {
        cases.push({
          label: `${size} / ${priority} / hasInput=${hasInput}`,
          args: {
            size,
            stacking,
            priority,
            hasInput,
            alertState: ReadoutListItemAlertState.none,
            hasUnit,
            hasSource,
            value: '123',
            inputValue: '123',
            hasDegree: true,
            hasLabel: true,
          },
        });
      }
    }
  }

  return renderShowcaseSections([{title: `Stacking: ${stacking}`, cases}]);
}

export const TrailingUnit: Story = {
  name: 'Trailing Unit',
  render: () =>
    renderStackingMatrix({
      stacking: ReadoutListItemStacking.trailingUnit,
      hasUnit: true,
      hasSource: false,
    }),
};

export const LeadingUnit: Story = {
  name: 'Leading Unit',
  render: () =>
    renderStackingMatrix({
      stacking: ReadoutListItemStacking.leadingUnit,
      hasUnit: true,
      hasSource: false,
    }),
};

export const LeadingSrc: Story = {
  name: 'Leading Src',
  render: () =>
    renderStackingMatrix({
      stacking: ReadoutListItemStacking.leadingSrc,
      hasUnit: true,
      hasSource: true,
    }),
};

export const AlertStates: Story = {
  name: 'Alert States',
  render: () => {
    const alerts = Object.values(ReadoutListItemAlertState);
    const cases: ReadoutShowcaseCase[] = alerts.map((alertState) => ({
      label: `${alertState}`,
      args: {
        size: ReadoutListItemSize.base,
        stacking: ReadoutListItemStacking.trailingUnit,
        priority: ReadoutListItemPriority.regular,
        alertState,
        value: '123',
      },
    }));

    return renderShowcaseSections([{title: 'Alert States', cases}]);
  },
};
