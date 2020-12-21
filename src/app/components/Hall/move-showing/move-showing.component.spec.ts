import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveShowingComponent } from './move-showing.component';

describe('MoveShowingComponent', () => {
  let component: MoveShowingComponent;
  let fixture: ComponentFixture<MoveShowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveShowingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveShowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
