import {LitElement, html, unsafeCSS, TemplateResult, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';
import style from './sequence-step.css?inline';

export enum SequenceOrientation {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum SequenceType {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum SequenceStyle {
  regular = 'regular',
  point = 'point',
  connector = 'connector',
}

export enum SequenceValue {
  notStarted = 'not-started',
  loading = 'loading',
  regular = 'regular',
  next = 'next',
  active = 'active',
  completed = 'completed',
}

@customElement('obc-sequence-step')
/**
 * `<obc-sequence-step>` renders the visual node of a sequence diagram.
 * Supports three sizes, multiple styles (regular/point/connector), and can show
 * leading/trailing connectors as well as state-specific icons.
 */
export class ObcSequenceStep extends LitElement {
  @property({type: String}) orientation: SequenceOrientation =
    SequenceOrientation.horizontal;
  @property({type: String}) type: SequenceType = SequenceType.medium;
  @property({type: String}) styleType: SequenceStyle = SequenceStyle.regular;
  @property({type: String}) value: SequenceValue = SequenceValue.regular;
  /** Displays the built-in state icon for medium/large regular steps. */
  @property({type: Boolean}) hasIcon = false;
  /** Shows the leading connector segment. */
  @property({type: Boolean}) hasInputConnector = false;
  /** Shows the trailing connector segment. */
  @property({type: Boolean}) hasOutputConnector = false;
  /**
   * Extends the input connector to match the height/width of multi-line content.
   * Applies only when `hasInputConnector` is true.
   */
  @property({type: Boolean}) inputConnectorExtended = false;

  private get isVertical() {
    return this.orientation === SequenceOrientation.vertical;
  }

  private get showInputConnector() {
    return this.hasInputConnector;
  }

  private get showOutputConnector() {
    return this.hasOutputConnector;
  }

  private get isMediumPoint() {
    return (
      this.type === SequenceType.medium &&
      this.styleType === SequenceStyle.point
    );
  }

  private get isLargePoint() {
    return (
      this.type === SequenceType.large && this.styleType === SequenceStyle.point
    );
  }

  private get isSpecialLoadingConnector(): boolean {
    return (
      this.type === SequenceType.small &&
      (this.value === SequenceValue.loading ||
        this.value === SequenceValue.next ||
        this.value === SequenceValue.active)
    );
  }

  private get shouldShowStateIcon(): boolean {
    return (
      this.hasIcon &&
      this.styleType === SequenceStyle.regular &&
      (this.type === SequenceType.medium || this.type === SequenceType.large)
    );
  }

  private renderStateIcon(): TemplateResult | null {
    if (!this.shouldShowStateIcon) {
      return nothing;
    }

    if (this.value === SequenceValue.loading) {
      return html`
        <span
          class="state-icon state-icon--spinner sequence-step-spinner"
          part="state-icon"
          aria-hidden="true"
        ></span>
      `;
    }

    if (this.value === SequenceValue.completed) {
      return html`
        <span
          class="state-icon state-icon--completed"
          part="state-icon"
          aria-hidden="true"
        ></span>
      `;
    }

    return html`
      <span
        class="state-icon state-icon--slot"
        part="state-icon"
        aria-hidden="true"
      >
        <slot name="leading-icon"></slot>
      </span>
    `;
  }

  private get isInteractiveButton(): boolean {
    return (
      this.type === SequenceType.large &&
      (this.styleType === SequenceStyle.regular ||
        this.styleType === SequenceStyle.point)
    );
  }

  private get shouldUseButtonWrapper(): boolean {
    if (this.styleType === SequenceStyle.connector) {
      return false;
    }
    if (
      this.type === SequenceType.medium &&
      this.styleType === SequenceStyle.regular
    ) {
      return true;
    }
    if (
      this.type === SequenceType.large &&
      (this.styleType === SequenceStyle.regular ||
        this.styleType === SequenceStyle.point)
    ) {
      return true;
    }
    return false;
  }

  private get stepAriaCurrent(): 'step' | null {
    return this.value === SequenceValue.active ? 'step' : null;
  }

  private get stepAriaLabel(): string {
    const readable = this.value.replace(/-/g, ' ');
    return `Sequence step ${readable}`;
  }

  private renderSmallIndicator(): TemplateResult {
    const showSpinner = this.value === SequenceValue.loading;
    const showCheck =
      this.styleType === SequenceStyle.regular &&
      this.value === SequenceValue.completed;

    return html`
      <div class="node" part="node" aria-hidden="true">
        ${showSpinner
          ? html`<span
              class="small-spinner sequence-step-spinner"
              part="state-icon"
              aria-hidden="true"
            ></span>`
          : nothing}
        ${showCheck
          ? html`<span
              class="small-check"
              part="state-icon"
              aria-hidden="true"
            ></span>`
          : nothing}
      </div>
    `;
  }

  private getWrapperClasses() {
    return {
      wrapper: true,
      [`type-${this.type}`]: true,
      [`style-${this.styleType}`]: true,
      [`value-${this.value}`]: true,
      [`connector-${this.orientation}`]: true,
      'has-icon': this.shouldShowStateIcon,
      'has-input': this.showInputConnector,
      'has-output': this.showOutputConnector,
      'input-extended': this.inputConnectorExtended,
      'is-interactive': this.isInteractiveButton,
    };
  }

  private renderNodeContent(): TemplateResult | null {
    const isSmall = this.type === SequenceType.small;
    if (isSmall) {
      return this.renderSmallIndicator();
    }
    if (this.isMediumPoint || this.isLargePoint) {
      return html`
        <div
          class="node ${this.type === 'medium' && this.styleType === 'point'
            ? 'medium-point'
            : ''}"
          part="node"
        >
          <div class="content" part="label">
            <slot></slot>
          </div>
        </div>
      `;
    }
    return html`
      <div class="node" part="node">
        ${this.renderStateIcon()}
        <div class="content" part="label">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(style);

  override render(): TemplateResult {
    if (this.styleType === SequenceStyle.connector) {
      return html`
        <div
          class=${classMap(this.getWrapperClasses())}
          part="wrapper"
          role="listitem"
          aria-label=${this.stepAriaLabel}
          aria-current=${ifDefined(this.stepAriaCurrent ?? undefined)}
        >
          <div class="body" part="body">
            ${this.showInputConnector
              ? html`<span
                  class="connector input"
                  part="connector input"
                ></span>`
              : ''}
            ${this.showOutputConnector
              ? html`<span
                  class="connector output"
                  part="connector output"
                ></span>`
              : ''}
          </div>
        </div>
      `;
    }

    const wrapperClasses = classMap(this.getWrapperClasses());
    const ariaCurrent = this.stepAriaCurrent ?? undefined;
    const verticalInput =
      this.isVertical && this.showInputConnector
        ? html`<span
            class="connector input ${this.isSpecialLoadingConnector
              ? 'loading-special'
              : ''}"
            part="connector input"
          ></span>`
        : '';
    const verticalOutput =
      this.isVertical && this.showOutputConnector
        ? html`<span class="connector output" part="connector output"></span>`
        : '';
    const nodeContent = this.renderNodeContent();
    const horizontalInput =
      !this.isVertical && this.showInputConnector
        ? html`<span
            class="connector input ${this.isSpecialLoadingConnector
              ? 'loading-special'
              : ''}"
            part="connector input"
          ></span>`
        : '';
    const horizontalOutput =
      !this.isVertical && this.showOutputConnector
        ? html`<span class="connector output" part="connector output"></span>`
        : '';
    const contents = html`
      ${(this.isVertical ? verticalInput : horizontalInput) ?? ''}
      <div class="visible-wrapper" part="visible-wrapper">
        <div class="body" part="body">${nodeContent}</div>
      </div>
      ${(this.isVertical ? verticalOutput : horizontalOutput) ?? ''}
    `;

    if (this.shouldUseButtonWrapper) {
      return html`
        <button
          type="button"
          class=${wrapperClasses}
          part="wrapper"
          role="listitem"
          aria-label=${this.stepAriaLabel}
          aria-current=${ifDefined(ariaCurrent)}
        >
          ${contents}
        </button>
      `;
    }

    return html`
      <div
        class=${wrapperClasses}
        part="wrapper"
        role="listitem"
        aria-label=${this.stepAriaLabel}
        aria-current=${ifDefined(ariaCurrent)}
      >
        ${contents}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-step': ObcSequenceStep;
  }
}
