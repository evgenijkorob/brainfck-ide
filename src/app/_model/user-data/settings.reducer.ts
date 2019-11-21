import { BfInterpreterConfig } from 'src/app/interpreter/interpreter';
import { createReducer, Action } from '@ngrx/store';

export interface SettingsState {
  config: BfInterpreterConfig;
}

export const settingsInitialState: SettingsState = {
  config: {
    memoryCellSize: 8,
    memorySize: 30000
  }
};

const reducer = createReducer(
  settingsInitialState
);

export function settingsStateReducer(state: SettingsState, action: Action) {
  return reducer(state, action);
}
