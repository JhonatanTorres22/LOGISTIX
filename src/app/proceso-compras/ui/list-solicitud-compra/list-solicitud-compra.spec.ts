import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitudCompra } from './list-solicitud-compra';

describe('ListSolicitudCompra', () => {
  let component: ListSolicitudCompra;
  let fixture: ComponentFixture<ListSolicitudCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSolicitudCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSolicitudCompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
