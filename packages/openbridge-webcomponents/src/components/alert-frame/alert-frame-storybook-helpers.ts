import {
  ObcAlertFrameMode,
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from './alert-frame.js';

/**
 * Story controls for the alert-frame properties a component forwards under the
 * shared names: `alertFrameType`, `alertFrameThickness`, `alertFrameStatus`
 * and `alertFrameMode`. Spread it into the story's `argTypes`.
 */
export const argTypesAlertFrame = {
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
  alertFrameMode: {
    options: Object.values(ObcAlertFrameMode),
    control: {type: 'radio'},
  },
} as const;
