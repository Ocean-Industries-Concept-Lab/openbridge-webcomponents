import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcNavigationItem} from './navigation-item.js';
import './navigation-item.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html} from 'lit';
import { ObcNavigationMenuVariant } from '../navigation-menu/navigation-menu.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcNavigationItem> = {
  title: 'Menu/Navigation item',
  tags: ['autodocs'],
  component: 'obc-navigation-item',
  args: {
    icon: 'placeholder',
    label: 'Label',
  },
  argTypes: {
    icon: {
      options: iconIds,
      control: {type: 'select'},
    },
    variant: {
      control: {type: 'select'},
      options: Object.values(ObcNavigationMenuVariant),
    },
    label: {
      control: {type: 'text'},
    },
    checked: {
      control: {type: 'boolean'},
    },
    href: {
      control: {type: 'text'},
    },
  },
  render: (args) => {
    return html`<obc-navigation-item
      .checked=${args.checked}
      .href=${args.href}
      .label=${args.label}
      .variant=${args.variant}
      ?group=${args.group}
    >
      ${args.icon
        ? iconIdToIconHtml(args.icon as unknown as string, {slot: 'icon'})
        : ''}
    </obc-navigation-item>`;
  },
} satisfies Meta<ObcNavigationItem>;

export default meta;
type Story = StoryObj<ObcNavigationItem>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const IconOnly: Story = {
  args: {
    variant: ObcNavigationMenuVariant.IconOnly,
  },
};

export const Group: Story = {
  args: {
    group: true,
  }
};

export const GroupIconOnly: Story = {
  args: {
    group: true,
    variant: ObcNavigationMenuVariant.IconOnly,
  }
};
