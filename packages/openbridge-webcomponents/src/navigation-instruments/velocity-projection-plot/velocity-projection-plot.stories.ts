import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcVelocityProjectionPlot,
  VelocityProjectionDatapoint,
} from './velocity-projection-plot';
import './velocity-projection-plot';
import {widthDecorator} from '../../storybook-util';
import {html} from 'lit';

function scaleGeneratedDataPoints(dataPoints: VelocityProjectionDatapoint[]) {
  const sum = dataPoints.reduce((acc, curr) => acc + curr.ratioTotalEnergy, 0);
  return dataPoints.map((dp) => ({
    ...dp,
    ratioTotalEnergy: dp.ratioTotalEnergy / sum,
  }));
}

const meta: Meta<typeof ObcVelocityProjectionPlot> = {
  title: 'Instruments/Velocity projection',
  tags: ['autodocs'],
  component: 'obc-velocity-projection-plot',
  decorators: [widthDecorator],
  args: {
    width: 256,
    peakEnergyDirection: 90,
  },
  argTypes: {
    width: {
      control: {type: 'range', min: 100, max: 1000, step: 1},
    },
    peakEnergyDirection: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
  },
  render: (args) => {
    const dataPoints = generateDataPoints(args.peakEnergyDirection);
    return html`<obc-velocity-projection-plot
      .dataPoints=${dataPoints}
    ></obc-velocity-projection-plot>`;
  },
};

export default meta;
type Story = StoryObj<ObcVelocityProjectionPlot>;

export const Primary: Story = {
  args: {},
};

function generateDataPoints(
  peakEnergyDirection: number
): VelocityProjectionDatapoint[] {
  const peakAngleWindSpeed = 90;
  const peakValueWindSpeed = 1.3;
  const peakAngleTotalEnergy = peakEnergyDirection;

  const dataPoints: VelocityProjectionDatapoint[] = [];
  const stepsDeg = 1;
  for (let i = 0; i < 360; i += stepsDeg) {
    const angleDeg = i;
    // use sine square wave to generate the data points
    const ratioWindEnergyOrExcessSpeed =
      Math.pow(Math.sin(((angleDeg - peakAngleWindSpeed) * Math.PI) / 180), 2) *
      peakValueWindSpeed;
    const ratioTotalEnergy =
      Math.pow(
        Math.sin(((angleDeg - peakAngleTotalEnergy - 90) * Math.PI) / 180 / 2),
        10
      ) + 0.01;

    dataPoints.push({
      startAngleDeg: angleDeg,
      endAngleDeg: angleDeg + stepsDeg,
      ratioWindEnergyOrExcessSpeed,
      ratioTotalEnergy,
    });
  }
  return scaleGeneratedDataPoints(dataPoints);
}
