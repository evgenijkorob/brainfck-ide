import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { codeChanged } from 'src/app/_model/user-data/code.actions';
import { debounceTime } from 'rxjs/operators';
import { changeCursorIndex } from 'src/app/_model/editor-page/action';
import { Subscription, Observable, Subject } from 'rxjs';
import { getActiveBreakpointIndexes } from 'src/app/_model/editor-page/selectors';
import { getExecutionPosIndex } from 'src/app/_model/control-panel/selectors';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit, OnDestroy {

  public breakpointsSource$: Observable<number[]> = this.store.pipe(select(getActiveBreakpointIndexes));
  public executionPosSource$: Observable<number> = this.store.pipe(select(getExecutionPosIndex));

  private codeChange$ = new Subject<string>();
  private cursorIndexChange$ = new Subject<number>();
  private onCodeChangeSub: Subscription;
  private onCursorIndexChangeSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.onCodeChangeSub = this.codeChange$.pipe(debounceTime(800))
      .subscribe({ next: (code) => this.store.dispatch(codeChanged({ code })) });
    this.onCursorIndexChangeSub = this.cursorIndexChange$.pipe(debounceTime(500))
      .subscribe({ next: (index) => this.store.dispatch(changeCursorIndex({ cursorIndex: index })) });
  }

  onCodeChange(code: string): void {
    this.codeChange$.next(code);
  }

  onCursorIndexChange(index: number): void {
    this.cursorIndexChange$.next(index);
  }

  ngOnDestroy() {
    this.onCodeChangeSub.unsubscribe();
    this.onCursorIndexChangeSub.unsubscribe();
  }
}
