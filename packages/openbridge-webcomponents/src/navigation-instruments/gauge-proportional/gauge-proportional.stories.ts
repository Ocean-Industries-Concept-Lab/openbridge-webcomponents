import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  GaugeProportionalAlignment,
  GaugeProportionalPriority,
  GaugeProportionalSector,
  ObcGaugeProportional,
} from './gauge-proportional.js';
import './gauge-proportional.js';
import '../../icons/icon-placeholder-device-on.js';
import '../../icons/icon-placeholder-device-off-f.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';

type GaugeProportionalStoryArgs = Partial<ObcGaugeProportional> & {
  width?: number;
  height?: number;
  hasIcon?: boolean;
};

const meta = {
  title: 'Instruments/Gauge Proportional',
  tags: ['autodocs', 'wip', 'skip-test'],
  component: 'obc-gauge-proportional',
  decorators: [widthDecorator],
  args: {
    width: 400,
    large: true,
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
      options: Object.values(GaugeProportionalSector),
    },
    alignment: {
      control: 'select',
      options: Object.values(GaugeProportionalAlignment),
    },
    priority: {
      control: 'select',
      options: Object.values(GaugeProportionalPriority),
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
    large: {control: 'boolean'},
    hasLabelStack: {control: 'boolean'},
    tag: {control: 'text'},
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
  render: (args: GaugeProportionalStoryArgs) => html`
    <obc-gauge-proportional
      .value=${args.value ?? 0}
      .minValue=${args.minValue ?? 0}
      .maxValue=${args.maxValue ?? 100}
      .secondaryValue=${args.secondaryValue}
      .sector=${args.sector ?? GaugeProportionalSector.deg270}
      .alignment=${args.alignment ?? GaugeProportionalAlignment.outside}
      .priority=${args.priority ?? GaugeProportionalPriority.regular}
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
      .large=${args.large ?? false}
      .hasLabelStack=${args.hasLabelStack ?? true}
      .tag=${args.tag ?? ''}
    >
      ${args.hasIcon
        ? args.priority === GaugeProportionalPriority.off
          ? html`<obi-placeholder-device-off-f
              slot="icon"
              .useCssColor=${true}
            ></obi-placeholder-device-off-f>`
          : html`<obi-placeholder-device-on
              slot="icon"
              .useCssColor=${true}
            ></obi-placeholder-device-on>`
        : ''}
    </obc-gauge-proportional>
  `,
} satisfies Meta<GaugeProportionalStoryArgs>;

export default meta;
type Story = StoryObj<GaugeProportionalStoryArgs>;

export const Default: Story = {};

export const Sector360: Story = {
  args: {
    sector: GaugeProportionalSector.deg360,
  },
};

export const Sector270PosNeg: Story = {
  args: {
    sector: GaugeProportionalSector.deg270PosNeg,
  },
};

export const PrimarySecondary: Story = {
  args: {
    sector: GaugeProportionalSector.deg360,
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

export const Compact: Story = {
  args: {
    width: 240,
    height: 320,
    large: false,
    hasReadout: false,
    unit: '%',
    tag: '#0001',
    advices: [
      {minValue: 90, maxValue: 100, type: AdviceType.caution, hinted: false},
    ],
  },
};

export const CompactDouble: Story = {
  args: {
    width: 240,
    height: 320,
    large: false,
    hasReadout: false,
    unit: '%',
    secondaryValue: 45,
    secondaryUnit: '%',
    tag: '#0001',
    advices: [
      {minValue: 90, maxValue: 100, type: AdviceType.caution, hinted: false},
    ],
  },
};

export const Enhanced: Story = {
  args: {
    priority: GaugeProportionalPriority.enhanced,
  },
};

export const Medium: Story = {
  args: {
    priority: GaugeProportionalPriority.medium,
  },
};

export const Off: Story = {
  args: {
    sector: GaugeProportionalSector.deg360,
    priority: GaugeProportionalPriority.off,
  },
};

export const InsideLabels: Story = {
  args: {
    alignment: GaugeProportionalAlignment.inside,
  },
};

export const Sector360InsideLabels: Story = {
  args: {
    sector: GaugeProportionalSector.deg360,
    alignment: GaugeProportionalAlignment.inside,
  },
};

export const MaxMinLabels: Story = {
  args: {
    alignment: GaugeProportionalAlignment.maxMin,
  },
};

export const PrimarySecondaryMaxMin: Story = {
  args: {
    alignment: GaugeProportionalAlignment.maxMin,
    secondaryValue: 45,
    secondaryLabel: 'Label',
    secondaryUnit: 'Unit',
  },
};

export const WithAdvices: Story = {
  args: {
    sector: GaugeProportionalSector.deg270PosNeg,
    alignment: GaugeProportionalAlignment.maxMin,
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
    sector: GaugeProportionalSector.deg270PosNeg,
    minValue: -100,
    maxValue: 100,
    value: 30,
    setpoint: 30,
  },
};
