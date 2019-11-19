import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorDirective } from './editor.directive';
import { EditorService } from './editor.service';



@NgModule({
  declarations: [EditorDirective],
  imports: [
    CommonModule
  ],
  providers: [EditorService],
  exports: [EditorDirective]
})
export class EditorModule { }
