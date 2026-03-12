import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing-module';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    TableModule,
    IconFieldModule,
    InputIconModule
  ],
  exports: [
    TableModule,
    IconFieldModule,
    InputIconModule
  ]
})
export class CategoriaModule { }
