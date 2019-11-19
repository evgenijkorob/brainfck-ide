import { createReducer, Action, on } from '@ngrx/store';
import { changeCursorIndex, addBreakpoint, removeBreakpoint, toggleBreakpoint, removeAllBreakpoints } from './action';
import { BreakpointArr, breakpointArrAdapter } from './breakpoint-arr';

export const editorPageFeatureKey = 'editor-page';

export interface EditorPageState {
  cursorIndex: number;
  breakpoints: BreakpointArr;
}

const initialState: EditorPageState = {
  cursorIndex: null,
  breakpoints: breakpointArrAdapter.getInitialState()
};

const reducer = createReducer(
  initialState,
  on(changeCursorIndex, (state, { cursorIndex }) => ({ ...state, cursorIndex })),
  on(addBreakpoint, (state) => {
    if (!state.cursorIndex) {
      return state;
    }
    return {
      ...state,
      breakpoints: breakpointArrAdapter.addOne({ index: state.cursorIndex, isActive: true }, state.breakpoints)
    };
  }),
  on(removeBreakpoint, (state, { breakpoint }) => ({
    ...state,
    breakpoints: breakpointArrAdapter.removeOne(breakpointArrAdapter.selectId(breakpoint) as string, state.breakpoints)
  })),
  on(toggleBreakpoint, (state, { breakpoint }) => ({
    ...state,
    breakpoints: breakpointArrAdapter.updateOne(
      {
        id: breakpointArrAdapter.selectId(breakpoint) as string,
        changes: { isActive: !breakpoint.isActive }
      },
    state.breakpoints)
  })),
  on(removeAllBreakpoints, (state) => ({ ...state, breakpoints: breakpointArrAdapter.removeAll(state.breakpoints)}))
);

export function editorPageReducer(state: EditorPageState | undefined, action: Action) {
  return reducer(state, action);
}
