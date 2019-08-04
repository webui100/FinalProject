import { Component, OnInit } from '@angular/core';
import {AdminPanelService} from '../../services/admin-panel.service';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { chartDataSelector, chartTypeSelector } from 'src/app/store/chart/chart.selectors';


@Component({
  selector: 'webui-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  teachers$: Observable<number>;
  subjects$: Observable<number>;
  students$: Observable<number>;
  classes$: Observable<number>;
  data$: Observable<any>;
  chartType$: Observable<string>;
  listOfClasses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              callback(value) {if (value % 1 === 0) {return value; }}
          }
      }]
    }
  };

  public barChartLabels = ['2006'];
  public barChartLegend = true;

  constructor(public panelService: AdminPanelService, private store: Store<{chart}>) { }

  setClassChart(classNumber) {
    console.log(classNumber);
    const httpRef = this.panelService.getStudentsFromClass(classNumber + '')
    .subscribe(value => this.panelService.generateChart(value),
      (error) => console.log(error),
      () => httpRef.unsubscribe());
  }

  setChartType(value) {
    this.panelService.setChartType(value);
  }


  ngOnInit() {
    this.teachers$ = this.panelService.getTeachersNumber();
    this.subjects$ = this.panelService.getSubjectsNumber();
    this.students$ = this.panelService.getStudentsNumber();
    this.classes$ = this.panelService.getClassesNumber();

    this.panelService.getStudentsFromClass('11')
      .subscribe(value => this.panelService.generateChart(value));

    this.data$ = this.store.select(chartDataSelector);
    this.data$.subscribe(value => console.log(value));

    this.chartType$ = this.store.select(chartTypeSelector);

  }




}
