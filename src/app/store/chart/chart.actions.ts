import { createAction, props } from '@ngrx/store';
import {Chart, Data} from '../../models/chart.model';

export const addChart = createAction(
  '[Chart] new chart',
  props<{ chart: Chart }>()
);

export const setChartData = createAction(
  '[Chart] set chart data',
  props<{ data: Array<Data>}>()
);

export const setCartType = createAction(
  '[Chart] set chart type',
  props<{ chartType: string}>()
);

