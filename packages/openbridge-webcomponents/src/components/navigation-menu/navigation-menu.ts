import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './navigation-menu.css?inline';
import {ObcNavigationItemGroup} from '../navigation-item-group/navigation-item-group';

export enum ObcNavigationMenuVariant {
  Full = 'full',
  IconOnly = 'icon-only',
  Compact = 'compact',
}

@customElement('obc-navigation-menu')
export class ObcNavigationMenu extends LitElement {
  @property({type: String}) variant: ObcNavigationMenuVariant =
    ObcNavigationMenuVariant.Full;

  findAllGroups(el: Element): ObcNavigationItemGroup[] {
    const subGroups: ObcNavigationItemGroup[] = [];
    for (const child of el.children) {
      if (child.tagName.toLowerCase() === 'obc-navigation-item-group') {
        subGroups.push(child as ObcNavigationItemGroup);
      } else {
        subGroups.push(...this.findAllGroups(child));
      }
    }
    return subGroups;
  }

  registerGroup(groups: ObcNavigationItemGroup[]) {
    groups.forEach((group) => {
      group.addEventListener('open', () => {
        groups.forEach((g) => {
          if (g !== group) {
            g.close();
          }
        });
      });
      const subGroups = this.findAllGroups(group);
      this.registerGroup(subGroups);
    });
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    const groups = this.findAllGroups(this);
    this.registerGroup(groups);
  }

  override render() {
    return html`
      <div class="wrapper ${this.variant}">
        <nav class="main">
          <ol>
            <slot name="main"></slot>
          </ol>
        </nav>
        <div class="footer">
          <nav>
            <ol>
              <slot name="footer"></slot>
            </ol>
          </nav>
          ${this.variant === ObcNavigationMenuVariant.Full
            ? html`<div class="logo">
                <slot name="logo"></slot>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-menu': ObcNavigationMenu;
  }
}
