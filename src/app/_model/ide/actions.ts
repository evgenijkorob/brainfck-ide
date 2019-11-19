import { createAction, props } from '@ngrx/store';

export const codeChanged = createAction('[Code Editor] Code changed', props<{code: string}>());
