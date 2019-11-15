import { createReducer, Action, on } from '@ngrx/store';
import * as ControlPanelActions from './actions';

export const controlPanelFeatureKey = 'control-panel';

export interface ControlPanelState {
  isReleaseExecutionRunning: boolean;
  interpreterInput: number[];
}

const initialState: ControlPanelState = {
  isReleaseExecutionRunning: false,
  interpreterInput: []
};

const reducer = createReducer(
  initialState,
  on(ControlPanelActions.startReleaseExecution, state => ({ ...state, isReleaseExecutionRunning: true })),
  on(ControlPanelActions.executionFinished, state => ({ ...state, isReleaseExecutionRunning: false })),
  on(
    ControlPanelActions.finishInterpreterInputEditing,
    (state, { input }) => {
      const convertedInput: number[] = input.split('').map(char => char.charCodeAt(0));
      return { ...state, interpreterInput: convertedInput };
    }
  )
);

export function controlPanelReducer(state: ControlPanelState, action: Action) {
  return reducer(state, action);
}
