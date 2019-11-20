import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorPageComponent } from './editor-page.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { StoreModule } from '@ngrx/store';
import { editorPageFeatureKey, editorPageReducer } from '../_model/editor-page/reducer';
import { WorkbenchPanelModule } from '../workbench-panel/workbench-panel.module';



@NgModule({
  declarations: [EditorPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(editorPageFeatureKey, editorPageReducer),
    SharedComponentsModule,
    CodeEditorModule,
    ControlPanelModule,
    WorkbenchPanelModule
  ],
  exports: [EditorPageComponent]
})
export class EditorPageModule { }
