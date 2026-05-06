import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcSystemMenu,
  SystemMenuControlMode,
  SystemSubMenu,
} from './system-menu.js';
import './system-menu.js';

interface SystemMenuStoryArgs {
  wifiState?: ObcSystemMenu['wifiState'];
  audioState?: ObcSystemMenu['audioState'];
  microphoneState?: ObcSystemMenu['microphoneState'];
  batteryState?: ObcSystemMenu['batteryState'];
  condensed?: boolean;
  showSettingsButton?: boolean;
  audioControlMode?: SystemMenuControlMode;
  microphoneControlMode?: SystemMenuControlMode;
  activeSubMenu?: SystemSubMenu;
  externalControl?: boolean;
  smallScreen?: boolean;
}

function interactiveRender(args: SystemMenuStoryArgs) {
  return html`<obc-system-menu
    .wifiState=${args.wifiState}
    .audioState=${args.audioState
      ? {
          ...args.audioState,
          ...(args.audioControlMode !== undefined
            ? {controlMode: args.audioControlMode}
            : {}),
        }
      : undefined}
    .microphoneState=${args.microphoneState
      ? {
          ...args.microphoneState,
          ...(args.microphoneControlMode !== undefined
            ? {controlMode: args.microphoneControlMode}
            : {}),
        }
      : undefined}
    .batteryState=${args.batteryState}
    .condensed=${args.condensed ?? false}
    .showSettingsButton=${args.showSettingsButton ?? false}
    .activeSubMenu=${args.activeSubMenu ?? SystemSubMenu.main}
    .externalControl=${args.externalControl ?? false}
    .smallScreen=${args.smallScreen ?? false}
    @wifi-click=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.wifiState) {
        el.wifiState = {...el.wifiState, enabled: e.detail.enabled};
      }
    }}
    @wifi-network-change=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.wifiState) {
        el.wifiState = {...el.wifiState, networkName: e.detail.network};
      }
    }}
    @audio-click=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.audioState) {
        el.audioState = {...el.audioState, muted: e.detail.muted};
      }
    }}
    @audio-volume-change=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.audioState) {
        el.audioState = {...el.audioState, volume: e.detail.volume};
      }
    }}
    @audio-output-change=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.audioState) {
        el.audioState = {...el.audioState, selectedOutput: e.detail.output};
      }
    }}
    @microphone-click=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.microphoneState) {
        el.microphoneState = {...el.microphoneState, muted: e.detail.muted};
      }
    }}
    @microphone-input-change=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.microphoneState) {
        el.microphoneState = {
          ...el.microphoneState,
          selectedInput: e.detail.input,
        };
      }
    }}
    @battery-mode-change=${(e: CustomEvent) => {
      const el = e.target as ObcSystemMenu;
      if (el.batteryState) {
        el.batteryState = {...el.batteryState, selectedMode: e.detail.mode};
      }
    }}
  ></obc-system-menu>`;
}

const meta: Meta<SystemMenuStoryArgs> = {
  title: 'Application Components/Menus/System Menu',
  tags: ['6.0'],
  component: 'obc-system-menu',
  argTypes: {
    condensed: {table: {category: 'Attributes'}},
    showSettingsButton: {
      table: {category: 'Attributes'},
    },
    audioControlMode: {
      options: Object.values(SystemMenuControlMode),
      control: {type: 'select'},
      table: {category: 'Attributes'},
    },
    microphoneControlMode: {
      options: Object.values(SystemMenuControlMode),
      control: {type: 'select'},
      table: {category: 'Attributes'},
    },
    externalControl: {table: {category: 'Attributes'}},
    smallScreen: {table: {category: 'Attributes'}},
  },
} satisfies Meta<SystemMenuStoryArgs>;

export default meta;
type Story = StoryObj<SystemMenuStoryArgs>;

const defaultArgs: SystemMenuStoryArgs = {
  activeSubMenu: SystemSubMenu.main,
  condensed: false,
  audioControlMode: SystemMenuControlMode.muteButton,
  microphoneControlMode: SystemMenuControlMode.muteButton,
  wifiState: {
    enabled: true,
    connected: true,
    networkName: 'Wi-Fi 1',
    status: 'Connected, Secure',
    strength: 50,
    networks: [
      {name: 'Wi-Fi 1', signalStrength: 50},
      {name: 'Wi-Fi 2', signalStrength: 30},
      {name: 'Wi-Fi 3', signalStrength: 20},
    ],
    otherNetworks: [
      {name: 'Wi-Fi 4', signalStrength: 10},
      {name: 'Wi-Fi 5', signalStrength: 5},
      {name: 'Wi-Fi 6', signalStrength: 1},
    ],
  },
  audioState: {
    muted: false,
    volume: 80,
    outputs: [{name: 'Output 1'}, {name: 'Output 2'}, {name: 'Output 3'}],
    selectedOutput: 'Output 2',
  },
  microphoneState: {
    muted: false,
    currentLevel: 50,
    inputs: [{name: 'Input 1'}, {name: 'Input 2'}, {name: 'Input 3'}],
    selectedInput: 'Input 2',
    pushToTalk: false,
  },
  batteryState: {
    level: 50,
    charging: false,
    hasUsageButton: true,
    batterySavingMode: false,
    modes: [{name: 'Mode 1'}, {name: 'Mode 2'}, {name: 'Mode 3'}],
    selectedMode: 'Mode 2',
  },
  showSettingsButton: true,
};

