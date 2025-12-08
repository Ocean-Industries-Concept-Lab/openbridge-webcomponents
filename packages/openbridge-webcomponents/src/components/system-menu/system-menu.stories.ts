import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSystemMenu} from './system-menu.js';
import './system-menu.js';

const meta: Meta<typeof ObcSystemMenu> = {
  title: 'Application Components/Menus/System Menu',
  tags: ['6.0'],
  component: 'obc-system-menu',
  args: {
    condensed: false,
    wifiState: {
      enabled: true,
      connected: true,
      networkName: 'Wi-Fi 1',
      strength: 50,
    },
    audioState: {
      muted: false,
      volume: 50,
    },
    microphoneState: {
      muted: false,
      currentLevel: 50,
    },
    batteryState: {
      level: 50,
      charging: false,
    },
    showSettingsButton: true,
  },
} satisfies Meta<ObcSystemMenu>;

export default meta;
type Story = StoryObj<ObcSystemMenu>;

export const Full: Story = {
  
};

export const Condensed: Story = {
  args: {
    condensed: true,
  },
};

export const Off: Story = {
  args: {
    wifiState: {
      enabled: false,
      connected: false,
      networkName: 'Off',
      strength: 50,
    },
    audioState: {
      muted: true,
      volume: 50,
    },
    microphoneState: {
      muted: true,
      currentLevel: 0,
    },
    batteryState: {
      level: 50,
      charging: true,
    },
    showSettingsButton: true,
  },
};

export const AutioOnly: Story = {
  args: {
    wifiState: undefined,
    audioState: {
      muted: false,
      volume: 50,
    },
    microphoneState: {
      muted: false,
      currentLevel: 0,
    },
    batteryState: undefined,
    showSettingsButton: false,
  },
};
