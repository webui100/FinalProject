import { createAction, props } from '@ngrx/store';

export const teacherAction = createAction(
    '[Teachers Data] TeachersData',
    props<{ data: any}>()
);
