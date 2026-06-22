import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
  ObcAlertFrameMode,
} from '../../components/alert-frame/alert-frame.js';
import {MotorizedVariant} from './abstract-automation-button-motorized.js';
import {
  AutomationButtonDirection,
  AutomationButtonDirectionArrow,
  AutomationButtonLabelDirection,
  AutomationButtonOrientation,
  AutomationButtonPositioning,
} from './automation-button.js';
import {CircularProgressMode} from '../../building-blocks/circular-progress/circular-progress.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from './abstract-automation-button.js';

export const argTypesAbstractAutomationButton = {
  tag: {
    control: {type: 'text'},
  },
  readoutPosition: {
    options: ['top', 'bottom', 'left', 'right'],
    control: {type: 'radio'},
  },
  readoutSize: {
    options: ['small', 'regular', 'enhanced'],
    control: {type: 'radio'},
  },
  alertFrameType: {
    options: Object.values(ObcAlertFrameType),
    control: {type: 'radio'},
  },
  alertFrameMode: {
    options: Object.values(ObcAlertFrameMode),
    control: {type: 'radio'},
  },
  alertFrameThickness: {
    options: Object.values(ObcAlertFrameThickness),
    control: {type: 'radio'},
  },
  alertFrameStatus: {
    options: Object.values(ObcAlertFrameStatus),
    control: {type: 'radio'},
  },
  positioning: {
    options: Object.values(AutomationButtonPositioning),
    control: {type: 'select'},
  },
  directionArrow: {
    options: Object.values(AutomationButtonDirectionArrow),
    control: {type: 'radio'},
  },
  badgeControl: {
    options: Object.values(AutomationButtonBadgeControl),
    control: {type: 'select'},
  },
  badgeCommandLocked: {
    options: Object.values(AutomationButtonBadgeCommandLocked),
    control: {type: 'select'},
  },
  badgeInterlock: {
    options: Object.values(AutomationButtonBadgeInterlock),
    control: {type: 'select'},
  },
  badgeAlert: {
    options: Object.values(AutomationButtonBadgeAlert),
    control: {type: 'select'},
  },
  progressMode: {
    options: Object.values(CircularProgressMode),
    control: {type: 'select'},
    if: {arg: 'progress'},
  },
  progressValue: {
    control: {type: 'range', min: 0, max: 100, step: 1},
    if: {arg: 'progress'},
  },
};

export const argTypesAbstractAutomationButtonPassiveRound = {
  ...argTypesAbstractAutomationButton,
  variant: {
    options: ['regular', 'flat'],
    control: {type: 'radio'},
  },
};

export const argTypesAbstractAutomationButtonPassiveSquare = {
  ...argTypesAbstractAutomationButton,
  variant: {
    options: ['square', 'flat'],
    control: {type: 'radio'},
  },
  orientation: {
    options: Object.values(AutomationButtonOrientation),
    control: {type: 'radio'},
  },
};

export const argTypesAbstractAutomationButtonMotorized = {
  ...argTypesAbstractAutomationButton,
  speedInPercent: {
    control: {type: 'range', min: 0, max: 100, step: 1},
    description: 'Deprecated, use `speed` together with `speedUnit` instead.',
  },
  speed: {
    control: {type: 'number'},
  },
  speedUnit: {
    control: {type: 'text'},
  },
  speedMaxDigits: {
    control: {type: 'number'},
  },
  labelDirection: {
    options: Object.values(AutomationButtonLabelDirection),
    control: {type: 'radio'},
  },
  direction: {
    options: Object.values(AutomationButtonDirection),
    control: {type: 'radio'},
  },
  variant: {
    options: Object.values(MotorizedVariant),
    control: {type: 'radio'},
  },
};
