import { Directive, ElementRef } from '@angular/core';
import { EditorService } from './editor.service';

@Directive({
  selector: '[appEditor]'
})
export class EditorDirective {

  constructor(private el: ElementRef, private editorService: EditorService) {
    this.editorService.initializeOnDomElement(el.nativeElement);
  }

}
