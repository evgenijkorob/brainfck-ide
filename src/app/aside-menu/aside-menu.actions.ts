import { createAction, props } from '@ngrx/store';
import { MenuItemTag } from './aside-menu.model';

export const selectItem = createAction('[Aside Menu] Select item', props<{ tag: MenuItemTag }>());
