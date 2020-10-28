import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StudyCreationRoutingModule } from '@src/app/studycreation/studycreation-routing.module';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { GeneralEditingComponent } from '@src/app/studycreation/general-editing/general-editing.component';
import { QuestionEditingComponent } from '@src/app/studycreation/question-editing/question-editing.component';
import { SectionEditingComponent } from '@src/app/studycreation/section-editing/section-editing.component';
import { SectionElementEditingComponent } from '@src/app/studycreation/sectionelement-editing/sectionelement-editing.component';
import { SequenceEditingComponent } from '@src/app/studycreation/sequence-editing/sequence-editing.component';
import { TextBlockEditingComponent } from '@src/app/studycreation/textblock-editing/textblock-editing.component';
import { VibrationPatternEditingComponent } from '@src/app/studycreation/vibrationpattern-editing/vibrationpattern-editing.component';
import { QuestionSelectionDialogComponent } from '@src/app/studycreation/question-editing/question-selection-dialog/question-selection-dialog.component';
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
    StudyObjectToolboxComponent
  ],
  imports: [
    StudyCreationRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StudycreationModule { }
