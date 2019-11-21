import { ActionReducerMap } from '@ngrx/store';
import { CodeState, codeStateReducer } from './code.reducer';
import { SettingsState, settingsStateReducer } from './settings.reducer';

export const userDataFeatureKey = 'user-data';

export interface UserDataFeatureState {
  codeState: CodeState;
  settingsState: SettingsState;
}

export const userDataFeatureReducerMap: ActionReducerMap<UserDataFeatureState> = {
  codeState: codeStateReducer,
  settingsState: settingsStateReducer
};
