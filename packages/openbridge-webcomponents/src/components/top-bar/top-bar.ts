import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './top-bar.css?inline';
import '../icon-button/icon-button.js';
import '../clock/clock.js';
import '../divider/divider.js';
import '../breadcrumb/breadcrumb.js';
import '../../icons/icon-menu-iec.js';
import '../../icons/icon-home.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-arrow-left-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-palette-day-night-iec.js';
import '../../icons/icon-applications.js';
import '../../icons/icon-more-vertical-google.js';
import '../../icons/icon-user.js';
import {
  BreadcrumbClickEvent,
  BreadcrumbItem,
} from '../breadcrumb/breadcrumb.js';
import {customElement} from '../../decorator.js';

export enum ObcTopBarMenuButtonIcon {
  Menu = 'menu',
  Home = 'home',
}

/**
 * `<obc-top-bar>` – A responsive top navigation bar component for application layouts.
 *
 * Provides a flexible, highly configurable top bar for application interfaces, supporting navigation, context display, quick actions, and status indicators. The top bar adapts to screen size and can show or hide elements such as menu, app icon, breadcrumbs, user/profile, clock, and alert notifications.
 *
 * Appears at the top of the UI, organizing primary navigation and contextual actions in a single, persistent region. Designed for use as the main app bar or header in multi-pane or dashboard-style layouts.
 *
 * ## Features
 * - **Configurable Sections:** Supports left and right-aligned groups for navigation, context, and actions.
 * - **Menu Button:** Optional menu button for opening navigation drawers or sidebars; can be styled as wide or regular.
 * - **App Icon Slot:** Customizable slot for displaying an application or brand icon.
 * - **App Title & Page Name:** Displays the current application and page context.
 * - **Breadcrumbs:** Optional breadcrumb navigation for hierarchical context (in settings mode).
 * - **Command Button Slot:** Slot for inserting a primary command/action button.
 * - **Alert/Notification Area:** Slot for alert indicators, notification badges, or custom alert components.
 * - **Dimming Button:** Optional button for toggling display modes (e.g., day/night).
 * - **User/Profile Button:** Optional user icon for profile/account actions.
 * - **Apps Button:** Optional button for accessing additional applications or modules.
 * - **Clock & Date:** Optional digital clock and date display, responsive to screen size.
 * - **Responsive Layout:** Multiple breakpoint properties to control visibility and layout of elements based on viewport width.
 * - **Settings Mode:** Special mode with close, back, and forward navigation, breadcrumbs, and app title.
 * - **Tall Variant:** Optional increased height for touch or accessibility needs.
 * - **Inactive State:** Disables interactive elements and visually de-emphasizes the bar.
 *
 * ## Variants
 * - **Regular:** Standard top bar with menu, app icon, title, page name, and action slots.
 * - **Settings:** Shows close, back, forward buttons, breadcrumbs, and app title for configuration or settings screens.
 * - **Inactive:** Visually muted and disables interaction (e.g., when the app is locked or in a modal state).
 * - **Tall:** Increases the height of the bar for improved touch targets.
 *
 * ## Usage Guidelines
 * Use `<obc-top-bar>` as the persistent header for your application, providing navigation, context, and quick access to key actions or status. Configure which elements appear via boolean properties and slots. Adjust breakpoint properties to control responsive behavior for each section.
 *
 * - Place navigation, branding, and context (title, breadcrumbs) on the left; actions, alerts, and status (clock, user, apps) on the right.
 * - Use the `settings` property for configuration or setup screens to enable close/back/forward navigation and breadcrumbs.
 * - Use the `inactive` property to visually disable the bar and its actions when the app is not interactive.
 * - Insert custom icons or buttons using the `app-icon` and `command-button` slots.
 * - Use the `alerts` slot to display alert indicators, notification badges, or custom alert components.
 *
 * **TODO(designer):** Clarify recommended combinations of visible elements for different app contexts (e.g., when to show both user and apps buttons, or best practices for alert placement).
 *
 * ## Slots
 *
 * | Slot Name        | Renders When...                 | Purpose                                                        |
 * |------------------|---------------------------------|----------------------------------------------------------------|
 * | `app-icon`       | `showAppIcon` is true           | Custom icon representing the application or brand.             |
 * | `command-button` | Always (if provided)            | Primary command or action button for the current context.      |
 * | `alerts`         | Always (if provided)            | Area for alert indicators, notification badges, or alert items.|
 *
 * ## Properties and Attributes
 * - `appTitle` (string): Sets the main application title (default: "App").
 * - `pageName` (string): Sets the current page or section name (default: "Page").
 * - `date` (string): ISO date/time string for the clock display.
 * - `menuButtonActivated` (boolean): Highlights the menu button as active.
 * - `dimmingButtonActivated` (boolean): Highlights the dimming button as active.
 * - `appsButtonActivated` (boolean): Highlights the apps button as active.
 * - `leftMoreButtonActivated` (boolean): Highlights the left more button as active.
 * - `userButtonActivated` (boolean): Highlights the user button as active.
 * - `tall` (boolean): Increases the bar height for larger touch targets.
 * - `wideMenuButton` (boolean): Expands the menu button for wide-rail layouts.
 * - `showAppsButton` (boolean): Shows/hides the apps button.
 * - `showDimmingButton` (boolean): Shows/hides the dimming (day/night) button.
 * - `showUserButton` (boolean): Shows/hides the user/profile button.
 * - `showClock` (boolean): Shows/hides the clock.
 * - `showDate` (boolean): Shows/hides the date in the clock.
 * - `showAppIcon` (boolean): Shows/hides the app icon slot.
 * - `inactive` (boolean): Disables interaction and visually de-emphasizes the bar.
 * - `settings` (boolean): Enables settings mode (shows close, back, forward, breadcrumbs).
 * - `breadcrumbItems` (BreadcrumbItem[]): Array of breadcrumb items for navigation.
 * - Breakpoint properties (`appButtonBreakpointPx`, `dimmingButtonBreakpointPx`, `appTitleBreakpointPx`, `clockMinimizeBreakpointPx`, `userButtonBreakpointPx`, `appIconBreakpointPx`): Control responsive visibility of each section.
 *
 * ## Events
 * - `menu-button-clicked` – Fired when the menu button is clicked.
 * - `dimming-button-clicked` – Fired when the dimming (day/night) button is clicked.
 * - `apps-button-clicked` – Fired when the apps button is clicked.
 * - `left-more-button-clicked` – Fired when the left more button is clicked.
 * - `user-button-clicked` – Fired when the user/profile button is clicked.
 * - `close` – Fired in settings mode when the close button is clicked.
 * - `back` – Fired in settings mode when the back button is clicked.
 * - `forward` – Fired in settings mode when the forward button is clicked.
 * - `emergency-brightness-start` – Fired when the menu button is held for 500ms. This should increase the brightness of the screen slowly. Used when the screen is too dark.
 * - `emergency-brightness-stop` – Fired when the menu button is released.
 *
 * ## Best Practices and Constraints
 * - Only show interactive elements relevant to the current context to avoid clutter.
 * - Use the `alerts` slot for transient or critical notifications; persistent alerts may require a different component.
 * - For accessibility, ensure that all interactive elements have appropriate labels and focus handling.
 * - Adjust breakpoint properties to optimize the layout for different device sizes.
 * - In settings mode, use breadcrumbs to provide clear navigation context.
 *
 * ## Example
 *
 * ```html
 * <obc-top-bar
 *   appTitle="My App"
 *   pageName="Dashboard"
 *   showAppsButton
 *   showDimmingButton
 *   showClock
 *   showUserButton
 *   showAppIcon
 * >
 *   <obi-placeholder slot="app-icon"></obi-placeholder>
 *   <obc-command-button slot="command-button"></obc-command-button>
 *   <obc-topbar-message-item slot="alerts"></obc-topbar-message-item>
 * </obc-top-bar>
 * ```
 *
 * @slot app-icon - Custom icon representing the application or brand (shown when `showAppIcon` is true)
 * @slot command-button - Primary command/action button for the current context
 * @slot alerts - Area for alert indicators, notification badges, or alert items
 * @fires menu-button-clicked - Fired when the menu button is clicked
 * @fires dimming-button-clicked - Fired when the dimming (day/night) button is clicked
 * @fires apps-button-clicked - Fired when the apps button is clicked
 * @fires left-more-button-clicked - Fired when the left more button is clicked
 * @fires user-button-clicked - Fired when the user/profile button is clicked
 * @fires close - Fired in settings mode when the close button is clicked
 * @fires back - Fired in settings mode when the back button is clicked
 * @fires emergency-brightness-start - Fired when the menu button is held for 500ms. This should increase the brightness of the screen slowly. Used when the screen is too dark.
 * @fires emergency-brightness-stop - Fired when the menu button is released.
 * @fires breadcrumb-click {BreadcrumbClickEvent} - Fired when a breadcrumb item is clicked.
 */
