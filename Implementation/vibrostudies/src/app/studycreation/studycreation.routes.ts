import { Routes } from "@angular/router";
import { GeneralEditingComponent } from "./general-editing/general-editing.component";
import { QuestionEditingComponent } from "./question-editing/question-editing.component";
import { SectionEditingComponent } from "./section-editing/section-editing.component";
import { SectionElementEditingComponent } from "./sectionelement-editing/sectionelement-editing.component";
import { SequenceEditingComponent } from "./sequence-editing/sequence-editing.component";
import { TextBlockEditingComponent } from "./textblock-editing/textblock-editing.component";
import { VibrationPatternEditingComponent } from "./vibrationpattern-editing/vibrationpattern-editing.component";

export const routes: Routes = [
    {
      path: "general-editing",
      component: GeneralEditingComponent,
    },
    {
      path: "question-editing",
      component: QuestionEditingComponent,
    },
    {
      path: "section-editing",
      component: SectionEditingComponent,
    },
    {
      path: "sectionelement-editing",
      component: SectionElementEditingComponent,
    },
    {
      path: "sequence-editing",
      component: SequenceEditingComponent,
    },
    {
      path: "textblock-editing",
      component: TextBlockEditingComponent,
    },
    {
      path: "vibrationpattern-editing",
      component: VibrationPatternEditingComponent,
    }
  ];