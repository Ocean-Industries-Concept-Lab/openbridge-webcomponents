import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcMessageInputField} from './message-input-field.js';
import './message-input-field.js';

const meta = {
  title: 'UI Components/Input Controls/Message Input Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-message-input-field',
  parameters: {
    docs: {
      description: {
        component: `
## Message Input Field Component

A multi-line message input component with send button and optional voice recording capability. Designed for chat interfaces, messaging applications, and communication workflows.

### Key Features:
- **Multi-line Input:** Flexible textarea for composing messages
- **Send Button:** Prominent send action that activates when content is available
- **Voice Recording:** Optional microphone button for voice messages (UI only - parent app handles actual recording)
- **Toolbar:** Quick access to add content (screenshot, image, attachment)
- **Error States:** Visual feedback for validation errors

### Voice Recording Flow:
The component provides UI for voice recording but does NOT handle actual audio capture. The parent application is responsible for:
1. Listening to \`voice-recording-start\` event and starting MediaRecorder
2. Setting \`isRecording=true\` and updating \`recordingDuration\` as recording progresses
3. Updating \`audioLevels\` prop for waveform visualization (new values push from right, shift left)
4. On \`voice-recording-cancel\`: set \`isRecording=false\` (existing text is preserved)
5. On \`voice-recording-confirm\`: transcribe audio, append to \`value\`, then set \`isRecording=false\`

### Usage:
\`\`\`html
<obc-message-input-field
  placeholder="Type a message..."
  @send-click=\${(e) => sendMessage(e.detail.value)}
  @voice-recording-start=\${() => startRecording()}
>
</obc-message-input-field>
\`\`\`
        `,
      },
    },
    actions: {
      handles: [
        'send-click',
        'screenshot-click',
        'image-click',
        'attachment-click',
        'value-changed',
        'voice-recording-start',
        'voice-recording-stop',
        'voice-recording-cancel',
        'voice-recording-confirm',
        'voice-playback-toggle',
        'add-click',
      ],
    },
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Disables the input field and all actions',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Shows error state with visual highlight',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    errorText: {
      control: 'text',
      description:
        'Error message displayed below the field when hasError is true',
      table: {
        defaultValue: {summary: ''},
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the input is empty',
      table: {
        defaultValue: {summary: 'Type a message...'},
      },
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Shows a leading icon before the input field',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hideToolbar: {
      control: 'boolean',
      description: 'Hides the toolbar with action buttons',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hideVoiceRecording: {
      control: 'boolean',
      description: 'Hides the voice recording button',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hideSendButton: {
      control: 'boolean',
      description: 'Hides the send button',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hasTitle: {
      control: 'boolean',
      description: 'Shows a title above the input field',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    title: {
      control: 'text',
      description: 'Title text displayed above the input field',
      table: {
        defaultValue: {summary: 'Title'},
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Shows a required indicator next to the title',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    value: {
      control: 'text',
      description: 'The current text value of the input field',
      table: {
        defaultValue: {summary: ''},
      },
    },
    isRecording: {
      control: 'boolean',
      description: 'Whether voice recording is currently active',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    recordingDuration: {
      control: 'number',
      description: 'Current recording duration in seconds',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    audioLevels: {
      control: 'object',
      description:
        'Array of audio level values (0-1) for waveform visualization. New values should be added to the end (right side) and old values shift left.',
      table: {
        defaultValue: {summary: '[]'},
      },
    },
    isPlaying: {
      control: 'boolean',
      description: 'Whether the recording is currently active (playing)',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
  },
  args: {
    isDisabled: false,
    hasError: false,
    errorText: '',
    placeholder: 'Type a message...',
    hasLeadingIcon: false,
    hideToolbar: false,
    hideVoiceRecording: false,
    hideSendButton: false,
    hasTitle: false,
    title: 'Title',
    isRequired: false,
    value: '',
    isRecording: false,
    recordingDuration: 0,
    audioLevels: [],
    isPlaying: false,
  },
} satisfies Meta<ObcMessageInputField>;

export default meta;
type Story = StoryObj<ObcMessageInputField>;

const renderMessageInput = (args: Partial<ObcMessageInputField>) => html`
  <obc-message-input-field
    ?isDisabled=${args.isDisabled}
    ?hasError=${args.hasError}
    .errorText=${args.errorText ?? ''}
    .placeholder=${args.placeholder ?? 'Type a message...'}
    ?hasLeadingIcon=${args.hasLeadingIcon}
    ?hideToolbar=${args.hideToolbar}
    ?hideVoiceRecording=${args.hideVoiceRecording}
    ?hideSendButton=${args.hideSendButton}
    ?hasTitle=${args.hasTitle}
    .title=${args.title ?? 'Title'}
    ?isRequired=${args.isRequired}
    .value=${args.value ?? ''}
    ?isRecording=${args.isRecording}
    .recordingDuration=${args.recordingDuration ?? 0}
    .audioLevels=${args.audioLevels ?? []}
    ?isPlaying=${args.isPlaying}
  >
  </obc-message-input-field>
`;

export const Default: Story = {
  args: {},
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Default message input field with toolbar, voice recording button, and send button.',
      },
    },
  },
};

export const WithTitle: Story = {
  args: {
    hasTitle: true,
    title: 'Message',
    placeholder: 'Type your message here...',
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story: 'Message input with a title displayed above the input area.',
      },
    },
  },
};

export const Focused: Story = {
  args: {
    hasTitle: true,
    title: 'Title',
    value: 'Typing',
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input in focused state with text being typed. The send button becomes raised when there is content.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    value: 'This is a message ready to be sent or posted.',
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input with content filled in. The send button is raised to indicate it can be clicked.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
    errorText: 'Error text',
    value: 'There is an error in this input field.',
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input showing error state with visual highlight and error message.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Disabled message input. All interactions are blocked and the field appears dimmed.',
      },
    },
  },
};

export const Recording: Story = {
  args: {
    hasTitle: true,
    title: 'Title',
    isRecording: true,
    isPlaying: true,
    recordingDuration: 12,
    audioLevels: [
      0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.8, 0.6,
    ],
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input during active voice recording. Shows waveform visualization, timer, and cancel/confirm buttons.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    hasTitle: true,
    title: 'Playground',
    placeholder: 'Experiment with all settings...',
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - try different combinations of props in the Controls panel below.',
      },
    },
  },
};

