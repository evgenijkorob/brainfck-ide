import { createReducer, Action, on } from '@ngrx/store';
import { selectTab, closePanelContent } from './actions';

export const workbenchPanelFeatureKey = 'workbench-panel';

export const TAB_TITLES = {
  Breakpoints: 'breakpoints'
};

export interface WorkbenchPanelState {
  activeTabTitle: string;
  isContentOpened: boolean;
}

const initialState: WorkbenchPanelState = {
  activeTabTitle: null,
  isContentOpened: false
};

const reducer = createReducer(
  initialState,
  on(selectTab, (state, { title }) => ({
    ...state,
    activeTabTitle: title,
    isContentOpened: (state.isContentOpened === false) || (title !== state.activeTabTitle)
  })),
  on(closePanelContent, state => ({ ...state, isContentOpened: false, activeTabTitle: null }))
);

export function workbenchPanelReducer(state: WorkbenchPanelState | undefined, action: Action) {
  return reducer(state, action);
}
