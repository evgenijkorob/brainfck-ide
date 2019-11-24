import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { codeChanged } from 'src/app/_model/user-data/code.actions';
import { EditorService } from 'src/app/editor/editor.service';
import { debounceTime } from 'rxjs/operators';
import { changeCursorIndex } from 'src/app/_model/editor-page/action';
import { Subscription } from 'rxjs';
import { getActiveBreakpointIndexes } from 'src/app/_model/editor-page/selectors';
import { getExecutionPosIndex } from 'src/app/_model/control-panel/selectors';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  private editorOnChangeSub: Subscription;
  private editorOnCursorIndexChangeSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private editor: EditorService
  ) { }

  ngOnInit() {
    this.editorOnChangeSub = this.editor.onChange$.pipe(debounceTime(800))
      .subscribe({ next: (code) => this.store.dispatch(codeChanged({ code })) });
    this.editorOnCursorIndexChangeSub = this.editor.onCursorIndexChange$.pipe(debounceTime(500))
      .subscribe({ next: (index) => this.store.dispatch(changeCursorIndex({ cursorIndex: index })) });
    this.editor.setBreakpointObservableSource(this.store.pipe(select(getActiveBreakpointIndexes)));
    this.editor.setExecutionPosObservableSource(this.store.pipe(select(getExecutionPosIndex)));
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.editorOnChangeSub.unsubscribe();
    this.editorOnCursorIndexChangeSub.unsubscribe();
  }
}
