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
import {CheckboxStatus} from '../checkbox/checkbox.js';
import {TagColor} from '../tag/tag.js';

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

const playgroundColumns = [
  {
    label: 'Label',
    key: 'label',
    sortable: true,
    sortDirection: 'none' as const,
    compareFunction: (a: ObcTableCellData, b: ObcTableCellData) =>
      (a.text ?? '').localeCompare(b.text ?? ''),
  },
];

const playgroundData: ObcTableRow[] = [
  {
    id: '0',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
  {
    id: '1',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
  {
    id: '2',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
  {
    id: '3',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
  {
    id: '4',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
  {
    id: '5',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
  {
    id: '6',
    label: {type: ObcTableCellType.Regular, text: 'Table item'},
  },
];

const renderTable = (args: ObcTable) => {
  return html`<obc-table
    .data=${args.data}
    .columns=${args.columns}
    .rowDivider=${args.rowDivider}
    .narrowHeader=${args.narrowHeader}
    .noHeader=${args.noHeader}
    .striped=${args.striped}
    .selectable=${args.selectable}
    .defaultSelectedRowIds=${args.defaultSelectedRowIds}
    .selectedRowIds=${args.selectedRowIds}
    .selectAllAriaLabel=${args.selectAllAriaLabel}
    .selectAllLabel=${args.selectAllLabel}
  ></obc-table>`;
};

export const Primary: Story = {
  args: {},
};

export const Playground: Story = {
  args: {
    width: 320,
    height: 460,
    selectable: true,
    rowDivider: true,
    striped: false,
    narrowHeader: false,
    noHeader: false,
    selectAllLabel: 'Label',
    selectAllAriaLabel: 'Select all table items',
    defaultSelectedRowIds: ['1', '4'],
    columns: playgroundColumns,
    data: playgroundData,
  },
  argTypes: {
    columns: {
      table: {disable: true},
    },
    data: {
      table: {disable: true},
    },
    selectedRowIds: {
      table: {disable: true},
    },
    width: {
      control: {type: 'range', min: 200, max: 900, step: 10},
    },
    height: {
      control: {type: 'range', min: 240, max: 900, step: 10},
    },
    selectable: {
      control: {type: 'boolean'},
    },
    rowDivider: {
      control: {type: 'boolean'},
    },
    striped: {
      control: {type: 'boolean'},
    },
    narrowHeader: {
      control: {type: 'boolean'},
    },
    noHeader: {
      control: {type: 'boolean'},
    },
    defaultSelectedRowIds: {
      control: {type: 'object'},
    },
    selectAllLabel: {
      control: {type: 'text'},
    },
    selectAllAriaLabel: {
      control: {type: 'text'},
    },
  },
  parameters: {
    controls: {expanded: true},
    docs: {
      description: {
        story:
          'Interactive playground for table selection, row styling, and header options.',
      },
    },
  },
  render: renderTable,
};

export const CheckboxCells: Story = {
  tags: ['skip-snapshots'],
  args: {
    columns: [
      {label: 'Name', key: 'name'},
      {label: 'Track', key: 'track'},
      {label: 'Action', key: 'action'},
    ],
    data: [
      {
        id: '0',
        name: {type: ObcTableCellType.Regular, title: 'Stella', text: 'Brown'},
        track: {
          type: ObcTableCellType.Checkbox,
          status: CheckboxStatus.checked,
          label: '',
        },
        action: {type: ObcTableCellType.Button, text: 'Open'},
      },
      {
        id: '1',
        name: {type: ObcTableCellType.Regular, title: 'Aurora', text: 'Doe'},
        track: {
          type: ObcTableCellType.Checkbox,
          status: CheckboxStatus.unchecked,
          label: '',
        },
        action: {type: ObcTableCellType.Button, text: 'Details'},
      },
      {
        id: '2',
        name: {type: ObcTableCellType.Regular, title: 'Nimbus', text: 'Jane'},
        track: {
          type: ObcTableCellType.Checkbox,
          status: CheckboxStatus.mixed,
          label: '',
        },
        action: {type: ObcTableCellType.Button, text: 'Open'},
      },
      {
        id: '3',
        name: {type: ObcTableCellType.Regular, title: 'Dock', text: 'Disabled'},
        track: {
          type: ObcTableCellType.Checkbox,
          status: CheckboxStatus.checked,
          disabled: true,
          label: '',
        },
        action: {type: ObcTableCellType.Button, text: 'Open'},
      },
    ],
  },
};

export const TagMultiTagCells: Story = {
  args: {
    columns: [
      {label: 'Name', key: 'name'},
      {label: 'Status', key: 'status'},
      {label: 'Tags', key: 'tags'},
      {label: 'Action', key: 'action'},
    ],
    data: [
      {
        id: '0',
        name: {type: ObcTableCellType.Regular, title: 'Stella', text: 'Brown'},
        status: {
          type: ObcTableCellType.Tag,
          tag: {
            id: 'active',
            label: 'Active',
            color: TagColor.green,
          },
        },
        tags: {
          type: ObcTableCellType.Tag,
          wrap: true,
          tags: [
            {id: 'priority', label: 'Priority', color: TagColor.red},
            {id: 'eta', label: 'ETA 12:40', color: TagColor.blue},
          ],
        },
        action: {type: ObcTableCellType.Button, text: 'Open'},
      },
      {
        id: '1',
        name: {type: ObcTableCellType.Regular, title: 'Aurora', text: 'Doe'},
        status: {
          type: ObcTableCellType.Tag,
          tag: {
            id: 'attention',
            label: 'Attention',
            color: TagColor.yellow,
            hasIcon: true,
            icon: html`<obi-placeholder></obi-placeholder>`,
          },
        },
        tags: {
          type: ObcTableCellType.Tag,
          tags: [
            {id: 'eta', label: 'ETA 12:40', color: TagColor.cyan},
            {
              id: 'alarm',
              label: 'Alarm',
              color: TagColor.orange,
              hasIcon: true,
              icon: html`<obi-placeholder></obi-placeholder>`,
            },
            {id: 'nav', label: 'Nav', color: TagColor.teal},
          ],
        },
        action: {type: ObcTableCellType.Button, text: 'Details'},
      },
    ],
  },
};

export const HorizontalBarCells: Story = {
  args: {
    columns: [
      {label: 'Name', key: 'name'},
      {label: 'Load', key: 'load'},
      {label: 'Action', key: 'action'},
    ],
    data: [
      {
        id: '0',
        name: {type: ObcTableCellType.Regular, title: 'Stella', text: 'Brown'},
        load: {
          type: ObcTableCellType.HorizontalBar,
          value: 45,
          setpoint: 60,
        },
        action: {type: ObcTableCellType.Button, text: 'Open'},
      },
      {
        id: '1',
        name: {type: ObcTableCellType.Regular, title: 'Aurora', text: 'Doe'},
        load: {
          type: ObcTableCellType.HorizontalBar,
          value: 70,
          setpoint: 80,
        },
        action: {type: ObcTableCellType.Button, text: 'Details'},
      },
    ],
  },
};

export const SelectableTable: Story = {
  tags: ['skip-snapshots'],
  args: {
    selectable: true,
    columns: [
      {label: 'Name', key: 'name'},
      {label: 'Track', key: 'track'},
      {label: 'Action', key: 'action'},
    ],
    data: [
      {
        id: '0',
        name: {type: ObcTableCellType.Regular, title: 'Stella', text: 'Brown'},
        track: {
          type: ObcTableCellType.Checkbox,
          status: CheckboxStatus.checked,
        },
        action: {type: ObcTableCellType.Button, text: 'Open'},
      },
      {
        id: '1',
        name: {type: ObcTableCellType.Regular, title: 'Aurora', text: 'Doe'},
        track: {
          type: ObcTableCellType.Checkbox,
          status: CheckboxStatus.unchecked,
        },
        action: {type: ObcTableCellType.Button, text: 'Details'},
      },
    ],
  },
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
                  type: ObcTableCellType.LargeIcon,
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
