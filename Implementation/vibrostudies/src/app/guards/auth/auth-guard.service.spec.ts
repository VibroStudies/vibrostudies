import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/services/auth/auth.service';
import { instance, mock, when } from 'ts-mockito';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  const mockedRouter = mock(Router);
  when(mockedRouter.navigate(["login"], { replaceUrl: true })).thenResolve(undefined);
  
  const mockedAuthService = mock(AuthService);
  when(mockedAuthService.clear()).thenReturn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        {provide: AuthService, useValue: instance(mockedAuthService)},
        {provide: Router, useValue: instance(mockedRouter)}
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('AuthGuardService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('AuthGuardService_canActivateWorksAsExpected', async function () {
    when(mockedAuthService.isAuthenticated()).thenResolve(true);
    await expectAsync(service.canActivate(null, null)).toBeResolved(true);
  });

  it('AuthGuardService_canActivateFailsAsExpected', async function () {
    when(mockedAuthService.isAuthenticated()).thenResolve(false);
    await expectAsync(service.canActivate(null, null)).toBeResolved(false);
  });

  it('AuthGuardService_canActivateRejectsWhenAuthenticationRejects', async function () {
    when(mockedAuthService.isAuthenticated()).thenReject();
    await expectAsync(service.canActivate(null, null)).toBeRejected();
  });
});

