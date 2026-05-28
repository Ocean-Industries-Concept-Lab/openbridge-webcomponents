import {html, nothing} from 'lit';
import type {TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';

type ReadoutTextContainerRenderOptions = {
  value: string;
  className: 'label' | 'unit';
  slotName: 'label' | 'unit';
  partName: 'label-container' | 'unit-container';
};

type ReadoutMetaZoneRenderOptions = {
  labelValue: string | undefined;
  unitValue: string | undefined;
  priorityEnhanced?: boolean;
};

function renderTextContainer({
  value,
  className,
  slotName,
  partName,
}: ReadoutTextContainerRenderOptions): TemplateResult {
  return html`
    <div class="${className}-container" part=${partName}>
      <slot name=${slotName}>
        <span
          class=${classMap({
            [className]: true,
          })}
        >
          ${value}
        </span>
      </slot>
    </div>
  `;
}

function renderReadoutLabelContainer(value: string): TemplateResult {
  return renderTextContainer({
    value,
    className: 'label',
    slotName: 'label',
    partName: 'label-container',
  });
}

function renderReadoutUnitContainer(value: string): TemplateResult {
  return renderTextContainer({
    value,
    className: 'unit',
    slotName: 'unit',
    partName: 'unit-container',
  });
}

export function renderReadoutMetaZone({
  labelValue,
  unitValue,
  priorityEnhanced,
}: ReadoutMetaZoneRenderOptions): TemplateResult {
  return html`
    <div
      class=${classMap({
        'readout-segment-wrapper': true,
        'readout-meta-wrapper': true,
        'priority-enhanced': Boolean(priorityEnhanced),
      })}
      part="meta-wrapper"
    >
      <div
        class="instrument-label-unit-container"
        part="instrument-label-unit-container"
      >
        ${labelValue ? renderReadoutLabelContainer(labelValue) : nothing}
        ${unitValue ? renderReadoutUnitContainer(unitValue) : nothing}
      </div>
    </div>
  `;
}

export function renderReadoutLabelZone(value: string): TemplateResult {
  return html`
    <div
      class="readout-segment-wrapper readout-label-wrapper"
      part="label-wrapper"
    >
      ${renderReadoutLabelContainer(value)}
    </div>
  `;
}

export function renderReadoutUnitZone(value: string): TemplateResult {
  return html`
    <div
      class="readout-segment-wrapper readout-unit-wrapper"
      part="unit-wrapper"
    >
      ${renderReadoutUnitContainer(value)}
    </div>
  `;
}
