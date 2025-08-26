import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTable,
  ObcTableCellData,
  ObcTableRow,
  ObcTableCellType,
} from './table.js';
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
      {
        id: '0',
        name: {type: ObcTableCellType.Regular, title: 'Doe', text: 'John'},
        age: {type: ObcTableCellType.Regular, text: '30'},
        icon: {
          type: ObcTableCellType.LargeIcon,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'New York'},
      },
      {
        id: '1',
        name: {type: ObcTableCellType.Regular, title: 'Smith', text: 'Jane'},
        age: {type: ObcTableCellType.Regular, text: '25'},
        icon: {
          type: ObcTableCellType.LargeIcon,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Los Angeles'},
      },
      {
        id: '2',
        name: {type: ObcTableCellType.Regular, title: 'Johnson', text: 'Mike'},
        age: {type: ObcTableCellType.Regular, text: '35'},
        icon: {
          type: ObcTableCellType.LargeIcon,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Chicago'},
      },
      {
        id: '3',
        name: {
          type: ObcTableCellType.Regular,
          title: 'Williams',
          text: 'Sarah',
        },
        age: {type: ObcTableCellType.Regular, text: '32'},
        icon: {
          type: ObcTableCellType.LargeIcon,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Miami'},
      },
      {
        selected: true,
        id: '4',
        name: {type: ObcTableCellType.Regular, title: 'Brown', text: 'David'},
        age: {type: ObcTableCellType.Regular, text: '38'},
        icon: {
          type: ObcTableCellType.LargeIcon,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Houston'},
      },
    ],
    columns: [
      {
        label: 'Name',
        key: 'name',
        sortable: true,
        sortDirection: 'asc',
        compareFunction: (a, b) => a.title!.localeCompare(b.title!),
      },
      {
        label: 'Age',
        key: 'age',
        sortable: true,
        compareFunction: (a, b) => a.text!.localeCompare(b.text!),
      },
      {label: 'Icon', key: 'icon'},
      {
        label: 'Rendered content',
        key: 'city',
        renderHeaderIcon: () => html`<obi-placeholder></obi-placeholder>`,
        renderCell: (
          value: ObcTableCellData,
          row: ObcTableRow,
          rowId: string
        ) => {
          let icon = html`<obi-placeholder></obi-placeholder>`;
          if (rowId === '0') {
            icon = html`<obi-placeholder></obi-placeholder>`;
          } else if (rowId === '1') {
            icon = html`<obi-acdc-converter></obi-acdc-converter>`;
          } else if (rowId === '2') {
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

export const RowDivider: Story = {
  args: {
    rowDivider: true,
  },
};

export const NarrowHeader: Story = {
  args: {
    narrowHeader: true,
  },
};

export const Striped: Story = {
  args: {
    striped: true,
  },
};

export const OverrideColumnSize: Story = {
  render: (args) => {
    return html` <style>
        obc-table::part(grid) {
          grid-template-columns: 1fr min-content min-content 1fr;
        }
      </style>
      <obc-table
        .data=${args.data}
        .columns=${args.columns}
        .rowDivider=${args.rowDivider}
      ></obc-table>`;
  },
};
