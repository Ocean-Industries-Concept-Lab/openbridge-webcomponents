import type {Meta} from '@storybook/web-components-vite';
import {ObcHeatPump} from './heat-pump.js';
import './heat-pump.js';
import {
  literal,
  specialtyTankMeta,
  specialtyTankStories,
} from '../specialty-tank/specialty-tank-story-meta.js';
import type {SpecialtyTankStory} from '../specialty-tank/specialty-tank-story-meta.js';

const meta: Meta<ObcHeatPump> = {
  title: 'Automation/Tanks/Heat Pump',
  tags: ['autodocs', '6.1', 'beta'],
  component: 'obc-heat-pump',
  ...specialtyTankMeta(literal`obc-heat-pump`),
} satisfies Meta<ObcHeatPump>;

export default meta;

export const Default: SpecialtyTankStory = specialtyTankStories.Default;
export const Graphic: SpecialtyTankStory = specialtyTankStories.Graphic;
export const Medium: SpecialtyTankStory = specialtyTankStories.Medium;
export const Static: SpecialtyTankStory = specialtyTankStories.Static;
export const WithoutIcon: SpecialtyTankStory = specialtyTankStories.WithoutIcon;
export const WithBadges: SpecialtyTankStory = specialtyTankStories.WithBadges;
export const WithAlert: SpecialtyTankStory = specialtyTankStories.WithAlert;
