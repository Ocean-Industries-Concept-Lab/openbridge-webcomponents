import type {
  Meta,
  StoryObj,
  StoryContext,
} from '@storybook/web-components-vite';
import {html} from 'lit';
import {withActions} from 'storybook/actions/decorator';
import './form-container.js';
import {ObcFormContainerType} from './form-container.js';
import '../title-container/title-container.js';
import '../form-group/form-group.js';
import '../form-item/form-item.js';
import '../form-footer-container/form-footer-container.js';
import '../icon-button/icon-button.js';
import {ObcFormGroupType} from '../form-group/form-group.js';
import {ObcFormItemType} from '../form-item/form-item.js';
import '../../icons/icon-placeholder.js';

type FormContainerArgs = {
  type: ObcFormContainerType;
  contentTitle: string;
  title: string;
  label: string;
};

const meta = {
  title: 'UI Components/Form components/Form container',
  component: 'obc-form-container',
  decorators: [
    (story) =>
      html`<div
        style="display:flex;justify-content:center;align-items:center;min-height:80vh;"
      >
        <div style="width:640px;height:640px;">${story()}</div>
      </div>`,
    withActions,
  ],
  parameters: {
    actions: {
      handles: [
        'action-change',
        'title-action-1-click',
        'title-action-2-click',
        'footer-action-1-click',
        'footer-action-2-click',
        'footer-action-3-click',
        'footer-action-4-click',
      ],
    },
    controls: {
      include: ['type', 'title', 'label', 'contentTitle'],
    },
    docs: {
      source: {
        transform: (
          _code: string,
          storyContext: StoryContext<FormContainerArgs>
        ) => {
          const {type, contentTitle, title, label} = storyContext.args;
          const showActions =
            type === ObcFormContainerType.Enabled ||
            type === ObcFormContainerType.Completed;
          const attr = type ? ` type="${type}"` : '';
          const footerHasActionsAttr = ' has-actions';
          const contentTitleLine =
            contentTitle && contentTitle.trim() !== ''
              ? `  <span slot="content-title">${contentTitle}</span>\n`
              : '';
          const actionSlots = showActions
            ? '\n    <obc-icon-button slot="actions" variant="flat" aria-label="Action 1">\n      <obi-placeholder></obi-placeholder>\n    </obc-icon-button>\n    <obc-icon-button slot="actions" variant="flat" aria-label="Action 2">\n      <obi-placeholder></obi-placeholder>\n    </obc-icon-button>'
            : '';
          const footerActionItems = `    <obc-icon-button variant="flat" aria-label="Action 1">
      <obi-placeholder></obi-placeholder>
    </obc-icon-button>
    <obc-icon-button variant="flat" aria-label="Action 2">
      <obi-placeholder></obi-placeholder>
    </obc-icon-button>
    <obc-icon-button variant="flat" aria-label="Action 3">
      <obi-placeholder></obi-placeholder>
    </obc-icon-button>
    <obc-icon-button variant="flat" aria-label="Action 4">
      <obi-placeholder></obi-placeholder>
    </obc-icon-button>`;
          return `<obc-form-container${attr}>
  <obc-title-container slot="title">
    <obi-placeholder slot="icon"></obi-placeholder>
    <span slot="title">${title}</span>
    <span slot="label">${label}</span>
${actionSlots}
  </obc-title-container>
${contentTitleLine}  <!-- content -->
  <obc-form-footer-container slot="footer"${footerHasActionsAttr}>
${footerActionItems}
  </obc-form-footer-container>
</obc-form-container>`;
        },
      },
    },
  },
  args: {
    type: ObcFormContainerType.View,
    title: 'Title',
    label: 'Label',
    contentTitle: 'Some information here',
  },
  argTypes: {
    type: {control: 'select', options: Object.values(ObcFormContainerType)},
    title: {control: 'text'},
    label: {control: 'text'},
    contentTitle: {control: 'text'},
  },
} satisfies Meta<FormContainerArgs>;

export default meta;
type Story = StoryObj<FormContainerArgs>;

