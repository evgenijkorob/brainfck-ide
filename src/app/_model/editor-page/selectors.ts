import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { EditorPageState, editorPageFeatureKey } from './reducer';
import { breakpointArrAdapter } from './breakpoint-arr';

export const getEditorPageState = createFeatureSelector<AppState, EditorPageState>(editorPageFeatureKey);

export const getBreakpoints = createSelector(
  getEditorPageState,
  state => breakpointArrAdapter.getSelectors().selectAll(state.breakpoints)
);

export const getActiveBreakpointIndexes = createSelector(
  getBreakpoints,
  breakpoints => breakpoints.filter(v => v.isActive).map(v => v.index)
);
