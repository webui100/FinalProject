import { Action, createReducer, on } from '@ngrx/store';
import * as Schedule from './schedule.actions';

export interface State {
  schedule: {};
}

export const initialState: State = {
    schedule: {}
};

const reducer = createReducer(
  initialState,
  on(Schedule.getSchedule, (state, { schedule }) => ({
    ...state,
    schedule
  }))
);

export function scheduleReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
