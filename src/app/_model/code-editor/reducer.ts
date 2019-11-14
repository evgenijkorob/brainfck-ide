import { createReducer, Action, on } from '@ngrx/store';
import { finishTypingCode } from './actions';

export const codeEditorKey = 'code-editor';

export interface CodeEditorState {
  code: string;
}

const initialState: CodeEditorState = {
  code: ''
};

const reducer = createReducer(
  initialState,
  on(finishTypingCode, (state, { code }) => ({ ...state, code }))
);

export function codeEditorReducer(state: CodeEditorState, action: Action) {
  return reducer(state, action);
}
