import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MaterialModule { }
