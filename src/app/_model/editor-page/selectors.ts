import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { EditorPageState, editorPageFeatureKey } from './reducer';
import { breakpointArrAdapter } from './breakpoint-arr';

export const getEditorPageState = createFeatureSelector<AppState, EditorPageState>(editorPageFeatureKey);

export const getBreakpointArr = createSelector(
  getEditorPageState,
  state => state.breakpoints
);

export const getBreakpoints = createSelector(
  getBreakpointArr,
  breakpointArr => breakpointArrAdapter.getSelectors().selectAll(breakpointArr)
);

export const getActiveBreakpointIndexes = createSelector(
  getBreakpoints,
  breakpoints => breakpoints.filter(v => v.isActive).map(v => v.index)
);
