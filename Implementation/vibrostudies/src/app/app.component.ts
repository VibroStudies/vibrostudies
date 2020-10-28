import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from './services/app-settings/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private appSettingsService: AppSettingsService) {

  }
  
  ngOnInit() {
  }

}
