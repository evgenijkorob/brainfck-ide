import { AsideMenuState, MenuItemTag } from './aside-menu.model';
import { faCog, faBug, faFile, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Action, createReducer, on } from '@ngrx/store';
import * as AsideMenuActions from './aside-menu.actions';

export const asideMenuFeatureKey = 'asideMenu';

export const AsideMenuInitialState: AsideMenuState = {
  menuItems: [
    {
      icon: faCopy,
      tag: MenuItemTag.Editor,
      linkUrl: '/editor'
    },
    {
      icon: faBug,
      tag: MenuItemTag.Debug,
      linkUrl: '/debug'
    },
    {
      icon: faCog,
      tag: MenuItemTag.Settings,
      linkUrl: '/settings'
    }
  ],
  selectedItemTag: MenuItemTag.Editor
};

const AsideMenuReducer = createReducer(
  AsideMenuInitialState,
  on(
    AsideMenuActions.selectItem,
    (state, { tag }) => ({ ...state, selectedItemTag: tag })
  )
);

export function reducer(state: AsideMenuState | undefined, action: Action) {
  return AsideMenuReducer(state, action);
}
