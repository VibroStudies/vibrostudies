import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { ValidErrorStateMatcher } from '../error-state-matchers/ValidErrorStateMatcher';
@Component({
    selector: 'app-textblock-editing',
    templateUrl: './textblock-editing.component.html',
    styleUrls: ['./textblock-editing.component.css']
})
export class TextBlockEditingComponent implements OnInit {
    /**
     * In dem Array befinden sich alle Textblöcke die bereits erstellt wurden.
     */
    textblocks: TextBlock[] = [];

    formControls: FormControl[][] = [];

    matcher = new ValidErrorStateMatcher();

    constructor(private studywrapper: StudyWrapperService) { }

    /**
     * Die Methode kopiert alle TextBlöcke die sich bereits in der Studie befinden in das teckblocks array.
     */
    ngOnInit() {
        this.studywrapper.study.studyObjects.forEach((studyobject) => {
            if (studyobject instanceof TextBlock) {
                this.textblocks.unshift(studyobject);
                this.addFormControl(studyobject);
            }
        });
    }

    /**
     * Einem TextBlock wird eine FormControl hinzugefügt
     * @param textblock 
     */
    addFormControl(textblock: TextBlock) {
        let titleControl = new FormControl("", [
        ]);
        let textControl = new FormControl("", [
        ])
        this.formControls.unshift(
            [
                titleControl,
                textControl,
            ]);
        titleControl.patchValue(textblock.name);
        textControl.patchValue(textblock.text);
        titleControl.valueChanges.subscribe(value => {
            textblock.name = value;
        });
        textControl.valueChanges.subscribe(value => {
            textblock.text = value;
        });
    }

    /**
     * Ein default TextBlock wird erstellt und in das textblocks Array und die Studie geschrieben.
     */
    onAddTextBlock() {
        let toInsert = new TextBlock(
            this.studywrapper.lastID,
            "",
            ""
        );
        this.addFormControl(toInsert);
        this.textblocks.unshift(toInsert);
        this.studywrapper.study.studyObjects.unshift(toInsert);
    }

    /**
     * Der Textblock mit der gegebenen id wird von allen sectionElements entfernt.
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
     * Ein Textblock wird aus der Studie und dem textblocks Array entfernt.
     * @param index 
     * @param id 
     */
    removeFromStudy(index: number, id: number) {
        this.textblocks.splice(index, 1);
        this.formControls.splice(index, 1);
        this.removeFromSectionElement(id);
        this.studywrapper.study.studyObjects = this.studywrapper.study.studyObjects.filter(element => element.id != id);
    }

}
