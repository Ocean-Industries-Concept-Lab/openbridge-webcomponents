import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAccordionCard, AccordionSize, Position} from './accordion-card.js';
import './accordion-card.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcAccordionCard> = {
  title: 'Layout/Accordion Card',
  tags: ['6.0'],
  globals: {
    backgrounds: {
      value: 'container-section-color',
    },
  },
  component: 'obc-accordion-card',
  argTypes: {
    cardTitle: {
      control: {type: 'text'},
    },
    description: {
      control: {type: 'text'},
    },
    statusLabel: {
      control: {type: 'text'},
    },
    expanded: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    hasAlert: {
      control: {type: 'boolean'},
    },
    hasDescription: {
      control: {type: 'boolean'},
    },
    hasStatusLabel: {
      control: {type: 'boolean'},
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
    },
    size: {
      control: {type: 'select'},
      options: Object.values(AccordionSize),
    },
    position: {
      control: {type: 'select'},
      options: Object.values(Position),
    },
  },
  args: {
    cardTitle: 'Title',
    description: 'Description text',
    statusLabel: 'Status',
    expanded: false,
    disabled: false,
    hasAlert: false,
    hasDescription: false,
    hasStatusLabel: false,
    hasLeadingIcon: false,
    size: AccordionSize.SingleLine,
    position: Position.regular,
  },
  render: (args) => html`
    <obc-accordion-card
      .cardTitle="${args.cardTitle}"
      .description="${args.description}"
      .statusLabel="${args.statusLabel}"
      .expanded="${args.expanded}"
      .disabled="${args.disabled}"
      .hasAlert="${args.hasAlert}"
      .hasDescription="${args.hasDescription}"
      .hasStatusLabel="${args.hasStatusLabel}"
      .hasLeadingIcon="${args.hasLeadingIcon}"
      .size="${args.size}"
      .position="${args.position}"
    >
      <div slot="expanded-content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </obc-accordion-card>
  `,
} satisfies Meta<ObcAccordionCard>;

export default meta;
type Story = StoryObj<ObcAccordionCard>;

export const Primary: Story = {
  args: {
    cardTitle: 'Accordion Title',
    expanded: false,
  },

};

export const SingleLine: Story = {
  args: {
    cardTitle: 'Single Line Accordion',
    size: AccordionSize.SingleLine,
    expanded: false,
  },
};

export const Large: Story = {
  args: {
    cardTitle: 'Large Accordion',
    description: 'This is the description text that appears in large size',
    size: AccordionSize.Large,
    hasDescription: true,
    expanded: false,
  },
};

export const WithStatus: Story = {
  args: {
    cardTitle: 'Accordion with Status',
    statusLabel: 'Active',
    hasStatusLabel: true,
    expanded: false,
  },
};

export const WithIcon: Story = {
  args: {
    cardTitle: 'Accordion with Icon',
    hasLeadingIcon: true,
    expanded: false,
  },
  render: (args) => html`
    <obc-accordion-card
      .cardTitle="${args.cardTitle}"
      .expanded="${args.expanded}"
      .hasLeadingIcon="${args.hasLeadingIcon}"
    >
      <span slot="leading-icon">
        <obi-placeholder></obi-placeholder>
      </span>
    </obc-accordion-card>
  `,
};

export const Expanded: Story = {
  args: {
    cardTitle: 'Expanded Accordion',
    expanded: true,
  },
};

export const WithCustomContent: Story = {
  args: {
    cardTitle: 'Custom Content',
    expanded: true,
  },
};

export const Multiple: Story = {
  args: {
    title: 'Multiple Accordions',
  },
  render: () => html`
    <div>
      <obc-accordion-card
        cardTitle="Single Line Accordion"
        .size="${AccordionSize.SingleLine}"
        .position="${Position.top}"
      >
      <div slot="expanded-content">
        Placeholder text
      </div>
      </obc-accordion-card>

      <obc-accordion-card
        cardTitle="Large with Description"
        description="This one has a description"
        .size="${AccordionSize.Large}"
        .hasDescription=${true}
        .position="${Position.center}"
      >
      <div slot="expanded-content">
        Placeholder text
      </div>
      </obc-accordion-card>

      <obc-accordion-card
        cardTitle="With Status Label"
        statusLabel="Active"
        .hasStatusLabel=${true}
        .position="${Position.center}"
      >
      <div slot="expanded-content">
        Placeholder text
      </div>
      </obc-accordion-card>

      <obc-accordion-card 
        cardTitle="Disabled Accordion"
        .disabled=${true}
        .position="${Position.bottom}"
      >
        <div slot="expanded-content">
        Placeholder text
      </div>
      </obc-accordion-card>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    cardTitle: 'Disabled Accordion',
    disabled: true,
  },
  render: (args) => html`
    <obc-accordion-card
      .cardTitle="${args.cardTitle}"
      .description="${args.description}"
      .statusLabel="${args.statusLabel}"
      .expanded="${args.expanded}"
      .disabled="${args.disabled}"
      .hasAlert="${args.hasAlert}"
      .hasDescription="${args.hasDescription}"
      .hasStatusLabel="${args.hasStatusLabel}"
      .hasLeadingIcon="${args.hasLeadingIcon}"
      .size="${args.size}"
    >
    </obc-accordion-card>
  `,
};
