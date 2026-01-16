import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcTextareaField, TextareaFieldType} from './textarea-field.js';
import type {Attachment} from './textarea-field.js';
import './textarea-field.js';

const meta = {
  title: 'UI Components/Input Controls/Textarea Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-textarea-field',
  parameters: {
    docs: {
      description: {
        component: `
## Textarea Field Component

A unified multi-line text input component that combines rich text input and message input functionality.

### Two Modes

- **Rich** (\`type="rich"\`): Multi-line textarea with optional toolbar. No send button.
- **Message** (\`type="message"\`): Multi-line textarea with send button and optional voice recording.

### Key Features:
- **Multi-line Input:** Flexible textarea for composing messages or extended text
- **Toolbar:** Quick access to add content (screenshot, image, attachment)
- **Voice Recording (Message mode):** Microphone button for voice messages (UI only - parent app handles actual recording)
- **Attachments:** Display file attachments as removable chips
- **Leading Icon:** Optional contextual icon before the input
- **Error States:** Visual feedback for validation errors

### Voice Recording Flow (Message mode):
The component provides UI for voice recording but does NOT handle actual audio capture. The parent application is responsible for:
1. Listening to \`voice-recording-start\` event and starting MediaRecorder
2. Setting \`recording=true\` and updating \`recordingDuration\` as recording progresses
3. Updating \`audioLevels\` prop for waveform visualization (new values push from right, shift left)
4. On \`recording-delete\`: set \`recording=false\` (existing text is preserved)
5. On \`voice-recording-confirm\`: transcribe audio, append to \`value\`, then set \`recording=false\`

### Usage:
\`\`\`html
<!-- Rich text mode -->
<obc-textarea-field
  type="rich"
  title="Description"
  placeholder="Enter description..."
></obc-textarea-field>

<!-- Message mode -->
<obc-textarea-field
  type="message"
  placeholder="Type a message..."
  @send-click=\${(e) => sendMessage(e.detail.value)}
></obc-textarea-field>
\`\`\`
        `,
      },
    },
    actions: {
      handles: [
        'value-changed',
        'send-click',
        'add-click',
        'screenshot-click',
        'image-click',
        'attachment-click',
        'voice-recording-start',
        'voice-recording-confirm',
        'recording-status-toggle',
        'recording-delete',
        'attachment-remove',
      ],
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['rich', 'message'],
      description: "Field type: 'rich' (no send) or 'message' (with send)",
      table: {
        defaultValue: {summary: 'rich'},
      },
    },
    value: {
      control: 'text',
      description: 'The current text value',
      table: {
        defaultValue: {summary: ''},
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty',
      table: {
        defaultValue: {summary: ''},
      },
    },
    title: {
      control: 'text',
      description: 'Title text above the input',
      table: {
        defaultValue: {summary: ''},
      },
    },
    errorText: {
      control: 'text',
      description: 'Error message below the field',
      table: {
        defaultValue: {summary: ''},
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and all actions',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    error: {
      control: 'boolean',
      description: 'Shows error state',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator next to title',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hideTitle: {
      control: 'boolean',
      description: 'Hides the title',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hideToolbar: {
      control: 'boolean',
      description: 'Hides the toolbar buttons',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hideVoiceRecording: {
      control: 'boolean',
      description: 'Hides the voice recording button (message type)',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    hasLeadingIcon: {
      control: 'boolean',
      description: 'Shows a leading icon',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    recording: {
      control: 'boolean',
      description: 'Whether voice recording is active',
      table: {
        defaultValue: {summary: 'false'},
      },
    },
    recordingDuration: {
      control: 'number',
      description: 'Recording duration in seconds',
      table: {
        defaultValue: {summary: '0'},
      },
    },
    audioLevels: {
      control: 'object',
      description: 'Audio levels (0-1) for waveform visualization',
      table: {
        defaultValue: {summary: '[]'},
      },
    },
    recordingStatus: {
      control: 'select',
      options: ['recording', 'paused'],
      description: 'Recording status',
      table: {
        defaultValue: {summary: 'recording'},
      },
    },
    attachments: {
      control: 'object',
      description: 'Array of attachment objects',
      table: {
        defaultValue: {summary: '[]'},
      },
    },
  },
  args: {
    type: TextareaFieldType.Rich,
    value: '',
    placeholder: 'Type your text here...',
    title: '',
    errorText: '',
    disabled: false,
    error: false,
    required: false,
    hideTitle: false,
    hideToolbar: false,
    hideVoiceRecording: false,
    hasLeadingIcon: false,
    recording: false,
    recordingDuration: 0,
    audioLevels: [],
    recordingStatus: 'recording',
    attachments: [],
  },
} satisfies Meta<ObcTextareaField>;

export default meta;
type Story = StoryObj<ObcTextareaField>;

const renderTextareaField = (args: Partial<ObcTextareaField>) => html`
  <obc-textarea-field
    .type=${args.type ?? TextareaFieldType.Rich}
    .value=${args.value ?? ''}
    .placeholder=${args.placeholder ?? ''}
    .title=${args.title ?? ''}
    .errorText=${args.errorText ?? ''}
    ?disabled=${args.disabled}
    ?error=${args.error}
    ?required=${args.required}
    ?hideTitle=${args.hideTitle}
    ?hideToolbar=${args.hideToolbar}
    ?hideVoiceRecording=${args.hideVoiceRecording}
    ?hasLeadingIcon=${args.hasLeadingIcon}
    ?recording=${args.recording}
    .recordingDuration=${args.recordingDuration ?? 0}
    .audioLevels=${args.audioLevels ?? []}
    .recordingStatus=${args.recordingStatus ?? 'recording'}
    .attachments=${(args.attachments as Attachment[]) ?? []}
  ></obc-textarea-field>
`;

// ============== Rich Type Stories ==============

export const RichDefault: Story = {
  name: 'Rich - Default',
  args: {
    type: TextareaFieldType.Rich,
    placeholder: 'Type your text here...',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Default rich text field without toolbar or title.',
      },
    },
  },
};

export const RichWithToolbar: Story = {
  name: 'Rich - With Toolbar',
  args: {
    type: TextareaFieldType.Rich,
    placeholder: 'Type your text here...',
    hideToolbar: false,
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Rich text field with toolbar buttons for adding content.',
      },
    },
  },
};

export const RichWithTitle: Story = {
  name: 'Rich - With Title',
  args: {
    type: TextareaFieldType.Rich,
    title: 'Description',
    placeholder: 'Enter description...',
    required: true,
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Rich text field with title and required indicator.',
      },
    },
  },
};

