import { Injectable } from '@angular/core';
import { DateQuestion } from '@src/app/Model/Study/StudyObjects/Questions/DateQuestion';
import { LinearScaleQuestion } from '@src/app/Model/Study/StudyObjects/Questions/LinearScaleQuestion';
import { MultipleChoiceQuestion } from '@src/app/Model/Study/StudyObjects/Questions/MultipleChoiceQuestion';
import { TextQuestion } from '@src/app/Model/Study/StudyObjects/Questions/TextQuestion';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { SectionElement } from '@src/app/Model/Study/StudyObjects/SectionElement';
import { TextBlock } from '@src/app/Model/Study/StudyObjects/TextBlock';
import { VibrationPattern } from '@src/app/Model/Study/StudyObjects/VibrationPattern';

@Injectable({
    providedIn: 'root'
})
/**
 * Der Service ist dafür zuständig, einzelnen Objekten die richtige Farbe und das richtige Label zuzuordnen
 */
export class ColorService {

    constructor() { }

    /**
     * Gibt einem Objekt den Typ seines Objekts als String zurück.
     * @param item 
     */
    getStudyObjectType(item: any): string {
        switch (true) {
            case item instanceof VibrationPattern:
                return "VibrationPattern";
            case item instanceof TextBlock:
                return "TextBlock";
            case item instanceof DateQuestion:
                return "DateQuestion";
            case item instanceof LinearScaleQuestion:
                return "LinearScaleQuestion";
            case item instanceof MultipleChoiceQuestion:
                return "MultipleChoiceQuestion";
            case item instanceof TextQuestion:
                return "TextQuestion";
            case item instanceof SectionElement:
                return "SectionElement";
            case item instanceof Section:
                return "Section";
            default:
                return "undefined";
        }
    }

    /**
     * Gibt einem Objekt den Farbcode als String zurück, den das Objekt haben soll.
     * @param item 
     */
    getStudyObjectColor(item: any): string {
        switch (true) {
            case item instanceof VibrationPattern:
                return "#6D0000";
            case item instanceof TextBlock:
                return "#3e753b";
            case item instanceof DateQuestion:
                return "#4c2f27";
            case item instanceof LinearScaleQuestion:
                return "#1b5583";
            case item instanceof MultipleChoiceQuestion:
                return "#79553d";
            case item instanceof TextQuestion:
                return "#374447";
            case item instanceof SectionElement:
                return "#669ad2";
            case item instanceof Section:
                return "#c8708e";
            default:
                return "";
        }
    }
}
