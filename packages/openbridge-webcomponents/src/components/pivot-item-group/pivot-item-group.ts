import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import componentStyle from "./pivot-item-group.css?inline";
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ObcPivotItemDirection, ObcPivotItem } from '../pivot-item/pivot-item.js'

@customElement('obc-pivot-item-group')
export class ObcPivotItemGroup extends LitElement {
  @property({type: String}) direction: ObcPivotItemDirection = ObcPivotItemDirection.horizontal;
  @property({type: String}) selectedValue = '';
  @property({type: Boolean}) allowDeselect = false;

  private handleItemSelected(event: CustomEvent) {
    event.stopPropagation();
    const { value } = event.detail;
    
    if (this.allowDeselect && this.selectedValue === value) {
      this.selectedValue = '';
    } else {
      this.selectedValue = value;
    }
    
    this.updateChildItems();
    
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { selectedValue: this.selectedValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  private updateChildItems() {
    const items = this.querySelectorAll('obc-pivot-item') as NodeListOf<ObcPivotItem>;
    
    items.forEach((item) => {
      item.selected = item.value === this.selectedValue;
      item.direction = this.direction;
    });
  }

  override firstUpdated() {
    // Wait for slotted content to be available
    this.updateComplete.then(() => {
      this.updateChildItems();
    });
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('selectedValue') || changedProperties.has('direction')) {
      this.updateChildItems();
    }
  }

  override render() {
    const classes = classMap({
      'pivot-group': true,
      'direction-horizontal': this.direction === ObcPivotItemDirection.horizontal,
      'direction-vertical': this.direction === ObcPivotItemDirection.vertical,
    });

    return html`
      <div class=${classes} 
           @selected=${this.handleItemSelected}>
        <slot></slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}