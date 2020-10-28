import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { StudyWrapperService } from '@src/app/services/study-wrapper/study-wrapper.service';

import { QuestionSelectionDialogComponent } from '@src/app/studycreation/question-editing/question-selection-dialog/question-selection-dialog.component';
import { mock, instance } from 'ts-mockito';

describe('QuestionSelectionDialogComponent', () => {
  let component: QuestionSelectionDialogComponent;
  let fixture: ComponentFixture<QuestionSelectionDialogComponent>;

  let mockedStudyWrapper = mock(StudyWrapperService);
  let mockedMatDialog = mock(MatDialogRef);
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSelectionDialogComponent ],
      providers: [
        {provide: StudyWrapperService, useValue: instance(mockedStudyWrapper)},
        {provide: MatDialogRef, useValue: instance(mockedMatDialog)},
     ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
