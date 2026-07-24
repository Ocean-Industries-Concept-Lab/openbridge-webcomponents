import {LitElement, TemplateResult, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-base.css?inline';
import './poi.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
} from '../poi-button/poi-button.js';
import {ObcPoiHeaderState} from '../building-blocks/poi-header/poi-header.js';
import {
  DEFAULT_LINE_LENGTH_PX,
  ObcPoiState,
  ObcPoiType,
  ObcPoiValue,
} from './poi.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../building-blocks/poi-pointer/poi-pointer.js';
import {POI_ATTR, Poi, PoiDataVisualRectPreference} from './poi.js';
export {ObcPoiValue as PoiBaseValue};
export {PoiDataVisualRectPreference as PoiBaseVisualRectPreference};

/** @internal */
type VisualElementPreference =
  | PoiDataVisualRectPreference.Group
  | PoiDataVisualRectPreference.Anchor
  | PoiDataVisualRectPreference.Size;

function stripWhitespaceTextNodes(el: Element): void {
  for (const node of Array.from(el.childNodes)) {
    if (
      node.nodeType === Node.TEXT_NODE &&
      (node.textContent ?? '').trim() === ''
    ) {
      node.remove();
    }
  }
}

const X_FILTER_CUTOFF_HZ = 16;
const Y_FILTER_CUTOFF_HZ = 16;
const X_FILTER_DEADBAND_PX = 0.1;
const X_MOVING_HINT_MS = 120;
const VALID_POI_TYPES = new Set(Object.values(ObcPoiType));
const VALID_POI_STATES = new Set(Object.values(ObcPoiState));

/**
 * Shared base class for top-level POI variant components (`obc-poi-data`,
 * `obc-poi-aton`, `obc-poi-vessel`).
 *
 * Implements `Poi` and contains all positioning, X-filter,
 * layout-change dispatch, and visual-query logic so that each variant
 * only needs to override `renderContent()` and `getVisualNodes()`.
 *
 * ### Coordinate Model
 * - `x` is the horizontal center position in px within the layer.
 * - Targets are anchored at the layer's bottom edge; `y` is the connector
 *   line length in px extending downward from that anchor to the target
 *   point (default `192`, the shared `DEFAULT_LINE_LENGTH_PX`). The button
 *   renders at the top of the connector, inside the layer.
 * - `buttonY` positions the button; its interaction with `fixedTarget` is
 *   described in the `obc-poi` documentation.
 * - `x` and `y` updates pass through built-in low-pass filters (see
 *   `xFilterCutoffHz` and `yFilterCutoffHz`).
 */
export class PoiBase extends LitElement implements Poi {
  private headerObserver?: MutationObserver;
  private _buttonOffsetX = 0;
  private _targetOffsetX = 0;

  override connectedCallback() {
    stripWhitespaceTextNodes(this);
    super.connectedCallback();
    this.setAttribute(POI_ATTR, '');
    this.setupHeaderObserver();
  }

