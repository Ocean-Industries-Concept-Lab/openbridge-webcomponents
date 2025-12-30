import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcUserMenu, ObcUserMenuSize, ObcUserMenuType} from './user-menu.js';
import './user-menu.js';

const meta: Meta<ObcUserMenu> = {
  title: 'Application Components/Menus/User Menu',
  tags: ['autodocs', '6.0'],
  component: 'obc-user-menu',
  parameters: {
    layout: 'centered',
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
    userInitials: {
      control: {type: 'text'},
    },
    userLabel: {
      control: {type: 'text'},
    },
    recentUsers: {
      control: {type: 'object'},
    },
  },
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.regular,
    hasRecentlySignedIn: true,
    userInitials: 'AB',
    userLabel: 'Username',
    recentUsers: [
      {initials: 'AB', label: 'Username'},
      {initials: 'CD', label: 'Username'},
      {initials: 'EF', label: 'Username'},
    ],
  },
} satisfies Meta<ObcUserMenu>;

export default meta;
type Story = StoryObj<ObcUserMenu>;

export const SignInRegular: Story = {
  args: {
    type: ObcUserMenuType.signIn,
    size: ObcUserMenuSize.regular,
  },
};

export const UserSignInRegular: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.regular,
  },
};

export const LoadingSignInRegular: Story = {
  args: {
    type: ObcUserMenuType.loadingSignIn,
    size: ObcUserMenuSize.regular,
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
  },
};

export const UserSignInSmall: Story = {
  args: {
    type: ObcUserMenuType.userSignIn,
    size: ObcUserMenuSize.small,
  },
};
