import { createAction, props } from '@ngrx/store';

export const selectTab = createAction('[Workbench Panel] Select tab', props<{ title: string }>());

export const closePanelContent = createAction('[Workbench Panel] Close panel content');

export const printOutput = createAction('[Output Tab] Print output', props<{ str: string }>());

export const clearOutput = createAction('[Output Tab] Clear output');
