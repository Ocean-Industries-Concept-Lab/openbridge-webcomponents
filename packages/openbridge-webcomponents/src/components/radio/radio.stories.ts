import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcRadio } from './radio';
import './radio';
import { spread } from '@open-wc/lit-helpers';
import { html } from 'lit';

const meta: Meta<typeof ObcRadio> = {
  title: 'Input/Radio button',
  tags: ['autodocs'],
  component: "obc-radio",
  args: {
    hasLabel: true,
  },
} satisfies Meta<ObcRadio>;

export default meta;
type Story = StoryObj<ObcRadio>;

export const WithLabel: Story = {
  render: () => html`
    <obc-radio hasLabel>Radio 1</obc-radio>`,
}

export const WithoutLabel: Story = {
  args: {
    hasLabel: false,
  },
  render: () => html`<obc-radio></obc-radio>`,
}

export const CheckedWithLabel: Story = {
  render: () => html`
    <obc-radio hasLabel checked>Radio 1</obc-radio>`,
}

export const Multiple: Story = {
  render: () => html`
  <obc-radio hasLabel name="test" value="1">Radio 1</obc-radio>
  <obc-radio hasLabel name="test" value="2">Radio 2</obc-radio>
  <obc-radio hasLabel name="test" value="3">Radio 3</obc-radio>`,
}

