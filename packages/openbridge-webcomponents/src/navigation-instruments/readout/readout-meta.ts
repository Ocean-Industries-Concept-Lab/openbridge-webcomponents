import {html} from 'lit';
import type {TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {formatTextSegment} from './readout-formatters.js';

type ReadoutTextContainerRenderOptions = {
  value: string;
  className: 'label' | 'unit';
  slotName: 'label' | 'unit';
  partName: 'label-container' | 'unit-container';
  hasFixedLength: boolean;
  lengthTemplate: string;
};

type ReadoutMetaZoneRenderOptions = {
  labelValue: string;
  unitValue: string;
  hasLabelFixedLength: boolean;
  labelLength: string;
  hasUnitFixedLength: boolean;
  unitLength: string;
};

function renderTextContainer({
  value,
  className,
  slotName,
  partName,
  hasFixedLength,
  lengthTemplate,
}: ReadoutTextContainerRenderOptions): TemplateResult {
  const textSegment = formatTextSegment(value, hasFixedLength, lengthTemplate);
  const templateLength = textSegment.widthTemplate.length;

  return html`
    <div class="${className}-container" part=${partName}>
      <slot name=${slotName}>
        <span
          class=${classMap({
            [className]: true,
            'fixed-length': hasFixedLength,
          })}
          style=${templateLength > 0
            ? `--obc-readout-text-fixed-ch:${templateLength};`
            : ''}
        >
          ${textSegment.visibleValue}
        </span>
      </slot>
    </div>
  `;
}

function renderReadoutLabelContainer(
  value: string,
  hasFixedLength: boolean,
  lengthTemplate: string
): TemplateResult {
  return renderTextContainer({
    value,
    className: 'label',
    slotName: 'label',
    partName: 'label-container',
    hasFixedLength,
    lengthTemplate,
  });
}

function renderReadoutUnitContainer(
  value: string,
  hasFixedLength: boolean,
  lengthTemplate: string
): TemplateResult {
  return renderTextContainer({
    value,
    className: 'unit',
    slotName: 'unit',
    partName: 'unit-container',
    hasFixedLength,
    lengthTemplate,
  });
}

export function renderReadoutMetaZone({
  labelValue,
  unitValue,
  hasLabelFixedLength,
  labelLength,
  hasUnitFixedLength,
  unitLength,
}: ReadoutMetaZoneRenderOptions): TemplateResult {
  return html`
    <div
      class="readout-segment-wrapper readout-meta-wrapper"
      part="meta-wrapper"
    >
      <div
        class="instrument-label-unit-container"
        part="instrument-label-unit-container"
      >
        ${renderReadoutLabelContainer(
          labelValue,
          hasLabelFixedLength,
          labelLength
        )}
        ${renderReadoutUnitContainer(unitValue, hasUnitFixedLength, unitLength)}
      </div>
    </div>
  `;
}

export function renderReadoutLabelZone(
  value: string,
  hasFixedLength: boolean,
  lengthTemplate: string
): TemplateResult {
  return html`
    <div
      class="readout-segment-wrapper readout-label-wrapper"
      part="label-wrapper"
    >
      ${renderReadoutLabelContainer(value, hasFixedLength, lengthTemplate)}
    </div>
  `;
}

export function renderReadoutUnitZone(
  value: string,
  hasFixedLength: boolean,
  lengthTemplate: string
): TemplateResult {
  return html`
    <div
      class="readout-segment-wrapper readout-unit-wrapper"
      part="unit-wrapper"
    >
      ${renderReadoutUnitContainer(value, hasFixedLength, lengthTemplate)}
    </div>
  `;
}
