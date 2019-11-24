import { Injectable } from '@angular/core';
import { Store, select, createSelector, Action } from '@ngrx/store';
import { AppState } from '../state';
import { InterpreterService } from 'src/app/interpreter/interpreter.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, withLatestFrom, switchMap, mapTo, tap } from 'rxjs/operators';
import * as ControlPanelActions from './actions';
import { BfInterpreterConfig, BfInterpreterInitialData } from 'src/app/interpreter/interpreter';
import { getInterpreterInput } from './selectors';
import { getInterpreterConfig } from '../user-data/settings.selectors';
import { getCode } from '../user-data/code.selectors';
import { printOutput, clearOutput } from '../workbench-panel/actions';
import { getActiveBreakpointIndexes } from '../editor-page/selectors';



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
    ofType(ControlPanelActions.startReleaseExecution.type, ControlPanelActions.startDebugExecution.type),
    mapTo(clearOutput())
  ));

  public startReleaseExecution$ = createEffect(() => this.actions$.pipe(
    ofType(ControlPanelActions.startReleaseExecution.type),
    withLatestFrom(this.getConfigAndInitialData()),
    switchMap(
      ([, { config, initialData }]) => this.interpreter.run(config, initialData).pipe(
        mapTo(ControlPanelActions.executionFinished())
      )
    )
  ));

  public startDebugExecution$ = createEffect(() => this.actions$.pipe(
    ofType(ControlPanelActions.startDebugExecution.type),
    withLatestFrom(this.getConfigAndInitialData(), this.store.pipe(select(getActiveBreakpointIndexes))),
    switchMap(
      ([, { config, initialData }, breakpoints]) => this.interpreter.debug(config, initialData, breakpoints).pipe(
        map(executionState => {
          if (executionState.paused) {
            return ControlPanelActions.debugExecutionPaused({ execution: executionState });
          } else {
            return ControlPanelActions.executionFinished();
          }
        })
      )
    )
  ));

  public continueDebugExecution$ = createEffect(
    () => this.actions$.pipe(
      ofType(ControlPanelActions.continueDebugExecution.type),
      withLatestFrom(this.store.pipe(select(getActiveBreakpointIndexes))),
      tap(([, breakpoints]) => this.interpreter.continue(breakpoints))
    ),
    {
      dispatch: false
    }
  );

  public makeStep$ = createEffect(
    () => this.actions$.pipe(
      ofType(ControlPanelActions.makeDebugExecutionStep.type),
      tap(() => this.interpreter.step())
    ),
    {
      dispatch: false
    }
  );

  public stopExecution$ = createEffect(() => this.actions$.pipe(
    ofType(ControlPanelActions.stopExecution.type),
    tap(() => this.interpreter.stop()),
    mapTo(ControlPanelActions.executionFinished())
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
