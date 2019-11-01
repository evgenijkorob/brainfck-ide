import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BfExecutionState } from './interpreter';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { receiveOutputCharCode } from './code-editor/code-editor.actions';



@Injectable({
  providedIn: 'root'
})
export class InterpreterService {
  private worker = new Worker('./interpreter.worker', { type: 'module' });
  private runningProgram$: Subject<BfExecutionState>;
  private output$ = new Subject<number>();

  constructor(private store$: Store<AppState>) {
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
    this.worker.onerror = console.error;
  }

  run(config: any): Subject<BfExecutionState> {
    this.runningProgram$ = new Subject<BfExecutionState>();
    this.postMessageToWorker('initiate-entity', config);
    this.postMessageToWorker('run');
    return this.runningProgram$;
  }

  private postMessageToWorker(command: string, payload?: any): void {
    this.worker.postMessage({ command, payload });
  }

  private handleWorkerMessage({ data }): void {
    switch (data.type) {
      case 'output':
        this.output$.next(data.payload.charCode);




        // TODO надо что-то сделать с этим



        this.store$.dispatch(receiveOutputCharCode({ charCode: data.payload.charCode }));
        break;
      case 'error':
        console.error('[WORKER] ' + data.payload.err.message);
        this.runningProgram$.error(data.payload.err);
        break;
      case 'completed':
        this.runningProgram$.next(data.payload.state);
        this.runningProgram$.complete();
        break;
      default:
        console.log('webworker message of unknown type');
        console.dir(data);
        break;
    }
  }
}
