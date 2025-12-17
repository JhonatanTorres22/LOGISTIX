import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../shared.module';


@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent implements OnInit {

 @Input() color: string = 'secondary';
  @Input() label: string = '';
  @Input() idButton: string = '';
  @Input() disabled: boolean = false;
  @Input() icon!: string;
  @Input() tooltip!: string;
  @Input() classButton: string = '';
  @Input() borde: string = 'none';
  @Input() type: 'sweet' | 'default' = 'default';

  @Output() onClick = new EventEmitter<Event>();

  computedClass = '';

  ngOnInit(): void {
    this.computeClasses();
  }

  private computeClasses() {
    const classes: string[] = [];

    // Clases externas
    if (this.classButton) {
      classes.push(this.classButton);
    }

    // Estilo SWEET (outline / soft)
    if (this.type !== 'default') {
      classes.push(
        `bg-${this.color}-100`,
        `text-${this.color}-700`,
        this.borde !== 'none' ? `border-round-${this.borde}` : ''
      );
    }

    // Estilo DEFAULT
    else if (this.color !== 'secondary') {
      classes.push(
        `bg-${this.color}-500`,
        'text-white'
      );
    }

    this.computedClass = classes.join(' ');
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
