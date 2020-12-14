import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AboutComponent } from './components/about/about.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HallsComponent } from './components/Hall/halls/halls.component';
import { HallItemComponent } from './components/Hall/hall-item/hall-item.component';
import { AddHallComponent } from './components/Hall/add-hall/add-hall.component';
import { UpdateHallComponent } from './components/Hall/update-hall/update-hall.component';
import { MoviesComponent } from './components/Movie/movies/movies.component';
import { MovieItemComponent } from './components/Movie/movie-item/movie-item.component';
import { UpdateMovieComponent } from './components/Movie/update-movie/update-movie.component';
import { AddMovieComponent } from './components/Movie/add-movie/add-movie.component';
import { AddMovieToHallComponent } from './components/Hall/add-movie-to-hall/add-movie-to-hall.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    AboutComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomeComponent,
    HallsComponent,
    HallItemComponent,
    AddHallComponent,
    UpdateHallComponent,
    MoviesComponent,
    MovieItemComponent,
    UpdateMovieComponent,
    AddMovieComponent,
    AddMovieToHallComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    NgbModalModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlatpickrModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  exports: [HomeComponent]
})
export class AppModule { }
