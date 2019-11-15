import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { getIsReleaseExecutionRunning } from 'src/app/_model/control-panel/selectors';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStop, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  startReleaseExecution, stopExecution, finishInterpreterInputEditing
} from 'src/app/_model/control-panel/actions';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.pug',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  private isReleaseExecutionRunning: boolean;
  private isReleaseExecutionRunningSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isReleaseExecutionRunningSub = this.store.pipe(select(getIsReleaseExecutionRunning)).subscribe(
      { next: (value) => this.isReleaseExecutionRunning = value }
    );
  }

  get releaseExecutionControlIcon(): IconDefinition {
    if (this.isReleaseExecutionRunning) {
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

  finishInterpreterInputEditing(input: string): void {
    this.store.dispatch(finishInterpreterInputEditing({ input }));
  }

  ngOnDestroy() {
    this.isReleaseExecutionRunningSub.unsubscribe();
  }
}
