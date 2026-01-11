import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcCommunicationTable} from './communication-table.js';
import './communication-table.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-chevron-right-google.js';
import '../user-button/user-button.js';

const meta: Meta<typeof ObcCommunicationTable> = {
  title: 'UI Components/Communication/Communication Table',
  tags: ['6.0'],
  component: 'obc-communication-table',
  args: {
    data: [
      {
        id: '1',
        title: 'Title 1',
        description: 'Description 1',
        leadingIcon: html`<obi-placeholder></obi-placeholder>`,
        descriptionIcon: html`<obi-placeholder></obi-placeholder>`,
        label1: 'Label 1',
        label2: 'Label 2',
        actionIcon: html`<obi-chevron-right-google></obi-chevron-right-google>`,
      },
      {
        id: '2',
        title: 'Unread item',
        description: 'Description 2',
        leadingIcon: html`<obi-placeholder></obi-placeholder>`,
        descriptionIcon: html`<obi-placeholder></obi-placeholder>`,
        label1: 'Label 1',
        label2: 'Label 2',
        actionIcon: html`<obi-chevron-right-google></obi-chevron-right-google>`,
        unread: true,
      },
      {
        id: '3',
        title: 'Title 3',
        description: 'Description 3',
        leadingIcon: html`<obi-placeholder></obi-placeholder>`,
        descriptionIcon: html`<obi-placeholder></obi-placeholder>`,
        label1: 'Label 1',
        label2: 'Label 2',
        actionIcon: html`<obi-chevron-right-google></obi-chevron-right-google>`,
      },
      {
        id: '4',
        title: 'Selected item',
        description: 'Description 3',
        leadingIcon: html`<obi-placeholder></obi-placeholder>`,
        descriptionIcon: html`<obi-placeholder></obi-placeholder>`,
        label1: 'Label 1',
        label2: 'Label 2',
        actionIcon: html`<obi-chevron-right-google></obi-chevron-right-google>`,
        selected: true,
      },
    ],
  },
} satisfies Meta<ObcCommunicationTable>;

export default meta;
type Story = StoryObj<ObcCommunicationTable>;

export const Primary: Story = {
  args: {},
};

export const NoDescriptionIcon: Story = {
  args: {
    data: meta.args!.data!.map((item) => ({
      ...item,
      descriptionIcon: undefined,
    })),
  },
};

export const UserButtons: Story = {
  args: {
    largeLeadingIcon: true,
    data: meta.args!.data!.map((item) => ({
      ...item,
      leadingIcon: html`<obc-user-button
        styleType="normal"
        static
        variant="initials"
        initials="AB"
      ></obc-user-button>`,
    })),
  },
};
