import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { WorkbenchPanelState, workbenchPanelFeatureKey } from './reducer';

export const getWorkbenchPanelState = createFeatureSelector<AppState, WorkbenchPanelState>(workbenchPanelFeatureKey);

export const getActiveTabTitle = createSelector(
  getWorkbenchPanelState,
  state => state.activeTabTitle
);

export const getIsContentOpened = createSelector(
  getWorkbenchPanelState,
  state => state.isContentOpened
);
