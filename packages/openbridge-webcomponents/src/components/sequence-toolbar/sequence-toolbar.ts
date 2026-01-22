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

export enum SequenceToolbarType {
  unordered = 'unordered',
  condensed = 'condensed',
  sequential = 'sequential',
}

/**
 * `<obc-sequence-toolbar>` – Layout wrapper for sequence navigation steps.
 *
 * @slot - Step items rendered in the toolbar center.
 * @slot start - Start control (Intro/Previous button). Uses defaults when empty.
 * @slot end - End control (Summary/Next button). Uses defaults when empty.
 * @slot condensed-current - Current step label for condensed mode.
 * @slot condensed-total - Total steps label for condensed mode.
 * @slot add - Optional add control shown when `hasAdd` is true.
 *
 * ## Internal styling
 * When `type="sequential"`, the toolbar will set `variant="toolbar-prev"` on the
 * element in the `start` slot (if it does not already have a `variant`).
 * This is used to apply the normal-enabled background for the Previous button.
 * If you want full control over styling, provide your own `variant` on the slotted
 * `obc-sequence-step` and the toolbar will not overwrite it.
 *
 * When `type="condensed"`, the toolbar will set `variant="toolbar-condensed-icon"`
 * on elements in the `start` and `end` slots (if they do not already have a `variant`).
 * Provide your own `variant` to opt out of the default styling.
 *
 * ## Events
 * - `prev-click`: Fired when the default Previous control is clicked
 *   (sequential/condensed).
 * - `next-click`: Fired when the default Next control is clicked
 *   (sequential/condensed).
 * - `add-click`: Fired when the default Add control is clicked.
 *
 * @fires prev-click
 * @fires next-click
 * @fires add-click
 */
@customElement('obc-sequence-toolbar')
export class ObcSequenceToolbar extends LitElement {
  @property({type: String, reflect: true}) type: SequenceToolbarType =
    SequenceToolbarType.unordered;
  /** Ignored when `type` is `sequential`. */
  @property({type: Boolean, attribute: 'has-add'}) hasAdd = false;

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

  private handleSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement | null;
    if (!slot?.assignedElements) {
      this.applyStepStyles();
      return;
    }

    const hasSequenceStep = slot
      .assignedElements({flatten: true})
      .some(
        (el) =>
          el.tagName === 'OBC-SEQUENCE-STEP' ||
          !!el.querySelector?.('obc-sequence-step')
      );

