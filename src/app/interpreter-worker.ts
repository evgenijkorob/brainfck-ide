import { InterpreterController } from './interpreter-controller';



export interface InterpreterWorkerMessage {
  message: string;
  payload?: any;
}

export class InterpreterWorker {
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
          this.interpreterController.runProgram();
          break;
        case 'debug':
          this.interpreterController.debugProgram(data.payload);
          break;
        case 'continue':
          this.interpreterController.continueDebug(data.payload);
          break;
        case 'step':
          this.interpreterController.makeStep();
          break;
        default:
          throw new Error('Unknown command');
      }
    } catch (err) {
      this.postMessage('error', err.message);
    }
  }

  private postMessage(message: string, payload: any): void {
    const messageObj: InterpreterWorkerMessage = { message, payload };
    postMessage(messageObj);
  }
}
