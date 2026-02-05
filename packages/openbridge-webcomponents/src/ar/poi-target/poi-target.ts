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
  ObcPoiTargetButtonData,
  ObcPoiTargetButtonHeader,
  PoiTargetButtonVisualState,
} from '../poi-target-button/poi-target-button.js';
import {customElement} from '../../decorator.js';

export enum TargetState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

function stateToPointerStyle(state: TargetState): POIStyle {
  let style = null;
  switch (state) {
    case TargetState.Enabled:
      style = POIStyle.Normal;
      break;
    case TargetState.Caution:
    case TargetState.Warning:
    case TargetState.Alarm:
      style = POIStyle.Enhanced;
      break;
    default:
      throw new Error(`State has no style: ${style}`);
  }
  return style;
}

export enum Pointer {
  Line = 'line',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  None = 'null',
}

export {PoiTargetButtonVisualState as PoiTargetValue};

/**
 * `<obc-poi-target>` renders a point-of-interest marker with a selectable target
 * button and optional pointer line.
 *
 * Use this component inside `obc-poi-layer` or `obc-poi-group` to
 * position targets in AR layers and present status or selection state for a
 * detection or tracked object.
 *
 * ### Features
 * - Positions via `x` and a configurable pointer line.
 * - Visual emphasis controlled by `value` (see `PoiTargetValue`).
 * - Alarm state controlled by `state` (enabled, caution, warning, alarm).
 * - Multi-value button rendering via the `data` array.
 * - Horizontal nudging via `buttonOffsetX` for overlap or crossing layouts.
 * - Supports alert, selection, and pointer variants.
 *
 * ### Usage Guidelines
 * - Set `x` in pixels to place the target relative to its container.
 * - Use `height` to set the target/button position:
 *   - When `fixed-target=true`: height is where the line bottom should be (target position)
 *   - When `fixed-target=false`: height is where the button should be (button position)
 * - Use `y` for the pointer line length (distance from button to target).
 * - Set `fixed-target` to `false` for layer mode (button position fixed, line extends) - default.
 * - Set `fixed-target` to `true` for standalone/CV mode (target position fixed, button moves).
 * - Use `value` to align with layer or group overlap logic (unchecked, overlapped, etc.).
 * - Use `state` to set alarm level (enabled, caution, warning, alarm).
 * - Provide `data` to display secondary statuses on the button.
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
 * - Prefer `PoiTargetValue` enum values over manual styling.
 *
 * ### Example
 * ```html
 * <obc-poi-target x="120" height="200" y="192"></obc-poi-target>
 * ```
 *
 * @slot none
 * @fires none - This component does not emit custom events.
 */

@customElement('obc-poi-target')
export class ObcPoiTarget extends LitElement {
  @property({type: Number}) x = 0;
  @property({type: Number}) height: number | null = null;
  @property({type: Number}) y = 192;
  @property({type: Boolean}) selected = false;
  @property({type: Object}) header: ObcPoiTargetButtonHeader | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true})
  value: PoiTargetButtonVisualState = PoiTargetButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiTargetButtonType.Button;
  @property({type: String}) state: TargetState = TargetState.Enabled;
  @property({type: String}) pointerType: Pointer = Pointer.Line;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) offset = 0;
  @property({type: Number, attribute: 'top-offset'}) topOffset = 0;
  @property({type: Number}) buttonOffsetX = 0;
  @property({type: Boolean, attribute: 'allow-button-transition'})
  allowButtonTransition = false;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.style.left = `${this.x}px`;
    }
    if (
      changedProperties.has('height') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget')
    ) {
      this.updatePosition();
    }
  }

  private updatePosition() {
    if (this.fixedTarget) {
      // Fixed target mode: target position (height) is fixed, button position = height - y
      if (typeof this.height === 'number' && Number.isFinite(this.height)) {
        const lineLength = Number.isFinite(this.y) ? this.y : 0;
        this.style.top = `${this.height - lineLength}px`;
      } else {
        this.style.removeProperty('top');
      }
    } else {
      // Fixed button mode: button position is fixed
      // If height is set, use it as the button position
      // Otherwise, let CSS handle positioning (e.g., in layers with bottom: 0)
      if (typeof this.height === 'number' && Number.isFinite(this.height)) {
        this.style.top = `${this.height}px`;
      } else {
        this.style.removeProperty('top');
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
  data: ObcPoiTargetButtonData[] = [];

  override render() {
    let pointer = null;
    let verticalOffset = 0;
    const lineOffset = this.offset - this.topOffset;
    const lineLength = Number.isFinite(this.y) ? this.y : 0;
    const lineBottom = lineLength;

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
            class="line"
            height=${lineLength + verticalOffset}
            poiStyle=${stateToPointerStyle(this.state)}
            .offset=${lineOffset}
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
        ?data-no-transition=${!this.allowButtonTransition &&
        (this.buttonOffsetX !== 0 || this.offset !== 0 || this.topOffset !== 0)}
        style=${[
          `--obc-poi-target-line-height: ${lineLength}px; --obc-poi-target-line-bottom: ${lineBottom}px;`,
          this.buttonOffsetX !== 0
            ? `--obc-poi-target-button-offset-x: ${this.buttonOffsetX}px; --poi-offset: ${this.buttonOffsetX}px;`
            : '',
          this.topOffset !== 0
            ? `--obc-poi-target-top-offset-x: ${this.topOffset}px;`
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <obc-poi-target-button
          .relativeDirection=${this.relativeDirection}
          .selected=${this.selected}
          .header=${this.header}
          .alertType=${this.alertType}
          .value=${this.value}
          .type=${this.type}
          .data=${this.data}
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
