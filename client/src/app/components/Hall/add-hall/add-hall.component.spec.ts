import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHallComponent } from './add-hall.component';

describe('AddHallComponent', () => {
  let component: AddHallComponent;
  let fixture: ComponentFixture<AddHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
