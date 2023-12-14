import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import compentStyle from "./app-menu.css?inline";
import '../input/input';
import '../app-button/app-button';

export interface MenuItem {
    id: string;
    name: string;
    icon: string;
}

@customElement('ob-app-menu')
export class AppMenu extends LitElement {
    @property({ type: Array<MenuItem> }) items: Array<MenuItem> = [];
    @property({ type: String }) selectedItemId: string = '';
    @state() private _search = ''

    onSearchInput(e: Event) {
        this._search = (e.target as HTMLInputElement).value;
    }

    onAppButtonClick(item: MenuItem) {
        this.dispatchEvent(new CustomEvent('app-selected', { detail: item }));
    }

    render() {
        const filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this._search.toLowerCase()));
        return html`
        <div class="card">
            <ob-input placeholder="Search" icon="01-search" @input=${this.onSearchInput}></ob-input>
            <div class="main-apps">
                ${filteredItems.map(item => html`
                    <ob-app-button icon=${item.icon} label=${item.name} ?checked=${item.id===this.selectedItemId} @click=${() => this.onAppButtonClick(item)}></ob-app-button>
                `)}
            </div>
        </div>
    `
    }

    static styles = unsafeCSS(compentStyle);
}

declare global {
    interface HTMLElementTagNameMap {
        'ob-app-menu': AppMenu
    }
}
