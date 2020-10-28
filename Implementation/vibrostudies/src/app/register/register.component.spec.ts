import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegisterComponent } from '@src/app/register/register.component';
import { anything, instance, mock, when, anyString } from 'ts-mockito';
import { UserDao } from '../Model/User/UserDao.service';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let mockedRouter = mock(Router);
  when(mockedRouter.navigate(["dashboard"], { replaceUrl: true })).thenResolve(true);
  when(mockedRouter.navigate(["login"], { replaceUrl: true })).thenResolve(true);

  let mockedAuthService = mock(AuthService);
  when(mockedAuthService.isAuthenticated()).thenResolve(true);

  let mockedUserDAO = mock(UserDao);

  let mockedAlertService = mock(AlertService);
  when(mockedAlertService.alert(anyString())).thenResolve(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {provide: Router, useValue: instance(mockedRouter)},
        {provide: AuthService, useValue: instance(mockedAuthService)},
        {provide: UserDao, useValue: instance(mockedUserDAO)},
        {provide: AlertService, useValue: instance(mockedAlertService)}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RegisterComponent_RegisterResolveWorksAsExpected', async function () {
    component.firstName = "Anne";
    component.lastName = "Hermann";
    component.email = "annehe@gmx.de";
    component.password = "1234";
    component.confirmPassword = "1234";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenResolve();
    await expectAsync(component.register()).toBeResolved();
  });

  it('RegisterComponent_RegisterDoesNothingWhenFirstNameIsMissing', async function () {
    component.firstName = "";
    component.lastName = "Hermann";
    component.email = "annehe@gmx.de";
    component.password = "1234";
    component.confirmPassword = "1234";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenResolve();
    await expectAsync(component.register()).toBeResolved();
  });

  it('RegisterComponent_RegisterDoesNothingWhenLastNameIsMissing', async function () {
    component.firstName = "Anne";
    component.lastName = "";
    component.email = "annehe@gmx.de";
    component.password = "1234";
    component.confirmPassword = "1234";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenResolve();
    await expectAsync(component.register()).toBeResolved();
  });

  it('RegisterComponent_RegisterDoesNothingWhenEMailIsMissing', async function () {
    component.firstName = "Anne";
    component.lastName = "Hermann";
    component.email = "";
    component.password = "1234";
    component.confirmPassword = "1234";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenResolve();
    await expectAsync(component.register()).toBeResolved();
  });

  it('RegisterComponent_RegisterDoesNothingWhenPasswordIsMissing', async function () {
    component.firstName = "Anne";
    component.lastName = "Hermann";
    component.email = "annehe@gmx.de";
    component.password = "";
    component.confirmPassword = "1234";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenResolve();
    await expectAsync(component.register()).toBeResolved();
  });

  it('RegisterComponent_RegisterDoesNothingWhenPasswordConfirmationIsWrong', async function () {
    component.firstName = "Anne";
    component.lastName = "Hermann";
    component.email = "annehe@gmx.de";
    component.password = "1234";
    component.confirmPassword = "12345";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenResolve();
    await expectAsync(component.register()).toBeResolved();
  });

  it('RegisterComponent_RegisterRejectWorksAsExpected', async function () {
    component.firstName = "Anne";
    component.lastName = "Hermann";
    component.email = "annehe@gmx.de";
    component.password = "1234";
    component.confirmPassword = "1234";
    when(mockedUserDAO.save(anything(), anyString(), anyString())).thenReject();
    await expectAsync(component.register()).toBeRejected();
  });
});