    if (hasSequenceStep) {
      this.applyStepStyles();
    }
  };

  private get showAddButton(): boolean {
    return this.hasAdd && this.type !== SequenceToolbarType.sequential;
  }

  override willUpdate(): void {
    if (this.type === SequenceToolbarType.sequential && this.hasAdd) {
      this.hasAdd = false;
    }
  }

  override updated(): void {
    this.applyStepStyles();
  }

  private applyStepStyles(): void {
    const allSteps = new Set<HTMLElement>([
      ...this.querySelectorAll<HTMLElement>('obc-sequence-step'),
      ...Array.from(
        this.renderRoot?.querySelectorAll<HTMLElement>('obc-sequence-step') ??
          []
      ),
    ]);

    allSteps.forEach((step) => {
      if (step.hasAttribute('data-toolbar-variant')) {
        step.removeAttribute('variant');
        step.removeAttribute('data-toolbar-variant');
      }
      if (step.hasAttribute('data-toolbar-click')) {
        const clickType = step.getAttribute('data-toolbar-click');
        if (clickType === 'prev') {
          step.removeEventListener('click', this.onPrevClick);
        } else if (clickType === 'next') {
          step.removeEventListener('click', this.onNextClick);
        } else if (clickType === 'add') {
          step.removeEventListener('click', this.onAddClick);
        }
        step.removeAttribute('data-toolbar-click');
      }
    });

    if (this.type === SequenceToolbarType.condensed) {
      this.querySelectorAll('obc-sequence-step.condensed-icon').forEach(
        (step) => {
          if (!step.getAttribute('variant')) {
            step.setAttribute('variant', 'toolbar-condensed-icon');
            step.setAttribute('data-toolbar-variant', 'toolbar-condensed-icon');
          }
        }
      );

      this.querySelectorAll('obc-sequence-step[slot="start"]').forEach(
        (step) => {
          step.addEventListener('click', this.onPrevClick);
          step.setAttribute('data-toolbar-click', 'prev');
        }
      );

      this.querySelectorAll('obc-sequence-step[slot="end"]').forEach((step) => {
        step.addEventListener('click', this.onNextClick);
        step.setAttribute('data-toolbar-click', 'next');
      });
    }

    const addSteps = new Set<HTMLElement>([
      ...this.querySelectorAll<HTMLElement>(
        'obc-sequence-step[slot="add"], obc-sequence-step.add-button'
      ),
      ...Array.from(
        this.renderRoot?.querySelectorAll<HTMLElement>(
          'obc-sequence-step[slot="add"], obc-sequence-step.add-button'
        ) ?? []
      ),
    ]);

    addSteps.forEach((step) => {
      if (!step.getAttribute('variant')) {
        step.setAttribute('variant', 'toolbar-add');
        step.setAttribute('data-toolbar-variant', 'toolbar-add');
      }
      if (step.classList.contains('add-button')) {
        step.addEventListener('click', this.onAddClick);
        step.setAttribute('data-toolbar-click', 'add');
      }
    });

    if (this.type === SequenceToolbarType.sequential) {
      this.querySelectorAll('obc-sequence-step[slot="start"]').forEach(
        (step) => {
          if (!step.getAttribute('variant')) {
            step.setAttribute('variant', 'toolbar-prev');
            step.setAttribute('data-toolbar-variant', 'toolbar-prev');
          }
        }
      );
    }
  }

  private renderAddButton(): TemplateResult {
    return html`
      <obc-sequence-step
        class="add-button"
        .type=${SequenceType.large}
        .styleType=${SequenceStyle.point}
        .value=${SequenceValue.notStarted}
        .hideStepInputConnector=${true}
        .hideStepOutputConnector=${true}
        .hasIcon=${false}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M11 5H13V11H19V13H13V19H11V13H5V11H11V5Z" />
        </svg>
      </obc-sequence-step>
    `;
  }

  private renderSequentialLayout(): TemplateResult {
    return html`
      <div class="sequence-step-item">
        <slot name="start" @slotchange=${this.handleSlotChange}>
          <obc-sequence-step
            class="edge-button edge-button--outline"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.regular}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
            @click=${this.onPrevClick}
          >
            Previous
          </obc-sequence-step>
        </slot>
      </div>
      <div class="step-container" role="list">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
      <div class="sequence-step-item">
        <slot name="end" @slotchange=${this.handleSlotChange}>
          <obc-sequence-step
            class="edge-button"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.point}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
            @click=${this.onNextClick}
          >
            Next
          </obc-sequence-step>
        </slot>
      </div>
    `;
  }

  private renderUnorderedLayout(): TemplateResult {
    return html`
      <div class="sequence-step-item">
        <slot name="start" @slotchange=${this.handleSlotChange}>
          <obc-sequence-step
            class="edge-button edge-button--outline"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.regular}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
          >
            Intro
          </obc-sequence-step>
        </slot>
      </div>
      <div class="step-container" role="list">
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.showAddButton
          ? html`<slot name="add" @slotchange=${this.handleSlotChange}
              >${this.renderAddButton()}</slot
            >`
          : nothing}
      </div>
      <div class="sequence-step-item">
        <slot name="end" @slotchange=${this.handleSlotChange}>
          <obc-sequence-step
            class="edge-button edge-button--outline"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.point}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
          >
            Summary
          </obc-sequence-step>
        </slot>
      </div>
    `;
  }

  private renderCondensedLayout(): TemplateResult {
    return html`
      <div class="condensed-control condensed-start">
        <slot name="start" @slotchange=${this.handleSlotChange}>
          <obc-sequence-step
            class="condensed-icon"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.point}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
            aria-label="Previous"
            @click=${this.onPrevClick}
          >
            <obi-chevron-left-google></obi-chevron-left-google>
          </obc-sequence-step>
        </slot>
      </div>
      <obc-sequence-step
        class="condensed-label"
        .type=${SequenceType.large}
        .styleType=${SequenceStyle.regular}
        .value=${SequenceValue.notStarted}
        .hideStepInputConnector=${true}
        .hideStepOutputConnector=${true}
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
      ${this.showAddButton
        ? html`<slot name="add" @slotchange=${this.handleSlotChange}
            >${this.renderAddButton()}</slot
          >`
        : nothing}
      <div class="condensed-control condensed-end">
        <slot name="end" @slotchange=${this.handleSlotChange}>
          <obc-sequence-step
            class="condensed-icon"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.point}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
            aria-label="Next"
            @click=${this.onNextClick}
          >
            <obi-chevron-right-google></obi-chevron-right-google>
          </obc-sequence-step>
        </slot>
      </div>
    `;
  }

  override render(): TemplateResult {
    const classes = classMap({
      'sequence-toolbar': true,
      [`type-${this.type}`]: true,
      'has-add': this.showAddButton,
    });

    let content: TemplateResult;
    switch (this.type) {
      case SequenceToolbarType.condensed:
        content = this.renderCondensedLayout();
        break;
      case SequenceToolbarType.sequential:
        content = this.renderSequentialLayout();
        break;
      case SequenceToolbarType.unordered:
      default:
        content = this.renderUnorderedLayout();
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
