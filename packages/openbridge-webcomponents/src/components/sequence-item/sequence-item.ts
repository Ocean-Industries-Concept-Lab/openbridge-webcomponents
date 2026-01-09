import {LitElement, html, unsafeCSS, TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import style from './sequence-item.css?inline';
import {
  SequenceOrientation,
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from '../sequence-step/sequence-step.js';
import '../sequence-step/sequence-step.js';

export enum SequenceItemOrientation {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum SequenceItemLabelType {
  regular = 'regular',
  multiLine = 'multi-line',
  small = 'small',
}

export enum SequenceItemState {
  enabled = 'enabled',
  active = 'active',
}

/**
 * `<obc-sequence-item>` renders the textual part of a sequence flow while
 * composing `<obc-sequence-step>` for the visual indicator. Consumers can either
 * configure the built-in step via `step*` props or supply a custom step through
 * the `step` slot.
 */
@customElement('obc-sequence-item')
export class ObcSequenceItem extends LitElement {
  @property({type: String}) orientation: SequenceItemOrientation =
    SequenceItemOrientation.vertical;
  @property({type: String}) labelType: SequenceItemLabelType =
    SequenceItemLabelType.regular;
  @property({type: String}) state: SequenceItemState =
    SequenceItemState.enabled;
  @property({type: String}) override title = '';
  @property({type: Boolean}) hasSubtitle = false;
  @property({type: String}) subtitle = '';
  @property({type: Boolean}) hasDescription = false;
  @property({type: String}) description = '';
  /**
   * Enables the meta stamp container. Without this, timestamp/distance values are
   * ignored even if their booleans are true.
   */
  @property({type: Boolean}) hasStamp = false;
  /** Shows a timestamp inside the stamp container when `hasStamp` is true. */
  @property({type: Boolean}) hasTimeStamp = false;
  @property({type: String}) timeStamp = '';
  /**
   * Shows a distance stamp alongside the timestamp. Requires `hasStamp` to be true.
   */
  @property({type: Boolean}) hasDistanceStamp = false;
  @property({type: String}) distanceStamp = '';
  /**
   * Optional text used inside the auto-generated step. Defaults to `title` when
   * not provided.
   */
  @property({type: String}) stepLabel = '';
  // Deprecated: keeping the properties for compatibility but they are ignored
  // when rendering the default sequence item visual. Step rendering inside
  // sequence-item always uses a point indicator.
  @property({type: String}) stepType: SequenceType = SequenceType.small;
  @property({type: String}) stepStyle: SequenceStyle = SequenceStyle.point;
  @property({type: String}) stepValue?: SequenceValue;
  @property({type: Boolean}) hideStepInputConnector = false;
  @property({type: Boolean}) hideStepOutputConnector = false;
  @property({type: Boolean}) stepHasIcon = false;

  static override styles = unsafeCSS(style);

  private get hasMeta(): boolean {
    if (!this.hasStamp) {
      return false;
    }
    return this.hasTimeStamp || this.hasDistanceStamp;
  }

  private get resolvedStepValue(): SequenceValue {
    return SequenceValue.notStarted;
  }

  private get resolvedStepOrientation(): SequenceOrientation {
    return this.orientation === SequenceItemOrientation.vertical
      ? SequenceOrientation.vertical
      : SequenceOrientation.horizontal;
  }

  private get resolvedStepLabel(): string {
    if (this.stepLabel) return this.stepLabel;
    if (this.title) return this.title;
    return 'Label';
  }

  private get shouldExtendInputConnector(): boolean {
    return this.hasDescription;
  }

  private get shouldInlineDescription(): boolean {
    return (
      this.orientation === SequenceItemOrientation.vertical &&
      this.hasDescription
    );
  }

  private renderStep(): TemplateResult {
    const stepClasses = {
      'label-multi-line': this.labelType === SequenceItemLabelType.multiLine,
    };
    return html`
      <obc-sequence-step
        class=${classMap(stepClasses)}
        .type=${SequenceType.small}
        .styleType=${SequenceStyle.point}
        .value=${this.resolvedStepValue}
        .orientation=${this.resolvedStepOrientation}
        .hasIcon=${false}
        .inputConnectorExtended=${this.shouldExtendInputConnector}
      >
        ${this.resolvedStepLabel}
      </obc-sequence-step>
    `;
  }

  private renderTitleRow(): TemplateResult {
    return html`
      <div class="title-row" part="title-row content">
        <slot name="title">
          <div class="title-block" part="title-block">
            <div class="title" part="title">${this.title}</div>
            ${this.hasSubtitle
              ? html`<div class="subtitle" part="subtitle">
                  ${this.subtitle}
                </div>`
              : ''}
            ${this.shouldInlineDescription
              ? html`<div class="description" part="description">
                  ${this.description}
                </div>`
              : ''}
          </div>
        </slot>
      </div>
    `;
  }

  private renderDescription(): TemplateResult | '' {
    if (!this.hasDescription || this.shouldInlineDescription) return '';
    return html`
      <slot name="description">
        <div class="description" part="description content">
          ${this.description}
        </div>
      </slot>
    `;
  }

  private renderMeta(): TemplateResult | '' {
    if (!this.hasMeta) return '';
    return html`
      <slot name="meta">
        <div class="meta-row" part="meta-row">
          ${this.hasTimeStamp
            ? html`<div class="meta timestamp" part="timestamp">
                ${this.timeStamp}
              </div>`
            : ''}
          ${this.hasDistanceStamp
            ? html`<div class="meta distance" part="distance">
                ${this.distanceStamp}
              </div>`
            : ''}
        </div>
      </slot>
    `;
  }

  override render(): TemplateResult {
    const wrapperClassMap = {
      'sequence-item__wrapper': true,
      [`orientation-${this.orientation}`]: true,
      ...(this.labelType
        ? {[`label-${this.labelType}`]: true}
        : {'label-regular': true}),
      ...(this.state ? {[`state-${this.state}`]: true} : {}),
      ...(this.stepType ? {[`step-size-${this.stepType}`]: true} : {}),
      'sequence-item__wrapper--multi-line':
        this.labelType === SequenceItemLabelType.multiLine,
      'sequence-item__wrapper--has-description': this.hasDescription,
      'sequence-item__wrapper--no-input-connector': this.hideStepInputConnector,
      'sequence-item__wrapper--no-output-connector':
        this.hideStepOutputConnector,
    };

    const meta = this.renderMeta();
    const textContent = html`${this.renderTitleRow()}
    ${this.renderDescription()}
    ${this.orientation === SequenceItemOrientation.horizontal ? meta : null}`;

    return html`
      <div class=${classMap(wrapperClassMap)} part="wrapper">
        ${this.orientation === SequenceItemOrientation.vertical ? meta : null}
        <div class="step-wrapper" part="indicator">
          <slot name="step">${this.renderStep()}</slot>
        </div>
        ${this.orientation === SequenceItemOrientation.horizontal
          ? html`<div class="content" part="content">${textContent}</div>`
          : textContent}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-item': ObcSequenceItem;
  }
}
