import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './transcription-item.js';
import {ObcTranscriptionItem} from './transcription-item.js';
import '../button/button.js';

const meta = {
  title: 'UI Components/Media/Transcription Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-transcription-item',
  args: {},
  argTypes: {
    audioLevels: {
      control: {type: 'object'},
      description:
        'Array of audio level values (0-1) for waveform visualization',
    },
    duration: {
      control: {type: 'number'},
      description: 'Current duration in seconds, displayed as MM:SS',
    },
    isPlaying: {
      control: {type: 'boolean'},
      description:
        'Whether audio is currently playing. Controls play/pause icon state.',
    },
    hasActionButton: {
      control: {type: 'boolean'},
      description: 'Whether to show the play/pause action button',
    },
    enhanced: {
      control: {type: 'boolean'},
      description:
        'Enhanced style that displays waveform bars with neutral enhanced color',
    },
  },
  parameters: {
    actions: {
      handles: ['playback-toggle'],
    },
  },
  render: (args) => html`
    <div style="max-width: 391px;">
      <obc-transcription-item
        .audioLevels=${args.audioLevels ?? []}
        .duration=${args.duration ?? 0}
        ?isPlaying=${args.isPlaying}
        ?hasActionButton=${args.hasActionButton ?? true}
        ?enhanced=${args.enhanced}
      ></obc-transcription-item>
    </div>
  `,
} satisfies Meta<ObcTranscriptionItem>;

export default meta;
type Story = StoryObj<ObcTranscriptionItem>;

export const Default: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    isPlaying: false,
    hasActionButton: true,
  },
};

export const Playing: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    isPlaying: true,
    hasActionButton: true,
  },
};

export const WithoutActionButton: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    hasActionButton: false,
  },
};

export const Enhanced: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    hasActionButton: false,
    enhanced: true,
  },
};

export const InteractiveDemo: Story = {
  tags: ['skip-snapshot'],
  render: () => {
    // Simulates microphone input - new values push from right, old values shift left
    const maxBars = 40;
    let levels: number[] = [];
    let intervalId: number | null = null;

    const generateRandomLevel = (): number => {
      // Simulate varying "volume" levels with occasional silence
      const isSilent = Math.random() < 0.2;
      if (isSilent) {
        return 0.1 + Math.random() * 0.2;
      }
      return 0.3 + Math.random() * 0.7;
    };

    const startSimulation = () => {
      const el = document.getElementById(
        'demo-transcription'
      ) as ObcTranscriptionItem;
      if (el && !intervalId) {
        el.isPlaying = true;
        let duration = el.duration;
        intervalId = window.setInterval(() => {
          // Add new value on the right, shift existing values left
          const newLevel = generateRandomLevel();
          levels = [...levels, newLevel];

          // Keep only the last maxBars values
          if (levels.length > maxBars) {
            levels = levels.slice(-maxBars);
          }

          el.audioLevels = [...levels];
          duration += 0.1;
          el.duration = duration;
        }, 100);
      }
    };

    const stopSimulation = () => {
      const el = document.getElementById(
        'demo-transcription'
      ) as ObcTranscriptionItem;
      if (el) {
        el.isPlaying = false;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const resetSimulation = () => {
      stopSimulation();
      levels = [];
      const el = document.getElementById(
        'demo-transcription'
      ) as ObcTranscriptionItem;
      if (el) {
        el.audioLevels = [];
        el.duration = 0;
      }
    };

    return html`
      <div style="max-width: 391px;">
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">
          Click play to simulate recording. New bars appear on the right and
          shift left over time:
        </p>
        <obc-transcription-item
          id="demo-transcription"
          .audioLevels=${[]}
          .duration=${0}
          @playback-toggle=${(e: CustomEvent) => {
            if (e.detail.playing) {
              startSimulation();
            } else {
              stopSimulation();
            }
          }}
        ></obc-transcription-item>
        <div style="margin-top: 16px;">
          <obc-button @click=${resetSimulation}>Reset</obc-button>
        </div>
      </div>
    `;
  },
};
