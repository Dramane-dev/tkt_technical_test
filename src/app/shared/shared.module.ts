import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { LayoutModule } from '@angular/cdk/layout';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardComponent } from '../screens/dashboard/dashboard.component';
import { DetailsComponent } from '../components/details/details.component';
import { ButtonComponent } from '../components/button/button.component';
import { ChartComponent } from '../components/chart/chart.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    DetailsComponent,
    ButtonComponent,
    ChartComponent,
  ],
  imports: [CommonModule, NgxTypedJsModule, LayoutModule],
  exports: [
    CommonModule,
    NavbarComponent,
    DashboardComponent,
    ButtonComponent,
    ChartComponent,
  ],
})
export class SharedModule {}
