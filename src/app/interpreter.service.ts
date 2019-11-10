import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BfExecutionState, BfInterpreterConfig } from './interpreter';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { receiveOutputCharCode } from './code-editor/code-editor.actions';
import { InterpreterWorkerMessage } from './interpreter-worker-message';



@Injectable({
  providedIn: 'root'
})
export class InterpreterService {
  private worker = new Worker('./interpreter.worker', { type: 'module' });
  private runningProgram$: Subject<BfExecutionState>;
  private output$ = new Subject<number>();

  constructor(private store: Store<AppState>) {
    this.worker.onmessage = ({ data }) => this.handleWorkerMessage(data);
    this.worker.onerror = console.error;
  }

  public run(config: BfInterpreterConfig): Subject<BfExecutionState> {
    this.runningProgram$ = new Subject<BfExecutionState>();
    this.postMessageToWorker('initialize', config);
    this.postMessageToWorker('run');
    return this.runningProgram$;
  }

  public debug(config: BfInterpreterConfig, breakpoints: number[]): Subject<BfExecutionState> {
    this.runningProgram$ = new Subject<BfExecutionState>();
    this.postMessageToWorker('initialize', config);
    this.postMessageToWorker('debug', breakpoints);
    return this.runningProgram$;
  }

  public continue(breakpoints: number[]): void {
    this.postMessageToWorker('continue', breakpoints);
  }

  public step(): void {
    this.postMessageToWorker('step');
  }

  public stop(): void {
    this.postMessageToWorker('stop');
  }

  private postMessageToWorker(message: string, payload?: any): void {
    const messageObj: InterpreterWorkerMessage = { message, payload };
    this.worker.postMessage(messageObj);
  }

  private handleWorkerMessage(data: InterpreterWorkerMessage): void {
    switch (data.message) {
      case 'output':
        this.output$.next(data.payload);
        this.store.dispatch(receiveOutputCharCode({ charCode: data.payload }));
        break;
      case 'error':
        this.runningProgram$.error({ message: data.payload });
        break;
      case 'pause':
        this.runningProgram$.next(data.payload);
        break;
      case 'complete':
        this.runningProgram$.next(data.payload);
        this.runningProgram$.complete();
        break;
      case 'stopped':
        this.runningProgram$.complete();
        break;
    }
  }
}
