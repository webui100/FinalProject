import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login User] Login',
  props<{ username: string; password: string }>()
);
