import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorPageComponent } from './editor-page.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { ControlPanelModule } from '../control-panel/control-panel.module';



@NgModule({
  declarations: [EditorPageComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    CodeEditorModule,
    ControlPanelModule
  ],
  exports: [EditorPageComponent]
})
export class EditorPageModule { }
