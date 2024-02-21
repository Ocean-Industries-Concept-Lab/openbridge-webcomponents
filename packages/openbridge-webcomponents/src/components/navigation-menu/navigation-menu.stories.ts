import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcNavigationMenu} from './navigation-menu';
import './navigation-menu';
import '../navigation-item/navigation-item';
import '../../icons/icon-01-apps';
import '../../icons/icon-14-alerts';
import '../../icons/icon-04-dimming';
import '../../icons/icon-03-support';
import '../../icons/icon-03-settings';
import '../../icons/icon-14-alert-list';
import {html} from 'lit';

const meta: Meta<typeof ObcNavigationMenu> = {
  title: 'menu/Navigation menu',
  tags: ['autodocs'],
  component: 'obc-navigation-menu',
  render: () => {
    return html`
      <div style="height: 80vh">
        <obc-navigation-menu>
          <obc-navigation-item slot="main" label="Apps" href="#">
            <obi-01-apps slot="icon"></obi-01-apps>
          </obc-navigation-item>
          <obc-navigation-item slot="main" checked label="Alerts" href="#">
            <obi-14-alerts slot="icon"></obi-14-alerts>
          </obc-navigation-item>
          <obc-navigation-item slot="main" label="Dimming" href="#">
            <obi-04-dimming slot="icon"></obi-04-dimming>
          </obc-navigation-item>

          <obc-navigation-item slot="footer" label="Help" href="#">
            <obi-03-support slot="icon"></obi-03-support>
          </obc-navigation-item>
          <obc-navigation-item slot="footer" label="Settings" href="#">
            <obi-03-settings slot="icon"></obi-03-settings>
          </obc-navigation-item>
          <obc-navigation-item slot="footer" label="Alert" href="#">
            <obi-14-alert-list slot="icon"></obi-14-alert-list>
          </obc-navigation-item>

          <img
            slot="logo"
            src="/companylogo.svg"
            alt="logo"
          />
        </obc-navigation-menu>
      </div>
    `;
  },
  args: {},
  argTypes: {},
} satisfies Meta<ObcNavigationMenu>;

export default meta;
type Story = StoryObj<ObcNavigationMenu>;

export const Primary: Story = {
  args: {},
};
