import { Component, OnInit } from '@angular/core';
import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReferenceTuple } from '@src/app/Model/Study/ReferenceTuple';
import { ColorService } from '../services/color/color.service';

@Component({
    selector: 'app-section-editing',
    templateUrl: './section-editing.component.html',
    styleUrls: ['./section-editing.component.css']
})
/**
 * Die Klasse ist zur Verwaltung der Operationen, die beim editieren von Sections benötigt werden.
 */
export class SectionEditingComponent implements OnInit {
    /**
     * In dem toolbox Array befinden sich alle Elemente, die erstellt wurden und einer Section hinzugefügt werden können.
     */
    toolbox = [];

    /**
     * In dem sections Array befinden sich alle Section die in dieser Sicht erstellt wurden.
     */
    sections: Section[] = [];

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
     * Bereits erstellte Sections und SectionElements werden in das sections bzw. toolbox Array geladen.
     */
    ngOnInit() {
        for (let section of this.studywrapper.study.sections) {
            this.sections.push(section);
        }

        for (let sectionelement of this.studywrapper.study.sectionElements) {
            this.toolbox.push(sectionelement);
        }
    }

    /**
     * Sucht die Id in der Liste sectionElements aus StudyPrototype und gibt es zurück wenn es gefunden wird
     * @param id
     */
    findSectionElementById(id: number): any {
        for (let sectionelement of this.studywrapper.study.sectionElements) {
            if (id == sectionelement.id) {
                return sectionelement;
            }
        }
    }

    /**
     * Eine neue default Section wird erstellt und der Studie und dem sections Array hinzugefügt.
     */
    onAddSection() {
        let toInsert = new Section(this.studywrapper.lastID, "", "", false, true, 1);
        this.sections.unshift(toInsert);
        this.studywrapper.study.sections.unshift(toInsert);
    }

  /**
   * Updated je nach Event section und synchronisiert das Model
   * @param event 
   * @param section 
   */
    onDrop(event: CdkDragDrop<any[]>, section: Section) {
        if (
            event.previousContainer.id == "toolbox" &&
            event.container.id != "toolbox"
        ) {
            section.sectionElements.push(
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
     */
    removeFromArray(targetArray: any, index: number) {
        targetArray.splice(index, 1);
    }

    /**
     * Entfernt aus dem Array refsection in der Studie das Element an der Stelle Id
     * @param id
     */
    removeFromReference(id: number) {
        let index = 0;
        for (let ref of this.studywrapper.study.refSections) {
            if (ref.ID == id) {
                this.studywrapper.study.refSections.splice(index, 1);
            }
            index++;
        }
    }

    /**
     * Löscht eine Section aus der Studie und aus dem sections Array.
     * @param index 
     * @param number
     */
    deleteSection(index: number, id: number) {
        this.studywrapper.study.sections.splice(index, 1);
        this.removeFromReference(id);
        this.sections.splice(index, 1);
    }

}
