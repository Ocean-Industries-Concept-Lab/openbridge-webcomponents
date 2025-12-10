import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Small/Orientation',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
};
export default meta;

type Story = StoryObj;

export const Horizontal: Story = {
  name: 'Horizontal',
  render: () => html`
    <obc-sequence-step
      type="small"
      styleType="regular"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
    ></obc-sequence-step>
  `,
};

export const Vertical: Story = {
  name: 'Vertical',
  render: () => html`
    <obc-sequence-step
      type="small"
      styleType="regular"
      .value=${'regular'}
      orientation="vertical"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
    ></obc-sequence-step>
  `,
};
