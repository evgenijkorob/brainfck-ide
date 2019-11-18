import { Injectable } from '@angular/core';
import { Store, select, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { InterpreterService } from 'src/app/interpreter/interpreter.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';
import { startReleaseExecution, executionFinished, stopExecution } from './actions';
import { getCode, getInterpreterConfig } from '../ide/selectors';
import { BfInterpreterConfig, BfInterpreterInitialData } from 'src/app/interpreter/interpreter';
import { getInterpreterInput } from './selectors';



@Injectable()
export class ReleaseExecutionEffects {
  private interpreterConfig: BfInterpreterConfig;
  private interpreterInitialData: BfInterpreterInitialData;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private interpreter: InterpreterService
  ) {
    this.interpreter.subToOutput({
      next: charCode => console.log(String.fromCharCode(charCode))
    });
    this.getConfigAndInitialData().subscribe({
      next: ({ config, initialData }) => {
        this.interpreterConfig = config;
        this.interpreterInitialData = initialData;
      }
    });
  }

  public startReleaseExecution$ = createEffect(
    () => this.actions$.pipe(
      ofType(startReleaseExecution.type),
      exhaustMap(
        action => this.interpreter.run(this.interpreterConfig, this.interpreterInitialData).pipe(
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
