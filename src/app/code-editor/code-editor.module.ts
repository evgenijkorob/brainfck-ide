import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { StoreModule } from '@ngrx/store';
import { codeEditorKey, codeEditorReducer } from '../_model/code-editor/reducer';



@NgModule({
  declarations: [CodeEditorComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(codeEditorKey, codeEditorReducer)
  ],
  exports: [CodeEditorComponent]
})
export class CodeEditorModule { }
