import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state';
import { CodeEditorState, codeEditorKey } from './reducer';

export const getCodeEditorState = createFeatureSelector<AppState, CodeEditorState>(codeEditorKey);

export const getCode = createSelector(getCodeEditorState, state => state.code);