@customElement('obc-top-bar')
export class ObcTopBar extends LitElement {
  /**
   * Sets the main application title displayed in the top bar.
   * @type {string}
   * @default "App"
   */
  @property({type: String}) appTitle = 'App';

  /**
   * Sets the current page or section name displayed in the top bar.
   * @type {string}
   * @default "Page"
   */
  @property({type: String}) pageName = 'Page';

  /**
   * ISO date/time string for the clock display (if enabled).
   * @type {string}
   * @default "2021-01-01T11:11:11.111Z"
   */
  @property({type: String}) date = '2021-01-01T11:11:11.111Z';

  @property({type: String}) menuButtonIcon = ObcTopBarMenuButtonIcon.Menu;

  /**
   * Highlights the menu button as active.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean})
  menuButtonActivated = false;

  /**
   * Highlights the dimming (day/night) button as active.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean})
  dimmingButtonActivated = false;

  /**
   * Highlights the apps button as active.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean})
  appsButtonActivated = false;

  /**
   * Highlights the left more button as active.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean})
  leftMoreButtonActivated = false;

  /**
   * Highlights the user/profile button as active.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean})
  userButtonActivated = false;

  /**
   * Increases the height of the top bar for larger touch targets.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) tall = false;

  /**
   * Expands the menu button for wide-rail layouts.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) wideMenuButton = false;

  /**
   * Shows or hides the apps button.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) showAppsButton = false;

  /**
   * Shows or hides the dimming (day/night) button.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean})
  showDimmingButton = false;

  /**
   * Shows or hides the user/profile button.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) showUserButton = false;

  /**
   * Shows or hides the clock.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) showClock = false;

  /**
   * Shows or hides the date in the clock display.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) showDate = false;

  /**
   * Shows or hides the app icon slot.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) showAppIcon = false;

  /**
   * Disables interaction and visually de-emphasizes the bar.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) inactive = false;

  /**
   * Controls the breakpoint (in px) for showing/hiding the apps button.
   * @type {number}
   * @default 500
   */
  @property({type: Number})
  appButtonBreakpointPx = 500;

