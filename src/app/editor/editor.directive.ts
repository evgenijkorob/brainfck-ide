import { Directive, ElementRef, Input, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import { EditorService } from './editor.service';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appEditor]',
  providers: [EditorService]
})
export class EditorDirective implements OnInit, OnDestroy {

  // tslint:disable-next-line: no-input-rename
  @Input('breakpoints') breakpointsSource$: Observable<number[]>;

  // tslint:disable-next-line: no-input-rename
  @Input('executionPosIndex') executionPosIndexSource$: Observable<number>;

  @Output() codeChange = new EventEmitter<string>();

  @Output() cursorIndexChange = new EventEmitter<number>();

  private codeChangeSub: Subscription;
  private cursorIndexChangeSub: Subscription;

  constructor(
    private el: ElementRef,
    private editorService: EditorService
  ) { }

  ngOnInit(): void {
    this.initializeEditor();
    this.subToEditorChanges();
  }

  private initializeEditor(): void {
    this.editorService.initializeOnDomElement(this.el.nativeElement);
    if (this.breakpointsSource$) {
      this.editorService.setBreakpointsSource(this.breakpointsSource$);
    }
    if (this.executionPosIndexSource$) {
      this.editorService.setExecutionPosSource(this.executionPosIndexSource$);
    }
  }

  private subToEditorChanges(): void {
    this.codeChangeSub = this.editorService.onCodeChange$.subscribe({
      next: code => this.codeChange.emit(code)
    });
    this.cursorIndexChangeSub = this.editorService.onCursorIndexChange$.subscribe({
      next: cursorIndex => this.cursorIndexChange.emit(cursorIndex)
    });
  }

  ngOnDestroy(): void {
    this.codeChangeSub.unsubscribe();
    this.cursorIndexChangeSub.unsubscribe();
    this.editorService.onDestroy();
  }

}
