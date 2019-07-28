import { createSelector } from '@ngrx/store';

import { State as AppState } from '../index';
import { State as ScheduleState } from './schedule.reducer';

export const selectSchedule = (state: AppState) => state.schedule;

export const selectScheduleData = (state: ScheduleState) => state.schedule;

export const selectRole = createSelector(
  selectSchedule,
  selectScheduleData
);
