import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-controller.css?inline';
import '../poi-layer-stack/poi-layer-stack.js';
import '../poi-layer/poi-layer.js';
import {ObcPoiData} from '../poi-data/poi-data.js';
import {
  ObcPoiButtonType,
  resolvePoiButtonTypeFromBoxSize,
} from '../building-blocks/poi-button/poi-button.js';

/**
 * `<obc-poi-controller>` - Detection-to-overlay controller that maps points to POI markers (pins/targets) over media.
 *
 * Coordinates media metrics, detection input, and layer output to keep marker placement in sync with the current frame.
 * Use this when you need runtime mapping from detection data to rendered POI targets.
 *
 * ### Overview
 * - Keywords: POI, point-of-interest, marker, pin, target, detection, overlay, tracker.
 * - Contrast:
 *   - `obc-poi-controller` handles data ingestion, projection, filtering, and target lifecycle.
 *   - `obc-poi-layer` handles overlap/group behavior for targets already placed in a layer.
 *   - `obc-poi-data` / `obc-poi` are target-level components and do not manage detection streams.
 *
 * ### Features/Variants
 * - Detection source selection:
 *   - `detections` (array) is used directly when provided.
 *   - `frames` + `frameIndex` supports frame/timestamp-driven playback when `detections` is not provided.
 * - Projection config:
 *   - `fit` (`contain` default, `cover` optional) controls scale mode from media space to rendered space.
 *   - `boxOrigin` (`top-left` default, `center` optional): **TODO(designer)** Confirm intended mapping behavior; property is declared but not consumed in this controller logic.
 *   - `poiAnchor` (`bottom-center` default, `center` optional): **TODO(designer)** Confirm intended anchor behavior; property is declared but not consumed in this controller logic.
 * - Target shaping:
 *   - Uses mapped `box_width`/`box_height` to resolve POI button type.
 * - Filtering:
 *   - `confidenceMin` and `classFilter` remove detections before render.
 * - Stable identity:
 *   - Key resolution order is `det.id`, then `keyFn(det, index)`, then index fallback.
 *
 * ### Usage Guidelines
 * - Required inputs:
 *   - Provide a media element in slot `media`.
 *   - Provide an `obc-poi-layer-stack` in slot `stack`.
 * - Data flow:
 *   - Use `detections` for direct, current-frame updates.
 *   - Use `frames` for timeline/video synchronization.
 *   - Use `frameIndex` to force a specific frame; default `null` selects by nearest video timestamp (or first frame for non-video media).
 * - Identity:
 *   - Provide stable `id` in detections or set `keyFn` to avoid marker churn when ordering changes.
 *
 * ### Slots/Content
 * - `media` (required): Video or image source used for measurement and timing.
 * - `stack` (required): `obc-poi-layer-stack` container where controller-managed targets are appended.
 *
 * ### Events
 * - None. This component does not emit custom events.
 *
 * ### Best Practices
 * - Keep detection arrays compact to reduce DOM churn.
 * - Prefer one selected layer in the stack and use `data-controller-layer="background"` when routing output to a specific layer.
 *
 * ### Example
 * ```html
 * <obc-poi-controller fit="contain">
 *   <video slot="media" src="media.mp4"></video>
 *   <obc-poi-layer-stack slot="stack" selection-mode="multi">
 *     <obc-poi-layer label="Selected" is-selected></obc-poi-layer>
 *     <obc-poi-layer label="Background" data-controller-layer="background">
 *     </obc-poi-layer>
 *   </obc-poi-layer-stack>
 * </obc-poi-controller>
 * ```
 *
 * @slot media - Required media element (video or image).
 * @slot stack - Required layer stack.
 */

export type PoiDetection = {
  x: number;
  y: number;
  box_width?: number;
  box_height?: number;
  id?: string;
  confidence?: number;
  class?: string;
  class_id?: number;
};

export type PoiKeyFn = (det: PoiDetection, index: number) => string;

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
  Center = 'center',
}

