import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './audio-recording-item.js';
import {ObcAudioRecordingItem} from './audio-recording-item.js';
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
      options: ['recording', 'paused'],
      description: 'Recording status - recording or paused',
    },
    hasActionButton: {
      control: {type: 'boolean'},
      description: 'Whether to show the play/pause action button',
    },
    hasDelete: {
      control: {type: 'boolean'},
      description: 'Whether to show the delete button',
    },
    enhanced: {
      control: {type: 'boolean'},
      description:
        'Enhanced style that displays waveform bars with neutral enhanced color',
    },
  },
  parameters: {
    actions: {
      handles: ['status-toggle', 'delete-click'],
    },
  },
  render: (args) => html`
    <div style="max-width: 420px;">
      <obc-audio-recording-item
        .audioLevels=${args.audioLevels ?? []}
        .duration=${args.duration ?? 0}
        .status=${args.status ?? 'recording'}
        ?hasActionButton=${args.hasActionButton ?? true}
        ?hasDelete=${args.hasDelete ?? true}
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
    status: 'recording',
    hasActionButton: true,
    hasDelete: true,
  },
};

export const Paused: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    status: 'paused',
    hasActionButton: true,
    hasDelete: true,
  },
};

export const WithoutDelete: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    status: 'recording',
    hasActionButton: true,
    hasDelete: false,
  },
};

export const WithoutActionButton: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    status: 'recording',
    hasActionButton: false,
    hasDelete: true,
  },
};

export const Enhanced: Story = {
  args: {
    audioLevels: [0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5, 0.7, 0.5, 0.2, 0.5],
    duration: 12,
    status: 'recording',
    hasActionButton: true,
    hasDelete: true,
    enhanced: true,
  },
};

/**
 * Interactive demo that simulates audio recording.
 */
export const InteractiveDemo: Story = {
  tags: ['skip-snapshot'],
  render: () => {
    // Simulates microphone input - new values push from right, old values shift left
    const maxBars = 40;
    let levels: number[] = [];
    let recordingInterval: number | null = null;

    const generateRandomLevel = (): number => {
      // Simulate varying "volume" levels with occasional silence
      const isSilent = Math.random() < 0.2;
      if (isSilent) {
        return 0.1 + Math.random() * 0.2;
      }
      return 0.3 + Math.random() * 0.7;
    };

    const getComponent = () =>
      document.getElementById('demo-recording') as ObcAudioRecordingItem;

    const updateStatus = (message: string) => {
      const statusEl = document.getElementById('demo-status');
      if (statusEl) {
        statusEl.textContent = message;
      }
    };

    const startRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.status = 'recording';
      updateStatus('Recording... Click pause to pause.');

      recordingInterval = window.setInterval(() => {
        el.duration += 0.1;

        // Add new value on the right, shift existing values left
        const newLevel = generateRandomLevel();
        levels = [...levels, newLevel];

        // Keep only the last maxBars values
        if (levels.length > maxBars) {
          levels = levels.slice(-maxBars);
        }

        el.audioLevels = [...levels];
      }, 100);
    };

    const pauseRecording = () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
      const el = getComponent();
      if (el) {
        el.status = 'paused';
        updateStatus('Recording paused. Click play to resume.');
      }
    };

    const handleStatusToggle = (e: CustomEvent) => {
      if (e.detail.status === 'recording') {
        startRecording();
      } else {
        pauseRecording();
      }
    };

    const handleDelete = () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
      const el = getComponent();
      if (el) {
        el.duration = 0;
        levels = [];
        el.audioLevels = [];
        el.status = 'recording';
        updateStatus('Recording deleted. Click play to start a new recording.');
      }
    };

    // Start recording automatically
    setTimeout(() => {
      startRecording();
    }, 100);

    // Cleanup function
    const cleanup = () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
    };

    window.addEventListener('beforeunload', cleanup, {once: true});

    return html`
      <div @disconnected=${cleanup}>
        <div
          style="margin-bottom: 16px; padding: 16px; background: var(--container-background-color, #f5f5f5); border-radius: 8px;"
        >
          <p style="margin: 0 0 12px 0; font-weight: 600;">Audio Recording Flow:</p>
          <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li>Recording starts automatically with waveform animation</li>
            <li>Click <strong>pause</strong> to pause recording</li>
            <li>Click <strong>play</strong> to resume recording</li>
            <li>Click <strong>delete</strong> to clear the recording</li>
          </ol>
        </div>
        <p
          id="demo-status"
          style="margin-bottom: 8px; font-size: 14px; color: var(--element-neutral-color, #666); font-style: italic; min-height: 20px;"
        >
          Starting recording...
        </p>
        <div style="max-width: 420px;">
          <obc-audio-recording-item
            id="demo-recording"
            .audioLevels=${[]}
            .duration=${0}
            status="recording"
            hasActionButton
            hasDelete
            @status-toggle=${handleStatusToggle}
            @delete-click=${handleDelete}
          ></obc-audio-recording-item>
        </div>
      </div>
    `;
  },
};
