import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudyCreationComponent } from '@src/app/studycreation/studycreation.component';
import { instance, mock } from 'ts-mockito';
import { StudyPrototypeDAO } from '../Model/Study/StudyPrototypeDAO.service';
import { StudyWrapperService } from '../services/study-wrapper/study-wrapper.service';

describe('StudyCreationComponent', () => {
  let component: StudyCreationComponent;
  let fixture: ComponentFixture<StudyCreationComponent>;

  let mockedRouter = mock(Router);
  let mockedStudyWrapperService = mock(StudyWrapperService);
  let mockedStudyService = mock(StudyPrototypeDAO);
  let mockedSnackBar = mock(MatSnackBar);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyCreationComponent ],
      providers: [
        {provide: Router, useValue: instance(mockedRouter)},
        {provide: StudyWrapperService, useValue: instance(mockedStudyWrapperService)},
        {provide: StudyPrototypeDAO, useValue: instance(mockedStudyService)},
        {provide: MatSnackBar, useValue: instance(mockedSnackBar)},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
