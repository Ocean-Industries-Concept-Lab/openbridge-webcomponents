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
    hasRecentlySignedIn: {
      control: {type: 'boolean'},
    },
    username: {
      control: {type: 'text'},
    },
    password: {
      control: {type: 'text'},
    },
    usernameError: {
      control: {type: 'text'},
    },
    passwordError: {
      control: {type: 'text'},
    },
    userInitials: {
      control: {type: 'text'},
    },
    userLabel: {
      control: {type: 'text'},
    },
    recentUsers: {
      control: {type: 'object'},
    },
    signedInActions: {
      control: {type: 'object'},
    },
  },
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: false,
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    userInitials: 'AB',
    userLabel: 'Username',
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
  },
  render: (args) => {
    return html`
      <obc-user-menu
        type=${args.type}
        size=${args.size}
        ?hasRecentlySignedIn=${args.hasRecentlySignedIn}
        username=${args.username}
        password=${args.password}
        usernameError=${args.usernameError}
        passwordError=${args.passwordError}
        .userInitials=${args.userInitials}
        .userLabel=${args.userLabel}
        .recentUsers=${args.recentUsers}
        .signedInActions=${args.signedInActions}
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
