import { Injectable } from '@angular/core';
import { Ace, edit, Range } from 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import { getBfModeConstructor } from './bf-mode';
import { Subject, Observable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';



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

const BF_HIGHLIGHTER_CLASS = 'bf-highlighter';

interface EditorBreakpoint {
  index: number;
  id: number;
}

@Injectable()
export class EditorService {

  private editor: Ace.Editor;
  private onChangeSubj = new Subject<string>();
  private onCursorPosChangeSubj = new Subject<number>();
  private editorBreakpoints: EditorBreakpoint[] = [];

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

  private get document(): Ace.Document {
    return this.editor.getSession().getDocument();
  }

  private get breakpointHighlighterClass(): string {
    return `${BF_HIGHLIGHTER_CLASS} ${BF_HIGHLIGHTER_CLASS}_breakpoint`;
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

  public setBreakpointObservableSource(breakpointsIndexes$: Observable<number[]>): void {
    breakpointsIndexes$.subscribe({ next: breakpoints => this.refreshBreakpointHighlight(breakpoints) });
  }

  private refreshBreakpointHighlight(breakpointsIndexes: number[]): void {
    for (const editorBreakpoint of this.editorBreakpoints) {
      this.session.removeMarker(editorBreakpoint.id);
    }
    for (const index of breakpointsIndexes) {
      this.editorBreakpoints.push(this.highlightBreakpoint(index));
    }
  }

  private highlightBreakpoint(breakpointIndex: number): EditorBreakpoint {
    const startPoint = this.document.indexToPosition(breakpointIndex, 0);
    const endPoint = this.document.indexToPosition(breakpointIndex + 1, 0);
    const breakpointRange = Range.fromPoints(startPoint, endPoint);
    const id = this.session.addMarker(breakpointRange, this.breakpointHighlighterClass, 'text', true);
    const editorBreakpoint: EditorBreakpoint = {
      index: breakpointIndex,
      id
    };
    return editorBreakpoint;
  }

  private setCallbacks(): void {
    this.editor.on('change', () => this.onChangeSubj.next(this.session.getValue()));
    this.selection.on('changeCursor', () => this.onCursorPosChangeSubj.next(this.currentCursorPosToDocIndex()));
  }

  private currentCursorPosToDocIndex(): number {
    const pos = this.selection.getCursor();
    return this.document.positionToIndex(pos);
  }
}
