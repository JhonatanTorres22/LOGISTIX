import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing-module';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { DividerModule } from 'primeng/divider';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    TableModule,
    IconFieldModule,
    DividerModule,
    InputIconModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [
    TableModule,
    IconFieldModule,
    DividerModule,
    InputIconModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProveedorModule { }
