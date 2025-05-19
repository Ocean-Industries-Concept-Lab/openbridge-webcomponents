import type { Meta, StoryObj } from '@storybook/web-components';
import { ActiveColor, Direction, ObcSpeedArrows } from './speed-arrows';
import './speed-arrows';

const meta: Meta<typeof ObcSpeedArrows> = {
  title: 'Navigation instruments/Speed arrows',
  tags: ['6.0'],
  component: "obc-speed-arrows",
  args: {
    tintedArrows: true,
    readout: true,
    speedKnots: 10,
  },
  argTypes: {
    tintedArrows: {
      control: 'boolean',
    },
    activeColor: {
      control: 'select',
      options: Object.values(ActiveColor),
    },
    nActiveArrows: {
      control: {
        type: 'range',
        min: 0,
        max: 3,
        step: 1,
      },
    },
    direction: {
      control: 'select',
      options: Object.values(Direction),
    },
  },
} satisfies Meta<ObcSpeedArrows>;

export default meta;
type Story = StoryObj<ObcSpeedArrows>;

export const Forward: Story = {
  args: {
    direction: Direction.forward,
    nActiveArrows: 1,
  },
}

export const Backward: Story = {
  args: {
    direction: Direction.backward,
    nActiveArrows: 1,
  },
}

export const Left: Story = {
  args: {
    direction: Direction.left,
    nActiveArrows: 1,
    fractionDigits: 1,
    speedKnots: 1.1,
  },
}

export const Right: Story = {
  args: {
    direction: Direction.right,
    nActiveArrows: 1,
  },
}


export const Enhanced: Story = {
  args: {
    direction: Direction.forward,
    nActiveArrows: 1,
    activeColor: ActiveColor.Enhanced,
  },
}

export const Port: Story = {
  args: {
    direction: Direction.left,
    nActiveArrows: 1,
    activeColor: ActiveColor.Direction,
  },
}

export const Starboard: Story = {
  args: {
    direction: Direction.right,
    nActiveArrows: 1,
    activeColor: ActiveColor.Direction,
  },
}

export const ForwardDirection: Story = {
  args: {
    direction: Direction.forward,
    nActiveArrows: 1,
    activeColor: ActiveColor.Direction,
  },
}

export const BackwardDirection: Story = {
  args: {
    direction: Direction.backward,
    nActiveArrows: 1,
    activeColor: ActiveColor.Direction,
  },
}

export const NoTint: Story = {
  args: {
    direction: Direction.forward,
    nActiveArrows: 1,
    activeColor: ActiveColor.Enhanced,
    tintedArrows: false,
  },
}