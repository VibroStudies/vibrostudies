import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '@src/app/login/login.component';
import { MaterialModule } from '@src/material.module';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '@src/app/register/register.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from '@src/app/dashboard/dashboard.module';
import { StudyCreationComponent } from '@src/app/studycreation/studycreation.component';
import { AppComponent } from './app.component';
import { DialogTemplate } from '@src/app/services/dialogs/confirmDialog.service';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    StudyCreationComponent,
    DialogTemplate,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DashboardModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogTemplate
  ]
})
export class AppModule { }
