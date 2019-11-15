import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ControlPanelState, controlPanelFeatureKey } from './reducer';
import { AppState } from '../state';

export const getControlPanelState = createFeatureSelector<AppState, ControlPanelState>(controlPanelFeatureKey);

export const getIsReleaseExecutionRunning = createSelector(getControlPanelState, state => state.isReleaseExecutionRunning);

export const getInterpreterInput = createSelector(
  getControlPanelState,
  state => state.interpreterInput
);
