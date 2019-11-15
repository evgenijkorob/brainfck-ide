import { BfInterpreterConfig } from 'src/app/interpreter-worker/interpreter';
import { createReducer, Action, on } from '@ngrx/store';
import { finishCodeEditing } from './actions';



export const ideFeatureKey = 'ide';

export interface IdeState {
  code: string;
  interpreterConfig: BfInterpreterConfig;
}

const initialState: IdeState = {
  code: '',
  interpreterConfig: {
    memoryCellSize: 8,
    memorySize: 30000
  }
};

const reducer = createReducer(
  initialState,
  on(finishCodeEditing, (state, { code }) => ({ ...state, code }))
);

export function ideReducer(state: IdeState, action: Action) {
  return reducer(state, action);
}
