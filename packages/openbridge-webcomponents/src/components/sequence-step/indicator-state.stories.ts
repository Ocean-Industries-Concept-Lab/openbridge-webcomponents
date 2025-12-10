import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Small/State',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
};
export default meta;

type Story = StoryObj;

const createStory = (value: string): Story => ({
  name: value,
  render: () => html`
    <div
      style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
    >
      <strong>${value}</strong>
      <obc-sequence-step
        type="small"
        styleType="regular"
        .value=${value}
        orientation="horizontal"
        .hasInputConnector=${true}
        .hasOutputConnector=${true}
      ></obc-sequence-step>
    </div>
  `,
});

export const NotStarted = createStory('not-started');
export const Regular = createStory('regular');
export const Loading = createStory('loading');
export const Next = createStory('next');
export const Active = createStory('active');
export const Completed = createStory('completed');
