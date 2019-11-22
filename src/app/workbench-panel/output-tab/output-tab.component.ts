import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/_model/state';
import { Store, select } from '@ngrx/store';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { clearOutput } from 'src/app/_model/workbench-panel/actions';
import { getOutput } from 'src/app/_model/workbench-panel/selectors';

@Component({
  selector: 'app-output-tab',
  templateUrl: './output-tab.component.pug',
  styleUrls: ['./output-tab.component.scss']
})
export class OutputTabComponent implements OnInit {

  public output$: Observable<string>;

  public clearOutputIcon = faTimesCircle;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.output$ = this.store.pipe(select(getOutput));
  }

  onClearOutputButtonClick(): void {
    this.store.dispatch(clearOutput());
  }

}
