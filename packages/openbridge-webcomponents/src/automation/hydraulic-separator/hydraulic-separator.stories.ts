import type {Meta} from '@storybook/web-components-vite';
import {ObcHydraulicSeparator} from './hydraulic-separator.js';
import './hydraulic-separator.js';
import {
  literal,
  specialtyTankMeta,
  specialtyTankStories,
} from '../specialty-tank/specialty-tank-story-meta.js';
import type {SpecialtyTankStory} from '../specialty-tank/specialty-tank-story-meta.js';

const meta: Meta<ObcHydraulicSeparator> = {
  title: 'Automation/Tanks/Hydraulic Separator',
  tags: ['autodocs', '6.1', 'beta'],
  component: 'obc-hydraulic-separator',
  ...specialtyTankMeta(literal`obc-hydraulic-separator`),
} satisfies Meta<ObcHydraulicSeparator>;

export default meta;

export const Default: SpecialtyTankStory = specialtyTankStories.Default;
export const Graphic: SpecialtyTankStory = specialtyTankStories.Graphic;
export const Medium: SpecialtyTankStory = specialtyTankStories.Medium;
export const Static: SpecialtyTankStory = specialtyTankStories.Static;
export const WithoutIcon: SpecialtyTankStory = specialtyTankStories.WithoutIcon;
export const WithBadges: SpecialtyTankStory = specialtyTankStories.WithBadges;
export const WithAlert: SpecialtyTankStory = specialtyTankStories.WithAlert;
