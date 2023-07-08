import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Highcharts from 'highcharts'
import {ReactiveFormsModule} from '@angular/forms'
import {MatTableModule} from '@angular/material/table'
import {MatGridListModule} from '@angular/material/grid-list'
import {HighchartsChartModule} from 'highcharts-angular'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatFormFieldModule} from '@angular/material/form-field'
import {Observable} from 'rxjs'
import {DashboardService, InfoData} from '../dashboard-service/dashboard.service'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {NgIf} from '@angular/common'

interface DashboardTablesProperties {
  naming: string;
  accumulatively: number;
  reportingPeriod: number;
}

enum Months {
  'jan21' = 1,
  'feb21',
  'mar21',
  'apr21',
  'may21',
  'jun21',
  'jul21',
  'aug21',
  'sep21',
  'oct21',
  'nov21',
  'dec21'
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatGridListModule,
    HighchartsChartModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    NgIf
  ],
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{

  constructor(private dashboardService: DashboardService) {}

  start_selected = 'jan21';
  end_selected = 'jan21';
  monthValidInput = true;
  updateChartFlag = false;

  ngOnInit(): void {
    this.rawData = this.dashboardService.getInfoData();
    this.updateReportingPeriod();
  }

  displayedColumns: string[] = ['naming', 'accumulatively', 'reportingPeriod'];

  rawData!: Observable<InfoData[]>;
  incidents!: DashboardTablesProperties[];
  instructions!: DashboardTablesProperties[];
  otherData!: DashboardTablesProperties[];

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    colors: [
      '#a7a7a7',
      '#00ff15',
      '#ff0000'
    ],
    xAxis: {
      categories: ['Накоплено', 'За отчетный период']
    },
    yAxis: {
      title: {
        text: 'Кол-во'
      }
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {},
      {},
      {}
    ]
  };

  updateReportingPeriod() {
    let start = Number(Object.values(Months)[Object.keys(Months).indexOf(this.start_selected)]);
    let end = Number(Object.values(Months)[Object.keys(Months).indexOf(this.end_selected)]);

    if (end < start) {
      this.monthValidInput = false;
      return;
    } else {
      this.monthValidInput = true;
    }

    let selectedMonths: string[] = [];

    const incidentsStorage: DashboardTablesProperties[] = [];
    const instructionsStorage: DashboardTablesProperties[] = [];
    const otherDataStorage: DashboardTablesProperties[] = [];

    for (let i = start; i <= end; i++) {
      selectedMonths.push(Object.keys(Months)[Object.values(Months).indexOf(i)]);
    }

    console.log(selectedMonths);
    this.rawData.forEach(data => {
      // @ts-ignore
      data['results'].forEach(element => {
        let sum = 0;

        for (let month of selectedMonths) {
          sum += element[month];
        }

        element.reportingPeriod = sum;

        let pushingProperties = {naming: element.name, accumulatively: element.total, reportingPeriod: sum};

        switch (element.newid) {
          case 1:
          case 2:
          case 3:
            incidentsStorage.push(pushingProperties)
            break;
          case 4:
          case 5:
            instructionsStorage.push(pushingProperties);
            break;
          default:
            otherDataStorage.push(pushingProperties);
        }
      })
    }).then(() => {
      this.incidents = incidentsStorage;
      this.instructions = instructionsStorage;
      this.otherData = otherDataStorage;

      this.updateChar();
    })
  }

  updateChar() {
    this.chartOptions.series[0] =
      {
        name: this.incidents[0].naming,
        data: [this.incidents[0].accumulatively, this.incidents[0].reportingPeriod]
      }

    this.chartOptions.series[1] =
      {
        name: this.incidents[1].naming,
        data: [this.incidents[1].accumulatively, this.incidents[1].reportingPeriod]
      }

    this.chartOptions.series[2] =
      {
        name: this.incidents[2].naming,
        data: [this.incidents[2].accumulatively, this.incidents[2].reportingPeriod]
      }

    this.updateChartFlag = true;
  }
}
