import { TestBed } from '@angular/core/testing';
import { mock, when, anything, anyString, instance } from 'ts-mockito';
import { Router } from '@angular/router';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserPermission } from '@src/app/Model/User/UserPermission';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';

describe('AuthServiceIntegrationTest', () => {
  const mockedRouter: Router = mock(Router);
  when(mockedRouter.navigate(["login"], { replaceUrl: true })).thenResolve(undefined);

  const mockedHttpClient: HttpClient = mock(HttpClient);
  when(mockedHttpClient.post(anything(), anything())).thenReturn(new Observable<boolean>());

  let service: AuthService;

  let mockedAlertService = mock(AlertService);
  when(mockedAlertService.alert(anyString())).thenResolve(true);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,
      {provide: Router, useValue: instance(mockedRouter)},
      {provide: HttpClient, useValue: instance(mockedHttpClient)},
      {provide: AlertService, useValue: instance(mockedAlertService)}
    ]});
    service = TestBed.inject(AuthService);
  }); 

  it('AuthService should be created', () => {
    expect(service).toBeTruthy();
  }); 

  it('AuthService_clearStorage', () => {
     service.clear();
     expect(service.isTokenExpired()).toEqual(true);
  });

  it('AuthService_getUser', () => {
     service.clear();
     service.setUser(getDatabaseUser());
     expect(service.isTokenExpired()).toEqual(false);
  });

  it('AuthService_isTokenExpiredWorks', () => {
    service.clear();
    service.setUser(getDatabaseUser());
    expect(service.isTokenExpired()).toEqual(false);
    service.clear();
    expect(service.isTokenExpired()).toEqual(true);
  });

  it('AuthService_setExpectedUser', () => {
     service.clear();
     service.setUser(getDatabaseUser());
     expect(service.getUser().id).toEqual(getDatabaseUser().id);
     expect(service.getUser().firstName).toEqual(getDatabaseUser().firstName);
     expect(service.getUser().lastName).toEqual(getDatabaseUser().lastName);
     expect(service.getUser().email.email).toEqual(getDatabaseUser().email.email);
  });

  it('AuthService_setUserToNullOrUndefinedError', () => {
     expect(function () {service.setUser(null)}).toThrowError('Setting the User to null or undefined is not allowed.');
     expect(function () {service.setUser(undefined)}).toThrowError('Setting the User to null or undefined is not allowed.');
  });
  
  it('AuthService_expectedLogout', () => {
     service.logout();
     expect(service.isTokenExpired()).toEqual(true);
  });

  it('AuthService_isAuthenticatedWithNoUser', async function () {
     service.logout();
     const result = await service.isAuthenticated();
     expect(result).toEqual(false);
  });
 
  it('AuthService_setAndGetAuthTokenWorksAsExpected', () => {
    service.setAuthToken("ok cool");
    expect(service.getAuthToken()).toEqual("ok cool");
  })


});


function getDatabaseUser(): User {
  const author = new User(7, "Anne", "Hermann",
    UserPermission.CREATOR, new EMail("annehe@online.de"));
  return author;
}

