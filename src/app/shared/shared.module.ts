import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardComponent } from '../screens/dashboard/dashboard.component';
import { DetailsComponent } from '../components/details/details.component';
import { ButtonComponent } from '../components/button/button.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    DetailsComponent,
    ButtonComponent,
  ],
  imports: [CommonModule],
  exports: [CommonModule, NavbarComponent, DashboardComponent, ButtonComponent],
})
export class SharedModule {}
