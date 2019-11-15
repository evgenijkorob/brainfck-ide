import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_model/state';
import { finishCodeEditing } from 'src/app/_model/ide/actions';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  finishTyping(code: string): void {
    this.store.dispatch(finishCodeEditing({ code }));
  }

}
