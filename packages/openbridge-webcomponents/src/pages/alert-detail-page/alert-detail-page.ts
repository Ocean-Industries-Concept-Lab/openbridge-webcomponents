import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-detail-page.css?inline';
import {property} from 'lit/decorators.js';
import '../../components/button/button.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-command-locked-f.js';

export enum AlertDetailPageType {
  page = 'page',
  modal = 'modal',
  card = 'card',
}

export enum AlertDetailPageAlertStatus {
  active = 'active',
  acknowledged = 'acknowledged',
  shelved = 'shelved',
  resolved = 'resolved',
  blocked = 'blocked',
}

@customElement('obc-alert-detail-page')
export class ObcAlertDetailPage extends LitElement {
  @property({type: String}) type: AlertDetailPageType =
    AlertDetailPageType.page;
  @property({type: String}) alertStatus: AlertDetailPageAlertStatus =
    AlertDetailPageAlertStatus.active;

  @property({type: Boolean}) hasSubdescription = false;
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

  get alertStatusIcon() {
    if (this.alertStatus === AlertDetailPageAlertStatus.shelved) {
      return html`<obi-alerts-shelf class="icon status"></obi-alerts-shelf>`;
    } else if (this.alertStatus === AlertDetailPageAlertStatus.blocked) {
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
    isIcon: boolean = false
  ) {
    if (has) {
      return html`
        <div class="detail">
          <div class="detail-title">
            <slot name="${slotName}-label">${defaultTitle}</slot>
          </div>
          ${isIcon
            ? html`<div class="detail-icon">
                <slot name="${slotName}-value"></slot>
              </div>`
            : html`<div class="detail-value">
                <slot name="${slotName}-value"></slot>
              </div>`}
        </div>
      `;
    }
    return nothing;
  }

  override render() {
    const showCloseButton = [
      AlertDetailPageType.modal,
      AlertDetailPageType.page,
    ].includes(this.type);

    return html`
      <div class="wrapper type-${this.type} status-${this.alertStatus}">
        <div class="header">
          ${this.alertStatusIcon}
          <div class="icon alert">
            <slot name="icon"></slot>
          </div>
          <div class="title">
            <slot name="title"></slot>
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
            <slot name="description"></slot>
          </div>
          ${this.hasSubdescription
            ? html`<div class="description sub-description">
                <div class="label">
                  <slot name="subdescription-label">Subdescription</slot>
                </div>
                <slot name="subdescription"></slot>
              </div>`
            : nothing}
          ${this.renderDetail(this.hasTagId, 'tag', 'Tag ID')}
          ${this.renderDetail(this.hasCategory, 'category', 'Category', true)}
          ${this.renderDetail(this.hasActivated, 'activated', 'Activated')}
          ${this.renderDetail(this.hasTimer, 'timer', 'Alert timer')}
          ${this.renderDetail(
            this.hasAcknowledged,
            'acknowledged',
            'Acknowledged'
          )}
          ${this.renderDetail(this.hasRectified, 'rectified', 'Rectified')}
          ${this.renderDetail(
            this.hasAcknowledgedBy,
            'acknowledged-by',
            'Acknowledged by'
          )}
          ${this.renderDetail(
            this.hasShelvingTimer,
            'shelving-timer',
            'Shelfing timer'
          )}
          ${this.renderDetail(this.hasShelvedBy, 'shelved-by', 'Shelved by')}
          ${this.hasReadoutGraph
            ? html`
                <div class="readout-graph">
                  <div class="readout-graph-title">
                    <slot name="readout-graph-title">Readout</slot>
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
