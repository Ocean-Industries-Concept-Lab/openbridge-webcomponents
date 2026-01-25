import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {LitElement, html} from 'lit';
import {ObcTextareaField, TextareaFieldType} from './textarea-field.js';
import {VoiceAction} from './textarea-field.js';
import type {Attachment, VoiceActionDetail} from './textarea-field.js';
import {AudioRecordingStatus} from '../audio-recording-item/audio-recording-item.js';
import './textarea-field.js';

const meta: Meta<typeof ObcTextareaField> = {
  title: 'UI Components/Input Controls/Textarea Field',
  tags: ['autodocs', '6.0'],
  component: 'obc-textarea-field',
  args: {
    type: TextareaFieldType.Rich,
    value: '',
    placeholder: 'Type your text here...',
    label: '',
    errorText: '',
    disabled: false,
    error: false,
    required: false,
    hideLabel: false,
    hideToolbar: false,
    hideVoiceRecording: false,
    hasLeadingIcon: false,
    recording: false,
    recordingDuration: 0,
    audioLevels: [],
    recordingStatus: 'recording',
    playbackPosition: 0,
    attachments: [],
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(TextareaFieldType),
      description: "Field type: 'rich' (no send) or 'message' (with send)",
    },
    value: {
      control: {type: 'text'},
      description: 'The current text value',
    },
    placeholder: {
      control: {type: 'text'},
      description: 'Placeholder text shown when empty',
    },
    label: {
      control: {type: 'text'},
      description: 'Label text above the input',
    },
    errorText: {
      control: {type: 'text'},
      description: 'Error message below the field',
    },
    maxlength: {
      control: {type: 'number'},
      description: 'Maximum number of characters allowed',
    },
    disabled: {
      control: {type: 'boolean'},
      description: 'Disables the input and all actions',
    },
    error: {
      control: {type: 'boolean'},
      description: 'Shows error state',
    },
    required: {
      control: {type: 'boolean'},
      description: 'Shows required indicator next to label',
    },
    hideLabel: {
      control: {type: 'boolean'},
      description: 'Hides the label',
    },
    hideToolbar: {
      control: {type: 'boolean'},
      description: 'Hides the toolbar buttons',
    },
    hideVoiceRecording: {
      control: {type: 'boolean'},
      description: 'Hides the voice recording button',
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
      description: 'Shows a leading icon',
    },
    recording: {
      control: {type: 'boolean'},
      description: 'Whether voice recording is active',
    },
    recordingDuration: {
      control: {type: 'number'},
      description: 'Recording duration in seconds',
    },
    audioLevels: {
      control: {type: 'object'},
      description: 'Audio levels (0-1) for waveform visualization',
    },
    recordingStatus: {
      control: {type: 'select'},
      options: ['recording', 'paused', 'playback'],
      description:
        'Recording status: recording (live), paused (frozen), or playback (preview with slider)',
    },
    playbackPosition: {
      control: {type: 'range', min: 0, max: 1, step: 0.01},
      description: 'Playback position (0-1) for playback mode',
    },
    attachments: {
      control: {type: 'object'},
      description: 'Array of attachment objects',
    },
  },
  parameters: {
    actions: {
      handles: [
        'value-changed',
        'send-click',
        'add-click',
        'screenshot-click',
        'image-click',
        'attachment-click',
        'voice-action',
        'attachment-remove',
      ],
    },
  },
  render: (args) => html`
    <obc-textarea-field
      .type=${args.type ?? TextareaFieldType.Rich}
      .value=${args.value ?? ''}
      .placeholder=${args.placeholder ?? ''}
      .label=${args.label ?? ''}
      .errorText=${args.errorText ?? ''}
      .maxlength=${args.maxlength}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?required=${args.required}
      ?hideLabel=${args.hideLabel}
      ?hideToolbar=${args.hideToolbar}
      ?hideVoiceRecording=${args.hideVoiceRecording}
      ?hasLeadingIcon=${args.hasLeadingIcon}
      ?recording=${args.recording}
      .recordingDuration=${args.recordingDuration ?? 0}
      .audioLevels=${args.audioLevels ?? []}
      .recordingStatus=${args.recordingStatus ?? 'recording'}
      .playbackPosition=${args.playbackPosition ?? 0}
      .attachments=${(args.attachments as Attachment[]) ?? []}
    ></obc-textarea-field>
  `,
} satisfies Meta<ObcTextareaField>;

