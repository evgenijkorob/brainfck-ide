import { TestBed } from '@angular/core/testing';

import { InterpreterService } from './interpreter.service';

describe('InterpreterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterpreterService = TestBed.get(InterpreterService);
    expect(service).toBeTruthy();
  });
});
