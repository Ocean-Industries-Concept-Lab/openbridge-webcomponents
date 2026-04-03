import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {useArgs} from 'storybook/preview-api';
import {html} from 'lit';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import '../../components/navigation-item/navigation-item.js';
import {
  ReadoutAdviceState,
  ReadoutAdviceType,
} from '../readout-advice/readout-advice.js';
import {
  ReadoutInputState,
  ReadoutInputType,
} from '../readout-input/readout-input.js';
import {ReadoutDirection, ReadoutSourceType, ReadoutType} from './readout.js';
import './readout.js';

type ReadoutStoryArgs = {
  type: ReadoutType;
  direction: ReadoutDirection;
  hug: boolean;
  hasAdvice: boolean;
  hasInput: boolean;
  hasInputDivider: boolean;
  hasSrc: boolean;
  hasSrcPicker: boolean;
  hasSourceDivider: boolean;
  hasLeadingIcon: boolean;
  leadingIcon: string;
  adviceIcon: string;
  inputIcon?: string;
  adviceValue: string;
  inputValue: string;
  value: string;
  maxDigits: number;
  showZeroPadding: boolean;
  fractionDigits: number;
  label: string;
  hasLabelFixedLength: boolean;
  labelLength: string;
  unit: string;
  hasUnitFixedLength: boolean;
  unitLength: string;
  src: string;
  sourceDeltaValue: string;
  sourceType?: ReadoutSourceType;
  sourceHug: boolean;
  hasSourceLeadingIcon: boolean;
  hasSourceTrailingIcon: boolean;
  adviceType: ReadoutAdviceType;
  adviceState: ReadoutAdviceState;
  adviceHasFixedLength: boolean;
  adviceSecondaryValue: string;
  adviceDescription: string;
  adviceValueLength: string;
  adviceHasHintedZeros: boolean;
  adviceHasDegree: boolean;
  inputType: ReadoutInputType;
  inputState: ReadoutInputState;
  inputHasFixedLength: boolean;
  inputSecondaryValue: string;
  inputDescription: string;
  inputValueLength: string;
  inputHasHintedZeros: boolean;
  inputHasDegree: boolean;
  _lastAutoInputDividerSyncKey: string;
  _lastAutoSourceDividerSyncKey: string;
};

