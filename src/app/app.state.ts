import { asideMenuFeatureKey } from './aside-menu/aside-menu.reducer';
import { AsideMenuState } from './aside-menu/aside-menu.model';



export interface AppState {
  [asideMenuFeatureKey]: AsideMenuState;
}
