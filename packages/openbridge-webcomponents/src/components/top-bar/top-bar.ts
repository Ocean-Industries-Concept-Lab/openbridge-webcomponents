import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './top-bar.style';
import '../icon-button/icon-button';
import '../clock/clock';
import '../divider/divider';
import '../breadcrumb/breadcrumb';
import '../../icons/icon-01-menu';
import '../../icons/icon-01-close';
import '../../icons/icon-02-arrow-back';
import '../../icons/icon-02-arrow-forward';
import '../../icons/icon-04-dimming';
import '../../icons/icon-01-apps';
import '../../icons/icon-01-more-vertical';
import {BreadcrumbItem} from '../breadcrumb/breadcrumb';

/**
 * Top bar component
 *
 * @fires menu-button-clicked - Menu button clicked
 */
@customElement('obc-top-bar')
export class TopBar extends LitElement {
  @property({type: String}) appTitle = 'App';
  @property({type: String}) pageName = 'Page';
  @property({type: String}) date = '2021-01-01T11:11:11.111Z';
  @property({type: Boolean, attribute: 'wide-menu-button'}) wideMenuButton =
    false;
  @property({type: Boolean, attribute: 'show-apps-button'}) showAppsButton =
    false;
  @property({type: Boolean, attribute: 'show-dimming-button'})
  showDimmingButton = false;
  @property({type: Boolean, attribute: 'show-clock'}) showClock = false;
  @property({type: Boolean}) inactive = false;
  @property({type: Boolean, attribute: 'size-small'}) sizeSmall = false;
  @property({type: Boolean}) settings = false;
  @property({type: Array, attribute: 'breadcrumb-items'})
  breadcrumbItems: BreadcrumbItem[] = [];

  private menuButtonClicked() {
    this.dispatchEvent(new CustomEvent('menu-button-clicked'));
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

  override render() {
    const leftGroup = [];
    if (this.settings) {
      leftGroup.push(
        html`<div class="menu-button">
          <obc-icon-button
            variant="flat"
            @click=${() => this.dispatchEvent(new CustomEvent('close'))}
          >
            <obi-01-close></obi-01-close>
          </obc-icon-button>
        </div>`
      );
      leftGroup.push(html`<obc-divider></obc-divider>`);
      leftGroup.push(
        html`<obc-icon-button
          variant="flat"
          corner-left
          @click=${() => this.dispatchEvent(new CustomEvent('back'))}
        >
          <obi-02-arrow-back></obi-02-arrow-back>
        </obc-icon-button>`
      );
      leftGroup.push(
        html`<obc-icon-button
          variant="flat"
          corner-right
          @click=${() => this.dispatchEvent(new CustomEvent('forward'))}
        >
          <obi-02-arrow-forward></obi-02-arrow-forward>
        </obc-icon-button>`
      );
      leftGroup.push(html`<obc-divider></obc-divider>`);
      leftGroup.push(html`<div class="title">${this.appTitle}</div>`);
      leftGroup.push(
        html`<obc-breadcrumb .items=${this.breadcrumbItems}></obc-breadcrumb>`
      );
    } else {
      if (!this.inactive) {
        leftGroup.push(
          html`<div class="menu-button ${this.wideMenuButton ? 'wide' : null}">
            <obc-icon-button variant="flat" @click=${this.menuButtonClicked}>
              <obi-01-menu></obi-01-menu>
            </obc-icon-button>
          </div>`
        );
      }
      if (!this.sizeSmall) {
        leftGroup.push(html`<div class="title">${this.appTitle}</div>`);
      }
      leftGroup.push(html`<div class="page-name">${this.pageName}</div>`);
    }

    return html`
      <nav
        class=${classMap({
          wrapper: true,
          inactive: this.inactive,
          small: this.sizeSmall,
          settings: this.settings,
        })}
      >
        <div class="left group">${leftGroup}</div>
        <div class="right group">
          ${this.showClock
            ? html`<obc-clock
                date="${this.date}"
                ?show-date=${!this.sizeSmall}
              ></obc-clock>`
            : null}
          <slot name="alerts"></slot>
          ${this.showDimmingButton && !this.inactive && !this.sizeSmall
            ? html`<obc-icon-button
                variant="flat"
                @click=${this.dimmingButtonClicked}
              >
                <obi-04-dimming></obi-04-dimming>
              </obc-icon-button>`
            : null}
          ${this.showAppsButton && !this.inactive && !this.sizeSmall
            ? html`<obc-icon-button
                variant="flat"
                @click=${this.appsButtonClicked}
              >
                <obi-01-apps></obi-01-apps>
              </obc-icon-button>`
            : null}
          ${this.sizeSmall
            ? html`<obc-icon-button
                variant="flat"
                @click=${this.leftMoreButtonClicked}
              >
                <obi-01-more-vertical></obi-01-more-vertical>
              </obc-icon-button>`
            : null}
        </div>
      </nav>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-top-bar': TopBar;
  }
}