type ReadoutShowcaseCase = {
  label: string;
  args: Partial<ReadoutStoryArgs>;
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
          max-width: 100%;
          display: inline-flex;
        "
      >
        ${story()}
      </div>
    </div>
  `;
};

const longPageDecorator = (story: () => unknown) => {
  return html`
    <div
      style="
        width: 100%;
        display: block;
        padding: 24px 24px 120px;
      "
    >
      ${story()}
    </div>
  `;
};

const defaultArgs: ReadoutStoryArgs = {
  type: ReadoutType.regular,
  direction: ReadoutDirection.vertical,
  hug: true,
  hasAdvice: false,
  hasInput: true,
  hasInputDivider: false,
  hasSrc: false,
  hasSrcPicker: false,
  hasSourceDivider: false,
  hasLeadingIcon: false,
  leadingIcon: 'placeholder',
  adviceIcon: 'placeholder',
  inputIcon: undefined,
  adviceValue: '123',
  inputValue: '123',
  value: '123',
  maxDigits: 3,
  showZeroPadding: false,
  fractionDigits: 0,
  label: 'HDG',
  hasLabelFixedLength: false,
  labelLength: '',
  unit: 'DEG',
  hasUnitFixedLength: false,
  unitLength: '',
  src: 'SRC',
  sourceDeltaValue: '0,5',
  sourceHug: true,
  hasSourceLeadingIcon: false,
  hasSourceTrailingIcon: true,
  adviceType: ReadoutAdviceType.regular,
  adviceState: ReadoutAdviceState.enabled,
  adviceHasFixedLength: false,
  adviceSecondaryValue: '456',
  adviceDescription: 'SET',
  adviceValueLength: '000',
  adviceHasHintedZeros: false,
  adviceHasDegree: false,
  inputType: ReadoutInputType.regular,
  inputState: ReadoutInputState.enabled,
  inputHasFixedLength: false,
  inputSecondaryValue: '456',
  inputDescription: 'SET',
  inputValueLength: '000',
  inputHasHintedZeros: false,
  inputHasDegree: false,
  _lastAutoInputDividerSyncKey: `${ReadoutDirection.vertical}:true`,
  _lastAutoSourceDividerSyncKey: `${ReadoutDirection.vertical}:false`,
};

const readoutCaseCardStyle = `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 180px;
  position: relative;
  overflow: visible;
`;

const readoutCaseLabelStyle = `
  font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--element-neutral-color, #777);
`;

function getReadoutCaseCardStyle(hasSrcPicker: boolean) {
  return `${readoutCaseCardStyle}${hasSrcPicker ? 'padding-bottom: 120px;' : ''}`;
}

function resolveReadoutStoryValue(value: string) {
  if (value.trim() === '') {
    return value;
  }

  const numericValue = Number(value);

  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  return value;
}

function renderReadoutComponent(args: Partial<ReadoutStoryArgs>) {
  const resolvedArgs = {
    ...defaultArgs,
    ...args,
    hasInputDivider:
      args.hasInputDivider ??
      (args.direction === ReadoutDirection.horizontal
        ? (args.hasInput ?? defaultArgs.hasInput)
        : false),
    hasSourceDivider:
      args.hasSourceDivider ??
      (args.direction === ReadoutDirection.horizontal
        ? (args.hasSrc ?? defaultArgs.hasSrc)
        : false),
  };

  return html`
    <obc-readout
      .type=${resolvedArgs.type}
      .direction=${resolvedArgs.direction}
      .hug=${resolvedArgs.hug}
      .hasAdvice=${resolvedArgs.hasAdvice}
      .hasInput=${resolvedArgs.hasInput}
      .hasInputDivider=${resolvedArgs.hasInputDivider}
      .hasSrc=${resolvedArgs.hasSrc}
      .hasSrcPicker=${resolvedArgs.hasSrcPicker}
      .hasSourceDivider=${resolvedArgs.hasSourceDivider}
      .hasLeadingIcon=${resolvedArgs.hasLeadingIcon}
      .adviceValue=${resolvedArgs.adviceValue}
      .inputValue=${resolvedArgs.inputValue}
      .value=${resolveReadoutStoryValue(resolvedArgs.value)}
      .maxDigits=${resolvedArgs.maxDigits}
      .showZeroPadding=${resolvedArgs.showZeroPadding}
      .fractionDigits=${resolvedArgs.fractionDigits}
      .label=${resolvedArgs.label}
      .hasLabelFixedLength=${resolvedArgs.hasLabelFixedLength}
      .labelLength=${resolvedArgs.labelLength}
      .unit=${resolvedArgs.unit}
      .hasUnitFixedLength=${resolvedArgs.hasUnitFixedLength}
      .unitLength=${resolvedArgs.unitLength}
      .src=${resolvedArgs.src}
      .sourceDeltaValue=${resolvedArgs.sourceDeltaValue}
      .sourceType=${resolvedArgs.sourceType}
      .sourceHug=${resolvedArgs.sourceHug}
      .hasSourceLeadingIcon=${resolvedArgs.hasSourceLeadingIcon}
      .hasSourceTrailingIcon=${resolvedArgs.hasSourceTrailingIcon}
      .adviceType=${resolvedArgs.adviceType}
      .adviceState=${resolvedArgs.adviceState}
      .adviceHasFixedLength=${resolvedArgs.adviceHasFixedLength}
      .adviceSecondaryValue=${resolvedArgs.adviceSecondaryValue}
      .adviceDescription=${resolvedArgs.adviceDescription}
      .adviceValueLength=${resolvedArgs.adviceValueLength}
      .adviceHasHintedZeros=${resolvedArgs.adviceHasHintedZeros}
      .adviceHasDegree=${resolvedArgs.adviceHasDegree}
      .inputType=${resolvedArgs.inputType}
      .inputState=${resolvedArgs.inputState}
      .inputHasFixedLength=${resolvedArgs.inputHasFixedLength}
      .inputSecondaryValue=${resolvedArgs.inputSecondaryValue}
      .inputDescription=${resolvedArgs.inputDescription}
      .inputValueLength=${resolvedArgs.inputValueLength}
      .inputHasHintedZeros=${resolvedArgs.inputHasHintedZeros}
      .inputHasDegree=${resolvedArgs.inputHasDegree}
    >
      ${resolvedArgs.hasLeadingIcon
        ? iconIdToIconHtml(resolvedArgs.leadingIcon, {slot: 'leading-icon'})
        : null}
      ${resolvedArgs.hasAdvice
        ? iconIdToIconHtml(resolvedArgs.adviceIcon, {slot: 'advice-icon'})
        : null}
      ${resolvedArgs.hasInput && resolvedArgs.inputIcon
        ? iconIdToIconHtml(resolvedArgs.inputIcon, {slot: 'input-icon'})
        : null}
      ${resolvedArgs.hasSrcPicker
        ? html`
            <div slot="src-picker-content">
              <obc-navigation-item label="GPS"></obc-navigation-item>
              <obc-navigation-item label="GLONASS"></obc-navigation-item>
              <obc-navigation-item label="BEIDOU"></obc-navigation-item>
              <obc-navigation-item label="GALILEO"></obc-navigation-item>
            </div>
          `
        : null}
    </obc-readout>
  `;
}

function renderReadoutShowcase(cases: ReadoutShowcaseCase[]) {
  return html`
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
        gap: 24px;
        width: 100%;
      "
    >
      ${cases.map(
        (item) => html`
          <div style=${getReadoutCaseCardStyle(!!item.args.hasSrcPicker)}>
            <span style=${readoutCaseLabelStyle}>${item.label}</span>
            ${renderReadoutComponent(item.args)}
          </div>
        `
      )}
    </div>
  `;
}

function renderReadoutGridShowcase(cases: ReadoutShowcaseCase[]) {
  return html`
    <style>
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: repeating-linear-gradient(
          to bottom,
          rgba(255, 0, 0, 0.2) 0,
          rgba(255, 0, 0, 0.2) 1px,
          transparent 1px,
          transparent 4px
        );
        pointer-events: none;
      }
    </style>
    ${renderReadoutShowcase(cases)}
  `;
}

function renderReadoutSectionsShowcase(sections: ReadoutShowcaseSection[]) {
  return html`
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 40px;
        width: 100%;
      "
    >
      ${sections.map(
        (section) => html`
          <section
            style="
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 16px;
              width: 100%;
            "
          >
            <h2
              style="
                margin: 0;
                font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--element-neutral-color, #777);
              "
            >
              ${section.title}
            </h2>
            ${renderReadoutShowcase(section.cases)}
          </section>
        `
      )}
    </div>
  `;
}

const meta = {
  title: 'Instruments/Readout',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout',
  decorators: [centeredCanvasDecorator],
  render: (args) => {
    const [, updateArgs] = useArgs<ReadoutStoryArgs>();
    const autoInputDividerSyncKey = `${args.direction}:${args.hasInput}`;
    const autoSourceDividerSyncKey = `${args.direction}:${args.hasSrc}`;

    if (args._lastAutoInputDividerSyncKey !== autoInputDividerSyncKey) {
      updateArgs({
        _lastAutoInputDividerSyncKey: autoInputDividerSyncKey,
        ...(args.direction === ReadoutDirection.horizontal
          ? {hasInputDivider: args.hasInput ? true : args.hasInputDivider}
          : {hasInputDivider: false}),
      });
    }

    if (args._lastAutoSourceDividerSyncKey !== autoSourceDividerSyncKey) {
      updateArgs({
        _lastAutoSourceDividerSyncKey: autoSourceDividerSyncKey,
        ...(args.direction === ReadoutDirection.horizontal
          ? {hasSourceDivider: args.hasSrc ? true : args.hasSourceDivider}
          : {hasSourceDivider: false}),
      });
    }

    return renderReadoutComponent(args);
  },
  args: defaultArgs,
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'select',
        labels: {
          [ReadoutType.regular]: 'Regular',
          [ReadoutType.enhanced]: 'Enhanced',
          [ReadoutType.stack]: 'Stack',
        },
      },
      options: Object.values(ReadoutType),
      table: {category: 'Readout'},
    },
    direction: {
      name: 'Direction',
      control: {
        type: 'select',
        labels: {
          [ReadoutDirection.vertical]: 'Vertical',
          [ReadoutDirection.horizontal]: 'Horizontal',
        },
      },
      options: Object.values(ReadoutDirection),
      table: {category: 'Readout'},
    },
    hug: {
      table: {category: 'Readout'},
    },
    hasSrcPicker: {
      name: 'has Source picker',
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Readout'},
    },
    leadingIcon: {
      name: 'Leading icon',
      control: {
        type: 'select',
      },
      options: iconIds,
      if: {arg: 'hasLeadingIcon', truthy: true},
      table: {category: 'Readout'},
    },
    inputType: {
      name: 'Type',
      control: {
        type: 'select',
        labels: {
          [ReadoutInputType.regular]: 'Regular',
          [ReadoutInputType.enhanced]: 'Enhanced',
          [ReadoutInputType.description]: 'Description',
          [ReadoutInputType.range]: 'Range',
          [ReadoutInputType.verticalStack]: 'Vertical-stack',
          [ReadoutInputType.baseline]: 'Baseline',
          [ReadoutInputType.button]: 'Button',
        },
      },
      options: Object.values(ReadoutInputType),
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    inputState: {
      table: {disable: true},
      control: false,
    },
    inputValue: {
      name: 'Value',
      control: {type: 'text'},
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    inputIcon: {
      name: 'Icon',
      control: {
        type: 'select',
        labels: {
          undefined: 'Default Arrow',
        },
      },
      options: [undefined, ...iconIds],
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    inputSecondaryValue: {
      name: 'Secondary Value',
      control: {type: 'text'},
      if: {arg: 'inputType', eq: ReadoutInputType.range},
      table: {category: 'Input'},
    },
    inputDescription: {
      name: 'Description',
      control: {type: 'text'},
      if: {arg: 'inputType', eq: ReadoutInputType.description},
      table: {category: 'Input'},
    },
    inputHasFixedLength: {
      name: 'Has Fixed Length',
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    inputValueLength: {
      name: 'Value Length',
      control: {type: 'text'},
      if: {arg: 'inputHasFixedLength', truthy: true},
      table: {category: 'Input'},
    },
    inputHasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'inputHasFixedLength', truthy: true},
      table: {category: 'Input'},
    },
    inputHasDegree: {
      name: 'Has Degree',
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    adviceType: {
      name: 'Type',
      control: {
        type: 'select',
        labels: {
          [ReadoutAdviceType.regular]: 'Regular',
          [ReadoutAdviceType.enhanced]: 'Enhanced',
          [ReadoutAdviceType.description]: 'Description',
          [ReadoutAdviceType.range]: 'Range',
          [ReadoutAdviceType.verticalStack]: 'Vertical-stack',
          [ReadoutAdviceType.baseline]: 'Baseline',
          [ReadoutAdviceType.button]: 'Button',
        },
      },
      options: Object.values(ReadoutAdviceType),
      if: {arg: 'hasAdvice', truthy: true},
      table: {category: 'Advice'},
    },
    adviceState: {
      table: {disable: true},
      control: false,
    },
    _lastAutoInputDividerSyncKey: {
      table: {disable: true},
      control: false,
    },
    _lastAutoSourceDividerSyncKey: {
      table: {disable: true},
      control: false,
    },
    adviceValue: {
      name: 'Value',
      control: {type: 'text'},
      if: {arg: 'hasAdvice', truthy: true},
      table: {category: 'Advice'},
    },
    adviceIcon: {
      name: 'Icon',
      control: {
        type: 'select',
      },
      options: iconIds,
      if: {arg: 'hasAdvice', truthy: true},
      table: {category: 'Advice'},
    },
    adviceSecondaryValue: {
      name: 'Secondary Value',
      control: {type: 'text'},
      if: {arg: 'adviceType', eq: ReadoutAdviceType.range},
      table: {category: 'Advice'},
    },
    adviceDescription: {
      name: 'Description',
      control: {type: 'text'},
      if: {arg: 'adviceType', eq: ReadoutAdviceType.description},
      table: {category: 'Advice'},
    },
    adviceHasFixedLength: {
      table: {disable: true},
      control: false,
    },
    adviceValueLength: {
      name: 'Value Length',
      control: {type: 'text'},
      if: {arg: 'adviceHasFixedLength', truthy: true},
      table: {category: 'Advice'},
    },
    adviceHasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'adviceHasFixedLength', truthy: true},
      table: {category: 'Advice'},
    },
    adviceHasDegree: {
      table: {disable: true},
      control: false,
    },
    value: {
      name: 'Value',
      control: {type: 'text'},
      table: {category: 'Value'},
    },
    maxDigits: {
      name: 'Length',
      control: {type: 'number'},
      table: {category: 'Value'},
    },
    fractionDigits: {
      name: 'Fraction Digits',
      control: {type: 'number'},
      table: {category: 'Value'},
    },
    label: {
      name: 'Label',
      control: {type: 'text'},
      table: {category: 'Meta'},
    },
    labelLength: {
      name: 'Label Length',
      control: {type: 'text'},
      if: {arg: 'hasLabelFixedLength', truthy: true},
      table: {category: 'Meta'},
    },
    unit: {
      name: 'Unit',
      control: {type: 'text'},
      table: {category: 'Meta'},
    },
    unitLength: {
      name: 'Unit Length',
      control: {type: 'text'},
      if: {arg: 'hasUnitFixedLength', truthy: true},
      table: {category: 'Meta'},
    },
    sourceType: {
      name: 'Type',
      control: {
        type: 'select',
        labels: {
          [ReadoutSourceType.small]: 'Small',
          [ReadoutSourceType.regular]: 'Regular',
          [ReadoutSourceType.delta]: 'Delta',
          [ReadoutSourceType.flyout]: 'Flyout',
        },
      },
      options: Object.values(ReadoutSourceType),
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Source'},
    },
    sourceHug: {
      name: 'Hug',
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Source'},
    },
    hasSourceLeadingIcon: {
      name: 'has Leading icon',
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Source'},
    },
    src: {
      name: 'Source Name',
      control: {type: 'text'},
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Source'},
    },
    sourceDeltaValue: {
      name: 'Delta Value',
      control: {type: 'text'},
      if: {arg: 'sourceType', eq: ReadoutSourceType.delta},
      table: {category: 'Source'},
    },
    hasSourceTrailingIcon: {
      name: 'has Trailing icon',
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Source'},
    },
  },
} satisfies Meta<ReadoutStoryArgs>;

export default meta;
type Story = StoryObj<ReadoutStoryArgs>;

export const Playground: Story = {
  args: {
    hasSrcPicker: true,
  },
};

export const RegularCases: Story = {
  decorators: [longPageDecorator],
  render: () =>
    renderReadoutSectionsShowcase([
      {
        title: 'Vertical',
        cases: [
          {
            label: 'Basic',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLeadingIcon: true,
            },
          },
          {
            label: 'Meta Fixed Length',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLabelFixedLength: true,
              labelLength: 'HDG',
              hasUnitFixedLength: true,
              unitLength: 'DEG',
            },
          },
          {
            label: 'Value Hinted Zeros',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              value: '12',
              maxDigits: 5,
              showZeroPadding: true,
            },
          },
          {
            label: 'Value Fraction',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              value: '12.3',
              maxDigits: 4,
              fractionDigits: 1,
            },
          },
          {
            label: 'Input Fixed Length',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputValue: '12',
              inputHasFixedLength: true,
              inputValueLength: '000',
              inputHasHintedZeros: true,
            },
          },
          {
            label: 'Advice Fixed Length',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
              adviceValue: '12',
              adviceHasFixedLength: true,
              adviceValueLength: '000',
              adviceHasHintedZeros: true,
            },
          },
          {
            label: 'Advice + Degree',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              adviceHasDegree: true,
              adviceState: ReadoutAdviceState.active,
            },
          },
          {
            label: 'Input Baseline',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.baseline,
            },
          },
          {
            label: 'Input + Degree',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputHasDegree: true,
              inputState: ReadoutInputState.input,
            },
          },
          {
            label: 'Input + Degree Temporary',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputHasDegree: true,
              inputState: ReadoutInputState.inputTemporary,
            },
          },
          {
            label: 'Input Button',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.button,
            },
          },
          {
            label: 'Input Description',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.description,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input Range',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.range,
              inputValue: '12',
              inputSecondaryValue: '34',
            },
          },
          {
            label: 'Input Vertical Stack',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.verticalStack,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Source Small',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.small,
            },
          },
          {
            label: 'Source Picker',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.regular,
              hasSrcPicker: true,
            },
          },
          {
            label: 'Source Delta',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.delta,
              sourceDeltaValue: '0,5',
            },
          },
          {
            label: 'Source Flyout',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
      {
        title: 'Horizontal',
        cases: [
          {
            label: 'Basic',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
            },
          },
          {
            label: 'Advice + Input + Source',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasAdvice: true,
              hasInput: true,
              hasSrc: true,
              hasInputDivider: true,
              hasSourceDivider: true,
            },
          },
          {
            label: 'Value Hinted Zeros',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              value: '12',
              maxDigits: 5,
              showZeroPadding: true,
            },
          },
          {
            label: 'Input Button',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputType: ReadoutInputType.button,
            },
          },
          {
            label: 'Source Picker',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSrcPicker: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.regular,
            },
          },
          {
            label: 'Source Delta',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.delta,
              sourceDeltaValue: '0,5',
            },
          },
          {
            label: 'Source Flyout',
            args: {
              type: ReadoutType.regular,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
    ]),
};

export const EnhancedCases: Story = {
  decorators: [longPageDecorator],
  render: () =>
    renderReadoutSectionsShowcase([
      {
        title: 'Vertical',
        cases: [
          {
            label: 'Basic',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
            },
          },
          {
            label: 'Advice + Input',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLeadingIcon: true,
            },
          },
          {
            label: 'Input Enhanced',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.enhanced,
            },
          },
          {
            label: 'Input Baseline',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.baseline,
            },
          },
          {
            label: 'Input Description',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.description,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Source Small',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.small,
            },
          },
          {
            label: 'Source Delta',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.delta,
              sourceDeltaValue: '0,5',
            },
          },
          {
            label: 'Source Flyout',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
      {
        title: 'Horizontal',
        cases: [
          {
            label: 'Basic',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
            },
          },
          {
            label: 'Advice + Input + Source',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasAdvice: true,
              hasInput: true,
              hasSrc: true,
              hasInputDivider: true,
              hasSourceDivider: true,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasLeadingIcon: true,
            },
          },
          {
            label: 'Input Button',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputType: ReadoutInputType.button,
            },
          },
          {
            label: 'Input + Degree',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputHasDegree: true,
              inputState: ReadoutInputState.input,
            },
          },
          {
            label: 'Value Hinted Zeros',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              value: '12',
              maxDigits: 5,
              showZeroPadding: true,
            },
          },
          {
            label: 'Source Picker',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSrcPicker: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.regular,
            },
          },
          {
            label: 'Source Flyout',
            args: {
              type: ReadoutType.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
    ]),
};

export const StackCases: Story = {
  decorators: [longPageDecorator],
  render: () =>
    renderReadoutSectionsShowcase([
      {
        title: 'Vertical',
        cases: [
          {
            label: 'Basic',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
            },
          },
          {
            label: 'Advice + Input',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
            },
          },
          {
            label: 'Input Vertical Stack',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputType: ReadoutInputType.verticalStack,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input Fixed Length',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputValue: '12',
              inputHasFixedLength: true,
              inputValueLength: '000',
              inputHasHintedZeros: true,
            },
          },
          {
            label: 'Source Small',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.small,
            },
          },
          {
            label: 'Source Delta',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.delta,
              sourceDeltaValue: '0,5',
            },
          },
        ],
      },
      {
        title: 'Horizontal',
        cases: [
          {
            label: 'Basic',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
            },
          },
          {
            label: 'Advice + Input + Source',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasAdvice: true,
              hasInput: true,
              hasSrc: true,
              hasInputDivider: true,
              hasSourceDivider: true,
            },
          },
          {
            label: 'Input Button',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputType: ReadoutInputType.button,
            },
          },
          {
            label: 'Input Description',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputType: ReadoutInputType.description,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input Range',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputType: ReadoutInputType.range,
              inputValue: '12',
              inputSecondaryValue: '34',
            },
          },
          {
            label: 'Source Picker',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSrcPicker: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.regular,
            },
          },
          {
            label: 'Source Flyout',
            args: {
              type: ReadoutType.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
    ]),
};

export const HorizontalCasesGrid: Story = {
  render: () =>
    renderReadoutGridShowcase([
      {
        label: 'Regular / Input + Source',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Regular / Advice + Input + Source',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.horizontal,
          hasAdvice: true,
          hasInput: true,
          hasSrc: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Regular / Source Picker',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          hasSrcPicker: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Regular / All On',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.horizontal,
          hasAdvice: true,
          hasInput: true,
          hasInputDivider: true,
          hasSrc: true,
          hasSourceDivider: true,
          hasSrcPicker: true,
          hasLeadingIcon: true,
          hasLabelFixedLength: true,
          labelLength: 'HDG',
          hasUnitFixedLength: true,
          unitLength: 'DEG',
          hasSourceLeadingIcon: true,
          hasSourceTrailingIcon: true,
        },
      },
      {
        label: 'Enhanced / Basic',
        args: {
          type: ReadoutType.enhanced,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasInputDivider: true,
        },
      },
      {
        label: 'Enhanced / Input + Source',
        args: {
          type: ReadoutType.enhanced,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          hasLeadingIcon: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Enhanced / Source Picker',
        args: {
          type: ReadoutType.enhanced,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          hasSrcPicker: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Enhanced / All On',
        args: {
          type: ReadoutType.enhanced,
          direction: ReadoutDirection.horizontal,
          hasAdvice: true,
          hasInput: true,
          hasInputDivider: true,
          hasSrc: true,
          hasSourceDivider: true,
          hasSrcPicker: true,
          hasLeadingIcon: true,
          hasLabelFixedLength: true,
          labelLength: 'HDG',
          hasUnitFixedLength: true,
          unitLength: 'DEG',
          hasSourceLeadingIcon: true,
          hasSourceTrailingIcon: true,
        },
      },
      {
        label: 'Stack / Basic',
        args: {
          type: ReadoutType.stack,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasInputDivider: true,
        },
      },
      {
        label: 'Stack / Advice + Input',
        args: {
          type: ReadoutType.stack,
          direction: ReadoutDirection.horizontal,
          hasAdvice: true,
          hasInput: true,
          hasInputDivider: true,
        },
      },
      {
        label: 'Stack / With Source',
        args: {
          type: ReadoutType.stack,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          hasLeadingIcon: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Stack / Source Picker',
        args: {
          type: ReadoutType.stack,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          hasSrcPicker: true,
          hasInputDivider: true,
          hasSourceDivider: true,
        },
      },
      {
        label: 'Stack / All On',
        args: {
          type: ReadoutType.stack,
          direction: ReadoutDirection.horizontal,
          hasAdvice: true,
          hasInput: true,
          hasInputDivider: true,
          hasSrc: true,
          hasSourceDivider: true,
          hasSrcPicker: true,
          hasLeadingIcon: true,
          hasLabelFixedLength: true,
          labelLength: 'HDG',
          hasUnitFixedLength: true,
          unitLength: 'DEG',
          hasSourceLeadingIcon: true,
          hasSourceTrailingIcon: true,
        },
      },
    ]),
};

export const SegmentTypes: Story = {
  render: () =>
    renderReadoutShowcase([
      {
        label: 'Input / Description',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.vertical,
          hasInput: true,
          inputType: ReadoutInputType.description,
          inputDescription: 'SET',
        },
      },
      {
        label: 'Input / Range',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.vertical,
          hasInput: true,
          inputType: ReadoutInputType.range,
          inputSecondaryValue: '456',
        },
      },
      {
        label: 'Input / Baseline',
        args: {
          type: ReadoutType.enhanced,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          inputType: ReadoutInputType.baseline,
        },
      },
      {
        label: 'Input / Button',
        args: {
          type: ReadoutType.enhanced,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasSrc: true,
          inputType: ReadoutInputType.button,
        },
      },
      {
        label: 'Advice / Description',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.vertical,
          hasAdvice: true,
          hasInput: true,
          adviceType: ReadoutAdviceType.description,
          adviceDescription: 'SET',
        },
      },
      {
        label: 'Advice / Range',
        args: {
          type: ReadoutType.regular,
          direction: ReadoutDirection.vertical,
          hasAdvice: true,
          hasInput: true,
          adviceType: ReadoutAdviceType.range,
          adviceSecondaryValue: '456',
        },
      },
      {
        label: 'Stack / Vertical Stack',
        args: {
          type: ReadoutType.stack,
          direction: ReadoutDirection.vertical,
          hasInput: true,
          inputType: ReadoutInputType.verticalStack,
          inputHasFixedLength: true,
          inputValue: '12',
          inputValueLength: '000',
          inputHasHintedZeros: true,
        },
      },
    ]),
};
