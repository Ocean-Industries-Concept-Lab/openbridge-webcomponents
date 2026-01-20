import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './audio-recording-item.css?inline';
import {property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-media-pause.js';
import '../../icons/icon-media-play.js';

/** Default bar/dot width in pixels (matches Figma --ui-components-audio-input-dot-size) */
const BAR_WIDTH = 4;

/** Default gap between bars in pixels (matches Figma --ui-components-audio-input-spacing) */
const BAR_GAP = 4;

/** Minimum bar height in pixels */
const MIN_BAR_HEIGHT = 4;

/** Maximum bar height in pixels */
const MAX_BAR_HEIGHT = 22;

/**
 * Audio recording status
 */
export enum AudioRecordingStatus {
  Recording = 'recording',
  Paused = 'paused',
}

/**
 * `<obc-audio-recording-item>` – An audio waveform visualization component for voice recording feedback.
 *
 * Displays a real-time waveform visualization of audio levels during voice recording, with an optional play/pause control and duration counter. Use this component to provide visual feedback when users are recording voice messages or audio notes.
 *
 * ## Features
 *
 * - **Waveform visualization:**
 *   - Displays audio levels as animated vertical bars that grow based on input amplitude.
 *   - Empty slots render as small dots; bars appear from right to left as new audio data arrives.
 *   - Automatically adapts bar count to container width via ResizeObserver.
 * - **Status states:**
 *   - `recording`: Active recording state with live waveform updates.
 *   - `paused`: Recording paused; waveform frozen.
 * - **Duration display:**
 *   - Shows elapsed time in MM:SS format (e.g., "01:23").
 * - **Play/pause control:**
 *   - Optional action button to toggle between recording and paused states.
 *   - Button icon changes based on current status (pause icon when recording, play icon when paused).
 * - **Enhanced style:**
 *   - Optional `enhanced` mode applies neutral enhanced color to waveform bars.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-audio-recording-item>` as part of a voice message input flow (e.g., inside `<obc-textarea-field>`). The parent component is responsible for:
 * - Capturing actual audio and passing `audioLevels` array (values 0–1).
 * - Updating `duration` as recording progresses.
 * - Handling the `status-toggle` event to pause/resume recording.
 *
 * This component provides UI feedback only—it does NOT handle audio capture or playback.
 *
 * **Keywords:** waveform, audio visualization, voice recording, microphone input, audio levels, recording indicator
 *
 * ## Events
 *
 * - `status-toggle` – Fired when the play/pause button is clicked, with the new status in the event detail.
 *
 * ## Example
 *
 * ```html
 * <obc-audio-recording-item
 *   .audioLevels=${[0.2, 0.5, 0.8, 0.3, 0.6]}
 *   .duration=${45}
 *   status="recording"
 *   hasActionButton
 *   @status-toggle=${(e) => console.log('New status:', e.detail.status)}
 * ></obc-audio-recording-item>
 * ```
 *
 * ---
 *
 * @fires status-toggle {CustomEvent<{status: AudioRecordingStatus}>} Fired when the play/pause button is clicked, containing the new status.
 */
@customElement('obc-audio-recording-item')
export class ObcAudioRecordingItem extends LitElement {
  /**
   * Array of audio level values (0-1) for waveform visualization.
   * New values should be added to the end (right side) and old values shift left.
   */
  @property({type: Array}) audioLevels: number[] = [];

  /**
   * Current duration in seconds, displayed as MM:SS.
   */
  @property({type: Number}) duration = 0;

  /**
   * Recording status - 'recording' or 'paused'.
   */
  @property({type: String}) status: AudioRecordingStatus =
    AudioRecordingStatus.Recording;

  /**
   * Whether to show the play/pause action button.
   */
  @property({type: Boolean}) hasActionButton = true;

  /**
   * Enhanced style that displays waveform bars with neutral enhanced color.
   */
  @property({type: Boolean}) enhanced = false;

  @state() private barCount = 40;

  private resizeObserver?: ResizeObserver;

  @query('.audio-recording-container')
  private audioRecordingContainer?: HTMLElement;

  override firstUpdated() {
    this.setupResizeObserver();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Read bar width and gap from CSS variables
        const styles = getComputedStyle(this);
        const barWidth =
          parseFloat(
            styles.getPropertyValue('--ui-components-audio-input-dot-size')
          ) || BAR_WIDTH;
        const barGap =
          parseFloat(
            styles.getPropertyValue('--ui-components-audio-input-spacing')
          ) || BAR_GAP;
        // Calculate how many bars fit: n bars need (n * barWidth) + ((n-1) * barGap)
        // Solving for n: n = (width + barGap) / (barWidth + barGap)
        const newBarCount = Math.max(
          1,
          Math.floor((width + barGap) / (barWidth + barGap))
        );
        if (newBarCount !== this.barCount) {
          this.barCount = newBarCount;
        }
      }
    });

    // Observe the audio recording container (stable element that contains waveform)
    if (this.audioRecordingContainer) {
      this.resizeObserver.observe(this.audioRecordingContainer);
    }
  }

  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private handleStatusToggle() {
    const newStatus: AudioRecordingStatus =
      this.status === AudioRecordingStatus.Recording
        ? AudioRecordingStatus.Paused
        : AudioRecordingStatus.Recording;
    this.dispatchEvent(
      new CustomEvent('status-toggle', {
        detail: {status: newStatus},
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderWaveform() {
    const bars = [];
    const levelCount = this.audioLevels.length;
    const dotCount = Math.max(0, this.barCount - levelCount);

    // Dots on left, bars on right (newest rightmost)
    for (let i = 0; i < dotCount; i++) {
      bars.push(html`<div class="waveform-dot"></div>`);
    }
    for (let i = 0; i < levelCount && i < this.barCount; i++) {
      const level = Math.max(0, Math.min(1, this.audioLevels[i]));
      const height =
        MIN_BAR_HEIGHT + level * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);
      bars.push(
        html`<div class="waveform-bar" style="height: ${height}px"></div>`
      );
    }

    return html`<div class="waveform-container">${bars}</div>`;
  }

  override render() {
    const isRecording = this.status === AudioRecordingStatus.Recording;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          recording: isRecording,
          paused: !isRecording,
          enhanced: this.enhanced,
        })}
      >
        <div class="recording-container">
          ${this.hasActionButton
            ? html`
                <div class="action-button-container">
                  <obc-icon-button
                    variant="normal"
                    cornerLeft
                    @click=${this.handleStatusToggle}
                    aria-label=${isRecording ? 'Pause' : 'Resume'}
                  >
                    ${isRecording
                      ? html`<obi-media-pause></obi-media-pause>`
                      : html`<obi-media-play></obi-media-play>`}
                  </obc-icon-button>
                </div>
              `
            : nothing}
          <div class="audio-recording-container">${this.renderWaveform()}</div>
          <div class="duration-container">
            <span class="duration-label">${this.formatDuration(this.duration)}</span>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-audio-recording-item': ObcAudioRecordingItem;
  }
}
