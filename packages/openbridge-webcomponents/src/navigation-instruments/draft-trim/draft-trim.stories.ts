import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDraftTrim} from './draft-trim.js';
import './draft-trim.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';
import {VesselImage} from '../watch/vessel.js';
import {sideVessels} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcDraftTrim> = {
  title: 'Instruments/Draft Trim',
  tags: ['autodocs', 'wip', 'skip-test'],
  component: 'obc-draft-trim',
  args: {
    width: 400,
    draftAft: 5,
    draftFore: 2.5,
    trim: -0.5,
    instrumentRange: 10,
    primaryTickmarkInterval: 5,
    secondaryTickmarkInterval: 1,
    vesselImage: VesselImage.psvSide,
    vesselScale: 1,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    draftAft: {control: {type: 'range', min: 0, max: 10, step: 0.1}},
    draftFore: {control: {type: 'range', min: 0, max: 10, step: 0.1}},
    trim: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    instrumentRange: {control: {type: 'range', min: 1, max: 30, step: 1}},
    primaryTickmarkInterval: {control: {type: 'number'}},
    secondaryTickmarkInterval: {control: {type: 'number'}},
    vesselImage: {control: 'select', options: sideVessels},
    vesselScale: {control: {type: 'range', min: 0.5, max: 2, step: 0.05}},
    priority: {control: 'select', options: Object.values(Priority)},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcDraftTrim>;

export default meta;
type Story = StoryObj<ObcDraftTrim>;

export const Regular: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const EvenKeel: Story = {
  args: {
    draftAft: 4,
    draftFore: 4,
    trim: 0,
  },
};
