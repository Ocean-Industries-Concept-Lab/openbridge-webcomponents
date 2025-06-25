import { LitElement, html, nothing, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./alert-detail-page.css?inline";
import { property } from 'lit/decorators.js';
import '../../components/button/button.js';
import { ButtonVariant } from '../../components/button/button.js';

@customElement('obc-alert-detail-page')
export class ObcAlertDetailPage extends LitElement {
  @property({type: Boolean}) canShelf = false;
  @property({type: Boolean}) canAck = false;
  @property({type: Boolean}) hasReadoutGraph = false;

  override render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <div class="icon">
            <slot name="icon"></slot>
          </div>
          <div class="title">
            <slot name="title"></slot>
          </div>
        </div>
        <div class="divider"></div>
        <div class="body">
          <div class="description">
            <slot name="description"></slot>
          </div>
          <div class="detail">
            <div class="detail-title">
              <slot name="tag-label">Tag ID</slot>
            </div>
            <div class="detail-value">
              <slot name="tag-value"></slot>
            </div>
          </div>
          <div class="detail">
            <div class="detail-title">
              <slot name="tag-label">Category</slot>
            </div>
            <div class="detail-value">
              <slot name="category-value"></slot>
            </div>
          </div>
          <div class="detail">
            <div class="detail-title">
              <slot name="tag-label">Activated</slot>
            </div>
            <div class="detail-value">
              <slot name="activated-value"></slot>
            </div>
          </div>
          <div class="detail">
            <div class="detail-title">
              <slot name="timer-label">Alert timer</slot>
            </div>
            <div class="detail-value">
              <slot name="timer-value"></slot>
            </div>
          </div>
          ${this.hasReadoutGraph ? html`
            <div class="readout-graph">
              <div class="readout-graph-title">
                <slot name="readout-graph-title">Readout</slot>
              </div>
              <div class="readout-graph-container">
                <slot name="readout-graph"></slot>
              </div>
            </div>
          ` : nothing}
        </div>
        <div class="actions">
          ${this.canShelf ? html`
            <obc-button .variant=${ButtonVariant.normal} fullWidth>
              <slot name="shelf-label">Shelf</slot>
            </obc-button>
          ` : nothing}
          <obc-button .variant=${ButtonVariant.raised} .disabled=${!this.canAck} fullWidth>
            <slot name="ack-label">ACK</slot>
          </obc-button>
        </div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-detail-page': ObcAlertDetailPage
  }
}