  /* ---------- POI marker properties ---------- */

  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String}) value: ObcPoiValue = ObcPoiValue.Unchecked;
  @property({type: String}) state: ObcPoiState = ObcPoiState.Enabled;
  @property({type: Boolean}) selected = false;
  @property({type: String, attribute: 'button-type'})
  buttonType = ObcPoiButtonType.Button;
  @property({type: Boolean, attribute: 'overlap-opaque'})
  overlapOpaque = false;
  @property({type: Array, attribute: false})
  data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean, attribute: 'has-header'}) hasHeader = false;
  @property({type: String, attribute: 'header-content'}) headerContent = '';
  @property({type: Boolean}) hasPointer = false;
  @property({type: String, attribute: 'pointer-type'})
  pointerType: ObcPoiPointerType | null = null;
  @property({type: String, attribute: 'pointer-state'})
  pointerState: ObcPoiPointerState | null = null;
  @property({type: Number}) relativeDirection = 0;

  /* ---------- Poi — position ---------- */

  @property({type: Number}) x = 0;
  @property({type: Number}) y = DEFAULT_LINE_LENGTH_PX;
  @property({type: Number, attribute: 'button-y'}) buttonY: number | null = 0;
  /**
   * Cutoff frequency (Hz) of the built-in low-pass filter applied to `x`.
   * Lower values smooth noisy input more aggressively; `0` or a negative
   * value disables filtering so `x` is applied directly.
   */
  @property({type: Number, attribute: 'x-filter-cutoff-hz'})
  xFilterCutoffHz = X_FILTER_CUTOFF_HZ;
  /**
   * Cutoff frequency (Hz) of the built-in low-pass filter applied to `y`.
   * Lower values smooth noisy input more aggressively; `0` or a negative
   * value disables filtering so `y` is applied directly.
   */
  @property({type: Number, attribute: 'y-filter-cutoff-hz'})
  yFilterCutoffHz = Y_FILTER_CUTOFF_HZ;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;
  @property({type: Number, attribute: 'box-width'}) boxWidth: number | null =
    null;
  @property({type: Number, attribute: 'box-height'}) boxHeight: number | null =
    null;
  @property({type: Number, attribute: 'outside-angle'}) outsideAngle = 315;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;

  @property({type: Number, attribute: 'button-offset-x'})
  get buttonOffsetX(): number {
    return this._buttonOffsetX;
  }

  set buttonOffsetX(value: number) {
    const nextValue = Number.isFinite(value) ? value : 0;
    const oldValue = this._buttonOffsetX;
    if (oldValue === nextValue) {
      return;
    }

    this._buttonOffsetX = nextValue;
    this.requestUpdate('buttonOffsetX', oldValue);
  }

  @property({type: Number, attribute: 'target-offset-x'})
  get targetOffsetX(): number {
    return this._targetOffsetX;
  }

  set targetOffsetX(value: number) {
    const nextValue = Number.isFinite(value) ? value : 0;
    const oldValue = this._targetOffsetX;
    if (oldValue === nextValue) {
      return;
    }

    this._targetOffsetX = nextValue;
    this.requestUpdate('targetOffsetX', oldValue);
  }

  /* ---------- X-filter state ---------- */

  private filteredX = 0;
  private xFilterTarget = 0;
  private xFilterInitialized = false;
  private lastXFilterTimestampMs = 0;
  private xFilterRaf = 0;
  private xMovingHintTimeout: number | null = null;

  private get resolvedXFilterCutoffHz(): number {
    return Number.isFinite(this.xFilterCutoffHz)
      ? this.xFilterCutoffHz
      : X_FILTER_CUTOFF_HZ;
  }

  /* ---------- Y-filter state ---------- */

  private filteredY = 0;
  private yFilterTarget = 0;
  private yFilterInitialized = false;
  private lastYFilterTimestampMs = 0;
  private yFilterRaf = 0;

  private get resolvedYFilterCutoffHz(): number {
    return Number.isFinite(this.yFilterCutoffHz)
      ? this.yFilterCutoffHz
      : Y_FILTER_CUTOFF_HZ;
  }

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

    const cutoffHz = this.resolvedXFilterCutoffHz;
    const alpha =
      cutoffHz <= 0 ? 1 : 1 - Math.exp(-2 * Math.PI * cutoffHz * dtSeconds);
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

    if (
      this.resolvedXFilterCutoffHz <= 0 ||
      Math.abs(nextX - this.filteredX) <= X_FILTER_DEADBAND_PX
    ) {
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

  /* ---------- Y filter (low-pass) ---------- */

  private stepYFilter = (nowMs: number) => {
    this.yFilterRaf = 0;
    if (!this.isConnected || !this.yFilterInitialized) {
      return;
    }

    const dtSeconds =
      this.lastYFilterTimestampMs > 0
        ? Math.min(
            0.25,
            Math.max(1 / 120, (nowMs - this.lastYFilterTimestampMs) / 1000)
          )
        : 1 / 60;
    this.lastYFilterTimestampMs = nowMs;

    const cutoffHz = this.resolvedYFilterCutoffHz;
    const alpha =
      cutoffHz <= 0 ? 1 : 1 - Math.exp(-2 * Math.PI * cutoffHz * dtSeconds);
    const delta = this.yFilterTarget - this.filteredY;
    const nextY =
      Math.abs(delta) <= X_FILTER_DEADBAND_PX
        ? this.yFilterTarget
        : this.filteredY + delta * alpha;
    const changed = Math.abs(nextY - this.filteredY) > 1e-6;
    this.filteredY = nextY;
    if (changed) {
      this.applyFilteredY();
    }

    const settled =
      Math.abs(this.yFilterTarget - this.filteredY) <= X_FILTER_DEADBAND_PX;

    if (settled) {
      this.filteredY = this.yFilterTarget;
      this.applyFilteredY();
      this.lastYFilterTimestampMs = 0;
      return;
    }

    this.yFilterRaf = requestAnimationFrame(this.stepYFilter);
  };

  private applyFilteredY() {
    this.requestUpdate();
    this.updatePosition();
    this.dispatchLayoutChange();
  }

  private syncYFilterTarget(nextY: number) {
    this.yFilterTarget = nextY;

    if (!this.yFilterInitialized) {
      this.yFilterInitialized = true;
      this.filteredY = nextY;
      return;
    }

    if (
      this.resolvedYFilterCutoffHz <= 0 ||
      Math.abs(nextY - this.filteredY) <= X_FILTER_DEADBAND_PX
    ) {
      this.filteredY = this.yFilterTarget;
      this.applyFilteredY();
      if (this.yFilterRaf) {
        cancelAnimationFrame(this.yFilterRaf);
        this.yFilterRaf = 0;
      }
      this.lastYFilterTimestampMs = 0;
      return;
    }

    if (!this.yFilterRaf) {
      this.lastYFilterTimestampMs = 0;
      this.yFilterRaf = requestAnimationFrame(this.stepYFilter);
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
    this.headerObserver?.disconnect();
    this.headerObserver = undefined;
    if (this.xFilterRaf) {
      cancelAnimationFrame(this.xFilterRaf);
      this.xFilterRaf = 0;
    }
    this.lastXFilterTimestampMs = 0;
    if (this.yFilterRaf) {
      cancelAnimationFrame(this.yFilterRaf);
      this.yFilterRaf = 0;
    }
    this.lastYFilterTimestampMs = 0;
    if (this.xMovingHintTimeout !== null) {
      window.clearTimeout(this.xMovingHintTimeout);
      this.xMovingHintTimeout = null;
    }
  }

  private setupHeaderObserver() {
    this.headerObserver?.disconnect();
    this.headerObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          this.syncHeaderContent();
          return;
        }
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLElement &&
          mutation.target.getAttribute('slot') === 'header'
        ) {
          this.syncHeaderContent();
          return;
        }
      }
    });
    this.headerObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ['slot'],
    });
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.syncXFilterTarget(Number.isFinite(this.x) ? this.x : 0);
    }
    if (changedProperties.has('y')) {
      this.syncYFilterTarget(Number.isFinite(this.y) ? this.y : 0);
    }
    if (
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
    ) {
      this.updatePosition();
      this.syncInnerPoiLayout();
    }
    if (
      changedProperties.has('x') ||
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('buttonOffsetX') ||
      changedProperties.has('targetOffsetX') ||
      changedProperties.has('fixedTarget') ||
      changedProperties.has('selected') ||
      changedProperties.has('type')
    ) {
      this.dispatchLayoutChange();
    }
    this.syncHeaderContent();
  }

  protected override firstUpdated(_changedProperties: Map<string, unknown>) {
    this.syncHeaderContent();
  }

  /* ---------- Vertical positioning ---------- */

  private updatePosition() {
    if (this.fixedTarget) {
      if (Number.isFinite(this.resolvedButtonY)) {
        this.style.top = `${this.resolvedButtonY - this.resolvedTargetY}px`;
      } else {
        this.style.removeProperty('top');
      }
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

  /* ---------- Poi — visual query ---------- */

  /**
   * Override in each variant to query the correct inner component tag names.
   * Returns the poi wrapper element and poi-button element from the shadow DOM.
   */
  protected getVisualNodes(): {
    poi: HTMLElement | null;
    button: HTMLElement | null;
    wrapper: HTMLElement | null;
    buttonWrapper: HTMLElement | null;
  } {
    return this.queryVisualNodes('obc-poi', 'obc-poi-button');
  }

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

  private getInnerPoi() {
    return this.shadowRoot?.querySelector('obc-poi') as {
      requestUpdate?: () => void;
      refreshProjectionLayout?: (trackDurationMs?: number) => void;
      buttonOffsetX?: number;
      targetOffsetX?: number;
    } | null;
  }

  private syncInnerPoiLayout() {
    const poi = this.getInnerPoi();

    if (poi) {
      poi.buttonOffsetX = this._buttonOffsetX;
      poi.targetOffsetX = this._targetOffsetX;
    }
    poi?.requestUpdate?.();
    poi?.refreshProjectionLayout?.();
  }

  public refreshProjectionLayout(trackDurationMs = 0) {
    const poi = this.getInnerPoi();
    poi?.refreshProjectionLayout?.(trackDurationMs);
    this.dispatchLayoutChange();
  }

  public setRuntimeHorizontalOffsets(
    buttonOffsetX: number,
    targetOffsetX = this._targetOffsetX
  ) {
    const nextButtonOffsetX = Number.isFinite(buttonOffsetX)
      ? buttonOffsetX
      : 0;
    const nextTargetOffsetX = Number.isFinite(targetOffsetX)
      ? targetOffsetX
      : 0;
    const oldButtonOffsetX = this._buttonOffsetX;
    const oldTargetOffsetX = this._targetOffsetX;
    const buttonOffsetChanged = this._buttonOffsetX !== nextButtonOffsetX;
    const targetOffsetChanged = this._targetOffsetX !== nextTargetOffsetX;

    if (!buttonOffsetChanged && !targetOffsetChanged) {
      return;
    }

    this._buttonOffsetX = nextButtonOffsetX;
    this._targetOffsetX = nextTargetOffsetX;

    const poi = this.getInnerPoi();

    if (!poi) {
      if (buttonOffsetChanged) {
        this.requestUpdate('buttonOffsetX', oldButtonOffsetX);
      }
      if (targetOffsetChanged) {
        this.requestUpdate('targetOffsetX', oldTargetOffsetX);
      }
      return;
    }

    poi.buttonOffsetX = nextButtonOffsetX;
    poi.targetOffsetX = nextTargetOffsetX;
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
      (poi?.shadowRoot?.querySelector(
        'obc-poi-pointer.pointer'
      ) as HTMLElement | null) ?? null
    );
  }

  /* ---------- Render helpers ---------- */

  /** Public `y` normalized as the target Y input, after the y filter. */
  protected get resolvedTargetY(): number {
    if (this.yFilterInitialized) {
      return this.filteredY;
    }
    return Number.isFinite(this.y) ? this.y : 0;
  }

  /** Public `buttonY` normalized as the button Y input. */
  protected get resolvedButtonY(): number {
    return typeof this.buttonY === 'number' && Number.isFinite(this.buttonY)
      ? this.buttonY
      : 0;
  }

  /** Computed effective local button Y offset. */
  protected get effectiveLocalButtonY(): number {
    return this.resolvedButtonY - this.selectedVerticalOffset;
  }

  /**
   * Override in each variant to render the button slot content
   * placed inside `<obc-poi>`. The base class provides the outer
   * `<obc-poi>` wrapper with all shared property bindings.
   */
  protected renderButtonSlot(): TemplateResult {
    return html`
      <obc-poi-button
        slot="button"
        exportparts="icon"
        .relativeDirection=${this.relativeDirection}
        .selected=${this.selected}
        .hasHeader=${this.hasHeader}
        .headerContent=${this.headerContent}
        .state=${this.resolvedPoiState}
        .value=${this.value}
        .overlapOpaque=${this.overlapOpaque}
        .type=${this.buttonType}
        .data=${this.data}
      >
        <slot></slot>
        <slot name="header" slot="header"></slot>
      </obc-poi-button>
    `;
  }

  protected get resolvedHeaderState(): ObcPoiHeaderState {
    switch (this.resolvedPoiState) {
      case ObcPoiState.Caution:
        return ObcPoiHeaderState.Caution;
      case ObcPoiState.Warning:
        return ObcPoiHeaderState.Warning;
      case ObcPoiState.Alarm:
        return ObcPoiHeaderState.Alarm;
      case ObcPoiState.Enabled:
      default:
        return this.selected
          ? ObcPoiHeaderState.Selected
          : ObcPoiHeaderState.Enabled;
    }
  }

  /**
   * Auto-enable `hasHeader` when the consumer slots header content directly
   * (outside a stack, which manages `hasHeader` itself). Header elements stay
   * in the consumer's light DOM and reach the inner button through the
   * `<slot name="header">` forwarding chain; their `state` is synced by
   * `obc-poi-button`.
   */
  private syncHeaderContent() {
    if (this.hasHeader) {
      return;
    }
    const hasHeaderChildren = Array.from(this.children).some(
      (child) =>
        child instanceof HTMLElement && child.getAttribute('slot') === 'header'
    );
    if (hasHeaderChildren && this.closest('obc-poi-layer-stack') === null) {
      this.hasHeader = true;
    }
  }

  override render() {
    return html`
      <obc-poi
        .type=${this.resolvedPoiType}
        .value=${this.value}
        .state=${this.resolvedPoiState}
        .x=${0}
        .y=${this.resolvedTargetY}
        .buttonY=${this.effectiveLocalButtonY}
        .fixedTarget=${false}
        .outsideAngle=${this.outsideAngle}
        .hasPointer=${this.hasPointer}
        .hasHeader=${this.hasHeader}
        .headerContent=${this.headerContent}
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
