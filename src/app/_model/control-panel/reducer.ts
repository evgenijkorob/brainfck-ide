import { createReducer, Action, on } from '@ngrx/store';
import * as ControlPanelActions from './actions';

export const controlPanelKey = 'control-panel';

export interface ControlPanelState {
  isReleaseExecutionRunning: boolean;
}

const initialState: ControlPanelState = {
  isReleaseExecutionRunning: false
};

const reducer = createReducer(
  initialState,
  on(ControlPanelActions.startReleaseExecution, state => ({ ...state, isReleaseExecutionRunning: true })),
  on(ControlPanelActions.executionFinished, state => ({ ...state, isReleaseExecutionRunning: false }))
);

export function controlPanelReducer(state: ControlPanelState, action: Action) {
  return reducer(state, action);
}
