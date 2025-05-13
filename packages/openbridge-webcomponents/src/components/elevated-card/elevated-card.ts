import {LitElement, nothing, unsafeCSS} from 'lit';
import {literal, html} from 'lit/static-html.js';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './elevated-card.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {SlotController} from '../../slot-controller.js';
import '../button/button.js';

export enum ObcElevatedCardPosition {
  Regular = 'regular',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'center',
}

export enum ObcElevatedCardSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}

export enum ObcElevatedCardTag {
  Button = 'button',
  Anchor = 'a',
  Article = 'article',
  Div = 'div',
}

/**
 * @fires action-click - Fired when the action button is clicked
 */
@customElement('obc-elevated-card')
export class ObcElevatedCard extends LitElement {
  @property({type: String}) position: ObcElevatedCardPosition =
    ObcElevatedCardPosition.Regular;
  @property({type: String}) size: ObcElevatedCardSize =
    ObcElevatedCardSize.SingleLine;
  @property({type: String}) overrideTag: ObcElevatedCardTag | undefined;
  @property({type: Boolean}) notClickable = false;
  @property({type: Boolean}) info = false;
  @property({type: Boolean}) graphicBorder = false;
  @property({type: Boolean}) border = false;
  @property({type: Boolean}) hasAction = false;
  @property({type: String}) href?: string;
  @property({type: String}) target?: string;

  private leadingIconSlotController: SlotController = new SlotController(
    this,
    'leading-icon'
  );
  private trailingIconSlotController: SlotController = new SlotController(
    this,
    'trailing-icon'
  );
  private graphicSlotController: SlotController = new SlotController(
    this,
    'graphic'
  );
  private statusSlotController: SlotController = new SlotController(
    this,
    'status'
  );

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
          'has-leading-icon':
            this.leadingIconSlotController.hasAssignedElements,
          'has-trailing-icon':
            this.trailingIconSlotController.hasAssignedElements,
          'has-graphic': this.graphicSlotController.hasAssignedElements,
          'has-status': this.statusSlotController.hasAssignedElements,
          'not-clickable': this.notClickable,
          'has-action': this.hasAction,
        })}
        part="wrapper" href=${ifDefined(this.href)} target=${ifDefined(this.target)}>
          <div class="graphic"><slot name="graphic"></slot></div>
          <div class="content-container">
            <div class="container-content">
              <div class="leading-icon">
                <slot name="leading-icon"></slot>
              </div>
              <div class="content">
                <slot name="label"></slot>
                ${
                  this.size === ObcElevatedCardSize.SingleLine
                    ? nothing
                    : html`<slot name="description"></slot>`
                }
              </div>
            </div>
            <div class="status">
              <slot name="status"></slot>
            </div>
            ${
              this.hasAction
                ? html`<obc-button
                    variant="normal"
                    class="action"
                    @click=${() => {
                      this.dispatchEvent(new CustomEvent('action-click'));
                    }}
                  >
                    <slot name="action"></slot>
                  </obc-button>`
                : nothing
            }
            <div class="trailing-icon">
              <slot name="trailing-icon"></slot>
            </div>
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
