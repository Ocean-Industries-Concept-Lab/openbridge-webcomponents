import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Small/Style',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
};
export default meta;

type Story = StoryObj;

export const Regular: Story = {
  name: 'Regular',
  render: () => html`
    <obc-sequence-step
      type="small"
      styleType="regular"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
      .hasIcon=${false}
    ></obc-sequence-step>
  `,
};

export const Point: Story = {
  name: 'Point',
  render: () => html`
    <obc-sequence-step
      type="small"
      styleType="point"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
      .hasIcon=${false}
    ></obc-sequence-step>
  `,
};

export const Connector: Story = {
  name: 'Connector',
  render: () => html`
    <obc-sequence-step
      type="small"
      styleType="connector"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
      .hasIcon=${false}
    ></obc-sequence-step>
  `,
};
