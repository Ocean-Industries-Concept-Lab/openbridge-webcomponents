import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcUserMenu, ObcUserMenuSize, ObcUserMenuType} from './user-menu.js';
import './user-menu.js';
import '../../integration-systems/integration-bar/integration-bar.js';
import {html} from 'lit';
import {withActions} from 'storybook/actions/decorator';

const meta: Meta<ObcUserMenu> = {
  title: 'Application Components/Menus/User Menu',
  tags: ['autodocs', '6.0'],
  component: 'obc-user-menu',
  parameters: {
    layout: 'centered',
    actions: {
      handles: [
        'sign-in-click',
        'sign-out-click',
        'signed-in-action-click',
        'recent-user-click',
        'use-another-account-click',
      ],
    },
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcUserMenuType),
    },
    size: {
      control: {type: 'select'},
      options: Object.values(ObcUserMenuSize),
    },
    recentUsers: {
      control: {type: 'object'},
    },
    signedInActions: {
      control: {type: 'object'},
    },
    primaryActionId: {
      control: {type: 'text'},
    },
  },
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: false,
    showUsername: true,
    showPassword: true,
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    userInitials: 'AB',
    userLabel: 'Username',
    userRole: '',
    showUseAnotherAccount: true,
    recentUsers: [
      {initials: 'AB', label: 'Username'},
      {initials: 'CD', label: 'Username'},
      {initials: 'EF', label: 'Username'},
    ],
    signedInActions: [
      {id: 'calendar', label: 'Calendar'},
      {id: 'log', label: 'Log'},
      {id: 'preferences', label: 'Preferences'},
      {id: 'user-account', label: 'User account'},
    ],
    primaryActionId: 'preferences',
  },
  render: (args) => {
    return html`
      <obc-user-menu
        type=${args.type}
        size=${args.size}
        ?hasRecentlySignedIn=${args.hasRecentlySignedIn}
        .showUsername=${args.showUsername}
        .showPassword=${args.showPassword}
        username=${args.username}
        password=${args.password}
        usernameError=${args.usernameError}
        passwordError=${args.passwordError}
        .userInitials=${args.userInitials}
        .userLabel=${args.userLabel}
        .userRole=${args.userRole}
        .showUseAnotherAccount=${args.showUseAnotherAccount}
        .recentUsers=${args.recentUsers}
        .signedInActions=${args.signedInActions}
        .primaryActionId=${args.primaryActionId}
      ></obc-user-menu>
    `;
  },
  decorators: [withActions],
} satisfies Meta<ObcUserMenu>;

export default meta;
type Story = StoryObj<ObcUserMenu>;

export const SignInRegular: Story = {
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: true,
  },
};

export const UserSignInRegular: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: true,
  },
};

export const LoadingSignInRegular: Story = {
  args: {
    type: ObcUserMenuType.loadingSignIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: true,
  },
};

export const SignedInRegular: Story = {
  args: {
    type: ObcUserMenuType.signedIn,
    size: ObcUserMenuSize.regular,
  },
};

export const LoadingSignInSmall: Story = {
  args: {
    type: ObcUserMenuType.loadingSignIn,
    size: ObcUserMenuSize.small,
    hasRecentlySignedIn: true,
  },
};

export const SignedInSmall: Story = {
  args: {
    type: ObcUserMenuType.signedIn,
    size: ObcUserMenuSize.small,
  },
};

export const SignInSmall: Story = {
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.small,
    hasRecentlySignedIn: true,
  },
};

export const UserSignInSmall: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.small,
    hasRecentlySignedIn: true,
  },
};

export const SignInWithoutFields: Story = {
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.small,
    showUsername: false,
    showPassword: false,
  },
};

export const UserSignInWithoutPasswordRegular: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.regular,
    showPassword: false,
  },
};

export const UserSignInWithoutPasswordSmall: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.small,
    showPassword: false,
  },
};

export const SignedInWithoutActions: Story = {
  args: {
    type: ObcUserMenuType.signedIn,
    size: ObcUserMenuSize.regular,
    signedInActions: [],
    primaryActionId: undefined,
  },
};

export const UserSignInWithRoles: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: true,
    userRole: 'Role',
    recentUsers: [
      {initials: 'AB', label: 'Username', role: 'Role'},
      {initials: 'CD', label: 'Username', role: 'Role'},
      {initials: 'EF', label: 'Username', role: 'Role'},
    ],
  },
};

export const SignedInWithRole: Story = {
  args: {
    type: ObcUserMenuType.signedIn,
    size: ObcUserMenuSize.regular,
    userRole: 'Role',
  },
};

export const UserSignInWithoutUseAnotherAccount: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.regular,
    showUseAnotherAccount: false,
  },
};

export const UserSignInSmallWithoutUseAnotherAccount: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.small,
    showUseAnotherAccount: false,
  },
};

export const UserSignInSmallIgnoresRole: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.small,
    hasRecentlySignedIn: true,
    userRole: 'Role',
    recentUsers: [{initials: 'AB', label: 'Username', role: 'Role'}],
  },
};

export const SignInWithoutRecentUsers: Story = {
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.small,
    hasRecentlySignedIn: true,
    recentUsers: [],
  },
};

/**
 * A menu opened from a bar's own button, the way `obc-top-bar` and
 * `obc-integration-bar` report theirs: as an event, with no button element to
 * hand. Three bindings do it (#1293):
 *
 * - `softDismiss` on the menu;
 * - `open` bound to a flag the app keeps, flipped from the bar's
 *   `user-button-clicked` event; the same flag drives `userButtonActivated`;
 * - `close` resets that flag, so the button stops looking pressed when the
 *   menu closed on its own, and its next click opens the menu again.
 *
 * The bar stays reachable while the menu is up, so a click on its button
 * closes the menu: one click, not two. The rest of the page is covered, so
 * the button below is not pressed by the click that closes the menu.
 * `bindPopoverTrigger` is not involved; it is for a button the app holds
 * itself, as in the brilliance menu's *Soft Dismiss* story. The vue demo runs
 * its top bar this way (`packages/vue-demo/src/App.vue`).
 */
export const SoftDismissFromABarButton: Story = {
  // Nothing to snapshot: the story is about what the clicks do, not about
  // how the menu looks.
  tags: ['skip-test'],
  parameters: {layout: 'fullscreen'},
  args: {
    type: ObcUserMenuType.signedIn,
    size: ObcUserMenuSize.small,
    softDismiss: true,
  },
  render: (args) => {
    const bar = document.createElement('obc-integration-bar');
    bar.showUserButton = true;

    const menu = document.createElement('obc-user-menu');
    Object.assign(menu, args);
    // Under the bar's right end, where its user button sits.
    menu.style.cssText =
      'position: fixed; right: 4px;' +
      'top: calc(var(--app-components-topbar-touch-target-size) + 4px);';

    let open = false;
    const apply = () => {
      menu.open = open;
      bar.userButtonActivated = open;
    };
    bar.addEventListener('user-button-clicked', () => {
      open = !open;
      apply();
    });
    menu.addEventListener('close', () => {
      open = false;
      apply();
    });

    let hits = 0;
    const behind = document.createElement('button');
    behind.textContent = 'a button behind the menu';
    behind.style.cssText = 'display: block; margin: 240px 16px 0 auto;';
    behind.addEventListener('click', () => {
      behind.textContent = `clicked ${++hits} time${hits === 1 ? '' : 's'}`;
    });

    const root = document.createElement('div');
    root.append(bar, menu, behind);
    return root;
  },
};
