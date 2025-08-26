import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggletip, ToggletipVariant} from './toggletip.js';
import './toggletip.js';
import '../button/button.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html, nothing} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';

const meta: Meta<typeof ObcToggletip> = {
  title: 'UI Components/Message and alerts/Toggletip',
  tags: ['autodocs'],
  component: 'obc-toggletip',
  args: {
    variant: ToggletipVariant.normal,
    title: 'Title',
    description: 'Short text to tell what the note is about',
    hasTitleContainer: true,
    hasDescription: true,
    hasContent: true,
    hasActions: true,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    primaryButtonLabel: 'Label',
    secondaryButtonLabel: 'Label',
    icon: 'placeholder',
    trailingIcon: 'placeholder',
    customWidth: 400,
  },
  render: (args) =>
    html` <style>
        .placeholder {
          display: flex;
          position: relative;
          padding: 32px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
          flex: 1 0 0;
          align-self: stretch;
          border: 1px solid var(--base-purple-100);
          background: var(--base-purple-050);
        }
        .placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .placeholder-icon {
          color: var(--base-purple-400);
          height: 48px;
          width: 48px;
        }

        .placeholder-title {
          color: var(--base-purple-400);
          text-align: center;
          font-feature-settings:
            'ss04' on,
            'liga' off,
            'clig' off;
          font-family: var(--font-family-main);
          font-size: var(--global-typography-ui-body-font-size);
          font-style: normal;
          font-weight: var(--global-typography-ui-body-font-weight);
          line-height: var(--global-typography-ui-body-line-height) /* 150% */;
        }

        .placeholder-subtitle {
          width: 134px;
          color: var(--base-purple-400);
          text-align: center;
          font-feature-settings:
            'ss04' on,
            'liga' off,
            'clig' off;
          font-family: var(--font-family-main);
          font-size: var(--global-typography-ui-label-font-size);
          font-style: normal;
          font-weight: var(--font-weight-regular);
          line-height: var(--global-typography-ui-label-line-height)
            /* 133.333% */;
        }
      </style>
      <obc-toggletip
        variant="${args.variant}"
        title="${args.title}"
        description="${args.description}"
        .hasTitleContainer=${args.hasTitleContainer}
        .hasDescription=${args.hasDescription}
        .hasContent=${args.hasContent}
        .hasActions=${args.hasActions}
        .hasLeadingIcon=${args.hasLeadingIcon}
        .hasTrailingIcon=${args.hasTrailingIcon}
        primaryButtonLabel="${args.primaryButtonLabel}"
        secondaryButtonLabel="${args.secondaryButtonLabel}"
        customWidth=${ifDefined(args.customWidth)}
      >
        ${args.hasLeadingIcon &&
        iconIdToIconHtml(args.icon as string, {slot: 'leading-icon'})}
        ${args.hasTrailingIcon &&
        iconIdToIconHtml(args.trailingIcon as string, {slot: 'trailing-icon'})}
        ${args.hasContent
          ? html`
              <div slot="content" class="placeholder">
                <div class="placeholder-inner">
                  <div class="placeholder-icon">
                    ${iconIdToIconHtml('placeholder', {})}
                  </div>
                  <div class="placeholder-title">Content placeholder</div>
                  <div class="placeholder-subtitle">
                    Instance swap with custom components
                  </div>
                </div>
              </div>
            `
          : nothing}
      </obc-toggletip>`,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: Object.values(ToggletipVariant),
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    hasTitleContainer: {
      control: 'boolean',
    },
    hasDescription: {
      control: 'boolean',
    },
    hasContent: {
      control: 'boolean',
    },
    hasActions: {
      control: 'boolean',
    },
    hasLeadingIcon: {
      control: 'boolean',
    },
    hasTrailingIcon: {
      control: 'boolean',
    },
    primaryButtonLabel: {
      control: 'text',
    },
    secondaryButtonLabel: {
      control: 'text',
    },
    icon: {
      control: {
        type: 'select',
      },
      options: iconIds,
    },
    trailingIcon: {
      control: {
        type: 'select',
      },
      options: iconIds,
    },
    customWidth: {
      control: 'number',
      table: {
        category: 'Styles',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<ObcToggletip>;

export default meta;
type Story = StoryObj<ObcToggletip>;

export const Normal: Story = {
  args: {
    variant: ToggletipVariant.normal,
  },
};

export const Raised: Story = {
  args: {
    variant: ToggletipVariant.raised,
  },
};

export const Enhanced: Story = {
  args: {
    variant: ToggletipVariant.enhanced,
  },
};

export const EcoFeedback: Story = {
  args: {
    variant: ToggletipVariant.ecoFeedback,
  },
};

export const Caution: Story = {
  args: {
    variant: ToggletipVariant.caution,
  },
};

export const Warning: Story = {
  args: {
    variant: ToggletipVariant.warning,
  },
};

export const Alarm: Story = {
  args: {
    variant: ToggletipVariant.alarm,
  },
};

export const NoHeader: Story = {
  args: {
    variant: ToggletipVariant.normal,
    hasTitleContainer: false,
  },
};

export const NoActions: Story = {
  args: {
    variant: ToggletipVariant.enhanced,
    hasActions: false,
  },
};

export const NoContent: Story = {
  args: {
    variant: ToggletipVariant.warning,
    hasContent: false,
  },
};

export const MinimalContent: Story = {
  args: {
    variant: ToggletipVariant.normal,
    hasContent: false,
    hasActions: false,
  },
};