export default meta;
type Story = StoryObj<ObcTextareaField>;

// =============================================================================
// RICH TYPE - BASIC
// =============================================================================

export const Default: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    placeholder: 'Enter description...',
    value:
      'This is a rich text field with toolbar and voice recording enabled.',
    hideToolbar: false,
  },
};

export const Empty: Story = {
  args: {
    type: TextareaFieldType.Rich,
    placeholder: 'Type your text here...',
    hideToolbar: true,
  },
};

export const Filled: Story = {
  args: {
    type: TextareaFieldType.Rich,
    value: 'This is some text content in the rich text field.',
    placeholder: 'Type your text here...',
    hideToolbar: true,
  },
};

// =============================================================================
// RICH TYPE - LABEL
// =============================================================================

export const WithLabel: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    placeholder: 'Enter description...',
    hideToolbar: true,
  },
};

export const WithLabelRequired: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    placeholder: 'Enter description...',
    required: true,
    hideToolbar: true,
  },
};

// =============================================================================
// RICH TYPE - TOOLBAR
// =============================================================================

export const WithToolbar: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    placeholder: 'Type your text here...',
    hideToolbar: false,
  },
};

// =============================================================================
// RICH TYPE - STATES
// =============================================================================

export const ErrorState: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    error: true,
    errorText: 'This field is required',
    value: '',
    hideToolbar: true,
  },
};

export const Disabled: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    disabled: true,
    placeholder: 'This field is disabled...',
    hideToolbar: true,
  },
};

// =============================================================================
// RICH TYPE - RECORDING
// =============================================================================

export const Recording: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    recording: true,
    recordingStatus: AudioRecordingStatus.Recording,
    recordingDuration: 8,
    audioLevels: [0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.3, 0.6],
  },
};

export const RecordingPaused: Story = {
  args: {
    type: TextareaFieldType.Rich,
    label: 'Description',
    recording: true,
    recordingStatus: AudioRecordingStatus.Playback,
    recordingDuration: 5,
    playbackPosition: 0,
  },
};

// =============================================================================
// MESSAGE TYPE - BASIC
// =============================================================================

export const MessageDefault: Story = {
  args: {
    type: TextareaFieldType.Message,
    label: 'Message',
    placeholder: 'Type a message...',
    value: 'This is a message field ready to send.',
  },
};

export const MessageEmpty: Story = {
  args: {
    type: TextareaFieldType.Message,
    placeholder: 'Type a message...',
  },
};

export const MessageFilled: Story = {
  args: {
    type: TextareaFieldType.Message,
    value: 'This is a message ready to be sent.',
    placeholder: 'Type a message...',
  },
};

export const MessageWithLabel: Story = {
  args: {
    type: TextareaFieldType.Message,
    label: 'Message',
    placeholder: 'Type your message here...',
  },
};

// =============================================================================
// MESSAGE TYPE - STATES
// =============================================================================

export const MessageError: Story = {
  args: {
    type: TextareaFieldType.Message,
    error: true,
    errorText: 'Message is too long',
    value: 'This message has an error.',
  },
};

export const MessageDisabled: Story = {
  args: {
    type: TextareaFieldType.Message,
    disabled: true,
    placeholder: 'This field is disabled...',
  },
};

// =============================================================================
// MESSAGE TYPE - ATTACHMENTS
// =============================================================================

export const MessageWithAttachments: Story = {
  args: {
    type: TextareaFieldType.Message,
    placeholder: 'Type a message...',
    attachments: [
      {id: '1', label: 'document.pdf', showIcon: false},
      {id: '2', label: 'image.png', showIcon: false},
      {id: '3', label: 'spreadsheet.xlsx', showIcon: false},
    ],
  },
};

