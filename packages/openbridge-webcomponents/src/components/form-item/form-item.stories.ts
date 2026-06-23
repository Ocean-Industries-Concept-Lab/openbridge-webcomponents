import type {
  Meta,
  StoryObj,
  StoryContext,
} from '@storybook/web-components-vite';
import {html, nothing} from 'lit';
import './form-item.js';
import {
  type ObcFormItemActionChangeEvent,
  ObcFormItemBasicState,
  ObcFormItemStatusIcon,
  ObcFormItemType,
} from './form-item.js';
import '../../icons/icon-placeholder.js';

type FormItemArgs = {
  type?: ObcFormItemType;
  itemId?: string;
  basicState?:
    | 'enabled'
    | 'hover'
    | 'active'
    | 'focused'
    | 'disabled'
    | 'amplified';
  hasError?: boolean;
  errorText?: string;
  hasIcon?: boolean;
  hasShader?: boolean;
  statusIcon?: ObcFormItemStatusIcon;
  disabled?: boolean;
  text?: string;
  onActionChange?: (event: ObcFormItemActionChangeEvent) => void;
};

const typeSupportsError = (type: ObcFormItemType): boolean =>
  type === ObcFormItemType.EnabledActionFirst ||
  type === ObcFormItemType.EnabledActionLast;

const typeSupportsShaderToggle = (type: ObcFormItemType): boolean =>
  type === ObcFormItemType.View || type === ObcFormItemType.Inactive;

const resolveArgs = (args: FormItemArgs) => {
  const type = args.type ?? ObcFormItemType.View;
  return {
    type,
    itemId: args.itemId ?? '',
    basicState: args.basicState ?? 'enabled',
    hasError: typeSupportsError(type) && (args.hasError ?? false),
    errorText: args.errorText ?? 'Error text',
    hasIcon: args.hasIcon ?? false,
    hasShader: typeSupportsShaderToggle(type) && (args.hasShader ?? false),
    statusIcon: args.statusIcon ?? ObcFormItemStatusIcon.Check,
    disabled: args.disabled ?? false,
    text: args.text ?? defaultText,
  };
};

const defaultText =
  'This is a list item with multiple lines that can take up as much space as it needs. Like it can be really long and go on for a while.';

const defaultArgs: FormItemArgs = {
  type: ObcFormItemType.View,
  itemId: '',
  basicState: 'enabled',
  hasError: false,
  errorText: 'Error text',
  hasIcon: false,
  hasShader: false,
  statusIcon: ObcFormItemStatusIcon.Check,
  disabled: false,
  text: defaultText,
};

const meta = {
  title: 'UI Components/Forms/Form Item',
  tags: ['autodocs'],
  component: 'obc-form-item',
  decorators: [
    (story) =>
      html`<div
        style="display: flex; justify-content: center; align-items: center;"
      >
        ${story()}
      </div>`,
  ],
  parameters: {
    controls: {
      include: [
        'type',
        'hasIcon',
        'hasShader',
        'hasError',
        'errorText',
        'text',
        'basicState',
        'statusIcon',
      ],
    },
    docs: {
      source: {
        transform: (
          _code: string,
          storyContext: StoryContext<FormItemArgs>
        ) => {
          const args = resolveArgs(storyContext.args);
          const attrPairs: string[] = [];

          if (args.type) attrPairs.push(`type="${args.type}"`);
          if (args.itemId.trim() !== '') {
            attrPairs.push(`item-id="${args.itemId}"`);
          }
          if (args.hasError) attrPairs.push('has-error');
          if (args.hasError && args.errorText) {
            attrPairs.push(`error-text="${args.errorText}"`);
          }
          if (
            args.basicState === 'disabled' ||
            args.basicState === 'amplified'
          ) {
            attrPairs.push(`basic-state="${args.basicState}"`);
          }
          if (args.hasIcon) attrPairs.push('has-icon');
          if (args.hasShader) attrPairs.push('has-shader');
          if (args.statusIcon === ObcFormItemStatusIcon.Dash) {
            attrPairs.push('status-icon="dash"');
          }
          if (args.disabled) attrPairs.push('disabled');

          const attrs = attrPairs.length ? ` ${attrPairs.join(' ')}` : '';
          const iconLine = args.hasIcon
            ? '  <obi-placeholder slot="icon"></obi-placeholder>\n'
            : '';
          return `<obc-form-item${attrs}>
${iconLine}  ${args.text}
</obc-form-item>`;
        },
      },
    },
  },
  args: defaultArgs,
  argTypes: {
    type: {control: 'select', options: Object.values(ObcFormItemType)},
    onActionChange: {
      action: 'action-change',
      name: 'action-change',
      table: {disable: true},
    },
    errorText: {control: 'text', if: {arg: 'hasError'}},
    text: {control: 'text'},
    basicState: {
      control: 'select',
      options: [
        'enabled',
        'hover',
        'active',
        'focused',
        'disabled',
        'amplified',
      ],
    },
    statusIcon: {
      control: 'select',
      options: Object.values(ObcFormItemStatusIcon),
    },
  },
} satisfies Meta<FormItemArgs>;

