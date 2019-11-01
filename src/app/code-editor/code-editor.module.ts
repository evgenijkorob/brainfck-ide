import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { StoreModule } from '@ngrx/store';
import { codeEditorFeatureKey, reducer } from './code-editor.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CodeEditorEffects } from './code-editor.effects';



@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(codeEditorFeatureKey, reducer),
    EffectsModule.forFeature([CodeEditorEffects])
  ],
  exports: [EditorComponent]
})
export class CodeEditorModule { }
