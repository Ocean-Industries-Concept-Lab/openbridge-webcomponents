import {HTMLTemplateResult, LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './communication-table.css?inline';
import {property} from 'lit/decorators.js';
import {
  ObcTableCellType,
  ObcTableColumn,
  ObcTableRow,
  ObcTableRowClickEvent,
} from '../table/table.js';

export interface ObcCommunicationTableRow {
  id: string;
  leadingIcon?: HTMLTemplateResult;
  title: string | HTMLTemplateResult;
  description?: string | HTMLTemplateResult;
  descriptionIcon?: HTMLTemplateResult;
  label1?: string | HTMLTemplateResult;
  label2?: string | HTMLTemplateResult;
  actionIcon?: HTMLTemplateResult;
  unread?: boolean;
  selected?: boolean;
}

export type ObcCommunicationTableRowClickEvent = CustomEvent<{
  rowId: string;
}>;

/**
 *
 * @fires row-click {ObcCommunicationTableRowClickEvent} When a row is clicked.
 */
@customElement('obc-communication-table')
export class ObcCommunicationTable extends LitElement {
  @property({type: Array}) data: ObcCommunicationTableRow[] = [];
  @property({type: Boolean}) noLeadingIcon = false;
  @property({type: Boolean}) noLabel = false;
  @property({type: Boolean}) noActionIcon = false;
  @property({type: Boolean}) largeLeadingIcon = false;

  override render() {
    const columns: ObcTableColumn[] = [];
    if (!this.noLeadingIcon) {
      columns.push({
        label: '',
        key: 'leadingIcon',
      });
    }
    columns.push({
      label: 'Title',
      key: 'title',
    });
    if (!this.noLabel) {
      columns.push({
        label: 'Label',
        key: 'label',
      });
    }
    if (!this.noActionIcon) {
      columns.push({
        label: 'Action',
        key: 'actionIcon',
      });
    }
    const data = this.data.map(
      (item) =>
        ({
          selected: item.selected,
          id: item.id,
          leadingIcon: {
            type: ObcTableCellType.Regular,
            largeIcon: this.largeLeadingIcon,
            icon: item.leadingIcon,
            cssPart:
              'leading-icon' +
              (item.unread ? ' unread' : '') +
              (item.selected ? ' selected' : ''),
          },
          title: {
            type: ObcTableCellType.Regular,
            title: item.title,
            text: item.description,
            icon: item.descriptionIcon,
            vertical: true,
            cssPart:
              'message' +
              (item.unread ? ' unread' : '') +
              (item.descriptionIcon ? '' : ' no-icon') +
              (item.selected ? ' selected' : ''),
          },
          label: {
            type: ObcTableCellType.Regular,
            title: item.label1,
            text: item.label2,
            vertical: true,
            cssPart: 'label',
          },
          actionIcon: {
            type: ObcTableCellType.Regular,
            icon: item.actionIcon,
            cssPart: 'actionIcon',
          },
        }) satisfies ObcTableRow
    );
    return html`<obc-table
      .data=${data}
      .columns=${columns}
      noHeader
      rowDivider
      @row-click=${this._handleRowClick}
    ></obc-table>`;
  }

  private _handleRowClick(event: ObcTableRowClickEvent) {
    this.dispatchEvent(
      new CustomEvent('row-click', {
        detail: {rowId: event.detail.row.id},
      }) as ObcCommunicationTableRowClickEvent
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-communication-table': ObcCommunicationTable;
  }
}
