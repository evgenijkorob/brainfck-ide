import { createReducer, Action, on } from '@ngrx/store';
import { codeChanged } from './code.actions';

export interface CodeState {
  code: string;
}

export const codeInitialState: CodeState = {
  code: ''
};

const reducer = createReducer(
  codeInitialState,
  on(codeChanged, (state, { code }) => ({ ...state, code }))
);

export function codeStateReducer(state: CodeState, action: Action) {
  return reducer(state, action);
}
