import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { codeChanged } from 'src/app/_model/ide/actions';
import { EditorService } from 'src/app/editor/editor.service';
import { debounceTime } from 'rxjs/operators';
import { changeCursorIndex } from 'src/app/_model/editor-page/action';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit {

  constructor(
    private store: Store<AppState>,
    private editor: EditorService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.editor.onChange$.pipe(debounceTime(800))
      .subscribe({ next: (code) => this.store.dispatch(codeChanged({ code })) });
    this.editor.onCursorIndexChange$.pipe(debounceTime(500))
      .subscribe({ next: (index) => this.store.dispatch(changeCursorIndex({ cursorIndex: index })) });
  }

  finishTyping(code: string): void {
    this.store.dispatch(codeChanged({ code }));
  }

}
