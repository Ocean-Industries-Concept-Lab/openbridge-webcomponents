import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-variant.css?inline';
import '../poi/poi.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
} from '../poi-button/poi-button.js';
import {ObcPoiState, ObcPoiType, ObcPoiValue} from '../poi/poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../poi-pointer/poi-pointer.js';
import {
  POI_TARGET_ATTR,
  PoiLayerTarget,
  PoiDataVisualRectPreference,
} from '../../poi-layer-target.js';

export {ObcPoiValue as PoiVariantValue};
export {PoiDataVisualRectPreference as PoiVariantVisualRectPreference};

/** @internal */
type VisualElementPreference =
  | PoiDataVisualRectPreference.Group
  | PoiDataVisualRectPreference.Anchor
  | PoiDataVisualRectPreference.Size;

const X_FILTER_CUTOFF_HZ = 16;
const X_FILTER_DEADBAND_PX = 0.1;
const X_MOVING_HINT_MS = 120;
const VALID_POI_TYPES = new Set(Object.values(ObcPoiType));
const VALID_POI_STATES = new Set(Object.values(ObcPoiState));

/**
 * Shared base class for top-level POI variant components (`obc-poi-data`,
 * `obc-poi-aton`, `obc-poi-vessel`).
 *
 * Implements `PoiLayerTarget` and contains all positioning, X-filter,
 * layout-change dispatch, and visual-query logic so that each variant
 * only needs to override `renderContent()` and `getVisualNodes()`.
 */
