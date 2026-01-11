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
        defaultValue: {summary: 'Placeholder'},
      },
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Shows a leading icon before the input field',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hasToolbar: {
      control: 'boolean',
      description: 'Displays the toolbar with action buttons',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    hasVoiceRecording: {
      control: 'boolean',
      description: 'Shows the voice recording button',
      table: {
        defaultValue: {summary: 'true'},
      },
    },
    hasSendButton: {
      control: 'boolean',
      description: 'Shows the send button',
      table: {
        defaultValue: {summary: 'true'},
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
    placeholder: 'Placeholder',
    hasLeadingIcon: false,
    hasToolbar: true,
    hasVoiceRecording: true,
    hasSendButton: true,
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
    .placeholder=${args.placeholder ?? 'Placeholder'}
    ?hasLeadingIcon=${args.hasLeadingIcon}
    ?hasToolbar=${args.hasToolbar}
    ?hasVoiceRecording=${args.hasVoiceRecording}
    ?hasSendButton=${args.hasSendButton}
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
  render: (args) => html`
    <obc-message-input-field
      ?hasTitle=${args.hasTitle}
      .title=${args.title ?? 'Title'}
      .value=${args.value ?? ''}
      ?hasToolbar=${args.hasToolbar ?? true}
      ?hasVoiceRecording=${args.hasVoiceRecording ?? true}
      ?hasSendButton=${args.hasSendButton ?? true}
    >
    </obc-message-input-field>
  `,
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
    placeholder: 'Placeholder',
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
    hasToolbar: false,
    placeholder: 'Type a message...',
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
    hasVoiceRecording: false,
    placeholder: 'Type a message...',
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
    hasToolbar: false,
    hasVoiceRecording: false,
    placeholder: 'Type a message...',
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
      el.isPlaying = false;

      recordingInterval = window.setInterval(() => {
        el.recordingDuration += 0.1;
        // Generate audio levels based on duration (smoother animation)
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
        if (confirm) {
          el.hasRecordedAudio = true;
        } else {
          el.hasRecordedAudio = false;
          el.recordingDuration = 0;
          el.audioLevels = [];
        }
      }
    };

    const startPlayback = () => {
      const el = getComponent();
      if (!el || playbackInterval) return;

      el.isPlaying = true;
      let position = 0;

      playbackInterval = window.setInterval(() => {
        position += 1;
        if (position >= el.recordingDuration) {
          stopPlayback();
        }
      }, 1000);
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

    return html`
      <div>
        <obc-message-input-field
          id="demo-message-input"
          ?hasTitle=${args.hasTitle}
          .title=${args.title ?? 'Interactive Demo'}
          .placeholder=${args.placeholder ?? 'Type a message or click the microphone...'}
          ?hasToolbar=${args.hasToolbar ?? true}
          ?hasVoiceRecording=${args.hasVoiceRecording ?? true}
          ?hasSendButton=${args.hasSendButton ?? true}
          @voice-recording-start=${() => startRecording()}
          @voice-recording-cancel=${() => stopRecording(false)}
          @voice-recording-confirm=${() => stopRecording(true)}
          @voice-playback-toggle=${(e: CustomEvent) => {
            if (e.detail.playing) {
              startPlayback();
            } else {
              stopPlayback();
            }
          }}
          @send-click=${() => handleSend()}
        >
        </obc-message-input-field>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
**Interactive Demo** - Click through the full voice recording flow:

1. **Click the microphone button** to start recording
2. Watch the waveform build up and timer increment
3. **Click X** to cancel and discard the recording
4. **Click ✓** to confirm the recording
5. After confirming, you can **play/pause** the recorded audio
6. **Click send** to send the message and reset

This demonstrates how a parent application would integrate with the component's events.
        `,
      },
    },
  },
};
