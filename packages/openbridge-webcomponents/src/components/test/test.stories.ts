import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcTest} from './test.js';
import './test.js';
import {html} from 'lit';

const meta: Meta<typeof ObcTest> = {
  title: 'Test/Test',
  tags: ['6.0'],
  component: 'obc-test',
  args: {},
} satisfies Meta<ObcTest>;

export default meta;
type Story = StoryObj<ObcTest>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const data = [
      {name: 'John Doe', age: 30, city: 'New York'},
      {name: 'Jane Smith', age: 25, city: 'Los Angeles'},
      {name: 'Mike Johnson', age: 35, city: 'Chicago'},
    ];
    const columns = [
      {label: 'Name', key: 'name'},
      {label: 'Age', key: 'age'},
      {
        label: 'City',
        key: 'city',
        renderCell: (
          value: string,
          row: {name: string; age: number; city: string},
          rowIndex: number
        ) =>
          html`<a href="https://www.google.com/maps/place/${value}"
            >${value}</a
          >`,
      },
    ];
    return html`<obc-test .data=${data} .columns=${columns}></obc-test>`;
  },
};
