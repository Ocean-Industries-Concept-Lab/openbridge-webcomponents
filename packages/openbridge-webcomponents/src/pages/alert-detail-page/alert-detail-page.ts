import {LitElement, TemplateResult, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-detail-page.css?inline';
import {property} from 'lit/decorators.js';
import '../../components/button/button.js';
import '../../components/icon-button/icon-button.js';
import '../../components/alert-icon/alert-icon.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-command-locked-f.js';
import '../../icons/icon-alert-category-a.js';
import '../../icons/icon-alert-category-b.js';
import '../../icons/icon-alert-category-c.js';
import {
  Alert,
  AlertCategory,
  formatTimeSince,
  isAcknowledged,
  isActive,
  isBlocked,
  TimeSinceFn,
} from '../../types.js';
import {classMap} from 'lit/directives/class-map.js';
import {localized, msg} from '@lit/localize';

export enum AlertDetailPageType {
  page = 'page',
  modal = 'modal',
  card = 'card',
}

@localized()
@customElement('obc-alert-detail-page')
export class ObcAlertDetailPage extends LitElement {
  @property({type: String}) type: AlertDetailPageType =
    AlertDetailPageType.page;

  @property({attribute: false}) alert!: Alert;
  @property({type: Boolean}) hasNote = false;
  @property({type: Boolean}) hasActions = false;
  @property({type: Boolean}) hasTagId = false;
  @property({type: Boolean}) hasCategory = false;
  @property({type: Boolean}) hasActivated = false;
  @property({type: Boolean}) hasTimer = false;
  @property({type: Boolean}) hasAcknowledged = false;
  @property({type: Boolean}) hasAcknowledgedBy = false;
  @property({type: Boolean}) hasRectified = false;
  @property({type: Boolean}) hasShelvingTimer = false;
  @property({type: Boolean}) hasShelvedBy = false;
  @property({type: Boolean}) hasReadoutGraph = false;
  @property({attribute: false}) timeFormatter: (time: Date) => string = (
    time: Date
  ) => time.toLocaleTimeString(undefined, {hour12: false});

  @property({attribute: false}) timeSinceFormatter: TimeSinceFn =
    formatTimeSince;

  private _interval: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._interval = window.setInterval(() => {
      this.requestUpdate();
    }, 1000) as unknown as number;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) {
      window.clearInterval(this._interval);
    }
  }

  get alertStatusIcon() {
    if (this.alert.shelved) {
      return html`<obi-alerts-shelf class="icon status"></obi-alerts-shelf>`;
    }
    if (this.alert.blocked) {
      return html`<obi-command-locked-f
        class="icon status"
      ></obi-command-locked-f>`;
    }
    return nothing;
  }

  private renderDetail(
    has: boolean,
    slotName: string,
    defaultTitle: string,
    getValue: (
      alert: Alert
    ) => string | Date | AlertCategory | undefined | boolean,
    options: {timer?: boolean} = {}
  ) {
    if (has) {
      const rawValue = getValue(this.alert);
      let value: string | TemplateResult | undefined | boolean;
      let isIcon = false;

      if (rawValue instanceof Date) {
        if (options.timer) {
          value = this.timeSinceFormatter(rawValue as Date);
        } else {
          value = this.timeFormatter(rawValue as Date);
        }
      } else if (slotName === 'category') {
        isIcon = true;
        if (rawValue === AlertCategory.a) {
          value = html`<obi-alert-category-a></obi-alert-category-a>`;
        } else if (rawValue === AlertCategory.b) {
          value = html`<obi-alert-category-b></obi-alert-category-b>`;
        } else if (rawValue === AlertCategory.c) {
          value = html`<obi-alert-category-c></obi-alert-category-c>`;
        }
      } else {
        value = rawValue as string | boolean | undefined;
      }
      return html`
        <div class="detail">
          <div class="detail-title">
            <slot name="${slotName}-label">${defaultTitle}</slot>
          </div>
          <div class="detail-value ${isIcon ? 'icon' : ''}">
            <slot name="${slotName}-value"> ${value} </slot>
          </div>
        </div>
      `;
    }
    return nothing;
  }

  override render() {
    if (!this.alert) {
      console.error('Alert is not set in alert-detail-page');
      return nothing;
    }
    const showCloseButton = [AlertDetailPageType.modal].includes(this.type);

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
          'status-acknowledged':
            isAcknowledged(this.alert) && isActive(this.alert),
          'status-unacknowledged':
            !isAcknowledged(this.alert) && isActive(this.alert),
          'status-resolved': isActive(this.alert),
        })}
      >
        <div class="header">
          ${this.alertStatusIcon}
          <div class="icon alert">
            <obc-alert-icon
              .type=${this.alert.type}
              .acknowledged=${isAcknowledged(this.alert)}
              .active=${isActive(this.alert)}
              .outline=${isBlocked(this.alert)}
            ></obc-alert-icon>
          </div>
          <div class="title">
            <span>${this.alert.source}</span>
          </div>
          ${showCloseButton
            ? html`<div class="close-button">
                <obc-icon-button variant="flat">
                  <obi-close-google></obi-close-google>
                </obc-icon-button>
              </div>`
            : nothing}
        </div>
        <div class="divider"></div>
        <div class="body">
          <div class="description">
            <span>${this.alert.text}</span>
          </div>
          ${this.hasNote
            ? html`<div class="description sub-description">
                <div class="label">
                  <slot name="note-label">${msg('Note')}</slot>
                </div>
                <slot name="note">${this.alert.note}</slot>
              </div>`
            : nothing}
          ${this.renderDetail(
            this.hasTagId,
            'tagId',
            msg('Tag ID'),
            (alert) => alert.tagId
          )}
          ${this.renderDetail(
            this.hasCategory,
            'category',
            msg('Category'),
            (alert) => alert.category
          )}
          ${this.renderDetail(
            this.hasActivated,
            'time',
            msg('Activated'),
            (alert) => alert.time
          )}
          ${this.renderDetail(
            this.hasTimer,
            'activated-timer',
            msg('Alert timer'),
            (alert) => alert.time,
            {timer: true}
          )}
          ${this.renderDetail(
            this.hasAcknowledged,
            'acknowledgedAt',
            msg('Acknowledged'),
            (alert) => alert.acknowledged && alert.acknowledged.acknowledgedAt
          )}
          ${this.renderDetail(
            this.hasRectified,
            'rectified',
            msg('Rectified'),
            (alert) => alert.active !== true && alert.active.rectifiedTime
          )}
          ${this.renderDetail(
            this.hasAcknowledgedBy,
            'acknowledged-by',
            msg('Acknowledged by'),
            (alert) => alert.acknowledged && alert.acknowledged.acknowledgedBy
          )}
          ${this.renderDetail(
            this.hasShelvingTimer,
            'shelving-timer',
            msg('Shelfing timer'),
            (alert) => alert.shelved && alert.shelved.shelvedStartTime,
            {timer: true}
          )}
          ${this.renderDetail(
            this.hasShelvedBy,
            'shelved-by',
            msg('Shelved by'),
            (alert) => alert.shelved && alert.shelved.shelvedBy
          )}
          ${this.hasReadoutGraph
            ? html`
                <div class="readout-graph">
                  <div class="readout-graph-title">
                    <slot name="readout-graph-title">${msg('Readout')}</slot>
                  </div>
                  <div class="readout-graph-container">
                    <slot name="readout-graph"></slot>
                  </div>
                </div>
              `
            : nothing}
        </div>
        ${this.hasActions
          ? html`<div class="actions">
              <slot name="action"></slot>
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-detail-page': ObcAlertDetailPage;
  }
}
