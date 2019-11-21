import { createSelector } from '@ngrx/store';
import { getUserProfile } from './_selectors';

export const getCode = createSelector(
  getUserProfile,
  state => state.codeState.code
);
