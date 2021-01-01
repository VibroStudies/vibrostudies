import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PauseElement } from '@src/app/Model/Study/StudyObjects/PauseElement';
import { VibrationElement } from '@src/app/Model/Study/StudyObjects/VibrationElement';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { NumberErrorStateMatcher } from '../error-state-matchers/NumberErrorStateMatcher';

@Component({
    selector: 'app-vibrationpattern-editing',
    templateUrl: './vibrationpattern-editing.component.html',
    styleUrls: ['./vibrationpattern-editing.component.css']
})
export class VibrationPatternEditingComponent implements OnInit {
    /**
     * Einfaches vorinitialisiertes VibrationElement
     */
    compareVibration = new VibrationElement(1, 1);

    /**
     * Einfaches vorinitialisiertes PauseELement
     */
    comparePause = new PauseElement(0);

    /**
     * Toolbox in der das compareVibration Element und comparePause Element liegen.
     */
    toolbox = [this.compareVibration, this.comparePause];

    /**
     * Array in dem alle VibrationPattern die erstellt wurden liegen.
     */
    vibrationpatterns: VibrationPattern[] = [];

    formControls: FormControl[][][] = [];

    matcher = new NumberErrorStateMatcher();

    constructor(private studywrapper: StudyWrapperService) { }

    /**
     * VibrationPattern aus der Study werden in das vibrationpatterns Array in der Klasse geladen.
     */
    ngOnInit() {
        this.studywrapper.study.studyObjects.forEach((studyobject) => {
            if (studyobject instanceof VibrationPattern) {
                this.vibrationpatterns.unshift(studyobject);
                this.formControls.unshift([[]]);
            }
        });
        let i = 0;
        for (let vibPattern of this.vibrationpatterns) {
            let j = 0;
            for (let vpE of vibPattern.vibrationPatternElements) {
                this.addVibrationFormControl(i, j, vpE);
                j++;
            }
            i++;
        }
    }

    /**
     * 
     * @param vibIndex 
     * @param placeIndex 
     * @param vibrationPatternElement 
     */
    addVibrationFormControl(vibIndex: number, placeIndex: number, vibrationPatternElement: any) {
        let durationControl = new FormControl("", {
            validators: [Validators.required, Validators.min(0)]
        });
        let amplitudeControl = new FormControl("", {
            validators: [Validators.required, Validators.min(1), Validators.max(255)]
        })
        this.formControls[vibIndex].splice(placeIndex, 0,
            [
                durationControl, amplitudeControl
            ]
        );
        durationControl.patchValue(vibrationPatternElement.duration);
        let toInsert = 1;
        if (vibrationPatternElement.amplitude) {
            toInsert = vibrationPatternElement.amplitude;
        }
        amplitudeControl.patchValue(toInsert);
        durationControl.valueChanges.subscribe(value => {
            let toChange = value;
            if (value < 0) {
                toChange = 0;
            }
            if (!Number(value)) {
                toChange = 1;
            }
            vibrationPatternElement.duration = toChange;
        });
        amplitudeControl.valueChanges.subscribe(value => {
            let toChange = value;
            if (value < 1) {
                toChange = 1;
            }
            if (value > 255) {
                toChange = 255;
            }
            if (!Number(value)) {
                toChange = 1;
            }
            vibrationPatternElement.amplitude = toChange;
        });
    }

    /**
     * Ein neues leeres VibrationPattern wird erstellt.
     */
    onAddVibrationPattern() {
        let toInsert = new VibrationPattern(
            this.studywrapper.lastID, "", ""
        );
        this.vibrationpatterns.unshift(toInsert);
        this.studywrapper.study.studyObjects.unshift(toInsert);
        this.formControls.unshift([[]]);
    }

    /**
     * Beim draggen eines Vibration oder PauseElements wird das VibrationPattern entsprechend editiert
     * @param event 
     * @param vibIndex 
     */
    onDrop(event: CdkDragDrop<any[]>, vibIndex: number) {
        if (event.previousContainer.id == "toolbox") {
            let toInsert: (VibrationElement | PauseElement);
            if (event.previousContainer.data[event.previousIndex] instanceof VibrationElement) {
                toInsert = new VibrationElement(1, 1);
            } else {
                toInsert = new PauseElement(1);
            }
            event.container.data.splice(event.currentIndex, 0, toInsert);
            this.addVibrationFormControl(vibIndex, event.currentIndex, toInsert);
        }
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            moveItemInArray(
                this.formControls[vibIndex],
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    /**
     * Das VibrationPattern mit der angegebene id wird aus der Studie und der Webapp entfernt. 
     * @param index 
     * @param id 
     */
    removeFromStudy(index: number, id: number) {
        this.vibrationpatterns.splice(index, 1);
        this.removeFromSectionElement(id);
        this.formControls.splice(index, 1);
        this.studywrapper.study.studyObjects = this.studywrapper.study.studyObjects.filter(element => element.id != id);
    }

    /**
     * Entfernt ein VibrationPattern von allen SectionElements in der Studie
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
     * Entfernt ein Element aus dem Array
     * @param targetArray 
     * @param index 
     */
    removeFromArray(targetArray: any, index: number) {
        targetArray.splice(index, 1);
    }

    /**
     * Entfernt ein Vibration oder Pause Element von einem VibrationPattern
     * @param vibIndex 
     * @param elIndex 
     */
    removeFromVibrationPattern(vibIndex: number, elIndex: number) {
        this.vibrationpatterns[vibIndex].vibrationPatternElements.splice(elIndex, 1);
        this.formControls[vibIndex].splice(elIndex, 1);
    }

    /**
     * Prüft, ob ein Element vom Typ VibrationElement ist.
     * @param val 
     */
    isVibration(val: any): boolean {
        return val instanceof VibrationElement;
    }

    /**
     * Prüft, ob ein Element vom Typ PauseElement ist.
     * @param val 
     */
    isPause(val: any): boolean {
        return val instanceof PauseElement;
    }

}
