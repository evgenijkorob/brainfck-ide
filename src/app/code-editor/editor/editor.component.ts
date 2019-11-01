import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectCodeEditorIsRunning, selectCodeEditorOutput } from '../code-editor.reducer';
import { Observable } from 'rxjs';
import { finishCodeTyping, finishInputTyping, runProgram } from '../code-editor.actions';



@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.pug',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public isRunning$: Observable<boolean>;
  public programOutput$: Observable<string>;

  constructor(private store$: Store<AppState>) {
    this.isRunning$ = this.store$.pipe(select(selectCodeEditorIsRunning));
    this.programOutput$ = this.store$.pipe(select(selectCodeEditorOutput));
  }

  ngOnInit() {
  }

  run(): void {
    this.store$.dispatch(runProgram());
  }

  finishCodeTyping(code: string) {
    this.store$.dispatch(finishCodeTyping({ code }));
  }

  finishInputTyping(input: string) {
    this.store$.dispatch(finishInputTyping({ input }));
  }
}
