import { Action, createReducer, on } from '@ngrx/store';
import * as Login from './login.actions';

export interface State {
  role: string;
}

export const initialState: State = {
  role: null
};

const reducer = createReducer(
  initialState,
  on(Login.login, (state, { role }) => ({
    ...state,
    role
  }))
);

export function loginReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
