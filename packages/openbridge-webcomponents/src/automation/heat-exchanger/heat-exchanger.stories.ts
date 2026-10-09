import type {Meta} from '@storybook/web-components-vite';
import {ObcHeatExchanger} from './heat-exchanger.js';
import './heat-exchanger.js';
import {
  literal,
  specialtyTankMeta,
  specialtyTankStories,
} from '../specialty-tank/specialty-tank-story-meta.js';
import type {SpecialtyTankStory} from '../specialty-tank/specialty-tank-story-meta.js';

const meta: Meta<ObcHeatExchanger> = {
  title: 'Automation/Tanks/Heat Exchanger',
  tags: ['autodocs', '6.1', 'beta'],
  component: 'obc-heat-exchanger',
  ...specialtyTankMeta(literal`obc-heat-exchanger`),
} satisfies Meta<ObcHeatExchanger>;

export default meta;

export const Default: SpecialtyTankStory = specialtyTankStories.Default;
export const Graphic: SpecialtyTankStory = specialtyTankStories.Graphic;
export const Medium: SpecialtyTankStory = specialtyTankStories.Medium;
export const Static: SpecialtyTankStory = specialtyTankStories.Static;
export const WithoutIcon: SpecialtyTankStory = specialtyTankStories.WithoutIcon;
export const WithBadges: SpecialtyTankStory = specialtyTankStories.WithBadges;
export const WithAlert: SpecialtyTankStory = specialtyTankStories.WithAlert;
