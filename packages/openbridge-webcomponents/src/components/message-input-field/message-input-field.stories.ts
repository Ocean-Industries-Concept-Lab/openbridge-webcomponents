import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcMessageInputField} from './message-input-field.js';
import './message-input-field.js';

const meta: Meta<typeof ObcMessageInputField> = {
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
2. Updating \`recordingDuration\` prop as recording progresses
3. Setting \`isRecording\` and \`hasRecordedAudio\` props to control UI state
4. Handling \`voice-recording-cancel\` and \`voice-recording-confirm\` events

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
      description: 'Error message displayed below the field when hasError is true',
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
    hasRecordedAudio: {
      control: 'boolean',
      description: 'Whether there is recorded audio available',
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
      description: 'Array of audio level values (0-1) for waveform visualization',
      table: {
        defaultValue: {summary: '[]'},
      },
    },
    isPlaying: {
      control: 'boolean',
      description: 'Whether the recorded audio is currently playing',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    transcription: {
      control: 'text',
      description: 'Transcription text for the recorded audio',
      table: {
        defaultValue: {summary: ''},
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
    hasRecordedAudio: false,
    recordingDuration: 0,
    audioLevels: [],
    isPlaying: false,
    transcription: '',
  },
};

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
    ?hasRecordedAudio=${args.hasRecordedAudio}
    .recordingDuration=${args.recordingDuration ?? 0}
    .audioLevels=${args.audioLevels ?? []}
    ?isPlaying=${args.isPlaying}
    .transcription=${args.transcription ?? ''}
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
    audioLevels: [0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.8, 0.6],
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

export const RecordingComplete: Story = {
  args: {
    hasTitle: true,
    title: 'Title',
    isRecording: false,
    hasRecordedAudio: true,
    recordingDuration: 12,
    audioLevels: [0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.8, 0.6],
    transcription: 'This is a transcribed message ready to send, or keep recording to add content.',
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input after voice recording is complete. Shows the recorded audio with play/pause, transcription text, and send is enabled.',
      },
    },
  },
};

export const WithoutToolbar: Story = {
  args: {
    hideToolbar: true,
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input without the toolbar buttons, showing only the voice recording and send buttons.',
      },
    },
  },
};

export const WithoutVoiceRecording: Story = {
  args: {
    hideVoiceRecording: true,
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Message input without voice recording capability, just text input with toolbar.',
      },
    },
  },
};

export const MinimalConfig: Story = {
  args: {
    hideToolbar: true,
    hideVoiceRecording: true,
  },
  render: renderMessageInput,
  parameters: {
    docs: {
      description: {
        story:
          'Minimal message input configuration with just the text area and send button.',
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
 * Click the microphone button to start recording, then cancel or confirm.
 */
export const InteractiveDemo: Story = {
  tags: ['skip-snapshot'],
  args: {
    hasTitle: true,
    title: 'Interactive Demo',
    placeholder: 'Type a message or click the microphone...',
  },
  render: (args) => {
    const generateLevels = (count: number): number[] => {
      const levels: number[] = [];
      for (let i = 0; i < count; i++) {
        levels.push(0.3 + Math.random() * 0.7);
      }
      return levels;
    };

    let recordingInterval: number | null = null;
    let playbackInterval: number | null = null;

    const getComponent = () =>
      document.getElementById('demo-message-input') as ObcMessageInputField;

    const startRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.isRecording = true;
      el.hasRecordedAudio = false;
      el.recordingDuration = 0;
      el.audioLevels = [];
      el.isPlaying = true;

      recordingInterval = window.setInterval(() => {
        el.recordingDuration += 0.1;
        // Generate audio levels based on duration (smoother animation)
        const barCount = Math.min(40, Math.floor(el.recordingDuration * 2));
        el.audioLevels = generateLevels(barCount);
      }, 100);
    };

    const pauseRecording = () => {
      const el = getComponent();
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
      if (el) {
        el.isPlaying = false;
      }
    };

    const resumeRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.isPlaying = true;

      recordingInterval = window.setInterval(() => {
        el.recordingDuration += 0.1;
        const barCount = Math.min(40, Math.floor(el.recordingDuration * 2));
        el.audioLevels = generateLevels(barCount);
      }, 100);
    };

    const stopRecording = (confirm: boolean) => {
      const el = getComponent();
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }

      if (el) {
        el.isRecording = false;
        el.isPlaying = false;
        if (confirm) {
          el.hasRecordedAudio = true;
        } else {
          el.hasRecordedAudio = false;
          el.recordingDuration = 0;
          el.audioLevels = [];
        }
      }
    };

    const handlePlaybackToggle = (playing: boolean) => {
      const el = getComponent();
      if (!el) return;

      if (el.isRecording) {
        if (playing) {
          resumeRecording();
        } else {
          pauseRecording();
        }
      } else {
        if (playing) {
          startPlayback();
        } else {
          stopPlayback();
        }
      }
    };

    const startPlayback = () => {
      const el = getComponent();
      if (!el || playbackInterval) return;

      el.isPlaying = true;

      playbackInterval = window.setInterval(() => {
        // Animate the waveform during playback
        const barCount = el.audioLevels.length;
        el.audioLevels = generateLevels(barCount);
      }, 100);
    };

    const stopPlayback = () => {
      const el = getComponent();
      if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
      }
      if (el) {
        el.isPlaying = false;
      }
    };

    const handleSend = () => {
      stopPlayback();
      const el = getComponent();
      if (el) {
        el.hasRecordedAudio = false;
        el.recordingDuration = 0;
        el.audioLevels = [];
        el.isPlaying = false;
      }
    };

    // Cleanup function for intervals when story unmounts
    const cleanup = () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        recordingInterval = null;
      }
      if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
      }
    };

    // Register cleanup on page unload/navigation
    window.addEventListener('beforeunload', cleanup, {once: true});

    return html`
      <div @disconnected=${cleanup}>
        <obc-message-input-field
          id="demo-message-input"
          ?hasTitle=${args.hasTitle}
          .title=${args.title ?? 'Title'}
          .placeholder=${args.placeholder ?? 'Type a message...'}
          ?hideToolbar=${args.hideToolbar}
          ?hideVoiceRecording=${args.hideVoiceRecording}
          ?hideSendButton=${args.hideSendButton}
          @voice-recording-start=${() => startRecording()}
          @voice-recording-cancel=${() => stopRecording(false)}
          @voice-recording-confirm=${() => stopRecording(true)}
          @voice-playback-toggle=${(e: CustomEvent) => handlePlaybackToggle(e.detail.playing)}
          @send-click=${() => handleSend()}
        >
        </obc-message-input-field>
      </div>
    `;
  },
};
