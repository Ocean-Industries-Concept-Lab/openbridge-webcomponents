/**
 * Re-rendering for the app-wide badge settings.
 *
 * The badge layout (`setAutomationBadgeLayout()`) and the badge symbol
 * override (`setAutomationBadgeSymbolOverride()`) are `GlobalSetting`s
 * (`internal/global-setting.ts`). A device holds one
 * `BadgeSettingsController`, which holds a controller for each, so it
 * re-renders when either changes and comes back current after a change made
 * while it was detached.
 *
 * @module
 */
import type {ReactiveControllerHost} from 'lit';
import type {GlobalSettingController} from '../../internal/global-setting.js';
import {
  badgeLayoutSetting,
  type ResolvedAutomationButtonBadgeLayout,
} from './badge-layout.js';
import {
  badgeSymbolOverrideSetting,
  type AutomationBadgeSymbolOverride,
} from './badge-symbols.js';

/** Re-renders its host when an app-wide badge setting changes. */
export class BadgeSettingsController {
  readonly layout: GlobalSettingController<ResolvedAutomationButtonBadgeLayout>;
  readonly symbols: GlobalSettingController<AutomationBadgeSymbolOverride>;

  constructor(host: ReactiveControllerHost) {
    this.layout = badgeLayoutSetting.controller(host);
    this.symbols = badgeSymbolOverrideSetting.controller(host);
  }
}
