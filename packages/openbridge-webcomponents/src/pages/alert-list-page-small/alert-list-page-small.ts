import { LitElement, PropertyValues, html, unsafeCSS } from 'lit';
import { customElement } from '../../decorator.js';
import compentStyle from './alert-list-page-small.css?inline';
import { msg } from '@lit/localize';
import { ObcAlertList } from '../../building-blocks/alert-list/alert-list.js';
import { property, state } from 'lit/decorators.js';
import "../../building-blocks/alert-list/alert-list.js";
import "../../components/icon-button/icon-button.js";
import "../../components/button/button.js";
import "../../icons/icon-silence-iec.js";
import "../../icons/icon-alerts.js";
import "../../icons/icon-alerts-shelf.js";
import "../../icons/icon-unacknowledged.js";
import "../../components/select/select.js";
import { ObcSelectChangeEvent } from '../../components/select/select.js';

export enum AlertListMode {
  UNACKED = 'unacked',
  ALL = 'all',
  SHELVED = 'shelved',
}

export type ObcAlertListPageAckAllClickEvent = CustomEvent<{
  mode: AlertListMode;
  visibleElements: {element: HTMLElement; index: number}[];
}>;

@customElement('obc-alert-list-page-small')
export class ObcAlertListPageSmall extends LitElement {
  @property({ type: Boolean }) hasShelved: boolean = false;
  @property({ type: Boolean }) canAckAll: boolean = false;
  @property({ type: String }) selectedMode: AlertListMode = AlertListMode.ALL;

  @state() private _mode: AlertListMode = AlertListMode.ALL;

  override connectedCallback(): void {
    super.connectedCallback();
    this._mode = this.selectedMode;
  }

  override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('selectedMode') && this._mode !== this.selectedMode) {
      this._mode = this.selectedMode;
    }
  }

  private handleAckAllVisibleClick() {
    const tabName = this.selectedMode;
    const panel = this.shadowRoot?.querySelector(
      `#alert-list-${tabName}`
    ) as ObcAlertList;
    const visibleElements = panel.getVisibleElements();
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          visibleElements: visibleElements,
          mode: tabName,
        },
      })
    );
  }

  private onModeSelect(e: ObcSelectChangeEvent) {
    this._mode = e.detail.value as AlertListMode;
  }

  override render() {
    const lists = [
      {
        name: AlertListMode.ALL,
        title: msg('All'),
        emptyTitle: msg('No active alerts'),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
      },
      {
        name: AlertListMode.UNACKED,
        title: msg('Unacked'),
        emptyTitle: msg('No unacknowledged alerts'),
        emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      },
    ];
    if (this.hasShelved) {
      lists.push({
        name: AlertListMode.SHELVED,
        title: msg('Shelved'),
        emptyTitle: msg('No shelved alerts'),
        emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      });
    }

    return html`
    <div class="wrapper">
        ${lists.map(
          (v) => html`
            <obc-alert-list
              class="alert-list ${this._mode === v.name ? 'selected' : ''}"
              id="alert-list-${v.name}"
            >
              <slot name="${v.name}" slot="items"></slot>
              <slot name="empty-${v.name}-title" slot="empty-title"
                >${v.emptyTitle}</slot
              >
              <slot name="empty-${v.name}-icon" slot="empty-icon"
                >${v.emptyIcon}</slot
              >
            </obc-alert-list>`
        )}
      <div class="action">
        <div class="btn-group">
          <obc-select
            .value=${this._mode}
            @change=${this.onModeSelect}
            .options=${lists.map(
              (v) => ({
                value: v.name,
                label: v.title,
              })
            )}
          >
          </obc-select>
        </div>

        <div class="btn-group">
          <obc-icon-button
            variant="normal"
            @click=${() => this.dispatchEvent(new CustomEvent('silence-click'))}>
            <obi-silence-iec></obi-silence-iec>
          </obc-icon-button>
          <obc-button
            variant="raised"
            .disabled=${!this.canAckAll}
            fullWidth
            class="btn"
            data-testid="ack-all-visible-button"
            @click=${() => this.handleAckAllVisibleClick()}
          >
            ${msg('ACK visible')}
          </obc-button>
        </div>
      </div>
    </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-page-small': ObcAlertListPageSmall;
  }
}
