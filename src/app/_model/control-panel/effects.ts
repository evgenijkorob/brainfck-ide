import { Injectable } from '@angular/core';
import { Store, select, createSelector, Action } from '@ngrx/store';
import { AppState } from '../state';
import { InterpreterService } from 'src/app/interpreter/interpreter.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable, merge, combineLatest } from 'rxjs';
import { map, exhaustMap, withLatestFrom, switchMap, mapTo, tap } from 'rxjs/operators';
import { startReleaseExecution, executionFinished, stopExecution, startDebugExecution } from './actions';
import { BfInterpreterConfig, BfInterpreterInitialData } from 'src/app/interpreter/interpreter';
import { getInterpreterInput } from './selectors';
import { getInterpreterConfig } from '../user-data/settings.selectors';
import { getCode } from '../user-data/code.selectors';
import { printOutput, clearOutput } from '../workbench-panel/actions';



@Injectable()
export class ExecutionEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private interpreter: InterpreterService
  ) {
    this.printInterpreterOutput$.subscribe({ next: action => this.store.dispatch(action) });
  }

  public clearOutputOnExecutionStarted$ = createEffect(() => this.actions$.pipe(
    ofType(startReleaseExecution.type, startDebugExecution.type),
    mapTo(clearOutput())
  ));

  public startReleaseExecution$ = createEffect(() => this.actions$.pipe(
    ofType(startReleaseExecution.type),
    withLatestFrom(this.getConfigAndInitialData()),
    switchMap(
      ([, { config, initialData }]) => this.interpreter.run(config, initialData).pipe(
        mapTo(executionFinished())
      )
    )
  ));

  public stopExecution$ = createEffect(() => this.actions$.pipe(
    ofType(stopExecution.type),
    tap(() => this.interpreter.stop()),
    mapTo(executionFinished())
  ));

  private printInterpreterOutput$ = this.interpreter.output$.pipe(
    map(charCode => this.prepareOutputAction(charCode))
  );

  private prepareOutputAction(charCode: number): Action {
    const str = String.fromCharCode(charCode);
    return printOutput({ str });
  }

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
