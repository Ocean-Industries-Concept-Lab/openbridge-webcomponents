import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './message-input-field.css?inline';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-placeholder.js';
import '../icon-button/icon-button.js';
import '../divider/divider.js';
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
 * 3. Optionally updating `audioLevel` prop for waveform visualization
 * 4. Handling `voice-recording-stop`, `voice-recording-cancel`, `voice-recording-confirm` events
 * 5. Setting `isRecording` and `hasRecordedAudio` props to control UI state
 *
 * ### Slots
 * | Slot Name      | Renders When...        | Purpose                                      |
 * | -------------- | --------------------- | --------------------------------------------- |
 * | leading-icon   | hasLeadingIcon=true   | Displays a contextual icon before the input.  |
 * | waveform       | isRecording/hasAudio  | Custom waveform visualization component.      |
 *
 * ### Events
 * - `send-click` – Fired when the send button is clicked.
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
 * @slot waveform - Custom waveform visualization when recording or playing audio.
 *
 * @fires send-click {CustomEvent<{value: string, hasAudio: boolean}>} Fired when the send button is clicked.
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
  @property({type: String}) placeholder = 'Placeholder';

  /**
   * Shows a leading icon before the input field when true.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * Displays the toolbar with action buttons when true.
   */
  @property({type: Boolean}) hasToolbar = true;

  /**
   * Shows the voice recording button when true.
   */
  @property({type: Boolean}) hasVoiceRecording = true;

  /**
   * Shows the send button when true.
   */
  @property({type: Boolean}) hasSendButton = true;

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

  @state() private isFocused = false;

  private handleSendClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('send-click', {
        detail: {
          value: this.value,
          hasAudio: this.hasRecordedAudio,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleScreenshotClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('screenshot-click', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleImageClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('image-click', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAttachmentClick() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('attachment-click', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleFocus() {
    this.isFocused = true;
  }

  private handleBlur() {
    this.isFocused = false;
  }

  private handleVoiceRecordingStart() {
    if (this.isDisabled) return;

    this.dispatchEvent(
      new CustomEvent('voice-recording-start', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleVoiceRecordingCancel() {
    this.dispatchEvent(
      new CustomEvent('voice-recording-cancel', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('voice-recording-stop', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleVoiceRecordingConfirm() {
    this.dispatchEvent(
      new CustomEvent('voice-recording-confirm', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('voice-recording-stop', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handlePlaybackToggle() {
    this.dispatchEvent(
      new CustomEvent('voice-playback-toggle', {
        detail: {playing: !this.isPlaying},
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderVoiceRecordingDisplay() {
    return html`
      <obc-transcription-item
        .audioLevels=${this.audioLevels}
        .duration=${this.recordingDuration}
        .isPlaying=${this.isPlaying}
        ?hasActionButton=${!this.isRecording}
        @playback-toggle=${this.handlePlaybackToggle}
      ></obc-transcription-item>
    `;
  }

  private renderToolbar() {
    const hasContent = this.value.trim().length > 0 || this.hasRecordedAudio;
    const showRecordingControls = this.isRecording || this.hasRecordedAudio;

    return html`
      <div class="tool-bar-container">
        ${this.hasToolbar
          ? html`
              <div class="tool-container">
                <div class="divider"></div>
                <obc-icon-button
                  class="up-icon-button"
                  variant="flat"
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent('add-click', {
                        bubbles: true,
                        composed: true,
                      })
                    )}
                  ?disabled=${this.isDisabled}
                >
                  <obi-up-iec></obi-up-iec>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleScreenshotClick}
                  ?disabled=${this.isDisabled}
                >
                  <obi-screen-shot></obi-screen-shot>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleImageClick}
                  ?disabled=${this.isDisabled}
                >
                  <obi-image></obi-image>
                </obc-icon-button>
                <obc-icon-button
                  variant="flat"
                  @click=${this.handleAttachmentClick}
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
                ${this.hasVoiceRecording
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
                ${this.hasSendButton
                  ? html`
                      <obc-icon-button
                        class="send-button"
                        variant=${hasContent && !this.isDisabled ? 'raised' : 'normal'}
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
          focused: this.isFocused,
          'has-leading-icon': this.hasLeadingIcon,
          'voice-recording-active': this.isRecording,
          'has-transcription': Boolean(this.transcription),
        })}
      >
        ${this.hasTitle
          ? html`<div class="title-text-container">
              <p class="title-text">${this.title}</p>
              ${this.isRequired
                ? html`<div class="required-indicator"></div>`
                : nothing}
            </div>`
          : nothing}
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html`<div class="leading-icon">
                <slot name="leading-icon">
                  <obi-placeholder></obi-placeholder>
                </slot>
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
                  @focus=${this.handleFocus}
                  @blur=${this.handleBlur}
                  ?disabled=${this.isDisabled}
                ></textarea>
              `
            : nothing}
          ${this.renderToolbar()}
        </div>
        ${this.hasError && this.errorText
          ? html`<div class="error-text-container">
              <p class="error-text">${this.errorText}</p>
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
