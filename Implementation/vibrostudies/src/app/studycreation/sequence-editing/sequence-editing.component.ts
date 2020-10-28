import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { RandomizingStrategies } from '@src/app/Model/Randomizing/RandomizingStrategies';
import { ReferenceTuple } from '@src/app/Model/Study/ReferenceTuple';
import { Section } from '@src/app/Model/Study/StudyObjects/Section';
import { StudyWrapperService } from '../../services/study-wrapper/study-wrapper.service';
import { ColorService } from '../services/color/color.service';

@Component({
  selector: 'app-sequence-editing',
  templateUrl: './sequence-editing.component.html',
  styleUrls: ['./sequence-editing.component.css']
})
export class SequenceEditingComponent implements OnInit {
  /**
   * In dem toolbox Array befinden sich alle Elemente, die erstellt wurden und einer Section hinzugefügt werden können.
   */
  toolbox = [];

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
      this.toolbox.push(section);
    }
  }

  /**
   * Sucht die Id in der Liste sectionElements aus StudyPrototype und gibt es zurück wenn es gefunden wird
   * @param id 
   */
  findSectionById(id: number): Section {
    for (let section of this.studywrapper.study.sections) {
      if (id == section.id) {
        return section;
      }
    }
  }

  /**
   * Die Aktion die mit den Toolbox Elementen ausgeführt wurde wird in den entsprechenden Datenstrukturen aktualisiert
   * @param event 
   */
  onDrop(event: CdkDragDrop<any[]>) {
    if (
      event.previousContainer.id == "toolbox" &&
      event.container.id != "toolbox"
    ) {
      this.studywrapper.study.refSections.push(
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

}
