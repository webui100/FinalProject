import { Action, createReducer, on } from '@ngrx/store';
import * as ErrorActions from './error.actions';

export interface State {
  error: any;
}

export const initialState: State = {
  error: null
};


const reducer = createReducer(
  initialState,
  on(ErrorActions.setErrorAction, (state, { error }) => ({
    ...state,
    error
  }))
);

export function errorReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
