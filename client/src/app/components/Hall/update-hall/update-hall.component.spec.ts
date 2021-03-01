import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHallComponent } from './update-hall.component';

describe('UpdateHallComponent', () => {
  let component: UpdateHallComponent;
  let fixture: ComponentFixture<UpdateHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
