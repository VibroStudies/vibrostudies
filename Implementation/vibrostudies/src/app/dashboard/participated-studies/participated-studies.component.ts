import { Component, OnInit } from '@angular/core';
import { ObservableArray } from '@nativescript/core';
import { KeyData } from '@src/app/Model/Study/KeyData';


@Component({
  selector: 'app-participated-studies',
  templateUrl: './participated-studies.component.html',
  styleUrls: ['./participated-studies.component.css']
})
export class ParticipatedStudiesComponent implements OnInit {

  private _exampleStudieListItems: ObservableArray<KeyData>;

  get exampleStudieListItems(): ObservableArray<KeyData> {
    return this._exampleStudieListItems;
  }

  ngOnInit() {
  }

  constructor() { }

}

