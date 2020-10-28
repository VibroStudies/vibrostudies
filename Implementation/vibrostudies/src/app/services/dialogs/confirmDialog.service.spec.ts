import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { instance, mock } from 'ts-mockito';
import { ConfirmDialogService } from './confirmDialog.service';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let mockedMatDialog = mock(MatDialog);

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            ConfirmDialogService,
            {provide: MatDialog, useValue: instance(mockedMatDialog)}
        ]
    });
    service = TestBed.inject(ConfirmDialogService);
  });

  it('AppSettingsService should be created', () => {
    expect(service).toBeTruthy();
  });
  
});