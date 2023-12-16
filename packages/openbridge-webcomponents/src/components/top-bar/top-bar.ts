import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import compentStyle from "./top-bar.css?inline";
import "../icon-button/icon-button"
import "../clock/clock"
import "../divider/divider"
import "../breadcrumb/breadcrumb"
import { BreadcrumbItem } from '../breadcrumb/breadcrumb';

@customElement('obc-top-bar')
export class TopBar extends LitElement {

  @property({ type: String }) title = 'App'
  @property({ type: String }) pageName = 'Page'
  @property({ type: String }) date = "2021-01-01T11:11:11.111Z"
  @property({ type: Boolean }) wideMenuButton = false;
  @property({ type: Boolean }) showAppsButton = false;
  @property({ type: Boolean }) showDimmingButton = false;
  @property({ type: Boolean }) showAlertsButton = false;
  @property({ type: Boolean }) showClock = false;
  @property({ type: Boolean }) inactive = false;
  @property({ type: Boolean }) sizeSmall = false;
  @property({ type: Boolean }) settings = false;
  @property({ type: Array }) breadcrumbItems: BreadcrumbItem[] = [];

  private menuButtonClicked() {
    this.dispatchEvent(new CustomEvent('menu-button-clicked'));
  }

  private alertsButtonClicked() {
    this.dispatchEvent(new CustomEvent('alerts-button-clicked'));
  }

  private dimmingButtonClicked() {
    this.dispatchEvent(new CustomEvent('dimming-button-clicked'));
  }

  private appsButtonClicked() {
    this.dispatchEvent(new CustomEvent('apps-button-clicked'));
  }

  private leftMoreButtonClicked() {
    this.dispatchEvent(new CustomEvent('left-more-button-clicked'));
  }

  render() {
    let leftGroup = [];
    if (this.settings) {
      leftGroup.push(html`<div class="menu-button"><obc-icon-button icon="01-close" variant="flat" @click=${this.dispatchEvent(new CustomEvent('close'))}></obc-icon-button></div>`);
      leftGroup.push(html`<obc-divider></obc-divider>`);
      leftGroup.push(html`<obc-icon-button icon="02-arrow-back" variant="flat" cornerLeft @click=${this.dispatchEvent(new CustomEvent('back'))}></obc-icon-button>`);
      leftGroup.push(html`<obc-icon-button icon="02-arrow-forward" variant="flat" cornerRight @click=${this.dispatchEvent(new CustomEvent('forward'))}></obc-icon-button>`);
      leftGroup.push(html`<obc-divider></obc-divider>`);
      leftGroup.push(html`<div class="title">${this.title}</div>`);
      leftGroup.push(html`<obc-breadcrumb .items=${this.breadcrumbItems}></obc-breadcrumb>`);
    } else {
      if (!this.inactive) {
        leftGroup.push(
          html`<div class="menu-button ${this.wideMenuButton ? 'wide' : null}">
                  <obc-icon-button icon="01-menu" variant="flat" @click=${this.menuButtonClicked}></obc-icon-button>
                </div>`);
      }
      if (!this.sizeSmall) {
        leftGroup.push(html`<div class="title">${this.title}</div>`);
      }
      leftGroup.push(html`<div class="page-name">${this.pageName}</div>`);
    }


    return html`
      <nav class=${classMap({
      wrapper: true,
      inactive: this.inactive,
      small: this.sizeSmall,
      settings: this.settings,
    })}
      >
        <div class="left group">
          ${leftGroup}
        </div>
        <div class="right group">
          ${this.showClock ? html`<obc-clock date="${this.date}" ?showDate=${!this.sizeSmall}></obc-clock>` : null}
          <obc-icon-button icon="14-alerts" variant="flat" @click=${this.alertsButtonClicked}></obc-icon-button>
          ${this.showDimmingButton && !this.inactive && !this.sizeSmall ? html`<obc-icon-button icon="04-dimming" variant="flat" @click=${this.dimmingButtonClicked}></obc-icon-button>` : null}
          ${this.showAppsButton && !this.inactive && !this.sizeSmall ? html`<obc-icon-button icon="01-apps" variant="flat" @click=${this.appsButtonClicked}></obc-icon-button>` : null}
          ${this.sizeSmall ? html`<obc-icon-button icon="01-more-vertical" variant="flat" @click=${this.leftMoreButtonClicked}></obc-icon-button>` : null}
        </div>
      </nav>
    `




  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-top-bar': TopBar
  }
}
