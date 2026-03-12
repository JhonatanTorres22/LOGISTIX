import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesoComprasRoutingModule } from './proceso-compras-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UiLoadingProgressBarComponent } from '@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { UiButtonComponent } from '@/core/components/ui-button/ui-button.component';
import { TableModule } from 'primeng/table';
import { UiCardNotItemsComponent } from '@/core/components/ui-card-not-items/ui-card-not-items.component';
import { Card } from '@/core/components/card/card';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProcesoComprasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    UiLoadingProgressBarComponent,
    UiInputComponent,
    UiButtonComponent,
    TableModule,
    UiCardNotItemsComponent,
    Card,
    InputTextModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    UiLoadingProgressBarComponent,
    UiInputComponent,
    UiButtonComponent,
    TableModule,
    UiCardNotItemsComponent,
    Card,
    InputTextModule
  ]
})
export class ProcesoComprasModule { }
