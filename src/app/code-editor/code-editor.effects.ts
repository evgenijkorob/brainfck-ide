import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InterpreterService } from '../interpreter.service';
import { runProgram, completeProgram } from './code-editor.actions';
import { map, catchError, mergeAll } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Store, select } from '@ngrx/store';
import { selectCodeEditorConfig } from './code-editor.reducer';
import { Subject, EMPTY } from 'rxjs';
import { BfExecutionState } from '../interpreter';



@Injectable()
export class CodeEditorEffects {
  private configSub;
  private config;
  private programExecution$: Subject<BfExecutionState>;

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private interpreter: InterpreterService
  ) {
    this.configSub = this.store$.pipe(select(selectCodeEditorConfig)).subscribe({
      next: (config) => this.config = config,
      complete: () => this.configSub.unsubscribe()
    });
  }

  public runProgram$ = createEffect(
    () => this.actions$.pipe(
      ofType(runProgram.type),
      map(() => this.interpreter.run(this.config)),
      mergeAll(),
      map(
        executionState => {
          return completeProgram();
        }
      ),
      catchError((err) => {
        console.error(err.message);
        return EMPTY;
      })
    )
  );
}
