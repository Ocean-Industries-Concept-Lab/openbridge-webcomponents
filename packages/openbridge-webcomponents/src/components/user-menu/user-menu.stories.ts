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

export const SignInWithoutFileds: Story = {
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.small,
    showUsername: false,
    showPassword: false,
  },
};
