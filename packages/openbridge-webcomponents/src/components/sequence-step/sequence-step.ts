import {LitElement, html, unsafeCSS, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import style from './sequence-step.css?inline';
import {
  getSmallPointIcon,
  getSmallRegularIcon,
  getStateIcon,
} from '../../icons/icon-sequence-step-registry';

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

  private get isSmallPoint() {
    return (
      this.type === SequenceType.small && this.styleType === SequenceStyle.point
    );
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

  private get stepAriaCurrent(): 'step' | null {
    return this.value === SequenceValue.active ? 'step' : null;
  }

  private get stepAriaLabel(): string {
    const readable = this.value.replace(/-/g, ' ');
    return `Sequence step ${readable}`;
  }

  private getIndicatorSvg(): TemplateResult | null {
    if (this.type !== SequenceType.small) return null;
    if (this.styleType === SequenceStyle.point) {
      return getSmallPointIcon(this.value);
    }
    if (this.styleType === SequenceStyle.regular) {
      return getSmallRegularIcon(this.value);
    }
    return null;
  }

  private getIconForValue(): TemplateResult | null {
    return getStateIcon(this.value);
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
    };
  }

  private renderNodeContent(): TemplateResult | null {
    const isSmall = this.type === SequenceType.small;
    if (this.isSmallPoint) {
      return this.getIndicatorSvg();
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
    if (isSmall) {
      if (
        this.value === SequenceValue.completed &&
        this.styleType === SequenceStyle.regular
      ) {
        return html`<div class="node" part="node">
          ${this.getIndicatorSvg()}
        </div>`;
      }
      return this.getIndicatorSvg();
    }
    return html`
      <div class="node" part="node">
        ${this.shouldShowStateIcon
          ? html`<span class="state-icon" part="state-icon">
              ${this.getIconForValue()}
            </span>`
          : ''}
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
          aria-current=${this.stepAriaCurrent}
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

    return html`
      <div
        class=${classMap(this.getWrapperClasses())}
        part="wrapper"
        role="listitem"
        aria-label=${this.stepAriaLabel}
        aria-current=${this.stepAriaCurrent}
      >
        ${this.isVertical && this.showInputConnector
          ? html`<span
              class="connector input ${this.isSpecialLoadingConnector
                ? 'loading-special'
                : ''}"
              part="connector input"
            ></span>`
          : ''}
        <div class="body" part="body">
          ${!this.isVertical && this.showInputConnector
            ? html`<span
                class="connector input ${this.isSpecialLoadingConnector
                  ? 'loading-special'
                  : ''}"
                part="connector input"
              ></span>`
            : ''}
          ${this.renderNodeContent()}
          ${!this.isVertical && this.showOutputConnector
            ? html`<span
                class="connector output"
                part="connector output"
              ></span>`
            : ''}
        </div>

        ${this.isVertical && this.showOutputConnector
          ? html`<span class="connector output" part="connector output"></span>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-step': ObcSequenceStep;
  }
}
