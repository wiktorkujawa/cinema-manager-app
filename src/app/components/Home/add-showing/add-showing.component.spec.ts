import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowingComponent } from './add-showing.component';

describe('AddShowingComponent', () => {
  let component: AddShowingComponent;
  let fixture: ComponentFixture<AddShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
