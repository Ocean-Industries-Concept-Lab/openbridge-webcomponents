import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './title-container.js';
import {ObcTitleContainerState} from './title-container.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';

type TitleContainerArgs = {
  state: ObcTitleContainerState;
  title: string;
  label: string;
  actionsCount: number;
  onActionClick?: (event: CustomEvent<{action: number}>) => void;
};

const meta = {
  title: 'UI Components/Forms/Title Container',
  tags: ['!autodocs'],
  component: 'obc-title-container',
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
      include: ['state', 'title', 'label', 'actionsCount'],
    },
    docs: {
      source: {
        transform: (
          _code: string,
          storyContext: {args: TitleContainerArgs}
        ) => {
          const args = storyContext.args;
          const attrs: string[] = [];

          if (args.state) attrs.push(`state="${args.state}"`);

          const attrString = attrs.length ? ` ${attrs.join(' ')}` : '';
          const actionSlots = Array.from(
            {length: Math.max(0, args.actionsCount)},
            (_, index) => {
              const action = index + 1;
              return `  <obc-icon-button slot="actions" variant="flat" aria-label="Action ${action}">
    <obi-placeholder></obi-placeholder>
  </obc-icon-button>`;
            }
          ).join('\n');

          return `<obc-title-container${attrString}>
  <obi-placeholder slot="icon"></obi-placeholder>
  <span slot="title">${args.title}</span>
  <span slot="label">${args.label}</span>
${actionSlots}
</obc-title-container>`;
        },
      },
    },
  },
  args: {
    state: ObcTitleContainerState.Enabled,
    title: 'Title',
    label: 'Label',
    actionsCount: 2,
  },
  argTypes: {
    state: {control: 'select', options: Object.values(ObcTitleContainerState)},
    title: {control: 'text'},
    label: {control: 'text'},
    actionsCount: {
      control: {type: 'number', min: 0, max: 12, step: 1},
    },
    onActionClick: {
      action: 'action-click',
      name: 'action-click',
      table: {disable: true},
    },
  },
} satisfies Meta<TitleContainerArgs>;

export default meta;
type Story = StoryObj<TitleContainerArgs>;

const renderTitleContainer = (args: Partial<TitleContainerArgs>) => {
  const resolvedArgs: TitleContainerArgs = {
    state: ObcTitleContainerState.Enabled,
    title: 'Title',
    label: 'Label',
    actionsCount: 2,
    ...args,
  };
  return html`
    <obc-title-container
      .state=${resolvedArgs.state}
      @action-click=${resolvedArgs.onActionClick}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
      <span slot="title">${resolvedArgs.title}</span>
      <span slot="label">${resolvedArgs.label}</span>
      ${Array.from(
        {length: Math.max(0, resolvedArgs.actionsCount)},
        (_, index) => {
          const action = index + 1;
          return html`
            <obc-icon-button
              slot="actions"
              variant="flat"
              aria-label=${`Action ${action}`}
            >
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
          `;
        }
      )}
    </obc-title-container>
  `;
};

export const Playground: Story = {
  name: '📌 Playground',
  render: (args) => renderTitleContainer(args),
};

export const Enabled: Story = {
  render: () =>
    renderTitleContainer({
      state: ObcTitleContainerState.Enabled,
      title: 'Title',
      label: 'Label',
      actionsCount: 2,
    }),
};

export const Inactive: Story = {
  render: () =>
    renderTitleContainer({
      state: ObcTitleContainerState.Inactive,
      title: 'Title',
      label: 'Label',
      actionsCount: 2,
    }),
};
