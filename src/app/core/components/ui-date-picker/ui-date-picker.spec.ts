import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDatePicker } from './ui-date-picker';

describe('UiDatePicker', () => {
  let component: UiDatePicker;
  let fixture: ComponentFixture<UiDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDatePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
