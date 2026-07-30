import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  GaugeRadialProportionalAlignment,
  GaugeRadialProportionalPriority,
  GaugeRadialProportionalSector,
  ObcGaugeRadialProportional,
} from './gauge-radial-proportional.js';
import './gauge-radial-proportional.js';
import '../../icons/icon-placeholder-device-on.js';
import '../../icons/icon-placeholder-device-off-f.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';

type GaugeRadialProportionalStoryArgs = Partial<ObcGaugeRadialProportional> & {
  width?: number;
  height?: number;
  hasIcon?: boolean;
};

const meta = {
  title: 'Instruments/Gauge Radial Proportional',
  tags: ['autodocs', 'wip', 'skip-test'],
  component: 'obc-gauge-radial-proportional',
  decorators: [widthDecorator],
  args: {
    width: 400,
    value: 65,
    minValue: 0,
    maxValue: 100,
    showLabels: true,
    hasReadout: true,
    label: 'Label',
    unit: 'Unit',
    name: 'Name',
    setpoint: 65,
    hasIcon: true,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    height: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    sector: {
      control: 'select',
      options: Object.values(GaugeRadialProportionalSector),
    },
    alignment: {
      control: 'select',
      options: Object.values(GaugeRadialProportionalAlignment),
    },
    priority: {
      control: 'select',
      options: Object.values(GaugeRadialProportionalPriority),
    },
    value: {control: 'number'},
    secondaryValue: {control: 'number'},
    minValue: {control: 'number'},
    maxValue: {control: 'number'},
    setpoint: {control: 'number'},
    primaryTickmarkInterval: {control: 'number'},
    secondaryTickmarkInterval: {control: 'number'},
    fractionDigits: {control: 'number'},
    showLabels: {control: 'boolean'},
    hasReadout: {control: 'boolean'},
    hasIcon: {control: 'boolean'},
    label: {control: 'text'},
    unit: {control: 'text'},
    secondaryLabel: {control: 'text'},
    secondaryUnit: {control: 'text'},
    name: {control: 'text'},
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
    },
    advices: {control: 'object'},
  },
  render: (args: GaugeRadialProportionalStoryArgs) => html`
    <obc-gauge-radial-proportional
      .value=${args.value ?? 0}
      .minValue=${args.minValue ?? 0}
      .maxValue=${args.maxValue ?? 100}
      .secondaryValue=${args.secondaryValue}
      .sector=${args.sector ?? GaugeRadialProportionalSector.deg270}
      .alignment=${args.alignment ?? GaugeRadialProportionalAlignment.outside}
      .priority=${args.priority ?? GaugeRadialProportionalPriority.regular}
      .showLabels=${args.showLabels ?? false}
      .hasReadout=${args.hasReadout ?? false}
      .label=${args.label ?? ''}
      .unit=${args.unit ?? ''}
      .secondaryLabel=${args.secondaryLabel ?? ''}
      .secondaryUnit=${args.secondaryUnit ?? ''}
      .name=${args.name ?? ''}
      .fractionDigits=${args.fractionDigits ?? 0}
      .setpoint=${args.setpoint}
      .primaryTickmarkInterval=${args.primaryTickmarkInterval ?? 50}
      .secondaryTickmarkInterval=${args.secondaryTickmarkInterval ?? 10}
      .advices=${args.advices ?? []}
      .faceDiameter=${args.faceDiameter}
    >
      ${args.hasIcon
        ? args.priority === GaugeRadialProportionalPriority.off
          ? html`<obi-placeholder-device-off-f
              slot="icon"
              .useCssColor=${true}
            ></obi-placeholder-device-off-f>`
          : html`<obi-placeholder-device-on
              slot="icon"
              .useCssColor=${true}
            ></obi-placeholder-device-on>`
        : ''}
    </obc-gauge-radial-proportional>
  `,
} satisfies Meta<GaugeRadialProportionalStoryArgs>;

export default meta;
type Story = StoryObj<GaugeRadialProportionalStoryArgs>;

export const Default: Story = {};

export const Sector360: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg360,
  },
};

export const Sector270PosNeg: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg270PosNeg,
  },
};

export const PrimarySecondary: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg360,
    secondaryValue: 45,
    secondaryLabel: 'Label',
    secondaryUnit: 'Unit',
  },
};

export const PrimarySecondary270: Story = {
  args: {
    secondaryValue: 45,
    secondaryLabel: 'Label',
    secondaryUnit: 'Unit',
  },
};

export const IconOnly: Story = {
  args: {
    hasReadout: false,
  },
};

export const Enhanced: Story = {
  args: {
    priority: GaugeRadialProportionalPriority.enhanced,
  },
};

export const Medium: Story = {
  args: {
    priority: GaugeRadialProportionalPriority.medium,
  },
};

export const Off: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg360,
    priority: GaugeRadialProportionalPriority.off,
  },
};

export const InsideLabels: Story = {
  args: {
    alignment: GaugeRadialProportionalAlignment.inside,
  },
};

export const Sector360InsideLabels: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg360,
    alignment: GaugeRadialProportionalAlignment.inside,
  },
};

export const MaxMinLabels: Story = {
  args: {
    alignment: GaugeRadialProportionalAlignment.maxMin,
  },
};

export const PrimarySecondaryMaxMin: Story = {
  args: {
    alignment: GaugeRadialProportionalAlignment.maxMin,
    secondaryValue: 45,
    secondaryLabel: 'Label',
    secondaryUnit: 'Unit',
  },
};

export const WithAdvices: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg270PosNeg,
    alignment: GaugeRadialProportionalAlignment.maxMin,
    advices: [
      {
        minValue: 85,
        maxValue: 100,
        type: AdviceType.caution,
        hinted: true,
      },
    ],
  },
};

export const BipolarPosNeg: Story = {
  args: {
    sector: GaugeRadialProportionalSector.deg270PosNeg,
    minValue: -100,
    maxValue: 100,
    value: 30,
    setpoint: 30,
  },
};
