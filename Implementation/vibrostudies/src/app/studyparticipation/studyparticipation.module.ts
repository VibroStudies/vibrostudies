import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyParticipationRoutingModule } from './studyparticipation-routing.module';
import { HideActionBarDirective } from '../hideActionBar';


@NgModule({
  declarations: [HideActionBarDirective],
  imports: [
    CommonModule,
    StudyParticipationRoutingModule
  ]
})
export class StudyParticipationModule { }
