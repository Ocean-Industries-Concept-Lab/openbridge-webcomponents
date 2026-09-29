import type {TemplateResult} from 'lit';
import {html, literal} from 'lit/static-html.js';
import type {StaticValue} from 'lit/static-html.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';
import {TankPositioning} from '../automation-tank/tank-positioning.js';
import {
  ObcAbstractSpecialtyTank,
  SpecialtyTankMedium,
} from './abstract-specialty-tank.js';

export type SpecialtyTankStoryArgs = ObcAbstractSpecialtyTank;

/** A story of the shared set: only `args`, everything else comes from meta. */
export interface SpecialtyTankStory {
  args?: Partial<SpecialtyTankStoryArgs>;
}

interface SelectArgType {
  options: string[];
  control: {type: 'radio' | 'select'};
}

/**
 * Shared story meta for the three specialty-tank tiles. Every public property
 * is bound in `render`, so a story can set any of them as an arg; the tag
 * name is a static literal because the tiles share one template.
 */
export function specialtyTankMeta(tag: StaticValue): {
  args: Partial<SpecialtyTankStoryArgs>;
  argTypes: Record<string, SelectArgType>;
  decorators: (typeof crossDecorator)[];
  render: (args: SpecialtyTankStoryArgs) => TemplateResult;
} {
  return {
    args: {
      medium: SpecialtyTankMedium.regular,
      static: false,
      showIcon: true,
      tag: '#0000',
      positioning: TankPositioning.point,
      clickable: true,
      activated: false,
      badgeControl: AutomationButtonBadgeControl.None,
      badgeAlert: AutomationButtonBadgeAlert.None,
      badgeInterlock: AutomationButtonBadgeInterlock.None,
      badgeCommandLocked: AutomationButtonBadgeCommandLocked.None,
      alert: false,
      alertFrameType: ObcAlertFrameType.SmallSideFlip,
      alertFrameThickness: ObcAlertFrameThickness.Small,
      alertFrameStatus: ObcAlertFrameStatus.Alarm,
      showAlertCategoryIcon: true,
      showAlertIcon: false,
    },
    argTypes: {
      medium: {
        options: Object.values(SpecialtyTankMedium),
        control: {type: 'radio'},
      },
      positioning: {
        options: Object.values(TankPositioning),
        control: {type: 'radio'},
      },
      badgeControl: {
        options: Object.values(AutomationButtonBadgeControl),
        control: {type: 'select'},
      },
      badgeAlert: {
        options: Object.values(AutomationButtonBadgeAlert),
        control: {type: 'select'},
      },
      badgeInterlock: {
        options: Object.values(AutomationButtonBadgeInterlock),
        control: {type: 'select'},
      },
      badgeCommandLocked: {
        options: Object.values(AutomationButtonBadgeCommandLocked),
        control: {type: 'select'},
      },
      alertFrameType: {
        options: Object.values(ObcAlertFrameType),
        control: {type: 'select'},
      },
      alertFrameThickness: {
        options: Object.values(ObcAlertFrameThickness),
        control: {type: 'select'},
      },
      alertFrameStatus: {
        options: Object.values(ObcAlertFrameStatus),
        control: {type: 'select'},
      },
    },
    decorators: [crossDecorator],
    render: (args) => html`
      <${tag}
        .medium=${args.medium}
        .static=${args.static}
        .showIcon=${args.showIcon}
        .tag=${args.tag}
        .positioning=${args.positioning}
        .clickable=${args.clickable}
        ?activated=${args.activated}
        .badgeControl=${args.badgeControl}
        .badgeAlert=${args.badgeAlert}
        .badgeInterlock=${args.badgeInterlock}
        .badgeCommandLocked=${args.badgeCommandLocked}
        ?alert=${args.alert}
        .alertFrameType=${args.alertFrameType}
        .alertFrameThickness=${args.alertFrameThickness}
        .alertFrameStatus=${args.alertFrameStatus}
        .showAlertCategoryIcon=${args.showAlertCategoryIcon}
        .showAlertIcon=${args.showAlertIcon}
      ></${tag}>
    `,
  };
}

/** The story set every tile exports, keyed by export name. */
export const specialtyTankStories: Record<string, SpecialtyTankStory> = {
  Default: {},
  Graphic: {args: {medium: SpecialtyTankMedium.graphic}},
  Medium: {args: {medium: SpecialtyTankMedium.medium}},
  Static: {args: {static: true}},
  WithoutIcon: {args: {medium: SpecialtyTankMedium.medium, showIcon: false}},
  WithBadges: {
    args: {
      medium: SpecialtyTankMedium.medium,
      badgeControl: AutomationButtonBadgeControl.Auto,
      badgeAlert: AutomationButtonBadgeAlert.Silence,
      badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
      badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
    },
  },
  WithAlert: {args: {medium: SpecialtyTankMedium.medium, alert: true}},
};

export {literal};
