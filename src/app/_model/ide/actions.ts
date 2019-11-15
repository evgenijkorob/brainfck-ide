import { createAction, props } from '@ngrx/store';

export const finishCodeEditing = createAction('[Code Editor] Finish code editing', props<{code: string}>());
