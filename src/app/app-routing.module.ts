import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HallsComponent } from './components/Hall/halls/halls.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  { path: '', 
    component: PublicLayoutComponent,
    children: [
      {path: 'full', redirectTo: '/'},
      {path: '', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'login', component: LoginFormComponent},
      {path: 'register', component: RegisterFormComponent},
      {path: 'halls', component: HallsComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
