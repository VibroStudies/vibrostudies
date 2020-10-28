import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from '@src/app/login/login.component';
import { anyString, instance, mock, when} from 'ts-mockito';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;

  let mockedRouter = mock(Router);
  when(mockedRouter.navigate(["dashboard"], { replaceUrl: true })).thenResolve(undefined);
  when(mockedRouter.navigate(["register"], { replaceUrl: true })).thenResolve(undefined);

  let mockedAuthService = mock(AuthService);
  when(mockedAuthService.isAuthenticated()).thenResolve(true);

  let mockedAlertService = mock(AlertService);
  when(mockedAlertService.alert(anyString())).thenResolve(true);

  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: 
      [ {provide: Router, useValue: instance(mockedRouter)},
        {provide: AuthService, useValue: instance(mockedAuthService)},
        {provide: AlertService, useValue: instance(mockedAlertService)}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('LoginComponent_LoginResolveWorksAsExpected', async function () {
    component.email = "annehe@gmx.de";
    component.password = "1234"
    when(mockedAuthService.login(anyString(), anyString())).thenResolve();
    await expectAsync(component.login()).toBeResolved();
  });

  it('LoginComponent_LoginRejectWorksAsExpected', async function () {
    component.email = "annehe@gmx.de";
    component.password = "1234"
    when(mockedAuthService.login(anyString(), anyString())).thenReject();
    await expectAsync(component.login()).toBeRejected();
  });

  it('LoginComponent_LoginDoesNothing', async function () {
    component.email = "";
    component.password = ""
    when(mockedAuthService.login(anyString(), anyString())).thenResolve();
    await expectAsync(component.login()).toBeResolved();
  });

  it('LoginComponent_toRegisterWorksAsExpected', () => {
    expect(component.toRegister()).toBeUndefined();
  });
});

