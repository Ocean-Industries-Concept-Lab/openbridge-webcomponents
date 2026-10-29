import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {msg} from '@lit/localize';
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
 * - **Asset Picker Slot:** Slot for a control that switches between the assets the page can show, such as an `obc-dropdown-button` whose label is the current asset.
 * - **Alert/Notification Area:** Slot for alert indicators, notification badges, or custom alert components.
 * - **Diagnostics Slot:** Slot for the diagnostic button, after the alert area.
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
 * - Slot an `obc-dropdown-button` into `asset-picker` when the page shows one of several assets; the app owns the list and the selection and listens for the button's `change`.
 * - Use the `alerts` slot to display alert indicators, notification badges, or custom alert components.
 * - Slot an `obc-diagnostic-button` into `diagnostics`; open its `obc-diagnostic-menu` from the button's `click` the way the user menu is opened from the user button.
 *
 * **TODO(designer):** Clarify recommended combinations of visible elements for different app contexts (e.g., when to show both user and apps buttons, or best practices for alert placement).
 *
 * ## Slots
 *
 * | Slot Name        | Renders When...                 | Purpose                                                        |
 * |------------------|---------------------------------|----------------------------------------------------------------|
 * | `app-icon`       | `showAppIcon` is true           | Custom icon representing the application or brand.             |
 * | `command-button` | `settings` is false (if provided) | Primary command or action button for the current context.      |
 * | `asset-picker`   | `settings` is false (if provided) | Control that switches the asset the page shows; its label is the current asset. |
 * | `alerts`         | Always (if provided)            | Area for alert indicators, notification badges, or alert items.|
 * | `diagnostics`    | Always (if provided)            | The diagnostic button (`obc-diagnostic-button`), after the alert area and before the dimming button. |
 * | `clock`          | Always (if provided)            | Clock component for displaying the current time.              |
 *
 * ## Events
 * - `menu-button-clicked` – Fired when the menu button is clicked.
 * - `dimming-button-clicked` – Fired when the dimming (day/night) button is clicked.
 * - `apps-button-clicked` – Fired when the apps button is clicked.
 * - `more-button-clicked` – Fired when the more button is clicked.
 * - `left-more-button-clicked` – Deprecated alias of `more-button-clicked`, fired with it; removed in 4.0.0.
 * - `user-button-clicked` – Fired when the user/profile button is clicked.
 * - `close` – Fired in settings mode when the close button is clicked.
 * - `back` – Fired in settings mode when the back button is clicked.
 * - `forward` – Fired in settings mode when the forward button is clicked.
 * - `emergency-brightness-start` – Fired when the menu button is held for 500ms. This should increase the brightness of the screen slowly. Used when the screen is too dark.
 * - `emergency-brightness-stop` – Fired when the menu button is released.
 *
 * ## Keyboard
 * Every control in the bar is its own tab stop and activates on `Enter` and
 * `Space`. The bar is a navigation landmark, not an APG toolbar: its controls
 * are separate components and slotted consumer content, so a roving tabindex
 * across them is deliberately not implemented. The emergency-brightness hold
 * is a pointer gesture only; from the keyboard the menu button opens the menu.
 *
 * ## Best Practices and Constraints
 * - Only show interactive elements relevant to the current context to avoid clutter.
 * - Use the `alerts` slot for transient or critical notifications; persistent alerts may require a different component.
 * - For accessibility, give all interactive elements labels and focus handling.
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
 *   <obc-clock slot="clock"></obc-clock>
 * </obc-top-bar>
 * ```
 *
 * @availableWhen menuButtonIcon settings==false && inactive==false
 * @property appTitle - Sets the main application title displayed in the top bar.
 * @property pageName - Sets the current page or section name displayed in the top bar.
 * @availableWhen pageName settings==false
 * @property menuButtonActivated - Highlights the menu button as active.
 * @availableWhen menuButtonActivated settings==false && inactive==false
 * @property dimmingButtonActivated - Highlights the dimming (day/night) button as active.
 * @availableWhen dimmingButtonActivated showDimmingButton==true && inactive==false
 * @property appsButtonActivated - Highlights the apps button as active.
 * @availableWhen appsButtonActivated showAppsButton==true && inactive==false
 * @property moreButtonActivated - Highlights the more button as active.
 * @availableWhen moreButtonActivated inactive==false
 * @property userButtonActivated - Highlights the user/profile button as active.
 * @availableWhen userButtonActivated showUserButton==true && inactive==false
 * @property userButtonDisabled - Disables the user/profile button.
 * @availableWhen userButtonDisabled showUserButton==true && inactive==false
 * @property tall - Increases the height of the top bar for larger touch targets.
 * @property wideMenuButton - Expands the menu button for wide-rail layouts.
 * @availableWhen wideMenuButton settings==false && inactive==false
 * @property showAppsButton - Shows or hides the apps button.
 * @property showDimmingButton - Shows or hides the dimming (day/night) button.
 * @property showUserButton - Shows or hides the user/profile button.
 * @property showClock - Shows or hides the clock.
 * @property showDate - Shows or hides the date in the clock display.
 * @property showAppIcon - Shows or hides the app icon slot.
 * @property inactive - Disables interaction and visually de-emphasizes the bar.
 * @property appButtonBreakpointPx - Controls the breakpoint (in px) for showing/hiding the apps button.
 * @property dimmingButtonBreakpointPx - Controls the breakpoint (in px) for showing/hiding the dimming button.
 * @property appTitleBreakpointPx - Controls the breakpoint (in px) for showing/hiding the app title.
 * @property userButtonBreakpointPx - Controls the breakpoint (in px) for showing/hiding the user button.
 * @property appIconBreakpointPx - Controls the breakpoint (in px) for showing/hiding the app icon.
 * @property settings - Enables settings mode, displaying close, back buttons, breadcrumbs, and app title.
 * @property breadcrumbItems - Array of breadcrumb items for navigation (used in settings mode).
 * @availableWhen breadcrumbItems settings==true
 * @slot app-icon - Custom icon representing the application or brand (shown when `showAppIcon` is true)
 * @slot command-button - Primary command/action button for the current context
 * @slot asset-picker - Control that switches the asset the page shows, with the current asset as its label; an `obc-dropdown-button` fits (regular layout only, not in settings mode)
 * @slot alerts - Area for alert indicators, notification badges, or alert items
 * @slot diagnostics - The diagnostic button, after the alert area and before the dimming button
 * @slot clock - Clock component for displaying the current time (shown when `showClock` is true)
 * @fires menu-button-clicked - Fired when the menu button is clicked
 * @fires dimming-button-clicked - Fired when the dimming (day/night) button is clicked
 * @fires apps-button-clicked - Fired when the apps button is clicked
 * @fires more-button-clicked - Fired when the more button is clicked
 * @fires left-more-button-clicked - Deprecated: listen to `more-button-clicked` instead. Fired together with it; removed in 4.0.0.
 * @fires user-button-clicked - Fired when the user/profile button is clicked
 * @fires close - Fired in settings mode when the close button is clicked
 * @fires back - Fired in settings mode when the back button is clicked
 * @fires emergency-brightness-start - Fired when the menu button is held for 500ms. This should increase the brightness of the screen slowly. Used when the screen is too dark.
 * @fires emergency-brightness-stop - Fired when the menu button is released.
 * @fires {BreadcrumbClickEvent} breadcrumb-click - Fired when a breadcrumb item is clicked.
 * @csspart more-button - The more button shown below the breakpoints.
 * @csspart left-more-button - Deprecated alias of the `more-button` part; removed in 4.0.0.
 * @stable
 */
@customElement('obc-top-bar')
export class ObcTopBar extends LitElement {
  @property({type: String}) appTitle = 'App';

  @property({type: String}) pageName = 'Page';

  @property({type: String}) menuButtonIcon = ObcTopBarMenuButtonIcon.Menu;

  @property({type: Boolean})
  menuButtonActivated = false;

  @property({type: Boolean})
  dimmingButtonActivated = false;

  @property({type: Boolean})
  appsButtonActivated = false;

  @property({type: Boolean})
  moreButtonActivated = false;

  /**
   * @deprecated Use `moreButtonActivated`. Removed in 4.0.0.
   */
  @property({type: Boolean})
  leftMoreButtonActivated?: boolean;

  @property({type: Boolean})
  userButtonActivated = false;

  @property({type: Boolean})
  userButtonDisabled = false;

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
  userButtonBreakpointPx = 500;

  @property({type: Number})
  appIconBreakpointPx = 500;

  @property({type: Boolean}) settings = false;

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

  /**
   * Copies the deprecated `leftMoreButtonActivated` into
   * `moreButtonActivated`. A plain field rather than a getter/setter alias:
   * the Vue wrapper writes every prop back on its second render, and a getter
   * would then write `false` over the new property.
   */
  override willUpdate(changed: PropertyValues<this>): void {
    super.willUpdate(changed);
    if (
      changed.has('leftMoreButtonActivated') &&
      this.leftMoreButtonActivated !== undefined
    ) {
      this.moreButtonActivated = this.leftMoreButtonActivated;
    }
  }

  private moreButtonClicked() {
    /**
     * Fired when the more button is clicked.
     * @event more-button-clicked
     */
    this.dispatchEvent(new CustomEvent('more-button-clicked'));
    /**
     * Deprecated alias of `more-button-clicked`; removed in 4.0.0.
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

  /**
   * Ends a hold. The event a short press stands for is dispatched from the
   * `click` that follows, not here: a menu opened while the pointer is still
   * going up gets closed again by that same click in current browsers, which
   * see it as a click outside a popover that has just opened.
   */
  private leftButtonUp() {
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

  /**
   * Sends the event a press of the hold button stands for.
   *
   * Enter, Space and a screen reader's activate command arrive as a `click`
   * with `detail` 0 and no pointer press before it, so they get the event
   * directly. A pointer click arrives with `detail` 1 after the press: the
   * event stored on the way down is sent now, unless the press ran long
   * enough to start emergency brightness, which used it up.
   */
  private leftButtonActivate(event: MouseEvent, type: string) {
    if (event.detail === 0) {
      this.dispatchEvent(new CustomEvent(type));
      return;
    }
    if (!this.leftButtonEvent) return;
    this.dispatchEvent(this.leftButtonEvent);
    this.leftButtonEvent = null;
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
            aria-label=${msg('Close')}
            @pointerdown=${() => this.leftButtonDown(new CustomEvent('close'))}
            @pointerup=${() => this.leftButtonUp()}
            @pointerleave=${() => this.leftButtonLeave()}
            @click=${(event: MouseEvent) =>
              this.leftButtonActivate(event, 'close')}
          >
            <obi-close-google></obi-close-google>
          </obc-icon-button>
        </div>`
      );
      leftGroup.push(
        html`<obc-icon-button
          variant="flat"
          aria-label=${msg('Back')}
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
              aria-label=${
                this.menuButtonIcon === ObcTopBarMenuButtonIcon.Menu
                  ? msg('Menu')
                  : msg('Home')
              }
              @pointerdown=${() =>
                this.leftButtonDown(new CustomEvent('menu-button-clicked'))}
              @pointerup=${() => this.leftButtonUp()}
              @pointerleave=${() => this.leftButtonLeave()}
              @click=${(event: MouseEvent) =>
                this.leftButtonActivate(event, 'menu-button-clicked')}
              ?activated=${this.menuButtonActivated}
            >
              ${
                this.menuButtonIcon === ObcTopBarMenuButtonIcon.Menu
                  ? html`<obi-menu-iec></obi-menu-iec>`
                  : html`<obi-home></obi-home>`
              }
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
      leftGroup.push(html`<slot name="asset-picker"></slot>`);
      leftGroup.push(html`<slot name="command-button"></slot>`);
    }

    const breakpointMoreButton = Math.max(
      this.appButtonBreakpointPx,
      this.dimmingButtonBreakpointPx,
      this.userButtonBreakpointPx,
      this.appIconBreakpointPx
    );

    return html`
      <style>
        @media (max-width: ${breakpointMoreButton}px) {
          .more-button {
            display: revert !important;
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
            display: none !important; /* the stylesheet's display wins over this inline rule otherwise */
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
          <slot name="diagnostics"></slot>
          ${
            this.showDimmingButton && !this.inactive
              ? html`<obc-icon-button
                  class="dimming-button"
                  part="dimming-button"
                  variant="flat"
                  aria-label=${msg('Dimming')}
                  @click=${this.dimmingButtonClicked}
                  ?activated=${this.dimmingButtonActivated}
                >
                  <obi-palette-day-night-iec></obi-palette-day-night-iec>
                </obc-icon-button>`
              : null
          }
          ${
            this.showUserButton && !this.inactive
              ? html`<obc-icon-button
                  class="user-button"
                  variant="flat"
                  part="user-button"
                  aria-label=${msg('User')}
                  @click=${this.userButtonClicked}
                  ?activated=${this.userButtonActivated}
                  ?disabled=${this.userButtonDisabled}
                >
                  <obi-user></obi-user>
                </obc-icon-button>`
              : null
          }
          ${
            this.showAppsButton && !this.inactive
              ? html`<obc-icon-button
                  class="apps-button"
                  variant="flat"
                  part="apps-button"
                  aria-label=${msg('Apps')}
                  @click=${this.appsButtonClicked}
                  ?activated=${this.appsButtonActivated}
                >
                  <obi-applications></obi-applications>
                </obc-icon-button>`
              : null
          }
          ${this.showClock ? html`<slot name="clock"></slot>` : null}
          ${
            !this.inactive
              ? html`<obc-icon-button
                  class="more-button"
                  part="more-button left-more-button"
                  variant="flat"
                  aria-label=${msg('More')}
                  @click=${this.moreButtonClicked}
                  ?activated=${this.moreButtonActivated}
                >
                  <obi-more-vertical-google></obi-more-vertical-google>
                </obc-icon-button>`
              : null
          }
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
