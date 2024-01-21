import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcBreadcrumb, BreadcrumbItem} from './breadcrumb';
import './breadcrumb';

const meta: Meta<typeof ObcBreadcrumb> = {
  title: 'Menu/Breadcrumb',
  tags: ['autodocs'],
  component: 'obc-breadcrumb',
  args: {
    items: [
      {label: 'Page 1'},
      {label: 'Page 1.2'},
      {label: 'Page 1.2.3'},
    ] as Array<BreadcrumbItem>,
  },
} satisfies Meta<ObcBreadcrumb>;

export default meta;
type Story = StoryObj<ObcBreadcrumb>;

export const Primary: Story = {
  args: {},
};
