import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store'
import { environment } from '../../environments/environment';
import { loginReducer, State as LoginState } from './login/login.reducer';
import { errorReducer, State as ErrorState } from './error/error.reducer';
import { teachersDataReducer, State as TeachersState } from './teachers/teachers.reducer';
import { currentUserReducer,State as currentUserState} from "./current/current-user.reducer";
import {RouterStateUrl} from './router.reducer';

export interface State {
  user: LoginState;
  errors: ErrorState;
  teachers: TeachersState;
  currentUser: currentUserState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
  errors: errorReducer,
  teachers: teachersDataReducer,
  currentUser: currentUserReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
