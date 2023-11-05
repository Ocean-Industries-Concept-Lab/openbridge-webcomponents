import type { Meta, StoryObj } from '@storybook/web-components';
import { NavigationMenu } from './NavigationMenu';
import './NavigationMenu';
import './NavigationItem'
import { html } from 'lit';

const meta: Meta<typeof NavigationMenu> = {
  title: 'menu/Navigation menu',
  tags: ['autodocs'],
  component: "ob-navigation-menu",
  render: (args) => {
    return html`
    <div style="height: 80vh">
        <ob-navigation-menu>
            <ob-navigation-item slot="main" icon="apps" label="Apps" href="#"></ob-navigation-item>
            <ob-navigation-item slot="main" checked icon="alerts" label="Alerts" href="#"></ob-navigation-item>
            <ob-navigation-item slot="main" icon="dimming" label="Dimming" href="#"></ob-navigation-item>
            
            <ob-navigation-item slot="footer" icon="support" label="Help" href="#"></ob-navigation-item>
            <ob-navigation-item slot="footer" icon="settings" label="Settings" href="#"></ob-navigation-item>
            <ob-navigation-item slot="footer" icon="alert-list" label="Alert" href="#"></ob-navigation-item>
            
            <img slot="logo" src="https://via.placeholder.com/320x96" alt="logo">
        </ob-navigation-menu>
    </div>
    `
  },
  args: {
  },
  argTypes: {
  },
} satisfies Meta<NavigationMenu>;

export default meta;
type Story = StoryObj<NavigationMenu>;

export const Primary: Story = {
  args: {
  },
};