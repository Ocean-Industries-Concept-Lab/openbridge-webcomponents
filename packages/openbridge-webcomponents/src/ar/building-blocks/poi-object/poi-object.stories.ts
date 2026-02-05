import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-object.js';
import {
  ObcPoiObject,
  ObcPoiObjectType,
  ObcPoiObjectStyle,
  ObcPoiObjectState,
} from './poi-object.js';
import '../../../icons/icon-placeholder.js';

const meta: Meta<ObcPoiObject> = {
  title: 'AR/Building blocks/POI Object',
  component: 'obc-poi-object',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcPoiObjectType),
      description: 'Size/type variant',
    },
    objectStyle: {
      control: 'select',
      options: Object.values(ObcPoiObjectStyle),
      description: 'Visual style variant',
    },
    state: {
      control: 'select',
      options: Object.values(ObcPoiObjectState),
      description: 'State variant',
    },
    interactive: {
      control: 'boolean',
      description: 'Enables button behavior with hover/active states',
    },
  },
  args: {
    type: ObcPoiObjectType.Regular,
    objectStyle: ObcPoiObjectStyle.Regular,
    state: ObcPoiObjectState.Unchecked,
    interactive: false,
  },
};

export default meta;
type Story = StoryObj<ObcPoiObject>;

const regularIcon = html`<obi-placeholder></obi-placeholder>`;
const indicatorIcon = html`<obi-placeholder useCssColor></obi-placeholder>`;

const renderIconForType = (type: ObcPoiObjectType) => {
  return type === ObcPoiObjectType.Indicator ? indicatorIcon : regularIcon;
};

// Interactive playground
export const Default: Story = {
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
      ?interactive=${args.interactive}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

// === INTERACTIVE STORY ===

export const Interactive: Story = {
  args: {
    interactive: true,
  },
  render: (args) => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <obc-poi-object
          type="regular"
          .objectStyle=${args.objectStyle}
          .state=${args.state}
          ?interactive=${args.interactive}
          @click=${() => console.log('Regular clicked')}
        >
          <obi-placeholder></obi-placeholder>
        </obc-poi-object>
        <div style="font-size: 10px; margin-top: 4px; font-family: sans-serif;">
          Regular (flat hover)
        </div>
      </div>
      <div style="text-align: center;">
        <obc-poi-object
          type="indicator"
          .objectStyle=${args.objectStyle}
          .state=${args.state}
          ?interactive=${args.interactive}
          @click=${() => console.log('Indicator clicked')}
        >
          <obi-placeholder useCssColor></obi-placeholder>
        </obc-poi-object>
        <div style="font-size: 10px; margin-top: 4px; font-family: sans-serif;">
          Indicator (overlay hover)
        </div>
      </div>
    </div>
  `,
};

// === TYPE STORIES ===

export const Indicator: Story = {
  args: {
    type: ObcPoiObjectType.Indicator,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-placeholder useCssColor></obi-placeholder>
    </obc-poi-object>
  `,
};

export const Regular: Story = {
  args: {
    type: ObcPoiObjectType.Regular,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-placeholder></obi-placeholder>
    </obc-poi-object>
  `,
};

export const Large: Story = {
  args: {
    type: ObcPoiObjectType.Large,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-placeholder></obi-placeholder>
    </obc-poi-object>
  `,
};

export const NUp: Story = {
  args: {
    type: ObcPoiObjectType.NUp,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-placeholder></obi-placeholder>
    </obc-poi-object>
  `,
};

export const NUpLarge: Story = {
  args: {
    type: ObcPoiObjectType.NUpLarge,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-placeholder></obi-placeholder>
    </obc-poi-object>
  `,
};

// === STYLE STORIES ===

export const Categorical: Story = {
  args: {
    objectStyle: ObcPoiObjectStyle.Categorical,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

// === STATE STORIES ===

export const Checked: Story = {
  args: {
    state: ObcPoiObjectState.Checked,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

export const StaticUnchecked: Story = {
  args: {
    state: ObcPoiObjectState.StaticUnchecked,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

export const StaticChecked: Story = {
  args: {
    state: ObcPoiObjectState.StaticChecked,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

export const Activated: Story = {
  args: {
    state: ObcPoiObjectState.Activated,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

export const Overlapped: Story = {
  args: {
    state: ObcPoiObjectState.Overlapped,
  },
  render: (args) => html`
    <obc-poi-object
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      ${renderIconForType(args.type)}
    </obc-poi-object>
  `,
};

// === OVERVIEW STORIES ===

const sectionStyle = 'margin-bottom: 24px;';
const headerStyle =
  'margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; font-weight: 600;';
const rowStyle =
  'display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;';
const itemStyle = 'text-align: center;';
const labelStyle = 'font-size: 10px; margin-top: 4px; font-family: sans-serif;';

export const AllTypes: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All Types - Regular Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Indicator</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="regular">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="large">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Large</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="n-up">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>N-up</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="n-up-large">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>N-up Large</div>
        </div>
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All Types - Categorical Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" objectStyle="categorical">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Indicator</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="regular" objectStyle="categorical">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="large" objectStyle="categorical">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Large</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="n-up" objectStyle="categorical">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>N-up</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="n-up-large" objectStyle="categorical">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>N-up Large</div>
        </div>
      </div>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All States - Regular Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object state="unchecked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object state="checked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object state="static-unchecked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object state="static-checked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object state="activated">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object state="overlapped">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All States - Categorical Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="unchecked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="checked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="static-unchecked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="static-checked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="activated">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="overlapped">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>
  `,
};

export const AllStyles: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Regular vs Categorical Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="regular">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Categorical</div>
        </div>
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Indicator Style Comparison</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" objectStyle="regular">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" objectStyle="categorical">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Categorical</div>
        </div>
      </div>
    </div>
  `,
};

export const IndicatorAllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Indicator - All States</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" state="unchecked">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" state="checked">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" state="static-unchecked">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" state="static-checked">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" state="activated">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object type="indicator" state="overlapped">
            <obi-placeholder useCssColor></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>
  `,
};

export const CategoricalAllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Categorical - All States</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="unchecked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="checked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="static-unchecked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="static-checked">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="activated">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object objectStyle="categorical" state="overlapped">
            <obi-placeholder></obi-placeholder>
          </obc-poi-object>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>
  `,
};
