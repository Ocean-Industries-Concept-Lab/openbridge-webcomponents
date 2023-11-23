import type { Meta, StoryObj } from '@storybook/web-components';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Menu/Breadcrumb',
  tags: ['autodocs'],
  component: "ob-breadcrumb",
  args: {
    items: [{ label: "Page 1"}, { label: "Page 1.2"}, { label: "Page 1.2.3"}]
  },
} satisfies Meta<Breadcrumb>;

export default meta;
type Story = StoryObj<Breadcrumb>;

export const Primary: Story = {
  args: {
  },
};