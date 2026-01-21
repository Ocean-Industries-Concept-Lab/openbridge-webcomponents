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
 *   - `recording`: Active recording state with live waveform updates (no play/pause button).
 *   - `playback`: Playback mode with progress indicator and play/pause button.
 * - **Duration display:**
 *   - Shows elapsed time in MM:SS format (e.g., "01:23").
 * - **Play/pause control:**
 *   - In playback mode, shows play/pause button controlled by `isPlaying` property.
 *   - Button icon shows pause when playing, play when paused.
 * - **Playback indicator:**
 *   - In playback mode, displays a progress indicator showing current playback position (not interactive).
 * - **Enhanced style:**
 *   - Optional `enhanced` mode applies neutral enhanced color to waveform bars.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-audio-recording-item>` as part of a voice message input flow (e.g., inside `<obc-textarea-field>`). The parent component is responsible for:
 * - Capturing actual audio and passing `audioLevels` array (values 0–1).
 * - Updating `duration` as recording progresses.
 * - Handling the `status-toggle` event to start/stop playback (toggle `isPlaying`).
 * - Updating `playbackPosition` as audio plays back.
 *
 * This component provides UI feedback only—it does NOT handle audio capture or playback.
 *
 * **Keywords:** waveform, audio visualization, voice recording, microphone input, audio levels, recording indicator
 *
 * ## Events
 *
 * - `status-toggle` – Fired when the play/pause button is clicked in playback mode, with the desired `isPlaying` state in the event detail.
 *
 * ## Example
 *
 * ```html
 * <!-- Recording mode - shows waveform, no play/pause button -->
 * <obc-audio-recording-item
 *   .audioLevels=${[0.2, 0.5, 0.8, 0.3, 0.6]}
 *   .duration=${45}
 *   status="recording"
 * ></obc-audio-recording-item>
 *
 * <!-- Playback mode - shows slider and play/pause button -->
 * <obc-audio-recording-item
 *   .duration=${45}
 *   status="playback"
 *   .playbackPosition=${0.5}
 *   .isPlaying=${true}
 *   hasActionButton
 *   @status-toggle=${(e) => console.log('Toggle playback:', e.detail.isPlaying)}
 * ></obc-audio-recording-item>
 * ```
 *
 * ---
 *
 * @fires status-toggle {CustomEvent<{isPlaying: boolean}>} Fired when the play/pause button is clicked, containing the desired isPlaying state.
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
   * Whether audio is currently playing (only relevant in playback mode).
   * When true, shows pause icon; when false, shows play icon.
   */
  @property({type: Boolean}) isPlaying = false;

  /**
   * Enhanced style that displays waveform bars with neutral enhanced color.
   */
  @property({type: Boolean}) enhanced = false;

  @state() private barCount = 40;

  private resizeObserver?: ResizeObserver;

  @query('.audio-recording-container')
  private audioRecordingContainer?: HTMLElement;

  private resizeObserverConnected = false;

  override firstUpdated() {
    this.setupResizeObserver();
  }

  override async updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    // Connect observer when switching to recording mode
    if (changedProperties.has('status')) {
      // Wait for render to complete so @query has the new element
      await this.updateComplete;
      this.connectResizeObserver();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserverConnected = false;
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
        // Calculate how many bars fit in the available width
        // For n bars: space = (n * barWidth) + ((n-1) * barGap) = n * (barWidth + barGap) - barGap
        // Solving for n: n = (width + barGap) / (barWidth + barGap)
        // But we need to be conservative to avoid overflow, so use floor of exact calculation
        const newBarCount = Math.max(
          1,
          Math.floor(width / (barWidth + barGap))
        );
        if (newBarCount !== this.barCount) {
          this.barCount = newBarCount;
        }
      }
    });
    this.connectResizeObserver();
  }

  private connectResizeObserver() {
    // Observe the audio-recording-container which has constrained width
    // (not the waveform-container which expands with its content)
    if (this.audioRecordingContainer && this.resizeObserver) {
      if (!this.resizeObserverConnected) {
        this.resizeObserver.observe(this.audioRecordingContainer);
        this.resizeObserverConnected = true;
      }
    } else if (this.resizeObserverConnected && this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserverConnected = false;
    }
  }

  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private handleStatusToggle() {
    // Toggle play/pause in playback mode
    this.dispatchEvent(
      new CustomEvent('status-toggle', {
        detail: {isPlaying: !this.isPlaying},
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderWaveform() {
    const bars = [];
    const levelCount = this.audioLevels.length;
    const barsToShow = Math.min(levelCount, this.barCount);
    const dotCount = Math.max(0, this.barCount - levelCount);

    // Dots on left, bars on right (newest rightmost)
    for (let i = 0; i < dotCount; i++) {
      bars.push(html`<div class="waveform-dot"></div>`);
    }
    // Show the most recent levels (from the end of the array)
    const startIndex = levelCount - barsToShow;
    for (let i = 0; i < barsToShow; i++) {
      const level = Math.max(0, Math.min(1, this.audioLevels[startIndex + i]));
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
        variant="no-input"
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
          ${this.hasActionButton && isPlayback
            ? html`
                <obc-icon-button
                  class="status-toggle-button"
                  variant="normal"
                  cornerLeft
                  @click=${this.handleStatusToggle}
                  aria-label=${this.isPlaying ? 'Pause' : 'Play'}
                >
                  ${this.isPlaying
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