export abstract class ObcPoiVariant
  extends LitElement
  implements PoiLayerTarget
{
  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute(POI_TARGET_ATTR, '');
  }

  /* ---------- POI marker properties ---------- */

  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String, reflect: true}) value: ObcPoiValue =
    ObcPoiValue.Unchecked;
  @property({type: String}) state: ObcPoiState = ObcPoiState.Enabled;
  @property({type: Boolean}) selected = false;
  @property({type: String, attribute: 'button-type'})
  buttonType = ObcPoiButtonType.Button;
  @property({type: Boolean, attribute: 'overlap-opaque'})
  overlapOpaque = false;
  @property({attribute: false})
  data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean, attribute: 'has-header'}) hasHeader = false;
  @property({type: Boolean}) hasPointer = false;
  @property({type: String, attribute: 'pointer-type'})
  pointerType: ObcPoiPointerType | null = null;
  @property({type: String, attribute: 'pointer-state'})
  pointerState: ObcPoiPointerState | null = null;
  @property({type: Number}) relativeDirection = 0;

  /* ---------- PoiLayerTarget — position ---------- */

  @property({type: Number}) x = 0;
  @property({type: Number}) y = 192;
  @property({type: Number, attribute: 'button-y'}) buttonY: number | null =
    null;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;
  @property({type: Number, attribute: 'button-offset-x'}) buttonOffsetX = 0;
  @property({type: Number, attribute: 'target-offset-x'}) targetOffsetX = 0;
  @property({type: Number, attribute: 'box-width'}) boxWidth: number | null =
    null;
  @property({type: Number, attribute: 'box-height'}) boxHeight: number | null =
    null;
  @property({type: Number, attribute: 'line-compensation-y'})
  lineCompensationY = 0;
  @property({type: Number, attribute: 'outside-angle'}) outsideAngle = 315;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;

  /* ---------- X-filter state ---------- */

  private filteredX = 0;
  private xFilterTarget = 0;
  private xFilterInitialized = false;
  private lastXFilterTimestampMs = 0;
  private xFilterRaf = 0;
  private xMovingHintTimeout: number | null = null;

  /* ---------- Layout change ---------- */

  private dispatchLayoutChange() {
    this.dispatchEvent(
      new CustomEvent('obc-poi-data-layout-change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /* ---------- X filter (low-pass) ---------- */

  private stepXFilter = (nowMs: number) => {
    this.xFilterRaf = 0;
    if (!this.isConnected || !this.xFilterInitialized) {
      return;
    }

    const dtSeconds =
      this.lastXFilterTimestampMs > 0
        ? Math.min(
            0.25,
            Math.max(1 / 120, (nowMs - this.lastXFilterTimestampMs) / 1000)
          )
        : 1 / 60;
    this.lastXFilterTimestampMs = nowMs;

    const alpha = 1 - Math.exp(-2 * Math.PI * X_FILTER_CUTOFF_HZ * dtSeconds);
    const delta = this.xFilterTarget - this.filteredX;
    const nextX =
      Math.abs(delta) <= X_FILTER_DEADBAND_PX
        ? this.xFilterTarget
        : this.filteredX + delta * alpha;
    const changed = Math.abs(nextX - this.filteredX) > 1e-6;
    this.filteredX = nextX;
    if (changed) {
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      this.dispatchLayoutChange();
    }

    const settled =
      Math.abs(this.xFilterTarget - this.filteredX) <= X_FILTER_DEADBAND_PX;

    if (settled) {
      this.filteredX = this.xFilterTarget;
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      this.lastXFilterTimestampMs = 0;
      this.markXMoving();
      return;
    }

    this.markXMoving();
    this.xFilterRaf = requestAnimationFrame(this.stepXFilter);
  };

  private syncXFilterTarget(nextX: number) {
    this.xFilterTarget = nextX;

    if (!this.xFilterInitialized) {
      this.xFilterInitialized = true;
      this.filteredX = nextX;
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      this.markXMoving();
      return;
    }

    if (Math.abs(nextX - this.filteredX) <= X_FILTER_DEADBAND_PX) {
      this.filteredX = this.xFilterTarget;
      this.style.setProperty('--obc-poi-data-x', `${this.filteredX}px`);
      if (this.xFilterRaf) {
        cancelAnimationFrame(this.xFilterRaf);
        this.xFilterRaf = 0;
      }
      this.lastXFilterTimestampMs = 0;
      this.markXMoving();
      return;
    }

    if (!this.xFilterRaf) {
      this.lastXFilterTimestampMs = 0;
      this.markXMoving();
      this.xFilterRaf = requestAnimationFrame(this.stepXFilter);
    }
  }

  private markXMoving() {
    this.setAttribute('data-x-moving', 'true');
    if (this.xMovingHintTimeout !== null) {
      window.clearTimeout(this.xMovingHintTimeout);
    }
    this.xMovingHintTimeout = window.setTimeout(() => {
      this.removeAttribute('data-x-moving');
      this.xMovingHintTimeout = null;
    }, X_MOVING_HINT_MS);
  }

  /* ---------- Lifecycle ---------- */

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.xFilterRaf) {
      cancelAnimationFrame(this.xFilterRaf);
      this.xFilterRaf = 0;
    }
    this.lastXFilterTimestampMs = 0;
    if (this.xMovingHintTimeout !== null) {
      window.clearTimeout(this.xMovingHintTimeout);
      this.xMovingHintTimeout = null;
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.syncXFilterTarget(Number.isFinite(this.x) ? this.x : 0);
    }
    if (
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget') ||
      changedProperties.has('lineCompensationY') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
    ) {
      this.updatePosition();
    }
    if (
      changedProperties.has('x') ||
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('buttonOffsetX') ||
      changedProperties.has('targetOffsetX') ||
      changedProperties.has('lineCompensationY') ||
      changedProperties.has('fixedTarget') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
    ) {
      this.dispatchLayoutChange();
    }
  }

  /* ---------- Vertical positioning ---------- */

  private updatePosition() {
    if (this.fixedTarget) {
      if (typeof this.buttonY === 'number' && Number.isFinite(this.buttonY)) {
        this.style.top = `${this.buttonY - this.effectiveLineLength}px`;
      } else {
        this.style.removeProperty('top');
      }
    } else if (
      typeof this.buttonY === 'number' &&
      Number.isFinite(this.buttonY)
    ) {
      this.style.top = `${this.buttonY}px`;
    } else {
      this.style.removeProperty('top');
    }
  }

  protected get selectedVerticalOffset(): number {
    if (!this.selected) {
      return 0;
    }
    const offset = getComputedStyle(this).getPropertyValue(
      '--obc-poi-target-selected-vertical-offset'
    );
    const parsed = Number.parseFloat(offset);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  protected get layerVerticalOffset(): number {
    const offset = getComputedStyle(this).getPropertyValue(
      '--obc-poi-target-layer-vertical-offset'
    );
    const parsed = Number.parseFloat(offset);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  protected get resolvedPoiType(): ObcPoiType {
    return VALID_POI_TYPES.has(this.type as ObcPoiType)
      ? (this.type as ObcPoiType)
      : ObcPoiType.Line;
  }

  protected get resolvedPoiState(): ObcPoiState {
    return VALID_POI_STATES.has(this.state as ObcPoiState)
      ? (this.state as ObcPoiState)
      : ObcPoiState.Enabled;
  }

  /* ---------- PoiLayerTarget — visual query ---------- */

  /**
   * Override in each variant to query the correct inner component tag names.
   * Returns the poi wrapper element and poi-button element from the shadow DOM.
   */
  protected abstract getVisualNodes(): {
    poi: HTMLElement | null;
    button: HTMLElement | null;
    wrapper: HTMLElement | null;
    buttonWrapper: HTMLElement | null;
  };

  /**
   * Helper for common `getVisualNodes()` pattern: query poi tag in own shadow,
   * then button tag. When the button is slotted into poi (aton/vessel variants),
   * it lives in this variant's shadow root. When using the fallback (data variant),
   * it lives inside poi's shadow root.
   */
  protected queryVisualNodes(poiTag: string, buttonTag: string) {
    const poi = this.shadowRoot?.querySelector(poiTag) as HTMLElement | null;
    const button = (this.shadowRoot?.querySelector(buttonTag) ??
      poi?.shadowRoot?.querySelector(buttonTag)) as HTMLElement | null;
    const buttonShadow = button?.shadowRoot ?? null;
    const buttonWrapper = buttonShadow?.querySelector(
      '.button-wrapper'
    ) as HTMLElement | null;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper'
    ) as HTMLElement | null;
    return {poi, button, wrapper, buttonWrapper};
  }

  public getVisualRect(
    preference: PoiDataVisualRectPreference = PoiDataVisualRectPreference.Largest
  ): DOMRect {
    const {poi, button, wrapper, buttonWrapper} = this.getVisualNodes();
    const candidates = [wrapper, buttonWrapper, button, poi].filter(
      (element): element is HTMLElement => !!element
    );

    if (preference === PoiDataVisualRectPreference.Group) {
      const hasDataWrapper = wrapper?.classList.contains('has-data') ?? false;
      return (
        (hasDataWrapper ? wrapper?.getBoundingClientRect() : null) ??
        buttonWrapper?.getBoundingClientRect() ??
        wrapper?.getBoundingClientRect() ??
        button?.getBoundingClientRect() ??
        poi?.getBoundingClientRect() ??
        this.getBoundingClientRect()
      );
    }

    if (preference === PoiDataVisualRectPreference.Anchor) {
      return (
        buttonWrapper?.getBoundingClientRect() ??
        button?.getBoundingClientRect() ??
        wrapper?.getBoundingClientRect() ??
        poi?.getBoundingClientRect() ??
        this.getBoundingClientRect()
      );
    }

    if (preference === PoiDataVisualRectPreference.Size) {
      return (
        wrapper?.getBoundingClientRect() ??
        buttonWrapper?.getBoundingClientRect() ??
        button?.getBoundingClientRect() ??
        poi?.getBoundingClientRect() ??
        this.getBoundingClientRect()
      );
    }

    if (candidates.length === 0) {
      return this.getBoundingClientRect();
    }

    const candidateRects = candidates.map((element) =>
      element.getBoundingClientRect()
    );
    return candidateRects.reduce((best, rect) =>
      rect.height > best.height ? rect : best
    );
  }

  public getVisualElement(
    preference: VisualElementPreference = PoiDataVisualRectPreference.Size
  ): HTMLElement {
    const {poi, button, wrapper, buttonWrapper} = this.getVisualNodes();

    if (preference === PoiDataVisualRectPreference.Group) {
      const hasDataWrapper = wrapper?.classList.contains('has-data') ?? false;
      return (
        (hasDataWrapper ? wrapper : null) ??
        buttonWrapper ??
        wrapper ??
        button ??
        poi ??
        this
      );
    }

    if (preference === PoiDataVisualRectPreference.Anchor) {
      return buttonWrapper ?? button ?? wrapper ?? poi ?? this;
    }

    return wrapper ?? buttonWrapper ?? button ?? poi ?? this;
  }

  public getPointerElement(): HTMLElement | null {
    const {poi} = this.getVisualNodes();
    return (
      (poi?.shadowRoot?.querySelector('obc-poi-pointer.pointer') as HTMLElement | null) ??
      null
    );
  }

  /* ---------- Render helpers ---------- */

  /** Computed effective line length accounting for compensation and vertical offsets. */
  protected get effectiveLineLength(): number {
    const resolvedPoiType = this.resolvedPoiType;
    const lineLength = Number.isFinite(this.y) ? this.y : 0;
    const lineCompensation = Number.isFinite(this.lineCompensationY)
      ? this.lineCompensationY
      : 0;
    const totalVerticalOffset =
      this.selectedVerticalOffset + this.layerVerticalOffset;
    return resolvedPoiType === ObcPoiType.Line ||
      resolvedPoiType === ObcPoiType.Offset
      ? lineLength + lineCompensation + totalVerticalOffset
      : lineLength;
  }

  /** Computed effective local button Y offset. */
  protected get effectiveLocalButtonY(): number {
    const totalVerticalOffset =
      this.selectedVerticalOffset + this.layerVerticalOffset;
    return -totalVerticalOffset;
  }

  /**
   * Override in each variant to render the button slot content
   * placed inside `<obc-poi>`. The base class provides the outer
   * `<obc-poi>` wrapper with all shared property bindings.
   */
  protected abstract renderButtonSlot(): TemplateResult;

  override render() {
    return html`
      <obc-poi
        .type=${this.resolvedPoiType}
        .value=${this.value}
        .state=${this.resolvedPoiState}
        .x=${0}
        .y=${this.effectiveLineLength}
        .buttonY=${this.effectiveLocalButtonY}
        .fixedTarget=${false}
        .outsideAngle=${this.outsideAngle}
        .hasPointer=${this.hasPointer}
        .hasHeader=${this.hasHeader}
        .animatePosition=${this.animatePosition}
        .relativeDirection=${this.relativeDirection}
        .buttonType=${this.buttonType}
        .overlapOpaque=${this.overlapOpaque}
        .pointerType=${this.pointerType}
        .pointerState=${this.pointerState}
        .selected=${this.selected}
        .data=${this.data}
        .buttonOffsetX=${this.buttonOffsetX}
        .targetOffsetX=${this.targetOffsetX}
        .boxWidth=${this.boxWidth}
        .boxHeight=${this.boxHeight}
      >
        ${this.renderButtonSlot()}
      </obc-poi>
    `;
  }

  static override styles = [unsafeCSS(componentStyle)];
}
