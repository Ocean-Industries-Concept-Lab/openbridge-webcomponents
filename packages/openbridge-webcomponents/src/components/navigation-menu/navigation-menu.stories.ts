import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcNavigationMenu,
  ObcNavigationMenuVariant,
} from './navigation-menu.js';
import './navigation-menu.js';
import '../navigation-item/navigation-item.js';
import '../../icons/icon-applications.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-palette-dimming.js';
import '../../icons/icon-support-google.js';
import '../../icons/icon-settings-iec.js';
import '../../icons/icon-alert-list.js';
import '../vendor-button/vendor-button.js';
import {html} from 'lit';

const meta: Meta<typeof ObcNavigationMenu> = {
  title: 'menu/Navigation menu',
  tags: ['autodocs', '6.0'],
  component: 'obc-navigation-menu',
  render: (args) => {
    return html`
      <div style="height: 80vh">
        <obc-navigation-menu .variant=${args.variant}>
          <obc-navigation-item
            .variant=${args.variant}
            slot="main"
            label="Apps"
            href="#"
            group
          >
            <obi-applications slot="icon"></obi-applications>
          </obc-navigation-item>
          <obc-navigation-item
            .variant=${args.variant}
            slot="main"
            checked
            label="Alerts"
            href="#"
            group
          >
            <obi-alerts slot="icon"></obi-alerts>
          </obc-navigation-item>
          <obc-navigation-item
            .variant=${args.variant}
            slot="main"
            label="Dimming"
            href="#"
          >
            <obi-palette-dimming slot="icon"></obi-palette-dimming>
          </obc-navigation-item>

          <obc-navigation-item
            .variant=${args.variant}
            slot="footer"
            label="Help"
            href="#"
          >
            <obi-support-google slot="icon"></obi-support-google>
          </obc-navigation-item>
          <obc-navigation-item
            .variant=${args.variant}
            slot="footer"
            label="Settings"
            href="#"
          >
            <obi-settings-iec slot="icon"></obi-settings-iec>
          </obc-navigation-item>
          <obc-navigation-item
            .variant=${args.variant}
            slot="footer"
            label="Alert"
            href="#"
          >
            <obi-alert-list slot="icon"></obi-alert-list>
          </obc-navigation-item>
          <obc-vendor-button
            imageSrc="/companylogo-day.png"
            alt="logo"
            slot="logo"
          >
          </obc-vendor-button>
        </obc-navigation-menu>
      </div>
    `;
  },
  args: {
    variant: ObcNavigationMenuVariant.Full,
  },
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: Object.values(ObcNavigationMenuVariant),
    },
  },
} satisfies Meta<ObcNavigationMenu>;

export default meta;
type Story = StoryObj<ObcNavigationMenu>;

export const Primary: Story = {
  args: {},
};

export const IconOnly: Story = {
  args: {
    variant: ObcNavigationMenuVariant.IconOnly,
  },
};

export const Compact: Story = {
  args: {
    variant: ObcNavigationMenuVariant.Compact,
  },
};
