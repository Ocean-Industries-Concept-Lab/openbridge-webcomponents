import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './message-input-field.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../icon-button/icon-button.js';
import '../transcription-item/transcription-item.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-screen-shot.js';
import '../../icons/icon-image.js';
import '../../icons/icon-attachment.js';
import '../../icons/icon-com-microphone.js';
import '../../icons/icon-arrow-up-google.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-check-google.js';

/**
 * `<obc-message-input-field>` – A multi-line message input component with send button and optional voice recording.
 *
 * Extends the rich text input field pattern with messaging-specific features including a send button,
 * voice recording capability, and support for audio message transcription. Designed for chat interfaces,
 * messaging applications, and communication workflows.
 *
 * ### Features
 * - **Multi-line Input:** Allows users to enter and edit extended text content.
 * - **Send Button:** Prominent send action button that activates when content is available.
 * - **Voice Recording (optional):** Microphone button to start voice recording with visual feedback.
 * - **Voice Recording Mode:** Shows waveform visualization, timer, and cancel/confirm controls.
 * - **Toolbar (optional):** Action buttons for adding content (screenshot, image, attachment).
 * - **Leading Icon (optional):** Supports a leading icon slot for contextual icons.
 * - **Title and Required Indicator:** Can display a title above the input.
 * - **Error State:** Highlights the input field to indicate validation errors.
 * - **Disabled State:** Prevents user interaction.
 *
 * ### Voice Recording Flow
 * The component provides UI for voice recording but does NOT handle actual audio capture.
 * The parent application is responsible for:
 * 1. Listening to `voice-recording-start` event and starting MediaRecorder
 * 2. Updating `recordingDuration` prop as recording progresses
 * 3. Optionally updating `audioLevels` prop for waveform visualization
 * 4. Handling `voice-recording-stop`, `voice-recording-cancel`, `voice-recording-confirm` events
 * 5. Setting `isRecording` and `hasRecordedAudio` props to control UI state
 *
 * ### Slots
 * | Slot Name      | Renders When...        | Purpose                                      |
 * | -------------- | --------------------- | --------------------------------------------- |
 * | leading-icon   | hasLeadingIcon=true   | Displays a contextual icon before the input.  |
 *
 * ### Events
 * - `send-click` – Fired when the send button is clicked.
 * - `add-click` – Fired when the add button (up arrow) is clicked.
 * - `screenshot-click` – Fired when the screenshot button is clicked.
 * - `image-click` – Fired when the image button is clicked.
 * - `attachment-click` – Fired when the attachment button is clicked.
 * - `value-changed` – Fired whenever the text value changes.
 * - `voice-recording-start` – Fired when the microphone button is clicked to start recording.
 * - `voice-recording-stop` – Fired when recording should stop (via cancel or confirm).
 * - `voice-recording-cancel` – Fired when the cancel button is clicked during recording.
 * - `voice-recording-confirm` – Fired when the confirm button is clicked after recording.
 * - `voice-playback-toggle` – Fired when play/pause is toggled on recorded audio.
 *
 * @slot leading-icon - Displays a contextual icon before the input when `hasLeadingIcon` is true.
 *
 * @fires send-click {CustomEvent<{value: string, hasAudio: boolean}>} Fired when the send button is clicked.
 * @fires add-click {CustomEvent<void>} Fired when the add button is clicked.
 * @fires screenshot-click {CustomEvent<{value: string}>} Fired when the screenshot button is clicked.
 * @fires image-click {CustomEvent<{value: string}>} Fired when the image button is clicked.
 * @fires attachment-click {CustomEvent<{value: string}>} Fired when the attachment button is clicked.
 * @fires value-changed {CustomEvent<{value: string}>} Fired whenever the text value changes.
 * @fires voice-recording-start {CustomEvent<void>} Fired when recording should start.
 * @fires voice-recording-stop {CustomEvent<void>} Fired when recording should stop.
 * @fires voice-recording-cancel {CustomEvent<void>} Fired when recording is cancelled.
 * @fires voice-recording-confirm {CustomEvent<void>} Fired when recording is confirmed.
 * @fires voice-playback-toggle {CustomEvent<{playing: boolean}>} Fired when play/pause is toggled.
 */
