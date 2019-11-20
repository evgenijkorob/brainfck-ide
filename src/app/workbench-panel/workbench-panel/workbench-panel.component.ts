import { Component, OnInit, OnDestroy } from '@angular/core';
import { TAB_TITLES } from '../../_model/workbench-panel/reducer';
import { AppState } from 'src/app/_model/state';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getActiveTabTitle, getIsContentOpened } from 'src/app/_model/workbench-panel/selectors';
import { selectTab } from 'src/app/_model/workbench-panel/actions';



@Component({
  selector: 'app-workbench-panel',
  templateUrl: './workbench-panel.component.pug',
  styleUrls: ['./workbench-panel.component.scss']
})
export class WorkbenchPanelComponent implements OnInit, OnDestroy {

  public readonly TAB_TITLES = TAB_TITLES;

  private activeTabTitleSub: Subscription;
  private activeTabTitle: string;
  private isContentOpenedSub: Subscription;
  private isContentOpened: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.activeTabTitleSub = this.store.pipe(select(getActiveTabTitle))
      .subscribe({ next: title => this.activeTabTitle = title });
    this.isContentOpenedSub = this.store.pipe(select(getIsContentOpened))
      .subscribe({ next: value => this.isContentOpened = value });
  }

  clickOnTabButton(tabTitle: string): void {
    this.store.dispatch(selectTab({ title: tabTitle }));
  }

  ngOnDestroy() {
    this.activeTabTitleSub.unsubscribe();
    this.isContentOpenedSub.unsubscribe();
  }

}
