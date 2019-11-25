import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/_model/state';
import { Store, select } from '@ngrx/store';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { clearOutput } from 'src/app/_model/workbench-panel/actions';
import { getOutput } from 'src/app/_model/workbench-panel/selectors';

@Component({
  selector: 'app-output-tab',
  templateUrl: './output-tab.component.pug',
  styleUrls: ['./output-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutputTabComponent implements OnInit {

  public output$: Observable<string> = this.store.pipe(select(getOutput));

  public clearOutputIcon = faTimesCircle;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onClearOutputButtonClick(): void {
    this.store.dispatch(clearOutput());
  }

}
