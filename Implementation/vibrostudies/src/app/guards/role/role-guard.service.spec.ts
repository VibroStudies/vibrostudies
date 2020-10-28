import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/services/auth/auth.service';
import { mock, when, instance } from 'ts-mockito';
import { RoleGuardService } from './role-guard.service';

describe('RoleGuardService', () => {
  let service: RoleGuardService;
  const mockedRouter = mock(Router);
  when(mockedRouter.navigate(["login"], { replaceUrl: true })).thenResolve(undefined);

  const mockedAuthService = mock(AuthService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleGuardService,
        {provide: Router, useValue: instance(mockedRouter)},
        {provide: AuthService, useValue: instance(mockedAuthService)}
      ]
    });
    service = TestBed.inject(RoleGuardService);
  });

  it('RoleGuardService should be created', () => {
    expect(service).toBeTruthy();
  });
});

