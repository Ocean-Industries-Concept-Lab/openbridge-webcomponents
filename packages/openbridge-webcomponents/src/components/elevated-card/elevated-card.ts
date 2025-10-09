import {LitElement, nothing, unsafeCSS} from 'lit';
import {literal, html} from 'lit/static-html.js';
import {property} from 'lit/decorators.js';
import compentStyle from './elevated-card.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import '../button/button.js';
import {customElement} from '../../decorator.js';

/**
 * Enum for the available card positions.
 * - `regular`: Default position, used for standalone cards.
 * - `top`: Card is visually grouped at the top of a section or stack.
 * - `bottom`: Card is visually grouped at the bottom of a section or stack.
 * - `center`: Card is visually grouped in the middle of a section or stack.
 */
export enum ObcElevatedCardPosition {
  Regular = 'regular',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'center',
}

/**
 * Enum for the available card sizes.
 * - `single-line`: Compact card with only a label.
 * - `double-line`: Card with a label and a single-line description.
 * - `multi-line`: Card with a label and a multi-line description.
 */
export enum ObcElevatedCardSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}

/**
 * Enum for the HTML tag used to render the card.
 * - `button`: Renders as a <button> (default for clickable cards).
 * - `a`: Renders as an <a> anchor (when `href` is set).
 * - `article`: Renders as an <article> (for non-interactive or action cards).
 * - `div`: Renders as a <div> (generic container).
 */
export enum ObcElevatedCardTag {
  Button = 'button',
  Anchor = 'a',
  Article = 'article',
  Div = 'div',
}

/**
 * `<obc-elevated-card>` – A versatile, elevated card component for presenting grouped content, actions, or navigation in a visually distinct container.
 *
 * The elevated card provides a flexible surface for displaying information, icons, status, and optional actions. It supports multiple layouts (single, double, or multi-line), can include leading/trailing icons, and adapts to different positions within a section or stack. Cards can be interactive (clickable, link) or static, and may include a prominent graphic or status indicator.
 *
 * Appears as a raised surface to emphasize content or group related information, and is commonly used for navigation, selection, or summarizing details in a list or dashboard.
 *
 * ## Features
 * - **Position variants:**
 *   - `regular` (default): Standard card, not visually grouped.
 *   - `top`, `bottom`, `center`: Visually groups cards for stacked layouts (e.g., lists or sections).
 * - **Size options:**
 *   - `single-line`: Label only, compact.
 *   - `double-line`: Label + single-line description.
 *   - `multi-line`: Label + multi-line description.
 * - **Interactive or static:**
 *   - Clickable by default (renders as `<button>` or `<a>` if `href` is set).
 *   - Set `notClickable` for a static card (renders as `<article>`).
 *   - Use `overrideTag` to force a specific HTML tag.
 * - **Icons and graphics:**
 *   - Leading icon (`leading-icon` slot).
 *   - Trailing icon (`trailing-icon` slot).
 *   - Optional graphic area at the top (`graphic` slot), with optional border.
 * - **Status and actions:**
 *   - Status indicator (`status` slot).
 *   - Optional action button (`action` slot) for primary card actions.
 * - **Styling options:**
 *   - `border`: Adds a border to visually separate cards in a stack.
 *   - `graphicBorder`: Adds a border below the graphic area.
 *   - `info`: Applies an informational style to the card.
 * - **Link support:**
 *   - Set `href` and `target` to render as a link.
 *
 * ## Usage Guidelines
 * Use `obc-elevated-card` to group related content, present navigation options, or highlight key information in a list or dashboard.
 * - Ideal for presenting summaries, selectable items, or actionable content.
 * - Use the `action` slot for a primary card action (e.g., "View", "Edit").
 * - Use `position` to visually group cards in a stack (e.g., top/middle/bottom).
 * - For non-interactive cards (purely informational), set `notClickable` or use `overrideTag="article"`.
 * - For navigation, set `href` to make the card a link.
 * - Use `graphic` for prominent illustrations or icons at the top of the card.
 * - For simple labels or navigation, use `single-line` or `double-line` size.
 * - For more detailed content, use `multi-line` size with a description.
 *
 * **TODO(designer):** Confirm best practices for when to use each position variant (`top`, `bottom`, `center`) and recommended use of `graphic` vs. leading icon.
 *
 * ## Slots
 *
 * | Slot Name        | Renders When...             | Purpose                                                      |
 * |------------------|----------------------------|--------------------------------------------------------------|
 * | `graphic`        | `hasGraphic` is true        | Prominent graphic or illustration at the top of the card     |
 * | `leading-icon`   | `hasLeadingIcon` is true    | Icon displayed before the label                              |
 * | `label`          | Always                      | Main label or title of the card                              |
 * | `description`    | `size` is not single-line   | Additional description text (single or multi-line)           |
 * | `status`         | `hasStatus` is true         | Status indicator or supplementary info                       |
 * | `action`         | `hasAction` is true         | Content for the action button (e.g., label or icon)          |
 * | `trailing-icon`  | `hasTrailingIcon` is true   | Icon displayed after the content                             |
 *
 * ## Events
 * - `action-click` – Fired when the action button is clicked.
 *
 * ## Best Practices & Constraints
 * - Only use one primary action per card to keep interactions clear.
 * - For stacked layouts, use `position` and `border` to visually group cards.
 * - Use `graphic` for cards that need a strong visual or illustration.
 * - Use `notClickable` for informational cards that should not be interactive.
 * - If both `hasAction` and `notClickable` are set, the card is rendered as static with an action button.
 * - When using as a link, set both `href` and `target` as needed.
 * - The `overrideTag` property allows advanced control over the rendered HTML element.
 *
 * ## Example
 *
 * ```html
 * <obc-elevated-card position="regular" size="double-line" hasLeadingIcon hasTrailingIcon>
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 *   <div slot="label">Title</div>
 *   <div slot="description">Description with multiple lines of text.</div>
 *   <obi-chevron-right-google slot="trailing-icon"></obi-chevron-right-google>
 * </obc-elevated-card>
 * ```
 *
 * @slot graphic - Prominent graphic or illustration at the top of the card (shown when `hasGraphic` is true)
 * @slot leading-icon - Icon displayed before the label (shown when `hasLeadingIcon` is true)
 * @slot label - Main label or title of the card (always shown)
 * @slot description - Additional description text (shown when `size` is not single-line)
 * @slot status - Status indicator or supplementary info (shown when `hasStatus` is true)
 * @slot action - Content for the action button (shown when `hasAction` is true)
 * @slot trailing-icon - Icon displayed after the content (shown when `hasTrailingIcon` is true)
 * @fires action-click - Fired when the action button is clicked
 */
