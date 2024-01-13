import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import tbodystyle from './tbody.style';
import theadstyle from './thead.style';

@customElement('obc-table-cell')
export class ObcTableCell extends LitElement {
 override render() {
    return html`
      <slot></slot>
    `
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: table-cell;
      padding-right: 16px;
      padding-left: 16px;
      text-wrap: nowrap;
      box-sizing: border-box;
      border-bottom: 1px solid var(--border-divider-color); 
      vertical-align: middle;
      height: 48px;
    }

    :host(:first-child) {
      padding-left: 24px;
    }

    :host(:last-child) {
      padding-right: 24px;
    }
  `;
}

@customElement('obc-table-head-cell')
export class ObcTableHeadCell extends LitElement {
 override render() {
    return html`
        <slot></slot>
    `
  }

  static override styles = css`
    :host {
      box-sizing: border-box;
      position: relative;
      display: table-cell;
      padding-right: 16px;
      padding-left: 16px;
      border-bottom: 1px solid var(--border-divider-color); 
      vertical-align: middle;
    }

    :host(:first-child) {
      padding-left: 24px;
    }

    :host(:last-child) {
      padding-right: 24px;
    }

    :host(:not(:last-child))::after {
      content: '';
      display: block;
      position: absolute;
      top: 4px;
      bottom: 4px;
      right: -.5px;
      width: 1px;
      background-color: var(--border-divider-color);
      border-radius: 1px;
    }
  `;
}

@customElement('obc-table-row')
export class ObcTableRow extends LitElement {
 override render() {
    return html`
        <slot></slot>
    `
  }

  static override styles = css`
    :host {
      display: table-row;
      vertical-align: middle;
      border-bottom: 1px solid var(--border-divider-color);
    }
  `;
}

@customElement('obc-table-header')
export class ObcTableHeader extends LitElement {
 override render() {
    return html`
        <slot></slot>
    `
  }

  static override styles = [theadstyle, css`
    :host {
      display: table-header-group;
      position: sticky;
      top: 0;
    }
  `];
}

@customElement('obc-table-body')
export class ObcTableBody extends LitElement {
 override render() {
    return html`
        <slot></slot>
    `
  }

  static override styles = tbodystyle;
}

@customElement('obc-table')
export class ObcTable extends LitElement {
 override render() {
    return html`
        <slot></slot>
    `
  }

  static override styles = css`
  :host {
    display: table;
    width: 100%;
    overflow-y: auto;
  }
  
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-table': ObcTable,
    'obc-table-row': ObcTableRow,
    'obc-table-header': ObcTableHeader
  }
}
