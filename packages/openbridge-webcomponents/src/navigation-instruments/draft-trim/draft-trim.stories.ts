import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDraftTrim} from './draft-trim.js';
import './draft-trim.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';
import {AdviceType} from '../watch/advice.js';
import {sideVessels} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcDraftTrim> = {
  title: 'Instruments/Draft Trim',
  tags: ['autodocs', '6.0', 'wip'],
  component: 'obc-draft-trim',
  args: {
    width: 384,
    draftFore: 2.5,
    draftAft: 5,
    instrumentRange: 10,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    draftFore: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    draftAft: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    instrumentRange: {control: {type: 'range', min: 1, max: 50, step: 1}},
    vesselImage: {control: 'select', options: sideVessels},
    priority: {control: 'select', options: Object.values(Priority)},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcDraftTrim>;

export default meta;
type Story = StoryObj<ObcDraftTrim>;

export const Default: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const EvenKeel: Story = {
  args: {
    draftFore: 4,
    draftAft: 4,
  },
};

export const TrimByBow: Story = {
  args: {
    draftFore: 6,
    draftAft: 2,
  },
};

export const Advice: Story = {
  args: {
    draftFore: 7,
    draftAft: 8,
    advice: [
      {min: 6, max: 10, type: AdviceType.caution, hinted: true},
      {min: -10, max: -6, type: AdviceType.caution, hinted: true},
    ],
  },
};
