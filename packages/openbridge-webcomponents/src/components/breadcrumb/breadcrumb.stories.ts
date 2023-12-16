import type { Meta, StoryObj } from '@storybook/web-components';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb';
import './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Menu/Breadcrumb',
  tags: ['autodocs'],
  component: "obc-breadcrumb",
  args: {
    items: [{ label: "Page 1"}, { label: "Page 1.2"}, { label: "Page 1.2.3"}] as Array<BreadcrumbItem>
  },
} satisfies Meta<Breadcrumb>;

export default meta;
type Story = StoryObj<Breadcrumb>;

export const Primary: Story = {
  args: {
  },
};