  /**
   * Controls the breakpoint (in px) for showing/hiding the dimming button.
   * @type {number}
   * @default 500
   */
  @property({type: Number})
  dimmingButtonBreakpointPx = 500;

  /**
   * Controls the breakpoint (in px) for showing/hiding the app title.
   * @type {number}
   * @default 500
   */
  @property({type: Number})
  appTitleBreakpointPx = 500;

  /**
   * Controls the breakpoint (in px) for minimizing the clock display.
   * @type {number}
   * @default 300
   */
  @property({type: Number})
  clockMinimizeBreakpointPx = 300;

  /**
   * Controls the breakpoint (in px) for showing/hiding the user button.
   * @type {number}
   * @default 500
   */
  @property({type: Number})
  userButtonBreakpointPx = 500;

  /**
   * Controls the breakpoint (in px) for showing/hiding the app icon.
   * @type {number}
   * @default 500
   */
  @property({type: Number})
  appIconBreakpointPx = 500;

  /**
   * Enables settings mode, displaying close, back buttons, breadcrumbs, and app title.
   * @type {boolean}
   * @default false
   */
  @property({type: Boolean}) settings = false;

  /**
   * Array of breadcrumb items for navigation (used in settings mode).
   * @type {BreadcrumbItem[]}
   * @default []
   */
  @property({type: Array})
  breadcrumbItems: BreadcrumbItem[] = [];

  private dimmingButtonClicked() {
    /**
     * Fired when the dimming (day/night) button is clicked.
     * @event dimming-button-clicked
     */
    this.dispatchEvent(new CustomEvent('dimming-button-clicked'));
  }

