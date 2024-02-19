import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcContextMenu} from './context-menu';
import './context-menu';
import '../navigation-item/navigation-item';
import '../../icons/icon-01-apps';
import '../../icons/icon-14-alerts';
import {html, unsafeCSS} from 'lit';

const meta: Meta<typeof ObcContextMenu> = {
  title: 'Menu/Context menu',
  tags: ['autodocs'],
  component: 'obc-context-menu',
} satisfies Meta<ObcContextMenu>;

export default meta;
type Story = StoryObj<ObcContextMenu>;

export const Primary: Story = {
  render: () => {
    return html` <obc-context-menu>
      <obc-navigation-item label="Apps">
        <obi-01-apps slot="icon"></obi-01-apps>
      </obc-navigation-item>
      <obc-navigation-item label="Alerts">
        <obi-14-alerts slot="icon"></obi-14-alerts>
      </obc-navigation-item>
    </obc-context-menu>`;
  },
};
