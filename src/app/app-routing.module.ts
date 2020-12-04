import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';

const routes: Routes = [
  { path: '', 
    component: PublicLayoutComponent,
    children: [
      {path: 'full', redirectTo: '/'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
