import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InterpreterService } from '../interpreter.service';
import { runProgram, completeProgram, completeProgramWithError } from './code-editor.actions';
import { map, catchError, mergeAll, exhaustMap, exhaust } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Store, select } from '@ngrx/store';
import { selectCodeEditorConfig } from './code-editor.reducer';
import { of } from 'rxjs';



@Injectable()
export class CodeEditorEffects {
  private configSub;
  private config;

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
      exhaustMap(
        action => this.interpreter.run(this.config).pipe(
          map(executionState => completeProgram()),
          catchError(err => of(completeProgramWithError()))
        )
      )
    )
  );
}