// =============================================================================
// MESSAGE TYPE - RECORDING
// =============================================================================

export const MessageRecording: Story = {
  args: {
    type: TextareaFieldType.Message,
    recording: true,
    recordingStatus: AudioRecordingStatus.Recording,
    recordingDuration: 12,
    audioLevels: [
      0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.3, 0.6, 0.7, 0.4, 0.5, 0.8, 0.6,
    ],
  },
};

export const MessageRecordingPaused: Story = {
  args: {
    type: TextareaFieldType.Message,
    recording: true,
    recordingStatus: AudioRecordingStatus.Playback,
    recordingDuration: 8,
    playbackPosition: 0,
  },
};

// =============================================================================
// INTERACTIVE DEMOS
// =============================================================================

const MAX_AUDIO_BARS = 40;
const TRANSCRIPTION_PHRASES = [
  'this is a voice message',
  'how are you doing today',
  'please check the latest report',
  'I will call you back later',
  'the meeting is scheduled for tomorrow',
];

function generateRandomLevel(): number {
  const isSilent = Math.random() < 0.2;
  return isSilent ? 0.1 + Math.random() * 0.2 : 0.3 + Math.random() * 0.7;
}

function getRandomTranscriptionPhrase(): string {
  return TRANSCRIPTION_PHRASES[
    Math.floor(Math.random() * TRANSCRIPTION_PHRASES.length)
  ];
}

