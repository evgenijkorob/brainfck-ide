import { Injectable } from '@angular/core';
import { Store, select, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { InterpreterService } from 'src/app/interpreter.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { startReleaseExecution, executionFinished, stopExecution } from './actions';
import { getCode, getInterpreterConfig } from '../ide/selectors';
import { BfInterpreterConfig, BfInterpreterInitialData } from 'src/app/interpreter-worker/interpreter';
import { getInterpreterInput } from './selectors';



@Injectable()
export class ReleaseExecutionEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private interpreter: InterpreterService
  ) {
    this.interpreter.subToOutput({
      next: charCode => console.log(String.fromCharCode(charCode))
    });
  }

  public startReleaseExecution$ = createEffect(
    () => this.actions$.pipe(
      ofType(startReleaseExecution.type),
      mergeMap(
        action => this.getConfigAndInitialData().pipe(
          mergeMap(({ config, initialData }) => this.interpreter.run(config, initialData)),
          map(executionState => executionFinished()),
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

  private getConfigAndInitialData(): Observable<{ config: BfInterpreterConfig, initialData: BfInterpreterInitialData}> {
    return this.store.pipe(
      select(
        createSelector(
          getInterpreterConfig,
          getInterpreterInput,
          getCode,
          (config, input, code) => ({ config, initialData: { code, input }})
        )
      )
    );
  }
}
