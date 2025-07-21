import type {Meta, StoryObj} from '@storybook/web-components-vite';
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
import {expect} from 'storybook/test';

const meta: Meta<typeof ObcNavigationMenu> = {
  title: 'Application Components/Menu/Navigation menu',
  tags: ['!autodocs', '6.0'],
  component: 'obc-navigation-menu',
  render: (args) => {
    return html`
      <obc-navigation-menu
        .variant=${args.variant}
        .smallScreen=${args.smallScreen}
        style="position: fixed; top: 0; bottom: 0; left: 0;"
      >
        <obc-navigation-item-group slot="main" label="Apps">
          <obi-applications slot="icon"></obi-applications>
          <obc-navigation-item label="Sub item 1" hasIcon href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item label="Sub item 2" hasIcon href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item label="Sub item 3" hasIcon href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
        </obc-navigation-item-group>
        <obc-navigation-item-group slot="main" checked label="Alerts">
          <obi-alerts slot="icon"></obi-alerts>
          <obc-navigation-item label="Sub item 1" hasIcon href="#" checked>
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item label="Sub item 2" hasIcon href="#">
            <obi-placeholder slot="icon"></obi-placeholder>
          </obc-navigation-item>
          <obc-navigation-item-group label="Sub group">
            <obi-placeholder slot="icon"></obi-placeholder>
            <obc-navigation-item label="Sub item 1" hasIcon href="#">
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-navigation-item>
            <obc-navigation-item label="Sub item 2" hasIcon href="#">
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-navigation-item>
            <obc-navigation-item label="Sub item 3" hasIcon href="#">
              <obi-placeholder slot="icon"></obi-placeholder>
            </obc-navigation-item>
          </obc-navigation-item-group>
        </obc-navigation-item-group>
        <obc-navigation-item slot="main" label="Dimming" hasIcon href="#">
          <obi-palette-dimming slot="icon"></obi-palette-dimming>
        </obc-navigation-item>

        <obc-navigation-item slot="footer" label="Help" hasIcon href="#">
          <obi-support-google slot="icon"></obi-support-google>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Settings" hasIcon href="#">
          <obi-settings-iec slot="icon"></obi-settings-iec>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Alert" hasIcon href="#">
          <obi-alert-list slot="icon"></obi-alert-list>
        </obc-navigation-item>
        ${args.variant === ObcNavigationMenuVariant.Full && !args.smallScreen
          ? html` <obc-vendor-button
              imageSrc="/companylogo-day.png"
              alt="logo"
              slot="logo"
            >
            </obc-vendor-button>`
          : html` <obc-navigation-item slot="logo" label="Oicl" hasIcon>
              <img src="/oicl.svg" alt="logo" slot="icon" />
            </obc-navigation-item>`}
      </obc-navigation-menu>
    `;
  },
  args: {
    variant: ObcNavigationMenuVariant.Full,
    smallScreen: false,
  },
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: Object.values(ObcNavigationMenuVariant),
    },
    smallScreen: {
      control: {type: 'boolean'},
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
        <obc-navigation-item slot="main" label="Apps" hasIcon>
          <obi-applications slot="icon"></obi-applications>
        </obc-navigation-item>
        <obc-navigation-item slot="main" checked label="Alerts" hasIcon>
          <obi-alerts slot="icon"></obi-alerts>
        </obc-navigation-item>
        <obc-navigation-item slot="main" label="Dimming" hasIcon href="#">
          <obi-palette-dimming slot="icon"></obi-palette-dimming>
        </obc-navigation-item>

        <obc-navigation-item slot="footer" label="Help" hasIcon href="#">
          <obi-support-google slot="icon"></obi-support-google>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Settings" hasIcon href="#">
          <obi-settings-iec slot="icon"></obi-settings-iec>
        </obc-navigation-item>
        <obc-navigation-item slot="footer" label="Alert" hasIcon href="#">
          <obi-alert-list slot="icon"></obi-alert-list>
        </obc-navigation-item>
        <obc-navigation-item slot="logo" label="Oicl" hasIcon>
          <img src="/oicl.svg" alt="logo" slot="icon" />
        </obc-navigation-item>
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

export const SmallScreen: Story = {
  args: {
    variant: ObcNavigationMenuVariant.Full,
    smallScreen: true,
  },
};

export const TestDynamicElements: Story = {
  args: {
    variant: ObcNavigationMenuVariant.Compact,
  },
  play: async ({canvasElement}) => {
    const navigationMenu = canvasElement.querySelector('obc-navigation-menu');
    const newItem = document.createElement('obc-navigation-item');
    newItem.label = 'New Item';
    newItem.href = '#';
    newItem.setAttribute('slot', 'main');
    navigationMenu?.appendChild(newItem);
    await expect(newItem).toBeInTheDocument();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await expect(newItem.variant).toBe(ObcNavigationMenuVariant.Compact);
  },
};

export const TestDynamicElementsInSpan: Story = {
  args: {
    variant: ObcNavigationMenuVariant.Compact,
  },
  render: (args) => {
    return html`
      <obc-navigation-menu
        .variant=${args.variant}
        style="position: fixed; top: 0; bottom: 0; left: 0;"
      >
        <span slot="main" data-testid="main-slot"></span>
      </obc-navigation-menu>
    `;
  },
  play: async ({canvasElement}) => {
    const navigationMenu = canvasElement.querySelector('obc-navigation-menu');
    const newItem = document.createElement('obc-navigation-item');
    newItem.label = 'New Item';
    newItem.href = '#';
    const mainSlot = navigationMenu?.querySelector('[data-testid="main-slot"]');
    mainSlot?.appendChild(newItem);
    await expect(newItem).toBeInTheDocument();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await expect(newItem.variant).toBe(ObcNavigationMenuVariant.Compact);
  },
};
