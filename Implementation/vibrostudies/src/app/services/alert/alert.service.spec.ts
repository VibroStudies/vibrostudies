import { TestBed } from '@angular/core/testing';
import { MatSnackBar} from '@angular/material/snack-bar';
import { instance, mock} from 'ts-mockito';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let mockedMatSnackBar = mock(MatSnackBar);

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [AlertService,
            {provide: MatSnackBar, useValue: instance(mockedMatSnackBar)}
        ]
    });
    service = TestBed.inject(AlertService);
  });

  it('AlertService should be created', () => {
    expect(service).toBeTruthy();
  });
});