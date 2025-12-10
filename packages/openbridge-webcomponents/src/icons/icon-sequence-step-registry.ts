import type {TemplateResult} from 'lit';
import type {SequenceValue} from '../components/sequence-step/sequence-step';

import {iconSequenceStepSmallPointNotStarted} from './icon-sequence-step-small-point-not-started';
import {iconSequenceStepSmallPointRegular} from './icon-sequence-step-small-point-regular';
import {iconSequenceStepSmallPointLoading} from './icon-sequence-step-small-point-loading';
import {iconSequenceStepSmallPointNext} from './icon-sequence-step-small-point-next';
import {iconSequenceStepSmallPointActive} from './icon-sequence-step-small-point-active';
import {iconSequenceStepSmallPointCompleted} from './icon-sequence-step-small-point-completed';

import {iconSequenceStepSmallRegularNotStarted} from './icon-sequence-step-small-regular-not-started';
import {iconSequenceStepSmallRegularRegular} from './icon-sequence-step-small-regular-regular';
import {iconSequenceStepSmallRegularLoading} from './icon-sequence-step-small-regular-loading';
import {iconSequenceStepSmallRegularNext} from './icon-sequence-step-small-regular-next';
import {iconSequenceStepSmallRegularActive} from './icon-sequence-step-small-regular-active';
import {iconSequenceStepSmallRegularCompleted} from './icon-sequence-step-small-regular-completed';

import {iconSequenceStepStateNotStarted} from './icon-sequence-step-state-not-started';
import {iconSequenceStepStateRegular} from './icon-sequence-step-state-regular';
import {iconSequenceStepStateLoading} from './icon-sequence-step-state-loading';
import {iconSequenceStepStateNext} from './icon-sequence-step-state-next';
import {iconSequenceStepStateActive} from './icon-sequence-step-state-active';
import {iconSequenceStepStateCompleted} from './icon-sequence-step-state-completed';

const smallPointIcons: Record<SequenceValue, TemplateResult | undefined> = {
  'not-started': iconSequenceStepSmallPointNotStarted,
  regular: iconSequenceStepSmallPointRegular,
  loading: iconSequenceStepSmallPointLoading,
  next: iconSequenceStepSmallPointNext,
  active: iconSequenceStepSmallPointActive,
  completed: iconSequenceStepSmallPointCompleted,
};

const smallRegularIcons: Record<SequenceValue, TemplateResult | undefined> = {
  'not-started': iconSequenceStepSmallRegularNotStarted,
  regular: iconSequenceStepSmallRegularRegular,
  loading: iconSequenceStepSmallRegularLoading,
  next: iconSequenceStepSmallRegularNext,
  active: iconSequenceStepSmallRegularActive,
  completed: iconSequenceStepSmallRegularCompleted,
};

const stateIcons: Record<SequenceValue, TemplateResult | undefined> = {
  'not-started': iconSequenceStepStateNotStarted,
  regular: iconSequenceStepStateRegular,
  loading: iconSequenceStepStateLoading,
  next: iconSequenceStepStateNext,
  active: iconSequenceStepStateActive,
  completed: iconSequenceStepStateCompleted,
};

export function getSmallPointIcon(value: SequenceValue): TemplateResult | null {
  return smallPointIcons[value] ?? null;
}

export function getSmallRegularIcon(
  value: SequenceValue
): TemplateResult | null {
  return smallRegularIcons[value] ?? null;
}

export function getStateIcon(value: SequenceValue): TemplateResult | null {
  return stateIcons[value] ?? null;
}
