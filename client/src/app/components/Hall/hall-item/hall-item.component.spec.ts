import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallItemComponent } from './hall-item.component';

describe('HallItemComponent', () => {
  let component: HallItemComponent;
  let fixture: ComponentFixture<HallItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
