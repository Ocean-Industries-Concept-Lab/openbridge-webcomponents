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
 * - States: `active`, `flat`, `enhanced`.
 * - Layouts: vertical, horizontal, or both.
 * - Optional leading icon, timestamps, content, and actions.
 * - TODO(designer): Clarify semantic differences between `active`, `flat`, and
 *   `enhanced` states and when to use each.
 * - TODO(designer): Confirm intended combinations when both `isVertical` and
 *   `isHorizontal` are true.
 *
 * Usage Guidelines:
 * - Keep titles short; use `subtitle` for secondary text.
 * - Provide custom content via the default slot when `hasContent` is true.
 * - Provide actions via the `actions` slot when `hasActions` is true.
 *
 * Slots:
 * - `leading-icon`: Icon before the title (shown when `hasLeadingIcon` is true).
 * - `title`: Title text (fallbacks to `cardTitle`).
 * - `subtitle`: Subtitle/description (fallbacks to `subtitle`).
 * - `time-stamp`: Header timestamp (fallbacks to `timeLabel` + `time`).
 * - `left-time-stamp`: Left rail timestamp (fallbacks to `leftTime`).
 * - `actions`: Actions row content (shown when `hasActions` is true).
 * - Default slot: Main content area (shown when `hasContent` is true).
 *
 * Events:
 * - None. Consumers define actions in slots and handle events on slotted elements.
 *
 * Best Practices:
 * - Pair `left-side` progress with `isVertical` for rail-based timelines.
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

  @property({type: Boolean}) isVertical = false;
  @property({type: Boolean}) isHorizontal = false;

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

  private get verticalConnectorType() {
    return SequenceType.small;
  }

  private get horizontalConnectorType() {
    return this.size === ObcSequenceCardSize.Small
      ? SequenceType.small
      : SequenceType.medium;
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
    const indicatorType = this.getResolvedIndicatorType(isCenteredMultiLine);
    const indicatorStyle = isCenteredMultiLine
      ? SequenceStyle.point
      : this.stepIndicatorStyle;

    return html`
      <obc-sequence-step
        .type=${indicatorType}
        .styleType=${indicatorStyle}
        .value=${this.stepIndicatorValue}
        .hideStepInputConnector=${true}
        .hideStepOutputConnector=${true}
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
      'is-vertical': this.isVertical,
      'is-horizontal': this.isHorizontal,
      'has-leading-icon': this.hasLeadingIcon,
      'has-time-stamp': this.hasTimeStamp,
      'has-content': this.hasContent,
      'has-actions': this.hasActions,
    };

    const showLeftRail = this.isLeftSide && this.isVertical;
    const showLeftRailHorizontal = this.isLeftSide && this.isHorizontal;
    const showDualLeftRail = showLeftRail && showLeftRailHorizontal;
    const showCenteredConnector =
      this.progressType === ObcSequenceCardProgressType.Centered &&
      this.isVertical;
    const showHorizontalConnector = this.isHorizontal && !this.isLeftSide;

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
            .hideStepInputConnector=${false}
            .hideStepOutputConnector=${false}
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
          .hideStepInputConnector=${false}
          .hideStepOutputConnector=${false}
          .hasIcon=${false}
        >
          ${this.stepIndicatorLabel}
        </obc-sequence-step>
      </div>
    `;

    return html`
      <div class=${classMap(classes)}>
        ${showLeftRail && !showDualLeftRail ? verticalLeftRail : nothing}
        ${showDualLeftRail ? horizontalLeftRail : nothing}
        <div class="card-container">
          ${this.isHorizontal
            ? html`
                <div class="card-row">
                  ${showDualLeftRail ? verticalLeftRail : nothing}
                  ${showLeftRailHorizontal && !showDualLeftRail
                    ? horizontalLeftRail
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
                                <slot name="leading-icon"></slot>
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
                            <slot></slot>
                          </div>
                        `
                      : nothing}
                    ${this.hasActions
                      ? html`
                          <div class="action-container">
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
                            .hideStepInputConnector=${true}
                            .hideStepOutputConnector=${false}
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
                              <slot name="leading-icon"></slot>
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
                        <div class="content-container-placeholder">
                          <slot></slot>
                        </div>
                      `
                    : nothing}
                  ${this.hasActions
                    ? html`
                        <div class="action-container">
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
                  .hideStepInputConnector=${false}
                  .hideStepOutputConnector=${false}
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
