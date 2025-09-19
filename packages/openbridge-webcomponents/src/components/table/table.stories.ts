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
        name: {
          type: ObcTableCellType.Regular,
          title: 'Doe',
          text: html`John`,
        },
        age: {type: ObcTableCellType.Regular, text: '30'},
        icon: {
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'New York'},
      },
      {
        id: '1',
        name: {type: ObcTableCellType.Regular, title: 'Smith', text: 'Jane'},
        age: {type: ObcTableCellType.Regular, text: '25'},
        icon: {
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Los Angeles'},
      },
      {
        id: '2',
        sticky: true,
        name: {type: ObcTableCellType.Regular, title: 'Johnson', text: 'Mike'},
        age: {type: ObcTableCellType.Regular, text: '35'},
        icon: {
          type: ObcTableCellType.Regular,
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
          type: ObcTableCellType.Regular,
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
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Houston'},
      },
      {
        id: '5',
        name: {type: ObcTableCellType.Regular, title: 'Davis', text: 'Emily'},
        age: {type: ObcTableCellType.Regular, text: '28'},
        icon: {
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Seattle'},
      },
      {
        id: '6',
        name: {type: ObcTableCellType.Regular, title: 'Wilson', text: 'Alex'},
        age: {type: ObcTableCellType.Regular, text: '42'},
        icon: {
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Boston'},
      },
      {
        id: '7',
        name: {type: ObcTableCellType.Regular, title: 'Anderson', text: 'Lisa'},
        age: {type: ObcTableCellType.Regular, text: '31'},
        icon: {
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Phoenix'},
      },
      {
        id: '8',
        name: {type: ObcTableCellType.Regular, title: 'Taylor', text: 'Mark'},
        age: {type: ObcTableCellType.Regular, text: '45'},
        icon: {
          type: ObcTableCellType.Regular,
          icon: html`<obi-placeholder></obi-placeholder>`,
        },
        city: {type: ObcTableCellType.Regular, text: 'Denver'},
      },
    ],
    columns: [
      {
        label: 'Name',
        key: 'name',
        sortable: true,
        sortDirection: 'asc',
        compareFunction: (a, b) =>
          (a.title as string).localeCompare(b.title as string),
      },
      {
        label: 'Age',
        key: 'age',
        sortable: true,
        compareFunction: (a, b) => a.text!.localeCompare(b.text!),
      },
      {label: 'Icon', key: 'icon', dividerRight: true},
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
} satisfies Meta<ObcTable>;

export default meta;
type Story = StoryObj<ObcTable>;

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

export const VerticalData: Story = {
  args: {
    data: meta.args!.data!.map((row) => {
      return {
        ...row,
        name: {
          ...row.name,
          vertical: true,
        },
      };
    }),
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

export const FullHeightCase: Story = {
  args: {
    rowDivider: true,
  },
  render: (args) => {
    return html` <obc-table
      style="height: 400px;"
      .data=${args.data}
      .columns=${args.columns}
      .rowDivider=${args.rowDivider}
    ></obc-table>`;
  },
};

export const SmallHeightCase: Story = {
  render: (args) => {
    return html` <obc-table
      style="height: 200px;"
      .data=${args.data}
      .columns=${args.columns}
      .rowDivider=${args.rowDivider}
    ></obc-table>`;
  },
};

export const AddingData: Story = {
  tags: ['skip-snapshots'],
  args: {},
  play: async ({canvasElement}) => {
    const table = canvasElement.querySelector('obc-table') as ObcTable;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newRow = {
      id: '5',
      name: {type: ObcTableCellType.Regular, title: 'Doe', text: 'Jr. John'},
      age: {type: ObcTableCellType.Regular, text: '5'},
      icon: {
        type: ObcTableCellType.LargeIcon,
        icon: html`<obi-placeholder></obi-placeholder>`,
      },
      city: {type: ObcTableCellType.Regular, text: 'New York City'},
    };
    const newData = [...table.data, newRow];
    table.data = newData;
  },
};

export const RemovingData: Story = {
  tags: ['skip-snapshots'],
  args: {},
  play: async ({canvasElement}) => {
    const table = canvasElement.querySelector('obc-table') as ObcTable;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    table.data = table.data.slice(0, -1);
  },
};

const newNames = [
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
  'Perez',
  'Thompson',
  'White',
  'Harris',
  'Sanchez',
  'Clark',
  'Ramirez',
  'Lewis',
  'Robinson',
  'Walker',
  'Young',
  'Allen',
  'King',
  'Wright',
  'Scott',
  'Torres',
  'Nguyen',
  'Hill',
  'Flores',
  'Green',
  'Adams',
  'Nelson',
  'Baker',
  'Hall',
  'Rivera',
  'Campbell',
  'Mitchell',
  'Carter',
  'Roberts',
];

export const Interactive: Story = {
  tags: ['skip-snapshots'],
  args: {
    rowDivider: false,
    striped: true,
  },
  render: (args, {canvasElement}) => {
    return html`
      <div
        style="display: flex; gap: 10px; flex-direction: column; height: 100%;"
      >
        <button
          @click=${() => {
            const table = canvasElement.querySelector('obc-table') as ObcTable;
            table.data = table.data.slice(0, -1);
          }}
        >
          Remove a row
        </button>
        <button
          @click=${() => {
            const table = canvasElement.querySelector('obc-table') as ObcTable;
            const nextId = table.data.length + 1;
            const newName = newNames[nextId % newNames.length];
            table.data = [
              ...table.data,
              {
                id: nextId.toString(),
                name: {
                  type: ObcTableCellType.Regular,
                  title: newName,
                  text: newName,
                },
                age: {
                  type: ObcTableCellType.Regular,
                  text: Math.floor(Math.random() * 100).toString(),
                },
                icon: {
                  type: ObcTableCellType.Regular,
                  icon: html`<obi-placeholder></obi-placeholder>`,
                },
                city: {
                  type: ObcTableCellType.Regular,
                  text: 'New York City' + nextId,
                },
              },
            ];
          }}
        >
          Add a row
        </button>
        <button
          @click=${() => {
            const index = Math.floor(Math.random() * args.data.length);
            const row = args.data[index];
            const newNameIndex = Math.floor(Math.random() * newNames.length);
            const newName = newNames[newNameIndex];
            row.name!.title! = newName;
            row.name!.text! = newName;
            const newData = [...args.data];
            const table = canvasElement.querySelector('obc-table') as ObcTable;
            table.data = newData;
          }}
        >
          Move a row
        </button>
        <obc-table
          style="height: 100%; min-height: 0;"
          .data=${args.data}
          .columns=${args.columns}
          .rowDivider=${args.rowDivider}
          .striped=${args.striped}
        ></obc-table>
      </div>
    `;
  },
};
