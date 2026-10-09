import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './table.js';
import {
  ObcTableCellType,
  type ObcTable,
  type ObcTableCellData,
  type ObcTableColumn,
  type ObcTableRow,
} from './table.js';
import {deepActiveElement, tabStops} from '../../internal/_test-utils.js';

/**
 * Rows move with the arrows, as the class JSDoc records: Up and Down between
 * rows and from the first row to the header, Left and Right along the header,
 * Home and End to the first and last row. With hierarchy the table is a tree
 * grid (https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/): Right asks to
 * expand a collapsed group, Left asks to collapse an expanded one or moves to
 * the parent row. Left out: cell navigation and one tab stop for the grid.
 */
// Sortable columns: their headers are buttons, so the header takes focus.
const byText = (a: ObcTableCellData, b: ObcTableCellData) =>
  String('text' in a ? a.text : '').localeCompare(
    String('text' in b ? b.text : '')
  );
const columns: ObcTableColumn[] = [
  {label: 'Name', key: 'name', sortable: true, compareFunction: byText},
  {label: 'State', key: 'state', sortable: true, compareFunction: byText},
];

function cell(text: string) {
  return {type: ObcTableCellType.Regular, text} as const;
}

const flatRows: ObcTableRow[] = ['One', 'Two', 'Three'].map((name) => ({
  id: name.toLowerCase(),
  name: cell(name),
  state: cell('On'),
}));

const treeRows: ObcTableRow[] = [
  {id: 'a', level: 0, expandable: true, expanded: true, name: cell('A')},
  {id: 'a1', level: 1, parentId: 'a', name: cell('A1')},
  {id: 'b', level: 0, expandable: true, expanded: false, name: cell('B')},
];

async function setup(data: ObcTableRow[]) {
  const toggles: {rowId: string; expanded: boolean}[] = [];
  const screen = render(
    html`<button id="before">before</button>
      <obc-table
        aria-label="Equipment"
        .columns=${columns}
        .data=${data}
        @expand-toggle=${(
          event: CustomEvent<{rowId: string; expanded: boolean}>
        ) => toggles.push(event.detail)}
      ></obc-table>`
  );
  const table = screen.container.querySelector('obc-table') as ObcTable;
  await table.updateComplete;
  const rows = Array.from(
    table.shadowRoot!.querySelectorAll<HTMLElement>('button[role="row"]')
  );
  const headers = Array.from(
    table.shadowRoot!.querySelectorAll<HTMLElement>(
      '.grid-header [role="columnheader"]'
    )
  ).map((header) => header.shadowRoot?.querySelector('button') ?? header);
  const before = screen.container.querySelector('#before') as HTMLElement;
  return {table, rows, headers, before, toggles};
}

async function press(key: string) {
  await userEvent.keyboard(`{${key}}`);
}

describe('obc-table keyboard', () => {
  it('moves between rows with Up and Down, stopping at the last row', async () => {
    const {rows} = await setup(flatRows);
    rows[0].focus();
    await press('ArrowDown');
    expect(deepActiveElement()).toBe(rows[1]);
    await press('ArrowDown');
    await press('ArrowDown');
    expect(deepActiveElement()).toBe(rows[2]);
    await press('ArrowUp');
    expect(deepActiveElement()).toBe(rows[1]);
  });

  it('goes to the first and last row with Home and End', async () => {
    const {rows} = await setup(flatRows);
    rows[1].focus();
    await press('End');
    expect(deepActiveElement()).toBe(rows[2]);
    await press('Home');
    expect(deepActiveElement()).toBe(rows[0]);
  });

  it('moves between the first row and the header, and along the header', async () => {
    const {rows, headers} = await setup(flatRows);
    rows[0].focus();
    await press('ArrowUp');
    expect(deepActiveElement()).toBe(headers[0]);
    await press('ArrowRight');
    expect(deepActiveElement()).toBe(headers[1]);
    await press('ArrowRight');
    expect(deepActiveElement()).toBe(headers[1]);
    await press('ArrowLeft');
    expect(deepActiveElement()).toBe(headers[0]);
    await press('ArrowDown');
    expect(deepActiveElement()).toBe(rows[0]);
  });

  it('asks to expand and collapse group rows with Right and Left', async () => {
    const {rows, toggles} = await setup(treeRows);
    rows[2].focus();
    await press('ArrowRight');
    rows[0].focus();
    await press('ArrowLeft');
    expect(toggles).toEqual([
      {rowId: 'b', expanded: true},
      {rowId: 'a', expanded: false},
    ]);
  });

  it('moves from a child row to its parent with Left', async () => {
    const {rows, toggles} = await setup(treeRows);
    rows[1].focus();
    await press('ArrowLeft');
    expect(deepActiveElement()).toBe(rows[0]);
    expect(toggles).toEqual([]);
  });

  it('marks levels and expansion on the rows', async () => {
    const {rows} = await setup(treeRows);
    expect(
      rows.map((row) => [
        row.getAttribute('aria-level'),
        row.getAttribute('aria-expanded'),
      ])
    ).toEqual([
      ['1', 'true'],
      ['2', null],
      ['1', 'false'],
    ]);
  });

  it('puts every row in the tab sequence, as its Left out line records', async () => {
    const {rows, headers, before} = await setup(flatRows);
    before.focus();
    const stops = await tabStops(headers.length + rows.length);
    expect(stops.slice(-rows.length)).toEqual(rows);
  });
});
