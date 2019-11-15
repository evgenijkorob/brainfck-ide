import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state';
import { InterpreterService } from 'src/app/interpreter.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { startReleaseExecution, executionFinished, stopExecution } from './actions';
import { getCode } from '../ide/selectors';
import { BfInterpreterConfig } from 'src/app/interpreter-worker/interpreter';

@Injectable()
export class ReleaseExecutionEffects {
  private codeSub;
  private config: BfInterpreterConfig;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private interpreter: InterpreterService
  ) {
    this.codeSub = this.store.pipe(select(getCode)).subscribe(
      {
        next: (code) => {
          this.config = {
            memoryCellSize: 8,
            memorySize: 30000,
            code,
            input: []
          };
        }
      }
    );
    this.interpreter.subToOutput({next: (charCode) => console.log(String.fromCharCode(charCode))});
  }

  public startReleaseExecution$ = createEffect(
    () => this.actions$.pipe(
      ofType(startReleaseExecution.type),
      exhaustMap(
        action => this.interpreter.run(this.config).pipe(
          map(executionState => executionFinished())
        )
      )
    )
  );

  public stopReleaseExecution$ = createEffect(
    () => this.actions$.pipe(
      ofType(stopExecution.type),
      map(
        action => {
          this.interpreter.stop();
          return executionFinished();
        }
      )
    )
  );
}
