import type { Meta, StoryObj } from '@storybook/web-components';
import { Icon } from './Icon';
import './Icon';
import { iconIds } from "../icons"

const meta: Meta<typeof Icon> = {
    title: 'Icon/Icon',
    tags: ['autodocs'],
    component: "ob-icon",
    args: {
    },
    argTypes: {
        icon: {
            control: { type: 'select' },
            options: iconIds
        },
        size: {
            control: { type: 'number' }
        },
        useCssColor: {
            control: { type: 'boolean' }
        }
    }
} satisfies Meta<Icon>;

export default meta;
type Story = StoryObj<Icon>;

export const Normal: Story = {
    args: {
        icon: "01-placeholder",
        size: 24
    },
};

export const Large: Story = {
    args: {
        icon: "01-placeholder",
        size: 48
    },
};

export const CssColor: Story = {
    args: {
        icon: "14-warning-acknowledged",
        useCssColor: true,
        size: 24
    },
};