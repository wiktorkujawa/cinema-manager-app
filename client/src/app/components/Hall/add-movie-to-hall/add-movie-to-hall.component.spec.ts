import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieToHallComponent } from './add-movie-to-hall.component';

describe('AddMovieToHallComponent', () => {
  let component: AddMovieToHallComponent;
  let fixture: ComponentFixture<AddMovieToHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovieToHallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieToHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
