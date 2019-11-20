import { createAction, props } from '@ngrx/store';

export const selectTab = createAction('[Workbench Panel] Select tab', props<{ title: string }>());

export const closePanelContent = createAction('[Workbench Panel] Close panel content');
