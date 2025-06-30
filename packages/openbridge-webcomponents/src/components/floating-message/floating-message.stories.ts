import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './floating-message.js';
import { ObcFloatingMessage, ObcFloatingMessageType } from './floating-message';
import "../../icons/icon-placeholder";

const meta: Meta<ObcFloatingMessage> = {
  title: 'Application/Floating Message',
  component: 'obc-floating-message',
  tags: ['6.0'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcFloatingMessageType),
    },
    /* new gatekeeper booleans */
    action:  { control: 'boolean' },
    action2: { control: 'boolean' },
    /* kept props */
    hasTimestamp: { control: 'boolean' },
    hasDay:       { control: 'boolean' },
  },
  args: {
    type: ObcFloatingMessageType.Regular,
    action:  true,
    action2: true,
    hasTimestamp: true,
    hasDay: false,
  },
};
export default meta;
type Story = StoryObj<ObcFloatingMessage>;

/* ------------- Story helpers ---------------- */
const template = (args: any) => html`
  <obc-floating-message
    .type=${args.type}
    .hasTimestamp=${args.hasTimestamp}
    .hasDay=${args.hasDay}
    .action=${args.action}
    .action2=${args.action2}
  >
    <div slot="primary-icon"><obi-placeholder></obi-placeholder></div>
    <span slot="title">Message title</span>
    <span slot="description">Message text goes here, something informative</span>
    ${args.hasTimestamp ? html`<span slot="time">09:12:46</span>` : ''}
    ${args.hasDay       ? html`<span slot="day">Yesterday</span>` : ''}

    <!-- action labels (shown only when corresponding prop = true) -->
    ${args.action  ? html`<span slot="action">Close</span>` : ''}
    ${args.action2 ? html`<span slot="action2">Undo</span>` : ''}
  </obc-floating-message>
`;

/* basic variants */
export const Primary: Story         = { render: template, args: { action: true,  action2: false } };
export const WithTwoActions: Story  = { render: template, args: { action: true,  action2: true  } };
export const IconAction: Story      = { render: template, args: { action: true,  action2: false } };
export const NoAction: Story        = { render: template, args: { action: false, action2: false } };
export const ApplicationType: Story = {
  render: template,
  args: { type: ObcFloatingMessageType.Application, action: true, action2: false },
};
export const Selected: Story = {
  render: (args) => html`
    <div style="background: var(--color-primary-light, #e6f3ff); padding: 2px; border-radius: 4px;">
      ${template(args)}
    </div>
  `,
  args: { action: true, action2: false },
};