if (!customElements.get('obc-textarea-demo-message')) {
  customElements.define(
    'obc-textarea-demo-message',
    class extends LitElement {
      static properties = {args: {attribute: false}} as const;
      declare args?: Partial<ObcTextareaField>;
      private _recordingInterval: number | null = null;
      private _levels: number[] = [];

      override disconnectedCallback(): void {
        this._cleanup();
        super.disconnectedCallback();
      }

      private _cleanup(): void {
        if (this._recordingInterval) {
          clearInterval(this._recordingInterval);
          this._recordingInterval = null;
        }
      }

      private _getComponent(): ObcTextareaField | null {
        return this.renderRoot.querySelector('#demo-message-field');
      }

      private _updateStatus(message: string): void {
        const statusEl = this.renderRoot.querySelector('#demo-message-status');
        if (statusEl) statusEl.textContent = message;
      }

      private _startRecording(): void {
        const el = this._getComponent();
        if (!el || this._recordingInterval) return;
        el.recording = true;
        el.recordingDuration = 0;
        this._levels = [];
        el.audioLevels = [];
        el.recordingStatus = AudioRecordingStatus.Recording;
        this._updateStatus('Recording...');
        this._recordingInterval = window.setInterval(() => {
          el.recordingDuration += 0.1;
          this._levels = [...this._levels, generateRandomLevel()].slice(
            -MAX_AUDIO_BARS
          );
          el.audioLevels = [...this._levels];
        }, 100);
      }

      private _pauseRecording(): void {
        if (this._recordingInterval) {
          clearInterval(this._recordingInterval);
          this._recordingInterval = null;
        }
        const el = this._getComponent();
        if (el) {
          // Message type uses playback state when paused (shows slider with play/pause)
          el.recordingStatus = AudioRecordingStatus.Playback;
          el.playbackPosition = 0;
          this._updateStatus('Recording paused. Click mic to continue.');
        }
      }

      private _resumeRecording(): void {
        const el = this._getComponent();
        if (!el || this._recordingInterval) return;
        el.recordingStatus = AudioRecordingStatus.Recording;
        this._updateStatus('Recording...');
        this._recordingInterval = window.setInterval(() => {
          el.recordingDuration += 0.1;
          this._levels = [...this._levels, generateRandomLevel()].slice(
            -MAX_AUDIO_BARS
          );
          el.audioLevels = [...this._levels];
        }, 100);
      }

      private _deleteRecording(): void {
        this._cleanup();
        const el = this._getComponent();
        if (el) {
          el.recording = false;
          el.recordingStatus = AudioRecordingStatus.Recording;
          el.recordingDuration = 0;
          this._levels = [];
          el.audioLevels = [];
          this._updateStatus('Recording deleted.');
        }
      }

      private _transcribeRecording(): void {
        this._cleanup();
        const el = this._getComponent();
        if (el) {
          const phrase = getRandomTranscriptionPhrase();
          el.value = el.value.trim() ? el.value.trim() + ', ' + phrase : phrase;
          el.recording = false;
          el.recordingStatus = AudioRecordingStatus.Recording;
          el.recordingDuration = 0;
          this._levels = [];
          el.audioLevels = [];
          this._updateStatus(`Transcribed: "${phrase}"`);
        }
      }

      private _sendVoiceMessage(): void {
        this._cleanup();
        const el = this._getComponent();
        if (el) {
          this._updateStatus(
            `Voice message sent! (${Math.floor(el.recordingDuration)}s)`
          );
          el.recording = false;
          el.recordingStatus = AudioRecordingStatus.Recording;
          el.recordingDuration = 0;
          this._levels = [];
          el.audioLevels = [];
        }
      }

      private _handleSend(): void {
        const el = this._getComponent();
        if (el) {
          this._updateStatus(`Sent: "${el.value}"`);
          el.value = '';
        }
      }

      override render() {
        const args = this.args ?? {};
        return html`
          <div>
            <p
              id="demo-message-status"
              style="margin-bottom: 8px; font-size: 14px; color: var(--element-neutral-color, #666); font-style: italic;"
            >
              Type a message or click the microphone to start recording.
            </p>
            <obc-textarea-field
              id="demo-message-field"
              .type=${args.type ?? TextareaFieldType.Message}
              .label=${args.label ?? ''}
              .placeholder=${args.placeholder ?? 'Type a message...'}
              ?hideToolbar=${args.hideToolbar}
              ?hideVoiceRecording=${args.hideVoiceRecording}
              @voice-action=${(e: CustomEvent<VoiceActionDetail>) => {
                switch (e.detail.action) {
                  case VoiceAction.Start:
                    this._startRecording();
                    break;
                  case VoiceAction.Delete:
                    this._deleteRecording();
                    break;
                  case VoiceAction.Pause:
                    this._pauseRecording();
                    break;
                  case VoiceAction.Resume:
                    this._resumeRecording();
                    break;
                  case VoiceAction.Transcribe:
                    this._transcribeRecording();
                    break;
                  case VoiceAction.Send:
                    this._sendVoiceMessage();
                    break;
                }
              }}
              @send-click=${() => this._handleSend()}
            ></obc-textarea-field>
          </div>
        `;
      }
    }
  );
}

