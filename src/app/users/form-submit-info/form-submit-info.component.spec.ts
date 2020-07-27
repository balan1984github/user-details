import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitInfoComponent } from './form-submit-info.component';

describe('FormSubmitInfoComponent', () => {
  let component: FormSubmitInfoComponent;
  let fixture: ComponentFixture<FormSubmitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmitInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
