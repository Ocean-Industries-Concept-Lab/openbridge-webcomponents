import {LitElement, TemplateResult, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './user-menu.css?inline';
import '../input/input.js';
import '../button/button.js';
import '../user-button/user-button.js';
import '../progress-bar/progress-bar.js';
import '../navigation-item/navigation-item.js';
import '../../icons/icon-visibility-off-google.js';
import '../../icons/icon-calendar-google.js';
import '../../icons/icon-log-open-google.js';
import '../../icons/icon-settings-iec.js';
import '../../icons/icon-user.js';
import {HTMLInputTypeAttribute, ObcInputTextAlign} from '../input/input.js';
import {ButtonVariant} from '../button/button.js';
import {
  ProgressBarMode,
  ProgressBarType,
} from '../progress-bar/progress-bar.js';
import {Size, StyleType, Variant} from '../user-button/user-button.js';
import {localized, msg} from '@lit/localize';

export enum ObcUserMenuType {
  signIn = 'sign-in',
  userSignIn = 'user-sign-in',
  loadingSignIn = 'loading-sign-in',
  signedIn = 'signed-in',
}

export enum ObcUserMenuSize {
  regular = 'regular',
  small = 'small',
}

export type ObcUserMenuUser = {
  initials: string;
  label: string;
};

export type ObcUserMenuSignedInAction = {
  id: string;
  label: string;
};

/**
 * `<obc-user-menu>` – A user menu component with sign-in and signed-in layouts.
 *
 * Provides multiple layouts for authentication and account access states, including
 * sign-in forms, user-specific sign-in, loading states, and signed-in navigation.
 *
 * ### Features
 * - **Multiple States:** Supports sign-in, user sign-in, loading, and signed-in layouts.
 * - **Size Options:** Regular and small sizes for compact layouts.
 * - **Recent Users:** Optional "Recently signed in" section for quick access.
 * - **Navigation Actions:** Signed-in state includes navigation items and actions.
 *
 * ### Variants
 * - `type`: `sign-in`, `user-sign-in`, `loading-sign-in`, `signed-in`
 * - `size`: `regular`, `small`
 *
 * ### Usage Guidelines
 * Use `obc-user-menu` in authentication or account panels where quick access to
 * sign-in, profile, or account actions is needed. The `user-sign-in` type is
 * best for fast re-auth flows; `loading-sign-in` is for pending auth states.
 *
 * ### Properties and Configuration
 * - `type` (`ObcUserMenuType`): Controls the layout state. Defaults to `sign-in`.
 * - `size` (`ObcUserMenuSize`): Controls the overall size. Defaults to `regular`.
 * - `hasRecentlySignedIn` (`boolean`): Toggles the recent users section.
 *   Defaults to `true`.
 * - `username` (`string`): Current username value for sign-in layouts.
 * - `password` (`string`): Current password value for sign-in layouts.
 * - `usernameError` (`string`): Error message for the username field.
 * - `passwordError` (`string`): Error message for the password field.
 * - `userInitials` (`string`): Initials for the primary user profile.
 * - `userLabel` (`string`): Label for the primary user profile.
 * - `recentUsers` (`ObcUserMenuUser[]`): List of recent users shown in the
 *   "Recently signed in" section.
 * - `signedInActions` (`ObcUserMenuSignedInAction[]`): Actions shown in the
 *   signed-in navigation list.
 *
 * ### Events
 * - `sign-in-click` – Fired when a sign-in button is clicked.
 * - `sign-out-click` – Fired when the sign-out button is clicked.
 * - `signed-in-action-click` – Fired when a signed-in action is clicked.
 * - `recent-user-click` – Fired when a recent user button is clicked.
 *
 * ### Slots
 * - `signed-in-action-icon-{id}`: Optional icon for a signed-in action. The
 *   `{id}` is the normalized action id.
 *
 * ### Example
 * ```html
 * <obc-user-menu
 *   type="user-sign-in"
 *   size="small"
 *   hasRecentlySignedIn="false"
 *   userInitials="JD"
 *   userLabel="John Doe"
 * ></obc-user-menu>
 * ```
 *
 * @fires sign-in-click {CustomEvent<{username: string, password: string}>}
 * @fires sign-out-click
 * @fires signed-in-action-click {CustomEvent<{id: string, label: string}>}
 * @fires recent-user-click {CustomEvent<{initials: string, label: string}>}
 */
@customElement('obc-user-menu')
@localized()
export class ObcUserMenu extends LitElement {
  /**
   * Controls the visual layout of the user menu.
   */
  @property({type: String}) type: ObcUserMenuType = ObcUserMenuType.signIn;

  /**
   * Controls the overall size of the user menu.
   */
  @property({type: String}) size: ObcUserMenuSize = ObcUserMenuSize.regular;

  /**
   * Toggles the "Recently signed in" section visibility.
   */
  @property({type: Boolean})
  hasRecentlySignedIn = true;

  /**
   * Current username value for sign-in layouts.
   */
  @property({type: String}) username = '';

  /**
   * Current password value for sign-in layouts.
   */
  @property({type: String}) password = '';

  /**
   * Error message for the username field.
   */
  @property({type: String}) usernameError = '';

  /**
   * Error message for the password field.
   */
  @property({type: String}) passwordError = '';

  /**
   * Initials for the primary user profile.
   */
  @property({type: String}) userInitials?: string;

  /**
   * Label for the primary user profile.
   */
  @property({type: String}) userLabel?: string;

  /**
   * Recent users for the "Recently signed in" section.
   */
  @property({attribute: false})
  recentUsers: ObcUserMenuUser[] = [];

  /**
   * Actions shown in the signed-in navigation list.
   */
  @property({attribute: false})
  signedInActions: ObcUserMenuSignedInAction[] = [];

  private get defaultSignedInActions() {
    return [
      {id: 'calendar', label: msg('Calendar')},
      {id: 'log', label: msg('Log')},
      {id: 'preferences', label: msg('Preferences')},
      {id: 'user-account', label: msg('User account')},
    ];
  }

  private get defaultRecentUsers() {
    const label = msg('Username');
    return [
      {initials: 'AB', label},
      {initials: 'CD', label},
      {initials: 'EF', label},
    ];
  }

  private renderTextInput(
    placeholder: string,
    type: HTMLInputTypeAttribute = HTMLInputTypeAttribute.Text,
    hasTrailingIcon = false,
    value = '',
    onInput?: (event: Event) => void,
    errorText = ''
  ) {
    const showPasswordToggle =
      hasTrailingIcon && type === HTMLInputTypeAttribute.Password;
    return html`
      <obc-input
        class=${classMap({
          'text-input': true,
          'password-input': hasTrailingIcon,
        })}
        placeholder=${placeholder}
        .type=${type}
        .textAlign=${ObcInputTextAlign.Left}
        .hasTrailingIcon=${hasTrailingIcon}
        .passwordToggle=${showPasswordToggle}
        .value=${value}
        .error=${Boolean(errorText)}
        .required=${true}
        @input=${onInput}
      >
        ${hasTrailingIcon && !showPasswordToggle
          ? html`<obi-visibility-off-google
              slot="trailing-icon"
            ></obi-visibility-off-google>`
          : nothing}
        ${errorText
          ? html`<div slot="helper-text">${errorText}</div>`
          : nothing}
      </obc-input>
    `;
  }

  private renderUserButtons(count: number, isLarge: boolean) {
    const size = isLarge ? Size.large : Size.regular;
    const users = (
      this.recentUsers.length ? this.recentUsers : this.defaultRecentUsers
    ).slice(0, count);
    return html`
      <div
        class=${classMap({
          users: true,
          large: isLarge,
          single: users.length === 1,
        })}
      >
        ${users.map(
          (user) => html`
            <obc-user-button
              .variant=${Variant.initials}
              .styleType=${StyleType.normal}
              .size=${size}
              .initials=${user.initials}
              .label=${user.label}
              @click=${() => this.handleRecentUserClick(user)}
            ></obc-user-button>
          `
        )}
      </div>
    `;
  }

  private renderUserProfile(
    layout: 'vertical' | 'horizontal',
    size: 'large' | 'regular',
    initials?: string,
    label?: string
  ) {
    const userButtonSize = size === 'large' ? Size.large : Size.regular;
    const fallbackUser = this.recentUsers[0] ?? this.defaultRecentUsers[0];
    const resolvedInitials =
      initials ?? this.userInitials ?? fallbackUser.initials;
    const resolvedLabel = label ?? this.userLabel ?? fallbackUser.label;
    return html`
      <div
        class=${classMap({
          'user-profile': true,
          [layout]: true,
        })}
      >
        <obc-user-button
          class=${classMap({
            'user-avatar': true,
            [`size-${size}`]: true,
          })}
          .variant=${Variant.initials}
          .styleType=${StyleType.normal}
          .size=${userButtonSize}
          .initials=${resolvedInitials}
          .label=${resolvedLabel}
        ></obc-user-button>
      </div>
    `;
  }

  private getSignedInActionIcon(actionId: string) {
    switch (actionId) {
      case 'calendar':
        return html`<obi-calendar-google></obi-calendar-google>`;
      case 'log':
        return html`<obi-log-open-google></obi-log-open-google>`;
      case 'preferences':
        return html`<obi-settings-iec></obi-settings-iec>`;
      case 'user-account':
        return html`<obi-user></obi-user>`;
      default:
        return nothing;
    }
  }

  private normalizeActionId(actionId: string) {
    return actionId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
  }

  private handleSignedInActionClick(action: ObcUserMenuSignedInAction) {
    this.dispatchEvent(
      new CustomEvent('signed-in-action-click', {
        detail: {id: action.id, label: action.label},
      })
    );
  }

  private handleRecentUserClick(user: ObcUserMenuUser) {
    this.dispatchEvent(
      new CustomEvent('recent-user-click', {
        detail: {initials: user.initials, label: user.label},
      })
    );
  }

  private handleUsernameInput(event: Event) {
    const target = event.target as {value?: string};
    this.username = target.value ?? '';
    if (this.username) {
      this.usernameError = '';
    }
  }

  private handlePasswordInput(event: Event) {
    const target = event.target as {value?: string};
    this.password = target.value ?? '';
    if (this.password) {
      this.passwordError = '';
    }
  }

  private validateSignIn() {
    let valid = true;
    const needsUsername = this.type === ObcUserMenuType.signIn;

    if (needsUsername && !this.username) {
      this.usernameError = msg('Username is required');
      valid = false;
    }

    if (!this.password) {
      this.passwordError = msg('Password is required');
      valid = false;
    }

    return valid;
  }

  private handleSignInClick() {
    if (!this.validateSignIn()) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('sign-in-click', {
        detail: {username: this.username, password: this.password},
      })
    );
  }

  private handleSignOutClick() {
    this.dispatchEvent(new CustomEvent('sign-out-click'));
  }

  private renderSignIn() {
    return html`
      <div class="title-container">
        <h3 class="title">${msg('Sign in')}</h3>
      </div>
      <div class="login-container">
        ${this.renderTextInput(
          msg('Username'),
          HTMLInputTypeAttribute.Text,
          false,
          this.username,
          this.handleUsernameInput.bind(this),
          this.usernameError
        )}
        ${this.renderTextInput(
          msg('Password'),
          HTMLInputTypeAttribute.Password,
          true,
          this.password,
          this.handlePasswordInput.bind(this),
          this.passwordError
        )}
        <obc-button
          variant=${ButtonVariant.raised}
          fullWidth
          @click=${this.handleSignInClick}
        >
          ${msg('Sign in')}
        </obc-button>
      </div>
      ${this.hasRecentlySignedIn
        ? html`
            <div class="recent-container">
              <div class="title-container">
                <div class="subtitle">${msg('Recently signed in')}</div>
              </div>
              <div class="actions-container">
                ${this.renderUserButtons(3, true)}
              </div>
            </div>
          `
        : nothing}
    `;
  }

  private renderSignInSmall() {
    return html`
      <div class="title-container">
        <h3 class="title">${msg('Sign in')}</h3>
      </div>
      <div class="login-container">
        ${this.renderTextInput(
          msg('Username'),
          HTMLInputTypeAttribute.Text,
          false,
          this.username,
          this.handleUsernameInput.bind(this),
          this.usernameError
        )}
        ${this.renderTextInput(
          msg('Password'),
          HTMLInputTypeAttribute.Password,
          true,
          this.password,
          this.handlePasswordInput.bind(this),
          this.passwordError
        )}
        <obc-button
          variant=${ButtonVariant.raised}
          fullWidth
          @click=${this.handleSignInClick}
        >
          ${msg('Sign in')}
        </obc-button>
      </div>
      <div class="divider" aria-hidden="true"></div>
      ${this.hasRecentlySignedIn
        ? html`
            <div class="recent-container recent">
              <div class="title-container">
                <div class="subtitle">${msg('Recent')}</div>
              </div>
              <div class="actions-container">
                ${this.renderUserButtons(3, false)}
              </div>
            </div>
          `
        : nothing}
    `;
  }

  private renderUserSignIn() {
    return html`
      <div class="title-container">
        <h3 class="title">${msg('Sign in')}</h3>
      </div>
      <div class="login-container">
        <div class="user-primary">
          ${this.renderUserProfile('vertical', 'large')}
        </div>
        <div class="fields">
          ${this.renderTextInput(
            msg('Password'),
            HTMLInputTypeAttribute.Password,
            true,
            this.password,
            this.handlePasswordInput.bind(this),
            this.passwordError
          )}
          <obc-button
            variant=${ButtonVariant.raised}
            fullWidth
            @click=${this.handleSignInClick}
          >
            ${msg('Sign in')}
          </obc-button>
        </div>
      </div>
      ${this.hasRecentlySignedIn
        ? html`
            <div class="recent-container">
              <div class="title-container">
                <div class="subtitle">${msg('Recently signed in')}</div>
              </div>
              <div class="actions-container">
                ${this.renderUserButtons(3, true)}
              </div>
            </div>
          `
        : nothing}
    `;
  }

  private renderUserSignInSmall() {
    return html`
      <div class="title-container">
        <h3 class="title">${msg('Sign in')}</h3>
      </div>
      <div class="user-container">
        ${this.renderUserProfile('horizontal', 'regular')}
      </div>
      <div class="login-container">
        ${this.renderTextInput(
          msg('Password'),
          HTMLInputTypeAttribute.Password,
          true,
          this.password,
          this.handlePasswordInput.bind(this),
          this.passwordError
        )}
        <obc-button
          variant=${ButtonVariant.raised}
          fullWidth
          @click=${this.handleSignInClick}
        >
          ${msg('Sign in')}
        </obc-button>
      </div>
      <div class="divider" aria-hidden="true"></div>
      ${this.hasRecentlySignedIn
        ? html`
            <div class="recent-container recent">
              <div class="title-container">
                <div class="subtitle">${msg('Recent')}</div>
              </div>
              <div class="actions-container">
                ${this.renderUserButtons(3, false)}
              </div>
            </div>
          `
        : nothing}
    `;
  }

  private renderLoadingSignIn() {
    return html`
      <div class="title-container">
        <h3 class="title">${msg('Sign in')}</h3>
      </div>
      <div class="user-primary loading">
        ${this.renderUserProfile('vertical', 'large')}
        <obc-progress-bar
          class="progress"
          type=${ProgressBarType.linear}
          mode=${ProgressBarMode.indeterminate}
          .showValue=${false}
        ></obc-progress-bar>
      </div>
    `;
  }

  private renderLoadingSignInSmall() {
    return html`
      <div class="title-container">
        <h3 class="title">${msg('Sign in')}</h3>
      </div>
      <div class="user-primary loading">
        ${this.renderUserProfile('horizontal', 'regular')}
        <obc-progress-bar
          class="progress"
          type=${ProgressBarType.linear}
          mode=${ProgressBarMode.indeterminate}
          .showValue=${false}
        ></obc-progress-bar>
      </div>
    `;
  }

  private renderSignedIn() {
    const actions = this.signedInActions.length
      ? this.signedInActions
      : this.defaultSignedInActions;
    return html`
      <div class="title-container">
        <h3 class="title">${msg('User')}</h3>
      </div>
      <div class="user-primary signed-in">
        ${this.renderUserProfile('vertical', 'large')}
      </div>
      <div class="divider" aria-hidden="true"></div>
      <div class="nav-container">
        ${actions.map((action) => {
          const normalizedId = this.normalizeActionId(action.id);
          return html`
            <obc-navigation-item
              .label=${action.label}
              hasIcon
              @click=${() => this.handleSignedInActionClick(action)}
            >
              <span slot="icon">
                <slot name="signed-in-action-icon-${normalizedId}">
                  ${this.getSignedInActionIcon(normalizedId)}
                </slot>
              </span>
            </obc-navigation-item>
          `;
        })}
      </div>
      <div class="button-container">
        <obc-button
          variant=${ButtonVariant.normal}
          fullWidth
          @click=${this.handleSignOutClick}
        >
          ${msg('Sign out')}
        </obc-button>
      </div>
    `;
  }

  private renderSignedInSmall() {
    const actions = this.signedInActions.length
      ? this.signedInActions
      : this.defaultSignedInActions;
    const primaryAction = actions[2];
    return html`
      <div class="title-container">
        <h3 class="title">${msg('User')}</h3>
      </div>
      <div class="user-container">
        ${this.renderUserProfile('horizontal', 'regular')}
      </div>
      <div class="button-container">
        ${primaryAction
          ? html`
              <obc-button
                variant=${ButtonVariant.normal}
                fullWidth
                @click=${() => this.handleSignedInActionClick(primaryAction)}
              >
                ${primaryAction.label}
              </obc-button>
            `
          : nothing}
        <obc-button
          variant=${ButtonVariant.normal}
          fullWidth
          @click=${this.handleSignOutClick}
        >
          ${msg('Sign out')}
        </obc-button>
      </div>
    `;
  }

  override render() {
    let content: TemplateResult | symbol = nothing;
    if (this.type === ObcUserMenuType.signIn) {
      content =
        this.size === ObcUserMenuSize.small
          ? this.renderSignInSmall()
          : this.renderSignIn();
    }
    if (this.type === ObcUserMenuType.userSignIn) {
      content =
        this.size === ObcUserMenuSize.small
          ? this.renderUserSignInSmall()
          : this.renderUserSignIn();
    }
    if (this.type === ObcUserMenuType.loadingSignIn) {
      content =
        this.size === ObcUserMenuSize.small
          ? this.renderLoadingSignInSmall()
          : this.renderLoadingSignIn();
    }
    if (this.type === ObcUserMenuType.signedIn) {
      content =
        this.size === ObcUserMenuSize.small
          ? this.renderSignedInSmall()
          : this.renderSignedIn();
    }

    return html`
      <div
        class=${classMap({
          card: true,
          [`size-${this.size}`]: true,
          [`type-${this.type}`]: true,
        })}
      >
        ${content}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-user-menu': ObcUserMenu;
  }
}
