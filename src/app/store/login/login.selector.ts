import { createSelector } from '@ngrx/store';

export interface LoginState {
  username: string;
  password: string;
}

export interface AppState {
  login: LoginState;
}

export const login = (state: AppState) => state.login;

export const selectLogin = createSelector(
  login,
  (state: LoginState) => state.username
);

// export const selectLogin = (state: AppState) => state.login;
