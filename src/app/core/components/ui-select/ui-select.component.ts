import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UiSelect } from './ui-select.interface';
import { SharedModule } from '../shared.module';
import { Select } from 'primeng/select';


@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true
    }
  ],
  imports : [SharedModule,Select]
})
export class UiSelectComponent implements ControlValueAccessor {

  @Input() options: UiSelect[] = [];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() classInput = '';

  value: any = null;
  disabled = false;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: any): void {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
