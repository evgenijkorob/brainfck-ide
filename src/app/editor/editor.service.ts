import { Injectable } from '@angular/core';
import { Ace, edit, Range } from 'ace-builds';
import 'ace-builds/src-noconflict/theme-github';
import { getBfModeConstructor } from './bf-mode';
import { Subject, Observable, Subscription } from 'rxjs';
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

const BF_HIGHLIGHTER_CLASS = 'bf-highlighter';

const BF_BREAKPOINT_HIGHLIGHTER_CLASS = `${BF_HIGHLIGHTER_CLASS} ${BF_HIGHLIGHTER_CLASS}_breakpoint`;

const BF_EXECUTION_POINT_HIGHLIGHTER_CLASS = `${BF_HIGHLIGHTER_CLASS} ${BF_HIGHLIGHTER_CLASS}_execution-pos`;

interface EditorBreakpoint {
  index: number;
  id: number;
}

@Injectable()
export class EditorService {

  private editor: Ace.Editor;
  private onCodeChangeSubj = new Subject<string>();
  private onCursorPosChangeSubj = new Subject<number>();
  private editorBreakpoints: EditorBreakpoint[] = [];
  private executionHighlightId: number;
  private breakpointsSub: Subscription;
  private executionPosSub: Subscription;

  public get onCodeChange$(): Observable<string> {
    return this.onCodeChangeSubj.asObservable();
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

  public setBreakpointsSource(breakpointsIndexes$: Observable<number[]>): void {
    this.breakpointsSub = breakpointsIndexes$.subscribe({
      next: breakpoints => this.refreshBreakpointHighlight(breakpoints)
    });
  }

  public setExecutionPosSource(executionPos$: Observable<number>): void {
    this.executionPosSub = executionPos$.subscribe({
      next: pos => this.refreshExecutionPosHighlight(pos)
    });
  }

  public onDestroy(): void {
    this.breakpointsSub.unsubscribe();
    this.executionPosSub.unsubscribe();
    this.onCodeChangeSubj.complete();
    this.onCursorPosChangeSubj.complete();
  }

  private refreshExecutionPosHighlight(posIndex: number): void {
    this.session.removeMarker(this.executionHighlightId);
    if (posIndex === null) {
      return;
    }
    const executionRange = this.getOneLetterRange(posIndex);
    this.executionHighlightId = this.session.addMarker(executionRange, BF_EXECUTION_POINT_HIGHLIGHTER_CLASS, 'text', true);
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
    const breakpointRange = this.getOneLetterRange(breakpointIndex);
    const id = this.session.addMarker(breakpointRange, BF_BREAKPOINT_HIGHLIGHTER_CLASS, 'text', true);
    const editorBreakpoint: EditorBreakpoint = {
      index: breakpointIndex,
      id
    };
    return editorBreakpoint;
  }

  private getOneLetterRange(fileIndex: number): Ace.Range {
    const startPoint = this.document.indexToPosition(fileIndex, 0);
    const endPoint = this.document.indexToPosition(fileIndex + 1, 0);
    const breakpointRange = Range.fromPoints(startPoint, endPoint);
    return breakpointRange;
  }

  private setCallbacks(): void {
    this.editor.on('change', () => this.onCodeChangeSubj.next(this.session.getValue()));
    this.selection.on('changeCursor', () => this.onCursorPosChangeSubj.next(this.currentCursorPosToDocIndex()));
  }

  private currentCursorPosToDocIndex(): number {
    const pos = this.selection.getCursor();
    return this.document.positionToIndex(pos);
  }
}
