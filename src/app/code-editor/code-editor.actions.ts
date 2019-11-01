import { createAction, props } from '@ngrx/store';



export const finishInputTyping = createAction(
  '[Code Editor] Finish input typing',
  props<{input: string}>()
);

export const finishCodeTyping = createAction(
  '[Code Editor] Finish code typing',
  props<{code: string}>()
);

export const runProgram = createAction('[Code Editor] Run program');

export const completeProgram = createAction('[Code Editor] Complete program');

export const receiveOutputCharCode = createAction(
  '[Code Editor] Receive output char code',
  props<{charCode: number}>()
);
