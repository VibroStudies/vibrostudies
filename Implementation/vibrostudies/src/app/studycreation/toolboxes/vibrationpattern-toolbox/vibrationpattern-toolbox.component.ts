import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PauseElement } from '@src/app/Model/Study/StudyObjects/PauseElement';
import { VibrationElement } from '@src/app/Model/Study/StudyObjects/VibrationElement';

@Component({
  selector: 'app-vibrationpattern-toolbox',
  templateUrl: './vibrationpattern-toolbox.component.html',
  styleUrls: ['./vibrationpattern-toolbox.component.css']
})
export class VibrationPatternToolboxComponent implements OnInit {
  /**
   * In diesem Attribut befinden sich alle Elemente, die in einer Toolbox auf einer bestimmten Seite der studycreation liegen.
   */
  @Input()
  toolbox: any[];

  /**
   * Enthält die Anzahl der VibrationPattern, die sich in der Toolbox befinden.
   */
  @Input()
  vibrationpatternCount: number;

  connectedLists: string[];

  constructor() { }

  /**
   * Initialisiert die connectedLists mit der Anzahl der VibrationPattern die sie enthalten sollen.
   */
  ngOnInit() {
    this.initConnectedLists(this.vibrationpatternCount);
  }

  /**
   * Initialisiert die die connectedLists mit der Anzahl numOfLists.
   * @param numOfLists 
   */
  initConnectedLists(numOfLists) {
    this.connectedLists = undefined;
    for (let i = 0; i < numOfLists; i++) {
      if (this.connectedLists == undefined) {
        this.connectedLists = ["vibrationpatternList" + i];
      } else {
        this.connectedLists.push("vibrationpatternList" + i);
      }
    }
  }

  /**
   * Ruft initConnectedLists auf, wenn sich die VibrationPatternCount geändert hat
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes["vibrationpatternCount"]) {
      this.initConnectedLists(this.vibrationpatternCount);
    }
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
