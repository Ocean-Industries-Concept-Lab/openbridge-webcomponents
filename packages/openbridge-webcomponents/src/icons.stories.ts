import type { Meta, StoryObj } from '@storybook/web-components';
import "./icons";
import { html, unsafeStatic } from 'lit/static-html.js';
import { iconIds } from "./icons/names"

const meta: Meta = {
    title: 'Icons/icon',

} satisfies Meta;

export default meta;
type Story = StoryObj;

export const List: Story = {
    args: {
        search: '',
        useCssColor: true,
    },
    argTypes: {
        search: {
            control: { type: 'text', description: 'Search for icon', },
        },
        useCssColor: {
            control: { type: 'boolean' },
        }
    },
    render: (args) => {
        const items = iconIds.filter((name) => name.includes(args.search));
        return html`
                <style>
                    .icon {
                       height: 32px;
                       display: inline-block;
                    }
    
                    .item {
                        display: flex;
                        align-items: center;
                        margin: 4px;
                        gap: 4px
                    }
                </style>
                <div style="display: flex; flex-wrap: wrap; flex-direction: column">
                    ${items.map((name) => html`<div class="item"><${unsafeStatic(`obi-${name}`)} ?use-css-color=${args.useCssColor} class="icon"></${unsafeStatic(`obi-${name}`)}> &lt;obi-${name}&gt;</div>`)}
                    
                </div>
            `;
    },
};

export const UseFontColor: Story = {
    args: {
        useCssColor: false,
        name: '01-log-add',
        size: 32,
        color: 'green',
    },
    argTypes: {
        name: {
            options: iconIds,
            control: {type: 'select'},
          },
        size: {
            control: {type: 'range', min: 16, max: 128, step: 1},
        },
    },
    render: (args) =>
        html`<div style="height: ${args.size}px; color: ${args.color}">
         <${unsafeStatic(`obi-${args.name}`)} ?use-css-color=${args.useCssColor} class="icon"></${unsafeStatic(`obi-${args.name}`)}> 
         </div>`
};