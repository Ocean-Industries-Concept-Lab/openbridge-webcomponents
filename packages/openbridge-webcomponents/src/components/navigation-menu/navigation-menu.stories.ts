import type {Meta, StoryObj} from '@storybook/web-components';
import {NavigationMenu} from './navigation-menu';
import './navigation-menu';
import '../navigation-item/navigation-item';
import '../../icons/icon-01-apps';
import '../../icons/icon-14-alerts';
import '../../icons/icon-04-dimming';
import '../../icons/icon-03-support';
import '../../icons/icon-03-settings';
import '../../icons/icon-14-alert-list';
import {html} from 'lit';

const meta: Meta<typeof NavigationMenu> = {
  title: 'menu/Navigation menu',
  tags: ['autodocs'],
  component: 'obc-navigation-menu',
  render: () => {
    return html`
      <div style="height: 80vh">
        <obc-navigation-menu>
          <obc-navigation-item slot="main" icon="01-apps" label="Apps" href="#">
            <obi-01-apps slot="icon"></obi-01-apps>
          </obc-navigation-item>
          <obc-navigation-item
            slot="main"
            checked
            icon="14-alerts"
            label="Alerts"
            href="#"
          >
            <obi-14-alerts slot="icon"></obi-14-alerts>
          </obc-navigation-item>
          <obc-navigation-item
            slot="main"
            icon="04-dimming"
            label="Dimming"
            href="#"
          >
            <obi-04-dimming slot="icon"></obi-04-dimming>
          </obc-navigation-item>

          <obc-navigation-item
            slot="footer"
            icon="03-support"
            label="Help"
            href="#"
          >
            <obi-03-support slot="icon"></obi-03-support>
          </obc-navigation-item>
          <obc-navigation-item
            slot="footer"
            icon="03-settings"
            label="Settings"
            href="#"
          >
            <obi-03-settings slot="icon"></obi-03-settings>
          </obc-navigation-item>
          <obc-navigation-item
            slot="footer"
            icon="14-alert-list"
            label="Alert"
            href="#"
          >
            <obi-14-alert-list slot="icon"></obi-14-alert-list>
          </obc-navigation-item>

          <img
            slot="logo"
            src="https://via.placeholder.com/320x96"
            alt="logo"
          />
        </obc-navigation-menu>
      </div>
    `;
  },
  args: {},
  argTypes: {},
} satisfies Meta<NavigationMenu>;

export default meta;
type Story = StoryObj<NavigationMenu>;

export const Primary: Story = {
  args: {},
};
