import { asideMenuFeatureKey } from '../aside-menu/aside-menu.reducer';
import { AsideMenuState } from '../aside-menu/aside-menu.model';
import { controlPanelFeatureKey, ControlPanelState } from './control-panel/reducer';
import { editorPageFeatureKey, EditorPageState } from './editor-page/reducer';
import { workbenchPanelFeatureKey, WorkbenchPanelState } from './workbench-panel/reducer';
import { userDataFeatureKey, UserDataFeatureState } from './user-data/_reducer';



export interface AppState {
  [asideMenuFeatureKey]: AsideMenuState;
  [editorPageFeatureKey]: EditorPageState;
  [controlPanelFeatureKey]: ControlPanelState;
  [workbenchPanelFeatureKey]: WorkbenchPanelState;
  [userDataFeatureKey]: UserDataFeatureState;
}
