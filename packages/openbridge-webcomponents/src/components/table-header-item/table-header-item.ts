import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './table-header-item.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';

export enum ObcTableHeaderItemType {
  Regular = 'Regular',
  IconOnly = 'IconOnly',
  Narrow = 'Narrow',
}

@customElement('obc-table-header-item')
export class ObcTableHeaderItem extends LitElement {
  @property({type: String}) type: ObcTableHeaderItemType =
    ObcTableHeaderItemType.Regular;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) showSortArrow = false;
  @property({type: String}) sortDirection: 'none' | 'asc' | 'desc' = 'none';
  @property({type: Boolean}) showDivider = false;
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) sortable = false;

  override render() {
    const classes = {
      wrapper: true,
      [`style-${(this.type ?? ObcTableHeaderItemType.Regular).toLowerCase()}`]:
        true,
      sortable: this.sortable,
      disabled: this.disabled,
      'has-leading-icon': this.hasLeadingIcon,
      'has-sort-arrow': this.showSortArrow,
      'sorted-asc': this.sortDirection === 'asc',
      'sorted-desc': this.sortDirection === 'desc',
      checked: this.checked,
    };
    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        part="wrapper"
      >
        <div class="visible-wrapper" part="visible-wrapper">
          ${this.hasLeadingIcon
            ? html`<span class="leading" part="leading"
                ><slot name="leading-icon"></slot
              ></span>`
            : nothing}
          ${this.type !== ObcTableHeaderItemType.IconOnly
            ? html`<span class="label" part="label"><slot></slot></span>`
            : nothing}
          ${this.showSortArrow
            ? html`<span class="trailing sort-icon" part="sort-icon"
                >${this._renderSortIcon()}</span
              >`
            : nothing}
        </div>
        ${this.showDivider
          ? html`<div class="divider" part="divider"></div>`
          : nothing}
      </button>
    `;
  }

  private _renderSortIcon() {
    switch (this.sortDirection) {
      case 'asc':
        return html`<obi-chevron-up-google></obi-chevron-up-google>`;
      case 'desc':
        return html`<obi-chevron-down-google></obi-chevron-down-google>`;
      default:
        return nothing;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-table-header-item': ObcTableHeaderItem;
  }
}
