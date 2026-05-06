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
import {
  ReadoutDirection,
  ReadoutInputInteraction,
  ReadoutInputStyle,
  ReadoutAlertState,
  ReadoutSourceType,
  ReadoutVariant,
} from './readout.js';
import {Priority} from '../types.js';
import './readout.js';

enum ReadoutStackVerticalAlignment {
  left = 'left',
  center = 'center',
  vertical = 'vertical',
}

type ReadoutStoryArgs = {
  variant?: ReadoutVariant;
  valuePriority?: Priority;
  direction: ReadoutDirection;
  alignment: ReadoutStackVerticalAlignment;
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
  adviceValue: string | number;
  inputValue: string | number;
  value: string | number;
  maxDigits: number;
  fractionDigits: number;
  showZeroPadding: boolean;
  valueHasFixedLength: boolean;
  valueLength: string;
  valueHasHintedZeros: boolean;
  hasDegree: boolean;
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
  adviceState: ReadoutAdviceState;
  adviceHasFixedLength: boolean;
  adviceSecondaryValue: string;
  adviceDescription: string;
  adviceValueLength: string;
  adviceHasHintedZeros: boolean;
  inputFormat: ReadoutInputFormat;
  inputInteractionMode?: ReadoutInputMode;
  inputHasFixedLength: boolean;
  inputSecondaryValue: string;
  inputDescription: string;
  inputValueLength: string;
  inputHasHintedZeros: boolean;
  readoutInputStyle: ReadoutInputStyle;
  alertState: ReadoutAlertState;
  inputInteraction: ReadoutInputInteraction;
  setpointValue: string | number;
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
  valuePriority: undefined,
  direction: ReadoutDirection.vertical,
  alignment: ReadoutStackVerticalAlignment.vertical,
  hug: false,
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
  hasDegree: false,
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
  adviceState: ReadoutAdviceState.enabled,
  adviceHasFixedLength: false,
  adviceSecondaryValue: '456',
  adviceDescription: 'SET',
  adviceValueLength: '000',
  adviceHasHintedZeros: false,
  inputFormat: ReadoutInputFormat.regular,
  inputInteractionMode: undefined,
  inputHasFixedLength: false,
  inputSecondaryValue: '456',
  inputDescription: 'SET',
  inputValueLength: '000',
  inputHasHintedZeros: false,
  readoutInputStyle: ReadoutInputStyle.regular,
  alertState: ReadoutAlertState.none,
  inputInteraction: ReadoutInputInteraction.alwaysVisible,
  setpointValue: '123',
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

  const trimmed = value.trim();

  if (/[.,]/.test(trimmed)) {
    return value;
  }

  if (/^-?0\d+$/u.test(trimmed)) {
    return value;
  }

  if (/^-?\d+$/u.test(trimmed)) {
    return Number(trimmed);
  }

  return value;
}

