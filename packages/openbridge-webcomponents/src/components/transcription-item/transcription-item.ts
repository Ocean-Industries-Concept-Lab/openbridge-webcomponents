import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './transcription-item.css?inline';
import {property, state, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-media-play.js';
import '../../icons/icon-media-pause.js';

/**
 * Width of each waveform bar in pixels.
 */
const BAR_WIDTH = 4;

/**
 * Gap between waveform bars in pixels.
 */
const BAR_GAP = 4;

/**
 * Minimum bar height in pixels.
 */
const MIN_BAR_HEIGHT = 4;

/**
 * Maximum bar height in pixels.
 */
const MAX_BAR_HEIGHT = 22;

/**
 * `<obc-transcription-item>` – An audio waveform visualization component for voice recordings.
 *
 * Displays a visual representation of audio levels as vertical bars, along with a duration timer
 * and play/pause control. Designed for showing voice recordings in messaging interfaces,
 * transcription workflows, or audio playback contexts.
 *
 * ### Features
 * - **Waveform Visualization:** Displays audio levels as animated vertical bars.
 * - **Play/Pause Control:** Integrated button to toggle audio playback.
 * - **Duration Display:** Shows duration in MM:SS format.
 * - **Dynamic Audio Levels:** Accepts an array of audio level values (0-1) to animate bars.
 *
 * ### Usage
 * The component provides UI only - actual audio playback is handled by the parent.
 * Parent application is responsible for:
 * 1. Providing `audioLevels` array with values 0-1 (updated during playback)
 * 2. Updating `duration` as playback progresses
 * 3. Handling `playback-toggle` event to start/stop audio playback
 * 4. Setting `isPlaying` prop to reflect current playback state
 *
 * ### Events
 * - `playback-toggle` – Fired when the play/pause button is clicked.
 *
 * @fires playback-toggle {CustomEvent<{playing: boolean}>} Fired when play/pause is toggled.
 *
 * @example
 * ```html
 * <obc-transcription-item
 *   .audioLevels=${[0.3, 0.6, 0.3, 0.7, 0.9, 0.4, 0.2, 0.5]}
 *   duration=${12}
 *   isPlaying
 * ></obc-transcription-item>
 * ```
 */
@customElement('obc-transcription-item')
export class ObcTranscriptionItem extends LitElement {
  /**
   * Array of audio level values (0-1) for waveform visualization.
   * Each value represents the height of a bar in the waveform.
   * When fewer values are provided than the calculated bar count, remaining bars show as dots.
   */
  @property({type: Array}) audioLevels: number[] = [];

  /**
   * Current duration in seconds.
   * Displayed as MM:SS format.
   */
  @property({type: Number}) duration = 0;

  /**
   * Whether the audio is currently playing.
   * When true, shows pause icon; when false, shows play icon.
   */
  @property({type: Boolean}) isPlaying = false;

  /**
   * Whether to show the action button (play/pause).
   */
  @property({type: Boolean}) hasActionButton = true;

  /**
   * Enhanced style without container background and border.
   * Shows just the waveform and duration in a minimal style.
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
        // Calculate how many bars fit: n bars need (n * BAR_WIDTH) + ((n-1) * BAR_GAP)
        // Solving for n: n = (width + BAR_GAP) / (BAR_WIDTH + BAR_GAP)
        const newBarCount = Math.max(
          1,
          Math.floor((width + BAR_GAP) / (BAR_WIDTH + BAR_GAP))
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

  private handlePlaybackToggle() {
    this.dispatchEvent(
      new CustomEvent('playback-toggle', {
        detail: {playing: !this.isPlaying},
        bubbles: true,
        composed: true,
      })
    );
  }

  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private renderWaveform() {
    const bars = [];
    const levelCount = this.audioLevels.length;

    for (let i = 0; i < this.barCount; i++) {
      if (i < levelCount) {
        // Active bar with audio level
        const level = Math.max(0, Math.min(1, this.audioLevels[i]));
        const height = MIN_BAR_HEIGHT + level * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);
        bars.push(
          html`<div
            class="waveform-bar active"
            style="height: ${height}px"
          ></div>`
        );
      } else {
        // Inactive dot
        bars.push(html`<div class="waveform-dot"></div>`);
      }
    }

    return html`<div class="waveform-container">${bars}</div>`;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          enhanced: this.enhanced,
        })}
      >
        <div class="transcription-container">
          ${this.hasActionButton
            ? html`
                <div class="action-button-container">
                  <obc-icon-button
                    variant="normal"
                    cornerLeft
                    @click=${this.handlePlaybackToggle}
                    aria-label=${this.isPlaying ? 'Pause' : 'Play'}
                  >
                    ${this.isPlaying
                      ? html`<obi-media-pause></obi-media-pause>`
                      : html`<obi-media-play></obi-media-play>`}
                  </obc-icon-button>
                </div>
              `
            : null}
          <div class="audio-recording-container">
            ${this.renderWaveform()}
          </div>
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
    'obc-transcription-item': ObcTranscriptionItem;
  }
}
