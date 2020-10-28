import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMail } from '@src/app/Model/User/EMail';
import { User } from '@src/app/Model/User/User';
import { UserDao } from '@src/app/Model/User/UserDao.service';
import { UserPermission } from '@src/app/Model/User/UserPermission';
import { AlertService } from '@src/app/services/alert/alert.service';
import { AuthService } from '@src/app/services/auth/auth.service';
import { anyNumber, anyString, anything, instance, mock, when, verify } from 'ts-mockito';
import { ProfileComponent } from './profile.component';


describe('ProfileComponent', () => {
  /* NICHT LÖSCHEN
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let mockedAuthService = mock(AuthService);
  when(mockedAuthService.getUser()).thenReturn(getDatabaseUser());

  let mockedUserService = mock(UserDao);

  let mockedAlertService = mock(AlertService);
  when(mockedAlertService.alert(anyString())).thenResolve(true);
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        {provide: AuthService, useValue: instance(mockedAuthService)},
        {provide: UserDao, useValue: instance(mockedUserService)},
        {provide: AlertService, useValue: instance(mockedAlertService)}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ProfileComponent should create', () => {
    expect(component).toBeTruthy();
  });

  it('ProfileComponent_saveUserResolveWorksAsExpected', async () => {
    when(mockedUserService.save(anything(), anyString(), anyString())).thenResolve(true);
    component.oldPassword = "cooles Passwort";
    await expectAsync(component.saveUser()).toBeResolved();
    expect(component.oldPassword).toEqual("");
  });

  it('ProfileComponent_saveUserResolveFalseWorksAsExpected', async () => {
    when(mockedUserService.save(anything(), anyString(), anyString())).thenResolve(false);
    component.oldPassword = "nicht cooles Passwort";
    await expectAsync(component.saveUser()).toBeResolved();
    expect(component.oldPassword).toEqual("nicht cooles Passwort");
  });

  it('ProfileComponent_saveUserRejectWorksAsExpected', async () => {
    when(mockedUserService.save(anything(), anyString(), anyString())).thenReject();
    component.oldPassword = "cooles Passwort";
    await expectAsync(component.saveUser()).toBeRejected();
    expect(component.oldPassword).toEqual("cooles Passwort");
  });

  it('ProfileComponent_deleteUserResolveWorksAsExpected', async () => {
    when(mockedUserService.delete(anything())).thenResolve();
    when(mockedAuthService.logout()).thenReturn();
    await expectAsync(component.deleteUser()).toBeResolved();
  });

  it('ProfileComponent_deleteUserRejectWorksAsExpected', async () => {
    when(mockedUserService.delete(anything())).thenReject();
    when(mockedAuthService.logout()).thenReturn();
    await expectAsync(component.deleteUser()).toBeRejected();
  });

  it('ProfileComponent_savePasswordDoesNothingWhenRepeatedPasswordIsWrong', async () => {
    component.newPassword = "cooleres Passwort";
    component.newPasswordRepeat = "nicht so cooles Passwort";
    when(mockedUserService.checkPassword(anyNumber(), anyString())).thenResolve(true);
    await component.savePassword();
    verify(mockedUserService.checkPassword(anyNumber(), anyString())).atMost(3);
    expect(component).toBeTruthy();
  });

  it('ProfileComponent_savePasswordResolveWorksAsExpected', async () => {
    component.newPassword = "cooleres Passwort";
    component.newPasswordRepeat = "cooleres Passwort";
    when(mockedUserService.checkPassword(anyNumber(), anyString())).thenResolve(true);
    await expectAsync(component.savePassword()).toBeResolved();
  });

  it('ProfileComponent_savePasswordResolveFalseWorksAsExpected', async () => {
    component.newPassword = "naja Passwort";
    component.newPasswordRepeat = "naja Passwort";
    when(mockedUserService.checkPassword(anyNumber(), anyString())).thenResolve(false);
    await expectAsync(component.savePassword()).toBeResolved();
  });

  it('ProfileComponent_savePasswordRejectWorksAsExpected', async () => {
    component.newPassword = "cooleres Passwort";
    component.newPasswordRepeat = "cooleres Passwort";
    when(mockedUserService.checkPassword(anyNumber(), anyString())).thenReject();
    await expectAsync(component.savePassword()).toBeRejected();
  });*/
});

function getDatabaseUser(): User {
  const author = new User(7, "Anne", "Hermann",
    UserPermission.CREATOR, new EMail("annehe@online.de"));
  return author;
}