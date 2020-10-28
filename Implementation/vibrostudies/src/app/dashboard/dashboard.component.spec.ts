import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { instance, mock, spy, when } from 'ts-mockito';
import { EMail } from '../Model/User/EMail';
import { User } from '../Model/User/User';
import { UserPermission } from '../Model/User/UserPermission';
import { AuthService } from '../services/auth/auth.service';

const author = new User(69, "Anne-Kathrin", "Hermann",
  UserPermission.CREATOR, new EMail("anne.ist.doof@adrianIstGod.com"));

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  let mockedAuthService = mock(AuthService);
  when(mockedAuthService.logout()).thenReturn();
  when(mockedAuthService.getUser()).thenReturn(author);

  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: AuthService, useValue: instance(mockedAuthService)}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('DashboardComponent should create', () => {
    expect(component).toBeTruthy();
  });

  it('DashboardComponent_logoutWorksAsExpected', () => {
    expect(component.logout()).toBeUndefined();
  });

});
