import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QualificationQuestion } from '@src/app/Model/Study/StudyObjects/Questions/QualificationQuestion';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { ValidErrorStateMatcher } from '../error-state-matchers/ValidErrorStateMatcher';

@Component({
    selector: 'app-general-editing',
    templateUrl: './general-editing.component.html',
    styleUrls: ['./general-editing.component.css']
})
export class GeneralEditingComponent implements OnInit {
    constructor(public studywrapper: StudyWrapperService) { }

    shortControl: FormControl = new FormControl("", {validators: Validators.maxLength(200)});

    matcher: ValidErrorStateMatcher = new ValidErrorStateMatcher();

    /**
     * Initialisiert den Wert der ShortDescription
     */
    ngOnInit() {
        this.shortControl.patchValue(this.studywrapper.study.keyData.shortDescription.text);
        this.shortControl.valueChanges.subscribe(value => {
            let toChange = value;
            if (value.length > 200) {
                toChange = value.substr(0, 200);
            }
            this.studywrapper.study.keyData.shortDescription.text = toChange;
        });
    }

    onStateChange() { }

    /**
     * Erstellt eine neue Ausschlussfrage und fügt sie der Studie hinzu
     */
    onAddQualificationQuestion() {
        this.studywrapper.study.keyData.qualiQuestions.push(
            new QualificationQuestion(this.studywrapper.lastID, "", "", "", false)
        );
    }

    /**
     * Entfernt aus dem Array targetArray an der Stelle index einen Eintrag.
     * @param targetArray 
     * @param index 
     */
    removeFromArray(targetArray: any, index: number) {
        targetArray.splice(index, 1);
    }

}
