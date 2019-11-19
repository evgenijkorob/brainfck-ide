import { asideMenuFeatureKey } from '../aside-menu/aside-menu.reducer';
import { AsideMenuState } from '../aside-menu/aside-menu.model';
import { controlPanelFeatureKey, ControlPanelState } from './control-panel/reducer';
import { ideFeatureKey, IdeState } from './ide/reducer';
import { editorPageFeatureKey, EditorPageState } from './editor-page/reducer';



export interface AppState {
  [asideMenuFeatureKey]: AsideMenuState;
  [ideFeatureKey]: IdeState;
  [editorPageFeatureKey]: EditorPageState;
  [controlPanelFeatureKey]: ControlPanelState;
}
