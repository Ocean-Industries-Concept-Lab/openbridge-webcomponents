import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './audio-recording-item.css?inline';
import {property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import '../slider/slider.js';
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
  Playback = 'playback',
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
 *   - `playback`: Playback mode with progress slider for seeking through recorded audio.
 * - **Duration display:**
 *   - Shows elapsed time in MM:SS format (e.g., "01:23").
 * - **Play/pause control:**
 *   - Optional action button to toggle between recording and paused states.
 *   - Button icon changes based on current status (pause icon when recording, play icon when paused/playback).
 * - **Playback slider:**
 *   - In playback mode, displays a draggable progress slider to seek through audio.
 * - **Enhanced style:**
 *   - Optional `enhanced` mode applies neutral enhanced color to waveform bars.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-audio-recording-item>` as part of a voice message input flow (e.g., inside `<obc-textarea-field>`). The parent component is responsible for:
 * - Capturing actual audio and passing `audioLevels` array (values 0–1).
 * - Updating `duration` as recording progresses.
 * - Handling the `status-toggle` event to pause/resume recording.
 * - Handling the `seek` event when playback position changes.
 *
 * This component provides UI feedback only—it does NOT handle audio capture or playback.
 *
 * **Keywords:** waveform, audio visualization, voice recording, microphone input, audio levels, recording indicator
 *
 * ## Events
 *
 * - `status-toggle` – Fired when the play/pause button is clicked, with the new status in the event detail.
 * - `seek` – Fired when playback position changes via slider, with the new position (0-1) in the event detail.
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
 * @fires seek {CustomEvent<{position: number}>} Fired when playback position changes, containing the new position (0-1).
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
   * Recording status - 'recording', 'paused', or 'playback'.
   */
  @property({type: String}) status: AudioRecordingStatus =
    AudioRecordingStatus.Recording;

  /**
   * Whether to show the play/pause action button.
   */
  @property({type: Boolean}) hasActionButton = true;

  /**
   * Current playback position (0-1) for playback mode slider.
   */
  @property({type: Number}) playbackPosition = 0;

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

  private handleSliderValue(e: CustomEvent<number>) {
    const position = e.detail / 100; // obc-slider uses 0-100, we use 0-1
    this.dispatchEvent(
      new CustomEvent('seek', {
        detail: {position},
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
      const height = MIN_BAR_HEIGHT + level * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);
      bars.push(
        html`<div class="waveform-bar" style="height: ${height}px"></div>`
      );
    }

    return html`<div class="waveform-container">${bars}</div>`;
  }

  private renderPlaybackSlider() {
    return html`
      <obc-slider
        class="playback-slider"
        .value=${this.playbackPosition * 100}
        .min=${0}
        .max=${100}
        .step=${0.1}
        @value=${this.handleSliderValue}
        hugcontainer
      ></obc-slider>
    `;
  }

  override render() {
    const isRecording = this.status === AudioRecordingStatus.Recording;
    const isPaused = this.status === AudioRecordingStatus.Paused;
    const isPlayback = this.status === AudioRecordingStatus.Playback;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          recording: isRecording,
          paused: isPaused,
          playback: isPlayback,
          enhanced: this.enhanced,
        })}
      >
        <div class="recording-container">
          ${this.hasActionButton
            ? html`
                <obc-icon-button
                  class="status-toggle-button"
                  variant="normal"
                  cornerLeft
                  @click=${this.handleStatusToggle}
                  aria-label=${isRecording ? 'Pause' : 'Play'}
                >
                  ${isRecording
                    ? html`<obi-media-pause></obi-media-pause>`
                    : html`<obi-media-play></obi-media-play>`}
                </obc-icon-button>
              `
            : nothing}
          ${isPlayback
            ? this.renderPlaybackSlider()
            : html`<div class="audio-recording-container">
                ${this.renderWaveform()}
              </div>`}
          <div class="duration-container">
            <span class="duration-label"
              >${this.formatDuration(this.duration)}</span
            >
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
