import type {Meta, StoryObj} from '@storybook/web-components';
import {TopBar} from './top-bar';
import './top-bar';
import { html } from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof TopBar> = {
  title: 'Application/TopBar',
  tags: ['autodocs'],
  component: 'obc-top-bar',
  args: {
    showAppsButton: true,
    showDimmingButton: true,
    showClock: true,
    wideMenuButton: false,
  },
  argTypes: {
    showAppsButton: {
      control: {type: 'boolean'},
    },
    showDimmingButton: {
      control: {type: 'boolean'},
    },
    showClock: {
      control: {type: 'boolean'},
    },
    wideMenuButton: {
      control: {type: 'boolean'},
    },
    inactive: {
      control: {type: 'boolean'},
    },
    sizeSmall: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => html`
    <obc-top-bar
      ?show-apps-button=${args.showAppsButton}
      ?show-dimming-button=${args.showDimmingButton}
      ?show-clock=${args.showClock}
      ?wide-menu-button=${args.wideMenuButton}
      ?inactive=${args.inactive}
      ?size-small=${args.sizeSmall}
      ?settings=${args.settings}
      .breadcrumbItems=${args.breadcrumbItems}
    >
      <obc-icon-button variant="flat" slot="alerts">
        <obi-14-alerts></obi-14-alerts>
      </obc-icon-button>
    </obc-top-bar>
  `,
} satisfies Meta<TopBar>;

export default meta;
type Story = StoryObj<TopBar>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Regular: Story = {};

export const WideRailRegular: Story = {
  args: {
    wideMenuButton: true,
  },
};

export const Inactive: Story = {
  args: {
    inactive: true,
  },
};

export const Settings: Story = {
  args: {
    settings: true,
    breadcrumbItems: [
      {label: 'Settings 1'},
      {label: 'Page 1'},
      {label: 'Page 1.2'},
    ],
  },
};

export const Small: Story = {
  args: {
    sizeSmall: true,
  },
};
