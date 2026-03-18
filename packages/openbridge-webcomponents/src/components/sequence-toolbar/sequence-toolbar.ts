import {LitElement, html, nothing, TemplateResult, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import style from './sequence-toolbar.css?inline';
import {
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from '../sequence-step/sequence-step.js';
import '../sequence-step/sequence-step.js';
import '../../icons/icon-chevron-left-google.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-up-iec.js';

export enum SequenceToolbarType {
  unordered = 'unordered',
  condensed = 'condensed',
  sequential = 'sequential',
}

/**
 * `<obc-sequence-toolbar>` – Layout wrapper for sequence navigation steps.
 *
 * ### Overview
 * A compact container for sequence navigation (stepper, wizard bar, progress
 * step bar) that arranges `obc-sequence-step` items with built-in start/end
 * controls and an optional add button.
 *
 * ### Features / Variants
 * - **Unordered:** Start/end controls with a free-form center list.
 * - **Sequential:** Start/end controls with sequential step items.
 * - **Condensed:** Icon controls with current/total labels.
 * - **Optional Add:** `hasAdd` shows an add button (not shown in sequential).
 *
 * ### Usage Guidelines
 * - Use for step navigation, progress through a flow, or quick step access.
 * - Provide your steps in the default slot (`obc-sequence-step` items).
 * - Override start/end text via the `start`/`end` slots when needed.
 *
 * ### Slots / Content
 * - Default slot: step items rendered in the toolbar center.
 * - `start`/`end` slots: **text/content only** for the built-in controls.
 * - `condensed-current`/`condensed-total`: labels for condensed mode.
 *
 * ### Events
 * - `prev-click`: Fired when the built-in Previous control is clicked.
 * - `next-click`: Fired when the built-in Next control is clicked.
 * - `add-click`: Fired when the built-in Add control is clicked.
 *
 * ### Best Practices & Constraints
 * - The start/end controls are built-in; you can only change their content.
 * - Condensed mode does not accept start/end slots (only current/total).
 * - `hasAdd` is ignored when `type="sequential"`.
 * - Keep step labels short for compact layouts.
 * - Use `condensed` when space is limited.
 * - Do not try to replace the start/end controls with custom components.
 * - Do not rely on `hasAdd` in sequential mode.
 *
 * ### Example
 * ```html
 * <obc-sequence-toolbar type="sequential">
 *   <obc-sequence-step value="completed">1</obc-sequence-step>
 *   <obc-sequence-step value="completed">2</obc-sequence-step>
 *   <obc-sequence-step value="active">3</obc-sequence-step>
 *   <obc-sequence-step value="not-started">4</obc-sequence-step>
 * </obc-sequence-toolbar>
 * ```
 *
 * @slot - Step items rendered in the toolbar center.
 * @slot start - Content for the built-in start control label.
 * @slot end - Content for the built-in end control label.
 * @slot condensed-current - Current step label for condensed mode.
 * @slot condensed-total - Total steps label for condensed mode.
 *
 * @fires prev-click
 * @fires next-click
 * @fires add-click
 */
@customElement('obc-sequence-toolbar')
export class ObcSequenceToolbar extends LitElement {
  @property({type: String, reflect: true}) type: SequenceToolbarType =
    SequenceToolbarType.unordered;
  @property({type: Boolean}) hasAdd = false;

  static override styles = unsafeCSS(style);

  private onPrevClick = () =>
    this.dispatchEvent(
      new CustomEvent('prev-click', {bubbles: true, composed: true})
    );

  private onNextClick = () =>
    this.dispatchEvent(
      new CustomEvent('next-click', {bubbles: true, composed: true})
    );

  private onAddClick = () =>
    this.dispatchEvent(
      new CustomEvent('add-click', {bubbles: true, composed: true})
    );

  private renderAddButton(): TemplateResult {
    return html`
      <obc-sequence-step
        class="add-button"
        variant="toolbar-add"
        aria-label="Add step"
        .type=${SequenceType.large}
        .styleType=${SequenceStyle.point}
        .value=${SequenceValue.notStarted}
        .showStepInputConnector=${false}
        .showStepOutputConnector=${false}
        .hasIcon=${false}
        @click=${this.onAddClick}
      >
        <obi-up-iec></obi-up-iec>
      </obc-sequence-step>
    `;
  }

  private renderSequentialLayout(): TemplateResult {
    return html`
      <div class="sequence-step-item">
        <obc-sequence-step
          class="edge-button edge-button--outline"
          variant="toolbar-prev"
          .type=${SequenceType.large}
          .styleType=${SequenceStyle.regular}
          .value=${SequenceValue.notStarted}
          .showStepInputConnector=${false}
          .showStepOutputConnector=${false}
          .hasIcon=${false}
          @click=${this.onPrevClick}
        >
          <slot name="start">Previous</slot>
        </obc-sequence-step>
      </div>
      <div class="step-container" role="list">
        <slot></slot>
      </div>
      <div class="sequence-step-item">
        <obc-sequence-step
          class="edge-button"
          .type=${SequenceType.large}
          .styleType=${SequenceStyle.point}
          .value=${SequenceValue.completed}
          .showStepInputConnector=${false}
          .showStepOutputConnector=${false}
          .hasIcon=${false}
          @click=${this.onNextClick}
        >
          <slot name="end">Next</slot>
        </obc-sequence-step>
      </div>
    `;
  }

  private renderUnorderedLayout(showAddButton: boolean): TemplateResult {
    return html`
      <div class="sequence-step-item">
        <obc-sequence-step
          class="edge-button edge-button--outline"
          .type=${SequenceType.large}
          .styleType=${SequenceStyle.regular}
          .value=${SequenceValue.notStarted}
          .showStepInputConnector=${false}
          .showStepOutputConnector=${false}
          .hasIcon=${false}
          @click=${this.onPrevClick}
        >
          <slot name="start">Previous</slot>
        </obc-sequence-step>
      </div>
      <div class="step-container" role="list">
        <slot></slot>
        ${showAddButton ? this.renderAddButton() : nothing}
      </div>
      <div class="sequence-step-item">
        <obc-sequence-step
          class="edge-button edge-button--outline"
          .type=${SequenceType.large}
          .styleType=${SequenceStyle.point}
          .value=${SequenceValue.notStarted}
          .showStepInputConnector=${false}
          .showStepOutputConnector=${false}
          .hasIcon=${false}
          @click=${this.onNextClick}
        >
          <slot name="end">Next</slot>
        </obc-sequence-step>
      </div>
    `;
  }

  private renderCondensedLayout(showAddButton: boolean): TemplateResult {
    return html`
      <div class="condensed-control condensed-start">
        <obc-sequence-step
          class="condensed-icon"
          variant="toolbar-condensed-icon"
          .type=${SequenceType.large}
          .styleType=${SequenceStyle.point}
          .value=${SequenceValue.notStarted}
          .showStepInputConnector=${false}
          .showStepOutputConnector=${false}
          .hasIcon=${false}
          aria-label="Previous"
          @click=${this.onPrevClick}
        >
          <obi-chevron-left-google></obi-chevron-left-google>
        </obc-sequence-step>
      </div>
      <obc-sequence-step
        class="condensed-label"
        .type=${SequenceType.large}
        .styleType=${SequenceStyle.regular}
        .value=${SequenceValue.notStarted}
        .showStepInputConnector=${false}
        .showStepOutputConnector=${false}
        .hasIcon=${false}
      >
        <span class="condensed-label__current">
          <slot name="condensed-current">2</slot>
        </span>
        <span class="condensed-label__divider"> / </span>
        <span class="condensed-label__total">
          <slot name="condensed-total">4</slot>
        </span>
      </obc-sequence-step>
      ${showAddButton ? this.renderAddButton() : nothing}
      <div class="condensed-control condensed-end">
        <obc-sequence-step
          class="condensed-icon"
          variant="toolbar-condensed-icon"
          .type=${SequenceType.large}
          .styleType=${SequenceStyle.point}
          .value=${SequenceValue.notStarted}
          .showStepInputConnector=${false}
          .showStepOutputConnector=${false}
          .hasIcon=${false}
          aria-label="Next"
          @click=${this.onNextClick}
        >
          <obi-chevron-right-google></obi-chevron-right-google>
        </obc-sequence-step>
      </div>
    `;
  }

  override render(): TemplateResult {
    const showAddButton =
      this.hasAdd && this.type !== SequenceToolbarType.sequential;
    const classes = classMap({
      'sequence-toolbar': true,
      [`type-${this.type}`]: true,
    });

    let content: TemplateResult;
    switch (this.type) {
      case SequenceToolbarType.condensed:
        content = this.renderCondensedLayout(showAddButton);
        break;
      case SequenceToolbarType.sequential:
        content = this.renderSequentialLayout();
        break;
      case SequenceToolbarType.unordered:
      default:
        content = this.renderUnorderedLayout(showAddButton);
        break;
    }

    return html`<div class=${classes}>${content}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-toolbar': ObcSequenceToolbar;
  }
}
