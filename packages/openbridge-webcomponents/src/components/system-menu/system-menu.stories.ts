import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSystemMenu, SystemSubMenu} from './system-menu.js';
import './system-menu.js';

const meta: Meta<typeof ObcSystemMenu> = {
  title: 'Application Components/Menus/System Menu',
  tags: ['6.0'],
  component: 'obc-system-menu',
  args: {
    activeSubMenu: SystemSubMenu.main,
    condensed: false,
    wifiState: {
      enabled: true,
      connected: true,
      networkName: 'Wi-Fi 1',
      status: 'Connected, Secure',
      strength: 50,
    },
    audioState: {
      muted: false,
      volume: 80,
      outputs: [
        {name: 'Output 1'},
        {name: 'Output 2'},
        {name: 'Output 3'},
      ],
      selectedOutput: 'Output 2',
    },
    microphoneState: {
      muted: false,
      currentLevel: 50,
      inputs: [
        {name: 'Input 1'},
        {name: 'Input 2'},
        {name: 'Input 3'},
      ],
      selectedInput: 'Input 2',
      pushToTalk: false,
    },
    batteryState: {
      level: 50,
      charging: false,
      hasUsageButton: true,
      batterySavingMode: false,
      modes: [
        {name: 'Mode 1'},
        {name: 'Mode 2'},
        {name: 'Mode 3'},
      ],
      selectedMode: 'Mode 2',
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
      status: 'Connected, Secure',
    },
    audioState: {
      muted: true,
      volume: 0,
      outputs: [
        {name: 'Output 1'},
        {name: 'Output 2'},
        {name: 'Output 3'},
      ],
      selectedOutput: 'Output 2',
    },
    microphoneState: {
      muted: true,
      currentLevel: 0,
    },
    batteryState: {
      level: 50,
      charging: true,
      hasUsageButton: true,
      batterySavingMode: false,
      modes: [
        {name: 'Mode 1'},
        {name: 'Mode 2'},
        {name: 'Mode 3'},
      ],
      selectedMode: 'Mode 2',
    },
    showSettingsButton: true,
  },
};

export const NoSubMenu: Story = {
  args: {
    wifiState: {
      enabled: true,
      connected: true,
      networkName: 'Wi-Fi 1',
      strength: 50,
      status: 'Connected, Secure',
    },
    audioState: {
      muted: false,
      volume: 80,
    },
    microphoneState: {
      muted: false,
      currentLevel: 50,
    },
    batteryState: {
      level: 50,
      charging: false,
      hasUsageButton: false,
    },

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

export const WifiSubMenu: Story = {
  args: {
    activeSubMenu: SystemSubMenu.wifi,
  },
};

export const AudioSubMenu: Story = {
  args: {
    activeSubMenu: SystemSubMenu.audio,
  },
};

export const MicrophoneSubMenu: Story = {
  args: {
    activeSubMenu: SystemSubMenu.microphone,
  },
};

export const MicrophoneNoOptionsSubMenu: Story = {
  args: {
    activeSubMenu: SystemSubMenu.microphone,
    microphoneState: {
      muted: false,
      currentLevel: 0,
      pushToTalk: false,
    },
  },
};

export const BatterySubMenu: Story = {
  args: {
    activeSubMenu: SystemSubMenu.battery,
  },
};