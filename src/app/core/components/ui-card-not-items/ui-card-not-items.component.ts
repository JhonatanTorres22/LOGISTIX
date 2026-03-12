import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Card } from "primeng/card";


@Component({
  selector: 'ui-card-not-items',
  standalone: true,
  imports: [CommonModule,  Card, ButtonModule],
  templateUrl: './ui-card-not-items.component.html',
  styleUrl: './ui-card-not-items.component.scss'
})
export class UiCardNotItemsComponent {

  @Input() text: string = 'No hay ningún elemento seleccionado';
  @Input() icon: string = 'pi pi-folder';
  @Input() class: string = '';
  @Input() classContent: string = '';

  @Input() showButton: boolean = false;
  @Input() label: string = 'Agregar';
  @Input() iconButton: string = 'pi pi-plus';

  @Output() onClick = new EventEmitter<void>();
  
}
