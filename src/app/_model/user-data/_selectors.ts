import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state';
import { UserDataFeatureState, userDataFeatureKey } from './_reducer';

export const getUserProfile = createFeatureSelector<AppState, UserDataFeatureState>(userDataFeatureKey);
