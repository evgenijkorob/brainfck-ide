/// <reference lib="webworker" />
import { BfInterpreter, BfExecutionState } from './interpreter';



class InterpreterWorker {
  private interpreter: BfInterpreter;

  constructor() {
    addEventListener('message', this.messageHandler.bind(this));
  }

  private messageHandler({ data }): void {
    try {
      switch (data.command) {
        case 'initiate-entity':
          this.initiateInterpreterEntity(data.payload);
          break;
        case 'run':
          this.executeProgram();
          break;
        default:
          throw new Error('Unknown command');
      }
    } catch (err) {
      this.postMessage('error', { err: { message: err.message } });
    }
  }

  private initiateInterpreterEntity({ memoryCellSize, memorySize, code, input }): void {
    this.interpreter = new BfInterpreter(
      memoryCellSize, memorySize, code, input, this.interpreterOutputHandler.bind(this)
    );
  }

  private interpreterOutputHandler(charCode: number): void {
    this.postMessage('output', { charCode });
  }

  private executeProgram(): void {
    const startedMillis: number = Date.now();
    const stateHandler = (state: BfExecutionState) => {
      if (state.finished) {
        this.postMessage('completed', { state });
      }
    };

    while (this.interpreter.next(stateHandler)) {
      if ((Date.now() - startedMillis) >= 50) {
        setTimeout(this.executeProgram.bind(this), 0);
        break;
      }
    }
  }

  private postMessage(type: string, payload: any): void {
    postMessage({ type, payload });
  }
}

const worker = new InterpreterWorker();
