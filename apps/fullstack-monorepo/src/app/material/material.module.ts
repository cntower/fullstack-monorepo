import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MaterialModule { }
