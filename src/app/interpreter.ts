export type TBfInterpreterMemory = Uint8Array | Uint16Array | Uint32Array;

export interface BfInterpreterConfig {
  memoryCellSize: 8 | 16 | 32;
  memorySize: number;
  code: string;
  input: number[];
}

export type BfInterpreterOutputHandler = (charCode: number) => void;

export type BfInterpreterStateHandler = (state: BfExecutionState) => void;

export interface BfExecutionState {
  memory: TBfInterpreterMemory;
  memoryPointer: number;
  codePointer: number;
  paused: boolean;
  finished: boolean;
}

export interface BfInterpreterError {
  message: string;
  state: BfExecutionState;
}

const BfSyntaxDict = {
  incrementMemPointer: '>',
  decrementMemPointer: '<',
  incrementCellValue: '+',
  decrementCellValue: '-',
  printCellValue: '.',
  inputCellValue: ',',
  startLoop: '[',
  endLoop: ']'
};

export class BfInterpreter {
  private code: string;
  private input: number[];
  private memory: TBfInterpreterMemory;
  private memoryPointer = 0;
  private codePointer = 0;
  private loopsBeginningCodePointerStack: number[] = [];
  private paused = false;
  private finished = false;

  constructor(
    settings: BfInterpreterConfig,
    private outputHandler: BfInterpreterOutputHandler
  ) {
    const { memoryCellSize, memorySize, code, input } = settings;
    switch (memoryCellSize) {
      case 8:
        this.memory = new Uint8Array(memorySize);
        break;
      case 16:
        this.memory = new Uint16Array(memorySize);
        break;
      case 32:
        this.memory = new Uint32Array(memorySize);
        break;
    }
    this.code = code;
    this.input = input.reverse();
  }

  public next(breakpoints?: number[]): BfExecutionState {
    if (!this.finished) {
      if (this.paused) {
        this.paused = false;
        this.executeCommand();
      } else if (this.achievedBreakpoint(breakpoints)) {
        this.paused = true;
      } else {
        this.executeCommand();
      }
    }
    return this.state;
  }

  public get state(): BfExecutionState {
    return {
      memory: this.memory,
      memoryPointer: this.memoryPointer,
      codePointer: this.codePointer,
      paused: this.paused,
      finished: this.finished
    };
  }

  private achievedBreakpoint(breakpoints?: number[]): boolean {
    return breakpoints && breakpoints.find((point) => point === this.codePointer) !== -1;
  }

  private executeCommand(): void {
    switch (this.code[this.codePointer]) {
      case BfSyntaxDict.incrementCellValue:
        this.memory[this.memoryPointer] += 1;
        break;
      case BfSyntaxDict.decrementCellValue:
        this.memory[this.memoryPointer] -= 1;
        break;
      case BfSyntaxDict.incrementMemPointer:
        this.memoryPointer += 1;
        if (this.memoryPointer === this.memory.length) {
          throw this.generateError('out of max mem bound');
        }
        break;
      case BfSyntaxDict.decrementMemPointer:
        this.memoryPointer -= 1;
        if (this.memoryPointer < 0) {
          throw this.generateError('out of min mem bound');
        }
        break;
      case BfSyntaxDict.startLoop:
        if (this.memory[this.memoryPointer] !== 0) {
          this.loopsBeginningCodePointerStack.push(this.codePointer);
        } else {
          this.codePointer = this.findExitFromLoop(this.codePointer);
        }
        break;
      case BfSyntaxDict.endLoop:
        const currentLoopBeginning = this.loopsBeginningCodePointerStack[this.loopsBeginningCodePointerStack.length - 1];
        if (this.memory[this.memoryPointer] === 0) {
          this.loopsBeginningCodePointerStack.pop();
        } else {
          this.codePointer = currentLoopBeginning;
        }
        break;
      case BfSyntaxDict.printCellValue:
        this.outputHandler(this.memory[this.memoryPointer]);
        break;
      case BfSyntaxDict.inputCellValue:
        const charCode = this.input.length ? this.input.pop() : 0;
        this.memory[this.memoryPointer] = charCode;
        break;
    }
    if (this.codePointer < this.code.length - 1) {
      this.codePointer += 1;
    } else {
      this.finished = true;
    }
  }

  private findExitFromLoop(codePointer: number): number {
    let unclosedBrackets = 1;
    while ((unclosedBrackets !== 0) && (codePointer < this.code.length - 1)) {
      codePointer += 1;
      switch (this.code[codePointer]) {
        case BfSyntaxDict.startLoop:
          unclosedBrackets += 1;
          break;
        case BfSyntaxDict.endLoop:
          unclosedBrackets -= 1;
          break;
      }
    }
    return codePointer;
  }

  private generateError(message: string): BfInterpreterError {
    this.finished = true;
    return {
      message,
      state: this.state
    };
  }
}
