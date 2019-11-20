import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { Subscription } from 'rxjs';
import { getBreakpoints } from 'src/app/_model/editor-page/selectors';
import { Breakpoint, breakpointArrAdapter } from 'src/app/_model/editor-page/breakpoint-arr';
import { removeBreakpoint, toggleBreakpoint, removeAllBreakpoints } from 'src/app/_model/editor-page/action';
import { faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-breakpoints-tab',
  templateUrl: './breakpoints-tab.component.pug',
  styleUrls: ['./breakpoints-tab.component.scss']
})
export class BreakpointsTabComponent implements OnInit, OnDestroy {

  private breakpointsSub: Subscription;
  private breakpoints: Breakpoint[];
  private removeAllBreakpointsIcon = faTimes;
  private removeBreakpointIcon = faMinus;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.breakpointsSub = this.store.pipe(select(getBreakpoints))
      .subscribe({ next: breakpoints => this.breakpoints = breakpoints });
  }

  clickOnRemoveBreakpointButton(breakpoint: Breakpoint): void {
    this.store.dispatch(removeBreakpoint({ breakpoint }));
  }

  clickOnToggleBreakpointButton(breakpoint: Breakpoint): void {
    this.store.dispatch(toggleBreakpoint({ breakpoint }));
  }

  clickOnRemoveAllBreakpointsButton(): void {
    this.store.dispatch(removeAllBreakpoints());
  }

  trackById(index: number, breakpoint: Breakpoint): number {
    return breakpointArrAdapter.selectId(breakpoint) as number;
  }

  ngOnDestroy(): void {
    this.breakpointsSub.unsubscribe();
  }

}
