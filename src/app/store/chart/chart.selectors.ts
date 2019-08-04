import { State as AppState } from '../index';
import { createSelector } from '@ngrx/store';

export const chartSelector = (state: AppState) => state.chart;

export const chartDataSelector = (state: AppState) => state.chart.chart.data;

export const chartTypeSelector = (state: AppState) => state.chart.chart.type;
