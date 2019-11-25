import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorDirective } from './editor.directive';



@NgModule({
  declarations: [EditorDirective],
  imports: [
    CommonModule
  ],
  exports: [EditorDirective]
})
export class EditorModule { }