@customElement('obc-message-input-field')
export class ObcMessageInputField extends LitElement {
  /**
   * Disables the input field and all actions when true.
   */
  @property({type: Boolean}) isDisabled = false;

  /**
   * Indicates an error state for the input field.
   */
  @property({type: Boolean}) hasError = false;

  /**
   * Error text displayed below the field when hasError is true.
   */
  @property({type: String}) errorText = '';

  /**
   * Placeholder text shown when the input is empty.
   */
  @property({type: String}) placeholder = 'Type a message...';

  /**
   * Shows a leading icon before the input field when true.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Hides the toolbar with action buttons when true.
   */
  @property({type: Boolean}) hideToolbar = false;

  /**
   * Hides the voice recording button when true.
   */
  @property({type: Boolean}) hideVoiceRecording = false;

  /**
   * Hides the send button when true.
   */
  @property({type: Boolean}) hideSendButton = false;

  /**
   * Shows a title above the input field when true.
   */
  @property({type: Boolean}) hasTitle = false;

  /**
   * Title text displayed above the input field.
   */
  @property({type: String}) override title = 'Title';

  /**
   * Shows a required indicator next to the title when true.
   */
  @property({type: Boolean}) isRequired = false;

  /**
   * The current text value of the input field.
   */
  @property({type: String}) value = '';

  /**
   * Whether voice recording is currently active.
   * Set by parent app when recording starts/stops.
   */
  @property({type: Boolean}) isRecording = false;

  /**
   * Whether there is recorded audio available.
   * Set by parent app after recording is confirmed.
   */
  @property({type: Boolean}) hasRecordedAudio = false;

  /**
   * Current recording duration in seconds.
   * Updated by parent app during recording.
   */
  @property({type: Number}) recordingDuration = 0;

  /**
   * Array of audio level values (0-1) for waveform visualization.
   * Updated by parent app during recording.
   */
  @property({type: Array}) audioLevels: number[] = [];

  /**
   * Whether the recorded audio is currently playing.
   */
  @property({type: Boolean}) isPlaying = false;

