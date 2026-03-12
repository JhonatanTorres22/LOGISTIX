import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'ui-icon-button',
  imports: [ButtonModule, TooltipModule, CommonModule],
  templateUrl: './ui-icon-button.html',
  styleUrl: './ui-icon-button.scss'
})
export class UiIconButton {
  @Input() icon!: string;
  @Input() tooltip: string = '';
  @Input() color: ButtonSeverity = 'primary';
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

}
