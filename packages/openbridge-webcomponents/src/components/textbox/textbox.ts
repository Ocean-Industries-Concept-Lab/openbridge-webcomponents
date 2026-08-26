import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './textbox.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcTextboxAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum ObcTextboxSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

export enum ObcTextboxFontWeight {
  regular = 'regular',
  semibold = 'semibold',
  bold = 'bold',
}

/**
 * `<obc-textbox>` – A text container that renders inline text at a
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
 * - **Size:** `xs`, `s`, `m` (default), `l`, `xl` – each maps to a fixed box
 *   height (16 / 20 / 24 / 32 / 40 px) with 4px padding above and below, giving
 *   cap heights of 8 / 12 / 16 / 24 / 32 px so text aligns to a predictable
 *   grid.
 * - **Font weight:** `regular` (default), `semibold`, `bold`.
 * - **Tabular numbers:** `tabularNums` (default off) renders digits as
 *   fixed-width, lining numerals (`tabular-nums lining-nums` + the `ss04`/`tnum`/
 *   `lnum` features) so numeric values stay column-aligned and stable in width
 *   as they update – use it for readouts and other live numeric displays.
 * - **Alignment:** `left`, `center`, `right` (default) – positions the text
 *   within the box's width when the box is wider than the content.
 * - **Reserved width:** content placed in the `length` slot reserves a minimum
 *   width invisibly, so the box does not resize as the visible text changes.
 *   The box always shows all content – it never crops.
 *
 * ## Usage Guidelines
 * - Pass the longest expected string to the `length` slot (e.g. `"888.8"` or
 *   `"Wind speed"`) so the box reserves space and does not jump in width as the
 *   visible value updates.
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
 * @experimental
 */
@customElement('obc-textbox')
export class ObcTextbox extends LitElement {
  @property({type: String}) alignment: ObcTextboxAlignment =
    ObcTextboxAlignment.Right;
  @property({type: String}) size: ObcTextboxSize = ObcTextboxSize.m;
  @property({type: String}) fontWeight: ObcTextboxFontWeight =
    ObcTextboxFontWeight.regular;
  @property({type: Boolean}) tabularNums = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`alignment-${this.alignment}`]: true,
          [`size-${this.size}`]: true,
          [`font-weight-${this.fontWeight}`]: true,
          'tabular-nums': this.tabularNums,
        })}
      >
        <div class="inner-wrapper">
          <div class="content">
            <slot></slot>
          </div>
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
    'obc-textbox': ObcTextbox;
  }
}
