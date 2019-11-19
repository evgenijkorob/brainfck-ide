import { createAction, props } from '@ngrx/store';
import { Breakpoint } from './breakpoint-arr';

export const changeCursorIndex = createAction(
  '[Editor Page] Change cursor index in file',
  props<{ cursorIndex: number }>()
);

export const addBreakpoint = createAction('[Editor Page] Add breakpoint at cursor index');

export const removeBreakpoint = createAction('[Editor Page] Remove breakpoint', props<{ breakpoint: Breakpoint }>());

export const toggleBreakpoint = createAction('[Editor Page] Toggle breakpoint', props<{ breakpoint: Breakpoint }>());

export const removeAllBreakpoints = createAction('[Editor Page] Remove all breakpoints');