/**
 * Interactive demo that simulates the full voice recording flow.
 */
export const InteractiveDemo: Story = {
  tags: ['skip-snapshot'],
  args: {
    hasTitle: true,
    title: 'Interactive Demo',
    placeholder: 'Type a message or click the microphone...',
  },
  render: (args) => {
    // Simulates microphone input - new values push from right, old values shift left
    const maxBars = 40;
    let levels: number[] = [];
    let recordingInterval: number | null = null;

    // Simulated transcription phrases (in real app, this comes from speech-to-text API)
    const transcriptionPhrases = [
      'this is a voice message',
      'how are you doing today',
      'please check the latest report',
      'I will call you back later',
      'the meeting is scheduled for tomorrow',
    ];

    const generateRandomLevel = (): number => {
      // Simulate varying "volume" levels with occasional silence
      const isSilent = Math.random() < 0.2;
      if (isSilent) {
        return 0.1 + Math.random() * 0.2;
      }
      return 0.3 + Math.random() * 0.7;
    };

    const getComponent = () =>
      document.getElementById('demo-message-input') as ObcMessageInputField;

    const updateStatus = (message: string) => {
      const statusEl = document.getElementById('demo-status');
      if (statusEl) {
        statusEl.textContent = message;
      }
    };

    const startRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.isRecording = true;
      el.recordingDuration = 0;
      levels = [];
      el.audioLevels = [];
      el.isPlaying = true;
      updateStatus('Recording... Click pause to pause, X to cancel, or checkmark to confirm.');

      recordingInterval = window.setInterval(() => {
        el.recordingDuration += 0.1;

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
        el.isPlaying = false;
        updateStatus('Recording paused. Click play to resume.');
      }
    };

    const resumeRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.isPlaying = true;
      updateStatus('Recording... Click pause to pause, X to cancel, or checkmark to confirm.');

      recordingInterval = window.setInterval(() => {
        el.recordingDuration += 0.1;

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

    const cancelRecording = () => {
      const el = getComponent();
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }

      if (el) {
        // Cancel: just go back to text input, preserve existing text
        el.isRecording = false;
        el.isPlaying = false;
        el.recordingDuration = 0;
        levels = [];
        el.audioLevels = [];
        updateStatus('Recording cancelled. Your previous text is preserved.');
      }
    };

    const confirmRecording = () => {
      const el = getComponent();
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }

      if (el) {
        // Confirm: simulate transcription and append to existing text
        const randomPhrase =
          transcriptionPhrases[
            Math.floor(Math.random() * transcriptionPhrases.length)
          ];

        // Append transcription to existing value
        const existingText = el.value.trim();
        if (existingText) {
          // Add separator if there's existing text
          el.value = existingText + ', ' + randomPhrase;
          updateStatus(`Transcription appended: "${randomPhrase}"`);
        } else {
          el.value = randomPhrase;
          updateStatus(`Transcribed: "${randomPhrase}"`);
        }

        // Reset recording state and go back to text input
        el.isRecording = false;
        el.isPlaying = false;
        el.recordingDuration = 0;
        levels = [];
        el.audioLevels = [];
      }
    };

    const handlePlaybackToggle = (playing: boolean) => {
      const el = getComponent();
      if (!el) return;

      // During recording, play/pause controls the recording
      if (el.isRecording) {
        if (playing) {
          resumeRecording();
        } else {
          pauseRecording();
        }
      }
    };

    const handleSend = () => {
      const el = getComponent();
      if (el) {
        updateStatus(`Message sent: "${el.value}"`);
        // Clear the input after sending
        el.value = '';
      }
    };

    // Cleanup function for intervals when story unmounts
    const cleanup = () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
    };

    // Register cleanup on page unload/navigation
    window.addEventListener('beforeunload', cleanup, {once: true});

    return html`
      <div @disconnected=${cleanup}>
        <div
          style="margin-bottom: 16px; padding: 16px; background: var(--container-background-color, #f5f5f5); border-radius: 8px;"
        >
          <p style="margin: 0 0 12px 0; font-weight: 600;">Voice Recording Flow:</p>
          <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li>Type some text in the input field (e.g., "Hello")</li>
            <li>Click the <strong>microphone button</strong> to start recording</li>
            <li>Use <strong>play/pause</strong> to pause and resume recording</li>
            <li>Click <strong>X</strong> to cancel (your typed text is preserved)</li>
            <li>Click <strong>checkmark</strong> to confirm (transcription is appended to your text)</li>
          </ol>
        </div>
        <p
          id="demo-status"
          style="margin-bottom: 8px; font-size: 14px; color: var(--element-neutral-color, #666); font-style: italic; min-height: 20px;"
        >
          Type a message or click the microphone to start recording.
        </p>
        <obc-message-input-field
          id="demo-message-input"
          ?hasTitle=${args.hasTitle}
          .title=${args.title ?? 'Title'}
          .placeholder=${args.placeholder ?? 'Type a message...'}
          ?hideToolbar=${args.hideToolbar}
          ?hideVoiceRecording=${args.hideVoiceRecording}
          ?hideSendButton=${args.hideSendButton}
          @voice-recording-start=${() => startRecording()}
          @voice-recording-cancel=${() => cancelRecording()}
          @voice-recording-confirm=${() => confirmRecording()}
          @voice-playback-toggle=${(e: CustomEvent) =>
            handlePlaybackToggle(e.detail.playing)}
          @send-click=${() => handleSend()}
        >
        </obc-message-input-field>
      </div>
    `;
  },
};
