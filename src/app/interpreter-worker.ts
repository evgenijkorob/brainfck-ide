import {
  BfInterpreter, BfExecutionState, BfInterpreterConfig, BfInterpreterOutputHandler, BfInterpreterStateHandler
} from './interpreter';



class InterpreterController {
  private interpreter: BfInterpreter;
  private executionTimer;
  private timeToExecutePart = 50;
  private isRunning = false;

  public runProgram(
    config: BfInterpreterConfig,
    outputHandler: BfInterpreterOutputHandler,
    onCompleted: BfInterpreterStateHandler
  ): void {
    this.initiateInterpreterEntity(config, outputHandler);
    this.executeProgramInParts(onCompleted);
  }

  private initiateInterpreterEntity(
    config: BfInterpreterConfig,
    outputHandler: BfInterpreterOutputHandler
  ): void {
    if (this.isRunning) {
      clearTimeout(this.executionTimer);
      this.isRunning = false;
    }
    this.interpreter = new BfInterpreter(config, outputHandler);
  }

  private executeProgramInParts(completeHandler: BfInterpreterStateHandler): void {
    const startedMillis: number = Date.now();
    let state: BfExecutionState = null;

    this.isRunning = true;
    do {
      state = this.interpreter.next();
      if ((Date.now() - startedMillis) >= this.timeToExecutePart) {
        this.executionTimer = setTimeout(this.executeProgramInParts.bind(this), 0);
        break;
      }
    } while (!state.finished);

    if (state.finished) {
      this.isRunning = false;
      completeHandler(state);
    }
  }
}

export interface InterpreterWorkerMessage {
  message: string;
  payload?: any;
}

export class InterpreterWorker {
  private interpreterController = new InterpreterController();

  constructor() {
    addEventListener('message', ({ data }) => this.messageHandler(data));
  }

  private messageHandler(data: InterpreterWorkerMessage): void {
    try {
      switch (data.message) {
        case 'run':
          this.interpreterController.runProgram(
            data.payload,
            (charCode) => this.postMessage('output', charCode),
            (state) => this.postMessage('completed', state)
          );
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
