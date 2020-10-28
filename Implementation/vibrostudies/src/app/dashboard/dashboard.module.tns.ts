import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardRoutingModule } from '@src/app/dashboard/dashboard-routing.module';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular"
import { AvailableStudiesComponent } from './available-studies/available-studies.component';
import { ProfileComponent } from './profile/profile.component';
import { MyStudiesComponent } from './my-studies/my-studies.component.tns';
import { ParticipatedStudiesComponent } from './participated-studies/participated-studies.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MyStudiesComponent,
    AvailableStudiesComponent,
    ParticipatedStudiesComponent
  ],
  imports: [
    DashboardRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
