import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import compentStyle from "./demo.css?inline";
import "../top-bar/top-bar"
import "../navigation-menu/navigation-menu"
import "../navigation-item/navigation-item"
import "../brilliance-menu/brilliance-menu"

@customElement('obc-demo')
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
            <obc-top-bar 
                date="${date}"
                @menu-button-clicked=${this.menuButtonClicked}
                @dimming-button-clicked=${() => this.showBrilliance = !this.showBrilliance}
                        
            ></obc-top-bar>
        </header>
        <body>
            <div class="content">
                ${this.showNavigation ? html`
                <obc-navigation-menu class="navigation-menu">
                    <obc-navigation-item slot="main" icon="01-apps" label="Apps" href="#"></obc-navigation-item>
                    <obc-navigation-item slot="main" checked icon="14-alerts" label="Alerts" href="#"></obc-navigation-item>
                    <obc-navigation-item slot="main" icon="04-dimming" label="Dimming" href="#"></obc-navigation-item>
                    
                    <obc-navigation-item slot="footer" icon="03-support" label="Help" href="#"></obc-navigation-item>
                    <obc-navigation-item slot="footer" icon="03-settings" label="Settings" href="#"></obc-navigation-item>
                    <obc-navigation-item slot="footer" icon="08-alert-list" label="Alert" href="#"></obc-navigation-item>
                    
                    <img slot="logo" src="https://via.placeholder.com/320x96" alt="logo">
                </obc-navigation-menu>
                `: undefined}
            
                ${this.showBrilliance ? html`<obc-brilliance-menu></obc-brilliance-menu>` : undefined}
            </div>
        </body>
    `
  }

  

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-demo': Demo
  }
}
