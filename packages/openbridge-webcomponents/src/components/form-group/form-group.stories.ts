import type {
  Meta,
  StoryObj,
  StoryContext,
} from '@storybook/web-components-vite';
import {html} from 'lit';
import './form-group.js';
import '../form-item/form-item.js';
import {ObcFormGroupType} from './form-group.js';
import {
  type ObcFormItemActionChangeEvent,
  ObcFormItemType,
} from '../form-item/form-item.js';

type FormGroupArgs = {
  type?: ObcFormGroupType;
  subtitle?: string;
  text?: string;
  onActionChange?: (event: ObcFormItemActionChangeEvent) => void;
};

const defaultArgs: FormGroupArgs = {
  type: ObcFormGroupType.View,
  subtitle: 'Subtitle',
  text: 'Some text here to describe what this part is about',
};

const mapGroupTypeToItemType = (type: ObcFormGroupType): ObcFormItemType => {
  switch (type) {
    case ObcFormGroupType.View:
      return ObcFormItemType.View;
    case ObcFormGroupType.EnabledActionFirst:
      return ObcFormItemType.EnabledActionFirst;
    case ObcFormGroupType.FilledStatusFirst:
      return ObcFormItemType.FilledStatusFirst;
    case ObcFormGroupType.EnabledActionLast:
      return ObcFormItemType.EnabledActionLast;
    case ObcFormGroupType.FilledStatusLast:
      return ObcFormItemType.FilledStatusLast;
    case ObcFormGroupType.Inactive:
      return ObcFormItemType.Inactive;
  }
};

const meta = {
  title: 'UI Components/Form components/Form group',
  component: 'obc-form-group',
  decorators: [
    (story) =>
      html`<div
        style="display: flex; justify-content: center; align-items: center;"
      >
        ${story()}
      </div>`,
  ],
  parameters: {
    actions: {
      handles: ['action-change'],
    },
    controls: {
      include: ['type', 'subtitle', 'text'],
    },
    docs: {
      source: {
        transform: (
          _code: string,
          storyContext: StoryContext<FormGroupArgs>
        ) => {
          const args = storyContext.args;
          const attrPairs: string[] = [];

          if (args.type) attrPairs.push(`type="${args.type}"`);

          const attrs = attrPairs.length ? ` ${attrPairs.join(' ')}` : '';

          const subtitle = args.subtitle ?? 'Subtitle';
          const text =
            args.text ?? 'Some text here to describe what this part is about';

          const itemType = mapGroupTypeToItemType(
            args.type ?? ObcFormGroupType.View
          );
          const itemAttrs = ` type="${itemType}"`;

          const itemText =
            'This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while.';

          return `<obc-form-group${attrs}>
  <span slot="subtitle">${subtitle}</span>
  <span slot="text">${text}</span>
  <obc-form-item${itemAttrs}>
  ${itemText}
  </obc-form-item>
  <obc-form-item${itemAttrs}>
  ${itemText}
  </obc-form-item>
</obc-form-group>`;
        },
      },
    },
  },
  args: defaultArgs,
  argTypes: {
    type: {control: 'select', options: Object.values(ObcFormGroupType)},
    onActionChange: {
      action: 'action-change',
      name: 'action-change',
      table: {disable: true},
    },
    subtitle: {control: 'text'},
    text: {control: 'text'},
  },
} satisfies Meta<FormGroupArgs>;

export default meta;
type Story = StoryObj<FormGroupArgs>;

const renderGroup = (args: FormGroupArgs = {}) => {
  const resolvedType = args.type ?? ObcFormGroupType.View;
  const resolvedItemType = mapGroupTypeToItemType(resolvedType);
  return html`
    <obc-form-group .type=${resolvedType} @action-change=${args.onActionChange}>
      <span slot="subtitle">${args.subtitle ?? 'Subtitle'}</span>
      <span slot="text">
        ${args.text ?? 'Some text here to describe what this part is about'}
      </span>
      <obc-form-item .type=${resolvedItemType}>
        This is a list item with multiple lines that can take up as much space
        as it needs. Like it can be really long and go on for a while.
      </obc-form-item>
      <obc-form-item .type=${resolvedItemType}>
        This is a list item with multiple lines that can take up as much space
        as it needs. Like it can be really long and go on for a while.
      </obc-form-item>
    </obc-form-group>
  `;
};

export const Playground: Story = {
  name: '📌 Playground',
  render: (args) => renderGroup(args),
};

export const View: Story = {
  render: () =>
    renderGroup({
      type: ObcFormGroupType.View,
    }),
};

export const EnabledActionFirst: Story = {
  render: () =>
    renderGroup({
      type: ObcFormGroupType.EnabledActionFirst,
    }),
};

export const FilledStatusFirst: Story = {
  render: () =>
    renderGroup({
      type: ObcFormGroupType.FilledStatusFirst,
    }),
};

export const EnabledActionLast: Story = {
  render: () =>
    renderGroup({
      type: ObcFormGroupType.EnabledActionLast,
    }),
};

export const FilledStatusLast: Story = {
  render: () =>
    renderGroup({
      type: ObcFormGroupType.FilledStatusLast,
    }),
};

export const Inactive: Story = {
  render: () =>
    renderGroup({
      type: ObcFormGroupType.Inactive,
    }),
};
