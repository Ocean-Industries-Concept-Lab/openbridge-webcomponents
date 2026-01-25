import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './textarea-field.css?inline';
import {property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {msg, localized} from '@lit/localize';
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
 * Voice action types for the consolidated voice-action event.
 */
export enum VoiceAction {
  Start = 'start',
  Cancel = 'cancel',
  Confirm = 'confirm',
  Delete = 'delete',
  Pause = 'pause',
  Resume = 'resume',
  Transcribe = 'transcribe',
  Send = 'send',
  PlaybackToggle = 'playback-toggle',
}

/**
 * Detail for the voice-action event.
 */
export interface VoiceActionDetail {
  /** The type of voice action */
  action: VoiceAction;
  /** For playback-toggle: the desired playing state */
  playing?: boolean;
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
 * **Recording status states:**
 * - `recording`: Active recording with live waveform visualization.
 * - `playback`: Recording is paused/stopped and user can preview the recorded audio with a slider and play/pause button.
 *   Use this state when the user pauses recording to allow them to review before confirming/sending.
 *
 * **Rich type recording controls:**
 * - Cancel (X): Fires `voice-action` with `action: 'cancel'` — parent should set `recording=false`.
 * - Pause/Mic: Fires `voice-action` with `action: 'pause'` or `action: 'resume'`.
 * - Confirm (checkmark): Fires `voice-action` with `action: 'confirm'` — parent should transcribe and append to `value`.
 *
 * **Message type recording controls:**
 * - Delete (trash): Fires `voice-action` with `action: 'delete'` — parent should set `recording=false`.
 * - Transcribe button: Fires `voice-action` with `action: 'transcribe'` — parent should convert audio to text.
 * - Pause/Mic: Fires `voice-action` with `action: 'pause'` or `action: 'resume'`.
 * - Send: Fires `voice-action` with `action: 'send'` — parent should send as voice message.
 *
 * **Playback mode:**
 * When `recordingStatus="playback"`, the component shows a progress slider instead of the waveform.
 * The parent should update `playbackPosition` (0-1) as audio plays and handle `voice-action`
 * with `action: 'playback-toggle'` and `playing: boolean` to control playback.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-textarea-field>` for composing messages, notes, or any multi-line text input that benefits from media attachments or voice recording. Choose `type="message"` for chat interfaces where users expect a send button, or `type="rich"` for forms and note-taking where submission is handled separately.
 *
 * For voice recording, the parent application must:
 * 1. Listen for `voice-action` with `action: 'start'` and begin audio capture.
 * 2. Set `recording=true` and update `audioLevels` and `recordingDuration` as recording progresses.
 * 3. Handle other `voice-action` events (pause/resume/cancel/confirm/send/transcribe) appropriately.
 * 4. For playback preview, set `recordingStatus="playback"` and update `playbackPosition`.
 * 5. Handle `voice-action` with `action: 'playback-toggle'` and use `event.detail.playing` to control audio playback.
 * 6. Set `recording=false` when recording ends (the component automatically resets `recordingStatus` and `playbackPosition`).
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
 * - `value-changed` – Fired when the textarea loses focus (blur) and the value has changed since the last emit.
 * - `send-click` – Fired when the send button is clicked (Message type only), with the current value.
 * - `add-click` – Fired when the add (+) button is clicked.
 * - `screenshot-click` – Fired when the screenshot button is clicked.
 * - `image-click` – Fired when the image button is clicked.
 * - `attachment-click` – Fired when the attachment button is clicked.
 * - `voice-action` – Fired for all voice recording actions. The `detail.action` specifies the action type:
 *   - `start`: Microphone button clicked to start recording.
 *   - `cancel`: Cancel (X) clicked during recording (Rich type).
 *   - `confirm`: Confirm (checkmark) clicked after recording (Rich type).
 *   - `delete`: Delete (trash) clicked during recording (Message type).
 *   - `pause`: Pause clicked during recording.
 *   - `resume`: Resume/mic clicked to continue recording.
 *   - `transcribe`: Transcribe clicked (Message type).
 *   - `send`: Send clicked during recording (Message type).
 *   - `playback-toggle`: Play/pause toggled on recorded audio preview. Includes `detail.playing` boolean.
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
 * @fires value-changed {CustomEvent<{value: string}>} Fired on blur when value has changed.
 * @fires send-click {CustomEvent<{value: string}>} Fired when the send button is clicked (Message type only).
 * @fires add-click {CustomEvent<void>} Fired when the add (+) button is clicked.
 * @fires screenshot-click {CustomEvent<void>} Fired when the screenshot button is clicked.
 * @fires image-click {CustomEvent<void>} Fired when the image button is clicked.
 * @fires attachment-click {CustomEvent<void>} Fired when the attachment button is clicked.
 * @fires voice-action {CustomEvent<VoiceActionDetail>} Fired for all voice recording actions. Check detail.action for the action type.
 * @fires attachment-remove {CustomEvent<{id: string}>} Fired when an attachment chip is removed.
 */
@customElement('obc-textarea-field')
@localized()
export class ObcTextareaField extends LitElement {
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
   * Use 'recording' during active recording, and 'playback' when paused
   * to allow the user to preview the recorded audio with a slider.
   * Automatically reset to 'recording' when `recording` becomes false.
   */
  @property({type: String}) recordingStatus: AudioRecordingStatus =
    AudioRecordingStatus.Recording;

  /**
   * Current playback position (0-1) for playback mode.
   * Only relevant when recordingStatus is 'playback'.
   */
  @property({type: Number}) playbackPosition = 0;

  /**
   * Array of file attachments displayed as removable chips.
   */
  @property({type: Array}) attachments: Attachment[] = [];

  @state() private _focused = false;
  @state() private _statusAnnouncement = '';
  @state() private _isPlayingRecording = false;

  private _lastEmittedValue = '';

  @query('.input-field') private _textarea?: HTMLTextAreaElement;
  @query('.action-container obc-icon-button')
  private _firstActionButton?: HTMLElement;

  protected override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);

    // Sync _lastEmittedValue when value is set externally (not during editing)
    if (changedProperties.has('value') && !this._focused) {
      this._lastEmittedValue = this.value;
    }
  }

  protected override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    // Manage focus and announce recording state changes
    if (changedProperties.has('recording')) {
      const wasRecording = changedProperties.get('recording') as boolean;
      if (this.recording && !wasRecording) {
        // Recording just started - focus the first action button and announce
        this.announceStatus('Recording started');
        this.safeFocus(this._firstActionButton);
      } else if (!this.recording && wasRecording) {
        // Recording just ended - reset recording state and focus the textarea
        // These values are irrelevant when not recording, and resetting them
        // ensures a clean state for the next recording session
        this.recordingStatus = AudioRecordingStatus.Recording;
        this.playbackPosition = 0;
        this._isPlayingRecording = false;
        this.safeFocus(this._textarea);
      }
    }

    // Announce pause/resume state changes
    if (changedProperties.has('recordingStatus') && this.recording) {
      const wasStatus = changedProperties.get(
        'recordingStatus'
      ) as AudioRecordingStatus;
      if (wasStatus !== undefined) {
        const wasPausedOrPlayback =
          wasStatus === AudioRecordingStatus.Paused ||
          wasStatus === AudioRecordingStatus.Playback;

        if (this.isPausedOrPlayback && !wasPausedOrPlayback) {
          this.announceStatus('Recording paused');
        } else if (!this.isPausedOrPlayback && wasPausedOrPlayback) {
          this.announceStatus('Recording resumed');
        }
      }
    }
  }

  private _pendingAnnouncementId = 0;

  /**
   * Announces a status message to screen readers via the aria-live region.
   * Uses a unique ID to prevent rapid calls from dropping messages.
   */
  private announceStatus(message: string) {
    this._pendingAnnouncementId++;
    const announcementId = this._pendingAnnouncementId;
    this._statusAnnouncement = '';
    requestAnimationFrame(() => {
      // Only announce if this is still the latest announcement and component is connected
      if (this.isConnected && announcementId === this._pendingAnnouncementId) {
        this._statusAnnouncement = message;
      }
    });
  }

  /**
   * Safely focuses an element after a frame, checking that the component is still connected.
   */
  private safeFocus(element: HTMLElement | undefined) {
    requestAnimationFrame(() => {
      if (this.isConnected && element) {
        element.focus();
      }
    });
  }

  private get isMessageType(): boolean {
    return this.type === TextareaFieldType.Message;
  }

  private get hasContent(): boolean {
    return this.value.trim().length > 0;
  }

  private get canSend(): boolean {
    return this.hasContent || (this.attachments?.length ?? 0) > 0;
  }

  private get showTitle(): boolean {
    return !this.hideLabel && this.label.length > 0;
  }

  private get isPausedOrPlayback(): boolean {
    return (
      this.recordingStatus === AudioRecordingStatus.Paused ||
      this.recordingStatus === AudioRecordingStatus.Playback
    );
  }

  private get shouldShowToolbar(): boolean {
    return !this.hideToolbar || this.isMessageType || this.recording;
  }

  private get isEmpty(): boolean {
    return (
      !this.hasContent &&
      (this.attachments?.length ?? 0) === 0 &&
      !this.recording
    );
  }

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

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Send on Enter + Ctrl/Cmd
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.canSend && this.isMessageType) {
        this.handleSendClick();
      }
    }
  }

  private handleFocus() {
    this._focused = true;
  }

  private handleBlur() {
    this._focused = false;
    // Only emit value-changed if the value actually changed since last emit
    if (this.value !== this._lastEmittedValue) {
      this._lastEmittedValue = this.value;
      this.emitIfEnabled('value-changed', {value: this.value});
    }
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

  private emitVoiceAction(action: VoiceAction, playing?: boolean) {
    const detail: VoiceActionDetail = {action};
    if (playing !== undefined) {
      detail.playing = playing;
    }
    this.emitIfEnabled('voice-action', detail);
  }

  private handleVoiceRecordingStart() {
    this.emitVoiceAction(VoiceAction.Start);
  }

  private handleVoiceRecordingCancel() {
    this.emitVoiceAction(VoiceAction.Cancel);
  }

  private handleVoiceRecordingConfirm() {
    this.emitVoiceAction(VoiceAction.Confirm);
  }

  private handleVoiceRecordingDelete() {
    this.emitVoiceAction(VoiceAction.Delete);
  }

  private handleVoiceRecordingPause() {
    this.emitVoiceAction(VoiceAction.Pause);
  }

  private handleVoiceRecordingResume() {
    this.emitVoiceAction(VoiceAction.Resume);
  }

  private handleVoiceTranscribe() {
    this.emitVoiceAction(VoiceAction.Transcribe);
  }

  private handleVoiceSend() {
    this.emitVoiceAction(VoiceAction.Send);
  }

  private handleVoicePlaybackToggle(e: CustomEvent) {
    // The audio-recording-item emits the desired isPlaying state when toggled.
    // Update internal state and notify parent.
    const playing = e.detail.isPlaying as boolean;
    this._isPlayingRecording = playing;
    this.emitVoiceAction(VoiceAction.PlaybackToggle, playing);
  }

  private handleAttachmentRemove(attachment: Attachment) {
    this.emitIfEnabled('attachment-remove', {id: attachment.id});
  }

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

    return html`
      <obc-audio-recording-item
        .audioLevels=${this.audioLevels}
        .duration=${this.recordingDuration}
        .status=${this.recordingStatus}
        .playbackPosition=${this.playbackPosition}
        .isPlaying=${this._isPlayingRecording}
        @status-toggle=${this.handleVoicePlaybackToggle}
      ></obc-audio-recording-item>
    `;
  }

  private renderToolbar() {
    if (!this.shouldShowToolbar) return nothing;

    return html`
      <div class="tool-bar-container">
        ${this.recording
          ? this.renderRecordingToolbar()
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
                variant=${this.canSend && !this.disabled ? 'raised' : 'normal'}
                @click=${this.handleSendClick}
                ?disabled=${this.disabled || !this.canSend}
                aria-label="Send message"
              >
                <obi-arrow-up-google></obi-arrow-up-google>
              </obc-icon-button>
            `
          : nothing}
      </div>
    `;
  }

  private renderRecordingToolbar() {
    if (this.isMessageType) {
      return this.renderMessageRecordingToolbar();
    }
    return this.renderRichRecordingToolbar();
  }

  private renderPauseResumeButton() {
    return html`
      <obc-icon-button
        variant="normal"
        @click=${this.isPausedOrPlayback
          ? this.handleVoiceRecordingResume
          : this.handleVoiceRecordingPause}
        ?disabled=${this.disabled}
        aria-label=${this.isPausedOrPlayback
          ? 'Resume recording'
          : 'Pause recording'}
      >
        ${this.isPausedOrPlayback
          ? html`<obi-com-microphone></obi-com-microphone>`
          : html`<obi-media-pause></obi-media-pause>`}
      </obc-icon-button>
    `;
  }

  private renderRichRecordingToolbar() {
    return html`
      <div class="tool-container">
        <obc-icon-button
          variant="normal"
          @click=${this.handleVoiceRecordingCancel}
          ?disabled=${this.disabled}
          aria-label="Cancel recording"
        >
          <obi-close-google></obi-close-google>
        </obc-icon-button>
      </div>
      <div class="action-container recording-controls">
        ${this.renderPauseResumeButton()}
        <obc-icon-button
          variant="normal"
          @click=${this.handleVoiceRecordingConfirm}
          ?disabled=${this.disabled}
          aria-label="Confirm recording"
        >
          <obi-check-google></obi-check-google>
        </obc-icon-button>
      </div>
    `;
  }

  private renderMessageRecordingToolbar() {
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
          ${msg('Transcribe')}
        </obc-button>
        ${this.renderPauseResumeButton()}
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
