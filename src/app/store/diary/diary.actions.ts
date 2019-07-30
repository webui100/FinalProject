import { createAction, props } from '@ngrx/store';

export const diary = createAction(
  '[Student Diary] Diary',
  props<{ diary: object }>()
);
