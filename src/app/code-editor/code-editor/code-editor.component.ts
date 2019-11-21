import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { codeChanged } from 'src/app/_model/user-data/code.actions';
import { EditorService } from 'src/app/editor/editor.service';
import { debounceTime } from 'rxjs/operators';
import { changeCursorIndex } from 'src/app/_model/editor-page/action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  private editorOnChangeSub: Subscription;
  private editorOnCursorIndexChangeSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private editor: EditorService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editorOnChangeSub = this.editor.onChange$.pipe(debounceTime(800))
      .subscribe({ next: (code) => this.store.dispatch(codeChanged({ code })) });
    this.editorOnCursorIndexChangeSub = this.editor.onCursorIndexChange$.pipe(debounceTime(500))
      .subscribe({ next: (index) => this.store.dispatch(changeCursorIndex({ cursorIndex: index })) });
  }

  ngOnDestroy() {
    this.editorOnChangeSub.unsubscribe();
    this.editorOnCursorIndexChangeSub.unsubscribe();
  }
}