export enum PoiAnchor {
  BottomCenter = 'bottom-center',
  Center = 'center',
}

@customElement('obc-poi-controller')
export class ObcPoiController extends LitElement {
  @property({type: String}) fit: PoiFitMode = PoiFitMode.Contain;
  @property({type: Array}) frames: PoiFrame[] | null = null;
  @property({type: Array}) detections: PoiDetection[] | null = null;
  @property({type: Number}) frameIndex: number | null = null;
  @property({type: Number}) confidenceMin: number | null = null;
  @property({type: Array}) classFilter: string[] | null = null;
  @property({attribute: false})
  keyFn: PoiKeyFn | null = null;

  @state() private mediaWidth = 0;
  @state() private mediaHeight = 0;
  @state() private renderWidth = 0;
  @state() private renderHeight = 0;

  @queryAssignedElements({slot: 'media', flatten: true})
  private mediaElements!: HTMLElement[];
  @queryAssignedElements({slot: 'stack', flatten: true})
  private stackElements!: HTMLElement[];

  private resizeObserver?: ResizeObserver;
  private handleMediaSlotChange = () => this.setupMediaObservers();
  private handleStackSlotChange = () => this.requestUpdate();
  private controllerTargets = new Map<string, ObcPoiData>();
  private currentMedia: HTMLVideoElement | HTMLImageElement | null = null;
  private mediaHandlers = {
    loadedmetadata: () => {
      if (this.currentMedia) this.updateMediaMetrics(this.currentMedia);
    },
    timeupdate: () => this.requestUpdate(),
    seeked: () => this.requestUpdate(),
    load: () => {
      if (this.currentMedia) this.updateMediaMetrics(this.currentMedia);
    },
  };

  override firstUpdated() {
    this.setupMediaObservers();
    const slot = this.shadowRoot?.querySelector('slot[name="media"]');
    slot?.addEventListener('slotchange', this.handleMediaSlotChange);
    const stackSlot = this.shadowRoot?.querySelector('slot[name="stack"]');
    stackSlot?.addEventListener('slotchange', this.handleStackSlotChange);
  }

  override updated(_changed: PropertyValues) {
    this.syncTargetsToCustomStack();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.detachMediaListeners();
    this.controllerTargets.clear();
    const slot = this.shadowRoot?.querySelector('slot[name="media"]');
    slot?.removeEventListener('slotchange', this.handleMediaSlotChange);
    const stackSlot = this.shadowRoot?.querySelector('slot[name="stack"]');
    stackSlot?.removeEventListener('slotchange', this.handleStackSlotChange);
  }

  private setupMediaObservers() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;

    const media = this.getMediaElement();
    if (!media) return;

    if (this.currentMedia && this.currentMedia !== media) {
      this.detachMediaListeners();
    }
    this.currentMedia = media;

    this.updateMediaMetrics(media);

