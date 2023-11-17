import type { Meta, StoryObj } from '@storybook/web-components';
import { AppMenu, type MenuItem } from './AppMenu';
import './AppMenu';

const meta: Meta<typeof AppMenu> = {
    title: 'Application/App menu',
    tags: ['autodocs'],
    component: "ob-app-menu",
    args: {
    },
    argTypes: {
    },
} satisfies Meta<AppMenu>;

export default meta;
type Story = StoryObj<AppMenu>;

export const Primary: Story = {
    args: {
        items: [
            { name: "Radar", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
            { name: "Label", icon: "06-ship" },
        ] as Array<MenuItem>
    },
};