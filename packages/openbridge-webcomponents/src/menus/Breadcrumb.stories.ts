import type { Meta, StoryObj } from '@storybook/web-components';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import './Breadcrumb';
import bluePrint from './blueprints/Breadcrumb Icon=False, Label=True.png';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Menu/Breadcrumb',
  tags: ['autodocs'],
  component: "ob-breadcrumb",
  args: {
    items: [{ label: "Page 1"}, { label: "Page 1.2"}, { label: "Page 1.2.3"}]
  },
  parameters: {
    pixelPerfect: {
        overlay: {
            src: bluePrint,
        },
    },
  }
} satisfies Meta<Breadcrumb>;

export default meta;
type Story = StoryObj<Breadcrumb>;

export const Primary: Story = {
  args: {
  },
};