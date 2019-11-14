import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorPageRoutingModule } from './editor-page-routing.module';
import { EditorPageComponent } from './editor-page.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { ControlPanelModule } from '../control-panel/control-panel.module';



@NgModule({
  declarations: [EditorPageComponent],
  imports: [
    CommonModule,
    EditorPageRoutingModule,
    SharedComponentsModule,
    CodeEditorModule,
    ControlPanelModule
  ]
})
export class EditorPageModule { }
