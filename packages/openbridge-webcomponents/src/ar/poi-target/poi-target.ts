import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-target.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../poi-line/poi-line.js';
import '../poi-target-button/poi-target-button.js';
import {POIStyle} from '../poi-graphic-line/poi-config.js';
import '../../icons/icon-ais-target-activated-iec.js';
import {ObcArAlertType} from '../types.js';
import {
  ObcPoiTargetButtonType,
  ObcPoiTargetButtonValue,
  PoiTargetButtonVisualState,
} from '../poi-target-button/poi-target-button.js';
import {customElement} from '../../decorator.js';

export enum TargetValue {
  enabled = 'enabled',
  checked = 'checked',
}

function valueToPointerStyle(value: TargetValue): POIStyle {
  let style = null;
  switch (value) {
    case TargetValue.enabled:
      style = POIStyle.Normal;
      break;
    case TargetValue.checked:
      style = POIStyle.Enhanced;
      break;
    default:
      throw new Error(`Value has no style: ${style}`);
  }
  return style;
}

export enum Pointer {
  Line = 'line',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  None = 'null',
}

export {PoiTargetButtonVisualState as PoiTargetVisualState};

/**
 * `<obc-poi-target>` renders a point-of-interest marker with a selectable target
 * button and optional pointer line.
 *
 * Use this component inside `obc-poi-layer` or `obc-poi-target-button-group` to
 * position targets in AR layers and present status or selection state for a
 * detection or tracked object.
 *
 * ### Features
 * - Positions via `x`/`y` coordinates and an optional pointer line.
 * - Visual emphasis controlled by `visualState` (see `PoiTargetVisualState`).
 * - Multi-value button rendering via the `values` array.
 * - Horizontal nudging via `buttonOffsetX` for overlap or crossing layouts.
 * - Supports alert, selection, and pointer variants.
 *
 * ### Usage Guidelines
 * - Set `x`/`y` in pixels to place the target relative to its container.
 * - Use `visualState` to align with layer or group overlap logic.
 * - Provide `values` to display secondary statuses on the button.
 * - Adjust `buttonOffsetX` only when resolving collisions in a layer.
 *
 * ### Slots
 * - None.
 *
 * ### Events
 * - None. This component does not emit custom events.
 *
 * ### Best Practices
 * - Use within `obc-poi-layer` for automatic grouping and overlap behaviors.
 * - Keep pointer lines short to reduce visual clutter.
 * - Prefer `PoiTargetVisualState` values over manual styling.
 *
 * ### Example
 * ```html
 * <obc-poi-target x="120" y="200"></obc-poi-target>
 * ```
 *
 * @slot none
 * @fires none - This component does not emit custom events.
 */

@customElement('obc-poi-target')
export class ObcPoiTarget extends LitElement {
  @property({type: Number}) x = 0;
  @property({type: Number}) y = 192;
  /** @deprecated Use y instead. */
  @property({type: Number}) height: number = 192;
  @property({type: Boolean}) selected = false;
  @property({type: String}) selectedId: string | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true, attribute: 'visualstate'})
  visualState: PoiTargetButtonVisualState = PoiTargetButtonVisualState.Normal;
  @property({type: String}) type = ObcPoiTargetButtonType.Button;
  @property({type: String}) value: TargetValue = TargetValue.enabled;
  @property({type: String}) pointerType: Pointer = Pointer.Line;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) offset = 0;
  @property({type: Number}) buttonOffsetX = 0;
  private syncingPosition = false;

  private getSelectedId(): string | null {
    return this.selectedId ?? (this.id ? this.id : null);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (this.syncingPosition) return;

    if (changedProperties.has('x')) {
      this.style.left = `${this.x}px`;
    }

    if (changedProperties.has('y') && this.y !== this.height) {
      this.syncingPosition = true;
      this.height = this.y;
      this.syncingPosition = false;
      if (!this.closest('obc-poi-layer')) {
        this.style.top = `${this.y}px`;
      }
    } else if (changedProperties.has('height') && this.height !== this.y) {
      this.syncingPosition = true;
      this.y = this.height;
      this.syncingPosition = false;
      if (!this.closest('obc-poi-layer')) {
        this.style.top = `${this.y}px`;
      }
    }
  }
  @property({
    type: Array,
    converter: {
      fromAttribute(value) {
        if (!value) return [];
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      },
      toAttribute(value) {
        if (!value || !Array.isArray(value) || value.length === 0) return null;
        try {
          return JSON.stringify(value);
        } catch {
          return null;
        }
      },
    },
  })
  values: ObcPoiTargetButtonValue[] = [];
  override render() {
    let pointer = null;
    let verticalOffset = 0;

    if (this.selected) {
      // get the offset from the css variable
      const offset = getComputedStyle(this).getPropertyValue(
        '--obc-poi-target-selected-vertical-offset'
      );
      verticalOffset = parseInt(offset);
    }

    switch (this.pointerType) {
      case Pointer.Line:
        pointer = html`
          <obc-poi-line
            height=${this.height + verticalOffset}
            poiStyle=${valueToPointerStyle(this.value)}
            .offset=${this.offset}
          ></obc-poi-line>
        `;
        break;
      case Pointer.ArrowLeft:
        pointer = Pointer.ArrowLeft;
        break;
      case Pointer.ArrowRight:
        pointer = Pointer.ArrowRight;
        break;
      case Pointer.None:
        pointer = null;
        break;
      default:
        throw new Error(`Pointer type ${this.pointerType} not supported`);
    }

    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['type-' + this.pointerType]: true,
          selected: this.selected,
        })}
        ?data-no-transition=${this.buttonOffsetX !== 0 || this.offset !== 0}
        style=${this.buttonOffsetX !== 0
          ? `--obc-poi-target-button-offset-x: ${this.buttonOffsetX}px; --poi-offset: ${this.buttonOffsetX}px;`
          : ''}
      >
        <obc-poi-target-button
          .relativeDirection=${this.relativeDirection}
          .selected=${this.selected}
          .selectedId=${this.getSelectedId()}
          .alertType=${this.alertType}
          visualState=${this.visualState}
          .type=${this.type}
          .values=${this.values}
        >
          <obi-ais-target-activated-iec></obi-ais-target-activated-iec>
        </obc-poi-target-button>
        ${this.pointerType === Pointer.Line ? pointer : null}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target': ObcPoiTarget;
  }
}
