import { createReducer, Action, on } from '@ngrx/store';
import { selectTab, closePanelContent, printOutput, clearOutput } from './actions';

export const workbenchPanelFeatureKey = 'workbench-panel';

export const TAB_TITLES = {
  Breakpoints: 'breakpoints',
  Output: 'output'
};

export interface WorkbenchPanelState {
  activeTabTitle: string;
  isContentOpened: boolean;
  output: string;
}

const initialState: WorkbenchPanelState = {
  activeTabTitle: null,
  isContentOpened: false,
  output: ''
};

const reducer = createReducer(
  initialState,
  on(selectTab, (state, { title }) => ({
    ...state,
    activeTabTitle: title,
    isContentOpened: (state.isContentOpened === false) || (title !== state.activeTabTitle)
  })),
  on(closePanelContent, state => ({ ...state, isContentOpened: false, activeTabTitle: null })),
  on(printOutput, (state, { str }) => ({ ...state, output: state.output + str })),
  on(clearOutput, state => ({ ...state, output: '' }))
);

export function workbenchPanelReducer(state: WorkbenchPanelState | undefined, action: Action) {
  return reducer(state, action);
}
