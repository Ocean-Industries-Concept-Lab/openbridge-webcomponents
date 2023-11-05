import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import compentStyle from "./Demo.css?inline";
import "./TopBar"
import "../menus/NavigationMenu"
import "../menus/NavigationItem"
import "./BrillianceMenu"

@customElement('ob-demo')
export class Demo extends LitElement {

    @state() showBrilliance = false;
    @state() showNavigation = false;

     menuButtonClicked() {
        this.showNavigation = !this.showNavigation;
      }

  render() {
    const date = new Date().toISOString();
    return html`
        <header>
            <ob-top-bar 
                date="${date}"
                @menu-button-clicked=${this.menuButtonClicked}
                @dimming-button-clicked=${() => this.showBrilliance = !this.showBrilliance}
                        
            ></ob-top-bar>
        </header>
        <body>
            <div class="content">
                ${this.showNavigation ? html`
                <ob-navigation-menu class="navigation-menu">
                    <ob-navigation-item slot="main" icon="apps" label="Apps" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="main" checked icon="alerts" label="Alerts" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="main" icon="dimming" label="Dimming" href="#"></ob-navigation-item>
                    
                    <ob-navigation-item slot="footer" icon="support" label="Help" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="settings" label="Settings" href="#"></ob-navigation-item>
                    <ob-navigation-item slot="footer" icon="alert-list" label="Alert" href="#"></ob-navigation-item>
                    
                    <img slot="logo" src="https://via.placeholder.com/320x96" alt="logo">
                </ob-navigation-menu>
                `: undefined}
            
                ${this.showBrilliance ? html`<ob-brilliance-menu></ob-brilliance-menu>` : undefined}
            </div>
        </body>
    `
  }

  

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-demo': Demo
  }
}
