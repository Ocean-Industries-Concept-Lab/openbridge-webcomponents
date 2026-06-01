import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcBreadcrumb, BreadcrumbItem} from './breadcrumb.js';
import './breadcrumb.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcBreadcrumb> = {
  title: 'UI Components/Menus and Navigation/Breadcrumb',
  tags: ['autodocs', '6.0'],
  component: 'obc-breadcrumb',
  args: {
    items: [
      {label: 'Page 1', icon: () => html`<obi-placeholder></obi-placeholder>`},
      {
        label: 'Page 1.2',
        icon: () => html`<obi-placeholder></obi-placeholder>`,
      },
      {
        label: 'Page 1.2.3',
        icon: () => html`<obi-placeholder></obi-placeholder>`,
      },
    ] as Array<BreadcrumbItem>,
  },
} satisfies Meta<ObcBreadcrumb>;

export default meta;
type Story = StoryObj<ObcBreadcrumb>;

export const Primary: Story = {
  args: {},
};

export const Label: Story = {
  args: {
    items: [
      {label: 'Page 1'},
      {label: 'Page 1.2'},
      {label: 'Page 1.2.3'},
    ] as Array<BreadcrumbItem>,
  },
};

export const Icon: Story = {
  args: {
    iconOnly: true,
  },
};
