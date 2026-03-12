import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing-module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Button, ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    TableModule,
    TagModule,
    ButtonModule
  ],
  exports:[
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule
  ]
})
export class ProductoModule { }
