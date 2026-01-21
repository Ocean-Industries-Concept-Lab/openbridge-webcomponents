import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './audio-recording-item.js';
import {
  ObcAudioRecordingItem,
  AudioRecordingStatus,
} from './audio-recording-item.js';
import '../button/button.js';

const meta = {
  title: 'UI Components/Media/Audio Recording Item',
  tags: ['autodocs', '6.0'],
  component: 'obc-audio-recording-item',
  args: {},
  argTypes: {
    audioLevels: {
      control: {type: 'object'},
      description:
        'Array of audio level values (0-1) for waveform visualization. New values are added to the end (right side).',
    },
    duration: {
      control: {type: 'number'},
      description: 'Current duration in seconds, displayed as MM:SS',
    },
    status: {
      control: {type: 'select'},
      options: ['recording', 'playback'],
      description:
        'Status - recording (shows waveform) or playback (shows slider)',
    },
    playbackPosition: {
      control: {type: 'range', min: 0, max: 1, step: 0.01},
      description: 'Current playback position (0-1) for playback mode slider',
    },
    isPlaying: {
      control: {type: 'boolean'},
      description:
        'Whether audio is currently playing (only relevant in playback mode)',
    },
    enhanced: {
      control: {type: 'boolean'},
      description:
        'Enhanced style that displays waveform bars with neutral enhanced color',
    },
  },
  parameters: {
    actions: {
      handles: ['status-toggle'],
    },
  },
  render: (args) => html`
    <div style="max-width: 420px;">
      <obc-audio-recording-item
        .audioLevels=${args.audioLevels ?? []}
        .duration=${args.duration ?? 0}
        .status=${args.status ?? 'recording'}
        .playbackPosition=${args.playbackPosition ?? 0}
        ?isPlaying=${args.isPlaying}
        ?enhanced=${args.enhanced}
      ></obc-audio-recording-item>
    </div>
  `,
} satisfies Meta<ObcAudioRecordingItem>;

export default meta;
type Story = StoryObj<ObcAudioRecordingItem>;

export const Recording: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    status: AudioRecordingStatus.Recording,
  },
};

export const RecordingEnhanced: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    status: AudioRecordingStatus.Recording,
    enhanced: true,
  },
};

export const PlaybackPaused: Story = {
  args: {
    duration: 12,
    status: AudioRecordingStatus.Playback,
    playbackPosition: 0.3,
    isPlaying: false,
  },
};

export const PlaybackPlaying: Story = {
  args: {
    duration: 12,
    status: AudioRecordingStatus.Playback,
    playbackPosition: 0.5,
    isPlaying: true,
  },
};

export const InteractiveDemo: Story = {
  tags: ['skip-snapshot'],
  render: () => {
    let levels: number[] = [];
    let recordedDuration = 0;
    let recordingInterval: number | null = null;
    let playbackInterval: number | null = null;

    let component: ObcAudioRecordingItem | null = null;
    let statusEl: HTMLElement | null = null;
    let buttonEl: HTMLButtonElement | null = null;

    const cacheRefs = () => {
      component ??= document.getElementById(
        'demo-component'
      ) as ObcAudioRecordingItem;
      statusEl ??= document.getElementById('demo-status');
      buttonEl ??= document.getElementById('demo-button') as HTMLButtonElement;
    };

    const updateUI = (status: string, button: string) => {
      if (statusEl) statusEl.textContent = status;
      if (buttonEl) buttonEl.textContent = button;
    };

    const clearIntervals = () => {
      if (recordingInterval) clearInterval(recordingInterval);
      if (playbackInterval) clearInterval(playbackInterval);
      recordingInterval = playbackInterval = null;
    };

    const startRecording = () => {
      cacheRefs();
      clearIntervals();
      if (!component) return;

      levels = [];
      recordedDuration = 0;
      component.status = AudioRecordingStatus.Recording;
      component.duration = 0;
      component.audioLevels = [];
      component.playbackPosition = 0;
      component.isPlaying = false;
      updateUI('Recording...', 'Stop Recording');

      recordingInterval = window.setInterval(() => {
        if (!component) return;
        recordedDuration += 0.1;
        component.duration = recordedDuration;

        // Generate random level (20% chance of quiet)
        const level =
          Math.random() < 0.2
            ? 0.1 + Math.random() * 0.2
            : 0.3 + Math.random() * 0.7;
        levels.push(level);
        if (levels.length > 100) levels = levels.slice(-100);
        component.audioLevels = [...levels];
      }, 100);
    };

    const stopRecording = () => {
      clearIntervals();
      if (!component) return;
      component.status = AudioRecordingStatus.Playback;
      component.playbackPosition = 0;
      component.isPlaying = false;
      updateUI('Recording complete. Click play to listen.', 'Record Again');
    };

    const startPlayback = () => {
      if (!component || playbackInterval) return;
      component.isPlaying = true;
      updateUI('Playing...', 'Record Again');

      const duration = recordedDuration || 5;
      playbackInterval = window.setInterval(() => {
        if (!component) return;
        component.playbackPosition += 0.05 / duration;
        if (component.playbackPosition >= 1) {
          component.playbackPosition = 0;
          stopPlayback();
          updateUI('Playback complete. Click play again.', 'Record Again');
        }
      }, 50);
    };

    const stopPlayback = () => {
      if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
      }
      if (component) {
        component.isPlaying = false;
        updateUI('Paused. Click play to resume.', 'Record Again');
      }
    };

    const handleButtonClick = () => {
      cacheRefs();
      if (!component) return;
      if (component.status === AudioRecordingStatus.Recording) {
        stopRecording();
      } else {
        startRecording();
      }
    };

    const handleStatusToggle = (e: CustomEvent<{isPlaying: boolean}>) => {
      if (e.detail.isPlaying) {
        startPlayback();
      } else {
        stopPlayback();
      }
    };

    setTimeout(startRecording, 100);

    return html`
      <div>
        <div
          style="margin-bottom: 16px; padding: 16px; background: var(--container-background-color, #f5f5f5); border-radius: 8px;"
        >
          <p style="margin: 0 0 12px 0; font-weight: 600;">
            Audio Recording Flow Demo
          </p>
          <ol
            style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;"
          >
            <li>Recording starts automatically with animated waveform</li>
            <li>Click "Stop Recording" to finish and enter playback mode</li>
            <li>Use the play/pause button to control playback</li>
            <li>Click "Record Again" to start a new recording</li>
          </ol>
        </div>
        <p
          id="demo-status"
          style="margin-bottom: 8px; font-size: 14px; color: var(--element-neutral-color, #666); font-style: italic; min-height: 20px;"
        >
          Starting...
        </p>
        <div style="max-width: 420px; margin-bottom: 16px;">
          <obc-audio-recording-item
            id="demo-component"
            .audioLevels=${[]}
            .duration=${0}
            status="recording"
            .playbackPosition=${0}
            @status-toggle=${handleStatusToggle}
          ></obc-audio-recording-item>
        </div>
        <button
          id="demo-button"
          @click=${handleButtonClick}
          style="padding: 8px 16px; font-size: 14px; cursor: pointer; border-radius: 4px; border: 1px solid var(--border-outline-color, #ccc); background: var(--container-background-color, #fff);"
        >
          Stop Recording
        </button>
      </div>
    `;
  },
};
