/// <reference lib="webworker" />

import { InterpreterController } from './interpreter-controller';
import { InterpreterWorkerMessage } from './interpreter-worker-message';



class InterpreterWorker {
  private interpreterController: InterpreterController;

  constructor() {
    this.interpreterController = new InterpreterController(
      (charCode) => this.postMessage('output', charCode),
      (state) => {
        if (state.paused) {
          this.postMessage('pause', state);
        } else if (state.finished) {
          this.postMessage('complete', state);
        }
      }
    );
    addEventListener('message', ({ data }) => this.messageHandler(data));
  }

  private messageHandler(data: InterpreterWorkerMessage): void {
    try {
      switch (data.message) {
        case 'initialize':
          this.interpreterController.initialize(data.payload);
          break;
        case 'run':
          this.interpreterController.runProgram(data.payload);
          break;
        case 'debug':
          this.interpreterController.debugProgram(data.payload.initialData, data.payload.breakpoints);
          break;
        case 'continue':
          this.interpreterController.continueDebug(data.payload);
          break;
        case 'step':
          this.interpreterController.makeStep();
          break;
        case 'stop':
          this.interpreterController.stop();
          this.postMessage('stopped');
          break;
        default:
          throw new Error('Unknown command');
      }
    } catch (err) {
      this.postMessage('error', err.message);
    }
  }

  private postMessage(message: string, payload?: any): void {
    const messageObj: InterpreterWorkerMessage = { message, payload };
    postMessage(messageObj);
  }
}

const worker = new InterpreterWorker();
