import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './poi-controller.css?inline';
import '../poi-layer-stack/poi-layer-stack.js';
import '../poi-layer/poi-layer.js';
import '../poi-target/poi-target.js';
import {ObcPoiTargetButtonType} from '../poi-target-button/poi-target-button.js';
import {PoiLayerSelectionMode} from '../poi-layer-stack/poi-layer-stack.js';

@customElement('obc-poi-controller')
export class ObcPoiController extends LitElement {
  @property({type: String}) fit: PoiFitMode = PoiFitMode.Contain;
  @property({type: Array}) frames: PoiFrame[] | null = null;
  @property({type: Array}) detections: PoiDetection[] | null = null;
  @property({type: Number}) frameIndex: number | null = null;
  @property({type: Number}) confidenceMin: number | null = null;
  @property({type: String}) boxOrigin: PoiBoxOrigin = PoiBoxOrigin.TopLeft;
  @property({type: String}) poiAnchor: PoiAnchor = PoiAnchor.BottomCenter;

  @state() private mediaWidth = 0;
  @state() private mediaHeight = 0;
  @state() private renderWidth = 0;
  @state() private renderHeight = 0;

  @queryAssignedElements({slot: 'media', flatten: true})
  private mediaElements!: HTMLElement[];

  private resizeObserver?: ResizeObserver;
  private handleMediaSlotChange = () => this.setupMediaObservers();

  override firstUpdated() {
    this.setupMediaObservers();
    const slot = this.shadowRoot?.querySelector('slot[name="media"]');
    slot?.addEventListener('slotchange', this.handleMediaSlotChange);
  }

  override updated(changed: PropertyValues) {
    if (changed.has('frames') || changed.has('detections')) {
      this.requestUpdate();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    const slot = this.shadowRoot?.querySelector('slot[name="media"]');
    slot?.removeEventListener('slotchange', this.handleMediaSlotChange);
  }

  private setupMediaObservers() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;

    const media = this.getMediaElement();
    if (!media) return;

    this.updateMediaMetrics(media);

    if (media instanceof HTMLVideoElement) {
      media.addEventListener('loadedmetadata', () => {
        this.updateMediaMetrics(media);
      });
      media.addEventListener('timeupdate', () => {
        this.requestUpdate();
      });
      media.addEventListener('seeked', () => {
        this.requestUpdate();
      });
    } else if (media instanceof HTMLImageElement) {
      if (!media.complete) {
        media.addEventListener('load', () => this.updateMediaMetrics(media));
      }
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateMediaMetrics(media);
    });
    this.resizeObserver.observe(media);
  }

  private getMediaElement(): HTMLVideoElement | HTMLImageElement | null {
    const el = this.mediaElements?.[0];
    if (el instanceof HTMLVideoElement || el instanceof HTMLImageElement) {
      return el;
    }
    return null;
  }

  private updateMediaMetrics(media: HTMLVideoElement | HTMLImageElement) {
    const rect = media.getBoundingClientRect();
    this.renderWidth = rect.width;
    this.renderHeight = rect.height;

    if (media instanceof HTMLVideoElement) {
      this.mediaWidth = media.videoWidth || this.mediaWidth;
      this.mediaHeight = media.videoHeight || this.mediaHeight;
    } else {
      this.mediaWidth = media.naturalWidth || this.mediaWidth;
      this.mediaHeight = media.naturalHeight || this.mediaHeight;
    }
  }

  private getActiveDetections(): PoiDetection[] {
    if (Array.isArray(this.detections)) {
      return this.filterDetections(this.detections);
    }
    if (!Array.isArray(this.frames) || this.frames.length === 0) return [];

    const frame = this.pickFrame();
    if (!frame) return [];
    return this.filterDetections(frame.detections ?? []);
  }

  private filterDetections(detections: PoiDetection[]) {
    if (this.confidenceMin === null || this.confidenceMin === undefined) {
      return detections;
    }
    return detections.filter(
      (det) =>
        det.confidence === undefined || det.confidence >= this.confidenceMin!
    );
  }

  private pickFrame(): PoiFrame | null {
    const frames = this.frames ?? [];
    if (frames.length === 0) return null;
    const media = this.getMediaElement();

    if (this.frameIndex !== null && this.frameIndex !== undefined) {
      return frames[this.frameIndex] ?? frames[frames.length - 1] ?? null;
    }

    if (media instanceof HTMLVideoElement) {
      const time = media.currentTime;
      let best = frames[0] ?? null;
      let bestDelta = Number.POSITIVE_INFINITY;
      for (const frame of frames) {
        if (typeof frame.timestamp !== 'number') continue;
        const delta = Math.abs(frame.timestamp - time);
        if (delta < bestDelta) {
          best = frame;
          bestDelta = delta;
        }
      }
      return best;
    }

    return frames[0] ?? null;
  }

  private mapDetection(det: PoiDetection): {x: number; y: number} | null {
    if (
      !Number.isFinite(this.mediaWidth) ||
      !Number.isFinite(this.mediaHeight) ||
      !Number.isFinite(this.renderWidth) ||
      !Number.isFinite(this.renderHeight) ||
      this.mediaWidth === 0 ||
      this.mediaHeight === 0 ||
      this.renderWidth === 0 ||
      this.renderHeight === 0
    ) {
      return null;
    }

    const scale =
      this.fit === 'cover'
        ? Math.max(
            this.renderWidth / this.mediaWidth,
            this.renderHeight / this.mediaHeight
          )
        : Math.min(
            this.renderWidth / this.mediaWidth,
            this.renderHeight / this.mediaHeight
          );

    const contentWidth = this.mediaWidth * scale;
    const contentHeight = this.mediaHeight * scale;
    const offsetX = (this.renderWidth - contentWidth) / 2;
    const offsetY = (this.renderHeight - contentHeight) / 2;

    const baseX = det.x;
    const baseY = det.y;
    const anchorX = baseX + det.width / 2;
    const anchorY =
      this.poiAnchor === 'center' ? baseY + det.height / 2 : baseY + det.height;

    return {
      x: offsetX + anchorX * scale,
      y: offsetY + anchorY * scale,
    };
  }

  override render() {
    return html`
      <div class="wrapper">
        <div class="media">
          <slot name="media"></slot>
        </div>
        <div class="overlay">
          <obc-poi-layer-stack selection-mode=${PoiLayerSelectionMode.Multi}>
            <obc-poi-layer label="Background" .layerIndex=${2}>
              ${this.getActiveDetections().map((det, index) => {
                const mapped = this.mapDetection(det);
                if (!mapped) return null;
                return html`
                  <obc-poi-target
                    .x=${mapped.x}
                    .y=${mapped.y}
                    .type=${ObcPoiTargetButtonType.Button}
                    data-detection-index=${index}
                  ></obc-poi-target>
                `;
              })}
            </obc-poi-layer>
            <obc-poi-layer label="Active" .layerIndex=${1}></obc-poi-layer>
            <obc-poi-layer label="Selected" .layerIndex=${0}></obc-poi-layer>
          </obc-poi-layer-stack>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-controller': ObcPoiController;
  }
}

export type PoiDetection = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence?: number;
  class?: string;
  class_id?: number;
};

export type PoiFrame = {
  frame?: number;
  timestamp?: number;
  detections: PoiDetection[];
};

export enum PoiFitMode {
  Contain = 'contain',
  Cover = 'cover',
}

export enum PoiBoxOrigin {
  TopLeft = 'top-left',
}

export enum PoiAnchor {
  BottomCenter = 'bottom-center',
  Center = 'center',
}