const renderContent = (type: ObcFormContainerType) => {
  const isInactive = type === ObcFormContainerType.Inactive;
  const isCompleted = type === ObcFormContainerType.Completed;
  const formGroupType = isInactive
    ? ObcFormGroupType.Inactive
    : isCompleted
      ? ObcFormGroupType.FilledStatusFirst
      : type === ObcFormContainerType.Enabled
        ? ObcFormGroupType.EnabledActionFirst
        : ObcFormGroupType.View;

  const itemType = isInactive
    ? ObcFormItemType.Inactive
    : isCompleted
      ? ObcFormItemType.FilledStatusFirst
      : type === ObcFormContainerType.Enabled
        ? ObcFormItemType.EnabledActionFirst
        : ObcFormItemType.View;

  const secondGroupExtra =
    type === ObcFormContainerType.View ||
    type === ObcFormContainerType.Enabled ||
    type === ObcFormContainerType.Inactive
      ? html`
          <obc-form-item .type=${itemType}>
            This is a list item with multiple lines that can take up as much
            space as it needs. Like it can be really long and go on for a while.
          </obc-form-item>
        `
      : null;

  const completedExtraItems = isCompleted
    ? html`
        <obc-form-item .type=${itemType}>
          This is a list item with multiple lines that can take up as much space
          as it needs. Like it can be really long and go on for a while.
        </obc-form-item>
        <obc-form-item .type=${itemType}>
          This is a list item with multiple lines that can take up as much space
          as it needs. Like it can be really long and go on for a while.
        </obc-form-item>
      `
    : null;

  return html`
    <obc-form-group .type=${formGroupType}>
      <span slot="subtitle" class="subtitle">Subtitle</span>
      <span slot="text" class="text"
        >Some text here to describe what this part is about</span
      >
      <obc-form-item .type=${itemType}>
        This is a list item with multiple lines that can take up as much space
        as it needs. Like it can be really long and go on for a while.
      </obc-form-item>
      <obc-form-item .type=${itemType}>
        This is a list item with multiple lines that can take up as much space
        as it needs. Like it can be really long and go on for a while.
      </obc-form-item>
    </obc-form-group>
    <obc-form-group .type=${formGroupType}>
      <span slot="subtitle" class="subtitle">Subtitle</span>
      <span slot="text" class="text"
        >Some text here to describe what this part is about</span
      >
      <obc-form-item .type=${itemType}>
        This is a list item with multiple lines that can take up as much space
        as it needs. Like it can be really long and go on for a while.
      </obc-form-item>
      <obc-form-item .type=${itemType}>
        This is a list item with multiple lines that can take up as much space
        as it needs. Like it can be really long and go on for a while.
      </obc-form-item>
      ${secondGroupExtra} ${completedExtraItems}
    </obc-form-group>
  `;
};

const renderTitle = (args: FormContainerArgs) => {
  const {type, title, label} = args;
  const showActions =
    type === ObcFormContainerType.Enabled ||
    type === ObcFormContainerType.Completed;
  return html`
    <obc-title-container
      slot="title"
      state=${type === ObcFormContainerType.Inactive ? 'inactive' : 'enabled'}
      @action-click=${(event: CustomEvent<{action: number}>) => {
        event.stopPropagation();
        const host = event.currentTarget as HTMLElement | null;
        const action = event.detail?.action;
        if (!host || !action) return;
        host.dispatchEvent(
          new CustomEvent(`title-action-${action}-click`, {
            detail: event.detail,
            bubbles: true,
            composed: true,
          })
        );
      }}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
      <span slot="title">${title}</span>
      <span slot="label">${label}</span>
      ${showActions
        ? html`
            <obc-icon-button
              slot="actions"
              variant="flat"
              aria-label="Action 1"
            >
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
            <obc-icon-button
              slot="actions"
              variant="flat"
              aria-label="Action 2"
            >
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
          `
        : null}
    </obc-title-container>
  `;
};

const renderFooter = () => {
  const showActions = true;
  return html`
    <obc-form-footer-container
      slot="footer"
      .hasActions=${showActions}
      @action-click=${(event: CustomEvent<{action: number}>) => {
        event.stopPropagation();
        const host = event.currentTarget as HTMLElement | null;
        const action = event.detail?.action;
        if (!host || !action) return;
        host.dispatchEvent(
          new CustomEvent(`footer-action-${action}-click`, {
            detail: event.detail,
            bubbles: true,
            composed: true,
          })
        );
      }}
    >
      ${showActions
        ? html`
            <obc-icon-button variant="flat" aria-label="Action 1">
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
            <obc-icon-button variant="flat" aria-label="Action 2">
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
            <obc-icon-button variant="flat" aria-label="Action 3">
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
            <obc-icon-button variant="flat" aria-label="Action 4">
              <obi-placeholder></obi-placeholder>
            </obc-icon-button>
          `
        : null}
    </obc-form-footer-container>
  `;
};

const renderFormContainer = (args: FormContainerArgs) => {
  const {type, contentTitle} = args;
  const showContentTitle = contentTitle.trim() !== '';
  return html`
    <obc-form-container .type=${type}>
      ${renderTitle(args)}
      ${showContentTitle
        ? html`<span slot="content-title">${contentTitle}</span>`
        : null}
      ${renderContent(type)} ${renderFooter()}
    </obc-form-container>
  `;
};

export const Playground: Story = {
  name: '📌 Playground',
  render: (args) => renderFormContainer(args),
};

export const View: Story = {
  args: {
    type: ObcFormContainerType.View,
    title: 'Title',
    label: 'Label',
    contentTitle: 'Some information here',
  },
  render: (args) => renderFormContainer(args),
};

export const Enabled: Story = {
  args: {
    type: ObcFormContainerType.Enabled,
    title: 'Title',
    label: 'Label',
    contentTitle: 'Some information here',
  },
  render: (args) => renderFormContainer(args),
};

export const Inactive: Story = {
  args: {
    type: ObcFormContainerType.Inactive,
    title: 'Title',
    label: 'Label',
    contentTitle: 'Some information here',
  },
  render: (args) => renderFormContainer(args),
};

export const Completed: Story = {
  args: {
    type: ObcFormContainerType.Completed,
    title: 'Title',
    label: 'Label',
    contentTitle: 'Some information here',
  },
  render: (args) => renderFormContainer(args),
};