@customElement('obc-elevated-card')
export class ObcElevatedCard extends LitElement {
  /**
   * Controls the card's visual grouping and border radius.
   * - `regular` (default): Standard card, not visually grouped.
   * - `top`: Card is visually grouped at the top of a section or stack.
   * - `bottom`: Card is visually grouped at the bottom of a section or stack.
   * - `center`: Card is visually grouped in the middle of a section or stack.
   */
  @property({type: String}) position: ObcElevatedCardPosition =
    ObcElevatedCardPosition.Regular;

  /**
   * Controls the card's content layout:
   * - `single-line`: Label only, compact.
   * - `double-line`: Label + single-line description.
   * - `multi-line`: Label + multi-line description.
   * Default is `single-line`.
   */
  @property({type: String}) size: ObcElevatedCardSize =
    ObcElevatedCardSize.SingleLine;

  /**
   * Overrides the HTML tag used to render the card.
   * - `button`: Renders as a <button> (default for clickable cards).
   * - `a`: Renders as an <a> anchor (when `href` is set).
   * - `article`: Renders as an <article> (for non-interactive or action cards).
   * - `div`: Renders as a <div> (generic container).
   * If not set, the tag is determined automatically based on `href` and `notClickable`.
   */
  @property({type: String}) overrideTag: ObcElevatedCardTag | undefined;

  /**
   * If true, the card is rendered as a static (non-clickable) element.
   * When set, the card uses `<article>` as its tag unless overridden.
   * Useful for informational or status cards that should not be interactive.
   */
  @property({type: Boolean}) notClickable = false;

  /**
   * Applies an informational style to the card.
   * When true, the card uses the "info" visual style.
   */
  @property({type: Boolean}) info = false;

  /**
   * If true, adds a border below the graphic area (when present).
   * Used to visually separate the graphic from the card content.
   */
  @property({type: Boolean}) graphicBorder = false;

