import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import componentStyle from './sequence-card.css?inline';
import {customElement} from '../../decorator.js';
import {
  SequenceOrientation,
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from '../sequence-step/sequence-step.js';
import '../sequence-step/sequence-step.js';
import '../../icons/icon-placeholder.js';
import '../button/button.js';

export enum ObcSequenceCardSize {
  Small = 'small',
  Regular = 'regular',
}

export enum ObcSequenceCardTitleType {
  Single = 'single',
  TwoLine = 'two-line',
  Description = 'description',
}

export enum ObcSequenceCardProgressType {
  Centered = 'centered',
  LeftSide = 'left-side',
}

export enum ObcSequenceCardState {
  Active = 'active',
  Flat = 'flat',
  Enhanced = 'enhanced',
}

type SequenceCardAction = {
  label: string;
  icon?: string;
};

/**
 * `<obc-sequence-card>` – Timeline card with header, content, and progress indicator.
 *
 * @slot leading-icon - Icon displayed before the title (shown when `hasLeadingIcon` is true).
 * @slot title - Title text (fallbacks to the `cardTitle` property).
 * @slot subtitle - Subtitle/description text (fallbacks to the `subtitle` property).
 * @slot time-stamp - Custom timestamp content in header (fallbacks to `timeLabel` + `time`).
 * @slot left-time-stamp - Custom timestamp content in left rail (fallbacks to `leftTime`).
 * @slot actions - Actions row content (shown when `hasActions` is true).
 * @slot - Main content area (shown when `hasContent` is true).
 *
 * @fires action-click - Fired when the first action button is clicked. Detail: `{index, label, icon}`.
 * @fires action2-click - Fired when the second action button is clicked. Detail: `{index, label, icon}`.
 */
@customElement('obc-sequence-card')
export class ObcSequenceCard extends LitElement {
  @property({type: String}) size: ObcSequenceCardSize =
    ObcSequenceCardSize.Regular;
  @property({type: String}) titleType: ObcSequenceCardTitleType =
    ObcSequenceCardTitleType.Single;
  @property({type: String}) progressType: ObcSequenceCardProgressType =
    ObcSequenceCardProgressType.Centered;
  @property({type: String}) state: ObcSequenceCardState =
    ObcSequenceCardState.Active;

  @property({type: Boolean}) isVertical = true;
  @property({type: Boolean}) isHorizontal = false;

  @property({type: Boolean}) hasLeadingIcon = true;
  @property({type: String}) cardTitle = 'Title';
  @property({type: String}) subtitle = 'Subtitle';

  @property({type: Boolean}) hasTimeStamp = true;
  @property({type: String}) timeLabel = 'TWOL';
  @property({type: String}) time = '00:00:00';

  @property({type: Boolean}) hasContent = true;
  @property({type: Boolean}) hasActions = false;
  @property({type: Boolean}) hasConnector = true;

  @property({type: String}) placeholderIcon = 'obi-placeholder';
  @property({type: String}) placeholderTitle = 'Content placeholder';
  @property({type: String}) placeholderSubtitle =
    'Instance swap with custom components';

  @property({type: Array}) actions: SequenceCardAction[] = [];

  @property({type: String}) progressLabel = '1';
  @property({type: String}) progressValue: SequenceValue =
    SequenceValue.regular;

  @property({type: String}) leftTime = '00:00';

  @state() private hasSlotContent = false;

  @query('slot:not([name])') private defaultSlot?: HTMLSlotElement;

  private get showSubtitle() {
    return (
      this.titleType !== ObcSequenceCardTitleType.Single &&
      this.subtitle.trim() !== ''
    );
  }

  private get isLeftSide() {
    return this.progressType === ObcSequenceCardProgressType.LeftSide;
  }

  private get stepIndicatorStyle() {
    return this.size === ObcSequenceCardSize.Regular
      ? SequenceStyle.regular
      : SequenceStyle.point;
  }

  private get stepIndicatorValue() {
    return SequenceValue.notStarted;
  }

  private get stepIndicatorLabel() {
    if (
      this.progressType !== ObcSequenceCardProgressType.Centered ||
      this.titleType === ObcSequenceCardTitleType.Single
    ) {
      return '';
    }

    const label = this.progressLabel.trim();
    return label === '' ? '1' : label;
  }

  private get actionItems(): SequenceCardAction[] {
    const items = Array.isArray(this.actions) ? [...this.actions] : [];
    return items.slice(0, 2);
  }

  private get verticalConnectorType() {
    return SequenceType.small;
  }

  private get horizontalConnectorType() {
    return this.size === ObcSequenceCardSize.Small
      ? SequenceType.small
      : SequenceType.medium;
  }

  private handleActionClick(action: SequenceCardAction, index: number) {
    const eventName = index === 0 ? 'action-click' : 'action2-click';
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {index, label: action.label, icon: action.icon},
      })
    );
  }

  override firstUpdated() {
    this.updateSlotContentState();
  }

  private updateSlotContentState() {
    const slot = this.defaultSlot;
    if (!slot) {
      this.hasSlotContent = false;
      return;
    }

    const assigned = slot.assignedNodes({flatten: true}).filter((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim() !== '';
      }

      return false;
    });

    this.hasSlotContent = assigned.length > 0;
  }

  private handleSlotChange = () => {
    this.updateSlotContentState();
  };

  private getResolvedIndicatorType(isCenteredMultiLine: boolean) {
    if (this.size === ObcSequenceCardSize.Small) {
      return isCenteredMultiLine ? SequenceType.medium : SequenceType.small;
    }

    if (this.progressType === ObcSequenceCardProgressType.LeftSide) {
      return SequenceType.small;
    }

    return isCenteredMultiLine ? SequenceType.large : SequenceType.small;
  }

  private renderStepIndicator() {
    const isCenteredMultiLine =
      this.progressType === ObcSequenceCardProgressType.Centered &&
      (this.titleType === ObcSequenceCardTitleType.TwoLine ||
        this.titleType === ObcSequenceCardTitleType.Description);
    const indicatorType = this.getResolvedIndicatorType(isCenteredMultiLine);
    const indicatorStyle = isCenteredMultiLine
      ? SequenceStyle.point
      : this.stepIndicatorStyle;

    return html`
      <obc-sequence-step
        .type=${indicatorType}
        .styleType=${indicatorStyle}
        .value=${this.stepIndicatorValue}
        .hasInputConnector=${false}
        .hasOutputConnector=${false}
        .hasIcon=${false}
      >
        ${this.stepIndicatorLabel}
      </obc-sequence-step>
    `;
  }

  private renderActionButtons() {
    const defaults = [
      {label: 'Label', icon: 'obi-placeholder'},
      {label: 'Label', icon: 'obi-placeholder'},
    ];
    const items = this.actionItems.length ? this.actionItems : defaults;

    return html`
      <div class="action-container">
        ${items.map(
          (action, index) => html`
            <obc-button
              variant="normal"
              .showLeadingIcon=${Boolean(action.icon)}
              @click=${() => this.handleActionClick(action, index)}
            >
              ${action.icon
                ? html`<span slot="leading-icon"
                    >${unsafeHTML(`<${action.icon}></${action.icon}>`)}</span
                  >`
                : nothing}
              ${action.label}
            </obc-button>
          `
        )}
      </div>
    `;
  }

  override render() {
    const classes = {
      'sequence-card': true,
      [`size-${this.size}`]: true,
      [`title-${this.titleType}`]: true,
      [`progress-${this.progressType}`]: true,
      [`state-${this.state}`]: true,
      'is-vertical': this.isVertical,
      'is-horizontal': this.isHorizontal,
      'has-leading-icon': this.hasLeadingIcon,
      'has-time-stamp': this.hasTimeStamp,
      'has-content': this.hasContent,
      'has-actions': this.hasActions,
    };

    const showLeftRail = this.isLeftSide && this.isVertical;
    const showLeftRailHorizontal = this.isLeftSide && this.isHorizontal;
    const showCenteredConnector =
      this.progressType === ObcSequenceCardProgressType.Centered &&
      this.isVertical &&
      this.hasConnector;
    const showHorizontalConnector =
      this.isHorizontal &&
      !this.isLeftSide &&
      (this.progressType !== ObcSequenceCardProgressType.Centered ||
        this.hasConnector);

    return html`
      <div class=${classMap(classes)}>
        ${showLeftRail
          ? html`
              <div class="vertical-progress-container">
                ${this.hasTimeStamp
                  ? html`
                      <div class="stamp-container">
                        <slot name="left-time-stamp">${this.leftTime}</slot>
                      </div>
                    `
                  : nothing}
                <div class="progress-container">
                  <obc-sequence-step
                    .orientation=${SequenceOrientation.vertical}
                    .type=${this.getResolvedIndicatorType(false)}
                    .styleType=${this.stepIndicatorStyle}
                    .value=${this.stepIndicatorValue}
                    .hasInputConnector=${true}
                    .hasOutputConnector=${true}
                    .inputConnectorExtended=${true}
                    .hasIcon=${false}
                  >
                    ${this.stepIndicatorLabel}
                  </obc-sequence-step>
                </div>
              </div>
            `
          : nothing}
        <div class="card-container">
          ${this.isHorizontal
            ? html`
                <div class="card-row">
                  ${showLeftRailHorizontal
                    ? html`
                        <div class="horizontal-left-rail">
                          <obc-sequence-step
                            .orientation=${SequenceOrientation.horizontal}
                            .type=${this.getResolvedIndicatorType(false)}
                            .styleType=${this.stepIndicatorStyle}
                            .value=${this.stepIndicatorValue}
                            .hasInputConnector=${true}
                            .hasOutputConnector=${true}
                            .hasIcon=${false}
                          >
                            ${this.stepIndicatorLabel}
                          </obc-sequence-step>
                        </div>
                      `
                    : nothing}
                  <div class="card">
                    <div class="title-container">
                      ${showLeftRail || showLeftRailHorizontal
                        ? nothing
                        : this.renderStepIndicator()}
                      <div class="content-container-placeholder">
                        ${this.hasLeadingIcon
                          ? html`
                              <div class="leading-icon">
                                <slot name="leading-icon">
                                  <obi-placeholder></obi-placeholder>
                                </slot>
                              </div>
                            `
                          : nothing}
                        <div class="text-container">
                          <div class="text-wrapper">
                            <div class="title-text">
                              <slot name="title">${this.cardTitle}</slot>
                            </div>
                            ${this.showSubtitle
                              ? html`
                                  <div class="subtitle-text">
                                    <slot name="subtitle"
                                      >${this.subtitle}</slot
                                    >
                                  </div>
                                `
                              : nothing}
                          </div>
                          ${this.hasTimeStamp
                            ? html`
                                <div class="time-stamp">
                                  <slot name="time-stamp">
                                    <div class="time-label">
                                      ${this.timeLabel}
                                    </div>
                                    <div class="time-value">${this.time}</div>
                                  </slot>
                                </div>
                              `
                            : nothing}
                        </div>
                      </div>
                    </div>

                    ${this.hasContent
                      ? html`
                          <div class="content-container-placeholder">
                            <slot @slotchange=${this.handleSlotChange}></slot>
                            ${this.hasSlotContent
                              ? nothing
                              : html`
                                  <div class="content-placeholder">
                                    <div class="placeholder-icon">
                                      ${unsafeHTML(
                                        `<${this.placeholderIcon}></${this.placeholderIcon}>`
                                      )}
                                    </div>
                                    <div class="placeholder-title">
                                      ${this.placeholderTitle}
                                    </div>
                                    <div class="placeholder-subtitle">
                                      ${this.placeholderSubtitle}
                                    </div>
                                  </div>
                                `}
                          </div>
                        `
                      : nothing}
                    ${this.hasActions ? this.renderActionButtons() : nothing}
                  </div>

                  ${showHorizontalConnector
                    ? html`
                        <div class="horizontal-progress-container">
                          <obc-sequence-step
                            .orientation=${SequenceOrientation.horizontal}
                            .type=${this.horizontalConnectorType}
                            .styleType=${SequenceStyle.connector}
                            .value=${this.progressValue}
                            .hasInputConnector=${false}
                            .hasOutputConnector=${true}
                            .hasIcon=${false}
                          ></obc-sequence-step>
                        </div>
                      `
                    : nothing}
                </div>
              `
            : html`
                <div class="card">
                  <div class="title-container">
                    ${showLeftRail || showLeftRailHorizontal
                      ? nothing
                      : this.renderStepIndicator()}
                    <div class="content-container-placeholder">
                      ${this.hasLeadingIcon
                        ? html`
                            <div class="leading-icon">
                              <slot name="leading-icon">
                                <obi-placeholder></obi-placeholder>
                              </slot>
                            </div>
                          `
                        : nothing}
                      <div class="text-container">
                        <div class="text-wrapper">
                          <div class="title-text">
                            <slot name="title">${this.cardTitle}</slot>
                          </div>
                          ${this.showSubtitle
                            ? html`
                                <div class="subtitle-text">
                                  <slot name="subtitle">${this.subtitle}</slot>
                                </div>
                              `
                            : nothing}
                        </div>
                        ${this.hasTimeStamp
                          ? html`
                              <div class="time-stamp">
                                <slot name="time-stamp">
                                  <div class="time-label">
                                    ${this.timeLabel}
                                  </div>
                                  <div class="time-value">${this.time}</div>
                                </slot>
                              </div>
                            `
                          : nothing}
                      </div>
                    </div>
                  </div>

                  ${this.hasContent
                    ? html`
                        <slot @slotchange=${this.handleSlotChange}></slot>
                        ${this.hasSlotContent
                          ? nothing
                          : html`
                              <div class="content-placeholder">
                                <div class="placeholder-icon">
                                  ${unsafeHTML(
                                    `<${this.placeholderIcon}></${this.placeholderIcon}>`
                                  )}
                                </div>
                                <div class="placeholder-title">
                                  ${this.placeholderTitle}
                                </div>
                                <div class="placeholder-subtitle">
                                  ${this.placeholderSubtitle}
                                </div>
                              </div>
                            `}
                      `
                    : nothing}
                  ${this.hasActions
                    ? html` ${this.renderActionButtons()} `
                    : nothing}
                </div>
              `}
        </div>
        ${this.isHorizontal
          ? html`<div class="horizontal-progress-container"></div>`
          : nothing}
        ${showCenteredConnector && this.hasConnector
          ? html`
              <div class="vertical-progress-container is-centered">
                <obc-sequence-step
                  .orientation=${SequenceOrientation.vertical}
                  .type=${this.verticalConnectorType}
                  .styleType=${SequenceStyle.connector}
                  .value=${this.progressValue}
                  .hasInputConnector=${this.hasConnector}
                  .hasOutputConnector=${this.hasConnector}
                  .inputConnectorExtended=${true}
                  .hasIcon=${false}
                ></obc-sequence-step>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-card': ObcSequenceCard;
  }
}
