import { createAction, props } from '@ngrx/store';

export const finishTypingCode = createAction('[Code Editor] Finish typing code', props<{code: string}>());
