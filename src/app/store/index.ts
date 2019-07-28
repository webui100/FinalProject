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
import { teachersDataReducer, State as TeachersState } from './teachers/teachers.reducer';

export interface State {
  user: LoginState;
  errors: ErrorState;
  teachers: TeachersState;
}

export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
  errors: errorReducer,
  teachers: teachersDataReducer,

};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
