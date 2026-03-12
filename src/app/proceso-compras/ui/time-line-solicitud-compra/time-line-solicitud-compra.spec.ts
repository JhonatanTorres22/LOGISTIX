import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineSolicitudCompra } from './time-line-solicitud-compra';

describe('TimeLineSolicitudCompra', () => {
  let component: TimeLineSolicitudCompra;
  let fixture: ComponentFixture<TimeLineSolicitudCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLineSolicitudCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeLineSolicitudCompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
