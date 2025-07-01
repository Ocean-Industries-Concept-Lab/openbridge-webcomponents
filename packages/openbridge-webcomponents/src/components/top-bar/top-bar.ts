import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './top-bar.css?inline';
import '../icon-button/icon-button.js';
import '../clock/clock.js';
import '../divider/divider.js';
import '../breadcrumb/breadcrumb.js';
import '../../icons/icon-menu-iec.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-arrow-left-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-palette-day-night-iec.js';
import '../../icons/icon-applications.js';
import '../../icons/icon-more-vertical-google.js';
import '../../icons/icon-user.js';
import {BreadcrumbItem} from '../breadcrumb/breadcrumb.js';
import {customElement} from '../../decorator.js';

/**
 * Top bar component
 *
 * @slot app-icon - App icon
 * @slot command-button - Command button
 * @slot alerts - Alerts
 *
 * @fires menu-button-clicked - Menu button clicked
 * @fires dimming-button-clicked - Dimming button clicked
 * @fires apps-button-clicked - Apps button clicked
 * @fires left-more-button-clicked - Left more button clicked
 * @fires user-button-clicked - User button clicked
 */
@customElement('obc-top-bar')
export class ObcTopBar extends LitElement {
  @property({type: String}) appTitle = 'App';
  @property({type: String}) pageName = 'Page';
  @property({type: String}) date = '2021-01-01T11:11:11.111Z';
  @property({type: Boolean})
  menuButtonActivated = false;
  @property({type: Boolean})
  dimmingButtonActivated = false;
  @property({type: Boolean})
  appsButtonActivated = false;
  @property({type: Boolean})
  leftMoreButtonActivated = false;
  @property({type: Boolean})
  userButtonActivated = false;
  @property({type: Boolean}) tall = false;

  @property({type: Boolean}) wideMenuButton = false;
  @property({type: Boolean}) showAppsButton = false;
  @property({type: Boolean})
  showDimmingButton = false;
  @property({type: Boolean}) showUserButton = false;
  @property({type: Boolean}) showClock = false;
  @property({type: Boolean}) showDate = false;
  @property({type: Boolean}) showAppIcon = false;
  @property({type: Boolean}) inactive = false;
  @property({type: Number})
  appButtonBreakpointPx = 500;
  @property({type: Number})
  dimmingButtonBreakpointPx = 500;
  @property({type: Number})
  appTitleBreakpointPx = 500;
  @property({type: Number})
  clockMinimizeBreakpointPx = 300;
  @property({type: Number})
  userButtonBreakpointPx = 500;
  @property({type: Number})
  appIconBreakpointPx = 500;
  @property({type: Boolean}) settings = false;
  @property({type: Array})
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

  private userButtonClicked() {
    this.dispatchEvent(new CustomEvent('user-button-clicked'));
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
            <obi-close-google></obi-close-google>
          </obc-icon-button>
        </div>`
      );
      leftGroup.push(html`<obc-divider></obc-divider>`);
      leftGroup.push(
        html`<obc-icon-button
          variant="flat"
          cornerLeft
          @click=${() => this.dispatchEvent(new CustomEvent('back'))}
        >
          <obi-arrow-left-google></obi-arrow-left-google>
        </obc-icon-button>`
      );
      leftGroup.push(
        html`<obc-icon-button
          variant="flat"
          cornerRight
          @click=${() => this.dispatchEvent(new CustomEvent('forward'))}
        >
          <obi-arrow-right-google></obi-arrow-right-google>
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
            <obc-icon-button
              variant="flat"
              @click=${this.menuButtonClicked}
              ?activated=${this.menuButtonActivated}
            >
              <obi-menu-iec></obi-menu-iec>
            </obc-icon-button>
          </div>`
        );
      }
      if (this.showAppIcon) {
        leftGroup.push(
          html`<div class="app-icon"><slot name="app-icon"></slot></div>`
        );
      }
      leftGroup.push(html`<div class="title">${this.appTitle}</div>`);
      leftGroup.push(html`<div class="page-name">${this.pageName}</div>`);
      leftGroup.push(html`<slot name="command-button"></slot>`);
    }

    const breakpointMoreButton = Math.max(
      this.appButtonBreakpointPx,
      this.dimmingButtonBreakpointPx
    );

    return html`
      <style>
                @media (max-width: ${breakpointMoreButton}px) {
                  .left-more-button {
                    display: revert !important;
        import { customElement } from '../../decorator.js';
                  }

                  .group.left > * {
                    margin-right: 4px;
                    margin-left: 4px;
                  }
                }

                @media (max-width: ${this.appButtonBreakpointPx}px) {
                  .apps-button {
                    display: none;
                  }
                }

                @media (max-width: ${this.dimmingButtonBreakpointPx}px) {
                  .dimming-button {
                    display: none;
                  }
                }

                @media (max-width: ${this.appTitleBreakpointPx}px) {
                  .title {
                    display: none;
                  }
                }

                @media (max-width: ${this.userButtonBreakpointPx}px) {
                  .user-button {
                    display: none;
                  }
                }

                @media (max-width: ${this.appIconBreakpointPx}px) {
                  .app-icon {
                    display: none;
                  }
                }
      </style>
      <nav
        class=${classMap({
          wrapper: true,
          inactive: this.inactive,
          settings: this.settings,
          tall: this.tall,
        })}
      >
        <div class="left group">${leftGroup}</div>
        <div class="right group">
          <div class="alert-container">
            <slot name="alerts"></slot>
          </div>
          ${this.showDimmingButton && !this.inactive
            ? html`<obc-icon-button
                class="dimming-button"
                part="dimming-button"
                variant="flat"
                @click=${this.dimmingButtonClicked}
                ?activated=${this.dimmingButtonActivated}
              >
                <obi-palette-day-night-iec></obi-palette-day-night-iec>
              </obc-icon-button>`
            : null}
          ${this.showUserButton && !this.inactive
            ? html`<obc-icon-button
                class="user-button"
                variant="flat"
                part="user-button"
                @click=${this.userButtonClicked}
                ?activated=${this.userButtonActivated}
              >
                <obi-user></obi-user>
              </obc-icon-button>`
            : null}
          ${this.showAppsButton && !this.inactive
            ? html`<obc-icon-button
                class="apps-button"
                variant="flat"
                part="apps-button"
                @click=${this.appsButtonClicked}
                ?activated=${this.appsButtonActivated}
              >
                <obi-applications></obi-applications>
              </obc-icon-button>`
            : null}
          ${this.showClock
            ? html`<obc-clock
                .date=${this.date}
                .blinkOnlyBreakpointPx=${this.clockMinimizeBreakpointPx}
                .showDate=${this.showDate}
              ></obc-clock>`
            : null}
          ${!this.inactive
            ? html`<obc-icon-button
                class="left-more-button"
                part="left-more-button"
                variant="flat"
                @click=${this.leftMoreButtonClicked}
                ?activated=${this.leftMoreButtonActivated}
              >
                <obi-more-vertical-google></obi-more-vertical-google>
              </obc-icon-button>`
            : null}
        </div>
      </nav>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-top-bar': ObcTopBar;
  }
}
