import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcTable} from './table.js';
import './table.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-acdc-converter.js';
import '../../icons/icon-ship-carferry.js';
import {widthDecorator} from '../../storybook-util.js';

const meta: Meta<typeof ObcTable> = {
  title: 'UI Components/Tables/Table',
  tags: ['6.0'],
  component: 'obc-table',
  decorators: [widthDecorator],
  argTypes: {
    width: {
      control: {type: 'range', min: 100, max: 1000, step: 50},
    },
  },
  args: {
    width: 700,
    data: [
      {name: 'John Doe', age: 30, city: 'New York'},
      {name: 'Jane Smith', age: 25, city: 'Los Angeles'},
      {name: 'Mike Johnson', age: 35, city: 'Chicago', selected: true},
    ],
    columns: [
      {label: 'Name', key: 'name', sortable: true, sortDirection: 'asc'},
      {label: 'Age', key: 'age', sortable: true},
      {
        label: 'Rendered content',
        key: 'city',
        sortable: false,
        renderHeaderIcon: () => html`<obi-placeholder></obi-placeholder>`,
        renderCell: (
          value: string,
          row: {name: string; age: number; city: string},
          rowIndex: number
        ) => {
          let icon = html`<obi-placeholder></obi-placeholder>`;
          if (rowIndex === 0) {
            icon = html`<obi-placeholder></obi-placeholder>`;
          } else if (rowIndex === 1) {
            icon = html`<obi-acdc-converter></obi-acdc-converter>`;
          } else if (rowIndex === 2) {
            icon = html`<obi-ship-carferry></obi-ship-carferry>`;
          }
          return html`${icon}`;
        },
      },
    ],
  },
} satisfies Meta<ObcTable<ObcTableRow>>;

export default meta;
type Story = StoryObj<ObcTable<ObcTableRow>>;

export const Primary: Story = {
  args: {},
};

export const ColumnDivider: Story = {
  args: {
    columnDivider: true,
  },
};

export const NarrowHeader: Story = {
  args: {
    narrowHeader: true,
  },
};

export const OverrideColumnSize: Story = {
  render: (args) => {
    return html` <style>
        obc-table::part(grid) {
          grid-template-columns: 1fr min-content 1fr;
        }
      </style>
      <obc-table
        .data=${args.data}
        .columns=${args.columns}
        .columnDivider=${args.columnDivider}
      ></obc-table>`;
  },
};