export const RichWithError: Story = {
  name: 'Rich - Error State',
  args: {
    type: TextareaFieldType.Rich,
    title: 'Description',
    error: true,
    errorText: 'This field is required',
    value: '',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Rich text field showing error state with error message.',
      },
    },
  },
};

// ============== Message Type Stories ==============

export const MessageDefault: Story = {
  name: 'Message - Default',
  args: {
    type: TextareaFieldType.Message,
    placeholder: 'Type a message...',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story:
          'Default message field with toolbar, voice recording, and send button.',
      },
    },
  },
};

export const MessageWithTitle: Story = {
  name: 'Message - With Title',
  args: {
    type: TextareaFieldType.Message,
    title: 'Message',
    placeholder: 'Type your message here...',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Message field with title displayed above the input area.',
      },
    },
  },
};

export const MessageFilled: Story = {
  name: 'Message - Filled',
  args: {
    type: TextareaFieldType.Message,
    value: 'This is a message ready to be sent.',
    placeholder: 'Type a message...',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story:
          'Message field with content. The send button is raised to indicate it can be clicked.',
      },
    },
  },
};

export const MessageWithError: Story = {
  name: 'Message - Error State',
  args: {
    type: TextareaFieldType.Message,
    error: true,
    errorText: 'Message is too long',
    value: 'This message has an error.',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Message field showing error state with error message.',
      },
    },
  },
};

export const MessageRecording: Story = {
  name: 'Message - Recording',
  args: {
    type: TextareaFieldType.Message,
    title: 'Message',
    recording: true,
    recordingStatus: 'recording',
    recordingDuration: 12,
    audioLevels: [
      0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.8, 0.6,
    ],
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story:
          'Message field during active voice recording. Shows waveform visualization, timer, and cancel/confirm buttons.',
      },
    },
  },
};

export const MessageRecordingPaused: Story = {
  name: 'Message - Recording Paused',
  args: {
    type: TextareaFieldType.Message,
    title: 'Message',
    recording: true,
    recordingStatus: 'paused',
    recordingDuration: 8,
    audioLevels: [0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5],
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story: 'Message field with paused voice recording.',
      },
    },
  },
};

// ============== Common Stories ==============

