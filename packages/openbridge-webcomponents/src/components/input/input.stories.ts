import type { Meta, StoryObj } from '@storybook/web-components';
import { Input } from './Input';
import './Input';
import { iconIds } from '../icons';

const meta: Meta<typeof Input> = {
    title: 'Input/Input',
    tags: ['autodocs'],
    component: "ob-input",
    args: {
    },
    argTypes: {
        placeholder: {
            control: { type: 'text' }
        },
        value: {
            control: { type: 'text' }
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'password']
        },
        icon: {
            control: { type: 'select' },
            options: ["", ...iconIds]
        }
    },
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<Input>;

export const Primary: Story = {
    args: {
        placeholder: "Placeholder",
    },
};

export const WithIcon: Story = {
    args: {
        placeholder: "Placeholder",
        icon: "01-search"
    },
};