import { Directive, ElementRef, AfterContentChecked } from '@angular/core';

@Directive({
  selector: '[appAutoscroll]'
})
export class AutoscrollDirective implements AfterContentChecked {

  constructor(private el: ElementRef) { }

  ngAfterContentChecked(): void {
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    this.el.nativeElement.scrollLeft = 0;
  }

}
