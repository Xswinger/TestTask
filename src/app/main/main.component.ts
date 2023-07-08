import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatMenuModule} from '@angular/material/menu'
import {SidebarComponent} from '../sidebar/sidebar.component'
import {MatButtonModule} from '@angular/material/button'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {ReactiveFormsModule} from '@angular/forms'
import {NgIf} from '@angular/common'
import {MatIconModule} from '@angular/material/icon'
import {MatTableModule} from '@angular/material/table'
import {HighchartsChartModule} from 'highcharts-angular'
// @ts-ignore
import Highcharts from 'highcharts'
import {RouterOutlet} from '@angular/router'
import {DashboardComponent} from '../dashboard/dashboard.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [DashboardComponent,
    HighchartsChartModule,
    MatSidenavModule,
    MatMenuModule,
    SidebarComponent,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgIf, MatIconModule,
    MatTableModule,
    RouterOutlet]
})
export class MainComponent {

  currentHeader: string = "Главная страница";

  changeHeader(header: string) {
    this.currentHeader = header;
  }


}
