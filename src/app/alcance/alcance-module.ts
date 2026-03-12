import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlcanceRoutingModule } from './alcance-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlcanceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AlcanceModule { }
