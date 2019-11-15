import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { IdeState, ideFeatureKey } from './reducer';

export const getIdeState = createFeatureSelector<AppState, IdeState>(ideFeatureKey);

export const getCode = createSelector(
  getIdeState,
  state => state.code
);

export const getInterpreterConfig = createSelector(
  getIdeState,
  state => state.interpreterConfig
);
