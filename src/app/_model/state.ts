import { asideMenuFeatureKey } from '../aside-menu/aside-menu.reducer';
import { AsideMenuState } from '../aside-menu/aside-menu.model';
import { codeEditorKey, CodeEditorState } from './code-editor/reducer';
import { controlPanelKey, ControlPanelState } from './control-panel/reducer';



export interface AppState {
  [asideMenuFeatureKey]: AsideMenuState;
  [codeEditorKey]: CodeEditorState;
  [controlPanelKey]: ControlPanelState;
}
