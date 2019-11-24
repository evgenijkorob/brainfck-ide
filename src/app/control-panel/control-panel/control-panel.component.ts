import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import {
  getIsReleaseExecutionRunning, getIsDebugExecutionRunning, getIsDebugExecutionPaused
} from 'src/app/_model/control-panel/selectors';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStop, faPlay, faPlus, faStepForward, faForward } from '@fortawesome/free-solid-svg-icons';
import {
  startReleaseExecution, stopExecution, finishInterpreterInputEditing, startDebugExecution, continueDebugExecution, makeDebugExecutionStep
} from 'src/app/_model/control-panel/actions';
import { addBreakpoint } from 'src/app/_model/editor-page/action';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.pug',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnDestroy {

  public addBreakpointIcon = faPlus;
  public continueIcon = faForward;
  public makeStepIcon = faStepForward;
  public isDebugExecutionPaused$ = this.store.pipe(select(getIsDebugExecutionPaused));

  private isReleaseExecutionRunning: boolean;
  private isReleaseExecutionRunningSub: Subscription;
  private isDebugExecutionRunning: boolean;
  private isDebugExecutionRunningSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isReleaseExecutionRunningSub = this.store.pipe(select(getIsReleaseExecutionRunning)).subscribe(
      { next: value => this.isReleaseExecutionRunning = value }
    );
    this.isDebugExecutionRunningSub = this.store.pipe(select(getIsDebugExecutionRunning)).subscribe(
      { next: value => this.isDebugExecutionRunning = value }
    );
  }

  get releaseExecutionControlIcon(): IconDefinition {
    if (this.isReleaseExecutionRunning) {
      return faStop;
    } else {
      return faPlay;
    }
  }

  get debugExecutionControlIcon(): IconDefinition {
    if (this.isDebugExecutionRunning) {
      return faStop;
    } else {
      return faPlay;
    }
  }

  clickOnReleaseExecutionControlButton(): void {
    if (!this.isReleaseExecutionRunning) {
      this.store.dispatch(startReleaseExecution());
    } else {
      this.store.dispatch(stopExecution());
    }
  }

  clickOnDebugExecutionControlButton(): void {
    if (!this.isDebugExecutionRunning) {
      this.store.dispatch(startDebugExecution());
    } else {
      this.store.dispatch(stopExecution());
    }
  }

  clickOnContinueDebugButton(): void {
    this.store.dispatch(continueDebugExecution());
  }

  clickOnMakeStepButton(): void {
    this.store.dispatch(makeDebugExecutionStep());
  }

  finishInterpreterInputEditing(input: string): void {
    this.store.dispatch(finishInterpreterInputEditing({ input }));
  }

  clickOnAddBreakpointButton(): void {
    this.store.dispatch(addBreakpoint());
  }

  ngOnDestroy() {
    this.isReleaseExecutionRunningSub.unsubscribe();
    this.isDebugExecutionRunningSub.unsubscribe();
  }
}
