import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './form-footer-container.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';

type FormFooterContainerArgs = {
  hasActions: boolean;
  actionsCount: number;
  onActionClick?: (event: CustomEvent<{action: number}>) => void;
};

const meta = {
  title: 'UI Components/Form components/Form footer container',
  component: 'obc-form-footer-container',
  decorators: [
    (story) =>
      html`<div
        style="display:flex;justify-content:center;align-items:center;min-height:70vh;"
      >
        <div style="width:640px;">${story()}</div>
      </div>`,
  ],
  parameters: {
    actions: {
      handles: ['action-click'],
    },
    controls: {
      include: ['hasActions', 'actionsCount'],
    },
    docs: {
      source: {
        transform: (
          _code: string,
          storyContext: {args: FormFooterContainerArgs}
        ) => {
          const args = storyContext.args;
          const attrs: string[] = [];

          if (args.hasActions) attrs.push('has-actions');

          const attrString = attrs.length ? ` ${attrs.join(' ')}` : '';
          const actionSlots = args.hasActions
            ? Array.from(
                {length: Math.max(0, args.actionsCount)},
                (_, index) => {
                  const action = index + 1;
                  return `  <obc-icon-button variant="flat" aria-label="Action ${action}">
    <obi-placeholder></obi-placeholder>
  </obc-icon-button>`;
                }
              ).join('\n')
            : '';

          return `<obc-form-footer-container${attrString}>
${actionSlots}
</obc-form-footer-container>`;
        },
      },
    },
  },
  args: {
    hasActions: true,
    actionsCount: 4,
  },
  argTypes: {
    actionsCount: {
      control: {type: 'number', min: 0, max: 12, step: 1},
    },
    onActionClick: {
      action: 'action-click',
      name: 'action-click',
      table: {disable: true},
    },
  },
} satisfies Meta<FormFooterContainerArgs>;

export default meta;
type Story = StoryObj<FormFooterContainerArgs>;

const renderFooter = (args: FormFooterContainerArgs) => html`
  <obc-form-footer-container
    .hasActions=${args.hasActions}
    @action-click=${args.onActionClick}
  >
    ${args.hasActions
      ? Array.from({length: Math.max(0, args.actionsCount)}, (_, index) => {
          const action = index + 1;
          return html`
            <obc-icon-button variant="flat" aria-label=${`Action ${action}`}>
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
          `;
        })
      : null}
  </obc-form-footer-container>
`;

export const Playground: Story = {
  name: '📌 Playground',
  render: (args) => renderFooter(args),
};

export const Normal: Story = {
  render: () =>
    renderFooter({
      hasActions: true,
      actionsCount: 4,
    }),
};

export const NoActions: Story = {
  render: () =>
    renderFooter({
      hasActions: false,
      actionsCount: 4,
    }),
};
