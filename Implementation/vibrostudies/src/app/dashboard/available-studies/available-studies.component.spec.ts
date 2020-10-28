import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableStudiesComponent } from './available-studies.component';

describe('AvailableStudiesComponent', () => {
  let component: AvailableStudiesComponent;
  let fixture: ComponentFixture<AvailableStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableStudiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});