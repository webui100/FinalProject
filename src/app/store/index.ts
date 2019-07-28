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
import { scheduleReducer, State as ScheduleState } from './schedule/schedule.reducer'; // +

export interface State {
  user: LoginState;
  errors: ErrorState;
  schedule: ScheduleState; // +
}

export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
  errors: errorReducer,
  schedule: scheduleReducer, // +
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
