import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { loginReducer, State as LoginState } from "./login/login.reducer";
import { errorReducer, State as ErrorState } from "./error/error.reducer";
import { diaryReducer, State as DiaryState } from "./diary/diary.reducer";
import {
  teachersDataReducer,
  State as TeachersState
} from "./teachers/teachers.reducer";
import {
  studentsReducer,
  State as StudentsState
} from "./students/students.reducer";

export interface State {
  user: LoginState;
  errors: ErrorState;
  diary: DiaryState;
  teachers: TeachersState;
  students: StudentsState;
}

export const reducers: ActionReducerMap<State> = {
  user: loginReducer,
  errors: errorReducer,
  diary: diaryReducer,
  teachers: teachersDataReducer,
  students: studentsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
