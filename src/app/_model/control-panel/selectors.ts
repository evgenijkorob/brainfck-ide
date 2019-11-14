import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ControlPanelState, controlPanelKey } from './reducer';
import { AppState } from '../state';

export const getControlPanelState = createFeatureSelector<AppState, ControlPanelState>(controlPanelKey);

export const getIsReleaseExecutionRunning = createSelector(getControlPanelState, state => state.isReleaseExecutionRunning);