  /**
   * If true, adds a border to the card (top or bottom, depending on position).
   * Useful for visually separating cards in a stack.
   */
  @property({type: Boolean}) border = false;

  /**
   * If true, displays an action button in the card.
   * The button's content is provided via the `action` slot.
   * When set, the card is rendered as static (`notClickable` is forced true).
   */
  @property({type: Boolean}) hasAction = false;

  /**
   * If true, displays a leading icon before the label.
   * The icon is provided via the `leading-icon` slot.
   */
  @property({type: Boolean}) hasLeadingIcon: boolean = false;

  /**
   * If true, displays a trailing icon after the content.
   * The icon is provided via the `trailing-icon` slot.
   */
  @property({type: Boolean}) hasTrailingIcon: boolean = false;

  /**
   * If true, displays a prominent graphic at the top of the card.
   * The graphic is provided via the `graphic` slot.
   */
  @property({type: Boolean}) hasGraphic: boolean = false;

  /**
   * If true, displays a status indicator in the card.
   * The status content is provided via the `status` slot.
   */
  @property({type: Boolean}) hasStatus: boolean = false;

  @property({type: Boolean}) compact = false;

  @property({type: Boolean}) directAction = false;

  /**
   * If set, the card is rendered as a link (`<a>`) with this URL as the `href`.
   * When present, the card is clickable and navigates to the specified URL.
   */
  @property({type: String}) href?: string;

  /**
   * Specifies the target for the link when `href` is set (e.g., `_blank`).
   */
  @property({type: String}) target?: string;

  override render() {
    let tag = this.href ? literal`a` : literal`button`;
    tag = this.notClickable ? literal`article` : tag;
    if (this.overrideTag !== undefined) {
      switch (this.overrideTag) {
        case ObcElevatedCardTag.Anchor:
          tag = literal`a`;
          break;
        case ObcElevatedCardTag.Button:
          tag = literal`button`;
          break;
        case ObcElevatedCardTag.Article:
          tag = literal`article`;
          break;
        case ObcElevatedCardTag.Div:
          tag = literal`div`;
          break;
        default:
          throw new Error('Invalid tag');
      }
    }
    if (this.hasAction) {
      tag = literal`article`;
      this.notClickable = true;
    }
    return html`
    <div class="wrapper ${this.position}">
        <${tag} class=${classMap({
          button: true,
          [this.position]: true,
          [this.size]: true,
          'graphic-border': this.graphicBorder,
          info: this.info,
          border: this.border,
          'has-leading-icon': this.hasLeadingIcon,
          'has-trailing-icon': this.hasTrailingIcon,
          'has-graphic': this.hasGraphic,
          'has-status': this.hasStatus,
          'not-clickable': this.notClickable,
          'has-action': this.hasAction,
          compact: this.compact,
          'direct-action': this.directAction,
        })}
        part="wrapper" href=${ifDefined(this.href)} target=${ifDefined(this.target)}>
          ${this.hasGraphic ? html`<div class="graphic"><slot name="graphic"></slot></div>` : nothing}
          <div class="content-container" part="content-container">
            <div class="container-content">
              ${
                this.hasLeadingIcon
                  ? html`<div class="leading-icon" part="leading-icon">
                      <slot name="leading-icon"></slot>
                    </div>`
                  : nothing
              }
              <div class="content" part="label">
                <slot name="label"></slot>
                ${
                  this.size === ObcElevatedCardSize.SingleLine
                    ? nothing
                    : html`<slot name="description"></slot>`
                }
              </div>
            </div>
            ${
              this.hasStatus
                ? html`<div class="status" part="status">
                    <slot name="status"></slot>
                  </div>`
                : nothing
            }
            ${
              this.hasAction
                ? html`<obc-button
                    variant="normal"
                    class="action"
                    part="action"
                    @click=${() => {
                      this.dispatchEvent(new CustomEvent('action-click'));
                    }}
                  >
                    <slot name="action"></slot>
                  </obc-button>`
                : nothing
            }
            ${
              this.hasTrailingIcon
                ? html`<div class="trailing-icon" part="trailing-icon">
                    <slot name="trailing-icon"></slot>
                  </div>`
                : nothing
            }
          </div>
        </${tag}>
        </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-elevated-card': ObcElevatedCard;
  }
}