    if (media instanceof HTMLVideoElement) {
      media.addEventListener(
        'loadedmetadata',
        this.mediaHandlers.loadedmetadata
      );
      media.addEventListener('timeupdate', this.mediaHandlers.timeupdate);
      media.addEventListener('seeked', this.mediaHandlers.seeked);
    } else if (media instanceof HTMLImageElement) {
      if (!media.complete) {
        media.addEventListener('load', this.mediaHandlers.load);
      }
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.updateMediaMetrics(media);
    });
    this.resizeObserver.observe(media);
  }

  private detachMediaListeners() {
    if (!this.currentMedia) return;
    if (this.currentMedia instanceof HTMLVideoElement) {
      this.currentMedia.removeEventListener(
        'loadedmetadata',
        this.mediaHandlers.loadedmetadata
      );
      this.currentMedia.removeEventListener(
        'timeupdate',
        this.mediaHandlers.timeupdate
      );
      this.currentMedia.removeEventListener(
        'seeked',
        this.mediaHandlers.seeked
      );
    } else if (this.currentMedia instanceof HTMLImageElement) {
      this.currentMedia.removeEventListener('load', this.mediaHandlers.load);
    }
    this.currentMedia = null;
  }

  private getMediaElement(): HTMLVideoElement | HTMLImageElement | null {
    const el = this.mediaElements?.[0];
    if (el instanceof HTMLVideoElement || el instanceof HTMLImageElement) {
      return el;
    }
    return null;
  }

  private getStackElement(): HTMLElement | null {
    const el = this.stackElements?.[0];
    if (el instanceof HTMLElement) return el;
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
    let filtered = detections;
    if (this.confidenceMin !== null && this.confidenceMin !== undefined) {
      filtered = filtered.filter(
        (det) =>
          det.confidence === undefined || det.confidence >= this.confidenceMin!
      );
    }
    if (Array.isArray(this.classFilter) && this.classFilter.length > 0) {
      filtered = filtered.filter(
        (det) =>
          det.class !== undefined && this.classFilter!.includes(det.class)
      );
    }
    return filtered;
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

  private mapDetection(
    det: PoiDetection
  ): {x: number; y: number; scale: number} | null {
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
      this.fit === PoiFitMode.Cover
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

    return {
      x: offsetX + det.x * scale,
      y: offsetY + det.y * scale,
      scale,
    };
  }

  private syncTargetsToCustomStack() {
    const stack = this.getStackElement();
    if (!stack) {
      if (this.controllerTargets.size > 0) {
        this.controllerTargets.forEach((target) => {
          target.remove();
        });
        this.controllerTargets.clear();
      }
      return;
    }

    const explicitLayer = stack.querySelector(
      'obc-poi-layer[data-controller-layer="background"]'
    ) as HTMLElement | null;
    const layers = Array.from(
      stack.querySelectorAll('obc-poi-layer')
    ) as HTMLElement[];
    const isSelectedLayer = (layer: HTMLElement): boolean =>
      (layer as HTMLElement & {isSelected?: boolean}).isSelected === true ||
      layer.hasAttribute('is-selected');
    const firstNonSelectedLayer = layers.find(
      (layer) => !isSelectedLayer(layer)
    );
    const layer =
      explicitLayer ?? firstNonSelectedLayer ?? layers[layers.length - 1];
    if (!layer) return;

    const active = this.getActiveDetections();
    const activeKeys = new Set<string>();

    active.forEach((det, index) => {
      const mapped = this.mapDetection(det);
      if (!mapped) return;
      const key =
        det.id ?? (this.keyFn ? this.keyFn(det, index) : `index:${index}`);
      activeKeys.add(key);

      let target = this.controllerTargets.get(key);
      if (!target) {
        target = document.createElement('obc-poi-data') as ObcPoiData;
        target.dataset.controller = '1';
        target.dataset.detectionIndex = String(index);
        target.buttonType = ObcPoiButtonType.Button;
        target.fixedTarget = false;
        this.controllerTargets.set(key, target);
        layer.appendChild(target);
      }

      target.dataset.detectionIndex = String(index);
      target.x = mapped.x;
      target.y = mapped.y;
      const boxWidth =
        typeof det.box_width === 'number' && Number.isFinite(det.box_width)
          ? det.box_width * mapped.scale
          : null;
      const boxHeight =
        typeof det.box_height === 'number' && Number.isFinite(det.box_height)
          ? det.box_height * mapped.scale
          : null;
      target.buttonType = resolvePoiButtonTypeFromBoxSize(boxWidth, boxHeight);
    });

    Array.from(this.controllerTargets.entries()).forEach(([key, target]) => {
      if (!activeKeys.has(key)) {
        target.remove();
        this.controllerTargets.delete(key);
      }
    });
  }

  override render() {
    return html`
      <div class="wrapper">
        <div class="media">
          <slot name="media"></slot>
        </div>
        <div class="overlay">
          <slot name="stack"></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-controller': ObcPoiController;
  }
}
