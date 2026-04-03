import {html, nothing} from 'lit';
import type {TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import '../../components/button/button.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-delta.js';
import '../../icons/icon-drop-down-google.js';
import '../../icons/icon-placeholder.js';
import type {
  ReadoutDirection as ReadoutPresentationDirection,
  ReadoutType as ReadoutPresentationType,
} from './readout.js';

export enum ReadoutSourceType {
  small = 'small',
  regular = 'regular',
  delta = 'delta',
  flyout = 'flyout',
}

export function supportsReadoutSourcePicker(sourceType: ReadoutSourceType) {
  return (
    sourceType === ReadoutSourceType.small ||
    sourceType === ReadoutSourceType.regular
  );
}

type ReadoutSourceRenderOptions = {
  hasSrc: boolean;
  hasSrcPicker: boolean;
  src: string;
  sourceDeltaValue: string;
  sourceType: ReadoutSourceType;
  readoutType: ReadoutPresentationType;
  readoutDirection: ReadoutPresentationDirection;
  sourceHug: boolean;
  hasSourceLeadingIcon: boolean;
  hasSourceTrailingIcon: boolean;
  onTogglePicker: () => void;
};

function renderSourceLeadingIcon(
  sourceType: ReadoutSourceType,
  hasSourceLeadingIcon: boolean
) {
  if (!hasSourceLeadingIcon && sourceType !== ReadoutSourceType.delta) {
    return nothing;
  }

  return sourceType === ReadoutSourceType.delta
    ? html`<obi-delta class="source-leading-icon"></obi-delta>`
    : html`<obi-placeholder class="source-leading-icon"></obi-placeholder>`;
}

function renderSourceLeadingIconSlot(
  sourceType: ReadoutSourceType,
  hasSourceLeadingIcon: boolean
) {
  if (!hasSourceLeadingIcon && sourceType !== ReadoutSourceType.delta) {
    return nothing;
  }

  return sourceType === ReadoutSourceType.delta
    ? html`<obi-delta
        slot="leading-icon"
        class="source-leading-icon"
      ></obi-delta>`
    : html`<obi-placeholder
        slot="leading-icon"
        class="source-leading-icon"
      ></obi-placeholder>`;
}

function renderSourceTrailingIcon(
  sourceType: ReadoutSourceType,
  hasSourceTrailingIcon: boolean
) {
  if (!hasSourceTrailingIcon) {
    return nothing;
  }

  return sourceType === ReadoutSourceType.flyout
    ? html`<obi-chevron-right-google
        class="source-icon"
      ></obi-chevron-right-google>`
    : html`<obi-drop-down-google class="source-icon"></obi-drop-down-google>`;
}

function renderSourceTrailingIconSlot(
  sourceType: ReadoutSourceType,
  hasSourceTrailingIcon: boolean
) {
  if (!hasSourceTrailingIcon) {
    return nothing;
  }

  return sourceType === ReadoutSourceType.flyout
    ? html`<obi-chevron-right-google
        slot="trailing-icon"
        class="source-icon"
      ></obi-chevron-right-google>`
    : html`<obi-drop-down-google
        slot="trailing-icon"
        class="source-icon"
      ></obi-drop-down-google>`;
}

function renderSourceText(
  sourceType: ReadoutSourceType,
  src: string,
  sourceDeltaValue: string
) {
  if (sourceType === ReadoutSourceType.delta) {
    return html`
      ${sourceDeltaValue
        ? html`<span class="source-delta-value">${sourceDeltaValue}</span>`
        : nothing}
      <span class="source">${src}</span>
    `;
  }

  return html`<span class="source">${src}</span>`;
}

export function renderReadoutSource({
  hasSrc,
  hasSrcPicker,
  src,
  sourceDeltaValue,
  sourceType,
  readoutType,
  readoutDirection,
  sourceHug,
  hasSourceLeadingIcon,
  hasSourceTrailingIcon,
  onTogglePicker,
}: ReadoutSourceRenderOptions): TemplateResult | typeof nothing {
  if (!hasSrc) {
    return nothing;
  }

  const supportsPicker = supportsReadoutSourcePicker(sourceType);
  const showSourcePicker = supportsPicker && hasSrcPicker;
  const showLeadingIcon =
    sourceType === ReadoutSourceType.delta ||
    (sourceType !== ReadoutSourceType.flyout && hasSourceLeadingIcon);
  const showTrailingIcon =
    sourceType === ReadoutSourceType.flyout ||
    (sourceType !== ReadoutSourceType.delta &&
      (supportsPicker
        ? showSourcePicker && hasSourceTrailingIcon
        : hasSourceTrailingIcon));

  const sourceClasses = {
    'source-container': true,
    'source-type-regular': sourceType === ReadoutSourceType.regular,
    'source-type-delta': sourceType === ReadoutSourceType.delta,
    'source-type-flyout': sourceType === ReadoutSourceType.flyout,
    'source-enhanced': readoutType === 'enhanced',
    'source-stack': readoutType === 'stack',
    'source-horizontal': readoutDirection === 'horizontal',
    'source-vertical': readoutDirection === 'vertical',
    'no-hug': !sourceHug,
  };
  const sourceContentClasses = {
    'source-content': true,
    'has-leading-icon': showLeadingIcon,
    'has-trailing-icon': showTrailingIcon,
  };
  const sourcePickerClasses = {
    'source-picker': true,
    'has-leading-icon': showLeadingIcon,
    'has-trailing-icon': showTrailingIcon,
  };
  const sourceWrapperClasses = {
    'readout-segment-wrapper': true,
    'readout-source-wrapper': true,
    'source-small': sourceType === ReadoutSourceType.small,
    'has-trailing-icon': showTrailingIcon,
  };

  if (showSourcePicker) {
    return html`
      <div class=${classMap(sourceWrapperClasses)} part="source-wrapper">
        <div class=${classMap(sourceClasses)} part="source-container">
          <slot name="source">
            <obc-button
              variant="flat"
              .fullWidth=${true}
              ?showLeadingIcon=${showLeadingIcon}
              ?showTrailingIcon=${showTrailingIcon}
              class=${classMap(sourcePickerClasses)}
              @click=${onTogglePicker}
            >
              ${renderSourceLeadingIconSlot(sourceType, showLeadingIcon)}
              ${renderSourceText(sourceType, src, sourceDeltaValue)}
              ${renderSourceTrailingIconSlot(sourceType, showTrailingIcon)}
            </obc-button>
          </slot>
        </div>
      </div>
    `;
  }

  return html`
    <div class=${classMap(sourceWrapperClasses)} part="source-wrapper">
      <div class=${classMap(sourceClasses)} part="source-container">
        <slot name="source">
          <span class=${classMap(sourceContentClasses)}>
            ${renderSourceLeadingIcon(sourceType, showLeadingIcon)}
            ${renderSourceText(sourceType, src, sourceDeltaValue)}
            ${renderSourceTrailingIcon(sourceType, showTrailingIcon)}
          </span>
        </slot>
      </div>
    </div>
  `;
}
