import { Component, forwardRef, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel";
import { DatePickerModule } from "primeng/datepicker";
import { SharedModule } from '../shared.module';


@Component({
  selector: 'ui-date-picker',
  imports: [FloatLabelModule, DatePickerModule, SharedModule],
  templateUrl: './ui-date-picker.html',
  styleUrl: './ui-date-picker.scss'
})
export class UiDatePicker implements ControlValueAccessor {

  @Input() label = '';
  @Input() readonly = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() dateFormat = 'dd/mm/yy';

  value: Date | null = null;
  disabled = false;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: Date | null) { this.value = value; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }
  onDateChange(value: Date | null) { this.value = value; this.onChange(value); this.onTouched(); }

  // ✅ Esto es crítico para usar @if en el template
  get formControl() {
    return this.ngControl?.control;
  }
}