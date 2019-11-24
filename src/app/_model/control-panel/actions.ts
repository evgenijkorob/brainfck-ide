import { createAction, props } from '@ngrx/store';
import { BfExecutionState } from 'src/app/interpreter/interpreter';

export const startReleaseExecution = createAction('[Control Panel] Start release execution');

export const startDebugExecution = createAction('[Control Panel] Start debug execution');

export const debugExecutionPaused = createAction(
  '[Control Panel] Debug execution paused',
  props<{ execution: BfExecutionState }>()
);

export const continueDebugExecution = createAction('[Control Panel] Continue debug execution');

export const makeDebugExecutionStep = createAction('[Control Panel] Make debug execution step');

export const stopExecution = createAction('[Control Panel] Stop execution');

export const executionFinished = createAction('[Control Panel] Execution finished');

export const finishInterpreterInputEditing = createAction(
  '[Control Panel] Finish interpreter input editing',
  props<{ input: string }>()
);
