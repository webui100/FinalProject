import { Action, createReducer, on } from '@ngrx/store';
import * as ChartActions from './chart.actions';
import {Chart, Data} from '../../models/chart.model';

export interface State {
  chart: Chart;
}

export const initialState: State = {
  chart: {
    labels: [''],
    options: {
      scaleShowVerticalLines: false,
      responsive: true
    },
    type: 'bar',
    data: [
      {
        data: [''],
        label: ''
      },
    ],
    legend: false
  }
};

const reducer = createReducer(
  initialState,
  on(ChartActions.addChart, (state, { chart }) => ({
    ...state,
    chart
  })),
  on(ChartActions.setChartData, (state, {data}) => ({
    ...state,
    chart: {
      data,
      labels: state.chart.labels,
      options: state.chart.options,
      type: state.chart.type,
      legend: state.chart.legend
    }
  })),
  on(ChartActions.setCartType, (state, {chartType}) => ({
    ...state,
    chart: {
      data: state.chart.data,
      labels: state.chart.labels,
      options: state.chart.options,
      type: chartType,
      legend: state.chart.legend
    }
  }))
);

export function chartReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
