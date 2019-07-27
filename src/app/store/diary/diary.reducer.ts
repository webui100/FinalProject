import { Action, createReducer, on } from '@ngrx/store';
import * as Diary from './diary.actions';

export interface State {
  diary: object;
}

export const initialState: State = {
  diary: null
};

const reducer = createReducer(
  initialState,
  on(Diary.diary, (state, { diary }) => ({
    ...state,
    diary
  }))
);

export function diaryReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
