import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudyPrototypeDAO } from '../Model/Study/StudyPrototypeDAO.service';
import { StudyWrapperService } from '../services/study-wrapper/study-wrapper.service';

@Component({
    selector: 'app-studycreation',
    templateUrl: './studycreation.component.html',
    styleUrls: ['./studycreation.component.css']
})
export class StudyCreationComponent implements OnInit, OnDestroy {
    saving: boolean = false;

    savingInterval;

    constructor(
        private router: Router,
        public studywrapper: StudyWrapperService,
        private studyService: StudyPrototypeDAO,
    ) { }

    ngOnDestroy() {
    }

    ngOnInit() {
        if (!this.studywrapper.study) {
            this.router.navigate(["dashboard"]);
        } else {
            this.savingInterval = setInterval(() => {
                if (this.studywrapper.study) {
                    this.save();
                } else {
                    clearInterval(this.savingInterval);
                }
            }, 10000);
        }
    }

    async save() {
        if (!this.saving) {
            this.saving = true;
            await this.studyService.save(this.studywrapper.study).then(result => {
                if (result) {
                    setTimeout(() => {
                        this.saving = false;
                    }, 1000);
                }
            });
        }
    }

}
