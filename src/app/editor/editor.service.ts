import { Injectable } from '@angular/core';
import { Ace, edit } from 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import { getBfModeConstructor } from './bf-mode';
import { Subject, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';



const EDITOR_OPTIONS: Partial<Ace.EditorOptions> = {
  theme: 'ace/theme/github',
  highlightActiveLine: true,
  behavioursEnabled: false,
  cursorStyle: 'smooth',
  hScrollBarAlwaysVisible: false,
  scrollPastEnd: false,
  tabSize: 4,
  useSoftTabs: true
};

@Injectable()
export class EditorService {

  private editor: Ace.Editor;
  private onChangeSubj = new Subject<string>();
  private onCursorPosChangeSubj = new Subject<number>();

  public get onChange$(): Observable<string> {
    return this.onChangeSubj.asObservable();
  }

  public get onCursorIndexChange$(): Observable<number> {
    return this.onCursorPosChangeSubj.pipe(startWith(this.currentCursorPosToDocIndex()));
  }

  private get session(): Ace.EditSession {
    return this.editor.getSession();
  }

  private get selection(): Ace.Selection {
    return this.editor.getSession().getSelection();
  }

  constructor() { }

  public initializeOnDomElement(el: any): void {
    if (this.editor) {
      throw new Error('Editor is already initialized');
    }

    const BfModeConstructor = getBfModeConstructor();
    const bfMode = new BfModeConstructor();

    this.editor = edit(el, EDITOR_OPTIONS);
    this.session.setMode(bfMode);
    this.setCallbacks();
  }

  private setCallbacks(): void {
    this.editor.on('change', () => this.onChangeSubj.next(this.session.getValue()));
    this.selection.on('changeCursor', () => this.onCursorPosChangeSubj.next(this.currentCursorPosToDocIndex()));
  }

  private currentCursorPosToDocIndex(): number {
    const pos = this.selection.getCursor();
    return this.session.getDocument().positionToIndex(pos);
  }
}