function resolveReadoutStoryMaybeNumeric(
  value: string | number | undefined
): string | number | undefined {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    return resolveReadoutStoryValue(value);
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
    hug: args.hug ?? defaultArgs.hug,
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
      @source-flyout-click=${(event: CustomEvent) => {
        options?.onSourceFlyoutClick?.(event);
      }}
      .variant=${resolvedArgs.variant ?? ReadoutVariant.regular}
      .valuePriority=${resolvedArgs.valuePriority}
      .readoutInputStyle=${resolvedArgs.readoutInputStyle}
      .alertState=${resolvedArgs.alertState}
      .inputInteraction=${resolvedArgs.inputInteraction}
      .setpointValue=${resolveReadoutStoryMaybeNumeric(
        resolvedArgs.setpointValue
      )}
      .direction=${resolvedArgs.direction}
      .alignment=${resolvedArgs.alignment}
      .hug=${resolvedArgs.hug}
      .labelOnly=${resolvedArgs.labelOnly}
      .hasAdvice=${resolvedArgs.hasAdvice}
      .hasInput=${resolvedArgs.hasInput}
      .hasInputDivider=${resolvedArgs.hasInputDivider}
      .hasSrc=${resolvedArgs.hasSrc}
      .hasSrcPicker=${resolvedArgs.hasSrcPicker}
      .hasSourceDivider=${resolvedArgs.hasSourceDivider}
      .hasLeadingIcon=${resolvedArgs.hasLeadingIcon}
      .adviceValue=${resolveReadoutStoryMaybeNumeric(resolvedArgs.adviceValue)}
      .inputValue=${resolveReadoutStoryMaybeNumeric(resolvedArgs.inputValue)}
      .value=${resolveReadoutStoryValue(resolvedArgs.value)}
      .maxDigits=${resolvedArgs.maxDigits}
      .fractionDigits=${resolvedArgs.fractionDigits}
      .showZeroPadding=${resolvedArgs.showZeroPadding}
      .valueHasFixedLength=${resolvedArgs.valueHasFixedLength}
      .valueLength=${resolvedArgs.valueLength}
      .valueHasHintedZeros=${resolvedArgs.valueHasHintedZeros}
      .hasDegree=${resolvedArgs.hasDegree}
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
      .adviceState=${resolvedArgs.adviceState}
      .adviceHasFixedLength=${resolvedArgs.adviceHasFixedLength}
      .adviceSecondaryValue=${resolvedArgs.adviceSecondaryValue}
      .adviceDescription=${resolvedArgs.adviceDescription}
      .adviceValueLength=${resolvedArgs.adviceValueLength}
      .adviceHasHintedZeros=${resolvedArgs.adviceHasHintedZeros}
      .inputFormat=${resolvedArgs.inputFormat}
      .inputInteractionMode=${resolvedArgs.inputInteractionMode}
      .inputHasFixedLength=${resolvedArgs.inputHasFixedLength}
      .inputSecondaryValue=${resolvedArgs.inputSecondaryValue}
      .inputDescription=${resolvedArgs.inputDescription}
      .inputValueLength=${resolvedArgs.inputValueLength}
      .inputHasHintedZeros=${resolvedArgs.inputHasHintedZeros}
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
    valuePriority: {
      name: 'Value Priority',
      control: {type: 'select'},
      options: [undefined, ...Object.values(Priority)],
      table: {category: 'Readout'},
      description: 'Overrides the main value segment priority/color.',
    },
    readoutInputStyle: {
      name: 'Readout Input Style',
      control: {type: 'select'},
      options: Object.values(ReadoutInputStyle),
      table: {category: 'Readout'},
      description: 'Controls input/setpoint visibility and tone.',
    },
    alignment: {
      name: 'Alignment',
      control: {type: 'select'},
      options: Object.values(ReadoutStackVerticalAlignment),
      if: {arg: 'variant', eq: ReadoutVariant.stack},
      table: {category: 'Readout'},
      description:
        'Controls stack vertical alignment. Only applies to stack variant.',
    },
    alertState: {
      name: 'Alert State',
      control: {type: 'select'},
      options: Object.values(ReadoutAlertState),
      table: {category: 'Readout'},
      description: 'Validation/alarm state for the readout frame.',
    },
    inputInteraction: {
      name: 'Input Interaction',
      control: {type: 'select'},
      options: Object.values(ReadoutInputInteraction),
      table: {category: 'Readout'},
      description: 'Input/setpoint visibility behavior.',
    },
    setpointValue: {
      name: 'Setpoint Value',
      control: {type: 'text'},
      table: {category: 'Readout'},
      description: 'Setpoint value shown in the input segment.',
    },
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
    hug: {
      name: 'Hug',
      table: {category: 'Readout', disable: true},
      control: false,
    },
    labelOnly: {
      name: 'Label Only',
      table: {category: 'Readout', disable: true},
      control: false,
    },
    hasAdvice: {
      name: 'Has Advice',
      table: {category: 'Segments'},
    },
    hasInput: {
      name: 'Has Input',
      table: {category: 'Segments'},
    },
    hasSrc: {
      name: 'Has Source',
      table: {category: 'Segments'},
    },
    hasLeadingIcon: {
      name: 'Has Leading Icon',
      table: {category: 'Segments'},
    },
    hasSrcPicker: {
      name: 'Has Source Picker',
      if: {arg: 'hasSrc', truthy: true},
      table: {category: 'Segments'},
    },
    hasInputDivider: {
      name: 'Has Input Divider',
      if: {arg: 'direction', eq: ReadoutDirection.horizontal},
      table: {category: 'Segments'},
    },
    hasSourceDivider: {
      name: 'Has Source Divider',
      if: {arg: 'direction', eq: ReadoutDirection.horizontal},
      table: {category: 'Segments'},
    },
    leadingIcon: {
      name: 'Leading icon',
      control: {
        type: 'select',
      },
      options: iconIds,
      if: {arg: 'hasLeadingIcon', truthy: true},
      table: {category: 'Segments'},
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
      name: 'Fraction Digits',
      control: {type: 'number', min: 0, step: 1},
      table: {category: 'Formatting'},
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
    hasDegree: {
      name: 'Has Degree',
      control: {type: 'boolean'},
      table: {category: 'Formatting'},
      description:
        'Applies ° suffix to value, input, and advice (when those segments are present).',
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
                .readoutInputStyle=${ReadoutInputStyle.enhanced}
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

export const ApiMatrixVariantInputStyleInteraction: Story = {
  name: 'API Matrix / Variant × Input Style × Interaction',
  decorators: [longPageDecorator],
  render: () => {
    const inputStyles = Object.values(ReadoutInputStyle) as ReadoutInputStyle[];
    const interactions = Object.values(
      ReadoutInputInteraction
    ) as ReadoutInputInteraction[];

    const variants = [
      ReadoutVariant.regular,
      ReadoutVariant.enhanced,
      ReadoutVariant.stack,
    ] as const;

    const baseArgs: Partial<ReadoutStoryArgs> = {
      direction: ReadoutDirection.vertical,
      hug: false,
      hasAdvice: false,
      hasSrc: false,
      hasLeadingIcon: false,
      value: '123',
      setpointValue: '100',
      label: 'HDG',
      unit: 'DEG',
      alertState: ReadoutAlertState.none,
    };

    const sections: ReadoutShowcaseSection[] = variants.map((variant) => {
      const cases: ReadoutShowcaseCase[] = inputStyles.flatMap(
        (readoutInputStyle): ReadoutShowcaseCase[] => {
          if (readoutInputStyle === ReadoutInputStyle.hidden) {
            return [
              {
                label: `${variant} / input=hidden`,
                args: {
                  ...baseArgs,
                  variant,
                  hasInput: false,
                  readoutInputStyle,
                  inputInteraction: ReadoutInputInteraction.alwaysVisible,
                },
              },
            ];
          }

          return interactions.map((inputInteraction) => ({
            label: `${variant} / input=${readoutInputStyle} / ${inputInteraction}`,
            args: {
              ...baseArgs,
              variant,
              hasInput: true,
              readoutInputStyle,
              inputInteraction,
            },
          }));
        }
      );

      return {
        title:
          variant === ReadoutVariant.regular
            ? 'Variant: Regular'
            : variant === ReadoutVariant.enhanced
              ? 'Variant: Enhanced'
              : 'Variant: Stack',
        cases,
      };
    });

    return renderReadoutSectionsShowcase(sections);
  },
};

export const ApiMatrixHorizontalVariantInputStyleInteraction: Story = {
  name: 'API Matrix (Horizontal) / Variant × Input Style × Interaction',
  decorators: [longPageDecorator],
  render: () => {
    const inputStyles = Object.values(ReadoutInputStyle) as ReadoutInputStyle[];
    const interactions = Object.values(
      ReadoutInputInteraction
    ) as ReadoutInputInteraction[];

    const variants = [
      ReadoutVariant.regular,
      ReadoutVariant.enhanced,
      ReadoutVariant.stack,
    ] as const;

    const baseArgs: Partial<ReadoutStoryArgs> = {
      direction: ReadoutDirection.horizontal,
      hug: true,
      hasAdvice: false,
      hasSrc: false,
      hasLeadingIcon: false,
      value: '123',
      setpointValue: '100',
      label: 'HDG',
      unit: 'DEG',
      alertState: ReadoutAlertState.none,
    };

    const sections: ReadoutShowcaseSection[] = variants.map((variant) => {
      const cases: ReadoutShowcaseCase[] = inputStyles.flatMap(
        (readoutInputStyle): ReadoutShowcaseCase[] => {
          if (readoutInputStyle === ReadoutInputStyle.hidden) {
            return [
              {
                label: `${variant} / input=hidden`,
                args: {
                  ...baseArgs,
                  variant,
                  hasInput: false,
                  readoutInputStyle,
                  inputInteraction: ReadoutInputInteraction.alwaysVisible,
                },
              },
            ];
          }

          return interactions.map((inputInteraction) => ({
            label: `${variant} / input=${readoutInputStyle} / ${inputInteraction}`,
            args: {
              ...baseArgs,
              variant,
              hasInput: true,
              readoutInputStyle,
              inputInteraction,
            },
          }));
        }
      );

      return {
        title:
          variant === ReadoutVariant.regular
            ? 'Variant: Regular'
            : variant === ReadoutVariant.enhanced
              ? 'Variant: Enhanced'
              : 'Variant: Stack',
        cases,
      };
    });

    return renderReadoutSectionsShowcase(sections);
  },
};

export const AlertStateShowcase: Story = {
  name: 'Alert State Showcase',
  decorators: [longPageDecorator],
  render: () => {
    const alertStates = Object.values(ReadoutAlertState) as ReadoutAlertState[];

    const cases: ReadoutShowcaseCase[] = alertStates.map((alertState) => ({
      label: `alertState = ${alertState}`,
      args: {
        variant: ReadoutVariant.regular,
        direction: ReadoutDirection.vertical,
        hug: false,
        hasInput: true,
        readoutInputStyle: ReadoutInputStyle.regular,
        inputInteraction: ReadoutInputInteraction.alwaysVisible,
        alertState,
        value: '100',
        setpointValue: 123,
      },
    }));

    return renderReadoutSectionsShowcase([
      {
        title: 'Alert State Showcase',
        cases,
      },
    ]);
  },
};

export const InputInteractionSetpointReached: Story = {
  name: 'Input Interaction / Setpoint Reached',
  decorators: [longPageDecorator],
  render: () =>
    renderReadoutSectionsShowcase([
      {
        title: 'Input Interaction / Setpoint Reached',
        cases: [
          {
            label: 'pop-up / value != setpoint (input visible)',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hug: false,
              hasInput: true,
              readoutInputStyle: ReadoutInputStyle.regular,
              inputInteraction: ReadoutInputInteraction.popUp,
              value: '123',
              setpointValue: '100',
              label: 'HDG',
              unit: 'DEG',
              hasAdvice: false,
              hasSrc: false,
            },
          },
          {
            label: 'pop-up / value == setpoint (input hidden)',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hug: false,
              hasInput: true,
              readoutInputStyle: ReadoutInputStyle.regular,
              inputInteraction: ReadoutInputInteraction.popUp,
              value: '100',
              setpointValue: '100',
              label: 'HDG',
              unit: 'DEG',
              hasAdvice: false,
              hasSrc: false,
            },
          },
          {
            label:
              'flip-flop / value != setpoint (input visible, value smaller)',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hug: false,
              hasInput: true,
              readoutInputStyle: ReadoutInputStyle.regular,
              inputInteraction: ReadoutInputInteraction.flipFlop,
              value: '123',
              setpointValue: '100',
              label: 'HDG',
              unit: 'DEG',
              hasAdvice: false,
              hasSrc: false,
            },
          },
          {
            label: 'flip-flop / value == setpoint (input hidden, value normal)',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hug: false,
              hasInput: true,
              readoutInputStyle: ReadoutInputStyle.regular,
              inputInteraction: ReadoutInputInteraction.flipFlop,
              value: '100',
              setpointValue: '100',
              label: 'HDG',
              unit: 'DEG',
              hasAdvice: false,
              hasSrc: false,
            },
          },
          {
            label: 'always-visible / value == setpoint (input still visible)',
            args: {
              variant: ReadoutVariant.regular,
              direction: ReadoutDirection.vertical,
              hug: false,
              hasInput: true,
              readoutInputStyle: ReadoutInputStyle.regular,
              inputInteraction: ReadoutInputInteraction.alwaysVisible,
              value: '100',
              setpointValue: '100',
              label: 'HDG',
              unit: 'DEG',
              hasAdvice: false,
              hasSrc: false,
            },
          },
        ],
      },
    ]),
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
              hug: false,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLeadingIcon: true,
              hug: false,
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
              hug: false,
            },
          },
          {
            label: 'Value/Input/Advice Numeric (fractionDigits=1)',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasAdvice: true,
              value: '12.3',
              inputValue: 12.3,
              adviceValue: 12.3,
              fractionDigits: 1,
              hug: false,
            },
          },
          {
            label: 'Global Degree + fractionDigits=1 (numbers)',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasAdvice: true,
              value: '123',
              inputValue: '123',
              adviceValue: '123',
              hasDegree: true,
              fractionDigits: 1,
              hug: false,
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
              hug: false,
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
              hug: false,
            },
          },
          {
            label: 'Global Degree (advice active)',
            args: {
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasDegree: true,
              adviceState: ReadoutAdviceState.active,
            },
          },
          {
            label: 'Input Baseline',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.baseline,
              hug: false,
            },
          },
          {
            label: 'Input Button',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.button,
              hug: false,
            },
          },
          {
            label: 'Input Description',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.description,
              inputDescription: 'SET',
              hug: false,
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
              hug: false,
            },
          },
          {
            label: 'Input Vertical Stack',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.verticalStack,
              inputDescription: 'SET',
              hug: false,
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
              hug: false,
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
              hug: false,
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
              hug: false,
            },
          },
          {
            label: 'Source Flyout',
            args: {
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasSrc: true,
              sourceType: ReadoutSourceType.flyout,
              hug: false,
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
              hug: false,
            },
          },
          {
            label: 'Advice + Input',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
              hug: false,
            },
          },
          {
            label: 'Leading Icon',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasLeadingIcon: true,
              hug: false,
            },
          },
        ],
      },
      {
        title: 'Enhanced / Vertical — Input Formats',
        cases: [
          {
            label: 'Readout Input Style: enhanced (planned)',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.regular,
              readoutInputStyle: ReadoutInputStyle.enhanced,
              hug: false,
            },
          },
          {
            label: 'Input Baseline',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              inputFormat: ReadoutInputFormat.baseline,
              hug: false,
            },
          },
          {
            label: 'Global Degree (input)',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasDegree: true,
              inputInteractionMode: ReadoutInputMode.input,
              hug: false,
            },
          },
          {
            label: 'Global Degree (input, temporary)',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.vertical,
              hasInput: true,
              hasDegree: true,
              inputInteractionMode: ReadoutInputMode.inputTemporary,
              hug: false,
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
              hug: false,
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
              hug: false,
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
              hug: false,
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
              hug: false,
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
            label: 'Global Degree (input)',
            args: {
              variant: ReadoutVariant.enhanced,
              direction: ReadoutDirection.horizontal,
              hasInput: true,
              hasInputDivider: true,
              hasDegree: true,
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
              hug: false,
            },
          },
          {
            label: 'Advice + Input',
            args: {
              variant: ReadoutVariant.stack,
              direction: ReadoutDirection.vertical,
              hasAdvice: true,
              hasInput: true,
              hug: false,
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
              hug: false,
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
              hug: false,
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
              hug: false,
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
              hug: false,
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

export const StackVerticalAlignment: Story = {
  name: 'Stack Vertical / Alignment',
  decorators: [longPageDecorator],
  render: () => {
    const baseArgs: Partial<ReadoutStoryArgs> = {
      variant: ReadoutVariant.stack,
      direction: ReadoutDirection.vertical,
      readoutInputStyle: ReadoutInputStyle.regular,
      inputInteraction: ReadoutInputInteraction.alwaysVisible,
      hasInput: true,
      value: '123',
      setpointValue: '100',
      label: 'HDG',
      unit: 'DEG',
      hasAdvice: false,
      hasSrc: false,
    };

    const alignments = [
      ReadoutStackVerticalAlignment.left,
      ReadoutStackVerticalAlignment.center,
      ReadoutStackVerticalAlignment.vertical,
    ] as const;

    const alwaysVisibleCases: ReadoutShowcaseCase[] = alignments.map(
      (alignment) => ({
        label: `stack / vertical / alignment=${alignment}`,
        args: {
          ...baseArgs,
          alignment,
          inputInteraction: ReadoutInputInteraction.alwaysVisible,
        },
      })
    );

    const popUpCases: ReadoutShowcaseCase[] = alignments.map((alignment) => ({
      label: `stack / vertical / pop-up / alignment=${alignment}`,
      args: {
        ...baseArgs,
        alignment,
        inputInteraction: ReadoutInputInteraction.popUp,
      },
    }));

    return renderReadoutSectionsShowcase([
      {
        title: 'Always Visible',
        cases: alwaysVisibleCases,
      },
      {
        title: 'Pop-up',
        cases: popUpCases,
      },
    ]);
  },
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
