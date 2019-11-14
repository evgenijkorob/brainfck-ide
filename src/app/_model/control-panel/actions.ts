import { createAction } from '@ngrx/store';

export const startReleaseExecution = createAction('[Control Panel] Start release execution');

export const startDebugExecution = createAction('[Control Panel] Start debug execution');

export const debugExecutionPaused = createAction('[Control Panel] Debug execution paused');

export const continueDebugExecution = createAction('[Control Panel] Continue debug execution');

export const makeDebugExecutionStep = createAction('[Control Panel] Make debug execution step');

export const stopExecution = createAction('[Control Panel] Stop execution');

export const executionFinished = createAction('[Control Panel] Execution finished');
