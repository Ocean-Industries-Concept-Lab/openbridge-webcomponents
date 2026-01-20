import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './textarea-field.css?inline';
import {property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../icon-button/icon-button.js';
import '../input-chip/input-chip.js';
import '../button/button.js';
import '../audio-recording-item/audio-recording-item.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-screen-shot.js';
import '../../icons/icon-image.js';
import '../../icons/icon-attachment.js';
import '../../icons/icon-com-microphone.js';
import '../../icons/icon-arrow-up-google.js';
import '../../icons/icon-check-google.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-delete.js';
import '../../icons/icon-media-pause.js';
import '../../icons/icon-media-play.js';
import {AudioRecordingStatus} from '../audio-recording-item/audio-recording-item.js';

/**
 * Textarea field type determines messaging-specific features.
 */
export enum TextareaFieldType {
  /** Rich text field without send button */
  Rich = 'rich',
  /** Message field with send button */
  Message = 'message',
}

/**
 * Attachment object for file chips.
 */
export interface Attachment {
  /** Unique identifier for removal */
  id: string;
  /** Display text */
  label: string;
  /** Whether to show an icon in the chip */
  showIcon?: boolean;
}

/**
 * `<obc-textarea-field>` – A multi-line text input component with toolbar, voice recording, and attachments for composing messages or notes.
 *
 * Provides a flexible textarea for composing extended text content, with optional toolbar actions (screenshot, image, attachment), voice recording UI, file attachment chips, and form features like labels and validation. Use the `type` property to switch between rich text mode (for forms/notes) and message mode (for chat-style messaging with a send button).
 *
 * ## Features
 *
 * - **Field types:**
 *   - `rich` (default): Multi-line input without a send button, suitable for forms or note-taking.
 *   - `message`: Includes a send button for chat-style messaging interfaces.
 * - **Toolbar actions:**
 *   - Add (+): Generic action for adding content.
 *   - Screenshot: Capture and attach a screenshot.
 *   - Image: Attach an image file.
 *   - Attachment: Attach any file type.
 *   - Toolbar can be hidden via `hideToolbar`.
 * - **Voice recording:**
 *   - Microphone button to start voice recording (UI only—parent handles audio capture).
 *   - Displays `<obc-audio-recording-item>` waveform during recording.
 *   - Different controls for Rich vs Message types (see Voice Recording Flow below).
 *   - Can be hidden via `hideVoiceRecording`.
 * - **Attachments:**
 *   - Display file attachments as removable chips below the input.
 *   - Each chip can be removed, firing `attachment-remove`.
 * - **Form features:**
 *   - Optional label with required indicator.
 *   - Error state with error message display.
 *   - Disabled state prevents all interaction.
 *   - Optional leading icon slot.
 * - **Keyboard support:**
 *   - Ctrl/Cmd + Enter sends the message (Message type only).
 *
 * ## Voice Recording Flow
 *
 * The component provides UI for voice recording but does NOT handle actual audio capture.
 * The parent application is responsible for managing the recording state, audio levels, and duration.
 *
 * **Rich type recording controls:**
 * - Cancel (X): Fires `voice-recording-cancel` — parent should set `recording=false`.
 * - Pause/Play: Fires `voice-recording-pause` or `voice-recording-resume`.
 * - Confirm (checkmark): Fires `voice-recording-confirm` — parent should transcribe and append to `value`.
 *
 * **Message type recording controls:**
 * - Delete (trash): Fires `voice-recording-delete` — parent should set `recording=false`.
 * - Transcribe button: Fires `voice-transcribe` — parent should convert audio to text.
 * - Pause/Mic: Fires `voice-recording-pause` to pause, or `voice-recording-resume` to continue.
 * - Send: Fires `voice-send` — parent should send as voice message.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-textarea-field>` for composing messages, notes, or any multi-line text input that benefits from media attachments or voice recording. Choose `type="message"` for chat interfaces where users expect a send button, or `type="rich"` for forms and note-taking where submission is handled separately.
 *
 * For voice recording, the parent application must:
 * 1. Listen for `voice-recording-start` and begin audio capture.
 * 2. Set `recording=true` and update `audioLevels` and `recordingDuration` as recording progresses.
 * 3. Handle pause/resume/cancel/confirm/send events appropriately.
 * 4. Set `recording=false` when recording ends.
 *
 * **Keywords:** textarea, text input, message composer, chat input, voice message, file attachment, multi-line input, form field
 *
 * ## Slots
 *
 * | Name           | Rendered when…         | Purpose                                       |
 * | -------------- | ---------------------- | --------------------------------------------- |
 * | `leading-icon` | `hasLeadingIcon=true`  | Displays a contextual icon before the input.  |
 *
 * ## Events
 *
 * - `value-changed` – Fired when the textarea loses focus (blur), with the current value.
 * - `send-click` – Fired when the send button is clicked (Message type only), with the current value.
 * - `add-click` – Fired when the add (+) button is clicked.
 * - `screenshot-click` – Fired when the screenshot button is clicked.
 * - `image-click` – Fired when the image button is clicked.
 * - `attachment-click` – Fired when the attachment button is clicked.
 * - `voice-recording-start` – Fired when the microphone button is clicked to start recording.
 * - `voice-recording-cancel` – Fired when cancel (X) is clicked during recording (Rich type).
 * - `voice-recording-confirm` – Fired when confirm (checkmark) is clicked after recording (Rich type).
 * - `voice-recording-delete` – Fired when delete (trash) is clicked during recording (Message type).
 * - `voice-recording-pause` – Fired when pause is clicked during recording.
 * - `voice-recording-resume` – Fired when resume/mic is clicked to continue recording.
 * - `voice-transcribe` – Fired when transcribe is clicked (Message type).
 * - `voice-send` – Fired when send is clicked during recording (Message type).
 * - `recording-playback-toggle` – Fired when play/pause is toggled on recorded audio preview.
 * - `attachment-remove` – Fired when an attachment chip's remove button is clicked.
 *
 * ## Example
 *
 * ```html
 * <obc-textarea-field
 *   type="message"
 *   label="Message"
 *   placeholder="Type a message..."
 *   .attachments=${[{id: '1', label: 'document.pdf', showIcon: true}]}
 *   hasLeadingIcon
 *   @send-click=${(e) => console.log('Send:', e.detail.value)}
 *   @attachment-remove=${(e) => console.log('Remove:', e.detail.id)}
 * >
 *   <obi-com-microphone slot="leading-icon"></obi-com-microphone>
 * </obc-textarea-field>
 * ```
 *
 * ---
 *
 * @slot leading-icon - Displays a contextual icon before the input when `hasLeadingIcon` is true.
 *
 * @fires value-changed {CustomEvent<{value: string}>} Fired when the textarea loses focus (blur).
 * @fires send-click {CustomEvent<{value: string}>} Fired when the send button is clicked (Message type only).
 * @fires add-click {CustomEvent<void>} Fired when the add (+) button is clicked.
 * @fires screenshot-click {CustomEvent<void>} Fired when the screenshot button is clicked.
 * @fires image-click {CustomEvent<void>} Fired when the image button is clicked.
 * @fires attachment-click {CustomEvent<void>} Fired when the attachment button is clicked.
 * @fires voice-recording-start {CustomEvent<void>} Fired when the microphone button is clicked to start recording.
 * @fires voice-recording-cancel {CustomEvent<void>} Fired when cancel (X) is clicked during recording (Rich type).
 * @fires voice-recording-confirm {CustomEvent<void>} Fired when confirm (checkmark) is clicked after recording (Rich type).
 * @fires voice-recording-delete {CustomEvent<void>} Fired when delete (trash) is clicked during recording (Message type).
 * @fires voice-recording-pause {CustomEvent<void>} Fired when pause is clicked during recording.
 * @fires voice-recording-resume {CustomEvent<void>} Fired when resume/mic is clicked to continue recording.
 * @fires voice-transcribe {CustomEvent<void>} Fired when transcribe is clicked (Message type).
 * @fires voice-send {CustomEvent<void>} Fired when send is clicked during recording (Message type).
 * @fires recording-playback-toggle {CustomEvent<{playing: boolean}>} Fired when play/pause is toggled on recorded audio.
 * @fires attachment-remove {CustomEvent<{id: string}>} Fired when an attachment chip is removed.
 */
@customElement('obc-textarea-field')
export class ObcTextareaField extends LitElement {
  // ============== Core Properties ==============

  /**
   * Field type: 'rich' (no send button) or 'message' (with send button).
   */
  @property({type: String}) type: TextareaFieldType = TextareaFieldType.Rich;

  /**
   * The current text value of the input field.
   */
  @property({type: String}) value = '';

  /**
   * Placeholder text shown when the input is empty.
   */
  @property({type: String}) placeholder = '';

  /**
   * Label text displayed above the input field.
   * Note: Named 'label' instead of 'title' to avoid conflict with HTMLElement's native title attribute (tooltip).
   */
  @property({type: String}) label = '';

  /**
   * Error text displayed below the field when `error` is true.
   */
  @property({type: String}) errorText = '';

  /**
   * Maximum number of characters allowed in the textarea.
   */
  @property({type: Number}) maxlength?: number;

  // ============== Boolean Flags (all default false) ==============

  /**
   * Disables the input field and all actions.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Shows error state with visual highlight.
   */
  @property({type: Boolean}) error = false;

  /**
   * Shows a required indicator next to the label.
   */
  @property({type: Boolean}) required = false;

  /**
   * Hides the label above the input field.
   */
  @property({type: Boolean}) hideLabel = false;

  /**
   * Hides the toolbar with action buttons.
   */
  @property({type: Boolean}) hideToolbar = false;

  /**
   * Hides the voice recording button.
   */
  @property({type: Boolean}) hideVoiceRecording = false;

  /**
   * Shows a leading icon before the input field.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  // ============== Voice Recording Properties ==============

  /**
   * Whether voice recording is currently active.
   * When true, shows the audio-recording-item instead of textarea.
   */
  @property({type: Boolean}) recording = false;

  /**
   * Current recording duration in seconds.
   */
  @property({type: Number}) recordingDuration = 0;

  /**
   * Array of audio level values (0-1) for waveform visualization.
   * New values should be added to the end (right side) and old values shift left.
   */
  @property({type: Array}) audioLevels: number[] = [];

  /**
   * Recording status passed to audio-recording-item.
   */
  @property({type: String}) recordingStatus: AudioRecordingStatus =
    AudioRecordingStatus.Recording;

  // ============== Attachments ==============

  /**
   * Array of file attachments displayed as removable chips.
   */
  @property({type: Array}) attachments: Attachment[] = [];

  // ============== Internal State ==============

  @state() private _focused = false;
  @state() private _statusAnnouncement = '';

  // ============== DOM Queries ==============

  @query('.input-field') private _textarea?: HTMLTextAreaElement;
  @query('.action-container obc-icon-button')
  private _firstActionButton?: HTMLElement;

  // ============== Lifecycle ==============

  protected override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // Manage focus and announce recording state changes
    if (changedProperties.has('recording')) {
      const wasRecording = changedProperties.get('recording') as boolean;
      if (this.recording && !wasRecording) {
        // Recording just started - focus the first action button and announce
        this.announceStatus('Recording started');
        requestAnimationFrame(() => {
          this._firstActionButton?.focus();
        });
      } else if (!this.recording && wasRecording) {
        // Recording just ended - focus the textarea
        // Note: The specific end action (cancelled/saved/deleted) is announced
        // by the event handler that triggered recording=false
        requestAnimationFrame(() => {
          this._textarea?.focus();
        });
      }
    }

    // Announce pause/resume state changes
    if (changedProperties.has('recordingStatus') && this.recording) {
      const wasStatus = changedProperties.get(
        'recordingStatus'
      ) as AudioRecordingStatus;
      if (wasStatus !== undefined) {
        if (this.recordingStatus === AudioRecordingStatus.Paused) {
          this.announceStatus('Recording paused');
        } else if (wasStatus === AudioRecordingStatus.Paused) {
          this.announceStatus('Recording resumed');
        }
      }
    }
  }

  // ============== Accessibility ==============

  /**
   * Announces a status message to screen readers via the aria-live region.
   * Clears first then sets after a frame to ensure re-announcement of repeated text.
   */
  private announceStatus(message: string) {
    this._statusAnnouncement = '';
    requestAnimationFrame(() => {
      this._statusAnnouncement = message;
    });
  }

  // ============== Computed Properties ==============

  private get isMessageType(): boolean {
    return this.type === TextareaFieldType.Message;
  }

  private get hasContent(): boolean {
    return this.value.trim().length > 0;
  }

  private get showTitle(): boolean {
    return !this.hideLabel && this.label.length > 0;
  }

  /**
   * Returns true when the field is in its default empty state:
   * no text content, no attachments, and not recording.
   */
  private get isEmpty(): boolean {
    return !this.hasContent && this.attachments.length === 0 && !this.recording;
  }

  // ============== Event Utilities ==============

  private emit(eventName: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitIfEnabled(eventName: string, detail?: unknown) {
    if (!this.disabled) {
      this.emit(eventName, detail);
    }
  }

  // ============== Event Handlers ==============

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Send on Enter + Ctrl/Cmd (common messaging pattern)
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.hasContent && this.isMessageType) {
        this.handleSendClick();
      }
    }
  }

  private handleFocus() {
    this._focused = true;
  }

  private handleBlur() {
    this._focused = false;
    this.emitIfEnabled('value-changed', {value: this.value});
  }

  private handleSendClick() {
    this.emitIfEnabled('send-click', {value: this.value});
  }

  private handleAddClick() {
    this.emitIfEnabled('add-click');
  }

  private handleScreenshotClick() {
    this.emitIfEnabled('screenshot-click');
  }

  private handleImageClick() {
    this.emitIfEnabled('image-click');
  }

  private handleAttachmentClick() {
    this.emitIfEnabled('attachment-click');
  }

  private handleVoiceRecordingStart() {
    this.emitIfEnabled('voice-recording-start');
  }

  private handleVoiceRecordingCancel() {
    this.emitIfEnabled('voice-recording-cancel');
  }

  private handleVoiceRecordingConfirm() {
    this.emitIfEnabled('voice-recording-confirm');
  }

  private handleVoiceRecordingDelete() {
    this.emitIfEnabled('voice-recording-delete');
  }

  private handleVoiceRecordingPause() {
    this.emitIfEnabled('voice-recording-pause');
  }

  private handleVoiceRecordingResume() {
    this.emitIfEnabled('voice-recording-resume');
  }

  private handleVoiceTranscribe() {
    this.emitIfEnabled('voice-transcribe');
  }

  private handleVoiceSend() {
    this.emitIfEnabled('voice-send');
  }

  private handleRecordingPlaybackToggle(e: CustomEvent) {
    // The audio-recording-item toggles between Recording and Paused states.
    // In the playback preview context, Paused means "not playing" and toggling
    // to Recording means "now playing". When status is NOT Paused, audio is playing.
    this.emitIfEnabled('recording-playback-toggle', {
      playing: e.detail.status !== AudioRecordingStatus.Paused,
    });
  }

  private handleAttachmentRemove(attachment: Attachment) {
    this.emitIfEnabled('attachment-remove', {id: attachment.id});
  }

  // ============== Render Methods ==============

  private renderTitle() {
    if (!this.showTitle) return nothing;

    return html`
      <div class="title-text-container">
        <p id="title-text" class="title-text">${this.label}</p>
        ${this.required
          ? html`<div class="required-indicator"></div>`
          : nothing}
      </div>
    `;
  }

  private renderLeadingIcon() {
    if (!this.hasLeadingIcon) return nothing;

    return html`
      <div class="leading-icon">
        <slot name="leading-icon"></slot>
      </div>
    `;
  }

  private renderTextarea() {
    if (this.recording) return nothing;

    return html`
      <textarea
        class="input-field"
        .placeholder=${this.placeholder}
        .value=${this.value}
        @input=${this.handleInput}
        @keydown=${this.handleKeyDown}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        ?disabled=${this.disabled}
        maxlength=${ifDefined(this.maxlength)}
        aria-label=${ifDefined(
          this.showTitle ? undefined : this.placeholder || 'Text input'
        )}
        aria-labelledby=${ifDefined(this.showTitle ? 'title-text' : undefined)}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-required=${this.required ? 'true' : 'false'}
      ></textarea>
    `;
  }

  private renderAttachments() {
    if (this.attachments.length === 0) return nothing;

    return html`
      <div class="attachments-container">
        ${this.attachments.map(
          (attachment) => html`
            <obc-input-chip
              .label=${attachment.label}
              .showIcon=${attachment.showIcon ?? false}
              ?disabled=${this.disabled}
              @remove-chip=${() => this.handleAttachmentRemove(attachment)}
            ></obc-input-chip>
          `
        )}
      </div>
    `;
  }

  private renderAudioRecordingItem() {
    if (!this.recording) return nothing;

    // For Message type when paused, show play button to preview the recording
    // For Rich type, always show the waveform without action button (controls are in toolbar)
    const showPlaybackButton =
      this.isMessageType &&
      this.recordingStatus === AudioRecordingStatus.Paused;

    return html`
      <obc-audio-recording-item
        .audioLevels=${this.audioLevels}
        .duration=${this.recordingDuration}
        .status=${this.recordingStatus}
        .hasActionButton=${showPlaybackButton}
        @status-toggle=${this.handleRecordingPlaybackToggle}
      ></obc-audio-recording-item>
    `;
  }

  private renderToolbar() {
    if (this.hideToolbar && !this.isMessageType && !this.recording)
      return nothing;

    const isRecording = this.recording;
    const isPaused = this.recordingStatus === AudioRecordingStatus.Paused;

    return html`
      <div class="tool-bar-container">
        ${isRecording
          ? this.renderRecordingToolbar(isPaused)
          : this.renderNormalToolbar()}
      </div>
    `;
  }

  private renderNormalToolbar() {
    return html`
      ${!this.hideToolbar
        ? html`
            <div class="tool-container">
              <div class="divider"></div>
              <obc-icon-button
                variant="flat"
                @click=${this.handleAddClick}
                ?disabled=${this.disabled}
                aria-label="Add content"
              >
                <obi-up-iec></obi-up-iec>
              </obc-icon-button>
              <obc-icon-button
                variant="flat"
                @click=${this.handleScreenshotClick}
                ?disabled=${this.disabled}
                aria-label="Take screenshot"
              >
                <obi-screen-shot></obi-screen-shot>
              </obc-icon-button>
              <obc-icon-button
                variant="flat"
                @click=${this.handleImageClick}
                ?disabled=${this.disabled}
                aria-label="Add image"
              >
                <obi-image></obi-image>
              </obc-icon-button>
              <obc-icon-button
                variant="flat"
                @click=${this.handleAttachmentClick}
                ?disabled=${this.disabled}
                aria-label="Add attachment"
              >
                <obi-attachment></obi-attachment>
              </obc-icon-button>
            </div>
          `
        : nothing}

      <div class="action-container ${this.isEmpty ? 'inactive' : ''}">
        ${!this.hideVoiceRecording
          ? html`
              <obc-icon-button
                variant="normal"
                @click=${this.handleVoiceRecordingStart}
                ?disabled=${this.disabled}
                aria-label="Start voice recording"
              >
                <obi-com-microphone></obi-com-microphone>
              </obc-icon-button>
            `
          : nothing}
        ${this.isMessageType
          ? html`
              <obc-icon-button
                class="send-button"
                variant=${this.hasContent && !this.disabled
                  ? 'raised'
                  : 'normal'}
                @click=${this.handleSendClick}
                ?disabled=${this.disabled || !this.hasContent}
                aria-label="Send message"
              >
                <obi-arrow-up-google></obi-arrow-up-google>
              </obc-icon-button>
            `
          : nothing}
      </div>
    `;
  }

  private renderRecordingToolbar(isPaused: boolean) {
    if (this.isMessageType) {
      return this.renderMessageRecordingToolbar(isPaused);
    }
    return this.renderRichRecordingToolbar(isPaused);
  }

  /**
   * Rich type recording toolbar:
   * Bottom right: X (cancel), pause/play, checkmark (confirm)
   */
  private renderRichRecordingToolbar(isPaused: boolean) {
    return html`
      <div class="tool-container"></div>
      <div class="action-container recording-controls">
        <obc-icon-button
          variant="normal"
          @click=${this.handleVoiceRecordingCancel}
          ?disabled=${this.disabled}
          aria-label="Cancel recording"
          .cornerLeft=${true}
        >
          <obi-close-google></obi-close-google>
        </obc-icon-button>
        <obc-icon-button
          variant="normal"
          @click=${isPaused
            ? this.handleVoiceRecordingResume
            : this.handleVoiceRecordingPause}
          ?disabled=${this.disabled}
          aria-label=${isPaused ? 'Resume recording' : 'Pause recording'}
          .cornerLeft=${true}
          .cornerRight=${true}
        >
          ${isPaused
            ? html`<obi-media-play></obi-media-play>`
            : html`<obi-media-pause></obi-media-pause>`}
        </obc-icon-button>
        <obc-icon-button
          variant="normal"
          @click=${this.handleVoiceRecordingConfirm}
          ?disabled=${this.disabled}
          aria-label="Confirm recording"
          .cornerRight=${true}
        >
          <obi-check-google></obi-check-google>
        </obc-icon-button>
      </div>
    `;
  }

  /**
   * Message type recording toolbar:
   * Bottom left: trash (delete)
   * Bottom right: Transcribe button, pause/mic, send
   */
  private renderMessageRecordingToolbar(isPaused: boolean) {
    return html`
      <div class="tool-container">
        <obc-icon-button
          variant="normal"
          @click=${this.handleVoiceRecordingDelete}
          ?disabled=${this.disabled}
          aria-label="Delete recording"
        >
          <obi-delete></obi-delete>
        </obc-icon-button>
      </div>
      <div class="action-container recording-controls">
        <obc-button
          variant="normal"
          @click=${this.handleVoiceTranscribe}
          ?disabled=${this.disabled}
        >
          Transcribe
        </obc-button>
        <obc-icon-button
          variant="normal"
          @click=${isPaused
            ? this.handleVoiceRecordingResume
            : this.handleVoiceRecordingPause}
          ?disabled=${this.disabled}
          aria-label=${isPaused ? 'Continue recording' : 'Pause recording'}
        >
          ${isPaused
            ? html`<obi-com-microphone></obi-com-microphone>`
            : html`<obi-media-pause></obi-media-pause>`}
        </obc-icon-button>
        <obc-icon-button
          class="send-button"
          variant="raised"
          @click=${this.handleVoiceSend}
          ?disabled=${this.disabled}
          aria-label="Send voice message"
        >
          <obi-arrow-up-google></obi-arrow-up-google>
        </obc-icon-button>
      </div>
    `;
  }

  private renderErrorText() {
    if (!this.error || !this.errorText) return nothing;

    return html`
      <div class="error-text-container">
        <p class="error-text">${this.errorText}</p>
      </div>
    `;
  }

  /**
   * Renders a visually hidden live region for screen reader announcements.
   * Uses role="status" with aria-live="polite" to announce recording state changes
   * without interrupting the user.
   */
  private renderStatusAnnouncement() {
    return html`
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class="visually-hidden"
      >
        ${this._statusAnnouncement}
      </div>
    `;
  }

  override render() {
    return html`
      <div
        part="wrapper"
        class=${classMap({
          wrapper: true,
          disabled: this.disabled,
          error: this.error,
          focused: this._focused,
          empty: this.isEmpty,
          'has-leading-icon': this.hasLeadingIcon,
          'voice-recording-active': this.recording,
          'type-rich': this.type === TextareaFieldType.Rich,
          'type-message': this.type === TextareaFieldType.Message,
        })}
      >
        ${this.renderTitle()}
        <div part="content" class="content-container">
          ${this.renderLeadingIcon()} ${this.renderTextarea()}
          ${this.renderAttachments()} ${this.renderAudioRecordingItem()}
          ${this.renderToolbar()}
        </div>
        ${this.renderErrorText()} ${this.renderStatusAnnouncement()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-textarea-field': ObcTextareaField;
  }
}