if (!customElements.get('obc-textarea-demo-rich')) {
  customElements.define(
    'obc-textarea-demo-rich',
    class extends LitElement {
      static properties = {args: {attribute: false}} as const;
      declare args?: Partial<ObcTextareaField>;
      private _recordingInterval: number | null = null;
      private _levels: number[] = [];

      override disconnectedCallback(): void {
        this._cleanup();
        super.disconnectedCallback();
      }

      private _cleanup(): void {
        if (this._recordingInterval) {
          clearInterval(this._recordingInterval);
          this._recordingInterval = null;
        }
      }

      private _getComponent(): ObcTextareaField | null {
        return this.renderRoot.querySelector('#demo-rich-field');
      }

      private _updateStatus(message: string): void {
        const statusEl = this.renderRoot.querySelector('#demo-rich-status');
        if (statusEl) statusEl.textContent = message;
      }

      private _startRecording(): void {
        const el = this._getComponent();
        if (!el || this._recordingInterval) return;
        el.recording = true;
        el.recordingDuration = 0;
        this._levels = [];
        el.audioLevels = [];
        el.recordingStatus = AudioRecordingStatus.Recording;
        this._updateStatus('Recording...');
        this._recordingInterval = window.setInterval(() => {
          el.recordingDuration += 0.1;
          this._levels = [...this._levels, generateRandomLevel()].slice(
            -MAX_AUDIO_BARS
          );
          el.audioLevels = [...this._levels];
        }, 100);
      }

      private _pauseRecording(): void {
        if (this._recordingInterval) {
          clearInterval(this._recordingInterval);
          this._recordingInterval = null;
        }
        const el = this._getComponent();
        if (el) {
          // Rich type uses playback state when paused (shows slider with play/pause)
          el.recordingStatus = AudioRecordingStatus.Playback;
          el.playbackPosition = 0;
          this._updateStatus('Recording paused. Click mic to continue.');
        }
      }

      private _resumeRecording(): void {
        const el = this._getComponent();
        if (!el || this._recordingInterval) return;
        el.recordingStatus = AudioRecordingStatus.Recording;
        this._updateStatus('Recording...');
        this._recordingInterval = window.setInterval(() => {
          el.recordingDuration += 0.1;
          this._levels = [...this._levels, generateRandomLevel()].slice(
            -MAX_AUDIO_BARS
          );
          el.audioLevels = [...this._levels];
        }, 100);
      }

      private _cancelRecording(): void {
        this._cleanup();
        const el = this._getComponent();
        if (el) {
          el.recording = false;
          el.recordingStatus = AudioRecordingStatus.Recording;
          el.recordingDuration = 0;
          this._levels = [];
          el.audioLevels = [];
          this._updateStatus('Recording cancelled.');
        }
      }

      private _confirmRecording(): void {
        this._cleanup();
        const el = this._getComponent();
        if (el) {
          const phrase = getRandomTranscriptionPhrase();
          el.value = el.value.trim() ? el.value.trim() + ', ' + phrase : phrase;
          el.recording = false;
          el.recordingStatus = AudioRecordingStatus.Recording;
          el.recordingDuration = 0;
          this._levels = [];
          el.audioLevels = [];
          this._updateStatus(`Transcribed: "${phrase}"`);
        }
      }

      override render() {
        const args = this.args ?? {};
        return html`
          <div>
            <p
              id="demo-rich-status"
              style="margin-bottom: 8px; font-size: 14px; color: var(--element-neutral-color, #666); font-style: italic;"
            >
              Type text or click the microphone to start recording.
            </p>
            <obc-textarea-field
              id="demo-rich-field"
              .type=${args.type ?? TextareaFieldType.Rich}
              .label=${args.label ?? ''}
              .placeholder=${args.placeholder ?? 'Type your text...'}
              ?hideToolbar=${args.hideToolbar}
              ?hideVoiceRecording=${args.hideVoiceRecording}
              @voice-action=${(e: CustomEvent<VoiceActionDetail>) => {
                switch (e.detail.action) {
                  case VoiceAction.Start:
                    this._startRecording();
                    break;
                  case VoiceAction.Cancel:
                    this._cancelRecording();
                    break;
                  case VoiceAction.Pause:
                    this._pauseRecording();
                    break;
                  case VoiceAction.Resume:
                    this._resumeRecording();
                    break;
                  case VoiceAction.Confirm:
                    this._confirmRecording();
                    break;
                }
              }}
            ></obc-textarea-field>
          </div>
        `;
      }
    }
  );
}

export const InteractiveDemoMessage: Story = {
  tags: ['skip-snapshot'],
  args: {
    type: TextareaFieldType.Message,
    label: 'Message Demo',
    placeholder: 'Type a message or click the microphone...',
  },
  render: (args) => html`
    <obc-textarea-demo-message .args=${args}></obc-textarea-demo-message>
  `,
};

export const InteractiveDemoRich: Story = {
  tags: ['skip-snapshot'],
  args: {
    type: TextareaFieldType.Rich,
    label: 'Rich Demo',
    placeholder: 'Type or record your text...',
  },
  render: (args) => html`
    <obc-textarea-demo-rich .args=${args}></obc-textarea-demo-rich>
  `,
};
