import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { ReferenceTuple } from '@src/app/Model/Study/ReferenceTuple';
import { SectionElement } from '@src/app/Model/Study/StudyObjects/SectionElement';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { ColorService } from '../services/color/color.service';

@Component({
    selector: 'app-sectionelement-editing',
    templateUrl: './sectionelement-editing.component.html',
    styleUrls: ['./sectionelement-editing.component.css']
})
export class SectionElementEditingComponent implements OnInit {
    /**
     * In dem toolbox Array befinden sich alle Elemente, die erstellt wurden und einer Section hinzugefügt werden können.
     */
    toolbox = [];

    /**
     * In dem sectionelements Array befinden sich alle SectionElements die in dieser Sicht erstellt wurden.
     */
    sectionelements: SectionElement[] = [];

    /**
     * In diesem Array befinden sich alle Randomisierungsstrategien, die innerhalb einer Section verwendet werden können.
     */
    randomizers: string[] = [];

    constructor(public studywrapper: StudyWrapperService, public colorService: ColorService) {
        for (let randomizer in RandomizingStrategies) {
            if (typeof RandomizingStrategies[randomizer] === "number") {
                this.randomizers.push(randomizer);
            }
        }
    }

    /**
     * Bereits erstellte SectionElements und StudyObjects werden in das sections bzw. toolbox Array geladen. 
     */
    ngOnInit() {
        for (let sectionelement of this.studywrapper.study.sectionElements) {
            if (sectionelement instanceof SectionElement) {
                this.sectionelements.push(sectionelement);
            }
        }

        for (let studyobject of this.studywrapper.study.studyObjects) {
            this.toolbox.push(studyobject);
        }
    }

    /**
     * Sucht die Id in der Liste studyObjects aus StudyPrototype und gibt es zurück wenn das Element gefunden wurde.
     * @param id 
     */
    findStudyObjectById(id: number): any {
        for (let studyobject of this.studywrapper.study.studyObjects) {
            if (id == studyobject.id) {
                return studyobject;
            }
        }
        throw new Error("AbstractStudyObject mit der id " + id + " gibt es nicht.")
    }

    /**
     * Ein neues SectionElement wird erzeugt und in die Listen eingebunden
     */
    onAddPlayground() {
        let toInsert = new SectionElement(this.studywrapper.lastID, "", 1);
        this.sectionelements.unshift(toInsert);
        this.studywrapper.study.sectionElements.unshift(toInsert);
    }

    /**
     * Die Aktion die mit den Toolbox Elementen ausgeführt wurde wird 
     * in den entsprechenden Datenstrukturen aktualisiert
     * @param event 
     * @param sectionelement 
     */
    onDrop(event: CdkDragDrop<any[]>, sectionelement: SectionElement) {
        if (
            event.previousContainer.id.startsWith("toolbox") &&
            event.container.id != "toolbox"
        ) {
            sectionelement.studyObjects.push(
                new ReferenceTuple(
                    event.previousContainer.data[event.previousIndex].id,
                    false
                )
            );
        } else {
            if (event.previousContainer === event.container) {
                moveItemInArray(
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex
                );
            }
        }
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
     * Entfernt ein sectionElement mit der gegebenen Id von allen Sections
     * @param id 
     */
    removeFromSection(id: number) {
        for (let section of this.studywrapper.study.sections) {
            let index = 0;
            for (let sectionElementRef of section.sectionElements) {
                if (sectionElementRef.ID == id) {
                    section.sectionElements.splice(index, 1);
                }
                index++;
            }
        }
    }

    /**
     * Löscht ein StudyObject aus der Studie und aus dem toolbox Array.
     * @param index 
     * @param id 
     */
    deleteTest(index: number, id: number) {
        this.studywrapper.study.sectionElements.splice(index, 1);
        this.removeFromSection(id);
        this.sectionelements.splice(index, 1);
    }

}
