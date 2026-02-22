import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcSystemButton} from './system-button.js';
import './system-button.js';
import {SystemButtonVariant} from './system-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcSystemButton> = {
  title: 'Application Components/Menus/System Button',
  tags: ['6.0'],
  component: 'obc-system-button',
  args: {
    variant: SystemButtonVariant.actions,
    systemState: {
      wifi: {connected: true, strength: 3, enabled: true},
      audio: {muted: false, volume: 65, enabled: true},
      microphone: {muted: false, sensitivity: 80, enabled: true},
      battery: {level: 78, charging: false, enabled: true},
      gps: {connected: true, quality: 'medium', enabled: true},
    },
  },
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: Object.values(SystemButtonVariant),
    },
    disabled: {
      control: {type: 'boolean'},
    },
    // WiFi Controls
    'systemState.wifi.enabled': {
      control: {type: 'boolean'},
      name: 'WiFi Enabled',
    },
    'systemState.wifi.connected': {
      control: {type: 'boolean'},
      name: 'WiFi Connected',
    },
    'systemState.wifi.strength': {
      control: {type: 'range', min: 0, max: 4, step: 1},
      name: 'WiFi Strength',
    },
    // Audio Controls
    'systemState.audio.enabled': {
      control: {type: 'boolean'},
      name: 'Audio Enabled',
    },
    'systemState.audio.muted': {
      control: {type: 'boolean'},
      name: 'Audio Muted',
    },
    'systemState.audio.volume': {
      control: {type: 'range', min: 0, max: 100, step: 1},
      name: 'Audio Volume',
    },
    // Microphone Controls
    'systemState.microphone.enabled': {
      control: {type: 'boolean'},
      name: 'Microphone Enabled',
    },
    'systemState.microphone.muted': {
      control: {type: 'boolean'},
      name: 'Microphone Muted',
    },
    'systemState.microphone.sensitivity': {
      control: {type: 'range', min: 0, max: 100, step: 1},
      name: 'Microphone Sensitivity',
    },
    // Battery Controls
    'systemState.battery.enabled': {
      control: {type: 'boolean'},
      name: 'Battery Enabled',
    },
    'systemState.battery.level': {
      control: {type: 'range', min: 0, max: 100, step: 1},
      name: 'Battery Level',
    },
    'systemState.battery.charging': {
      control: {type: 'boolean'},
      name: 'Battery Charging',
    },
    // GPS Controls
    'systemState.gps.enabled': {
      control: {type: 'boolean'},
      name: 'GPS Enabled',
    },
    'systemState.gps.connected': {
      control: {type: 'boolean'},
      name: 'GPS Connected',
    },
    'systemState.gps.quality': {
      control: {type: 'select'},
      options: ['bad', 'low', 'medium', 'full'],
      name: 'GPS Quality',
    },
  },
  render: (args) => {
    // Reconstruct the systemState object from the flattened args
    const systemState = {
      wifi:
        (args['systemState.wifi.enabled'] ?? args.systemState.wifi.enabled)
          ? {
              connected:
                args['systemState.wifi.connected'] ??
                args.systemState.wifi.connected,
              strength:
                args['systemState.wifi.strength'] ??
                args.systemState.wifi.strength,
            }
          : undefined,
      audio:
        (args['systemState.audio.enabled'] ?? args.systemState.audio.enabled)
          ? {
              muted:
                args['systemState.audio.muted'] ?? args.systemState.audio.muted,
              volume:
                args['systemState.audio.volume'] ??
                args.systemState.audio.volume,
            }
          : undefined,
      microphone:
        (args['systemState.microphone.enabled'] ??
        args.systemState.microphone.enabled)
          ? {
              muted:
                args['systemState.microphone.muted'] ??
                args.systemState.microphone.muted,
              sensitivity:
                args['systemState.microphone.sensitivity'] ??
                args.systemState.microphone.sensitivity,
            }
          : undefined,
      battery:
        (args['systemState.battery.enabled'] ??
        args.systemState.battery.enabled)
          ? {
              level:
                args['systemState.battery.level'] ??
                args.systemState.battery.level,
              charging:
                args['systemState.battery.charging'] ??
                args.systemState.battery.charging,
            }
          : undefined,
      gps:
        (args['systemState.gps.enabled'] ?? args.systemState.gps.enabled)
          ? {
              connected:
                args['systemState.gps.connected'] ??
                args.systemState.gps.connected,
              quality:
                args['systemState.gps.quality'] ?? args.systemState.gps.quality,
            }
          : undefined,
    };

    console.log(
      JSON.stringify(systemState, null, 2),
      JSON.stringify(args, null, 2)
    );
    return html`<obc-system-button
      variant="${args.variant}"
      .disabled="${args.disabled}"
      .systemState="${systemState}"
    >
    </obc-system-button>`;
  },
} satisfies Meta<ObcSystemButton>;

export default meta;
type Story = StoryObj<ObcSystemButton>;

export const Actions: Story = {
  args: {
    variant: SystemButtonVariant.actions,
  },
};

export const Condensed: Story = {
  args: {
    variant: SystemButtonVariant.condensed,
  },
};

export const Expanded: Story = {
  args: {
    variant: SystemButtonVariant.expanded,
  },
};

// Icon states
export const AllConnected: Story = {
  args: {
    variant: SystemButtonVariant.expanded,
    'systemState.wifi.strength': 4,
    'systemState.gps.quality': 'full',
    'systemState.battery.level': 100,
  },
};

export const AllDisconnected: Story = {
  args: {
    variant: SystemButtonVariant.expanded,
    'systemState.wifi.connected': false,
    'systemState.gps.connected': false,
    'systemState.audio.muted': true,
    'systemState.microphone.muted': true,
    'systemState.battery.level': 15,
  },
};

export const LowSignals: Story = {
  args: {
    variant: SystemButtonVariant.expanded,
    'systemState.wifi.strength': 1,
    'systemState.gps.quality': 'bad',
    'systemState.battery.level': 5,
    'systemState.audio.volume': 20,
  },
};

export const Charging: Story = {
  args: {
    variant: SystemButtonVariant.expanded,
    'systemState.battery.charging': true,
    'systemState.battery.level': 45,
  },
};

export const MinimalFeatures: Story = {
  args: {
    variant: SystemButtonVariant.actions,
    'systemState.wifi.enabled': true,
    'systemState.audio.enabled': false,
    'systemState.microphone.enabled': false,
    'systemState.battery.enabled': true,
    'systemState.gps.enabled': false,
  },
};
