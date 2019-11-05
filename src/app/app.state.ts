import { CodeEditorState, codeEditorFeatureKey } from './code-editor/code-editor.reducer';
import { asideMenuFeatureKey } from './aside-menu/aside-menu.reducer';
import { AsideMenuState } from './aside-menu/aside-menu.model';

export interface AppState {
  [codeEditorFeatureKey]: CodeEditorState;
  [asideMenuFeatureKey]: AsideMenuState;
}
