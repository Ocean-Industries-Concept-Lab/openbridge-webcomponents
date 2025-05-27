import {LitElement, unsafeCSS} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import compentStyle from './card.css?inline';
import { literal, html } from 'lit-html/static.js';
import '../icon-button/icon-button';
import '../../icons/icon-close-google.js';
import '../../icons/icon-chevron-right-google.js';
import { classMap } from 'lit/directives/class-map.js';


@customElement('obc-card')
export class ObcCard extends LitElement {
  @property({ type: Boolean }) hasDialog = false;

  @query('dialog') dialog!: HTMLDialogElement;

  override render() {
    const wrapperTag = this.hasDialog ? literal`button` : literal`section`;
    return html`
      <${wrapperTag} class=${classMap({wrapper: true, 'has-dialog': this.hasDialog})} @click=${this.openDialog}>
      <div class="header">
        <div></div>
        <div class="title">
          <slot name="title"></slot>
        </div>
        ${this.hasDialog ? html`
          <obi-chevron-right-google class="icon"></obi-chevron-right-google>
        ` : html`<div></div>`}
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </${wrapperTag}>
      ${this.hasDialog ? html`
          <dialog class="dialog-wrapper" closedby="any" popover>
            <div class="header">
              <div></div>
              <div class="title">
                <slot name="dialog-title"></slot>
              </div>
              <div class="actions">
                <obc-icon-button @click=${this.closeDialog} variant="flat">
                  <obi-close-google></obi-close-google>
                </obc-icon-button>
              </div>
            </div>
            
            <div class="content">
              <slot name="dialog-content"></slot>
            </div>
        </dialog>
        ` : ''}
    `;
  }

  closeDialog(e: Event) {
    e.stopPropagation();
    this.dialog.close();
  }

  openDialog() {
    this.dialog.showModal();
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-card': ObcCard;
  }
}
