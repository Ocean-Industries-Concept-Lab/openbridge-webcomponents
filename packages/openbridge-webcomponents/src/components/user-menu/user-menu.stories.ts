import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcUserMenu, ObcUserMenuSize, ObcUserMenuType} from './user-menu.js';
import './user-menu.js';
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

/**
 * Roles are set here but the small layout draws none, so this renders exactly
 * as it would with no role at all.
 */
export const UserSignInSmallIgnoresRole: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.small,
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
