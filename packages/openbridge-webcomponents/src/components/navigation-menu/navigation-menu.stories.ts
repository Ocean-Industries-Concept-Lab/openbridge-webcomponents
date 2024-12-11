import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcNavigationMenu } from './navigation-menu';
import './navigation-menu';
import '../navigation-item/navigation-item';
import '../../icons/icon-applications';
import '../../icons/icon-alerts';
import '../../icons/icon-palette-dimming';
import '../../icons/icon-support-google';
import '../../icons/icon-settings-iec';
import '../../icons/icon-alert-list';
import { html } from 'lit';

const meta: Meta<typeof ObcNavigationMenu> = {
  title: 'menu/Navigation menu',
  tags: ['autodocs'],
  component: 'obc-navigation-menu',
  render: () => {
    return html`
      <div style="height: 80vh">
        <obc-navigation-menu>
          <obc-navigation-item slot="main" label="Apps" href="#">
            <obi-applications slot="icon"></obi-applications>
          </obc-navigation-item>
          <obc-navigation-item slot="main" checked label="Alerts" href="#">
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

          <img slot="logo" src="/companylogo-day.png" alt="logo" />
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
