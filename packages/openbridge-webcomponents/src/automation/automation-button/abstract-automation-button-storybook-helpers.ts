import { ObcAlertFrameStatus, ObcAlertFrameThickness, ObcAlertFrameType } from "../../components/alert-frame/alert-frame";
import { MotorizedVariant } from "./abstract-automation-button-motorized.js";
import { AutomationButtonDirection, AutomationButtonLabelDirection } from "./automation-button.js";

export const argTypesAbstractAutomationButton = {
    readoutPosition: {
        options: ['top', 'bottom', 'left', 'right'],
        control: { type: 'radio' },
    },
    readoutSize: {
        options: ['small', 'regular', 'enhanced'],
        control: { type: 'radio' },
    },
    alertFrameType: {
        options: Object.values(ObcAlertFrameType),
        control: { type: 'radio' },
    },
    alertFrameThickness: {
        options: Object.values(ObcAlertFrameThickness),
        control: { type: 'radio' },
    },
    alertFrameStatus: {
        options: Object.values(ObcAlertFrameStatus),
        control: { type: 'radio' },
    },

    badgeAuto: {
        control: { type: 'boolean' },
    },
    badgeCommandLocked: {
        control: { type: 'boolean' },
    },
    badgeDuty: {
        control: { type: 'boolean' },
    },
    badgeAlertOff: {
        control: { type: 'boolean' },
    },
};

export const argTypesAbstractAutomationButtonPassiveRound = {
    ...argTypesAbstractAutomationButton,
    variant: {
        options: ['regular', 'flat'],
        control: { type: 'radio' },
    },
};

export const argTypesAbstractAutomationButtonPassiveSquare = {
    ...argTypesAbstractAutomationButton,
    variant: {
        options: ['square', 'flat'],
        control: { type: 'radio' },
    },
};

export const argTypesAbstractAutomationButtonMotorized = {
    ...argTypesAbstractAutomationButton,
    speedInPercent: {
        control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    labelDirection: {
        options: Object.values(AutomationButtonLabelDirection),
        control: { type: 'radio' },
    },
    direction: {
        options:
            Object.values(AutomationButtonDirection),
        control: { type: 'radio' },
    },
    variant: {
        options: Object.values(MotorizedVariant),
        control: { type: 'radio' },
    },
};