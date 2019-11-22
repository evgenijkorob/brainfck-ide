import {
  BfInterpreter, BfInterpreterConfig, BfInterpreterOutputHandler, BfInterpreterStateHandler, BfExecutionState, BfInterpreterInitialData
} from './interpreter';

export class InterpreterController {
  private config: BfInterpreterConfig;
  private breakpoints: number[];
  private interpreter: BfInterpreter;
  private executionTimer;
  private timeToExecutePart = 200;
  private isRunning = false;

  constructor(
    public outputHandler: BfInterpreterOutputHandler,
    public stateHandler: BfInterpreterStateHandler
  ) {}

  public initialize(
    config: BfInterpreterConfig
  ): void {
    this.config = config;
  }

  public runProgram(initialData: BfInterpreterInitialData): void {
    this.initializeInterpreterEntity(initialData);
    this.executeInParts(false);
  }

  public debugProgram(initialData: BfInterpreterInitialData, breakpointArray: number[]): void {
    this.initializeInterpreterEntity(initialData);
    this.breakpoints = breakpointArray;
    this.executeInParts(true);
  }

  public continueDebug(breakpointArray: number[]): void {
    if (!this.isRunning) {
      throw new Error('Program is not running');
    }
    this.breakpoints = breakpointArray;
    this.executeInParts(true);
  }

  public makeStep(): void {
    if (!this.isRunning) {
      throw new Error('Program is not running');
    }
    const state = this.interpreter.next();
    if (!state.finished) {
      state.paused = true;
    }
    this.stateHandler(state);
  }

  public stop(): void {
    if (this.isRunning) {
      clearTimeout(this.executionTimer);
      this.isRunning = false;
    }
  }

  private initializeInterpreterEntity(initialData: BfInterpreterInitialData): void {
    if (!this.config) {
      throw new Error('The interpreter is not initialized');
    }
    this.stop();
    this.interpreter = new BfInterpreter(this.config, initialData, this.outputHandler);
  }

  private executeInParts(debug: boolean): void {
    const startedMillis: number = Date.now();
    let state: BfExecutionState;

    this.isRunning = true;
    while (true) {
      state = this.interpreter.next(debug ? this.breakpoints : undefined);
      this.stateHandler(state);
      if (state.paused || state.finished) {
        break;
      } else if ((Date.now() - startedMillis) >= this.timeToExecutePart) {
        this.executionTimer = setTimeout(this.executeInParts.bind(this, debug), 0);
        break;
      }
    }
    if (state.finished) {
      this.isRunning = false;
    }
  }
}
