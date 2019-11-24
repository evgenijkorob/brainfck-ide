import { createReducer, Action, on, State } from '@ngrx/store';
import * as ControlPanelActions from './actions';

export const controlPanelFeatureKey = 'control-panel';

export interface ControlPanelState {
  isReleaseExecutionRunning: boolean;
  isDebugExecutionRunning: boolean;
  isDebugExecutionPaused: boolean;
  interpreterInput: number[];
}

const initialState: ControlPanelState = {
  isReleaseExecutionRunning: false,
  isDebugExecutionRunning: false,
  isDebugExecutionPaused: false,
  interpreterInput: []
};

const reducer = createReducer(
  initialState,
  on(ControlPanelActions.startReleaseExecution, state => ({ ...state, isReleaseExecutionRunning: true })),
  on(ControlPanelActions.executionFinished, state => ({
    ...state,
    isReleaseExecutionRunning: false,
    isDebugExecutionRunning: false,
    isDebugExecutionPaused: false
  })),
  on(
    ControlPanelActions.finishInterpreterInputEditing,
    (state, { input }) => {
      const convertedInput: number[] = input.split('').map(char => char.charCodeAt(0));
      return { ...state, interpreterInput: convertedInput };
    }
  ),
  on(
    ControlPanelActions.startDebugExecution,
    state => ({ ...state, isDebugExecutionRunning: true })
  ),
  on(
    ControlPanelActions.debugExecutionPaused,
    state => ({ ...state, isDebugExecutionPaused: true })
  )
);

export function controlPanelReducer(state: ControlPanelState, action: Action) {
  return reducer(state, action);
}