export default meta;
type Story = StoryObj<FormItemArgs>;

const renderItem = (args: FormItemArgs = {}) => {
  const resolved = resolveArgs(args);
  const isDemoState =
    resolved.basicState === 'hover' ||
    resolved.basicState === 'active' ||
    resolved.basicState === 'focused';
  const demoState = isDemoState ? resolved.basicState : '';
  const effectiveBasicState: ObcFormItemBasicState = isDemoState
    ? ObcFormItemBasicState.Enabled
    : resolved.basicState === 'disabled'
      ? ObcFormItemBasicState.Disabled
      : resolved.basicState === 'amplified'
        ? ObcFormItemBasicState.Amplified
        : ObcFormItemBasicState.Enabled;
  return html`
    <style>
      obc-form-item[data-demo-state='hover']::part(content-container) {
        background: var(--flat-hover-background-color);
        border-color: var(--border-outline-color);
      }
      obc-form-item[data-demo-state='active']::part(content-container) {
        background: var(--flat-pressed-background-color);
        border-color: var(--border-outline-color);
      }
      obc-form-item[data-demo-state='focused']::part(content-container) {
        background: var(--flat-focused-background-color);
        border-color: var(--flat-focused-border-color);
        border-width: 2px;
      }
      obc-form-item[data-demo-state='hover']::part(divider),
      obc-form-item[data-demo-state='active']::part(divider),
      obc-form-item[data-demo-state='focused']::part(divider) {
        display: none;
      }
      obc-form-item[data-demo-state='focused']::part(wrapper) {
        z-index: 1;
      }
    </style>
    <obc-form-item
      .type=${resolved.type}
      .itemId=${resolved.itemId}
      .basicState=${effectiveBasicState}
      .hasError=${resolved.hasError}
      .errorText=${resolved.errorText}
      .hasIcon=${resolved.hasIcon}
      .hasShader=${resolved.hasShader}
      .statusIcon=${resolved.statusIcon}
      .disabled=${resolved.disabled}
      data-demo-state=${demoState}
      @action-change=${args.onActionChange}
    >
      ${resolved.hasIcon
        ? html`<obi-placeholder slot="icon"></obi-placeholder>`
        : nothing}
      ${resolved.text}
    </obc-form-item>
  `;
};

export const Playground: Story = {
  name: '📌 Playground',
  render: (args) => renderItem(args),
};

export const View: Story = {
  args: {type: ObcFormItemType.View},
  render: (args) => renderItem(args),
};

export const EnabledActionFirst: Story = {
  args: {
    type: ObcFormItemType.EnabledActionFirst,
    hasError: true,
    hasIcon: true,
  },
  render: (args) => renderItem(args),
};

export const FilledStatusFirst: Story = {
  args: {type: ObcFormItemType.FilledStatusFirst},
  render: (args) => renderItem(args),
};

export const FilledStatusFirstDash: Story = {
  args: {
    type: ObcFormItemType.FilledStatusFirst,
    statusIcon: ObcFormItemStatusIcon.Dash,
  },
  render: (args) => renderItem(args),
};

export const EnabledActionLast: Story = {
  args: {
    type: ObcFormItemType.EnabledActionLast,
    hasError: true,
    hasIcon: true,
  },
  render: (args) => renderItem(args),
};

export const FilledStatusLast: Story = {
  args: {type: ObcFormItemType.FilledStatusLast, hasIcon: true},
  render: (args) => renderItem(args),
};

export const FilledStatusLastDash: Story = {
  args: {
    type: ObcFormItemType.FilledStatusLast,
    statusIcon: ObcFormItemStatusIcon.Dash,
    hasIcon: true,
  },
  render: (args) => renderItem(args),
};

export const Inactive: Story = {
  args: {type: ObcFormItemType.Inactive, hasShader: true},
  render: (args) => renderItem(args),
};
