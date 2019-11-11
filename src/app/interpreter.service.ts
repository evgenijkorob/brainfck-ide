import { Injectable } from '@angular/core';
import { Subject, Subscription, PartialObserver, Observable } from 'rxjs';
import { BfExecutionState, BfInterpreterConfig } from './interpreter';
import { InterpreterWorkerMessage } from './interpreter-worker-message';



@Injectable({
  providedIn: 'root'
})
export class InterpreterService {
  private worker = new Worker('./interpreter.worker', { type: 'module' });
  private programExecution$: Subject<BfExecutionState>;
  private output$ = new Subject<number>();

  constructor() {
    this.worker.onmessage = ({ data }) => this.handleWorkerMessage(data);
    this.worker.onerror = console.error;
  }

  public subToOutput(observer: PartialObserver<number>): Subscription {
    return this.output$.subscribe(observer);
  }

  public run(config: BfInterpreterConfig): Observable<BfExecutionState> {
    this.programExecution$ = new Subject<BfExecutionState>();
    this.postMessageToWorker('initialize', config);
    this.postMessageToWorker('run');
    return this.programExecution$.asObservable();
  }

  public debug(config: BfInterpreterConfig, breakpoints: number[]): Observable<BfExecutionState> {
    this.programExecution$ = new Subject<BfExecutionState>();
    this.postMessageToWorker('initialize', config);
    this.postMessageToWorker('debug', breakpoints);
    return this.programExecution$.asObservable();
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
        break;
      case 'error':
        this.programExecution$.error({ message: data.payload });
        break;
      case 'pause':
        this.programExecution$.next(data.payload);
        break;
      case 'complete':
        this.programExecution$.next(data.payload);
        this.programExecution$.complete();
        break;
      case 'stopped':
        this.programExecution$.complete();
        break;
    }
  }
}
