import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcContextMenu} from './context-menu.js';
import './context-menu.js';
import '../navigation-item/navigation-item.js';
import '../../icons/icon-applications.js';
import '../../icons/icon-alerts.js';
import {html} from 'lit';

const meta: Meta<typeof ObcContextMenu> = {
  title: 'Application Components/Menu/Context menu',
  tags: ['autodocs'],
  component: 'obc-context-menu',
} satisfies Meta<ObcContextMenu>;

export default meta;
type Story = StoryObj<ObcContextMenu>;

export const Primary: Story = {
  render: () => {
    return html` <obc-context-menu>
      <obc-navigation-item label="Apps" .hasIcon=${true}>
        <obi-applications slot="icon"></obi-applications>
      </obc-navigation-item>
      <obc-navigation-item label="Alerts" .hasIcon=${true}>
        <obi-alerts slot="icon"></obi-alerts>
      </obc-navigation-item>
    </obc-context-menu>`;
  },
};
