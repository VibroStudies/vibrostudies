import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { StudyWrapperService } from '../../../services/study-wrapper/study-wrapper.service';

@Component({
  selector: 'app-question-selection-dialog',
  templateUrl: './question-selection-dialog.component.html',
  styleUrls: ['./question-selection-dialog.component.css']
})
export class QuestionSelectionDialogComponent implements OnInit {
  constructor(private studywrapper: StudyWrapperService, private dialogRef: MatDialogRef<QuestionSelectionDialogComponent>) { }

  ngOnInit() {
  }

  /**
   * Aus dem Parameter wird der Fragetyp abgeleitet, eine default Frage erstellt und zurückgegeben.
   * @param questionType 
   */
  onButtonClick(questionType) {
    let questionResult: any = undefined;
    switch (questionType) {
      case 0:
        questionResult = new DateQuestion(this.studywrapper.lastID, "", "", "");
        break;
      case 1:
        questionResult = new LinearScaleQuestion(this.studywrapper.lastID, "", "", "", 5, "", "");
        break;
      case 2:
        questionResult = new MultipleChoiceQuestion(this.studywrapper.lastID, "", "", "", [], 1);
        break;
      case 3:
        questionResult = new TextQuestion(this.studywrapper.lastID, "", "", "");
        break;
    }
    this.dialogRef.close(questionResult);
  }

}
