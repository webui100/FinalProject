import { Action, createReducer, on } from '@ngrx/store';
import * as TeacherData from './teachers.action';

export interface State {
  data: Array<object>;
}

export const initialState: State = {
  data: null
};

const reducer = createReducer(
  initialState,
  on(TeacherData.teacherAction, (state, { data }) => ({
    ...state,
    data
  }))
);

export function teachersDataReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
