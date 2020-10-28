import { Component, OnInit } from '@angular/core';
import { AbstractQuestion } from '@src/app/Model/Study/StudyObjects/Questions/AbstractQuestion';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { MatDialog } from "@angular/material/dialog";
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { QuestionSelectionDialogComponent } from './question-selection-dialog/question-selection-dialog.component';
import { AbstractStudyObject } from '@src/app/Model/Study/StudyObjects/AbstractStudyObject';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { FormControl, Validators } from '@angular/forms';
import { NumberErrorStateMatcher } from '../error-state-matchers/NumberErrorStateMatcher';

@Component({
    selector: 'app-question-editing',
    templateUrl: './question-editing.component.html',
    styleUrls: ['./question-editing.component.css']
})
export class QuestionEditingComponent implements OnInit {
    questions: AbstractQuestion[] = [];
    questionTypes = ["Datum/Zeit", "Lineare Skala", "Multiple Choice", "Text"];

    formControls: FormControl[][] = [];

    matcher: NumberErrorStateMatcher = new NumberErrorStateMatcher();

    constructor(public studywrapper: StudyWrapperService, private dialog: MatDialog) { }

    /**
     * Überträgt aus einer gegebenen Studie alle Fragen in das questions Array
     */
    ngOnInit() {
        this.studywrapper.study.studyObjects.forEach((studyobject) => {
            if (studyobject instanceof AbstractQuestion) {
                this.questions.unshift(studyobject);
                this.addFormControl(studyobject);
            }
        });
    }

    /**
     * Prüft, ob ein bestimmtes Objekt eine LinearScaleQuestion oder eine 
     * MultipleChoiceQuestion ist. Der entsprechende Typ wird als string zurückgegeben.
     * @param question 
     */
    isLinearScaleQuestion(question) {
        if (question instanceof LinearScaleQuestion) {
            return "linearScale";
        } else if (question instanceof MultipleChoiceQuestion) {
            return "multipleChoice";
        }

    }

    /**
     * Ergänzt die übergebene MultipleChoiceQuestion um eine vordefinierte Antwort Option
     * @param question 
     */
    addFormControl(question: AbstractQuestion) {
        let maxChoicesControl = new FormControl("", {
            validators: [Validators.min(1), Validators.required]
        });
        let choicesControl = new FormControl("", { validators: [Validators.min(2), Validators.max(12), Validators.required] });
        this.formControls.unshift([maxChoicesControl, choicesControl]);
        maxChoicesControl.patchValue((question as MultipleChoiceQuestion).maxChoices);
        choicesControl.patchValue((question as LinearScaleQuestion).numberOfChoices);
        maxChoicesControl.valueChanges.subscribe(value => {
            let toChange = value;
            if (value < 0) {
                toChange = 0;
            }
            if (!Number(value)) {
                toChange = 1;
            }
            (question as MultipleChoiceQuestion).maxChoices = toChange;
        });
        choicesControl.valueChanges.subscribe(value => {
            let toChange = value;
            if (value < 2) {
                toChange = 2;
            }
            if (value > 12) {
                toChange = 12;
            }
            if (!Number(value)) {
                toChange = 1;
            }
            (question as LinearScaleQuestion).numberOfChoices = toChange;
        })
    }

    /**
     * Ergänzt die übergebene MultipleChoiceQuestion um eine vordefinierte Antwort Option
     * @param question 
     */
    onAddAnswerChoice(question: MultipleChoiceQuestion) {
        question.answerOptions.push("");
    }

    /**
     * Fügt die erstellte Frage in die Studie und die questions Liste ein
     */
    onAddQuestion() {
        let dialogRef = this.dialog.open(QuestionSelectionDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.questions.unshift(result);
                this.studywrapper.study.studyObjects.unshift(result);
                this.addFormControl(result);
            }
        });
    }

    /**
     * Entfernt aus dem Array targetArray an der Stelle index einen Eintrag.
     * @param targetArray 
     * @param index 
     */
    removeFromArray(targetArray: any, index: number) {
        targetArray.splice(index, 1);
    }

    /**
     * Die AntwortOption in einer MultipleChoiceQuestion an der Stelle index wird aktualisiert.
     * @param question 
     * @param index 
     * @param event 
     */
    valueUpdate(question, index, event) {
        question.answerOptions[index] = event.target.value;
    }

    /**
     * Entfernt das Element an der Stelle index aus der Liste questions und entfernt das 
     * Element mit der id aus der Liste studyObjects in StudyPrototype.
     * @param index 
     * @param id 
     */
    removeFromStudy(index: number, id: number) {
        this.questions.splice(index, 1);
        this.removeFromSectionElement(id);
        this.formControls.splice(index, 1);
        this.studywrapper.study.studyObjects = this.studywrapper.study.studyObjects.filter(element => element.id != id);
    }

    /**
     * Entfernt das Element an der Stelle index aus der Liste questions und 
     * entfernt das Element mit der id aus der Liste studyObjects in StudyPrototype.
     * @param id 
     */
    removeFromSectionElement(id: number) {
        for (let sectionelement of this.studywrapper.study.sectionElements) {
            let index = 0;
            for (let studyObjectRef of sectionelement.studyObjects) {
                if (studyObjectRef.ID == id) {
                    sectionelement.studyObjects.splice(index, 1);
                }
                index++;
            }
        }
    }

    /**
     * Gibt den Text zurück, welchen der User für einen bestimmten Objekttyp sehen soll.
     * @param studyObject 
     */
    getStudyObjectTypeName(studyObject: AbstractStudyObject): string {
        switch (true) {
            case studyObject instanceof VibrationPattern:
                return "VibrationPattern";
            case studyObject instanceof TextBlock:
                return "TextBlock";
            case studyObject instanceof DateQuestion:
                return "Datum";
            case studyObject instanceof LinearScaleQuestion:
                return "Lineare Skala";
            case studyObject instanceof MultipleChoiceQuestion:
                return "Multiple Choice";
            case studyObject instanceof TextQuestion:
                return "Freitext";
            default:
                return "undefined";
        }
    }

}
