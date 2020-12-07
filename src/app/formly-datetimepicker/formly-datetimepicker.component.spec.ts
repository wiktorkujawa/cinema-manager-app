import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDatetimepickerComponent } from './formly-datetimepicker.component';

describe('FormlyDatetimepickerComponent', () => {
  let component: FormlyDatetimepickerComponent;
  let fixture: ComponentFixture<FormlyDatetimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyDatetimepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
