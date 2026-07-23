import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-controller.css?inline';
import '../poi-layer-stack/poi-layer-stack.js';
import {ObcPoiLayer} from '../poi-layer/poi-layer.js';
import '../poi/poi-data.js';
import '../poi/poi-vessel.js';
import '../poi/poi-aton.js';
import {PoiBase} from '../poi/poi-base.js';
import {ObcPoiState} from '../poi/poi.js';
import {
  ObcPoiButtonDataItem,
  resolvePoiButtonTypeFromBoxSize,
} from '../poi-button/poi-button.js';
import {
  MediaFit,
  computeMediaProjection,
  projectPoint,
} from '../poi-projection/poi-projection.js';

export enum PoiDetectionVariant {
  Data = 'data',
  Vessel = 'vessel',
  Aton = 'aton',
}

const DETECTION_VARIANT_TAGS: Record<PoiDetectionVariant, string> = {
  [PoiDetectionVariant.Data]: 'obc-poi-data',
  [PoiDetectionVariant.Vessel]: 'obc-poi-vessel',
  [PoiDetectionVariant.Aton]: 'obc-poi-aton',
};

export type PoiDetection = {
  x: number;
  y: number;
  box_width?: number;
  box_height?: number;
  id?: string;
  confidence?: number;
  class?: string;
  class_id?: number;
  heading?: number;
  direction?: number;
  /** POI variant rendered for this detection (default `data`). */
  variant?: PoiDetectionVariant;
  /** Custom-element tag rendered as the POI's icon child (e.g. an `obi-*` icon). */
  icon?: string;
  /** Alert state applied to the target. */
  state?: ObcPoiState;
  /** Data rows shown in the target's expanded button. */
  data?: ObcPoiButtonDataItem[];
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

/**
 * Attribute consumers set on a child `obc-poi-layer` to tell the
 * controller which layer receives its detection-driven targets.
 */
export const POI_CONTROLLER_LAYER_ATTR = 'data-controller-layer';

/** `data-controller-layer` value marking the background/target layer. */
export const POI_CONTROLLER_BACKGROUND_LAYER = 'background';

/**
 * `<obc-poi-controller>` — Maps detection data onto POI markers over a video or image.
 *
 * Takes detection coordinates in media pixel space (e.g. x,y in a 1920x1080 frame),
 * projects them to screen space using the media's rendered size and fit mode, and
 * creates/updates POI targets inside a layer stack (`obc-poi-data` by default;
 * `obc-poi-vessel`/`obc-poi-aton` via each detection's `variant`, with optional
 * per-detection `icon`, `state`, and `data`).
 *
 * ## Quick Start
 *
 * The media slot accepts a `<video>` (live stream, HLS, file) or `<img>` element.
 *
 * ```html
 * <obc-poi-controller fit="cover">
 *   <video slot="media" src="stream.mp4" autoplay muted></video>
 *   <obc-poi-layer-stack slot="stack" selection-mode="multi">
 *     <obc-poi-layer is-selected></obc-poi-layer>
 *     <obc-poi-layer data-controller-layer="background"></obc-poi-layer>
 *   </obc-poi-layer-stack>
 * </obc-poi-controller>
 * ```
 *
 * Then set detections from your data source (WebSocket, API, etc.):
 *
 * ```js
 * const controller = document.querySelector('obc-poi-controller');
 * controller.detections = [
 *   { id: 'track-1', x: 400, y: 800, box_width: 50, box_height: 40, heading: -15 },
 *   { id: 'track-2', x: 900, y: 750, box_width: 35, box_height: 30, heading: 45 },
 * ];
 * ```
 *
 * ## Framework Usage
 *
 * **Lit:**
 * ```html
 * <obc-poi-controller .detections=${detections} fit="cover">
 * ```
 *
 * **Vue:**
 * ```html
 * <obc-poi-controller :detections="detections" fit="cover">
 * ```
 *
 * **Svelte:**
 * ```html
 * <obc-poi-controller detections={detections} fit="cover">
 * ```
 *
 * **React 18** (needs ref for array props):
 * ```tsx
 * const ref = useRef(null);
 * useEffect(() => { ref.current.detections = detections; }, [detections]);
 * <obc-poi-controller ref={ref} fit="cover">
 * ```
 *
 * **React 19+** (native custom element support):
 * ```tsx
 * <obc-poi-controller detections={detections} fit="cover">
 * ```
 *
 * ## Framework Notes
 *
 * The `detections` API is safe for declarative renderers (React, Vue, etc.)
 * because the controller creates and owns the resulting `obc-poi-data`
 * elements. Manually slotted POI children of layers are a different story:
 * the layer stack physically re-parents them between layers during selection
 * (FLIP animation), and layers create/remove `obc-poi-group` elements in the
 * light DOM, which breaks framework reconciliation of those nodes. Manage
 * manually slotted POI elements imperatively, or prefer the `detections` API.
 * See `obc-poi-layer-stack` documentation for details.
 *
 * ## Coordinate Model
 *
 * Detection `x` and `y` are in **media pixel space** (e.g. 0-1920 for a 1920x1080 video).
 * The controller projects them to screen space using the `fit` mode (`contain` or `cover`)
 * and the media element's rendered dimensions.
 *
 * The Y coordinate maps to the line length from the layer's top edge down to the
 * detection point. The button sits at the top of the layer; the line extends downward.
 *
 * ## Detection Data
 *
 * Each detection can include:
 * - `x`, `y` (required) — position in media pixel space
 * - `id` — stable identity key (prevents marker churn when array order changes)
 * - `box_width`, `box_height` — bounding box size; determines button type (regular vs enhanced)
 * - `heading` or `direction` — rotation angle for the icon arrow (degrees)
 * - `confidence` — filtered by `confidenceMin`
 * - `class` — filtered by `classFilter`
 *
 * ## Layer Setup
 *
 * The stack needs at least two layers:
 * 1. A **selected layer** (`is-selected`) — targets jump here when clicked
 * 2. A **background layer** (`data-controller-layer="background"`) — where the controller places targets
 *
 * If no `data-controller-layer="background"` is set, the controller uses the first non-selected layer.
 *
 * ## Selection
 *
 * Clicking a target moves it to the selected layer with a FLIP animation.
 * The controller does not interfere with selected targets — it only manages
 * targets in the background layer. The layer-stack owns selection state.
 *
 * ## CSS Custom Properties
 *
 * - `--obc-poi-controller-stack-top` (default `15%`) — vertical position of the stack
 * - `--obc-poi-controller-stack-height` (default `50%`) — height of the stack
 * - `--obc-poi-controller-stack-gap` (default `8px`) — gap between layers
 *
 * @slot media - Video or image element. Sets the projection source dimensions.
 * @slot stack - `obc-poi-layer-stack` containing the layers for target placement.
 * @experimental
 */
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
  /** Forwarded to every controller-owned target's `xFilterCutoffHz` when set. */
  @property({type: Number, attribute: 'x-filter-cutoff-hz'})
  xFilterCutoffHz: number | null = null;
  /** Forwarded to every controller-owned target's `yFilterCutoffHz` when set. */
  @property({type: Number, attribute: 'y-filter-cutoff-hz'})
  yFilterCutoffHz: number | null = null;

  @state() private mediaWidth = 0;
  @state() private mediaHeight = 0;
  @state() private renderWidth = 0;
  @state() private renderHeight = 0;

  @queryAssignedElements({slot: 'media', flatten: true})
  private mediaElements!: HTMLElement[];
  @queryAssignedElements({slot: 'stack', flatten: true})
  private stackElements!: HTMLElement[];

  private resizeObserver?: ResizeObserver;
  private layerResizeObserver?: ResizeObserver;
  private syncRaf = 0;
  private handleMediaSlotChange = () => this.setupMediaObservers();
  private handleStackSlotChange = () => {
    this.currentLayer = null;
    this.setupLayerObserver();
    this.scheduleSync();
  };
  private controllerTargets = new Map<string, PoiBase>();
  private currentMedia: HTMLVideoElement | HTMLImageElement | null = null;
  private currentLayer: ObcPoiLayer | null = null;
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

  override updated(changed: PropertyValues) {
    if (
      changed.has('detections') ||
      changed.has('frames') ||
      changed.has('frameIndex') ||
      changed.has('fit') ||
      changed.has('confidenceMin') ||
      changed.has('classFilter') ||
      changed.has('mediaWidth') ||
      changed.has('mediaHeight') ||
      changed.has('renderWidth') ||
      changed.has('renderHeight')
    ) {
      this.scheduleSync();
    }
  }

  private scheduleSync() {
    if (this.syncRaf) return;
    this.syncRaf = requestAnimationFrame(() => {
      this.syncRaf = 0;
      this.syncTargetsToCustomStack();
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.syncRaf) {
      cancelAnimationFrame(this.syncRaf);
      this.syncRaf = 0;
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.layerResizeObserver?.disconnect();
    this.layerResizeObserver = undefined;
    this.currentLayer = null;
    this.detachMediaListeners();
    this.controllerTargets.clear();
    const slot = this.shadowRoot?.querySelector('slot[name="media"]');
    slot?.removeEventListener('slotchange', this.handleMediaSlotChange);
    const stackSlot = this.shadowRoot?.querySelector('slot[name="stack"]');
    stackSlot?.removeEventListener('slotchange', this.handleStackSlotChange);
  }

  private setupLayerObserver() {
    const layer = this.resolveTargetLayer();
    if (layer === this.currentLayer) return;

    this.layerResizeObserver?.disconnect();
    this.layerResizeObserver = undefined;
    this.currentLayer = layer;

    if (!layer) return;

    this.layerResizeObserver = new ResizeObserver(() => {
      this.scheduleSync();
    });
    this.layerResizeObserver.observe(layer);
  }

  private resolveTargetLayer(): ObcPoiLayer | null {
    const stack = this.getStackElement();
    if (!stack) return null;

    const explicitLayer = stack.querySelector<ObcPoiLayer>(
      `obc-poi-layer[${POI_CONTROLLER_LAYER_ATTR}="${POI_CONTROLLER_BACKGROUND_LAYER}"]`
    );
    if (explicitLayer) return explicitLayer;

    const layers = Array.from(
      stack.querySelectorAll<ObcPoiLayer>('obc-poi-layer')
    );
    const isSelectedLayer = (candidate: ObcPoiLayer): boolean =>
      candidate.isSelected === true;
    return (
      layers.find((candidate) => !isSelectedLayer(candidate)) ??
      layers[layers.length - 1] ??
      null
    );
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
    const projection = computeMediaProjection({
      mediaWidth: this.mediaWidth,
      mediaHeight: this.mediaHeight,
      renderWidth: this.renderWidth,
      renderHeight: this.renderHeight,
      fit: this.fit === PoiFitMode.Cover ? MediaFit.Cover : MediaFit.Contain,
    });
    if (!projection) return null;

    const point = projectPoint(projection, det.x, det.y);
    return {x: point.x, y: point.y, scale: projection.scale};
  }

  private syncTargetsToCustomStack() {
    const clearTargets = () => {
      if (this.controllerTargets.size === 0) {
        return;
      }
      this.controllerTargets.forEach((target) => target.remove());
      this.controllerTargets.clear();
    };

    if (!this.currentLayer || !this.currentLayer.isConnected) {
      this.setupLayerObserver();
    }
    const layer = this.currentLayer;
    if (!layer) {
      clearTargets();
      return;
    }

    const controllerRect = this.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    const layerBottomInController = layerRect.bottom - controllerRect.top;

    const active = this.getActiveDetections();
    const activeKeys = new Set<string>();

    active.forEach((det, index) => {
      const mapped = this.mapDetection(det);
      if (!mapped) return;
      const key =
        det.id ?? (this.keyFn ? this.keyFn(det, index) : `index:${index}`);
      activeKeys.add(key);

      const variant = det.variant ?? PoiDetectionVariant.Data;
      const tag = DETECTION_VARIANT_TAGS[variant];

      let target = this.controllerTargets.get(key);
      if (target && target.tagName.toLowerCase() !== tag) {
        target.remove();
        this.controllerTargets.delete(key);
        target = undefined;
      }
      if (!target) {
        target = document.createElement(tag) as PoiBase;
        target.dataset.controller = '1';
        target.dataset.detectionIndex = String(index);
        target.fixedTarget = false;
        this.controllerTargets.set(key, target);
      }

      const iconTag = det.icon?.toLowerCase() ?? null;
      const currentIcon = target.firstElementChild;
      if (iconTag) {
        if (currentIcon?.tagName.toLowerCase() !== iconTag) {
          currentIcon?.remove();
          target.appendChild(document.createElement(iconTag));
        }
      } else if (currentIcon) {
        currentIcon.remove();
      }

      // Append to background layer unless layer-stack moved it elsewhere
      if (!target.isConnected || target.parentElement === null) {
        layer.appendChild(target);
      }

      target.dataset.detectionIndex = String(index);
      target.x = mapped.x;
      target.y = Math.max(0, mapped.y - layerBottomInController);

      const boxWidth =
        typeof det.box_width === 'number' && Number.isFinite(det.box_width)
          ? det.box_width * mapped.scale
          : null;
      const boxHeight =
        typeof det.box_height === 'number' && Number.isFinite(det.box_height)
          ? det.box_height * mapped.scale
          : null;
      target.boxWidth = boxWidth;
      target.boxHeight = boxHeight;
      target.buttonType = resolvePoiButtonTypeFromBoxSize(boxWidth, boxHeight);

      const heading = det.heading ?? det.direction;
      if (typeof heading === 'number' && Number.isFinite(heading)) {
        target.relativeDirection = heading;
      }

      if (det.state !== undefined) {
        target.state = det.state;
      }
      if (det.data !== undefined) {
        target.data = det.data;
      }
      if (this.xFilterCutoffHz !== null) {
        target.xFilterCutoffHz = this.xFilterCutoffHz;
      }
      if (this.yFilterCutoffHz !== null) {
        target.yFilterCutoffHz = this.yFilterCutoffHz;
      }
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
