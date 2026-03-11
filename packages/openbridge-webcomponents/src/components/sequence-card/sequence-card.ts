import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
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

/**
 * `<obc-sequence-card>` - Timeline-style card with header, content, and progress indicator.
 *
 * Overview:
 * - Combines a step indicator, header metadata, and optional content/actions.
 * - Supports vertical and horizontal layouts with centered or left-side progress.
 * - Use for timelines, process steps, and time-stamped events.
 *
 * Features and Variants:
 * - Sizes: `regular`, `small`.
 * - Progress layouts: `centered`, `left-side`.
 * - Optional progress connector (`showConnector=false` to hide).
 * - States: `active`, `flat`, `enhanced`.
 * - Layouts: vertical, horizontal, or both.
 * - Optional leading icon, timestamps, content, and actions.
 * - Full width/height layout toggles.
 * - Horizontal and vertical (default) layouts are supported.
 *
 * Usage Guidelines:
 * - Keep titles short; use `subtitle` for secondary text.
 * - Provide custom content via the default slot when `hasContent` is true.
 * - Provide actions via the `actions` slot when `hasActions` is true.
 * - Disable connectors for modal-style layouts that should not show continuation.
 *
 * Slots:
 * - `leading-icon`: Icon before the title (shown when `hasLeadingIcon` is true).
 * - `title`: Title text (fallbacks to `cardTitle`).
 * - `subtitle`: Subtitle/description (fallbacks to `subtitle`).
 * - `time-stamp`: Header timestamp (fallbacks to `timeLabel` + `time`).
 * - `header-actions`: Optional header actions (e.g., close button).
 * - `left-time-stamp`: Left rail timestamp (fallbacks to `leftTime`).
 * - `actions`: Actions row content (shown when `hasActions` is true).
 * - Default slot: Main content area (shown when `hasContent` is true).
 *
 * Notes:
 * - `fullWidth` and `fullHeight` stretch the card to fill its container.
 * - `indicatorTypeOverride`/`indicatorStyleOverride` force the step indicator
 *   size/style when special layouts are needed.
 *
 * Events:
 * - None. Consumers define actions in slots and handle events on slotted elements.
 *
 * Best Practices:
 * - Pair `left-side` progress with vertical layout for rail-based timelines.
 * - Avoid mixing long text with dense action rows; use content slot instead.
 *
 * Example:
 * ```html
 * <obc-sequence-card
 *   size="regular"
 *   progressType="left-side"
 *   state="active"
 *   hasActions
 * >
 *   <span slot="title">Title</span>
 *   <span slot="subtitle">Subtitle</span>
 *   <div slot="actions">...</div>
 *   <!-- default slot: your content -->
 * </obc-sequence-card>
 * ```
 *
 * Keywords: timeline, step, progress, sequence, card, event, status.
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

  @property({type: Boolean}) fullWidth = false;
  @property({type: Boolean}) fullHeight = false;

  @property({type: Boolean}) horizontal = false;
  @property({type: Boolean}) showConnector = false;

  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: String}) cardTitle = 'Title';
  @property({type: String}) subtitle = 'Subtitle';

  @property({type: Boolean}) hasTimeStamp = false;
  @property({type: String}) timeLabel = 'TWOL';
  @property({type: String}) time = '00:00:00';

  @property({type: Boolean}) hasContent = false;
  @property({type: Boolean}) hasActions = false;

  @property({type: String}) progressLabel = '1';
  @property({type: String}) progressValue: SequenceValue =
    SequenceValue.regular;

  @property({type: String}) leftTime = '00:00';

  @property({type: String}) indicatorTypeOverride?: SequenceType;
  @property({type: String}) indicatorStyleOverride?: SequenceStyle;

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
    const allowLabelForSingle =
      this.titleType === ObcSequenceCardTitleType.Single &&
      this.indicatorTypeOverride !== undefined;
    if (
      this.progressType !== ObcSequenceCardProgressType.Centered ||
      (this.titleType === ObcSequenceCardTitleType.Single &&
        !allowLabelForSingle)
    ) {
      return '';
    }

    const label = this.progressLabel.trim();
    return label === '' ? '1' : label;
  }

  private get verticalConnectorType() {
    return SequenceType.small;
  }

  private get horizontalConnectorType() {
    return this.size === ObcSequenceCardSize.Small
      ? SequenceType.small
      : SequenceType.medium;
  }

  constructor() {
    super();
    this.showConnector = true;
  }

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
    const indicatorType =
      this.indicatorTypeOverride ??
      this.getResolvedIndicatorType(isCenteredMultiLine);
    const indicatorStyle =
      this.indicatorStyleOverride ??
      (isCenteredMultiLine ? SequenceStyle.point : this.stepIndicatorStyle);

    return html`
      <obc-sequence-step
        .type=${indicatorType}
        .styleType=${indicatorStyle}
        .value=${this.stepIndicatorValue}
        .showStepInputConnector=${false}
        .showStepOutputConnector=${false}
        .hasIcon=${false}
      >
        ${this.stepIndicatorLabel}
      </obc-sequence-step>
    `;
  }

  override render() {
    const classes = {
      'sequence-card': true,
      [`size-${this.size}`]: true,
      [`title-${this.titleType}`]: true,
      [`progress-${this.progressType}`]: true,
      [`state-${this.state}`]: true,
      'full-width': this.fullWidth,
      'full-height': this.fullHeight,
      'is-vertical': !this.horizontal,
      'is-horizontal': this.horizontal,
      'has-leading-icon': this.hasLeadingIcon,
      'has-time-stamp': this.hasTimeStamp,
      'has-content': this.hasContent,
      'has-actions': this.hasActions,
    };

    const showLeftRail = this.isLeftSide && !this.horizontal;
    const showLeftRailHorizontal = this.isLeftSide && this.horizontal;
    const showCenteredConnector =
      this.progressType === ObcSequenceCardProgressType.Centered &&
      !this.horizontal &&
      this.showConnector;
    const showHorizontalConnector =
      this.horizontal && !this.isLeftSide && this.showConnector;

    const verticalLeftRail = html`
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
            .showStepInputConnector=${true}
            .showStepOutputConnector=${true}
            .inputConnectorExtended=${true}
            .hasIcon=${false}
          >
            ${this.stepIndicatorLabel}
          </obc-sequence-step>
        </div>
      </div>
    `;

    const horizontalLeftRail = html`
      <div class="horizontal-left-rail">
        <obc-sequence-step
          .orientation=${SequenceOrientation.horizontal}
          .type=${this.getResolvedIndicatorType(false)}
          .styleType=${this.stepIndicatorStyle}
          .value=${this.stepIndicatorValue}
          .showStepInputConnector=${true}
          .showStepOutputConnector=${true}
          .hasIcon=${false}
        >
          ${this.stepIndicatorLabel}
        </obc-sequence-step>
      </div>
    `;

    return html`
      <div class=${classMap(classes)}>
        ${showLeftRail ? verticalLeftRail : nothing}
        <div class="card-container">
          ${this.horizontal
            ? html`
                <div class="card-row">
                  ${showLeftRailHorizontal ? horizontalLeftRail : nothing}
                  <div class="card">
                    <div class="header-row">
                      <div class="title-container" part="title-container">
                        ${showLeftRail || showLeftRailHorizontal
                          ? nothing
                          : this.renderStepIndicator()}
                        <div class="content-container-placeholder">
                          ${this.hasLeadingIcon
                            ? html`
                                <div class="leading-icon">
                                  <slot name="leading-icon"></slot>
                                </div>
                              `
                            : nothing}
                          <div class="text-container">
                            <div class="text-wrapper">
                              <div class="title-text" part="title-text">
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
                          </div>
                        </div>
                      </div>
                      <div class="header-right">
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
                        <slot name="header-actions"></slot>
                      </div>
                    </div>
                    ${this.hasContent
                      ? html`
                          <div class="content-container-placeholder">
                            <slot></slot>
                          </div>
                        `
                      : nothing}
                    ${this.hasActions
                      ? html`
                          <div class="action-container" part="action-container">
                            <slot name="actions"></slot>
                          </div>
                        `
                      : nothing}
                  </div>

                  ${showHorizontalConnector
                    ? html`
                        <div class="horizontal-progress-container">
                          <obc-sequence-step
                            .orientation=${SequenceOrientation.horizontal}
                            .type=${this.horizontalConnectorType}
                            .styleType=${SequenceStyle.connector}
                            .value=${this.progressValue}
                            .showStepInputConnector=${false}
                            .showStepOutputConnector=${true}
                            .hasIcon=${false}
                          ></obc-sequence-step>
                        </div>
                      `
                    : nothing}
                </div>
              `
            : html`
                <div class="card">
                  <div class="header-row">
                    <div class="title-container" part="title-container">
                      ${showLeftRail || showLeftRailHorizontal
                        ? nothing
                        : this.renderStepIndicator()}
                      <div class="content-container-placeholder">
                        ${this.hasLeadingIcon
                          ? html`
                              <div class="leading-icon">
                                <slot name="leading-icon"></slot>
                              </div>
                            `
                          : nothing}
                        <div class="text-container">
                          <div class="text-wrapper">
                            <div class="title-text" part="title-text">
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
                        </div>
                      </div>
                    </div>
                    <div class="header-right">
                      ${this.hasTimeStamp
                        ? html`
                            <div class="time-stamp">
                              <slot name="time-stamp">
                                <div class="time-label">${this.timeLabel}</div>
                                <div class="time-value">${this.time}</div>
                              </slot>
                            </div>
                          `
                        : nothing}
                      <slot name="header-actions"></slot>
                    </div>
                  </div>
                  ${this.hasContent
                    ? html`
                        <div class="content-container-placeholder">
                          <slot></slot>
                        </div>
                      `
                    : nothing}
                  ${this.hasActions
                    ? html`
                        <div class="action-container" part="action-container">
                          <slot name="actions"></slot>
                        </div>
                      `
                    : nothing}
                </div>
              `}
        </div>
        ${showCenteredConnector
          ? html`
              <div class="vertical-progress-container is-centered">
                <obc-sequence-step
                  .orientation=${SequenceOrientation.vertical}
                  .type=${this.verticalConnectorType}
                  .styleType=${SequenceStyle.connector}
                  .value=${this.progressValue}
                  .showStepInputConnector=${true}
                  .showStepOutputConnector=${true}
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
