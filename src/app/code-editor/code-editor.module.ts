import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { EditorModule } from '../editor/editor.module';



@NgModule({
  declarations: [CodeEditorComponent],
  imports: [
    CommonModule,
    EditorModule
  ],
  exports: [CodeEditorComponent]
})
export class CodeEditorModule { }
