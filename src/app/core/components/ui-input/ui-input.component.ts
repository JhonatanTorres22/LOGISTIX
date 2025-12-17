import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, Self, EventEmitter, input } from '@angular/core';

import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ CommonModule, SharedModule],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss'
})
export class UiInputComponent implements ControlValueAccessor, OnInit{

  constructor(@Self() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  hide = true;

  @Output() onInputEvent = new EventEmitter<Event>();

  @Input() label = '';
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() readonly = false;
  @Input() maxlength = 0;
  @Input() minlength = 0;
  @Input() expReg = RegExp('');
  @Input() classInput = '';
  @Input() patternErrorMessage = '';
  @Input() min!: number;

  formControl!: FormControl;

  ngOnInit(): void {
    this.formControl = this.ngControl.control as FormControl;
  }

  // CVA (no necesitas tocar mucho)
   private onChange = (_: any) => {};
  private onTouched = () => {};

  disabled = false;

  writeValue(value: any): void {
    // asignar valor
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled; // ✅ SOLO guardar estado
  }

  // 🔒 RESTRICCIÓN onInput (IGUAL que antes)
  onInput(event: Event) {
    if (!this.expReg) return;

    const input = event.target as HTMLInputElement;
    const value = input.value.replace(new RegExp(this.expReg, 'g'), '');
    this.formControl.setValue(value, { emitEvent: false });
  }
  
}
