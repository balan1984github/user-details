import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceInfoComponent } from './work-experience-info.component';

describe('WorkExperienceInfoComponent', () => {
  let component: WorkExperienceInfoComponent;
  let fixture: ComponentFixture<WorkExperienceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkExperienceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperienceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
