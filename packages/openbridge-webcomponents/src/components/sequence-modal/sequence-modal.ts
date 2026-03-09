import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './sequence-modal.css?inline';
import {
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from '../sequence-step/sequence-step.js';
import '../sequence-step/sequence-step.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import {
  ObcSequenceCardProgressType,
  ObcSequenceCardSize,
  ObcSequenceCardState,
  ObcSequenceCardTitleType,
} from '../sequence-card/sequence-card.js';
import '../sequence-card/sequence-card.js';

export enum ObcSequenceModalType {
  Regular = 'regular',
  TwoLine = 'two-line',
}

/**
 * `<obc-sequence-modal>` - Modal card with step indicator, title, content, and actions.
 *
 * Overview:
 * - Presents a sequence step in a modal-style card with header metadata.
 * - Supports regular and two-line title layouts.
 * - Use for focused step/task dialogs with optional actions.
 *
 * Features and Variants:
 * - Types: `regular`, `two-line`.
 * - Optional timestamp and actions area.
 *
 * Usage Guidelines:
 * - Use the `actions` slot for custom buttons.
 * - Provide content via the default slot (no built-in placeholders).
 *
 * Slots:
 * - `actions`: Actions row content (shown when `hasActions` is true).
 * - Default slot: Main content area.
 *
 * Events:
 * - `close-click`: Fired when the close icon is clicked.
 *
 * Best Practices:
 * - Keep titles short; use `subtitle` for additional context.
 * - Prefer a single row of actions for compact layouts.
 *
 * Example:
 * ```html
 * <obc-sequence-modal type="regular" hasActions>
 *   <div slot="actions">...</div>
 *   <!-- default slot: your content -->
 * </obc-sequence-modal>
 * ```
 *
 * Keywords: modal, sequence, step, dialog, progress, actions.
 */
@customElement('obc-sequence-modal')
export class ObcSequenceModal extends LitElement {
  @property({type: String}) type: ObcSequenceModalType =
    ObcSequenceModalType.Regular;

  @property({type: String}) stepLabel = '';
  @property({type: String}) stepValue: SequenceValue = SequenceValue.notStarted;

  @property({type: String}) modalTitle = '';
  @property({type: String}) subtitle = '';

  @property({type: Boolean}) hasTimeStamp = false;
  @property({type: String}) timeValue = '';
  @property({type: String}) timeLabel = '';

  @property({type: Boolean}) hasActions = false;

  @property({type: String}) closeLabel = 'Close';

  private get isTwoLine() {
    return this.type === ObcSequenceModalType.TwoLine;
  }

  private onCloseClick = () =>
    this.dispatchEvent(new CustomEvent('close-click'));

  override render() {
    const titleType = ObcSequenceCardTitleType.TwoLine;

    const subtitle = this.isTwoLine ? this.subtitle : '';

    return html`
      <div class="sequence-modal type-${this.type}">
        <obc-sequence-card
          class="sequence-modal-card"
          .size=${ObcSequenceCardSize.Regular}
          .titleType=${titleType}
          .progressType=${ObcSequenceCardProgressType.Centered}
          .state=${ObcSequenceCardState.Active}
          .fullWidth=${true}
          .fullHeight=${true}
          .horizontal=${false}
          .showConnector=${false}
          .hasLeadingIcon=${false}
          .cardTitle=${this.modalTitle}
          .subtitle=${subtitle}
          .hasTimeStamp=${this.hasTimeStamp}
          .timeLabel=${this.timeLabel}
          .time=${this.timeValue}
          .hasContent=${true}
          .hasActions=${this.hasActions}
          .progressLabel=${this.stepLabel}
          .progressValue=${this.stepValue}
          .indicatorTypeOverride=${SequenceType.medium}
          .indicatorStyleOverride=${SequenceStyle.point}
        >
          <div class="sequence-modal-header-actions" slot="header-actions">
            <span class="sequence-modal-divider" aria-hidden="true"></span>
            <obc-icon-button
              class="close-button"
              variant="flat"
              aria-label=${this.closeLabel}
              @click=${this.onCloseClick}
            >
              <obi-close-google></obi-close-google>
            </obc-icon-button>
          </div>
          <slot name="actions" slot="actions"></slot>
          <slot></slot>
        </obc-sequence-card>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-sequence-modal': ObcSequenceModal;
  }
}
