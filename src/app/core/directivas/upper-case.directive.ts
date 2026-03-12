import { Directive, ElementRef, HostListener, Input, Renderer2, forwardRef } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[UpperCase]',
  standalone: true,
})
export class UpperCaseDirective extends DefaultValueAccessor{
 enabled = true;
  @Input('UpperCase')
set upperCase(value: boolean) {
  this.enabled = value;
}

  @Input() expReg = '';

@HostListener('input', ['$event'])
input($event: Event) {
   if (!this.enabled) return;
  const target = $event.target as HTMLInputElement;
  const start = target.selectionStart ?? target.value.length;

  target.value = target.value
    .toUpperCase()
    .trimStart()
    .replace(/\s{1,}/g, ' ');

  target.setSelectionRange(start, start);
  this.onChange(target.value);
}

  
  constructor( renderer: Renderer2, elementRef: ElementRef ) {
    super( renderer, elementRef, false );
  }


}
