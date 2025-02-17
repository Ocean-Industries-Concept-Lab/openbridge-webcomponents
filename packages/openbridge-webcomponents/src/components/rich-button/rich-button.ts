import {LitElement, nothing, unsafeCSS} from 'lit';
import {literal, html} from 'lit/static-html.js';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './rich-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {SlotController} from '../../slot-controller';

export enum ObcRichButtonPosition {
  Regular = 'regular',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'center',
}

export enum ObcRichButtonSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}

@customElement('obc-rich-button')
export class ObcRichButton extends LitElement {
  @property({type: String}) position: ObcRichButtonPosition =
    ObcRichButtonPosition.Regular;
  @property({type: String}) size: ObcRichButtonSize =
    ObcRichButtonSize.SingleLine;
  @property({type: Boolean}) info = false;
  @property({type: Boolean}) graphicBorder = false;
  @property({type: Boolean}) border = false;
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
  private actionSlotController: SlotController = new SlotController(
    this,
    'action'
  );

  override render() {
    const tag = this.href ? literal`a` : literal`button`;
    return html`
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
          'has-action': this.actionSlotController.hasAssignedElements,
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
                  this.size === ObcRichButtonSize.SingleLine
                    ? nothing
                    : html`<slot name="description"></slot>`
                }
              </div>
            </div>
            <div class="status">
              <slot name="status"></slot>
            </div>
            <div class="action">
              <slot name="action"></slot>
            </div>
            <div class="trailing-icon">
              <slot name="trailing-icon"></slot>
            </div>
          </div>
        </${tag}>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-button': ObcRichButton;
  }
}
