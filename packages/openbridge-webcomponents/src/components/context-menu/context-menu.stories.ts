import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcContextMenu } from './context-menu';
import './context-menu';
import '../navigation-item/navigation-item';
import '../../icons/icon-applications';
import '../../icons/icon-alerts';
import { html } from 'lit';

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
        <obi-applications slot="icon"></obi-applications>
      </obc-navigation-item>
      <obc-navigation-item label="Alerts">
        <obi-alerts slot="icon"></obi-alerts>
      </obc-navigation-item>
    </obc-context-menu>`;
  },
};