export const WithAttachments: Story = {
  name: 'With Attachments',
  args: {
    type: TextareaFieldType.Message,
    placeholder: 'Type a message...',
    attachments: [
      {id: '1', label: 'document.pdf', showIcon: false},
      {id: '2', label: 'image.png', showIcon: false},
      {id: '3', label: 'spreadsheet.xlsx', showIcon: false},
    ],
  },
  render: (args) => html`
    <obc-textarea-field
      style="width: 600px;"
      .type=${args.type ?? TextareaFieldType.Rich}
      .value=${args.value ?? ''}
      .placeholder=${args.placeholder ?? ''}
      .title=${args.title ?? ''}
      .errorText=${args.errorText ?? ''}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?required=${args.required}
      ?hideTitle=${args.hideTitle}
      ?hideToolbar=${args.hideToolbar}
      ?hideVoiceRecording=${args.hideVoiceRecording}
      ?hasLeadingIcon=${args.hasLeadingIcon}
      ?recording=${args.recording}
      .recordingDuration=${args.recordingDuration ?? 0}
      .audioLevels=${args.audioLevels ?? []}
      .recordingStatus=${args.recordingStatus ?? 'recording'}
      .attachments=${(args.attachments as Attachment[]) ?? []}
    ></obc-textarea-field>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Field with file attachments displayed as removable chips.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    type: TextareaFieldType.Message,
    disabled: true,
    placeholder: 'This field is disabled...',
  },
  render: renderTextareaField,
  parameters: {
    docs: {
      description: {
        story:
          'Disabled field. All interactions are blocked and the field appears dimmed.',
      },
    },
  },
};

export const Playground: Story = {
  name: 'Playground',
  args: {
    type: TextareaFieldType.Message,
    title: 'Playground',
    placeholder: 'Experiment with all settings...',
  },
  render: renderTextareaField,
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
  name: 'Interactive Demo',
  args: {
    type: TextareaFieldType.Message,
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
      document.getElementById('demo-textarea-field') as ObcTextareaField;

    const updateStatus = (message: string) => {
      const statusEl = document.getElementById('demo-status');
      if (statusEl) {
        statusEl.textContent = message;
      }
    };

    const startRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.recording = true;
      el.recordingDuration = 0;
      levels = [];
      el.audioLevels = [];
      el.recordingStatus = 'recording';
      updateStatus(
        'Recording... Click pause to pause, X to cancel, or checkmark to confirm.'
      );

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
        el.recordingStatus = 'paused';
        updateStatus('Recording paused. Click play to resume.');
      }
    };

    const resumeRecording = () => {
      const el = getComponent();
      if (!el || recordingInterval) return;

      el.recordingStatus = 'recording';
      updateStatus(
        'Recording... Click pause to pause, X to cancel, or checkmark to confirm.'
      );

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
        el.recording = false;
        el.recordingStatus = 'recording';
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
        el.recording = false;
        el.recordingStatus = 'recording';
        el.recordingDuration = 0;
        levels = [];
        el.audioLevels = [];
      }
    };

    const handleRecordingStatusToggle = (status: string) => {
      const el = getComponent();
      if (!el) return;

      // During recording, play/pause controls the recording
      if (el.recording) {
        if (status === 'recording') {
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
          <p style="margin: 0 0 12px 0; font-weight: 600;">
            Voice Recording Flow:
          </p>
          <ol
            style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;"
          >
            <li>Type some text in the input field (e.g., "Hello")</li>
            <li>Click the <strong>microphone button</strong> to start recording</li>
            <li>Use <strong>play/pause</strong> to pause and resume recording</li>
            <li>Click <strong>trash icon</strong> to cancel (your typed text is preserved)</li>
            <li>
              Click <strong>checkmark</strong> to confirm (transcription is appended
              to your text)
            </li>
          </ol>
        </div>
        <p
          id="demo-status"
          style="margin-bottom: 8px; font-size: 14px; color: var(--element-neutral-color, #666); font-style: italic; min-height: 20px;"
        >
          Type a message or click the microphone to start recording.
        </p>
        <obc-textarea-field
          id="demo-textarea-field"
          .type=${args.type ?? TextareaFieldType.Message}
          .title=${args.title ?? ''}
          .placeholder=${args.placeholder ?? 'Type a message...'}
          ?hideToolbar=${args.hideToolbar}
          ?hideVoiceRecording=${args.hideVoiceRecording}
          @voice-recording-start=${() => startRecording()}
          @recording-delete=${() => cancelRecording()}
          @voice-recording-confirm=${() => confirmRecording()}
          @recording-status-toggle=${(e: CustomEvent) =>
            handleRecordingStatusToggle(e.detail.status)}
          @send-click=${() => handleSend()}
        >
        </obc-textarea-field>
      </div>
    `;
  },
};
