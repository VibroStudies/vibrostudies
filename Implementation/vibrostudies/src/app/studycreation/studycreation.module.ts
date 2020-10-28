import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyCreationRoutingModule } from '@src/app/studycreation/studycreation-routing.module';
import { GeneralEditingComponent } from '@src/app/studycreation/general-editing/general-editing.component';
import { MaterialModule } from '@src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionEditingComponent } from '@src/app/studycreation/question-editing/question-editing.component';
import { SectionEditingComponent } from '@src/app/studycreation/section-editing/section-editing.component';
import { SectionElementEditingComponent } from '@src/app/studycreation/sectionelement-editing/sectionelement-editing.component';
import { SequenceEditingComponent } from '@src/app/studycreation/sequence-editing/sequence-editing.component';
import { TextBlockEditingComponent } from '@src/app/studycreation/textblock-editing/textblock-editing.component';
import { VibrationPatternEditingComponent } from '@src/app/studycreation/vibrationpattern-editing/vibrationpattern-editing.component';
import { QuestionSelectionDialogComponent } from '@src/app/studycreation/question-editing/question-selection-dialog/question-selection-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VibrationPatternToolboxComponent } from '@src/app/studycreation/toolboxes/vibrationpattern-toolbox/vibrationpattern-toolbox.component';
import { StudyObjectToolboxComponent } from '@src/app/studycreation/toolboxes/studyobject-toolbox/studyobject-toolbox.component';


@NgModule({
  declarations: [
    GeneralEditingComponent, 
    QuestionEditingComponent, 
    SectionEditingComponent, 
    SectionElementEditingComponent, 
    SequenceEditingComponent, 
    TextBlockEditingComponent, 
    VibrationPatternEditingComponent, 
    QuestionSelectionDialogComponent, 
    VibrationPatternToolboxComponent, 
    StudyObjectToolboxComponent,
  ],
  imports: [
    CommonModule,
    StudyCreationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ]
})
export class StudycreationModule { }
