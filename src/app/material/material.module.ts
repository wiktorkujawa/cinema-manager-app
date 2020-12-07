import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatOptionModule, MatOptionSelectionChange } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';


const MaterialComponents = [ 
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  // MatOption,
  MatOptionModule,
  // MatOptionSelectionChange,
  MatSelectModule,
  // MatSelect
 ]

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
