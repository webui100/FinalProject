import { createSelector } from '@ngrx/store';

import { State as AppState } from '../index';
import { State as TeachersState } from './teachers.reducer';

export const selectTeachers = (state: AppState) => state.teachers;

export const selectData = (state: TeachersState) => state.data;

export const selectAll = createSelector(
    selectTeachers,
    selectData
  );
