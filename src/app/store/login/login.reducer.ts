import { Action, createReducer, on } from '@ngrx/store';
import * as Login from './login.actions';

export interface State {
  username: string;
  password: string;
}

export const initialState: State = {
  username: null,
  password: null,
};

const reducer = createReducer(initialState,
  on(Login.login, (state, { username, password }) => ({ ...state, username, password }))
);

export function loginReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
