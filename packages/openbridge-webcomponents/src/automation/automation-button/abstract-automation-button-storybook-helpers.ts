import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {MotorizedVariant} from './abstract-automation-button-motorized.js';
import {
  AutomationButtonDirection,
  AutomationButtonLabelDirection,
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
};

export const argTypesAbstractAutomationButtonMotorized = {
  ...argTypesAbstractAutomationButton,
  speedInPercent: {
    control: {type: 'range', min: 0, max: 100, step: 1},
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
