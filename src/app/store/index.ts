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
import { diaryReducer, State as DiaryState } from './diary/diary.reducer';

export interface State {
  user: LoginState;
  errors: ErrorState;
  diary: DiaryState;
}

export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
  errors: errorReducer,
  diary: diaryReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
