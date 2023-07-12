import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {RouterModule, Routes} from '@angular/router'
import {HighchartsChartModule} from 'highcharts-angular'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatTableModule} from '@angular/material/table'
import {DashboardComponent} from './dashboard/dashboard.component'
import {HttpClientModule} from '@angular/common/http';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatCardModule} from '@angular/material/card'

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'exchange-rate', component: ExchangeRateComponent},
  { path: '**', redirectTo: '/' }
]

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MainComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule,
    MatGridListModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  providers: [MatDatepickerModule],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
