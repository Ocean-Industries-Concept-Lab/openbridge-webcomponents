import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Overview/Types',
  component: 'obc-sequence-step',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Connectors are opt-in so you can hide either side independently. `hasIcon` only affects medium/large regular nodes, and `inputConnectorExtended` stretches the leading connector when the hosting item needs it.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Types: Story = {
  name: 'Indicator / Tag / Button',
  render: () => {
    const variants = [
      {
        label: 'Indicator (small)',
        type: 'small',
        description: 'Minimal node for progress indicators',
      },
      {
        label: 'Tag (medium)',
        type: 'medium',
        description: 'Mid-sized node with optional icon/label',
      },
      {
        label: 'Button (large)',
        type: 'large',
        description: 'Interactive node with rich label/icon content',
      },
    ] as const;

    return html`
      <div
        style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;"
      >
        ${variants.map(
          (variant) => html`
            <div
              style="display: flex; flex-direction: column; gap: 8px; align-items: center;"
            >
              <strong>${variant.label}</strong>
              <div style="font-size: 12px; color: gray; text-align: center;">
                ${variant.description}
              </div>
              <obc-sequence-step
                .type=${variant.type}
                styleType="regular"
                .value=${'regular'}
                orientation="horizontal"
                .hasInputConnector=${true}
                .hasOutputConnector=${true}
                .hasIcon=${variant.type !== 'small'}
              >
                ${variant.type !== 'small' ? 'Label' : ''}
              </obc-sequence-step>
            </div>
          `
        )}
      </div>
    `;
  },
};
