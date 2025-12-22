import {LitElement, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './table-header-item.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';
import {literal, html} from 'lit/static-html.js';

export enum ObcTableHeaderItemType {
  Regular = 'Regular',
  IconOnly = 'IconOnly',
  Narrow = 'Narrow',
}

export enum ObcTableHeaderItemSortDirection {
  None = 'none',
  Asc = 'asc',
  Desc = 'desc',
}

@customElement('obc-table-header-item')
export class ObcTableHeaderItem extends LitElement {
  @property({type: String}) type: ObcTableHeaderItemType =
    ObcTableHeaderItemType.Regular;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: String}) sortDirection: ObcTableHeaderItemSortDirection =
    ObcTableHeaderItemSortDirection.None;
  @property({type: Boolean}) showDivider = false;
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) sortable = false;

  override render() {
    const classes = {
      wrapper: true,
      [`style-${(this.type ?? ObcTableHeaderItemType.Regular).toLowerCase()}`]: true,
      sortable: this.sortable,
      disabled: this.disabled,
      'has-leading-icon': this.hasLeadingIcon,
      'sorted-asc': this.sortDirection === ObcTableHeaderItemSortDirection.Asc,
      'sorted-desc':
        this.sortDirection === ObcTableHeaderItemSortDirection.Desc,
      checked: this.checked,
    };
    const tag = this.sortable ? literal`button` : literal`div`;
    return html`
      <${tag}
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        part="wrapper"
      >
        <div class="visible-wrapper" part="visible-wrapper">
          ${
            this.hasLeadingIcon
              ? html`<span class="leading" part="leading"
                  ><slot name="leading-icon"></slot
                ></span>`
              : nothing
          }
          ${
            this.type !== ObcTableHeaderItemType.IconOnly
              ? html`<span class="label" part="label"><slot></slot></span>`
              : nothing
          }
          ${
            this.sortable
              ? html`<span class="trailing sort-icon" part="sort-icon"
                  >${this._renderSortIcon()}</span
                >`
              : nothing
          }
        </div>
        ${
          this.showDivider
            ? html`<div class="divider" part="divider"></div>`
            : nothing
        }
      </${tag}>
    `;
  }

  private _renderSortIcon() {
    switch (this.sortDirection) {
      case ObcTableHeaderItemSortDirection.Asc:
        return html`<obi-chevron-up-google></obi-chevron-up-google>`;
      case ObcTableHeaderItemSortDirection.Desc:
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
