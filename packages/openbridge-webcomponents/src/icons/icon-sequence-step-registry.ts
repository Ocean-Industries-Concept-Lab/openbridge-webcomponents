import type {TemplateResult} from 'lit';
import type {SequenceValue} from '../components/sequence-step/sequence-step.js';

import {iconSequenceStepStateNotStarted} from './icon-sequence-step-state-not-started.js';
import {iconSequenceStepStateRegular} from './icon-sequence-step-state-regular.js';
import {iconSequenceStepStateLoading} from './icon-sequence-step-state-loading.js';
import {iconSequenceStepStateNext} from './icon-sequence-step-state-next.js';
import {iconSequenceStepStateActive} from './icon-sequence-step-state-active.js';
import {iconSequenceStepStateCompleted} from './icon-sequence-step-state-completed.js';

const stateIcons: Record<SequenceValue, TemplateResult | undefined> = {
  'not-started': iconSequenceStepStateNotStarted,
  regular: iconSequenceStepStateRegular,
  loading: iconSequenceStepStateLoading,
  next: iconSequenceStepStateNext,
  active: iconSequenceStepStateActive,
  completed: iconSequenceStepStateCompleted,
};

export function getStateIcon(value: SequenceValue): TemplateResult | null {
  return stateIcons[value] ?? null;
}
