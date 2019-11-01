import * as codeEditorActions from './code-editor.actions';
import { createReducer, on, Action, createFeatureSelector, Store, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';



export const codeEditorFeatureKey = 'codeEditor';

export interface CodeEditorState {
  code: string;
  input: number[];
  output: string;
  isRunning: boolean;
}

export const initialState: CodeEditorState = {
  code: '',
  input: [],
  output: '',
  isRunning: false
};

export const selectCodeEditorState = createFeatureSelector<AppState, CodeEditorState>(codeEditorFeatureKey);

export const selectCodeEditorCode = createSelector(
  selectCodeEditorState,
  (state: CodeEditorState) => state.code
);

export const selectCodeEditorInput = createSelector(
  selectCodeEditorState,
  (state: CodeEditorState) => state.input
);

export const selectCodeEditorIsRunning = createSelector(
  selectCodeEditorState,
  (state: CodeEditorState) => state.isRunning
);

export const selectCodeEditorOutput = createSelector(
  selectCodeEditorState,
  (state: CodeEditorState) => state.output
);

export const selectCodeEditorConfig = createSelector(
  selectCodeEditorCode,
  selectCodeEditorInput,
  (code, input) => ({
    code,
    input,
    memoryCellSize: 8,
    memorySize: 30000
  })
);

const codeEditorReducer = createReducer(
  initialState,
  on(codeEditorActions.finishCodeTyping, (state: CodeEditorState, { code }) => ({ ...state, code })),
  on(
    codeEditorActions.finishInputTyping,
    (state: CodeEditorState, { input }) => ({
      ...state,
      input: input.split('').map((char) => char.charCodeAt(0))
    })
  ),
  on(
    codeEditorActions.runProgram,
    (state: CodeEditorState) => ({ ...state, isRunning: true, output: '' })
  ),
  on(codeEditorActions.completeProgram, (state: CodeEditorState) => ({ ...state, isRunning: false })),
  on(
    codeEditorActions.receiveOutputCharCode,
    (state: CodeEditorState, { charCode }) => ({ ...state, output: state.output + String.fromCharCode(charCode) })
  )
);

export function reducer(state: CodeEditorState | undefined, action: Action) {
  return codeEditorReducer(state, action);
}
