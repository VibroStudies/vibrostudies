import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { LoginComponent } from '@src/app/login/login.component';
import { RegisterComponent } from '@src/app/register/register.component';
import { NativeScriptDashboardComponent } from '@src/app/dashboard/ns-dashboard.component';
import { StudyCreationComponent } from '@src/app/studycreation/studycreation.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { StudyParticipationComponent } from '@src/app/studyparticipation/studyparticipation.component';
import { AppComponent } from './app.component.tns';
import { HideActionBarDirective } from './hideActionBar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NativeScriptDashboardComponent,
    StudyCreationComponent,
    StudyParticipationComponent,
    HideActionBarDirective
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
