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
import { teachersDataReducer, State as TeachersState } from './teachers/teachers.reducer';

export interface State {
  user: LoginState;
  errors: ErrorState;
  schedule: ScheduleState; // +
  teachers: TeachersState;
}

export const reducers: ActionReducerMap<any> = {
  user: loginReducer,
  errors: errorReducer,
  schedule: scheduleReducer, // +
  teachers: teachersDataReducer,

};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
