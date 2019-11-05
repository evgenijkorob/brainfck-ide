import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AsideMenuState } from './aside-menu.model';
import { asideMenuFeatureKey } from './aside-menu.reducer';

export const getAsideMenuState = createFeatureSelector<AppState, AsideMenuState>(asideMenuFeatureKey);

export const getSelectedItemTag = createSelector(
  getAsideMenuState,
  (state) => state.selectedItemTag
);

export const getMenuItems = createSelector(
  getAsideMenuState,
  (state) => state.menuItems
);
