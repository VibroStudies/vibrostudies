import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StudyParticipationRoutingModule } from './studyparticipation-routing.module';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { TNSCheckBoxModule } from "@nstudio/nativescript-checkbox/angular";


@NgModule({
  declarations: [],
  imports: [
    StudyParticipationRoutingModule,
    NativeScriptCommonModule,
    TNSCheckBoxModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StudyParticipationModule { }
