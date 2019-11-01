import { CodeEditorState, codeEditorFeatureKey } from './code-editor/code-editor.reducer';

export interface AppState {
  [codeEditorFeatureKey]: CodeEditorState;
}
