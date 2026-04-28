import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {useArgs} from 'storybook/preview-api';
import {html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import '../../components/navigation-item/navigation-item.js';
import '../../components/modal-window/modal-window.js';
import {ObcModalWindowSize} from '../../components/modal-window/modal-window.js';
import {
  ReadoutAdviceState,
  ReadoutAdviceFormat,
} from '../readout-advice/readout-advice.js';
import {
  ReadoutInputMode,
  ReadoutInputFormat,
  ReadoutInputVariant,
  ReadoutInputSize,
} from '../readout-input/readout-input.js';
import {Priority} from '../types.js';
import {
  ReadoutDirection,
  ReadoutSourceType,
  ReadoutPriorityElement,
  ReadoutVariant,
} from './readout.js';
import './readout.js';

type ReadoutStoryArgs = {
  variant?: ReadoutVariant;
  priority?: Priority;
  priorityElement?: ReadoutPriorityElement;
  direction: ReadoutDirection;
  hug: boolean;
  labelOnly: boolean;
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
  fractionDigits: number;
  showZeroPadding: boolean;
  valueHasFixedLength: boolean;
  valueLength: string;
  valueHasHintedZeros: boolean;
  valueHasDegree: boolean;
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
  adviceFormat: ReadoutAdviceFormat;
  advicePriority?: Priority;
  adviceState: ReadoutAdviceState;
  adviceHasFixedLength: boolean;
  adviceSecondaryValue: string;
  adviceDescription: string;
  adviceValueLength: string;
  adviceHasHintedZeros: boolean;
  adviceHasDegree: boolean;
  inputFormat: ReadoutInputFormat;
  inputInteractionMode?: ReadoutInputMode;
  inputPriority?: Priority;
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
  variant: ReadoutVariant.regular,
  priority: Priority.enhanced,
  priorityElement: ReadoutPriorityElement.value,
  direction: ReadoutDirection.vertical,
  hug: true,
  labelOnly: false,
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
  maxDigits: 1,
  fractionDigits: 0,
  showZeroPadding: false,
  valueHasFixedLength: false,
  valueLength: '',
  valueHasHintedZeros: false,
  valueHasDegree: false,
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
  adviceFormat: ReadoutAdviceFormat.regular,
  advicePriority: undefined,
  adviceState: ReadoutAdviceState.enabled,
  adviceHasFixedLength: false,
  adviceSecondaryValue: '456',
  adviceDescription: 'SET',
  adviceValueLength: '000',
  adviceHasHintedZeros: false,
  adviceHasDegree: false,
  inputFormat: ReadoutInputFormat.regular,
  inputInteractionMode: undefined,
  inputPriority: undefined,
  inputHasFixedLength: false,
  inputSecondaryValue: '456',
  inputDescription: 'SET',
  inputValueLength: '000',
  inputHasHintedZeros: false,
  inputHasDegree: false,
  _lastAutoInputDividerSyncKey: `${ReadoutDirection.vertical}:true`,
  _lastAutoSourceDividerSyncKey: `${ReadoutDirection.vertical}:false`,
};

const readoutShowcaseStyle = `
  .obc-readout-sections {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
    width: 100%;
  }

  .obc-readout-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    width: 100%;
  }

  .obc-readout-section-title {
    margin: 0;
    font: 12px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--element-neutral-color, #777);
  }

  .obc-readout-case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, max-content));
    gap: 24px;
    width: 100%;
    align-items: start;
    justify-content: center;
    justify-items: center;
  }

  .obc-readout-case-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 260px;
    min-height: 220px;
    padding: 16px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.03);
    position: relative;
    overflow: visible;
  }

  .obc-readout-case-title {
    font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--element-neutral-color, #777);
    text-align: center;
    margin-bottom: 4px;
  }
`;

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

function renderReadoutComponent(
  args: Partial<ReadoutStoryArgs>,
  options?: {
    onSourceFlyoutClick?: (event: CustomEvent) => void;
  }
) {
  const resolvedDirection = args.direction ?? defaultArgs.direction;
  const resolvedArgs = {
    ...defaultArgs,
    ...args,
    hug:
      args.hug ??
      (resolvedDirection === ReadoutDirection.vertical
        ? false
        : defaultArgs.hug),
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
      @source-flyout-click=${(event) => {
        options?.onSourceFlyoutClick?.(event);
      }}
      .variant=${resolvedArgs.variant ?? ReadoutVariant.regular}
      .priority=${resolvedArgs.priority}
      .priorityElements=${resolvedArgs.priorityElement
        ? [resolvedArgs.priorityElement]
        : []}
      .direction=${resolvedArgs.direction}
      .hug=${resolvedArgs.hug}
      .labelOnly=${resolvedArgs.labelOnly}
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
      .fractionDigits=${resolvedArgs.fractionDigits}
      .showZeroPadding=${resolvedArgs.showZeroPadding}
      .valueHasFixedLength=${resolvedArgs.valueHasFixedLength}
      .valueLength=${resolvedArgs.valueLength}
      .valueHasHintedZeros=${resolvedArgs.valueHasHintedZeros}
      .valueHasDegree=${resolvedArgs.valueHasDegree}
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
      .adviceFormat=${resolvedArgs.adviceFormat}
      .advicePriority=${resolvedArgs.advicePriority}
      .adviceState=${resolvedArgs.adviceState}
      .adviceHasFixedLength=${resolvedArgs.adviceHasFixedLength}
      .adviceSecondaryValue=${resolvedArgs.adviceSecondaryValue}
      .adviceDescription=${resolvedArgs.adviceDescription}
      .adviceValueLength=${resolvedArgs.adviceValueLength}
      .adviceHasHintedZeros=${resolvedArgs.adviceHasHintedZeros}
      .adviceHasDegree=${resolvedArgs.adviceHasDegree}
      .inputFormat=${resolvedArgs.inputFormat}
      .inputInteractionMode=${resolvedArgs.inputInteractionMode}
      .inputPriority=${resolvedArgs.inputPriority}
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
  const overlayRef = createRef<HTMLElement>();
  const payloadRef = createRef<HTMLElement>();

  const closeOverlay = () => {
    const overlay = overlayRef.value;
    if (overlay) {
      overlay.style.display = 'none';
    }
  };

  return html`
    <style>
      ${readoutShowcaseStyle}
    </style>
    <div style="width: 100%;">
      <div class="obc-readout-case-grid">
        ${cases.map((item) => {
          const isFlyout = item.args.sourceType === ReadoutSourceType.flyout;
          return html`
            <div
              class="obc-readout-case-card"
              style=${item.args.hasSrcPicker ? 'padding-bottom: 120px;' : ''}
            >
              <div class="obc-readout-case-title">${item.label}</div>
              ${renderReadoutComponent(item.args, {
                onSourceFlyoutClick: (event) => {
                  if (!isFlyout) {
                    return;
                  }
                  const overlay = overlayRef.value;
                  const payload = payloadRef.value;
                  if (payload) {
                    payload.textContent = JSON.stringify(event.detail ?? {});
                  }
                  if (overlay) {
                    overlay.style.display = 'flex';
                  }
                },
              })}
            </div>
          `;
        })}
      </div>

      <div
        ${ref(overlayRef)}
        style="
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 9999;
        "
        role="presentation"
        @click=${(event: MouseEvent) => {
          if (event.target !== event.currentTarget) {
            return;
          }
          closeOverlay();
        }}
      >
        <obc-modal-window
          .size=${ObcModalWindowSize.Medium}
          .hasOptionalAction=${false}
          .hasLeadingIcon=${false}
          @close-click=${closeOverlay}
          @cancel-click=${closeOverlay}
          @done-click=${closeOverlay}
        >
          <span slot="title">Source Flyout</span>
          <div slot="content" style="padding: 16px;">
            <div
              style="
                font: 12px/1.3 var(--global-typography-ui-label-font-family, inherit);
                color: var(--element-neutral-color, #777);
                margin-bottom: 8px;
              "
            >
              This example shows how a flyout interaction can be handled by the
              host application.
            </div>
            <div
              style="
                font: 12px/1.35 var(--global-typography-ui-label-font-family, inherit);
                color: var(--element-neutral-color, #777);
              "
            >
              Event payload:
              <span
                ${ref(payloadRef)}
                style="
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
                "
                >—</span
              >
            </div>
          </div>
          <span slot="cancel-label">Close</span>
          <span slot="done-label">OK</span>
        </obc-modal-window>
      </div>
    </div>
  `;
}

function renderReadoutGridShowcase(cases: ReadoutShowcaseCase[]) {
  return html` ${renderReadoutShowcase(cases)} `;
}

function renderReadoutSectionsShowcase(sections: ReadoutShowcaseSection[]) {
  return html`
    <style>
      ${readoutShowcaseStyle}
    </style>
    <div class="obc-readout-sections">
      ${sections.map(
        (section) => html`
          <section class="obc-readout-section">
            <h3 class="obc-readout-section-title">${section.title}</h3>
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

    return html`
      <div style="display:flex; flex-direction:column; gap: 12px; width: 100%;">
        ${renderReadoutComponent(args)}
      </div>
    `;
  },
  args: defaultArgs,
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        labels: {
          [ReadoutVariant.regular]: 'Regular',
          [ReadoutVariant.enhanced]: 'Enhanced',
          [ReadoutVariant.stack]: 'Stack',
        },
      },
      options: Object.values(ReadoutVariant),
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
    priority: {
      name: 'Priority',
      control: {type: 'select'},
      options: [undefined, ...Object.values(Priority)],
      table: {category: 'Readout'},
    },
    priorityElements: {
      table: {disable: true},
      control: false,
    },
    priorityElement: {
      name: 'Priority Element',
      control: {type: 'select'},
      options: [undefined, ...Object.values(ReadoutPriorityElement)],
      table: {category: 'Readout'},
    },
    hug: {
      table: {disable: true},
      control: false,
    },
    labelOnly: {
      table: {disable: true},
      control: false,
    },
    hasAdvice: {
      name: 'Has Advice',
      table: {category: 'Readout'},
    },
    hasInput: {
      name: 'Has Input',
      table: {category: 'Readout'},
    },
    hasSrc: {
      name: 'Has Source',
      table: {category: 'Readout'},
    },
    hasLeadingIcon: {
      name: 'Has Leading Icon',
      table: {category: 'Readout'},
    },
    hasSrcPicker: {
      name: 'has Source picker',
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Readout'},
    },
    hasInputDivider: {
      name: 'Has Input Divider',
      if: {arg: 'direction', eq: ReadoutDirection.horizontal},
      table: {category: 'Readout'},
    },
    hasSourceDivider: {
      name: 'Has Source Divider',
      if: {arg: 'direction', eq: ReadoutDirection.horizontal},
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
    inputFormat: {
      name: 'Format',
      control: {type: 'select'},
      options: Object.values(ReadoutInputFormat),
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    inputInteractionMode: {
      name: 'Mode',
      control: {type: 'select'},
      options: [undefined, ...Object.values(ReadoutInputMode)],
      if: {arg: 'hasInput', truthy: true},
      table: {category: 'Input'},
    },
    inputPriority: {
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
      if: {arg: 'inputFormat', eq: ReadoutInputFormat.range},
      table: {category: 'Input'},
    },
    inputDescription: {
      name: 'Description',
      control: {type: 'text'},
      if: {arg: 'inputFormat', eq: ReadoutInputFormat.description},
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
      description: 'Renders a ° suffix when enabled.',
    },
    adviceFormat: {
      name: 'Format',
      control: {type: 'select'},
      options: Object.values(ReadoutAdviceFormat),
      if: {arg: 'hasAdvice', truthy: true},
      table: {category: 'Advice'},
    },
    adviceState: {
      name: 'State',
      control: {type: 'select'},
      options: Object.values(ReadoutAdviceState),
      if: {arg: 'hasAdvice', truthy: true},
      table: {category: 'Advice'},
    },
    advicePriority: {
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
      if: {arg: 'adviceFormat', eq: ReadoutAdviceFormat.range},
      table: {category: 'Advice'},
    },
    adviceDescription: {
      name: 'Description',
      control: {type: 'text'},
      if: {arg: 'adviceFormat', eq: ReadoutAdviceFormat.description},
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
      table: {disable: true},
      control: false,
    },
    fractionDigits: {
      table: {disable: true},
      control: false,
    },
    showZeroPadding: {
      table: {disable: true},
      control: false,
    },
    valueHasFixedLength: {
      name: 'Has Fixed Length',
      table: {category: 'Value'},
    },
    valueLength: {
      name: 'Value Length',
      control: {type: 'text'},
      if: {arg: 'valueHasFixedLength', truthy: true},
      table: {category: 'Value'},
    },
    valueHasHintedZeros: {
      name: 'Has Hinted Zeros',
      if: {arg: 'valueHasFixedLength', truthy: true},
      table: {category: 'Value'},
    },
    valueHasDegree: {
      name: 'Has Degree',
      table: {category: 'Value'},
    },
    label: {
      name: 'Label',
      control: {type: 'text'},
      table: {category: 'Meta / Label'},
    },
    hasLabelFixedLength: {
      name: 'Has Fixed Length',
      table: {category: 'Meta / Label'},
    },
    labelLength: {
      name: 'Label Length',
      control: {type: 'text'},
      if: {arg: 'hasLabelFixedLength', truthy: true},
      table: {category: 'Meta / Label'},
    },
    unit: {
      name: 'Unit',
      control: {type: 'text'},
      table: {category: 'Meta / Unit'},
    },
    hasUnitFixedLength: {
      name: 'Has Fixed Length',
      table: {category: 'Meta / Unit'},
    },
    unitLength: {
      name: 'Unit Length',
      control: {type: 'text'},
      if: {arg: 'hasUnitFixedLength', truthy: true},
      table: {category: 'Meta / Unit'},
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

export const SegmentHugReadout: Story = {
  name: 'Layout / Segment Hug (Readout)',
  render: () => html`
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 440px;
        max-width: 100%;
        padding: 16px;
        border: 1px dashed rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
      "
    >
      ${[
        {label: 'readout.hug = true (compact)', hug: true},
        {label: 'readout.hug = false (stretched)', hug: false},
      ].map(
        ({label, hug}) => html`
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
                font: 10px/1.2 var(--global-typography-ui-label-font-family, inherit);
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--element-neutral-color, #777);
                text-align: center;
              "
            >
              ${label}
            </div>
            <div style="display:flex; justify-content:flex-end; width:150px;">
              <obc-readout
                .variant=${ReadoutVariant.regular}
                .direction=${ReadoutDirection.vertical}
                .hug=${hug}
                style=${hug ? '' : 'width:100%;'}
                .hasInput=${true}
                .inputValue=${'123'}
                .priority=${Priority.enhanced}
                .priorityElements=${[
                  ReadoutPriorityElement.input,
                  ReadoutPriorityElement.value,
                ]}
                .value=${123}
                .label=${'HDG'}
                .unit=${'DEG'}
              >
                <obi-input-right slot="input-icon"></obi-input-right>
              </obc-readout>
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const RegularCases: Story = {
  decorators: [longPageDecorator],
  render: () =>
    renderReadoutSectionsShowcase([
      {
        title: 'Regular / Vertical — Basic',
        cases: [
          {
            label: 'Basic',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLeadingIcon: true,
            },
          },
        ],
      },
      {
        title: 'Regular / Vertical — Value Formatting',
        cases: [
          {
            label: 'Value Hinted Zeros',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              value: '12',
              valueHasFixedLength: true,
              valueLength: '00000',
              valueHasHintedZeros: true,
            },
          },
          {
            label: 'Value Numeric (fractionDigits=1)',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              value: '12.3',
              fractionDigits: 1,
            },
          },
        ],
      },
      {
        title: 'Regular / Vertical — Input & Advice Formats',
        cases: [
          {
            label: 'Input Fixed Length',
            args: {
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
            label: 'Advice Active + Degree',
            args: {
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              adviceHasDegree: true,
              adviceState: ReadoutAdviceState.active,
            },
          },
          {
            label: 'Input Baseline',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.baseline,
            },
          },
          {
            label: 'Input Button',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.button,
            },
          },
          {
            label: 'Input Description',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.description,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input Range',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.range,
              inputValue: '12',
              inputSecondaryValue: '34',
            },
          },
          {
            label: 'Input Vertical Stack',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.verticalStack,
              inputDescription: 'SET',
            },
          },
        ],
      },
      {
        title: 'Regular / Vertical — Source Formats',
        cases: [
          {
            label: 'Source Small',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.small,
            },
          },
          {
            label: 'Source Delta',
            args: {
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
        title: 'Regular / Vertical — Picker & Flyout',
        cases: [
          {
            label: 'Source Picker',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.regular,
              hasSrcPicker: true,
            },
          },
          {
            label: 'Source Flyout',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
      {
        title: 'Regular / Horizontal — Basic',
        cases: [
          {
            label: 'Basic',
            args: {
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
            },
          },
          {
            label: 'Advice + Input + Source',
            args: {
              direction: ReadoutDirection.horizontal,
              hasAdvice: true,
              hasInput: true,
              hasSrc: true,
              hasInputDivider: true,
              hasSourceDivider: true,
            },
          },
        ],
      },
      {
        title: 'Regular / Horizontal — Value Formatting',
        cases: [
          {
            label: 'Value Hinted Zeros',
            args: {
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              value: '12',
              valueHasFixedLength: true,
              valueLength: '00000',
              valueHasHintedZeros: true,
            },
          },
        ],
      },
      {
        title: 'Regular / Horizontal — Input Formats',
        cases: [
          {
            label: 'Input Button',
            args: {
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputFormat: ReadoutInputFormat.button,
            },
          },
        ],
      },
      {
        title: 'Regular / Horizontal — Source Formats',
        cases: [
          {
            label: 'Source Picker',
            args: {
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
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasSrc: true,
              hasSourceDivider: true,
              sourceType: ReadoutSourceType.delta,
              sourceDeltaValue: '0,5',
            },
          },
        ],
      },
      {
        title: 'Regular / Horizontal — Picker & Flyout',
        cases: [
          {
            label: 'Source Flyout',
            args: {
              variant: ReadoutVariant.regular,
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
        title: 'Enhanced / Vertical — Basic',
        cases: [
          {
            label: 'Basic',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
            },
          },
          {
            label: 'Advice + Input',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLeadingIcon: true,
            },
          },
        ],
      },
      {
        title: 'Enhanced / Vertical — Input Formats',
        cases: [
          {
            label: 'Input Segment Priority (Enhanced)',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.regular,
              inputPriority: Priority.enhanced,
            },
          },
          {
            label: 'Input Baseline',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.baseline,
            },
          },
          {
            label: 'Input + Degree',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputHasDegree: true,
              inputInteractionMode: ReadoutInputMode.input,
            },
          },
          {
            label: 'Input + Degree Temporary',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputHasDegree: true,
              inputInteractionMode: ReadoutInputMode.inputTemporary,
            },
          },
          {
            label: 'Input Description',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.description,
              inputDescription: 'SET',
            },
          },
        ],
      },
      {
        title: 'Enhanced / Vertical — Source Formats',
        cases: [
          {
            label: 'Source Small',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.small,
            },
          },
          {
            label: 'Source Delta',
            args: {
              variant: ReadoutVariant.enhanced,
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
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.flyout,
            },
          },
        ],
      },
      {
        title: 'Enhanced / Horizontal — Basic',
        cases: [
          {
            label: 'Basic',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
            },
          },
          {
            label: 'Advice + Input + Source',
            args: {
              variant: ReadoutVariant.enhanced,
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
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasLeadingIcon: true,
            },
          },
        ],
      },
      {
        title: 'Enhanced / Horizontal — Input Formats',
        cases: [
          {
            label: 'Input Button',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputFormat: ReadoutInputFormat.button,
            },
          },
          {
            label: 'Input + Degree',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputHasDegree: true,
              inputInteractionMode: ReadoutInputMode.input,
            },
          },
        ],
      },
      {
        title: 'Enhanced / Horizontal — Value Formatting',
        cases: [
          {
            label: 'Value Hinted Zeros',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              value: '12',
              valueHasFixedLength: true,
              valueLength: '00000',
              valueHasHintedZeros: true,
            },
          },
        ],
      },
      {
        title: 'Enhanced / Horizontal — Picker & Flyout',
        cases: [
          {
            label: 'Source Picker',
            args: {
              variant: ReadoutVariant.enhanced,
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
              variant: ReadoutVariant.enhanced,
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
        title: 'Stack / Vertical — Basic',
        cases: [
          {
            label: 'Basic',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
            },
          },
          {
            label: 'Advice + Input',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
            },
          },
        ],
      },
      {
        title: 'Stack / Vertical — Input Formats',
        cases: [
          {
            label: 'Input Vertical Stack',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.verticalStack,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input Fixed Length',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputValue: '12',
              inputHasFixedLength: true,
              inputValueLength: '000',
              inputHasHintedZeros: true,
            },
          },
        ],
      },
      {
        title: 'Stack / Vertical — Source Formats',
        cases: [
          {
            label: 'Source Small',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.small,
            },
          },
          {
            label: 'Source Delta',
            args: {
              variant: ReadoutVariant.stack,
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
        title: 'Stack / Horizontal — Basic',
        cases: [
          {
            label: 'Basic',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
            },
          },
          {
            label: 'Advice + Input + Source',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.horizontal,
              hasAdvice: true,
              hasInput: true,
              hasSrc: true,
              hasInputDivider: true,
              hasSourceDivider: true,
            },
          },
        ],
      },
      {
        title: 'Stack / Horizontal — Input Formats',
        cases: [
          {
            label: 'Input Button',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputFormat: ReadoutInputFormat.button,
            },
          },
          {
            label: 'Input Description',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputFormat: ReadoutInputFormat.description,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input Range',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              inputFormat: ReadoutInputFormat.range,
              inputValue: '12',
              inputSecondaryValue: '34',
            },
          },
        ],
      },
      {
        title: 'Stack / Horizontal — Picker & Flyout',
        cases: [
          {
            label: 'Source Picker',
            args: {
              variant: ReadoutVariant.stack,
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
              variant: ReadoutVariant.stack,
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
          variant: ReadoutVariant.regular,
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
          variant: ReadoutVariant.regular,
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
          variant: ReadoutVariant.regular,
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
          variant: ReadoutVariant.regular,
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
          variant: ReadoutVariant.enhanced,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasInputDivider: true,
        },
      },
      {
        label: 'Enhanced / Input + Source',
        args: {
          variant: ReadoutVariant.enhanced,
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
          variant: ReadoutVariant.enhanced,
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
          variant: ReadoutVariant.enhanced,
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
          variant: ReadoutVariant.stack,
          direction: ReadoutDirection.horizontal,
          hasInput: true,
          hasInputDivider: true,
        },
      },
      {
        label: 'Stack / Advice + Input',
        args: {
          variant: ReadoutVariant.stack,
          direction: ReadoutDirection.horizontal,
          hasAdvice: true,
          hasInput: true,
          hasInputDivider: true,
        },
      },
      {
        label: 'Stack / With Source',
        args: {
          variant: ReadoutVariant.stack,
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
          variant: ReadoutVariant.stack,
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
          variant: ReadoutVariant.stack,
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
    renderReadoutSectionsShowcase([
      {
        title: 'Input Formats',
        cases: [
          {
            label: 'Input / Description',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.description,
              inputDescription: 'SET',
            },
          },
          {
            label: 'Input / Range',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.range,
              inputSecondaryValue: '456',
            },
          },
          {
            label: 'Input / Baseline (input segment only)',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              inputFormat: ReadoutInputFormat.baseline,
            },
          },
          {
            label: 'Input / Button',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasSrc: true,
              inputFormat: ReadoutInputFormat.button,
            },
          },
        ],
      },
      {
        title: 'Advice Formats',
        cases: [
          {
            label: 'Advice / Description',
            args: {
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
              adviceFormat: ReadoutAdviceFormat.description,
              adviceDescription: 'SET',
            },
          },
          {
            label: 'Advice / Range',
            args: {
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
              adviceFormat: ReadoutAdviceFormat.range,
              adviceSecondaryValue: '456',
            },
          },
        ],
      },
      {
        title: 'Stack Formats',
        cases: [
          {
            label: 'Stack / Vertical Stack',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.verticalStack,
              inputHasFixedLength: true,
              inputValue: '12',
              inputValueLength: '000',
              inputHasHintedZeros: true,
            },
          },
        ],
      },
    ]),
};
