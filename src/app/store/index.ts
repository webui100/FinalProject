import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { loginReducer, State as LoginState } from './login/login.reducer';
import { errorReducer, State as ErrorState } from './error/error.reducer';

export interface State {
  user: LoginState;
  errors: ErrorState;
}

export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
  errors: errorReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
