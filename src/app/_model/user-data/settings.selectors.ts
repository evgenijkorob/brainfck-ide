import { createSelector } from '@ngrx/store';
import { getUserProfile } from './_selectors';

export const getUserSettings = createSelector(
  getUserProfile,
  state => state.settingsState
);

export const getInterpreterConfig = createSelector(
  getUserSettings,
  state => state.config
);