  /**
   * Transcription text for the recorded audio.
   */
  @property({type: String}) transcription = '';

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
    if (!this.isDisabled) {
      this.emit(eventName, detail);
    }
  }

  private stopRecording(
    eventName: 'voice-recording-cancel' | 'voice-recording-confirm'
  ) {
    this.emit(eventName);
    this.emit('voice-recording-stop');
  }

  private hasContent(): boolean {
    return this.value.trim().length > 0 || this.hasRecordedAudio;
  }

  // ============== Event Handlers ==============

  private handleSendClick() {
    this.emitIfEnabled('send-click', {
      value: this.value,
      hasAudio: this.hasRecordedAudio,
    });
  }

  private handleToolbarClick(
    eventName: 'screenshot-click' | 'image-click' | 'attachment-click'
  ) {
    this.emitIfEnabled(eventName, {value: this.value});
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.emitIfEnabled('value-changed', {value: this.value});
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Send on Enter + Ctrl/Cmd (common messaging pattern)
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.hasContent()) {
        this.handleSendClick();
      }
    }
  }

  private handleVoiceRecordingStart() {
    this.emitIfEnabled('voice-recording-start');
  }

  private handleVoiceRecordingCancel() {
    this.stopRecording('voice-recording-cancel');
  }

  private handleVoiceRecordingConfirm() {
    this.stopRecording('voice-recording-confirm');
  }

  private handlePlaybackToggle() {
    this.emit('voice-playback-toggle', {playing: !this.isPlaying});
  }

  // ============== Render Methods ==============

  private renderVoiceRecordingDisplay() {
    return html`
      <obc-transcription-item
        .audioLevels=${this.audioLevels ?? []}
        .duration=${this.recordingDuration ?? 0}
        .isPlaying=${this.isPlaying}
        hasActionButton
        @playback-toggle=${this.handlePlaybackToggle}
      ></obc-transcription-item>
    `;
  }

  private renderToolbar() {
    const hasContent = this.hasContent();
    const showRecordingControls = this.isRecording;

    return html`
      <div class="tool-bar-container">
        ${!this.hideToolbar
          ? html`
              <div class="tool-container">
                <div class="divider"></div>
                <obc-icon-button
                  variant="flat"
                  @click=${() => this.emitIfEnabled('add-click')}
                  ?disabled=${this.isDisabled}
                >
                  <obi-up-iec></obi-up-iec>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${() => this.handleToolbarClick('screenshot-click')}
                  ?disabled=${this.isDisabled}
                >
                  <obi-screen-shot></obi-screen-shot>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${() => this.handleToolbarClick('image-click')}
                  ?disabled=${this.isDisabled}
                >
                  <obi-image></obi-image>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${() => this.handleToolbarClick('attachment-click')}
                  ?disabled=${this.isDisabled}
                >
                  <obi-attachment></obi-attachment>
                </obc-icon-button>
              </div>
            `
          : nothing}

        <div class="action-container">
          ${showRecordingControls
            ? html`
                <div class="recording-controls">
                  <obc-icon-button
                    variant="normal"
                    cornerLeft
                    @click=${this.handleVoiceRecordingCancel}
                    ?disabled=${this.isDisabled}
                  >
                    <obi-close-google></obi-close-google>
                  </obc-icon-button>
                  <obc-icon-button
                    variant="normal"
                    cornerRight
                    @click=${this.handleVoiceRecordingConfirm}
                    ?disabled=${this.isDisabled}
                  >
                    <obi-check-google></obi-check-google>
                  </obc-icon-button>
                </div>
              `
            : html`
                ${!this.hideVoiceRecording
                  ? html`
                      <obc-icon-button
                        variant="normal"
                        @click=${this.handleVoiceRecordingStart}
                        ?disabled=${this.isDisabled}
                      >
                        <obi-com-microphone></obi-com-microphone>
                      </obc-icon-button>
                    `
                  : nothing}
                ${!this.hideSendButton
                  ? html`
                      <obc-icon-button
                        class="send-button"
                        variant=${hasContent && !this.isDisabled
                          ? 'raised'
                          : 'normal'}
                        @click=${this.handleSendClick}
                        ?disabled=${this.isDisabled || !hasContent}
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

  override render() {
    const showVoiceDisplay = this.isRecording || this.hasRecordedAudio;

    return html`
      <div
        part="wrapper"
        class=${classMap({
          wrapper: true,
          disabled: this.isDisabled,
          error: this.hasError,
          'has-leading-icon': this.hasLeadingIcon,
          'voice-recording-active': this.isRecording,
        })}
      >
        ${this.hasTitle
          ? html`<div class="title-text-container">
              <p id="title-text" class="title-text">${this.title}</p>
              ${this.isRequired
                ? html`<div class="required-indicator"></div>`
                : nothing}
            </div>`
          : nothing}
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html`<div class="leading-icon">
                <slot name="leading-icon"></slot>
              </div>`
            : nothing}
          ${showVoiceDisplay ? this.renderVoiceRecordingDisplay() : nothing}
          ${this.transcription
            ? html`<div class="transcription-area">${this.transcription}</div>`
            : nothing}
          ${!this.isRecording
            ? html`
                <textarea
                  class="input-field"
                  .placeholder=${this.placeholder}
                  .value=${this.value}
                  @input=${this.handleInput}
                  @keydown=${this.handleKeyDown}
                  ?disabled=${this.isDisabled}
                  aria-label=${ifDefined(
                    this.hasTitle ? undefined : this.placeholder
                  )}
                  aria-labelledby=${ifDefined(
                    this.hasTitle ? 'title-text' : undefined
                  )}
                  aria-invalid=${this.hasError ? 'true' : 'false'}
                  aria-describedby=${ifDefined(
                    this.hasError && this.errorText ? 'error-text' : undefined
                  )}
                ></textarea>
              `
            : nothing}
          ${this.renderToolbar()}
        </div>
        ${this.hasError && this.errorText
          ? html`<div class="error-text-container">
              <p id="error-text" class="error-text">${this.errorText}</p>
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-message-input-field': ObcMessageInputField;
  }
}
