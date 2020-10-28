import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '@src/app/dashboard/dashboard-routing.module';
import { MaterialModule } from '@src/material.module';
import { FormsModule } from '@angular/forms';
import { MyStudiesComponent } from '@src/app/dashboard/my-studies/my-studies.component';
import { AvailableStudiesComponent } from '@src/app/dashboard/available-studies/available-studies.component';
import { ParticipatedStudiesComponent } from '@src/app/dashboard/participated-studies/participated-studies.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ProfileComponent, 
    MyStudiesComponent, 
    AvailableStudiesComponent, 
    ParticipatedStudiesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class DashboardModule { }