  private appsButtonClicked() {
    /**
     * Fired when the apps button is clicked.
     * @event apps-button-clicked
     */
    this.dispatchEvent(new CustomEvent('apps-button-clicked'));
  }

  private leftMoreButtonClicked() {
    /**
     * Fired when the left more button is clicked.
     * @event left-more-button-clicked
     */
    this.dispatchEvent(new CustomEvent('left-more-button-clicked'));
  }

  private userButtonClicked() {
    /**
     * Fired when the user/profile button is clicked.
     * @event user-button-clicked
     */
    this.dispatchEvent(new CustomEvent('user-button-clicked'));
  }

  private leftButtonEvent: null | CustomEvent = null;
  private leftButtonTimeout: null | NodeJS.Timeout = null;
  private isLeftButtonDown = false;
  private isEmergencyBrightness = false;

  private leftButtonDown(event: CustomEvent) {
    this.leftButtonEvent = event;
    this.isLeftButtonDown = true;
    this.leftButtonTimeout = setTimeout(() => {
      this.leftButtonEvent = null;
      this.dispatchEvent(new CustomEvent('emergency-brightness-start'));
      this.isEmergencyBrightness = true;
    }, 500);
  }

  private leftButtonUp() {
    if (this.leftButtonEvent) {
      this.dispatchEvent(this.leftButtonEvent);
      this.leftButtonEvent = null;
    }
    if (this.leftButtonTimeout) {
      clearTimeout(this.leftButtonTimeout);
      this.leftButtonTimeout = null;
    }
    if (this.isEmergencyBrightness) {
      this.dispatchEvent(new CustomEvent('emergency-brightness-stop'));
      this.isEmergencyBrightness = false;
    }
    this.isLeftButtonDown = false;
  }

  private leftButtonLeave() {
    if (!this.isLeftButtonDown) return;
    if (this.leftButtonTimeout) {
      clearInterval(this.leftButtonTimeout);
      this.leftButtonTimeout = null;
    }
    if (this.isEmergencyBrightness) {
      this.dispatchEvent(new CustomEvent('emergency-brightness-stop'));
      this.isEmergencyBrightness = false;
    }
    this.isLeftButtonDown = false;
  }

  override render() {
    const leftGroup = [];
    if (this.settings) {
      leftGroup.push(
        html`<div class="menu-button">
          <obc-icon-button
            variant="flat"
            @pointerdown=${() => this.leftButtonDown(new CustomEvent('close'))}
            @pointerup=${() => this.leftButtonUp()}
            @pointerleave=${() => this.leftButtonLeave()}
          >
            <obi-close-google></obi-close-google>
          </obc-icon-button>
        </div>`
      );
      leftGroup.push(html`<div class="divider"></div>`);
      leftGroup.push(
        html`<obc-icon-button
          variant="flat"
          @click=${() => this.dispatchEvent(new CustomEvent('back'))}
        >
          <obi-arrow-left-google></obi-arrow-left-google>
        </obc-icon-button>`
      );
      leftGroup.push(html`<div class="title">${this.appTitle}</div>`);
      leftGroup.push(
        html`<obc-breadcrumb
          .items=${this.breadcrumbItems}
          @breadcrumb-click=${(e: BreadcrumbClickEvent) =>
            this.dispatchEvent(
              new CustomEvent('breadcrumb-click', {
                detail: e.detail,
              }) as BreadcrumbClickEvent
            )}
        ></obc-breadcrumb>`
      );
    } else {
      if (!this.inactive) {
        leftGroup.push(
          html`<div class="menu-button ${this.wideMenuButton ? 'wide' : null}">
            <obc-icon-button
              variant="flat"
              @pointerdown=${() =>
                this.leftButtonDown(new CustomEvent('menu-button-clicked'))}
              @pointerup=${() => this.leftButtonUp()}
              @pointerleave=${() => this.leftButtonLeave()}
              ?activated=${this.menuButtonActivated}
            >
              ${this.menuButtonIcon === ObcTopBarMenuButtonIcon.Menu
                ? html`<obi-menu-iec></obi-menu-iec>`
                : html`<obi-home></obi-home>`}
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
        role="menubar"
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
