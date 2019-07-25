import { createAction, props } from '@ngrx/store';

export const setErrorAction = createAction(
  '[Error] Global error',
  props<{ error: Error }>()
);
