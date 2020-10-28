import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { SectionElement } from '@src/app/Model/Study/StudyObjects/SectionElement';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';
import { ColorService } from '../../services/color/color.service';

@Component({
    selector: 'app-studyobject-toolbox',
    templateUrl: './studyobject-toolbox.component.html',
    styleUrls: ['./studyobject-toolbox.component.css']
})
export class StudyObjectToolboxComponent implements OnInit {
    /**
     * Enthält alle Elemente, die in der Toolbox verfügbar sind.
     */
    @Input()
    toolbox = [];

    /**
     * Enthält die Anzahl der Elemente, die sich in der Toolbox befinden.
     */
    @Input()
    playgroundCount: number;

    /**
     * Namen aller Elemente die sich in der Toolbox befinden.
     */
    connectedLists: string[];

    constructor(public colorService: ColorService) { }

    /**
     * Initialisiert connectedLists mit default Werten und nummeriert diese von 0 bis zur Anzahl von playgroundCount.
     */
    ngOnInit() {
        this.initConnectedLists(this.playgroundCount);
    }

    /**
     * Initialisiert connectedLists mit default Werten und nummeriert diese mit numOfLists.
     * @param numOfLists 
     */
    initConnectedLists(numOfLists) {
        this.connectedLists = undefined;
        for (let i = 0; i < numOfLists; i++) {
            if (this.connectedLists == undefined) {
                this.connectedLists = ["studyObjectList" + i];
            } else {
                this.connectedLists.push("studyObjectList" + i);
            }
        }
    }

    /**
     * Initialisiert connectedLists neu.
     * @param changes 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes["playgroundCount"]) {
            this.initConnectedLists(this.playgroundCount);
        }
    }

    /**
     * Liefert die Liste aller Objekte des Typs item in der toolbox zurück.
     * @param item 
     */
    getObjectsPerType(item: string): any[] {
        let result = [];
        switch (item) {
            case "DateQuestion":
                for (let element of this.toolbox) {
                    if (element instanceof DateQuestion) result.push(element);
                }
                break;
            case "VibrationPattern":
                for (let element of this.toolbox) {
                    if (element instanceof VibrationPattern) result.push(element);
                }
                break;
            case "TextBlock":
                for (let element of this.toolbox) {
                    if (element instanceof TextBlock) result.push(element);
                }
                break;
            case "LinearScaleQuestion":
                for (let element of this.toolbox) {
                    if (element instanceof LinearScaleQuestion) result.push(element);
                }
                break;
            case "MultipleChoiceQuestion":
                for (let element of this.toolbox) {
                    if (element instanceof MultipleChoiceQuestion) result.push(element);
                }
                break;
            case "TextQuestion":
                for (let element of this.toolbox) {
                    if (element instanceof TextQuestion) result.push(element);
                }
                break;
            case "SectionElement":
                for (let element of this.toolbox) {
                    if (element instanceof SectionElement) result.push(element);
                }
                break;
            case "Section":
                for (let element of this.toolbox) {
                    if (element instanceof Section) result.push(element);
                }
                break;
        }
        return result;
    }

    /**
     * Zählt alle Objekte in der Toolbox.
     * @param item 
     */
    getAmount(item: string): number {
        let counter = 0;
        for (let element of this.toolbox) {
            switch (item) {
                case "DateQuestion":
                    if (element instanceof DateQuestion) counter++;
                    break;
                case "VibrationPattern":
                    if (element instanceof VibrationPattern) counter++;
                    break;
                case "TextBlock":
                    if (element instanceof TextBlock) counter++;
                    break;
                case "LinearScaleQuestion":
                    if (element instanceof LinearScaleQuestion) counter++;
                    break;
                case "MultipleChoiceQuestion":
                    if (element instanceof MultipleChoiceQuestion) counter++;
                    break;
                case "TextQuestion":
                    if (element instanceof TextQuestion) counter++;
                    break;
                case "SectionElement":
                    if (element instanceof SectionElement) counter++;
                    break;
                case "Section":
                    if (element instanceof Section) counter++;
                    break;
            }
        }
        return counter;
    }

}
