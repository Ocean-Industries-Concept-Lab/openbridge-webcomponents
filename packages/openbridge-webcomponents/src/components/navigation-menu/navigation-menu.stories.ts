import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcNavigationMenu,
  ObcNavigationMenuVariant,
} from './navigation-menu.js';
import './navigation-menu.js';
import '../navigation-item/navigation-item.js';
import '../navigation-item-group/navigation-item-group.js';
import '../../icons/icon-applications.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-palette-dimming.js';
import '../../icons/icon-support-google.js';
import '../../icons/icon-settings-iec.js';
import '../../icons/icon-alert-list.js';
import '../../icons/icon-placeholder.js';
import '../vendor-button/vendor-button.js';
import {html} from 'lit';

const meta: Meta<typeof ObcNavigationMenu> = {
  title: 'menu/Navigation menu',
  tags: ['!autodocs', '6.0'],
  component: 'obc-navigation-menu',
  render: (args) => {
    return html`
      <obc-navigation-menu
        .variant=${args.variant}
        style="position: fixed; top: 0; bottom: 0; left: 0;"
      >
        <obc-navigation-item-group
          .hug=${args.variant !== ObcNavigationMenuVariant.Full}
          slot="main"
          label="Apps"
        >
          <obi-applications slot="icon"></obi-applications>
          <obc-navigation-item label="Sub item 1" href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item label="Sub item 2" href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item label="Sub item 3" href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
        </obc-navigation-item-group>
        <obc-navigation-item-group
          .hug=${args.variant !== ObcNavigationMenuVariant.Full}
          slot="main"
          checked
          label="Alerts"
        >
          <obi-alerts slot="icon"></obi-alerts>
          <obc-navigation-item label="Sub item 1" href="#" checked>
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item label="Sub item 2" href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item-group
            .hug=${args.variant !== ObcNavigationMenuVariant.Full}
            label="Sub group"
          >
            <obi-placeholder slot="icon"></obi-placeholder>
            <obc-navigation-item label="Sub item 1" href="#">
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-navigation-item>
            <obc-navigation-item label="Sub item 2" href="#">
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-navigation-item>
            <obc-navigation-item label="Sub item 3" href="#">
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-navigation-item>
          </obc-navigation-item-group>
        </obc-navigation-item-group>
        <obc-navigation-item slot="main" label="Dimming" href="#">
          <obi-palette-dimming slot="icon"></obi-palette-dimming>
        </obc-navigation-item>

        <obc-navigation-item slot="footer" label="Help" href="#">
          <obi-support-google slot="icon"></obi-support-google>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Settings" href="#">
          <obi-settings-iec slot="icon"></obi-settings-iec>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Alert" href="#">
          <obi-alert-list slot="icon"></obi-alert-list>
        </obc-navigation-item>
        <obc-vendor-button
          imageSrc="/companylogo-day.png"
          alt="logo"
          slot="logo"
        >
        </obc-vendor-button>
      </obc-navigation-menu>
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

export const Full: Story = {
  args: {},
};

/**
 * Note that Icon only should not be used when there are items with sub items.
 * Use IconOnlyLarge instead.
 */
export const IconOnly: Story = {
  render: (args) => {
    return html`
      <obc-navigation-menu
        .variant=${args.variant}
        style="position: fixed; top: 0; bottom: 0; left: 0;"
      >
        <obc-navigation-item
          .hug=${args.variant !== ObcNavigationMenuVariant.Full}
          slot="main"
          label="Apps"
        >
          <obi-applications slot="icon"></obi-applications>
        </obc-navigation-item>
        <obc-navigation-item
          .hug=${args.variant !== ObcNavigationMenuVariant.Full}
          slot="main"
          checked
          label="Alerts"
        >
          <obi-alerts slot="icon"></obi-alerts>
        </obc-navigation-item>
        <obc-navigation-item slot="main" label="Dimming" href="#">
          <obi-palette-dimming slot="icon"></obi-palette-dimming>
        </obc-navigation-item>

        <obc-navigation-item slot="footer" label="Help" href="#">
          <obi-support-google slot="icon"></obi-support-google>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Settings" href="#">
          <obi-settings-iec slot="icon"></obi-settings-iec>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Alert" href="#">
          <obi-alert-list slot="icon"></obi-alert-list>
        </obc-navigation-item>
        <obc-vendor-button
          imageSrc="/companylogo-day.png"
          alt="logo"
          slot="logo"
        >
        </obc-vendor-button>
      </obc-navigation-menu>
    `;
  },
  args: {
    variant: ObcNavigationMenuVariant.IconOnly,
  },
};

export const IconOnlyLarge: Story = {
  args: {
    variant: ObcNavigationMenuVariant.IconOnlyLarge,
  },
};

export const Compact: Story = {
  args: {
    variant: ObcNavigationMenuVariant.Compact,
  },
};