export const Full: Story = {
  args: {...defaultArgs},
  render: interactiveRender,
};

export const Condensed: Story = {
  args: {...defaultArgs, condensed: true},
  render: interactiveRender,
};

export const Off: Story = {
  args: {
    ...defaultArgs,
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
      outputs: [{name: 'Output 1'}, {name: 'Output 2'}, {name: 'Output 3'}],
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
      modes: [{name: 'Mode 1'}, {name: 'Mode 2'}, {name: 'Mode 3'}],
      selectedMode: 'Mode 2',
    },
  },
  render: interactiveRender,
};

export const NoSubMenu: Story = {
  args: {
    ...defaultArgs,
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
  render: interactiveRender,
};

export const AutioOnly: Story = {
  args: {
    ...defaultArgs,
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
  render: interactiveRender,
};

export const WifiSubMenu: Story = {
  args: {...defaultArgs, activeSubMenu: SystemSubMenu.wifi},
  render: interactiveRender,
};

export const AudioSubMenu: Story = {
  args: {...defaultArgs, activeSubMenu: SystemSubMenu.audio},
  render: interactiveRender,
};

export const MicrophoneSubMenu: Story = {
  args: {...defaultArgs, activeSubMenu: SystemSubMenu.microphone},
  render: interactiveRender,
};

export const MicrophoneNoOptionsSubMenu: Story = {
  args: {
    ...defaultArgs,
    activeSubMenu: SystemSubMenu.microphone,
    microphoneState: {
      muted: false,
      currentLevel: 0,
      pushToTalk: false,
    },
  },
  render: interactiveRender,
};

export const BatterySubMenu: Story = {
  args: {...defaultArgs, activeSubMenu: SystemSubMenu.battery},
  render: interactiveRender,
};

export const SmallScreenMain: Story = {
  args: {
    ...defaultArgs,
    smallScreen: true,
    activeSubMenu: SystemSubMenu.main,
  },
  render: interactiveRender,
};

export const SmallScreenWifi: Story = {
  args: {
    ...defaultArgs,
    smallScreen: true,
    activeSubMenu: SystemSubMenu.wifi,
    wifiState: {
      enabled: true,
      connected: true,
      networkName: 'Wi-Fi 1',
      status: 'Connected, Secure',
      strength: 50,
      networks: [
        {name: 'Wi-Fi 1', signalStrength: 50},
        {name: 'Wi-Fi 2', signalStrength: 30},
        {name: 'Wi-Fi 3', signalStrength: 20},
        {name: 'Wi-Fi 4', signalStrength: 80},
        {name: 'Wi-Fi 5', signalStrength: 60},
        {name: 'Wi-Fi 6', signalStrength: 10},
        {name: 'Wi-Fi 7', signalStrength: 40},
        {name: 'Wi-Fi 8', signalStrength: 15},
      ],
    },
  },
  render: interactiveRender,
};

export const SmallScreenAudio: Story = {
  args: {
    ...defaultArgs,
    smallScreen: true,
    activeSubMenu: SystemSubMenu.audio,
    audioState: {
      muted: false,
      volume: 80,
      outputs: [
        {name: 'Output 1'},
        {name: 'Output 2'},
        {name: 'Output 3'},
        {name: 'Output 4'},
        {name: 'Output 5'},
        {name: 'Output 6'},
        {name: 'Output 7'},
        {name: 'Output 8'},
      ],
      selectedOutput: 'Output 2',
    },
  },
  render: interactiveRender,
};

export const SmallScreenMicrophone: Story = {
  args: {
    ...defaultArgs,
    smallScreen: true,
    activeSubMenu: SystemSubMenu.microphone,
    microphoneState: {
      muted: false,
      currentLevel: 50,
      inputs: [
        {name: 'Input 1'},
        {name: 'Input 2'},
        {name: 'Input 3'},
        {name: 'Input 4'},
        {name: 'Input 5'},
        {name: 'Input 6'},
        {name: 'Input 7'},
        {name: 'Input 8'},
      ],
      selectedInput: 'Input 2',
      pushToTalk: false,
    },
  },
  render: interactiveRender,
};

export const SmallScreenBattery: Story = {
  args: {
    ...defaultArgs,
    smallScreen: true,
    activeSubMenu: SystemSubMenu.battery,
    batteryState: {
      level: 50,
      charging: false,
      hasUsageButton: true,
      batterySavingMode: false,
      modes: [
        {name: 'Mode 1'},
        {name: 'Mode 2'},
        {name: 'Mode 3'},
        {name: 'Mode 4'},
        {name: 'Mode 5'},
        {name: 'Mode 6'},
        {name: 'Mode 7'},
        {name: 'Mode 8'},
      ],
      selectedMode: 'Mode 2',
    },
  },
  render: interactiveRender,
};
