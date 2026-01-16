import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './textarea-field.css?inline';
import {property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../icon-button/icon-button.js';
import '../input-chip/input-chip.js';
import '../audio-recording-item/audio-recording-item.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-screen-shot.js';
import '../../icons/icon-image.js';
import '../../icons/icon-attachment.js';
import '../../icons/icon-com-microphone.js';
import '../../icons/icon-arrow-up-google.js';
import '../../icons/icon-check-google.js';
import type {AudioRecordingStatus} from '../audio-recording-item/audio-recording-item.js';

/**
 * Textarea field type determines messaging-specific features.
 */
export enum TextareaFieldType {
  /** Rich text field without send button */
  Rich = 'rich',
  /** Message field with send button and voice recording */
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
 * `<obc-textarea-field>` - A multi-line text input component with optional toolbar, voice recording, and attachments.
 *
 * Combines the functionality of rich text input and message input into a single unified component.
 * Use the `type` property to switch between rich text mode (no send button) and message mode (with send button).
 *
 * ### Features
 * - **Multi-line Input:** Flexible textarea for composing extended text content
 * - **Two Modes:** Rich (no send) or Message (with send button and voice recording)
 * - **Toolbar:** Quick access to add content (screenshot, image, attachment)
 * - **Voice Recording:** Microphone button for voice messages (UI only - parent handles audio)
 * - **Attachments:** Display file attachments as removable chips
 * - **Leading Icon:** Optional contextual icon before the input
 * - **Title & Required:** Optional title with required indicator
 * - **Error State:** Visual feedback for validation errors
 * - **Disabled State:** Prevents all interaction
 *
 * ### Voice Recording Flow
 * The component provides UI for voice recording but does NOT handle actual audio capture.
 * The parent application is responsible for:
 * 1. Listening to `voice-recording-start` event and starting MediaRecorder
 * 2. Setting `recording=true` and updating `recordingDuration` as recording progresses
 * 3. Updating `audioLevels` prop for waveform visualization
 * 4. On `voice-recording-cancel`: set `recording=false` (existing text is preserved)
 * 5. On `voice-recording-confirm`: transcribe audio, append to `value`, then set `recording=false`
 *
 * ### Slots
 * | Slot Name      | Renders When...        | Purpose                                      |
 * | -------------- | --------------------- | --------------------------------------------- |
 * | leading-icon   | hasLeadingIcon=true   | Displays a contextual icon before the input.  |
 *
 * @slot leading-icon - Displays a contextual icon before the input when `hasLeadingIcon` is true.
 *
 * @fires value-changed {CustomEvent<{value: string}>} Fired when the text value changes.
 * @fires send-click {CustomEvent<{value: string}>} Fired when the send button is clicked (message type only).
 * @fires add-click {CustomEvent<void>} Fired when the add (+) button is clicked.
 * @fires screenshot-click {CustomEvent<void>} Fired when the screenshot button is clicked.
 * @fires image-click {CustomEvent<void>} Fired when the image button is clicked.
 * @fires attachment-click {CustomEvent<void>} Fired when the attachment button is clicked.
 * @fires voice-recording-start {CustomEvent<void>} Fired when the microphone button is clicked.
 * @fires voice-recording-confirm {CustomEvent<void>} Fired when confirm is clicked after recording.
 * @fires recording-status-toggle {CustomEvent<{status: AudioRecordingStatus}>} Fired when play/pause is toggled on recording.
 * @fires recording-delete {CustomEvent<void>} Fired when delete is clicked on recording.
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
   * Title text displayed above the input field.
   */
  @property({type: String}) override title = '';

  /**
   * Error text displayed below the field when `error` is true.
   */
  @property({type: String}) errorText = '';

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
   * Shows a required indicator next to the title.
   */
  @property({type: Boolean}) required = false;

  /**
   * Hides the title above the input field.
   */
  @property({type: Boolean}) hideTitle = false;

  /**
   * Hides the toolbar with action buttons.
   */
  @property({type: Boolean}) hideToolbar = false;

  /**
   * Hides the voice recording button (message type only).
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
  @property({type: String}) recordingStatus: AudioRecordingStatus = 'recording';

  // ============== Attachments ==============

  /**
   * Array of file attachments displayed as removable chips.
   */
  @property({type: Array}) attachments: Attachment[] = [];

  // ============== Internal State ==============

  @state() private _focused = false;

  @query('.input-field')
  private inputField?: HTMLTextAreaElement;

  // ============== Computed Properties ==============

  private get isMessageType(): boolean {
    return this.type === TextareaFieldType.Message;
  }

  private get hasContent(): boolean {
    return this.value.trim().length > 0;
  }

  private get showTitle(): boolean {
    return !this.hideTitle && this.title.length > 0;
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
    this.emitIfEnabled('value-changed', {value: this.value});
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

  private handleVoiceRecordingConfirm() {
    this.emit('voice-recording-confirm');
  }

  private handleRecordingStatusToggle(e: CustomEvent) {
    this.emit('recording-status-toggle', {status: e.detail.status});
  }

  private handleRecordingDelete() {
    this.emit('recording-delete');
  }

  private handleAttachmentRemove(attachment: Attachment) {
    this.emit('attachment-remove', {id: attachment.id});
  }

  // ============== Render Methods ==============

  private renderTitle() {
    if (!this.showTitle) return nothing;

    return html`
      <div class="title-text-container">
        <p id="title-text" class="title-text">${this.title}</p>
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
        aria-label=${ifDefined(this.showTitle ? undefined : this.placeholder || 'Text input')}
        aria-labelledby=${ifDefined(this.showTitle ? 'title-text' : undefined)}
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-describedby=${ifDefined(
          this.error && this.errorText ? 'error-text' : undefined
        )}
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
        hasActionButton
        hasDelete
        @status-toggle=${this.handleRecordingStatusToggle}
        @delete-click=${this.handleRecordingDelete}
      ></obc-audio-recording-item>
    `;
  }

  private renderToolbar() {
    if (this.hideToolbar && !this.isMessageType) return nothing;

    const showRecordingControls = this.recording;

    return html`
      <div class="tool-bar-container">
        ${!this.hideToolbar
          ? html`
              <div class="tool-container">
                <div class="divider"></div>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleAddClick}
                  ?disabled=${this.disabled}
                >
                  <obi-up-iec></obi-up-iec>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleScreenshotClick}
                  ?disabled=${this.disabled}
                >
                  <obi-screen-shot></obi-screen-shot>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleImageClick}
                  ?disabled=${this.disabled}
                >
                  <obi-image></obi-image>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleAttachmentClick}
                  ?disabled=${this.disabled}
                >
                  <obi-attachment></obi-attachment>
                </obc-icon-button>
              </div>
            `
          : nothing}

        <div class="action-container">
          ${showRecordingControls
            ? html`
                <obc-icon-button
                  variant="normal"
                  @click=${this.handleVoiceRecordingConfirm}
                  ?disabled=${this.disabled}
                >
                  <obi-check-google></obi-check-google>
                </obc-icon-button>
              `
            : html`
                ${this.isMessageType && !this.hideVoiceRecording
                  ? html`
                      <obc-icon-button
                        variant="normal"
                        @click=${this.handleVoiceRecordingStart}
                        ?disabled=${this.disabled}
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
                      >
                        <obi-arrow-up-google></obi-arrow-up-google>
                      </obc-icon-button>
                    `
                  : nothing}
              `}
        </div>
      </div>
    `;
  }

  private renderErrorText() {
    if (!this.error || !this.errorText) return nothing;

    return html`
      <div class="error-text-container">
        <p id="error-text" class="error-text">${this.errorText}</p>
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
          'has-leading-icon': this.hasLeadingIcon,
          'voice-recording-active': this.recording,
          'type-rich': this.type === TextareaFieldType.Rich,
          'type-message': this.type === TextareaFieldType.Message,
        })}
      >
        ${this.renderTitle()}
        <div class="content-container">
          ${this.renderLeadingIcon()}
          ${this.renderTextarea()}
          ${this.renderAttachments()}
          ${this.renderAudioRecordingItem()}
          ${this.renderToolbar()}
        </div>
        ${this.renderErrorText()}
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
