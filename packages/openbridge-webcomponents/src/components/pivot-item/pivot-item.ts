import { LitElement, html, nothing, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import compentStyle from "./pivot-item.css?inline";

export enum ObcPivotItemDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

@customElement('obc-pivot-item')
export class ObcPivotItem extends LitElement {
  @property({type: String}) value = '';
  @property({type: Boolean, reflect: true}) selected = false;
  @property({type: String}) direction: ObcPivotItemDirection = ObcPivotItemDirection.horizontal;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasLabel = false;
  @property({type: String}) label = '';
  @property({type: Boolean}) hasDivider = false;
  @property({type: Boolean}) disabled = false;

  private onClick() {
    // Don't allow clicking if disabled OR already selected
    if (this.disabled || this.selected) {
      return;
    }
    
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    const isVertical = this.direction === ObcPivotItemDirection.vertical;
    const shouldShowLabel = this.hasLabel && this.label.trim().length > 0;

    const classes = classMap({
      wrapper: true,
      selected: this.selected,
      'direction-vertical': isVertical,
      'direction-horizontal': !isVertical,
      'has-leading-icon': this.hasLeadingIcon,
      'has-label': this.hasLabel,
      'has-divider': this.hasDivider,
      disabled: this.disabled,
    });

    return html`
      <button 
        class=${classes} 
        @click=${this.onClick}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
      >
        <div class="visible-wrapper">
          <div class="placeholder">
            <div class="icon-label-container">
              ${this.hasLeadingIcon 
                ? html`<div class="icon">
                         <slot name="icon"></slot>
                       </div>`
                : nothing}
              
              ${shouldShowLabel 
                ? html`<div class="label">${this.label}</div>`
                : nothing}
            </div>
          </div>
        </div>
        
        <div class="selected-container">
          <div class="active-tab-stroke"></div>
        </div>
        
        ${this.hasDivider && !this.selected 
          ? html`<div class="bottom-divider"></div>` 
          : nothing}
      </button>
    `
  }

  static override styles = unsafeCSS(compentStyle);
}