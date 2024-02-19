import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcNavigationItem} from './navigation-item';
import './navigation-item';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {html, unsafeCSS} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcNavigationItem> = {
  title: 'Menu/Navigation item',
  tags: ['autodocs'],
  component: 'obc-navigation-item',
  args: {
    icon: '01-placeholder',
    label: 'Label',
  },
  argTypes: {
    icon: {
      options: iconIds,
      control: {type: 'select'},
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
    >
      ${args.icon
        ? iconIdToIconHtml(args.icon as unknown as string, {slot: 'icon'})
        : ''}
      ${args.label}
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
