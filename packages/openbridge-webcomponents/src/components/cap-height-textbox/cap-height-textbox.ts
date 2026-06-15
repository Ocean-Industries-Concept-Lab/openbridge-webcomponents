import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './cap-height-textbox.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcCapHeightTextboxAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum ObcCapHeightTextboxSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

type sizeType = ObcCapHeightTextboxSize | keyof typeof ObcCapHeightTextboxSize;
type fontWeightType =
  | ObcCapHeightTextboxFontWeight
  | keyof typeof ObcCapHeightTextboxFontWeight;
type alignmentType =
  | ObcCapHeightTextboxAlignment
  | keyof typeof ObcCapHeightTextboxAlignment;

export enum ObcCapHeightTextboxFontWeight {
  regular = 'regular',
  semibold = 'semibold',
  bold = 'bold',
}

/**
 * `<obc-cap-height-textbox>` – A text container that renders inline text at a
 * precise, cap-height-trimmed size with configurable alignment and reservable
 * width.
 *
 * Use it to present short, read-only strings – such as values, labels, or
 * units – where vertical metrics must line up exactly across rows and the
 * horizontal footprint should stay stable while the text changes (for example
 * a numeric value that updates frequently). Synonyms: text container, value
 * box, label box.
 *
 * ## Features / Variants
 * - **Size:** `xs`, `s`, `m` (default), `l`, `xl` – each maps to a fixed cap
 *   height (16 / 20 / 24 / 32 / 40 px) so text aligns to a predictable grid.
 * - **Font weight:** `regular` (default), `semibold`, `bold`.
 * - **Alignment:** `left`, `center`, `right` (default) – positions the text
 *   within the box's width.
 * - **Hug vs. length:** `hug` (default `true`) sizes the box to its content and
 *   keeps it fully visible. Set `hug` to `false` for length mode, which fixes
 *   the box to the reserved `length` width and crops overflowing content on the
 *   side opposite `alignment` (e.g. left-aligned text is cropped at its right
 *   end).
 * - **Reserved width:** content placed in the `length` slot reserves width
 *   invisibly – a minimum width in hug mode, and the fixed, cropping width in
 *   length mode – so the box does not resize as the visible text changes.
 *
 * ## Usage Guidelines
 * - Pass the longest expected string to the `length` slot (e.g. `"888.8"` or
 *   `"Wind speed"`) so the box reserves space and does not jump in width as the
 *   visible value updates.
 * - Keep `hug` enabled for compact, content-sized placement; disable it (length
 *   mode) when the box must stay a fixed width and clip longer text.
 * - This is a display primitive for static text – use an input component for
 *   editable values.
 *
 * ## Slots
 * | Slot      | Renders when…      | Purpose                                              |
 * |-----------|--------------------|------------------------------------------------------|
 * | (default) | Always             | The visible text content.                            |
 * | `length`  | Always (invisible) | Reserves a minimum width based on its content width. |
 *
 * @slot - The visible text content.
 * @slot length - Reserves a minimum width based on its content width.
 */
@customElement('obc-cap-height-textbox')
export class ObcCapHeightTextbox extends LitElement {
  @property({type: String}) alignment: alignmentType =
    ObcCapHeightTextboxAlignment.Right;
  @property({type: String}) size: sizeType = ObcCapHeightTextboxSize.m;
  @property({type: String}) fontWeight: fontWeightType =
    ObcCapHeightTextboxFontWeight.regular;

  /**
   * When true (default), the box hugs its content and stays fully visible (the
   * `length` slot acts as a minimum width). When false (length mode), the box
   * is fixed to the `length` width and content exceeding it is cropped on the
   * side opposite `alignment`.
   */
  @property({type: Boolean, attribute: false}) hug = true;

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('hug')) {
      this.toggleAttribute('crop', !this.hug);
    }
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`alignment-${this.alignment}`]: true,
          [`size-${this.size}`]: true,
          [`font-weight-${this.fontWeight}`]: true,
        })}
      >
        <div class="content">
          <slot></slot>
        </div>
        <div class="length-spacer" aria-hidden="true">
          <slot name="length"></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-cap-height-textbox': ObcCapHeightTextbox;
  }
}
